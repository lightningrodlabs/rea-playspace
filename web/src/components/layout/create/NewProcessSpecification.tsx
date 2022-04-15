import React, { useState } from "react";
import { SlButton, SlCard, SlInput, SlTextarea } from "@shoelace-style/shoelace/dist/react";
import { Link } from "react-router-dom";
import MainPanelHeader from "../MainPanelHeader";
import { ProcessSpecification } from "../../../types/valueflows";
import { ThingInput } from "../../../types/holochain";
import { useNavigate } from "react-router-dom";
import ZomeApi from "../../../api/zomeApi";
import { getZomeApi } from "../../../hcWebsockets";

export type NewProcessSpecificationProps = {}

const initialState = {
  id: 'ps-',
  name: '',
  note: ''
}

const NewProcessSpecification: React.FC<NewProcessSpecificationProps> = () => {
  const [
    {id, name, note}, setState
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
    const rs: ProcessSpecification =  {id, name, note};
    const path: string = 'processSpecification.' + id;
    const input: ThingInput = {
      path,
      data: JSON.stringify(rs)
    }
    await getZomeApi().put_thing(input);
    //incId();
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

