import { Guid } from "guid-typescript";
import { PathedData } from "../PathedData";
import { NamedData } from "../NamedData";
import {
  AgentShape,
  ResourceSpecificationShape,
  ProcessSpecificationShape,
  ActionShape,
  InputOutput,
  ResourceEffect,
  UnitShape,
  MeasurementShape,
  GeoDataShape,
  GeoPointShape
} from "../../../types/valueflows";
import { assignFields, toJSON } from '../../../utils';

// Knowledge Classes

/**
 * Agent can be an individual, organization, etc.
 */
export class Agent implements AgentShape, PathedData, NamedData {
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

  static getPrefix(): string {
    return 'root.agent';
  }

  static getPath(id: string): string {
    return `${Agent.getPrefix()}.${id}`;
  }

  get path(): string {
    return Agent.getPath(this.id);
  }

  public toJSON(): AgentShape {
    return toJSON<AgentShape, Agent>(this);
  }
}

/**
 * Basic model of Units
 */
export class Unit {
  id: string;
  name: string;
  symbol: string;

  constructor(init: UnitShape) {
    assignFields<UnitShape, Unit>(init, this);
    this.id = this.id ? this.id : Guid.raw();
  }

  static getPrefix(): string {
    return 'root.unit';
  }

  static getPath(id: string): string {
    return `${Unit.getPrefix()}.${id}`;
  }

  get path(): string {
    return Unit.getPath(this.id);
  }

  public toJSON(): UnitShape {
    return toJSON<UnitShape, Unit>(this);
  }
}

/**
 * Basic model of a measurement from the OM Schema
 */
export class Measurement implements MeasurementShape {
  hasNumericalValue: number;  // actual quantity
  hasUnit: string;            // ID of unit

  constructor(init?: MeasurementShape) {
    this.hasNumericalValue = 0;
    this.hasUnit = '';
    if (init) {
      assignFields<MeasurementShape, Measurement>(init, this);
    }
  }

  public toJSON(): MeasurementShape {
    return toJSON<MeasurementShape, Measurement>(this);
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
    symbol: ''
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

export class GeoPoint implements GeoPointShape {
  lat: number;
  lng: number;

  constructor(init: GeoPointShape) {
    assignFields<GeoPointShape, GeoPoint>(init, this);
  }
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
}

/**
 * The archetype of a resource. The accounting happens on the `EconomicResource`.
 */
export class ResourceSpecification implements ResourceSpecificationShape, PathedData, NamedData {
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

  static getPrefix(): string {
    return 'root.resourceSpecification';
  }

  static getPath(id: string): string {
    return `${ResourceSpecification.getPrefix()}.${id}`;
  }

  get path(): string {
    return ResourceSpecification.getPath(this.id);
  }

  public toJSON(): ResourceSpecificationShape {
    return toJSON<ResourceSpecificationShape, ResourceSpecification>(this);
  }
}

/**
 * The archetype of a Process. Each `Process` is an instance of a `ProcessSpecification`.
 */
export class ProcessSpecification implements ProcessSpecificationShape, PathedData, NamedData {
  id: string;
  created: Date;
  name: string;
  note?: string;

  constructor(init: ProcessSpecificationShape) {
    assignFields<ProcessSpecificationShape, ProcessSpecification>(init, this);
    this.id = this.id ? this.id : Guid.raw();
    this.created = this.created ? new Date(this.created) : new Date();
  }

  static getPrefix(): string {
    return 'root.processSpecification';
  }

  static getPath(id: string): string {
    return `${ProcessSpecification.getPrefix()}.${id}`;
  }

  get path(): string {
    return ProcessSpecification.getPath(this.id);
  }

  public toJSON(): ProcessSpecificationShape {
    return toJSON<ProcessSpecificationShape, ProcessSpecification>(this);
  }
}

// We could organize these as `root.actions.${id}`
// then they could be a part of the standard pathed data system

export type ActionKey = 'accept'
                      | 'combine'
                      | 'consume'
                      | 'cite'
                      | 'deliver-service'
                      | 'dropoff'
                      | 'lower'
                      | 'modify'
                      | 'move'
                      | 'pickup'
                      | 'produce'
                      | 'raise'
                      | 'separate'
                      | 'transfer-all-rights'
                      | 'transfer'
                      | 'transfer-custody'
                      | 'use'
                      | 'work';

export const isInSet = (set: string[], action: string): boolean => {
  return set.findIndex((t) => action == t) > -1;
}

export const isTransfer = (action: string):boolean => {
  return isInSet([
    'transfer',
    'transfer-all-rights',
    'transfer-custody'], action);
}

/**
 * Action determines which rules are applied to the flows through the various
 * objects: Intent, Commitment, Fulfillment, & Claim. These rules are responsible
 * for the accounting effects of the flows.
 */
export class Action implements PathedData, ActionShape {
  id: ActionKey;
  label: string;
  inputOutput: InputOutput;
  resourceEffect?: ResourceEffect;
  onhandEffect?: ResourceEffect;
  pairsWith?: string;
  locationEffect?: string;
  containedEffect?: string;

  constructor(init: ActionShape) {
    assignFields<ActionShape, Action>(init, this);
  }

  static getPrefix(): string {
    return 'root.action';
  }

  static getPath(id: string): string {
    return `${Action.getPrefix()}.${id}`;
  }

  get path(): string {
    return Action.getPath(this.id);
  }

  public toJSON(): ActionShape {
    return toJSON<ActionShape, Action>(this);
  }
}

/**
 * These are the canonical Action definitions. These are intended to be extensible.
 */
export const Actions = {
  'use': new Action({
    id: 'use',
    label: 'Use',
    inputOutput: 'input',
    comment: "For example a tool used in process; after the process, the tool still exists."
  }),
  'work': new Action({
    id: 'work',
    label: 'Work',
    inputOutput: 'input',
    comment: "Labor power applied to a process."
  }),
  'accept': new Action({
    id: 'accept',
    label: 'Accept',
    inputOutput: 'input',
    onhandEffect: 'decrement',
    pairsWith: 'modify',
    comment: "In processes like repair or modification or testing, the same resource will appear in the output."
  }),
  'modify': new Action({
    id: 'modify',
    label: 'Modify',
    inputOutput: 'output',
    onhandEffect: 'increment',
    pairsWith: 'accept',
    comment: "In processes like repair or modification, the same resource will appear in the input."
  }),
  'consume': new Action({
    id: 'consume',
    label: 'Consume',
    inputOutput: 'input',
    onhandEffect: 'decrement',
    resourceEffect: 'decrement',
    comment: "For example an ingredient or component composed into the output, after the process the ingredient is gone."
  }),
  'produce': new Action({
    id: 'produce',
    label: 'Produce',
    inputOutput: 'output',
    comment: ""
  }),
  'cite': new Action({
    id: 'cite',
    label: 'Cite',
    inputOutput: 'input',
    comment: "For example a design file, neither used nor consumed, the file remains available at all times."
  }),
  'lower': new Action({
    id: 'lower',
    label: 'Lower',
    onhandEffect: 'decrement',
    resourceEffect: 'decrement',
    comment: "Adjusts a quantity down based on a beginning balance or inventory count."
  }),
  'raise': new Action({
    id: 'raise',
    label: 'Raise',
    onhandEffect: 'increment',
    resourceEffect: 'increment',
    comment: "Adjusts a quantity up based on a beginning balance or inventory count."
  }),
  'deliver-service': new Action({
    id: 'deliver-service',
    label: 'Deliver Service',
    inputOutput: 'both',
    comment: "New service produced and delivered (a service implies that an agent actively receives the service)."
  }),
  'dropoff': new Action({
    id: 'dropoff',
    label: 'Dropoff',
    inputOutput: 'output',
    pairsWith: 'pickup',
    comment: "Transported resource or person leaves the process; the same resource or person appeared in the input."
  }),
  'pickup': new Action({
    id: 'pickup',
    label: 'Pickup',
    inputOutput: 'input',
    comment: "Transported resource or person enters the process; the same resource will appear in the output."
  }),
  'move': new Action({
    id: 'move',
    label: 'Move',
    inputOutput: 'na',
    locationEffect: 'update',
    comment: "Change location and possibly identifier, if location is part of the identification, of a resource with no change of agent rights or possession."
  }),
  'transfer-all-rights': new Action({
    id: 'transfer-all-rights',
    label: 'Transfer all rights',
    inputOutput: 'na',
    resourceEffect: 'decrementIncrement',
    comment: "Give full (in the human realm) rights and responsibilities to another agent, without transferring physical custody."
  }),
  'transfer': new Action({
    id: 'transfer',
    label: 'Transfer',
    inputOutput: 'na',
    onhandEffect: 'decrementIncrement',
    resourceEffect: 'decrementIncrement',
    locationEffect: 'update',
    comment: "Give full rights and responsibilities plus physical custody."
  }),
  'transfer-custody': new Action({
    id: 'transfer-custody',
    label: 'Transfer custody',
    inputOutput: 'na',
    onhandEffect: 'decrementIncrement',
    locationEffect: 'update',
    comment: "Give physical custody and control of a resource, without full accounting or ownership rights."
  }),
  'combine': new Action({
    id: 'combine',
    label: 'Combine',
    inputOutput: 'input',
    onhandEffect: 'decrement',
    containedEffect: 'update',
    pairsWith: 'separate',
    comment: "A resource is combined with other resources into a container resource."
  }),
  'separate': new Action({
    id: 'separate',
    label: 'Separate',
    inputOutput: 'output',
    onhandEffect: 'increment',
    containedEffect: 'remove',
    pairsWith: 'combine',
    comment: "A resource is removed from a container resource."
  })
}
