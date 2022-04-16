import React, { useState } from "react";
import { SlButton, SlCard, SlInput, SlTextarea } from "@shoelace-style/shoelace/dist/react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import ZomeApi from "../../../api/zomeApi";
import { ResourceSpecification } from "../../../types/valueflows";
import { ThingInput } from "../../../types/holochain";
import MainPanelHeader from "../MainPanelHeader";
import { getZomeApi } from "../../../hcWebsockets";

export type NewResourceSpecificationProps = {
}

const initialState = {
  id: 'rs-',
  name: '',
  image: '',
  resourceClassifiedAs: '',
  defaultUnitOfResource: '',
  defaultUnitOfEffort: '',
  note: ''
}

const NewResourceSpecification: React.FC<NewResourceSpecificationProps> = () => {
  const [
    {id, name, image, resourceClassifiedAs, defaultUnitOfResource, defaultUnitOfEffort, note}, setState
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
    const rs: ResourceSpecification =  {id, name, image, resourceClassifiedAs, defaultUnitOfResource, defaultUnitOfEffort, note};
    const path: string = 'root.resourceSpecification.' + id;
    const input: ThingInput = {
      path,
      data: JSON.stringify(rs)
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
          label="Image"
          name="image"
          // @ts-ignore
          onSlInput={onChange}
          value={image}
         
        />
        <br />
        <SlInput
          label='Resource Classified As'
          name='resourceClassifiedAs'
          // @ts-ignore
          onSlInput={onChange}
          value={resourceClassifiedAs}
          
        />
        <br />
        <SlInput
          label='Default Unit Of Resource'
          name='defaultUnitOfResource'
          // @ts-ignore
          onSlInput={onChange}
          value={defaultUnitOfResource}
         
        />
        <br />
        <SlInput
          label='Default Unit Of Effort'
          name='defaultUnitOfEffort'
          // @ts-ignore
          onSlInput={onChange}
          value={defaultUnitOfEffort}
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

export default NewResourceSpecification;


