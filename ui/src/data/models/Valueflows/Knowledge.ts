import { Guid } from "guid-typescript";
import { PathedData } from "../PathedData";
import { AgentShape, ResourceSpecificationShape, ProcessSpecificationShape } from "../../../types/valueflows";

// Knowledge Classes


export class Agent implements AgentShape, PathedData {
  id: string;
  created: Date;
  name: string;
  note?: string;
  image?: string;
  primaryLocation?: string;

  constructor(init: AgentShape) {
    this.id = init.id ? init.id : Guid.raw();
    this.created = init.created ? init.created : new Date();
    this.name = init.name;
    this.note = init.note ? init.note : undefined;
    this.image = init.image ? init.image : undefined;
    this.primaryLocation = init.primaryLocation ? init.primaryLocation : undefined;
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
    this.id = init.id ? init.id : Guid.raw();
    this.created = init.created ? init.created : new Date();
    this.name = init.name;
    this.note = init.note ? init.note : undefined;
    this.image = init.image ? init.image : undefined;
    this.resourceClassifiedAs = init.resourceClassifiedAs ? init.resourceClassifiedAs : undefined;
    this.defaultUnitOfResource = init.defaultUnitOfResource ? init.defaultUnitOfResource : undefined;
    this.defaultUnitOfEffort = init.defaultUnitOfEffort ? init.defaultUnitOfEffort : undefined;
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
    this.id = init.id ? init.id : Guid.raw();
    this.created = init.created ? init.created : new Date();
    this.name = init.name;
    this.note = init.note ? init.note : undefined;
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
