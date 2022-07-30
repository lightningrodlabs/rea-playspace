import { SlButton, SlInput, SlMenuItem, SlSelect, SlTextarea } from '@shoelace-style/shoelace/dist/react';
import React, { useEffect, useState } from 'react';
import { ActionShape, AgentShape, CommitmentShape, ResourceSpecificationShape, UnitShape } from '../../types/valueflows';
import MeasurementInput from './Measurement';
import { DateToInputValueString, deferOnChange, slChangeConstructor } from '../util';
import { inputOrOutputOf } from './shared';
import LocationInput from './Location';

interface Props {
  commitmentState: CommitmentShape;
  conformingResource: ResourceSpecificationShape;
  agents: AgentShape[];
  actions: ActionShape[];
  units: UnitShape[];
  name: string;
  onChange?: (event: {}) => void;
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
    {action, provider, receiver, inputOf, outputOf, resourceQuantity, effortQuantity, note, due, finished, atLocation}, setState
  ] = useState({ ...initialState });

  useEffect(() => {
    setState(prevState => ({ ...prevState, ...commitmentState }));
  }, [commitmentState]);

  const parsers = {
    'due': (value: string) => new Date(Date.parse(value))
  }

  const onSlChange = slChangeConstructor<CommitmentShape>(name, onChange, setState, parsers);

  const toggleFinished = () => {
    setState(prevState => {
      const state = { ...prevState, finished: !prevState['finished'] };
      deferOnChange(name, state, onChange);
      return state;
    });
  }

  return (
    <>
      <SlSelect placeholder="Select action" label="Action" name='action' value={action as string} onSlChange={onSlChange} required>
        {actions.map((act) => (<SlMenuItem key={`action_${act.id}`} value={act.id}>{act.label}</SlMenuItem>))}
      </SlSelect>
      <br/>
      <SlSelect placeholder="Select provider" label="Provider" name='provider' value={provider ? provider as string : null} onSlChange={onSlChange} clearable required>
        {agents.map((agent) => (<SlMenuItem key={`provider_${agent.id}`} value={agent.id}>{agent.name}</SlMenuItem>))}
      </SlSelect>
      <br/>
      <SlSelect placeholder="Select reciever" label="Receiver" name='receiver' value={receiver ? receiver as string : null} onSlChange={onSlChange} clearable required>
        {agents.map((agent) => (<SlMenuItem key={`receiver_${agent.id}`} value={agent.id}>{agent.name}</SlMenuItem>))}
      </SlSelect>
      <br />
        <SlButton onClick={toggleFinished} variant="primary">{finished ? "Unfinish" : "Finish"}</SlButton>
      <br/>
      {inputOrOutputOf(inputOf as string, outputOf as string)}
      <SlInput disabled label="Resource conforms to" name="resourceConformsTo" value={conformingResource?.name}></SlInput>
      <br />
      <MeasurementInput label="Resource" value={resourceQuantity} defaultUnit={conformingResource.defaultUnitOfResource} name='resourceQuantity' onChange={onSlChange} units={units} />
      <br />
      <MeasurementInput label="Effort" value={effortQuantity} defaultUnit={conformingResource.defaultUnitOfEffort} name='effortQuantity' onChange={onSlChange} units={units} />
      <br />
      <SlInput label="Due" type="datetime-local" valueAsDate={due as Date} value={due ? DateToInputValueString(due as Date): ''} name="due" onSlChange={onSlChange} onSlInput={onSlChange}></SlInput>
      <br />
      <LocationInput label="Location" name="atLocation" value={atLocation} onChange={onSlChange}></LocationInput>
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