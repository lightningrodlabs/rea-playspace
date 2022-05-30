import { SlButton, SlInput, SlMenuItem, SlSelect, SlTextarea } from '@shoelace-style/shoelace/dist/react';
import React, { FormEvent, useEffect, useState } from 'react';
import { PathedData } from '../../data/models/PathedData';
import { ActionShape, AgentShape, CommitmentShape } from '../../types/valueflows';
import { Commitment, Process } from '../../data/models/Valueflows/Plan';
import getDataStore from '../../data/DataStore';
import { assignFields } from '../../utils';

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
  resourceQuantity: 0,        // Need to have one of these that match the ResourceSpecification.
  effortQuantity: 0,          // ''
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

  useEffect(() => {
    const store = getDataStore();
    setActions(store.getActions());
    setAgents(store.getAgents());
  }, []);

  const clearState = () => {
    setState({ ...initialState });
  };

  const onChange = (e: any) => {
    const { name, value } = e.target;

    // It seems the shoelace only provides numeric values when calling serialize
    if (name in ['resourceQuantity', 'effortQuantity']) {
      setState(prevState => ({ ...prevState, [name]: parseFloat(value) }));
    } else {
      setState(prevState => ({ ...prevState, [name]: value }));
    }
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
      return (<p>This is a transfer.</p>)
    }
  }

  /**
   * TIL: valueAsNumber does not cause the the value to display.
   * This might be because of how we're using shoelace. /me shrugs
   */
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
        <SlInput disabled label="Resource conforms to" name="resourceConformsTo" value={resourceConformsTo}></SlInput>
        <br />
        <SlInput label="Resource quantity" type="number" name="resourceQuantity" onSlInput={onChange} value={resourceQuantity.toString()}></SlInput>
        <br />
        <SlInput label="Effort quantity" type="number" name="effortQuantity" onSlInput={onChange} value={effortQuantity.toString()}></SlInput>
        <br />
        <SlTextarea
          label='Note'
          name='note'
          // @ts-ignore
          onSlInput={onChange}
          value={note}
        />
        <SlButton type="submit" variant="primary">{id? 'Update' : 'Create'}</SlButton>
      </form>
    </>
  );
}

export default CommitmentModal;