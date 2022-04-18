import { Guid } from "guid-typescript";

// Knowledge
export interface AgentShape {
  id?: Guid,
  created?: Date,
  name: string,
  image?: string,
  primaryLocation?: string,
  note?: string
}

export interface ResourceSpecificationShape {
  id?: Guid,
  created?: Date,
  name: string,
  image?: string,
  resourceClassifiedAs?: string,
  defaultUnitOfResource?: string,
  defaultUnitOfEffort?: string,
  note?: string
}

export interface ProcessSpecificationShape {
  id?: Guid,
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
  meta?: {};

  constructor(init: AgentShape) {
    this.id = init.id ? init.id : Guid.create();
    this.created = init.created ? init.created : new Date();
    this.name = init.name;
    this.note = init.note;
    this.image = init.image;
    this.primaryLocation = init.primaryLocation;
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
  meta?: {};

  constructor(init: ResourceSpecificationShape) {
    this.id = init.id ? init.id : Guid.create();
    this.created = init.created ? init.created : new Date();
    this.name = init.name;
    this.note = init.note;
    this.image = init.image;
    this.resourceClassifiedAs = init.resourceClassifiedAs;
    this.defaultUnitOfResource = init.defaultUnitOfResource;
    this.defaultUnitOfEffort = init.defaultUnitOfEffort;
  }
}

export class ProcessSpecification implements ProcessSpecificationShape {
  id: Guid;
  created: Date;
  name: string;
  note?: string;

  constructor(init: ProcessSpecificationShape) {
    this.id = init.id ? init.id : Guid.create();
    this.created = init.created ? init.created : new Date();
    this.name = init.name;
    this.note = init.note;
  }
}

// Plan
export interface PlanShape {
  id?: Guid,
  created?: Date,
  name: string,
  note?: string,
  due?: Date
}

export interface ProcessShape extends TimeBase {
  id?: Guid,
  created?: Date,
  name: string, // get from process spec
  finished: boolean, // defaults to false
  note?: string, // text-area
  classifiedAs?: string, // don't display
  inScopeOf?: Guid, // can be all sorts of things GUID. Thing picker, typeahead maybe? 
  basedOn: Guid, // ID of a process specification
  plannedWithin: Guid, // ID of a Plan
}

export interface InputCommitmentShape extends TimeBase, ReaBase, CommitmentShape {
  id?: Guid,
  created?: Date,
  inputOf?: ProcessShape,
  outputOf?: never,
}

export interface OutputCommitmentShape extends TimeBase, ReaBase, CommitmentShape {
  id?: Guid,
  created?: Date,
  inputOf?: never,
  outputOf?: ProcessShape,
}

// Plan Classes
export class Plan implements PlanShape {
  id: Guid;
  created: Date;
  name: string;
  due?: Date;
  note?: string;
  processes?: Map<Guid, ProcessShape>;

  constructor(init: PlanShape) {
    this.id = init.id ? init.id : Guid.create();
    this.created = init.created ? init.created : new Date();
    this.name = init.name;
    this.due = init.due;
    this.note = init.note;
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
    this.id = init.id ? init.id : Guid.create();
    this.created = init.created ? init.created : new Date();
    this.name = init.name;
    this.finished = init.finished;
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
}

// TODO: Commitment Classes and everything else below

// Observation
export interface EconomicResourceShape {
  id?: Guid,
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
  id?: Guid,
  created?: Date,
  inputOf: ProcessShape,
  outputOf?: never
}

export interface OutputEconomicEventShape extends TimeBase, ReaBase, EconomicEventShape {
  id?: Guid,
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
  id?: Guid,
  created?: Date,
  finished?: boolean,
  inScopeOf?: string,
  note?: string,
  agreedIn?: string,
  atLocation?: GeoPoint,
  state?: string 
}

interface EconomicEventShape extends TimeBase, ReaBase {
  id?: Guid,
  created?: Date,
  note?: string,
  image?: string,
  agreedIn?: string,
  atLocation?: GeoPoint,
  toLocation?: GeoPoint,
  state?: string
}
