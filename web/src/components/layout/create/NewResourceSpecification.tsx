import React, { useState } from "react";
import { SlButton, SlCard, SlInput, SlTextarea } from "@shoelace-style/shoelace/dist/react";
import { Link } from "react-router-dom";
import MainPanelHeader from "./components/layout/MainPanelHeader";
import { ResourceSpecification } from "./types/valueflows";
import HoloService from "./service";
import { ThingInput } from "./types/holochain";
import { useNavigate } from "react-router-dom";

export type NewResourceSpecificationProps = {
  service: HoloService;
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

const NewResourceSpecification: React.FC<NewResourceSpecificationProps> = ({service}) => {
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
    const rs: ResourceSpecification =  {id, name, image, resourceClassifiedAs, defaultUnitOfResource, defaultUnitOfEffort, note};
    const path: string = 'resourceSpecification.' + id;
    const input: ThingInput = {
      path,
      data: JSON.stringify(rs)
    }
    await service.put_thing(input);
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


