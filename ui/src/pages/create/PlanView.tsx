import React, { useEffect, useState } from "react";
import { SlButton, SlCard, SlInput, SlTextarea } from "@shoelace-style/shoelace/dist/react/index";
import { Link, useParams } from "react-router-dom";
import MainPanelHeader from "../../components/layout/MainPanelHeader";
import { ExtendedPlan } from "../../data/models/Application";
import { useNavigate } from "react-router-dom";
import { getDataStore } from "../../data/DataStore";
import { PathFunctor } from "data-providers";

export type NewPlanProps = {}

const initialState = {
  name: '',
  note: ''
}

const NewPlan: React.FC<NewPlanProps> = () => {
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
      const obj = store.getById<ExtendedPlan>(id);
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

    const rs =  new ExtendedPlan({id, name, note});
    const pr = PathFunctor(rs, `root.plan.${rs.id}`);
    store.upsert(pr, ExtendedPlan);

    clearState();
    navigate('/plans');
  }

  function header() {
    if (id) {
      return <>Edit Plan</>
    } else {
      return <>New Plan</>
    }
  }

  return (
    <>
      <MainPanelHeader>
        <h2>{header()}</h2>
        <Link to="/plans">
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

export default NewPlan;


