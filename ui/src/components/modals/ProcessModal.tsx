import { SlButton, SlCard, SlInput, SlTextarea } from '@shoelace-style/shoelace/dist/react';
import React, { useEffect, useState } from 'react';
import { XYPosition } from 'react-flow-renderer';
import getDataStore from '../../data/DataStore';
import { PathedData } from '../../data/models/PathedData';
import { ProcessSpecification } from '../../data/models/Valueflows/Knowledge';
import { Process } from "../../data/models/Valueflows/Plan";


const initialState = {
  name: '',
  finished: false,
  note: '',
  classifiedAs: '',
  inScopeOf: '',
  basedOn: ''
}

interface Props {
  processSpecificaitonPath: string;
  position: XYPosition;
  closeModal: () => void;
  handleAddNode: (item: PathedData) => void;
}

const ProcessModal: React.FC<Props> = ({processSpecificaitonPath, position, closeModal, handleAddNode}) => {
  const [
    {name, finished, note, classifiedAs, inScopeOf, basedOn}, setState
  ] = useState(initialState);

  useEffect(()=>{
    let processSpec: ProcessSpecification = getDataStore().getCursor(processSpecificaitonPath);
    setState(prevState => ({ ...prevState, name: processSpec.name, note:processSpec.note }));
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
          label="Name - prefil from process spec"
          name="name"
          // @ts-ignore
          onSlInput={onChange}
          value={name}

        />
        <br />
        <SlInput
          label="Finished - turn into checkbox and bool"
          name="finished"
          // @ts-ignore
          onSlInput={onChange}
          value={`finished`}
        />
        <br />
        <SlInput
          label="In Scope Of"
          name="inScopeOf"
          // @ts-ignore
          onSlInput={onChange}
          value={inScopeOf}
          placeholder="list of agents"
        />
        <br />
        <SlInput
          label="Based On"
          name="basedOn"
          // @ts-ignore
          onSlInput={onChange}
          value={basedOn}
        />
        <br />
        <SlTextarea
          label='Note - prefill from process spec'
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