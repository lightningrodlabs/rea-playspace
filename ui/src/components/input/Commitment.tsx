import { SlInput, SlMenuItem, SlSelect, SlTextarea } from '@shoelace-style/shoelace/dist/react';
import React, { useEffect, useState } from 'react';
import { ActionShape, AgentShape, CommitmentShape, ResourceSpecificationShape, UnitShape } from '../../types/valueflows';
import MeasurementInput from './Measurement';

interface Props {
  commitmentState: CommitmentShape;
  conformingResource: ResourceSpecificationShape;
  agents: AgentShape[];
  actions: ActionShape[];
  units: UnitShape[];
  name: string;
  onChange?: (event: any) => void;
}

const initialState: CommitmentShape = {
  id: '',
  plannedWithin: '',          // Needed: Plan ID
  action: 'use',              // Needed: Action ID
  provider: '',               // Needed: Agent ID
  receiver: '',               // Needed: Agent ID
  inputOf: '',                // Process ID
  outputOf: '',               // Process ID
  resourceInventoriedAs: '',  // EconomicResource ID,  not yet implemented, but will be soon
  resourceConformsTo: '',     // ResourceSpecification ID
  resourceQuantity: null,     // Need to have one of these (either resourceQuantity or effortQuantity) that match the ResourceSpecification.
  effortQuantity: null,
  resourceClassifiedAs: '',   // General classification or grouping
  hasBegining: null,          // Datetime
  hasEnd: null,               // Datetime
  hasPointInTime: null,       // Datetime
  due: null,                  // Datetime
  independentDemandOf: null,  // Not implementing this yet
  finished: false,
  inScopeOf: null,
  note: '',
  agreedIn: '',
  atLocation: null,
  state: null
};

const CommitmentInput: React.FC<Props> = ({commitmentState, conformingResource, agents, actions, units, name, onChange}) => {
  const [
    {action, provider, receiver, inputOf, outputOf, resourceQuantity, effortQuantity, note}, setState
  ] = useState({ ...initialState });

  useEffect(() => {
    setState(prevState => ({ ...prevState, ...commitmentState }));
  }, [commitmentState]);

  const deferOnChange = (value: CommitmentShape) => {
    setTimeout(() => {
      onChange({target: {name, value}})
    }, 1);
  };

  const onSlChange = (e: any) => {
    const { name: fieldName, value } = e.target;
    setState(prevState => {
      const state = { ...prevState, [fieldName]: value };
      deferOnChange(state);
      return state;
    });
  };

  const inputOrOutputOf = () => {
    if (inputOf) {
      return (<>
        <SlInput disabled label="Input of" name="inputOf" value={inputOf}></SlInput>
        <br />
      </>)
    } else if (outputOf) {
      return (<>
        <SlInput disabled label="Output of" name="outputOf" value={outputOf}></SlInput>
        <br />
      </>)
    } else {
      return (<></>)
    }
  };

  return (
    <>
      <SlSelect label="Action" name='action' value={action} onSlChange={onSlChange} required>
        {actions.map((act) => (<SlMenuItem key={`action_${act.id}`} value={act.id}>{act.label}</SlMenuItem>))}
      </SlSelect>
      <br/>
      <SlSelect label="Provider" name='provider' value={provider ? provider : agents[0]?.id} onSlChange={onSlChange} required>
        {agents.map((agent) => (<SlMenuItem key={`provider_${agent.id}`} value={agent.id}>{agent.name}</SlMenuItem>))}
      </SlSelect>
      <br/>
      <SlSelect label="Receiver" name='receiver' value={receiver ? receiver : agents[0]?.id} onSlChange={onSlChange} required>
        {agents.map((agent) => (<SlMenuItem key={`receiver_${agent.id}`} value={agent.id}>{agent.name}</SlMenuItem>))}
      </SlSelect>
      <br/>
      {inputOrOutputOf()}
      <SlInput disabled label="Resource conforms to" name="resourceConformsTo" value={conformingResource?.name}></SlInput>
      <br />
      <MeasurementInput label="Resource" value={resourceQuantity} name='resourceQuantity' onChange={onSlChange} units={units} />
      <br />
      <MeasurementInput label="Effort" value={effortQuantity} name='effortQuantity' onChange={onSlChange} units={units} />
      <br />
      <SlTextarea
        label='Note'
        name='note'
        // @ts-ignore
        onSlInput={onSlChange}
        value={note}
      ></SlTextarea>
    </>
  );
};

export default CommitmentInput;