import React, { useState } from "react";
import { SlButton, SlCard, SlInput, SlTextarea } from "@shoelace-style/shoelace/dist/react";
import { Link } from "react-router-dom";
import MainPanelHeader from "../MainPanelHeader";
import { Agent } from "../../../types/valueflows";
import { useNavigate } from "react-router-dom";
import getDataStore from "../../../data/store";

export type NewAgentProps = {
}

const initialState = {
  name: '',
  image: '',
  primaryLocation: '',
  note: ''
}

const NewAgent: React.FC<NewAgentProps> = () => {
  const [
    {name, image, primaryLocation, note}, setState
  ] = useState(initialState);


  const navigate = useNavigate();

  const clearState = () => {
    setState({ ...initialState });
  };

  const onChange = e => {
    const { name, value } = e.target;
    setState(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    //getResourceSpecificationListSize();
    const ag: Agent =  new Agent({name, note});
    await getDataStore().set(ag);
    clearState();
    navigate('/');
  }

  return (
    <>
      <MainPanelHeader>
        <h2>New Resource Specification</h2>
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
        <SlInput
          required
          label="Image"
          name="image"
          // @ts-ignore
          onSlInput={onChange}
          value={image}

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
        <SlInput
          required
          label="Primary Location"
          name="primaryLocation"
          // @ts-ignore
          onSlInput={onChange}
          value={primaryLocation}
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

export default NewAgent;


