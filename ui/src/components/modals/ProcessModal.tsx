import { SlButton, SlInput, SlMenuItem, SlTextarea, SlSelect } from "@shoelace-style/shoelace/dist/react/index";
import React, { FormEvent, useEffect, useState } from 'react';
import { getDataStore } from '../../data/DataStore';
import { Pathed, PathFunctor } from "data-providers";
import { AgentShape, ProcessSpecification, ProcessShape, Process } from 'valueflows-models';

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
  afterward: (item: Pathed<Process>) => void;
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
    const store = getDataStore();
    let processSpec: ProcessSpecification = store.getById<ProcessSpecification>(basedOn);
    if (processSpec.note != null) {
      setState(prevState => ({ ...prevState, note:processSpec.note}));
    }
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
    const process = new Process(processUpdates);
    const pathed = PathFunctor(process, `root.plan.${processUpdates.plannedWithin}.process.${process.id}`);
    const store = getDataStore();
    const newProcess = store.upsert<Process>(pathed, Process);
    if (afterward) afterward(newProcess);

    clearState();
    closeModal();
  }


  const toggleFinished = (e: any) => {
    e.preventDefault()

    const processUpdates = { id, basedOn, plannedWithin, name, finished, note, classifiedAs, inScopeOf };
    const process = new Process(processUpdates);
    const pathed = PathFunctor(process, `root.plan.${processUpdates.plannedWithin}.process.${process.id}`);
    pathed.finished = !pathed.finished;
    const store = getDataStore();
    const newProcess = store.upsert<Process>(pathed, Process);
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
        <SlButton type="submit" variant="primary">{id? 'Update' : 'Create'}</SlButton> <SlButton onClick={toggleFinished} variant="primary">{finished == true ? "Mark as Unfinished" : "Mark as Finished"}</SlButton>
      </form>
    </>
  );
}

export default ProcessModal;