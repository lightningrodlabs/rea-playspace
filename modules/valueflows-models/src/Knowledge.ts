import { Guid } from "guid-typescript";
import { assignFields, fieldsToJSON, toJSON } from "typed-object-tweezers";
import { HasIdDate } from "./Common";

// Knowledge Classes

export interface AgentShape extends HasIdDate {
  name: string,
  note?: string,
  image?: string,
  primaryLocation?: string
}

/**
 * Agent can be an individual, organization, etc.
 */
export class Agent implements AgentShape {
  id: string;
  created: Date;
  name: string;
  note?: string;
  image?: string;
  primaryLocation?: string;

  constructor(init: AgentShape) {
    assignFields<AgentShape, Agent>(init, this);
    this.id = this.id ? this.id : Guid.raw();
    this.created = this.created ? new Date(this.created) : new Date();
  }

  public toJSON(): AgentShape {
    return fieldsToJSON<AgentShape, Agent>(
      this, [
        'id',
        'created',
        'name',
        'note',
        'image',
        'primaryLocation'
      ]
    );
  }
}

/**
 * Basic model of Units
 */

export interface UnitShape {
  id: string;
  name: string;
  symbol: string;
}

export class Unit {
  id: string;
  name: string;
  symbol: string;

  constructor(init: UnitShape) {
    assignFields<UnitShape, Unit>(init, this);
    this.id = this.id ? this.id : Guid.raw();
  }

  public toJSON(): UnitShape {
    return fieldsToJSON(this, ['id', 'name', 'symbol']);
  }
}

/**
 * Small selection of units for demo purpose
 */
 export const Units = {
  'piece': new Unit({
    id: 'piece',
    name: 'piece',
    symbol: ''
  }),
  'one': new Unit({
    id: 'one',
    name: 'each',
    symbol: 'ea'
  }),
  'day': new Unit({
    id: 'day',
    name: 'day',
    symbol: 'd'
  }),
  'hour': new Unit({
    id: 'hour',
    name: 'hour',
    symbol: 'h'
  }),
  'minute': new Unit({
    id: 'minute',
    name: 'minute',
    symbol: 'min'
  }),
  'foot-USSurvey': new Unit({
    id: 'foot-USSurvey',
    name: 'foot (US survey)',
    symbol: 'ft'
  }),
  'yard-International': new Unit({
    id: 'yard-International',
    name: 'yard (international)',
    symbol: 'yd'
  }),
  'metre': new Unit({
    id: 'metre',
    name: 'metre',
    symbol: 'm'
  }),
  'centimetre': new Unit({
    id: 'centimetre',
    name: 'centimetre',
    symbol: 'cm'
  }),
  'kilometre': new Unit({
    id: 'kilometre',
    name: 'kilometre',
    symbol: 'km'
  }),
  'mile-USSurvey': new Unit({
    id: 'mile-USSurvey',
    name: 'mile (US survey)',
    symbol: 'mi'
  }),
  'acre-USSurvey': new Unit({
    id: 'acre-USSurvey',
    name: 'acre (US survey)',
    symbol: 'ac'
  }),
  'gallon-US': new Unit({
    id: 'gallon-US',
    name: 'gallon (US)',
    symbol: 'gal'
  }),
  'cup-USCustomary': new Unit({
    id: 'cup-USCustomary',
    name: 'cup (US customary)',
    symbol: 'cup'
  }),
  'tablespoon-US': new Unit({
    id: 'tablespoon-US',
    name: 'tablespoon (US)',
    symbol: 'tbsp.'
  }),
  'teaspoon-US': new Unit({
    id: 'teaspoon-US',
    name: 'teaspoon (US)',
    symbol: 'tsp.'
  }),
  'litre': new Unit({
    id: 'litre',
    name: 'litre',
    symbol: 'l'
  }),
  'millilitre': new Unit({
    id: 'millilitre',
    name: 'millilitre',
    symbol: 'ml'
  }),
  'gram': new Unit({
    id: 'gram',
    name: 'gram',
    symbol: 'g'
  }),
  'kilogram': new Unit({
    id: 'kilogram',
    name: 'kilogram',
    symbol: 'kg'
  }),
  'tonne': new Unit({
    id: 'tonne',
    name: 'tonne',
    symbol: 't'
  }),
  'poundAvoirdupois': new Unit({
    id: 'poundAvoirdupois',
    name: 'pound',
    symbol: 'lb'
  })
}

export interface GeoPointShape extends HasIdDate {
  lat: number;
  lng: number;
}

export class GeoPoint implements GeoPointShape {
  lat: number;
  lng: number;

  constructor(init: GeoPointShape) {
    assignFields<GeoPointShape, GeoPoint>(init, this);
  }

  public toJSON(): GeoPointShape {
    return fieldsToJSON(this, ['lat','lng']);
  }
}

export interface GeoDataShape extends HasIdDate {
  type: string;
  name?: string;
  address?: string;
  point?: GeoPointShape | string;
}

export class GeoData implements GeoDataShape {
  type: string;
  name?: string;
  address?: string;
  point?: GeoPoint | string;

  constructor(init: GeoDataShape) {
    assignFields<GeoDataShape, GeoData>(init, this);
    if (init.point && typeof init.point == 'object') {
      this.point = new GeoPoint(init.point);
    }
  }

  public toJSON(): GeoDataShape {
    return fieldsToJSON(this, ['type','name', 'address','point']);
  }
}

/**
 * The archetype of a resource. The accounting happens on the `EconomicResource`.
 */

export interface ResourceSpecificationShape extends HasIdDate {
  name: string,
  note?: string,
  image?: string,
  resourceClassifiedAs?: string,
  defaultUnitOfResource?: string,
  defaultUnitOfEffort?: string
}

export class ResourceSpecification implements ResourceSpecificationShape {
  id: string;
  created: Date;
  name: string;
  note?: string;
  image?: string;
  resourceClassifiedAs?: string;
  defaultUnitOfResource?: string; // Unit ID
  defaultUnitOfEffort?: string;   // Unit ID

  constructor(init: ResourceSpecificationShape) {
    assignFields<ResourceSpecificationShape, ResourceSpecification>(init, this);
    this.id = this.id ? this.id : Guid.raw();
    this.created = this.created ? new Date(this.created) : new Date();
  }

  public toJSON(): ResourceSpecificationShape {
    return fieldsToJSON<ResourceSpecificationShape, ResourceSpecification>(
      this, [
        'id',
        'created',
        'name',
        'note',
        'image',
        'resourceClassifiedAs',
        'defaultUnitOfResource',
        'defaultUnitOfEffort'
      ]
    );
  }
}

/**
 * The archetype of a Process. Each `Process` is an instance of a `ProcessSpecification`.
 */

export interface ProcessSpecificationShape extends HasIdDate {
  name: string,
  note?: string
}

export class ProcessSpecification implements ProcessSpecificationShape {
  id: string;
  created: Date;
  name: string;
  note?: string;

  constructor(init: ProcessSpecificationShape) {
    assignFields<ProcessSpecificationShape, ProcessSpecification>(init, this);
    this.id = this.id ? this.id : Guid.raw();
    this.created = this.created ? new Date(this.created) : new Date();
  }

  public toJSON(): ProcessSpecificationShape {
    return fieldsToJSON<ProcessSpecificationShape, ProcessSpecification>(
      this, [
        'id',
        'created',
        'name',
        'note'
      ]
    );
  }
}

// We could organize these as `root.actions.${id}`
// then they could be a part of the standard pathed data system

export type EventQuantity = 'resource' | 'effort' | 'both';
export type InputOutput = 'input' | 'output' | 'both' | 'na';
export type PairsWith = 'dropoff' | 'pickup' | 'modify' | 'accept' | 'separate' | 'combine';
export type CreateResource = 'optional' | 'optionalTo';
export type AccountingEffect = 'decrement' | 'decrementIncrement' | 'increment';
export type OnHandEffect = AccountingEffect;
export type QuantityEffect = AccountingEffect | OnHandEffect;
export type LocationEffect = 'new' | 'update' | 'updateTo';
export type ContainedEffect = 'update' | 'remove';
export type AccountableEffect = 'new' | 'updateTo';
export type StageEffect = 'stage';
export type StateEffect = 'update' | 'updateTo';

export type ActionKey = 'accept'
                      | 'combine'
                      | 'consume'
                      | 'cite'
                      | 'deliverService'
                      | 'dropoff'
                      | 'lower'
                      | 'modify'
                      | 'move'
                      | 'pickup'
                      | 'produce'
                      | 'raise'
                      | 'separate'
                      | 'transferAllRights'
                      | 'transfer'
                      | 'transferCustody'
                      | 'use'
                      | 'work';

export const isInSet = (set: string[], action: string): boolean => {
  return set.findIndex((t) => action == t) > -1;
}

export const isTransfer = (action: ActionKey):boolean => {
  return isInSet([
    'transfer',
    'transfer-all-rights',
    'transfer-custody'], action);
}

export interface ActionShape {
  id: ActionKey;
  label: string;
  eventQuantity: EventQuantity;
  inputOutput?: InputOutput;
  pairsWith?: PairsWith;
  createResource?: CreateResource;
  accountingEffect?: AccountingEffect;
  onhandEffect?: OnHandEffect;
  locationEffect?: LocationEffect;
  containedEffect?: ContainedEffect;
  accountableEffect?: AccountableEffect;
  stageEffect?: StageEffect;
  stateEffect?: StateEffect;
  comment?: string;
}

export interface HasAction {
  action: ActionKey;
}

/**
 * Action determines which rules are applied to the flows through the various
 * objects: Intent, Commitment, Fulfillment, & Claim. These rules are responsible
 * for the accounting effects of the flows.
 */
export class Action implements ActionShape {
  id: ActionKey;
  label: string;
  eventQuantity: EventQuantity;
  inputOutput: InputOutput;
  createResource?: CreateResource;
  accountingEffect?: AccountingEffect;
  onhandEffect?: OnHandEffect;
  pairsWith?: PairsWith;
  locationEffect?: LocationEffect;
  containedEffect?: ContainedEffect;
  accountableEffect?: AccountableEffect;
  stageEffect?: StageEffect;
  stateEffect?: StateEffect;
  comment?: string;

  constructor(init: ActionShape) {
    assignFields<ActionShape, Action>(init, this);
  }

  get hasIncrementDecrement(): boolean {
    return (this.accountingEffect && this.accountingEffect === 'decrementIncrement') ||
           (this.onhandEffect && this.onhandEffect === 'decrementIncrement')
  }

  public toJSON(): ActionShape {
    return fieldsToJSON<ActionShape, Action>(
      this, [
        'id',
        'label',
        'eventQuantity',
        'inputOutput',
        'createResource',
        'accountingEffect',
        'onhandEffect',
        'pairsWith',
        'locationEffect',
        'containedEffect',
        'accountableEffect',
        'stageEffect',
        'stateEffect',
        'comment'
      ]
    );
  }
}

/**
 * These are the canonical Action definitions. These are intended to be extensible.
 */
export const Actions: Record<ActionKey, Action> = {
  'use': new Action({
    id: 'use',
    label: 'Use',
    eventQuantity: 'both',
    inputOutput: 'input',
    stateEffect: 'update',
    comment: "For example a tool used in process; after the process, the tool still exists."
  }),
  'work': new Action({
    id: 'work',
    label: 'Work',
    eventQuantity: 'effort',
    inputOutput: 'input',
    comment: "Labor power applied to a process."
  }),
  'accept': new Action({
    id: 'accept',
    label: 'Accept',
    eventQuantity: 'resource',
    inputOutput: 'input',
    onhandEffect: 'decrement',
    stateEffect: 'update',
    pairsWith: 'modify',
    comment: "In processes like repair or modification or testing, the same resource will appear in the output."
  }),
  'modify': new Action({
    id: 'modify',
    label: 'Modify',
    eventQuantity: 'resource',
    inputOutput: 'output',
    onhandEffect: 'increment',
    stateEffect: 'update',
    stageEffect: 'stage',
    pairsWith: 'accept',
    comment: "In processes like repair or modification, the same resource will appear in the input."
  }),
  'consume': new Action({
    id: 'consume',
    label: 'Consume',
    eventQuantity: 'resource',
    inputOutput: 'input',
    onhandEffect: 'decrement',
    accountingEffect: 'decrement',
    stateEffect: 'update',
    comment: "For example an ingredient or component composed into the output, after the process the ingredient is gone."
  }),
  'produce': new Action({
    id: 'produce',
    label: 'Produce',
    eventQuantity: 'resource',
    inputOutput: 'output',
    createResource: 'optional',
    accountingEffect: 'increment',
    onhandEffect: 'increment',
    locationEffect: 'new',
    accountableEffect: 'new',
    stageEffect: 'stage',
    stateEffect: 'update',
    comment: "New resource was created in that process or an existing stock resource was added to."
  }),
  'cite': new Action({
    id: 'cite',
    label: 'Cite',
    eventQuantity: 'resource',
    inputOutput: 'input',
    stateEffect: 'update',
    comment: "For example a design file, neither used nor consumed, the file remains available at all times."
  }),
  'lower': new Action({
    id: 'lower',
    label: 'Lower',
    eventQuantity: 'resource',
    createResource: 'optional',
    onhandEffect: 'decrement',
    accountingEffect: 'decrement',
    accountableEffect: 'new',
    stateEffect: 'update',
    comment: "Adjusts a quantity down based on a beginning balance or inventory count."
  }),
  'raise': new Action({
    id: 'raise',
    label: 'Raise',
    eventQuantity: 'resource',
    createResource: 'optional',
    onhandEffect: 'increment',
    accountingEffect: 'increment',
    accountableEffect: 'new',
    stateEffect: 'update',
    comment: "Adjusts a quantity up based on a beginning balance or inventory count."
  }),
  'deliverService': new Action({
    id: 'deliverService',
    label: 'Deliver Service',
    eventQuantity: 'resource',
    inputOutput: 'both',
    comment: "New service produced and delivered (a service implies that an agent actively receives the service)."
  }),
  'dropoff': new Action({
    id: 'dropoff',
    label: 'Dropoff',
    eventQuantity: 'resource',
    inputOutput: 'output',
    pairsWith: 'pickup',
    locationEffect: 'update',
    stageEffect: 'stage',
    stateEffect: 'update',
    comment: "Transported resource or person leaves the process; the same resource or person appeared in the input."
  }),
  'pickup': new Action({
    id: 'pickup',
    label: 'Pickup',
    eventQuantity: 'resource',
    inputOutput: 'input',
    locationEffect: 'update',
    stateEffect: 'update',
    comment: "Transported resource or person enters the process; the same resource will appear in the output."
  }),
  'move': new Action({
    id: 'move',
    label: 'Move',
    eventQuantity: 'resource',
    inputOutput: 'na',
    createResource: 'optionalTo',
    accountingEffect: 'decrementIncrement',
    onhandEffect: 'decrementIncrement',
    locationEffect: 'updateTo',
    stateEffect: 'updateTo',
    comment: "Change location and possibly identifier, if location is part of the identification, of a resource with no change of agent rights or possession."
  }),
  'transferAllRights': new Action({
    id: 'transferAllRights',
    label: 'Transfer all rights',
    eventQuantity: 'resource',
    inputOutput: 'na',
    createResource: 'optionalTo',
    accountingEffect: 'decrementIncrement',
    accountableEffect: 'updateTo',
    stateEffect: 'updateTo',
    comment: "Give full (in the human realm) rights and responsibilities to another agent, without transferring physical custody."
  }),
  'transfer': new Action({
    id: 'transfer',
    label: 'Transfer',
    eventQuantity: 'resource',
    inputOutput: 'na',
    createResource: 'optionalTo',
    onhandEffect: 'decrementIncrement',
    accountingEffect: 'decrementIncrement',
    locationEffect: 'update',
    accountableEffect: 'updateTo',
    stateEffect: 'updateTo',
    comment: "Give full rights and responsibilities plus physical custody."
  }),
  'transferCustody': new Action({
    id: 'transferCustody',
    label: 'Transfer custody',
    eventQuantity: 'resource',
    inputOutput: 'na',
    createResource: 'optionalTo',
    onhandEffect: 'decrementIncrement',
    locationEffect: 'updateTo',
    stateEffect: 'updateTo',
    comment: "Give physical custody and control of a resource, without full accounting or ownership rights."
  }),
  'combine': new Action({
    id: 'combine',
    label: 'Combine',
    eventQuantity: 'resource',
    inputOutput: 'input',
    onhandEffect: 'decrement',
    containedEffect: 'update',
    stateEffect: 'update',
    pairsWith: 'separate',
    comment: "A resource is combined with other resources into a container resource."
  }),
  'separate': new Action({
    id: 'separate',
    label: 'Separate',
    eventQuantity: 'resource',
    inputOutput: 'output',
    onhandEffect: 'increment',
    containedEffect: 'remove',
    stageEffect: 'stage',
    stateEffect: 'update',
    pairsWith: 'combine',
    comment: "A resource is removed from a container resource."
  })
}
