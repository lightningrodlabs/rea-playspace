import React, { useState } from "react";
import { SlButton, SlCard, SlInput, SlTextarea } from "@shoelace-style/shoelace/dist/react";
import { Link } from "react-router-dom";
import MainPanelHeader from "../MainPanelHeader";
import { Agent, } from "../../../types/valueflows";
import HoloService from "../../../api/zomeApi";
import { ThingInput } from "../../../types/holochain";
import { useNavigate } from "react-router-dom";
import ZomeApi from "../../../api/zomeApi";
import { getZomeApi } from "../../../hcWebsockets";

export type NewAgentProps = {
}

const initialState = {
  id: 'ag-',
  name: '',
  image: '',
  primaryLocation: '',
  note: ''
}

const NewAgent: React.FC<NewAgentProps> = () => {
  const [
    {id, name, image, primaryLocation, note}, setState
  ] = useState(initialState);


  const navigate = useNavigate();

  const clearState = () => {
    setState({ ...initialState });
  };

  const onChange = e => {
    const { name, value } = e.target;
    setState(prevState => ({ ...prevState, [name]: value }));
  };

  // this would break in a network setting
  // how do you deal with unique IDs in a DHT
  // const getResourceSpecificationListSize = async () => {
  //   const result = await service.get_thing('resourceSpecification');
  //   if (result.tree.length > id) {
  //     id = result.tree.length;
  //   }
  // }


  const handleSubmit = async (e) => {
    e.preventDefault()
    //getResourceSpecificationListSize();
    console.log(id);
    const ag: Agent =  {id, name, note};
    const path: string = 'agent.' + id;
    const input: ThingInput = {
      path,
      data: JSON.stringify(ag)
    }
    await getZomeApi().put_thing(input);
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
        <SlInput
          required
          label="ID"
          name="id"
          // @ts-ignore
          onSlInput={onChange}
          value={id}
          
        />
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
        <SlInput
          required
          label="Primary Location"
          name="primaryLocation"
          // @ts-ignore
          onSlInput={onChange}
          value={primaryLocation}
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

export default NewAgent;


