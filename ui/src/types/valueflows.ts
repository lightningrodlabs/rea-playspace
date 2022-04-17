import { Guid } from "guid-typescript";

// Knowledge
export interface AgentShape {
  id?: Guid | string,
  created?: Date,
  name: string,
  note?: string,
  image?: string,
  primaryLocation?: string
}

export interface ResourceSpecificationShape {
  id?: Guid | string,
  created?: Date,
  name: string,
  note?: string,
  image?: string,
  resourceClassifiedAs?: string,
  defaultUnitOfResource?: string,
  defaultUnitOfEffort?: string
}

export interface ProcessSpecificationShape {
  id?: Guid | string,
  created?: Date,
  name: string,
  note?: string
}

// Knowledge Classes

export class Agent implements AgentShape {
  id: Guid;
  created: Date;
  name: string;
  note?: string;
  image?: string;
  primaryLocation?: string;

  constructor(init: AgentShape) {
    this.id = init.id ? Guid.parse(''+init.id) : Guid.create();
    this.created = init.created ? init.created : new Date();
    this.name = init.name;
    this.note = init.note ? init.note: undefined;
    this.image = init.image ? init.image: undefined;
    this.primaryLocation = init.primaryLocation ? init.primaryLocation : undefined;
  }

  get path(): string {
    return `root.agent.${this.id}`;
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

export class ResourceSpecification implements ResourceSpecificationShape {
  id: Guid;
  created: Date;
  name: string;
  note?: string;
  image?: string;
  resourceClassifiedAs?: string;
  defaultUnitOfResource?: string;
  defaultUnitOfEffort?: string;

  constructor(init: ResourceSpecificationShape) {
    this.id = init.id ? Guid.parse(''+init.id) : Guid.create();
    this.created = init.created ? init.created : new Date();
    this.name = init.name;
    this.note = init.note ? init.note: undefined;
    this.image = init.image ? init.image: undefined;
    this.resourceClassifiedAs = init.resourceClassifiedAs ? init.resourceClassifiedAs : undefined;
    this.defaultUnitOfResource = init.defaultUnitOfResource ? init.defaultUnitOfResource : undefined;
    this.defaultUnitOfEffort = init.defaultUnitOfEffort ? init.defaultUnitOfEffort : undefined;
  }

  get path(): string {
    return `root.resourceSpecification.${this.id}`;
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

export class ProcessSpecification implements ProcessSpecificationShape {
  id: Guid;
  created: Date;
  name: string;
  note?: string;

  constructor(init: ProcessSpecificationShape) {
    this.id = init.id ? Guid.parse(''+init.id) : Guid.create();
    this.created = init.created ? init.created : new Date();
    this.name = init.name;
    this.note = init.note ? init.note: undefined;
  }

  get path(): string {
    return `root.processSpecification.${this.id}`;
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

// Plan
export interface PlanShape {
  id?: Guid | string,
  created?: Date,
  name: string,
  note?: string,
  due?: Date
  process?: Record<string, ProcessShape>
}

export interface ProcessShape extends TimeBase {
  id?: Guid | string,
  created?: Date,
  name: string, // get from process spec
  note?: string, // text-area
  finished: boolean, // defaults to false
  classifiedAs?: string, // don't display
  inScopeOf?: Guid, // can be all sorts of things GUID. Thing picker, typeahead maybe? 
  basedOn: Guid, // ID of a process specification
  plannedWithin: Guid, // ID of a Plan
}

export interface InputCommitmentShape extends TimeBase, ReaBase, CommitmentShape {
  id?: Guid | string,
  created?: Date,
  inputOf?: ProcessShape,
  outputOf?: never,
}

export interface OutputCommitmentShape extends TimeBase, ReaBase, CommitmentShape {
  id?: Guid | string,
  created?: Date,
  inputOf?: never,
  outputOf?: ProcessShape,
}

// Plan Classes
export class Plan implements PlanShape {
  id: Guid;
  created: Date;
  name: string;
  note?: string;
  due?: Date;
  process?: Record<string, ProcessShape>;

  constructor(init: PlanShape) {
    this.id = init.id ? Guid.parse(''+init.id) : Guid.create();
    this.created = init.created ? init.created : new Date();
    this.name = init.name;
    this.note = init.note ? init.note: undefined;
    this.due = init.due ? init.due: undefined;
    this.process = init.process ? init.process: undefined;
  }

  get path(): string {
    return `root.plan.${this.id}`;
  }

  public toJSON(): PlanShape {
    return {
      id: this.id.toString(),
      created: this.created,
      name: this.name,
      note: this.note,
      due: this.due
    };
  }
}

export class Process implements ProcessShape {
  id: Guid; // who knows?? GUID (gweed)
  created: Date;
  name: string; // get from process spec
  finished: boolean; // defaults to false
  note?: string; // text-area
  classifiedAs?: string; // don't display
  inScopeOf?: Guid; // can be all sorts of things GUID. Thing picker, typeahead maybe? 
  basedOn: Guid; // ID of a process specification
  plannedWithin: Guid; // ID of a Plan
  hasBegining?: Date;
  hasEnd?: Date;
  hasPointInTime?: Date;
  due?: Date;
  inputCommitments?: Map<string, InputCommitmentShape>; // Add button on left
  outputCommitments?: Map<string, OutputCommitmentShape>; // add button on right
  meta?: {};

  constructor (init: ProcessShape) {
    this.id = init.id ? Guid.parse(''+init.id) : Guid.create();
    this.created = init.created ? init.created : new Date();
    this.name = init.name;
    this.finished = init.finished ? init.finished : false;
    this.note = init.note;
    this.classifiedAs = init.classifiedAs;
    this.inScopeOf = init.inScopeOf;
    this.basedOn = init.basedOn;
    this.plannedWithin = init.plannedWithin;
    this.hasBegining = init.hasBegining;
    this.hasEnd = init.hasEnd;
    this.hasPointInTime = init.hasPointInTime;
    this.due = init.due;
  }

  get path(): string {
    return `root.plan.${this.plannedWithin}.process.${this.id}`;
  }

  public toJSON(): ProcessShape {
    return {
      id: this.id.toString(),
      created: this.created,
      name: this.name,
      note: this.note,
      finished: this.finished,
      classifiedAs: this.classifiedAs,
      inScopeOf: this.inScopeOf, 
      basedOn: this.basedOn,
      plannedWithin: this.plannedWithin,
      hasBegining: this.hasBegining,
      hasEnd: this.hasEnd,
      hasPointInTime: this.hasPointInTime,
      due: this.due
    };
  }
}

// TODO: Commitment Classes and everything else below

// Observation
export interface EconomicResourceShape {
  id?: Guid | string,
  created?: Date,
  name: string,
  accountingQuantity?: number,
  currentLocation?: GeoPoint,
  note?: string,
  classifiedAs?: string,
  image?: string,
  unitOfEffort?: string,
  state?: string,
  containedIn?: EconomicResourceShape,
  stage?: ProcessSpecificationShape
}

export interface InputEconomicEventShape extends TimeBase, ReaBase, EconomicEventShape {
  id?: Guid | string,
  created?: Date,
  inputOf: ProcessShape,
  outputOf?: never
}

export interface OutputEconomicEventShape extends TimeBase, ReaBase, EconomicEventShape {
  id?: Guid | string,
  created?: Date,
  inputOf?: never,
  outputOf: ProcessShape
}

// Generic
interface ReaBase {
  provider: AgentShape,
  receiver: AgentShape,
  resourceClassifiedAs?: ResourceSpecificationShape,
  resourceInventoriedAs?: EconomicResourceShape,
  resourceQuantity?: number,
  effortQuantity?: number
}

interface TimeBase {
  hasBegining?: Date,
  hasEnd?: Date,
  hasPointInTime?: Date,
  due?: Date,
}

interface GeoPoint {
  lat: number,
  lng: number
}

interface CommitmentShape extends TimeBase, ReaBase {
  id?: Guid | string,
  created?: Date,
  finished?: boolean,
  inScopeOf?: string,
  note?: string,
  agreedIn?: string,
  atLocation?: GeoPoint,
  state?: string 
}

interface EconomicEventShape extends TimeBase, ReaBase {
  id?: Guid | string,
  created?: Date,
  note?: string,
  image?: string,
  agreedIn?: string,
  atLocation?: GeoPoint,
  toLocation?: GeoPoint,
  state?: string
}
