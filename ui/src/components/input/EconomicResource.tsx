import { SlInput, SlMenuItem, SlSelect, SlTextarea } from "@shoelace-style/shoelace/dist/react/index";
import { useEffect, useState } from "react";
import { AgentShape, EconomicEventShape, EconomicResourceShape, ResourceSpecificationShape } from "valueflows-models";
import { slChangeConstructor } from '../util';

interface Props {
  resourceState: EconomicResourceShape;
  eventValues: EconomicEventShape;
  resourceSpecifications: Record<string, ResourceSpecificationShape>;
  agents: AgentShape[];
  name: string;
  onChange?: (event: any) => void;
}

const initialState: EconomicResourceShape = {
  name: '',
  conformsTo: '',        // ResourceSpecification
  primaryAccountable: '', // Agent ID of the accountable party
  trackingIdentifier: '', // GUID?
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

const EconomicResourceInput: React.FC<Props> = ({ resourceState, eventValues, resourceSpecifications, agents, name: fieldName, onChange }) => {
  const [
    {name, conformsTo, primaryAccountable, trackingIdentifier, currentLocation, note, classifiedAs, image, unitOfEffort, state, stage, containedIn, lot}, setState
  ] = useState({ ...initialState });

  useEffect(()=>{
    setState(prevState => ({ ...prevState, stage: eventValues.outputOf, primaryAccountable: eventValues.receiver, conformsTo: eventValues.resourceConformsTo, ...resourceState }));
  },[]);

  const onSlChange = slChangeConstructor<EconomicResourceShape>(fieldName, onChange, setState);

  return (
    <>
      <SlInput label="Name" name="name" value={name} onSlInput={onSlChange}></SlInput>
      <br />
      <SlInput disabled={conformsTo && conformsTo != null} label="Resource conforms to" name="resourceConformsTo" value={resourceSpecifications[conformsTo]?.name} onSlInput={onSlChange}></SlInput>
      <br/ >
      <SlInput label="Tracking Identifier" name="trackingIdentifier" value={trackingIdentifier} onSlInput={onSlChange}></SlInput>
      <br/ >
      <SlSelect disabled={primaryAccountable && primaryAccountable != null} placeholder="Select Primary Accountable" label="Primary Accountable" name='primaryAccountable' value={primaryAccountable ? primaryAccountable as string : null} onSlChange={onSlChange} clearable required>
        {agents.map((agent) => (<SlMenuItem key={`provider_${agent.id}`} value={agent.id}>{agent.name}</SlMenuItem>))}
      </SlSelect>
      <br />
      <SlInput disabled label="Stage" name="stage" value={stage}></SlInput>
      <br />
      {/* <SlInput disabled label="State" name="state" value={state}></SlInput>
      <br /> */}
      <SlTextarea
        label='Note'
        name='note'
        // @ts-ignore
        value={note}
        onSlInput={onSlChange}
      ></SlTextarea>
    </>
  );
}
export default EconomicResourceInput;