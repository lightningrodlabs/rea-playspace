import { SlInput, SlMenuItem, SlSelect, SlTextarea } from '@shoelace-style/shoelace/dist/react';
import React, { useEffect, useState } from 'react';
import { ActionShape, AgentShape, EconomicEventShape, ResourceSpecificationShape, UnitShape } from '../../types/valueflows';
import MeasurementInput from './Measurement';
import { DateToInputValueString, slChangeConstructor } from '../util';
import { inputOrOutputOf } from './shared';
import LocationInput from './Location';

interface Props {
  eventState: EconomicEventShape;
  readonlyFields: string[];
  conformingResource: ResourceSpecificationShape;
  agents: AgentShape[];
  actions: ActionShape[];
  units: UnitShape[];
  name: string;
  onChange?: (event: any) => void;
}

const initialState: EconomicEventShape = {
  id: '',
  action: 'use',              // Needed: Action ID
  provider: '',               // Needed: Agent ID
  receiver: '',               // Needed: Agent ID
  inputOf: '',                // Process ID
  outputOf: '',               // Process ID
  resourceInventoriedAs: '',  // EconomicResource ID,  not yet implemented, but will be soon
  toResourceInventoriedAs: '',// EconomicResource ID,  not yet implemented, but will be soon
  resourceConformsTo: '',     // ResourceSpecification ID
  resourceQuantity: null,     // Need to have one of these (either resourceQuantity or effortQuantity) that match the ResourceSpecification.
  effortQuantity: null,
  resourceClassifiedAs: '',   // General classification or grouping
  hasBegining: null,          // Datetime
  hasEnd: null,               // Datetime
  hasPointInTime: null,       // Datetime
  inScopeOf: null,
  note: '',
  image: '',
  agreedIn: '',
  atLocation: null,
  toLocation: null,
  state: null
};

const EventInput: React.FC<Props> = ({eventState, readonlyFields, conformingResource, agents, actions, units, name, onChange}) => {
  const [
    {id, action, provider, receiver, inputOf, outputOf, resourceConformsTo, resourceQuantity, effortQuantity, note, hasPointInTime, atLocation, toLocation}, setState
  ] = useState({...initialState});

  const [resourceQuanityVisible, setResourceQuanityVisible] = useState<boolean>(false);
  const [effortQuanityVisible, setEffortQuanityVisible] = useState<boolean>(false);
  const [resourceAndEffortQuanityVisible, setResourceAndEffortQuanityVisible] = useState<boolean>(false);

  useEffect(() => {
    setState(prevState => {
      let state = {  ...prevState, ...eventState };
      if (action === 'work') {
        state = { ...state, effortQuantity: prevState['effortQuantity'] = null };
      }
      if (action !== 'work' && action !== 'use') {
        state = { ...state, resourceQuantity: prevState['resourceQuanity'] = null };
      }
      return state;
    });
  }, [eventState]);

  useEffect(() => {
    action === 'use' ? setResourceAndEffortQuanityVisible(true) : setResourceAndEffortQuanityVisible(false);
    action === 'work' ? setEffortQuanityVisible(true) : setEffortQuanityVisible(false);
    action !== 'use' && action !== 'work' ? setResourceQuanityVisible(true) : setResourceQuanityVisible(false);
  },[action]);

  const parsers = {
    'hasPointInTime': (value: string) => new Date(Date.parse(value))
  }

  const onSlChange = slChangeConstructor<EconomicEventShape>(name, onChange, setState, parsers);

  function disabled(f: string): boolean {
    return 0 <= readonlyFields.findIndex((v) => v == f);
  }

  const ResourceQuantity = <MeasurementInput label="Resource" value={resourceQuantity} defaultUnit={conformingResource.defaultUnitOfResource} name='resourceQuantity' onChange={onSlChange} units={units} />;

  const EffortQuanity = <MeasurementInput label="Effort" value={effortQuantity} defaultUnit={conformingResource.defaultUnitOfEffort} name='effortQuantity' onChange={onSlChange} units={units} />;

  const ResourceAndEffortQuanity =
      <>
        <MeasurementInput label="Resource" value={resourceQuantity} defaultUnit={conformingResource.defaultUnitOfResource} name='resourceQuantity' onChange={onSlChange} units={units} />
        <br />
        <MeasurementInput label="Effort" value={effortQuantity} defaultUnit={conformingResource.defaultUnitOfEffort} name='effortQuantity' onChange={onSlChange} units={units} />
      </>;

  return (
    <>
      <SlSelect disabled={disabled('action')} placeholder="Select action" label="Action" name='action' value={action as string} onSlChange={onSlChange} required>
        {actions.map((act) => (<SlMenuItem key={`action_${act.id}`} value={act.id}>{act.label}</SlMenuItem>))}
      </SlSelect>
      <br/>
      <SlSelect disabled={disabled('provider')} placeholder="Select provider" label="Provider" name='provider' value={provider ? provider as string : null} onSlChange={onSlChange} required>
        {agents.map((agent) => (<SlMenuItem key={`provider_${agent.id}`} value={agent.id}>{agent.name}</SlMenuItem>))}
      </SlSelect>
      <br/>
      <SlSelect disabled={disabled('receiver')} placeholder="Select reciever" label="Receiver" name='receiver' value={receiver ? receiver as string : null} onSlChange={onSlChange} required>
        {agents.map((agent) => (<SlMenuItem key={`receiver_${agent.id}`} value={agent.id}>{agent.name}</SlMenuItem>))}
      </SlSelect>
      <br/>
      {inputOrOutputOf(inputOf as string, outputOf as string)}
      <SlInput disabled label="Resource conforms to" name="resourceConformsTo" value={conformingResource?.name}></SlInput>
      <br />
      {resourceAndEffortQuanityVisible && ResourceAndEffortQuanity}
      {effortQuanityVisible && EffortQuanity}
      {resourceQuanityVisible && ResourceQuantity}
      <br />
      <SlInput label="Datetime" type="datetime-local" value={hasPointInTime ? DateToInputValueString(hasPointInTime as Date): ''} name="hasPointInTime" onSlChange={onSlChange} onSlInput={onSlChange}></SlInput>
      <br />
      <LocationInput disabled={disabled('atLocation')} label="At Location" name="atLocation" value={atLocation} onChange={onSlChange}></LocationInput>
      <br />
      <LocationInput disabled={disabled('toLocation')} label="To Location" name="toLocation" value={toLocation} onChange={onSlChange}></LocationInput>
      <br />
      <SlTextarea
        label='Note'
        name='note'
        // @ts-ignore
        onSlInput={onSlChange}
        value={note}
      ></SlTextarea>
    </>
  );
};

export default EventInput;