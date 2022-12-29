import { SlCard, SlDivider, SlInput, SlMenuItem, SlSelect, SlTextarea } from '@shoelace-style/shoelace/dist/react/index';
import React, { useEffect, useState } from 'react';
import MeasurementInput from './Measurement';
import { DateToInputValueString, slChangeConstructor } from '../util';
import { inputOrOutputOf } from './shared';
import {
  EconomicEventShape,
  EconomicEvent,
  ResourceSpecificationShape,
  ResourceSpecification,
  EconomicResource,
  Action,
  EventQuantity,
  Agent,
  Unit
} from 'valueflows-models';
import { usePath } from 'yaati';
import { getDataStore } from '../../data/DataStore';
import { getAllowedActions } from '../../logic/flows';
import EconomicResourceInput from './EconomicResource';

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
  resourceInventoriedAs: '',  // EconomicResource ID
  toResourceInventoriedAs: '',// EconomicResource ID
  newInventoriedResource: null,
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
      resourceConformsTo,
      resourceInventoriedAs,
      toResourceInventoriedAs,
      newInventoriedResource,
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

  const [resourceQuantityVisible, setResourceQuantityVisible] = useState<boolean>(false);
  const [effortQuantityVisible, setEffortQuantityVisible] = useState<boolean>(false);
  const [units, setUnits] = useState<Unit[]>([]);
  const [actions, setActions] = useState<Action[]>([]);
  const [agents, setAgents] = useState<Agent[]>([]);

  // EconomicResource Selection and Creation Management code
  type ResourceOption = 'neither' | 'resource' | 'toResource' | 'both';
  const [resourceVisibility, setResourceVisibility] = useState<ResourceOption>('resource');
  const [canCreate, setCanCreate] = useState<ResourceOption>('neither');
  const [selectableEconomicResources, setSelectableEconomicResources] = useState<Array<EconomicResource>>([]);

  const store = getDataStore();
  const actionMap: Record<EventQuantity, Action> = usePath('root.action', store);
  const unitMap: Record<string, Unit> = usePath('root.unit', store);
  const agentMap: Record<string, Agent> = usePath('root.agent', store);
  const resourceSpecificationMap: Record<string, ResourceSpecification> = usePath('root.resourceSpecification', store);
  const economicResourcesRaw: Record<string, EconomicResource> = usePath(`root.economicResource`, store);

  const quantityVisibilityMethods: Record<EventQuantity, () => void> = {
    'resource': () => {
      setResourceQuantityVisible(true);
      setEffortQuantityVisible(false);
    },
    'effort': () => {
      setResourceQuantityVisible(false);
      setEffortQuantityVisible(true);
    },
    'both': () => {
      setResourceQuantityVisible(true);
      setEffortQuantityVisible(true);
    }
  }

  useEffect(() => {
    setState(prevState => {
      return {...prevState, ...eventState };
    });
    const resources = Object.values(economicResourcesRaw).filter((x) => x.conformsTo == conformingResource.id);
    setSelectableEconomicResources(resources);
    setActions(getAllowedActions(eventState, Object.values(actionMap)));
    setAgents(Object.values(agentMap));
    setUnits(Object.values(unitMap));
  }, []);

  useEffect(() => {
    // Set the visibility of the different Measurement input controls
    const currentAction: Action = actionMap[action];
    quantityVisibilityMethods[currentAction.eventQuantity]();

    // We might want to use a separate type for the following two sections:

    // This sets the visibility of the button to add an EconomicResource
    // It can only be one of 'resource', 'toResource', or 'neither'
    if (Object.hasOwn(currentAction, 'createResource')) {
      if (currentAction.createResource === 'optional') {
        setCanCreate('resource')
      } else if (currentAction.createResource === 'optionalTo') {
        setCanCreate('toResource');
      } else {
        setCanCreate('neither');
      }
    }

    // This sets the visibility of the EconomicResource selection visibility
    // It can only be 'resource', 'both', or 'neither'
    // The only times wont to show neither is if there are no {*}Effect fields
    // on the Action, such is the case for 'work' and 'deliverService'.
    if (currentAction.hasIncrementDecrement) {
      setResourceVisibility('both');
    } else if (currentAction.id === 'work' || currentAction.id === 'deliverService' ) {
      setResourceVisibility('neither');
    } else {
      setResourceVisibility('resource');
    }
  }, [action]);

  function disabled(f: string): boolean {
    return 0 <= readonlyFields.findIndex((v) => v == f);
  }

  const parsers = {
    'hasPointInTime': (value: string) => new Date(Date.parse(value)),
    'resourceInventoriedAs': (value: string) => {
      if (value === 'new') {
        console.log('Selecting new provider side resource.')
      }
      return value;
    },
    'toResourceInventoriedAs': (value: string) => {
      if (value === 'new') {
        console.log('Selecting new receiver side resource.')
      }
      return value;
    }
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

  const ResourceSelectionForm = () => {
    if (resourceVisibility === 'neither') {
      return <></>
    } else if (resourceVisibility === 'resource') {
      return <>
        <p>If you choose to not inventory the item, it will not appear in the accounting.</p>
        <div className='form-row'>
          <SlSelect required onSlChange={onSlChange} name='resourceInventoriedAs' value={resourceInventoriedAs} label='Please select the EconomicResource this Event will change.'>
            {canCreate == 'resource' && <SlMenuItem key={'new'} value='new'>Create a new EconomicResource.</SlMenuItem>}
            {canCreate == 'resource' && <SlDivider />}
            {selectableEconomicResources.map((res) => (<SlMenuItem key={`resource_${res.id}`} value={res.id}>{res.name}</SlMenuItem>))}
          </SlSelect>
        </div>
      </>;
    } else if (resourceVisibility === 'toResource') {
      return <>
        <p>If you choose to not inventory the item, it will not appear in the accounting.</p>
        <div className='form-row'>
          <SlSelect required onSlChange={onSlChange} name='toResourceInventoriedAs' value={toResourceInventoriedAs} label='Please select the EconomicResource this Event will change.'>
            {canCreate == 'toResource' && <SlMenuItem key={'new'} value='new'>Create a new EconomicResource.</SlMenuItem>}
            {canCreate == 'toResource' && <SlDivider />}
            {selectableEconomicResources.map((res) => (<SlMenuItem key={`resource_${res.id}`} value={res.id}>{res.name}</SlMenuItem>))}
          </SlSelect>
        </div>
      </>
    } else if (resourceVisibility === 'both') {
      return <>
        <p>If you choose to not inventory the item, it will not appear in the accounting.</p>
        <div className='form-row'>
          <SlSelect onSlChange={onSlChange} name='resourceInventoriedAs' value={resourceInventoriedAs} label='How does the provider inventory this item?'>
            <SlMenuItem key='blank' value=''></SlMenuItem>
            {selectableEconomicResources.map((res) => (<SlMenuItem key={`resource_${res.id}`} value={res.id}>{res.name}</SlMenuItem>))}
          </SlSelect>
        </div>
        <br />
        <div className='form-row'>
          <SlSelect onSlChange={onSlChange} required name='toResourceInventoriedAs' value={toResourceInventoriedAs} label='How does the receiver inventory this item? '>
            <SlMenuItem key='blank' value=''></SlMenuItem>
            {canCreate == 'toResource' && <SlMenuItem key={'new'} value='new'>Create a new EconomicResource.</SlMenuItem>}
            {canCreate == 'toResource' && <SlDivider />}
            {selectableEconomicResources.map((res) => (<SlMenuItem key={`resource_${res.id}`} value={res.id}>{res.name}</SlMenuItem>))}
          </SlSelect>
        </div>
      </>
    }
  }

  const ResourceForm = <>
    <br />
    <SlCard>
      <div>
        <b>Create Resource</b>
      </div>
      <br />
      <EconomicResourceInput
        name='newInventoriedResource'
        conformingResource={resourceSpecificationMap[resourceConformsTo]}
        resourceState={newInventoriedResource}
        agents={agents}
        onChange={onSlChange}
      ></EconomicResourceInput>
    </SlCard>
  </>;

  return (
    <>
      {inputOrOutputOf(inputOf as string, outputOf as string)}
      <div className='form-row'>
        <SlSelect className='half-form-width' disabled={disabled('action')} placeholder="Select action" label="Action" name='action' value={action as string} onSlChange={onSlChange} required>
          {actions.map((act) => (<SlMenuItem key={`action_${act.id}`} value={act.id}>{act.label}</SlMenuItem>))}
        </SlSelect>
        <div className='field-spacer'></div>
        <SlInput className='half-form-width' disabled label="Resource conforms to" name="resourceConformsTo" value={conformingResource?.name}></SlInput>
      </div>
      <br />
      {resourceQuantityVisible && ResourceQuantity}
      {resourceQuantityVisible && effortQuantityVisible && <><br /></>}
      {effortQuantityVisible && EffortQuantity}
      <br />
      <div className='form-row'>
        <SlSelect className='half-form-width' disabled={disabled('provider')} placeholder="Select agent" label="From" name='provider' value={provider ? provider as string : null} onSlChange={onSlChange} required>
          {agents.map((agent) => (<SlMenuItem key={`provider_${agent.id}`} value={agent.id}>{agent.name}</SlMenuItem>))}
        </SlSelect>
        <div className='field-spacer'></div>
        <SlSelect className='half-form-width' disabled={disabled('receiver')} placeholder="Select agent" label="To" name='receiver' value={receiver ? receiver as string : null} onSlChange={onSlChange} required>
          {agents.map((agent) => (<SlMenuItem key={`receiver_${agent.id}`} value={agent.id}>{agent.name}</SlMenuItem>))}
        </SlSelect>
      </div>
      <br />
      <ResourceSelectionForm></ResourceSelectionForm>
      {(resourceInventoriedAs === 'new' || toResourceInventoriedAs === 'new') && ResourceForm}
      <br />
      <SlInput className='half-form-width' label="Datetime" type="datetime-local" value={hasPointInTime ? DateToInputValueString(hasPointInTime as Date): ''} name="hasPointInTime" onSlChange={onSlChange} onSlInput={onSlChange}></SlInput>
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
