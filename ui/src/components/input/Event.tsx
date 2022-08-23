import { SlInput, SlMenuItem, SlSelect, SlTextarea } from '@shoelace-style/shoelace/dist/react';
import React, { useEffect, useState } from 'react';
import { EconomicEventShape, ResourceSpecificationShape } from '../../types/valueflows';
import MeasurementInput from './Measurement';
import { DateToInputValueString, slChangeConstructor } from '../util';
import { inputOrOutputOf } from './shared';
import { EconomicEvent, EconomicResource } from '../../data/models/Valueflows/Observation';
import { usePath } from '../../data/YatiReactHook';
import getDataStore from '../../data/DataStore';
import { getAllowedActions } from '../../logic/flows';
import { applyActionResourceEffect } from '../../logic/accounting';
import { Action, Agent, Unit } from '../../data/models/Valueflows/Knowledge';

interface Props {
  eventState: EconomicEventShape;
  readonlyFields: string[];
  conformingResource: ResourceSpecificationShape;
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

const EventInput: React.FC<Props> = ({
  eventState,
  readonlyFields,
  conformingResource,
  name,
  onChange
}) => {
  const [
    {
      action,
      provider,
      receiver,
      inputOf,
      outputOf,
      resourceQuantity,
      effortQuantity,
      note,
      hasPointInTime
    }, setState
  ] = useState({...initialState});

  const [resourceQuantityVisible, setresourceQuantityVisible] = useState<boolean>(false);
  const [effortQuantityVisible, setEffortQuantityVisible] = useState<boolean>(false);
  const [units, setUnits] = useState<Unit[]>([]);
  const [actions, setActions] = useState<Action[]>([]);
  const [agents, setAgents] = useState<Agent[]>([]);
  const [economicResources, setEconomicResources] = useState<Array<EconomicResource>>([]);
  // All existing resources plus one that would be created from the current Event form
  const [economicResourcesPotential, setEconomicResourcesPotential] = useState<Array<EconomicResource>>([]);

  const store = getDataStore();
  const actionMap = usePath('root.action', store);
  const unitMap = usePath('root.unit', store);
  const agentMap = usePath('root.agent', store);
  const economicResourcesRaw = usePath(`root.economicResource`, store);
  const economicEvents = usePath(`root.economicEvent`, store);

  useEffect(() => {
    setState(prevState => {
      return {...prevState, ...eventState };
    });
  }, [eventState]);

  useEffect(() => {
    setActions(getAllowedActions(eventState, Object.values(actionMap)));
  }, [actionMap]);

  useEffect(() => {
    setAgents(Object.values(agentMap));
  }, [agentMap]);

  useEffect(() => {
    setUnits(Object.values(unitMap));
  }, [unitMap]);

  /**
   * EconomicResources up to but not including the Event form.
   */
  useEffect(()=> {
    const resources = applyActionResourceEffect(Object.values(economicResourcesRaw), Object.values(economicEvents));
    setEconomicResources(resources);
  }, [economicEvents, economicResourcesRaw]);

  /**
   * EconomicResources up to and including what would potentially get created in the Event form.
   */
  useEffect(() => {
    const resources = applyActionResourceEffect([], [...Object.values(economicEvents), new EconomicEvent(eventState)]);
    setEconomicResourcesPotential(resources);
  }, [eventState, economicResources, economicEvents]);

  useEffect(() => {
    action === 'work' || action === 'use' ? setEffortQuantityVisible(true) : setEffortQuantityVisible(false);
    action !== 'work' ? setresourceQuantityVisible(true) : setresourceQuantityVisible(false);
  }, [action]);

  function disabled(f: string): boolean {
    return 0 <= readonlyFields.findIndex((v) => v == f);
  }

  const parsers = {
    'hasPointInTime': (value: string) => new Date(Date.parse(value))
  }

  const onSlChange = slChangeConstructor<EconomicEventShape>(name, onChange, setState, parsers);

  // We need a way to disable the unit selection when units have been set on another corresponding flow
  const ResourceQuantity = <MeasurementInput
    label="Resource"
    value={resourceQuantity}
    defaultUnit={conformingResource.defaultUnitOfResource}
    name='resourceQuantity'
    onChange={onSlChange}
    units={units} />;
  const EffortQuantity = <MeasurementInput
    label="Effort"
    value={effortQuantity}
    defaultUnit={conformingResource.defaultUnitOfEffort}
    name='effortQuantity'
    onChange={onSlChange}
    units={units} />;

  const showNewResourceDialogue = (): boolean => {
    return economicResourcesPotential.length > economicResources.length;
  }

  return (
    <>
      {inputOrOutputOf(inputOf as string, outputOf as string)}
      <SlSelect disabled={disabled('action')} placeholder="Select action" label="Action" name='action' value={action as string} onSlChange={onSlChange} required>
        {actions.map((act) => (<SlMenuItem key={`action_${act.id}`} value={act.id}>{act.label}</SlMenuItem>))}
      </SlSelect>
      <br />
      <SlInput disabled label="Resource conforms to" name="resourceConformsTo" value={conformingResource?.name}></SlInput>
      <br />
      {resourceQuantityVisible && ResourceQuantity}
      {resourceQuantityVisible && effortQuantityVisible && <><br /></>}
      {effortQuantityVisible && EffortQuantity}
      <br />
      <SlSelect disabled={disabled('provider')} placeholder="Select agent" label="From" name='provider' value={provider ? provider as string : null} onSlChange={onSlChange} required>
        {agents.map((agent) => (<SlMenuItem key={`provider_${agent.id}`} value={agent.id}>{agent.name}</SlMenuItem>))}
      </SlSelect>
      <br />
      <SlSelect disabled={disabled('receiver')} placeholder="Select agent" label="To" name='receiver' value={receiver ? receiver as string : null} onSlChange={onSlChange} required>
        {agents.map((agent) => (<SlMenuItem key={`receiver_${agent.id}`} value={agent.id}>{agent.name}</SlMenuItem>))}
      </SlSelect>
      <br />
      <SlInput label="Datetime" type="datetime-local" value={hasPointInTime ? DateToInputValueString(hasPointInTime as Date): ''} name="hasPointInTime" onSlChange={onSlChange} onSlInput={onSlChange}></SlInput>
      <br />
      <SlTextarea
        label='Note'
        name='note'
        // @ts-ignore
        onSlInput={onSlChange}
        value={note}
      ></SlTextarea>
      {showNewResourceDialogue()}
    </>
  );
};

export default EventInput;
