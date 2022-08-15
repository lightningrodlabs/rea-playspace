import React, { useEffect, useState } from "react";
import { SlButton, SlCard, SlInput, SlTextarea } from "@shoelace-style/shoelace/dist/react";
import { Link, useParams } from "react-router-dom";
import MainPanelHeader from "../MainPanelHeader";
import { ProcessSpecification } from "../../../data/models/Valueflows/Knowledge";
import { useNavigate } from "react-router-dom";
import getDataStore from "../../../data/DataStore";
import { ProcessSpecificationShape } from "../../../types/valueflows";

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
  let { id } = useParams();

  const clearState = () => {
    setState({ ...initialState });
  };

  useEffect(() => {
    if (id) {
      const store = getDataStore();
      const obj = store.getById(id);
      setState({
        name: obj.name ? obj.name : '',
        note: obj.note ? obj.note : ''
      })
    };
  }, []);

  const onChange = e => {
    const { name, value } = e.target;
    setState(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    const store = getDataStore();

    const rs =  new ProcessSpecification({name, note});
    if (id) {
      rs.id = id;
    }
    store.upsert<ProcessSpecificationShape, ProcessSpecification>(rs, ProcessSpecification);

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
      <SlCard className="create-resource scrollable-view">
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
          { id ? 'Update' : 'Create' }
        </SlButton>
      </form>
    </SlCard>
    </>
  );
};

export default NewProcessSpecification;


