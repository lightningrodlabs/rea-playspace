import React, { useState } from "react";
import { SlButton, SlCard, SlInput, SlTextarea } from "@shoelace-style/shoelace/dist/react";
import { Link } from "react-router-dom";
import MainPanelHeader from "../MainPanelHeader";
import { ProcessSpecification } from "../../../types/valueflows";
import { useNavigate } from "react-router-dom";
import getDataStore from "../../../data/store";

export type NewProcessSpecificationProps = {}

const initialState = {
  name: '',
  note: ''
}

const NewProcessSpecification: React.FC<NewProcessSpecificationProps> = () => {
  const [
    {name, note}, setState
  ] = useState(initialState);

  const navigate = useNavigate();

  const clearState = () => {
    console.log('clearing')
    setState({ ...initialState });
  };

  const onChange = e => {
    const { name, value } = e.target;
    setState(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    //getResourceSpecificationListSize();
    const ps: ProcessSpecification =  new ProcessSpecification({name, note});
    await getDataStore().set(ps);
    clearState();
    navigate('/');
  }

  return (
    <>
      <MainPanelHeader>
        <h2>New Process Specification</h2>
        <Link to="/">
          <SlButton variant="warning">Cancel</SlButton>
        </Link>
      </MainPanelHeader>
      <SlCard className="create-resource">
      <form onSubmit={handleSubmit}>
      <br />
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
    </SlCard>
    </>
  );
};

export default NewProcessSpecification;


