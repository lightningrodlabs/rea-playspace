import { AgentProfile } from '@holochain-open-dev/profiles';
import { SlButton, SlDropdown, SlCheckbox, SlDivider, SlIcon, SlInput, SlMenu, SlMenuItem, SlTextarea, SlSelect } from '@shoelace-style/shoelace/dist/react';
import { Guid } from 'guid-typescript';
import React, { useEffect, useRef, useState } from 'react';
import { XYPosition } from 'react-flow-renderer';
import getDataStore from '../../data/DataStore';
import { PathedData } from '../../data/models/PathedData';
import { Agent, ProcessSpecification } from '../../data/models/Valueflows/Knowledge';
import { Process } from "../../data/models/Valueflows/Plan";
import { AgentShape } from '../../types/valueflows';

const initialState = {
  name: '',
  finished: false,
  note: '',
  classifiedAs: '',
  inScopeOf: '',
  basedOn: ''
}

interface Props {
  processSpecificationPath: string;
  closeModal: () => void;
  handleAddNode: (item: PathedData) => void;
}

const ProcessModal: React.FC<Props> = ({
  processSpecificationPath,
  closeModal, 
  handleAddNode
}) => {
  const [
    {name, 
    finished, 
    note, 
    classifiedAs, 
    inScopeOf, 
    basedOn}, setState
  ] = useState(initialState);
  const [agents, setAgents] = useState<AgentShape[]>([]);

  useEffect(()=>{
    let processSpec: ProcessSpecification = getDataStore().getCursor(processSpecificationPath);
    setState(prevState => ({ ...prevState, name: processSpec.name, basedOn: processSpec.id}));
    if (processSpec.note != null) {
      setState(prevState => ({ ...prevState, note:processSpec.note}));
    }
    const store = getDataStore();
    setAgents(store.getAgents());
  },[]);

  const clearState = () => {
    setState({ ...initialState });
  };

  const onChange = e => {
    const { name, value } = e.target;
    setState(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault()

    const store = getDataStore();
    const plannedWithin = store.getCursor('root.planId');
    const process: Process = new Process(
      {name, plannedWithin, finished, note, classifiedAs, inScopeOf, basedOn}
    );
    await store.set(process);
    handleAddNode(process);

    clearState();
    closeModal();
  }

  return (
    <>
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
          label="In Scope Of" 
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
        <SlButton type="submit" variant="primary">
          Create
        </SlButton>
      </form>
    </>
  );
}

export default ProcessModal;