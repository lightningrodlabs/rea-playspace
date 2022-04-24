import { SlButton, SlCard, SlInput, SlTextarea } from '@shoelace-style/shoelace/dist/react';
import React, { useState } from 'react';
import { XYPosition } from 'react-flow-renderer';
import getDataStore from '../../data/DataStore';
import { PathedData } from '../../data/models/PathedData';
import { ProcessShape } from '../../types/valueflows';
import { Process } from "../../data/models/Valueflows/Plan";
import { rejectEmptyFields } from '../../utils';


const initialState = {
  name: '',
  finished: false,
  note: '',
  classifiedAs: '',
  inScopeOf: '',
  basedOn: ''
}

interface Props {
  position: XYPosition;
  closeModal: () => void;
  handleAddNode: (item: PathedData) => void;
}

const ProcessModal: React.FC<Props> = ({position, closeModal, handleAddNode}) => {
  const [
    {name, finished, note, classifiedAs, inScopeOf, basedOn}, setState
  ] = useState(initialState);

  const clearState = () => {
    setState({ ...initialState });
  };

  const onChange = e => {
    const { name, value } = e.target;
    setState(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault()

    const store = await getDataStore();
    const plannedWithin = store.getCursor('root.planId');
    const process: Process = new Process(
      rejectEmptyFields<ProcessShape>(
        {name, plannedWithin, finished, note, classifiedAs, inScopeOf, basedOn}
      )
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
        <SlInput
          label="Finished"
          name="finished"
          // @ts-ignore
          onSlInput={onChange}
          value={`finished`}
        />
        <br />
        <SlInput
          label="Classified As"
          name="classifiedAs"
          // @ts-ignore
          onSlInput={onChange}
          value={classifiedAs}
        />
        <br />
        <SlInput
          label="In Scope Of"
          name="inScopeOf"
          // @ts-ignore
          onSlInput={onChange}
          value={inScopeOf}
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