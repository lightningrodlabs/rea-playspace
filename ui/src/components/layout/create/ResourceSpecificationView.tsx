import React, { useEffect, useState } from "react";
import { SlButton, SlCard, SlInput, SlMenuItem, SlSelect, SlTextarea } from "@shoelace-style/shoelace/dist/react";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { ResourceSpecification } from "../../../data/models/Valueflows/Knowledge";
import MainPanelHeader from "../MainPanelHeader";
import getDataStore from "../../../data/DataStore";
import { ResourceSpecificationShape, UnitShape } from "../../../types/valueflows";

export type ResourceSpecificationProps = {
}

const ResourceSpecificationView: React.FC<ResourceSpecificationProps> = () => {
  const initialState: ResourceSpecificationShape = {
    name: '',
    image: '',
    resourceClassifiedAs: '',
    defaultUnitOfResource: '',
    defaultUnitOfEffort: '',
    note: ''
  };

  const [
    {name, image, resourceClassifiedAs, defaultUnitOfResource, defaultUnitOfEffort, note}, setState
  ] = useState(initialState);

  const [units, setUnits] = useState<UnitShape[]>([]);

  const navigate = useNavigate();
  let { id } = useParams();

  useEffect(() => {
    const store = getDataStore();
    setUnits(store.getUnits());
    if (id) {
      const obj = store.getById(id);
      setState({
        name: obj.name ? obj.name : '',
        image: obj.image ? obj.image : '',
        resourceClassifiedAs: obj.resourceClassifiedAs ? obj.resourceClassifiedAs : '',
        defaultUnitOfResource: obj.defaultUnitOfResource ? obj.defaultUnitOfResource : '',
        defaultUnitOfEffort: obj.defaultUnitOfEffort ? obj.defaultUnitOfEffort : '',
        note: obj.note ? obj.note : ''
      })
    };
    
  }, []);

  const clearState = () => {
    setState({ ...initialState });
  };

  /**
   * Handle changes.
   *
   * TODO: Only one of defaultUnitOfResource or defaultUnitOfEffort should be set
   */
  const onChange = e => {
    const { name, value } = e.target;
    setState(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    const store = getDataStore();

    const rs =  new ResourceSpecification({name, image, resourceClassifiedAs, defaultUnitOfResource, defaultUnitOfEffort, note});
    if (id) {
      rs.id = id;
      store.upsert<ResourceSpecificationShape, ResourceSpecification>(rs, ResourceSpecification);
    } else {
      store.set(rs);
    }
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
        <SlSelect
          label='Default Unit Of Resource'
          name='defaultUnitOfResource'
          // @ts-ignore
          onSlChange={onChange}
          value={defaultUnitOfResource}
        >
          {units.map((unit) => (<SlMenuItem key={`resource_unit_${unit.id}`} value={unit.id}>{unit.name}</SlMenuItem>))}
        </SlSelect>
        <br />
        <SlSelect
          label='Default Unit Of Effort'
          name='defaultUnitOfEffort'
          // @ts-ignore
          onSlChange={onChange}
          value={defaultUnitOfEffort}
        >
          {units.map((unit) => (<SlMenuItem key={`effort_unit_${unit.id}`} value={unit.id}>{unit.name}</SlMenuItem>))}
        </SlSelect>
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
          {id ? 'Update' : 'Create'}
        </SlButton>
      </form>
    </SlCard>
    </>
  );
};

export default ResourceSpecificationView;
