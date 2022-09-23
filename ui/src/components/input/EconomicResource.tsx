import { SlInput, SlMenuItem, SlSelect, SlTextarea } from "@shoelace-style/shoelace/dist/react";
import { useEffect, useState } from "react";
import { AgentShape, EconomicResourceShape, ResourceSpecificationShape } from "../../types/valueflows";
import { slChangeConstructor } from '../util';

interface Props {
  resourceState: EconomicResourceShape;
  conformingResource: ResourceSpecificationShape;
  agents: AgentShape[];
  name: string;
  onChange?: (event: any) => void;
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

const EconomicResourceInput: React.FC<Props> = ({ resourceState, conformingResource, agents, name: fieldName, onChange }) => {
  const [
    {name, conformsTo, primaryAccountable, trackingIndentifier, currentLocation, note, classifiedAs, image, unitOfEffort, state, stage, containedIn, lot}, setState
  ] = useState({ ...initialState });

  useEffect(()=>{
    setState(prevState => ({ ...prevState, resourceState }));
  },[]);

  const onSlChange = slChangeConstructor<EconomicResourceShape>(fieldName, onChange, setState);

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
      <SlInput disabled label="Stage" name="stage" value={stage}></SlInput>
      <br />
      <SlInput disabled label="State" name="state" value={state}></SlInput>
      <br />
      <SlTextarea
        label='Note'
        name='note'
        // @ts-ignore
        value={note}
      ></SlTextarea>
    </>
  );
}
export default EconomicResourceInput;