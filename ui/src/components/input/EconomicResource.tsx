import { SlButton, SlButtonGroup, SlDivider, SlInput, SlMenuItem, SlSelect, SlTextarea } from "@shoelace-style/shoelace/dist/react";
import { useEffect, useState } from "react";
import getDataStore from "../../data/DataStore";
import { EconomicResource } from "../../data/models/Valueflows/Observation";
import { AgentShape, EconomicResourceShape, ResourceSpecificationShape } from "../../types/valueflows";
import { slChangeConstructor } from '../util';

interface Props {
  conformingResource: ResourceSpecificationShape;
  agents: AgentShape[];
  afterHandleResourceSubmit: (resource: string) => void;
  resetResourceState: () => void;
}

const initialState: EconomicResourceShape = {
  name: '',
  conformsTo: '',        // ResourceSpecification
  primaryAccountable: '', // Agent ID of the accountable party
  trackingIndentifier: '', // GUID?
  currentLocation: null,
  note: '',
  classifiedAs: '',
  image: 'string',
  unitOfEffort: '',      // Unit ID
  state: '',
  stage: '',             // ProcessSpecification ID
  containedIn: '',       // EconomicResource ID
  lot: ''
};

const EconomicResourceInput: React.FC<Props> = ({ conformingResource, agents, afterHandleResourceSubmit, resetResourceState }) => {
  const [
    {name, conformsTo, primaryAccountable, trackingIndentifier, currentLocation, note, classifiedAs, image, unitOfEffort, state, stage, containedIn, lot}, setState
  ] = useState({ ...initialState });

  let resourceUpdates: EconomicResourceShape = null;
  /**
  * When the resource changes, update it.
  */
  const handleResourceChange = (e: any) => {
    resourceUpdates = new EconomicResource(e.target.value);
  }

  useEffect(()=>{
    setState(prevState => ({ ...prevState, conformsTo: conformingResource.name }));
  },[]);

  const onSlChange = slChangeConstructor<EconomicResourceShape>(name, handleResourceChange, setState, null);

  const handleResourceSubmit = () => {
    // persist to DHT
    const store = getDataStore();
    const init: EconomicResourceShape = {
      name,
      conformsTo,
      primaryAccountable,
      trackingIndentifier,
      currentLocation,
      note,  
      state,
      stage
    }
    const resource = new EconomicResource(init);
    store.set(resource);

    // slide panel back to either commitment or event
    afterHandleResourceSubmit(resource.id);
  }

  return (
    <>
      <SlInput label="Name" name="name" value={name} onSlInput={onSlChange}></SlInput>
      <br />
      <SlInput disabled label="Resource conforms to" name="resourceConformsTo" value={conformingResource?.name} onSlInput={onSlChange}></SlInput>
      <br/ >
      <SlInput label="Tracking Identifier" name="trackingIdentifier" value={trackingIndentifier} onSlInput={onSlChange}></SlInput>
      <br/ >
      <SlSelect placeholder="Select Primary Accountable" label="Primary Accountable" name='primaryAccountable' value={primaryAccountable ? primaryAccountable as string : null} onSlChange={onSlChange} clearable required>
        {agents.map((agent) => (<SlMenuItem key={`provider_${agent.id}`} value={agent.id}>{agent.name}</SlMenuItem>))}
      </SlSelect>
      <br />
      <SlInput label="Stage" name="stage" value={stage}></SlInput>
      <br/ >
      <SlInput label="State" name="state" value={state}></SlInput>
      <br/ >
      <SlTextarea
        label='Note'
        name='note'
        // @ts-ignore
        value={note}
      ></SlTextarea>
      <SlDivider></SlDivider>
      <SlButtonGroup slot="footer">
        <SlButton onClick={handleResourceSubmit} variant="primary">Create</SlButton>
        <SlButton onClick={resetResourceState} variant="default">Cancel</SlButton>
      </SlButtonGroup>
    </>
  );
}
export default EconomicResourceInput;