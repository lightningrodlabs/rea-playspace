import { Guid } from "guid-typescript";
import { PathedData } from "../PathedData";
import { NamedData } from "../NamedData";
import { AgentShape, ResourceSpecificationShape, ProcessSpecificationShape, ActionShape, InputOutput, ResourceEffect} from "../../../types/valueflows";
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
    this.created = this.created ? this.created : new Date();
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
 * The archetype of a resource. The accounting happens on the `EconomicResource`.
 */
export class ResourceSpecification implements ResourceSpecificationShape, PathedData, NamedData {
  id: string;
  created: Date;
  name: string;
  note?: string;
  image?: string;
  resourceClassifiedAs?: string;
  defaultUnitOfResource?: string;
  defaultUnitOfEffort?: string;

  constructor(init: ResourceSpecificationShape) {
    assignFields<ResourceSpecificationShape, ResourceSpecification>(init, this);
    this.id = this.id ? this.id : Guid.raw();
    this.created = this.created ? this.created : new Date();
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
    this.created = this.created ? this.created : new Date();
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
    return 'root.processSpecification';
  }

  static getPath(id: string): string {
    return `${ProcessSpecification.getPrefix()}.${id}`;
  }

  get path(): string {
    return ProcessSpecification.getPath(this.id);
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
