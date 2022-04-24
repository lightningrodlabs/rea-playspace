import { Guid } from "guid-typescript";
import { PathedData } from "../PathedData";
import { AgentShape, ResourceSpecificationShape, ProcessSpecificationShape } from "../../../types/valueflows";
import { rejectEmptyFields } from '../../../utils';

// Knowledge Classes


export class Agent implements AgentShape, PathedData {
  id: string;
  created: Date;
  name: string;
  note?: string;
  image?: string;
  primaryLocation?: string;

  constructor(init: AgentShape) {
    const filtered = rejectEmptyFields<AgentShape>(init);
    this.id = filtered.id ? filtered.id : Guid.raw();
    this.created = filtered.created ? filtered.created : new Date();
    this.name = filtered.name;
    this.note = filtered.note ? filtered.note : undefined;
    this.image = filtered.image ? filtered.image : undefined;
    this.primaryLocation = filtered.primaryLocation ? filtered.primaryLocation : undefined;
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
    return {
      id: this.id.toString(),
      created: this.created,
      name: this.name,
      note: this.note,
      image: this.image,
      primaryLocation: this.primaryLocation,
    };
  }
}

export class ResourceSpecification implements ResourceSpecificationShape, PathedData {
  id: string;
  created: Date;
  name: string;
  note?: string;
  image?: string;
  resourceClassifiedAs?: string;
  defaultUnitOfResource?: string;
  defaultUnitOfEffort?: string;

  constructor(init: ResourceSpecificationShape) {
    const filtered = rejectEmptyFields<ResourceSpecificationShape>(init);
    this.id = filtered.id ? filtered.id : Guid.raw();
    this.created = filtered.created ? filtered.created : new Date();
    this.name = filtered.name;
    this.note = filtered.note ? filtered.note : undefined;
    this.image = filtered.image ? filtered.image : undefined;
    this.resourceClassifiedAs = filtered.resourceClassifiedAs ? filtered.resourceClassifiedAs : undefined;
    this.defaultUnitOfResource = filtered.defaultUnitOfResource ? filtered.defaultUnitOfResource : undefined;
    this.defaultUnitOfEffort = filtered.defaultUnitOfEffort ? filtered.defaultUnitOfEffort : undefined;
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
    return {
      id: this.id.toString(),
      created: this.created,
      name: this.name,
      note: this.note,
      image: this.image,
      resourceClassifiedAs: this.resourceClassifiedAs,
      defaultUnitOfResource: this.defaultUnitOfResource,
      defaultUnitOfEffort: this.defaultUnitOfEffort
    };
  }
}

export class ProcessSpecification implements ProcessSpecificationShape, PathedData {
  id: string;
  created: Date;
  name: string;
  note?: string;

  constructor(init: ProcessSpecificationShape) {
    const filtered = rejectEmptyFields<ProcessSpecificationShape>(init);
    this.id = filtered.id ? filtered.id : Guid.raw();
    this.created = filtered.created ? filtered.created : new Date();
    this.name = filtered.name;
    this.note = filtered.note ? filtered.note : undefined;
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
    return {
      id: this.id.toString(),
      created: this.created,
      name: this.name,
      note: this.note,
    };
  }
}
