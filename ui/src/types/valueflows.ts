import { Guid } from "guid-typescript";
import { XYPosition } from 'react-flow-renderer';

/**
 * Root interface, if we ever add more root level objects and indices, we'll need to
 * add them here.
 *
 * Elements in the root follow paths that correspond to their paths in the dht:
 *  * root.processSpecification.get('ps1')
 *  * root.plan.get('p1').process.get('pr1').committedInputs.get('c1');
 */
export class Root {
  resourceSpecification: Map<Guid, ResourceSpecification>;
  processSpecification: Map<Guid, ProcessSpecification>;
  agent: Map<Guid, Agent>;
  plan: Map<Guid, Plan>;
  data: {};
  path: 'root';

  constructor() {
    this.resourceSpecification = new Map<Guid, ResourceSpecification>();
    this.processSpecification = new Map<Guid, ProcessSpecification>();
    this.agent = new Map<Guid, Agent>();
    this.plan = new Map<Guid, Plan>();
  }

  public toJSON(){
    return this.data;
  }
}

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

  static getPrefix(): string {
    return 'root.agent';
  }

  static getPath(id: Guid): string {
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

  static getPrefix(): string {
    return 'root.resourceSpecification';
  }

  static getPath(id: Guid): string {
    return `${Agent.getPrefix()}.${id}`;
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

  static getPrefix(): string {
    return 'root.processSpecification';
  }

  static getPath(id: Guid): string {
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

// Need a MetaShape interface
export class Meta {
  public path: string;
  public position: XYPosition;

  constructor(parentPath: string, data: {position: XYPosition}) {
    this.path = `${parentPath}.meta`;
    this.position = data.position;
  }

  public toJSON() {
    return {
      position: this.position
    };
  }
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

  static getPrefix(): string {
    return 'root.plan';
  }

  static getPath(id: Guid): string {
    return `${Plan.getPrefix()}.${id}`;
  }

  get path(): string {
    return Plan.getPath(this.id);
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
  meta?: {position: XYPosition};

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

  static getPrefix(planId: Guid): string {
    return `root.plan.${planId}`;
  }

  static getPath(planId: Guid, id: Guid): string {
    return `${Process.getPrefix(planId)}.${id}`;
  }

  get path(): string {
    return Process.getPath(this.plannedWithin, this.id);
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

  public getMetaAsMeta(): Meta {
    return new Meta(this.path, this.meta);
  }
}

// Need DisplayedAgent and DisplayedResource for UI

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

/**
 * Takes an object of Record<string, T> and maps it to Map<Guid, T>
 * @param obj
 * @returns
 */
export function objectEntriesToMap<T> (obj: Record<string, T>): Map<Guid, T> {
  return new Map<Guid, T>(
    Object.entries(obj).map(
      (keyValuePair): [Guid, T] => {
        return [Guid.parse(keyValuePair[0]), keyValuePair[1] as T];
      }
    )
  );
}

export type PathedData = Root | Agent | ResourceSpecification | ProcessSpecification | Plan | Process | Meta;
