import React, { useEffect, useState } from "react";
import { SlButton, SlCard, SlInput, SlMenuItem, SlSelect, SlTextarea } from "@shoelace-style/shoelace/dist/react/index";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { ResourceSpecificationShape, UnitShape, ResourceSpecification } from "valueflows-models";
import MainPanelHeader from "../../components/layout/MainPanelHeader";
import { getDataStore } from "../../data/DataStore";
import { DisplayNode } from "../../data/models/Application/Display";
import { PathFunctor } from "data-providers";

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
  const store = getDataStore();

  const [
    {name, image, resourceClassifiedAs, defaultUnitOfResource, defaultUnitOfEffort, note}, setState
  ] = useState(initialState);
  const [oldName, setOldName] = useState<string>('');

  const [units, setUnits] = useState<UnitShape[]>([]);

  const navigate = useNavigate();
  let { id } = useParams();

  useEffect(() => {
    const store = getDataStore();
    setUnits(store.getUnits());
    if (id) {
      const obj = store.getById<ResourceSpecification>(id);
      setState({
        name: obj.name ? obj.name : '',
        image: obj.image ? obj.image : '',
        resourceClassifiedAs: obj.resourceClassifiedAs ? obj.resourceClassifiedAs : '',
        defaultUnitOfResource: obj.defaultUnitOfResource ? obj.defaultUnitOfResource : '',
        defaultUnitOfEffort: obj.defaultUnitOfEffort ? obj.defaultUnitOfEffort : '',
        note: obj.note ? obj.note : ''
      })
      setOldName(obj.name);
    };
  }, []);

  const clearState = () => {
    setState({ ...initialState });
    setOldName('');
  };

  const updateDependants = (): void => {
    try {
      const plans = Object.keys(store.getCursor('root.plan'));
      for (let planId in plans) {
        const displayNodes = store.getDisplayNodes(planId);
        displayNodes.forEach(ele => {
          if (ele.type === 'resourceSpecification') {
            if (ele.name === oldName) {
              ele.name = name;
            }
          }
          store.upsert<DisplayNode>(ele, DisplayNode);
        });
      }
    } catch (e) {
      console.info('no displaynodes');
    }
  }

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
    e.preventDefault();

    const rs = new ResourceSpecification({id, name, image, resourceClassifiedAs, defaultUnitOfResource, defaultUnitOfEffort, note});
    const prs  = PathFunctor(rs, `root.resourceSpecification.${rs.id}`);
    store.upsert<ResourceSpecification>(prs, ResourceSpecification);
    if (id) {
      updateDependants();
    }
    clearState();
    navigate('/resource-specifications');
  }

  function header() {
    if (id) {
      return <>Edit Resource Specification</>
    } else {
      return <>New Resource Specification</>
    }
  }

  return (
    <>
      <MainPanelHeader>
        <h2>{header()}</h2>
        <Link to="/resource-specifications">
          <SlButton variant="warning">Cancel</SlButton>
        </Link>
      </MainPanelHeader>
        <SlCard className="create-resource scrollable-view">
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
