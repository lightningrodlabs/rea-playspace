import { SlButton, SlInput, SlMenuItem, SlTextarea, SlSelect } from '@shoelace-style/shoelace/dist/react';
import React, { FormEvent, useEffect, useState } from 'react';
import getDataStore from '../../data/DataStore';
import { PathedData } from '../../data/models/PathedData';
import { ProcessSpecification } from '../../data/models/Valueflows/Knowledge';
import { Process } from "../../data/models/Valueflows/Plan";
import { AgentShape, ProcessShape } from '../../types/valueflows';

const initialState: ProcessShape = {
  id: '',
  created: null,
  basedOn: '',
  plannedWithin: '',
  name: '',
  finished: false,
  note: '',
  classifiedAs: '',
  inScopeOf: '',
  hasBegining: null,
  hasEnd: null,
  hasPointInTime: null,
  due: null
}

interface Props {
  processState: ProcessShape;
  closeModal: () => void;
  afterward: (item: PathedData) => void;
}

const ProcessModal: React.FC<Props> = ({
  processState,
  closeModal, 
  afterward
}) => {
  const [
    { id, basedOn, plannedWithin, name, finished, note, classifiedAs, inScopeOf }, setState
  ] = useState({...initialState, ...processState});
  const [agents, setAgents] = useState<AgentShape[]>([]);

  useEffect(()=>{
    let processSpec: ProcessSpecification = getDataStore().getById(basedOn);
    if (processSpec.note != null) {
      setState(prevState => ({ ...prevState, note:processSpec.note}));
    }
    const store = getDataStore();
    setAgents(store.getAgents());
  },[]);

  const clearState = () => {
    setState({ ...initialState });
  };

  const onChange = (e: any) => {
    const { name, value } = e.target;
    setState(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const processUpdates = { id, basedOn, plannedWithin, name, finished, note, classifiedAs, inScopeOf };
    const store = getDataStore();
    const newProcess = store.upsert<ProcessShape, Process>(processUpdates, Process);
    if (afterward) afterward(newProcess);

    clearState();
    closeModal();
  }

  return (
    <>
      <div className='modal-title'>Process</div>
      <form onSubmit={handleSubmit}>
        <br />
        <SlInput
          required
          label="Name"
          name="name"
          // @ts-ignore
          onSlInput={onChange}
          value={name}

        />
        <br />
        <SlSelect 
          label="Accountable" 
          name='inScopeOf' 
          value={inScopeOf} 
          onSlChange={onChange} 
          required>
          {agents.map((agent) => (<SlMenuItem key={`agent_${agent.id}`} value={agent.id}>{agent.name}</SlMenuItem>))}
        </SlSelect>

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

export default ProcessModal;