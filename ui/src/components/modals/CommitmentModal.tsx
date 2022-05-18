import { SlButton, SlInput, SlMenuItem, SlSelect, SlTextarea } from '@shoelace-style/shoelace/dist/react';
import React, { FormEvent, useEffect, useState } from 'react';
import { PathedData } from '../../data/models/PathedData';
import { ActionShape, AgentShape, CommitmentShape } from '../../types/valueflows';
import { Commitment } from '../../data/models/Valueflows/Plan';
import getDataStore from '../../data/DataStore';

interface Props {
  closeModal: () => void;
  handleAddEdge: (item: PathedData) => void;
}

const initialState = {
  plannedWithin: '',          // Needed: Plan ID
  action: null,               // Needed: Action ID
  provider: null,             // Needed: Agent ID
  receiver: null,             // Needed: Agent ID
  inputOf: null,              // Process ID
  outputOf: null,             // Process ID
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
} as CommitmentShape;

const CommitmentModal: React.FC<Props> = ({closeModal, handleAddEdge}) => {

  const [
    {action, provider, receiver, note}, setState
  ] = useState(initialState);

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
    setState(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const store = getDataStore();
    const plannedWithin = store.getCursor('root.planId');
    const commitment: Commitment = new Commitment(
      {plannedWithin, action, provider, receiver, note}
    );
    await store.set(commitment);
    handleAddEdge(commitment);

    clearState();
    closeModal();
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <SlSelect label="Action" name='action' value={action} onSlChange={onChange} required>
          {actions.map((act) => (<SlMenuItem key={`action_${act.id}`} value={act.id}>{act.label}</SlMenuItem>))}
        </SlSelect>
        <br/>
        <SlSelect label="Provider" name='provider' value={provider} onSlChange={onChange} required>
          {agents.map((agent) => (<SlMenuItem key={`provider_${agent.id}`} value={agent.id}>{agent.name}</SlMenuItem>))}
        </SlSelect>
        <br/>
        <SlSelect label="Receiver" name='receiver' value={receiver} onSlChange={onChange} required>
          {agents.map((agent) => (<SlMenuItem key={`receiver_${agent.id}`} value={agent.id}>{agent.name}</SlMenuItem>))}
        </SlSelect>
        <br/>
        <SlTextarea
          label='Note'
          name='note'
          // @ts-ignore
          onSlInput={onChange}
          value={note}
        />
        <SlButton type="submit" variant="primary">Create</SlButton>
      </form>
    </>
  );
}

export default CommitmentModal;