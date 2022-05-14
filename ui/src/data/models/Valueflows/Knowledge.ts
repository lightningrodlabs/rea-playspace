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
