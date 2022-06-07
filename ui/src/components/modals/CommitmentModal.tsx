import { SlButton, SlInput, SlMenuItem, SlSelect, SlTextarea } from '@shoelace-style/shoelace/dist/react';
import React, { FormEvent, useEffect, useState } from 'react';
import { PathedData } from '../../data/models/PathedData';
import { ActionShape, AgentShape, CommitmentShape, UnitShape } from '../../types/valueflows';
import { Commitment } from '../../data/models/Valueflows/Plan';
import getDataStore from '../../data/DataStore';
import { assignFields } from '../../utils';
import { ResourceSpecification } from '../../data/models/Valueflows/Knowledge';
import MeasurementInput from '../input/Measurement';

interface Props {
  commitmentState: CommitmentShape;
  closeModal: () => void;
  afterward?: (item: PathedData) => void;
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

const CommitmentModal: React.FC<Props> = ({commitmentState, closeModal, afterward}) => {
  const [
    {id, plannedWithin, action, provider, receiver, inputOf, outputOf, resourceConformsTo, resourceQuantity, effortQuantity, note}, setState
  ] = useState({...initialState, ...commitmentState});

  const [actions, setActions] = useState<ActionShape[]>([]);
  const [agents, setAgents] = useState<AgentShape[]>([]);
  const [units, setUnits] = useState<UnitShape[]>([]);
  const [conformingResource, setConformingResource] = useState<ResourceSpecification>();

  useEffect(() => {
    const store = getDataStore();
    const resource: ResourceSpecification = store.getById(resourceConformsTo);
    setActions(store.getActions());
    setAgents(store.getAgents());
    setUnits(store.getUnits());
    setConformingResource(resource);
  }, []);

  const clearState = () => {
    setState({ ...initialState });
  };

  const onChange = (e: any) => {
    const { name, value } = e.target;
    setState(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const store = getDataStore();
    if (id) {
      const commitment = store.getById(id);
      assignFields(
        {id, plannedWithin, action, provider, receiver, inputOf, outputOf, resourceConformsTo, resourceQuantity, effortQuantity, note},
        commitment
      );
      await store.set(commitment);
      if (afterward) afterward(commitment);
    } else {
      const commitment: Commitment = new Commitment(
        {plannedWithin: store.getCurrentPlanId(), action, provider, receiver, inputOf, outputOf, resourceConformsTo, resourceQuantity, effortQuantity, note}
      );
      await store.set(commitment);
      if (afterward) afterward(commitment);
    }

    clearState();
    closeModal();
  }

  const inputOrOutputOf = () => {
    if (inputOf) {
      return (<SlInput disabled label="Input of" name="inputOf" value={inputOf}></SlInput>)
    } else if (outputOf) {
      return (<SlInput disabled label="Output of" name="outputOf" value={outputOf}></SlInput>)
    } else {
      return (<></>)
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <SlSelect label="Action" name='action' value={action} onSlChange={onChange} required>
          {actions.map((act) => (<SlMenuItem key={`action_${act.id}`} value={act.id}>{act.label}</SlMenuItem>))}
        </SlSelect>
        <br/>
        <SlSelect label="Provider" name='provider' value={provider ? provider : agents[0]?.id} onSlChange={onChange} required>
          {agents.map((agent) => (<SlMenuItem key={`provider_${agent.id}`} value={agent.id}>{agent.name}</SlMenuItem>))}
        </SlSelect>
        <br/>
        <SlSelect label="Receiver" name='receiver' value={receiver ? receiver : agents[0]?.id} onSlChange={onChange} required>
          {agents.map((agent) => (<SlMenuItem key={`receiver_${agent.id}`} value={agent.id}>{agent.name}</SlMenuItem>))}
        </SlSelect>
        <br/>
        {inputOrOutputOf()}
        <br/>
        <SlInput disabled label="Resource conforms to" name="resourceConformsTo" value={conformingResource?.name}></SlInput>
        <br />
        <MeasurementInput label="Resource" value={resourceQuantity} name='resourceQuantity' onChange={onChange} units={units} />
        <br />
        <MeasurementInput label="Effort" value={effortQuantity} name='effortQuantity' onChange={onChange} units={units} />
        <br />
        <SlTextarea
          label='Note'
          name='note'
          // @ts-ignore
          onSlInput={onChange}
          value={note}
        />
        <br />
        <SlButton type="submit" variant="primary">{id? 'Update' : 'Create'}</SlButton>
      </form>
    </>
  );
}

export default CommitmentModal;