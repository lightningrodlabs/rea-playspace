import { Guid } from "guid-typescript";
import { XYPosition } from 'react-flow-renderer';

// Knowledge

export interface AgentShape {
  id?: string,
  created?: Date,
  name: string,
  note?: string,
  image?: string,
  primaryLocation?: string
}

export interface ResourceSpecificationShape {
  id?: string,
  created?: Date,
  name: string,
  note?: string,
  image?: string,
  resourceClassifiedAs?: string,
  defaultUnitOfResource?: string,
  defaultUnitOfEffort?: string
}

export interface ProcessSpecificationShape {
  id?: string,
  created?: Date,
  name: string,
  note?: string
}

// Plan

export interface PlanShape {
  id?: string,
  created?: Date,
  name: string,
  note?: string,
  due?: Date
  process?: Record<string, ProcessShape>
}

export interface ProcessShape extends TimeBase {
  id?:  string,
  created?: Date,
  name: string, // get from process spec
  note?: string, // text-area
  finished: boolean, // defaults to false
  classifiedAs?: string, // don't display
  inScopeOf?: string, // can be all sorts of things GUID. Thing picker, typeahead maybe?
  basedOn: string, // ID of a process specification
  plannedWithin: string, // ID of a Plan
}

export interface InputCommitmentShape extends TimeBase, ReaBase, CommitmentShape {
  id?: string,
  created?: Date,
  inputOf?: ProcessShape,
  outputOf?: never,
}

export interface OutputCommitmentShape extends TimeBase, ReaBase, CommitmentShape {
  id?: string,
  created?: Date,
  inputOf?: never,
  outputOf?: ProcessShape,
}

export interface DisplayNodeShape {
  id?: string;
  position?: XYPosition;
  vfPath: string;
  type?: string;
  data?: any;
}

export interface DisplayEdgeShape {
  id?: string;
  source: string;
  target: string;
  vfPath: string;
}

// TODO: Commitment Classes and everything else below

// Observation
export interface EconomicResourceShape {
  id?: string,
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
  id?: string,
  created?: Date,
  inputOf: ProcessShape,
  outputOf?: never
}

export interface OutputEconomicEventShape extends TimeBase, ReaBase, EconomicEventShape {
  id?: string,
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
  id?: string,
  created?: Date,
  finished?: boolean,
  inScopeOf?: string,
  note?: string,
  agreedIn?: string,
  atLocation?: GeoPoint,
  state?: string
}

interface EconomicEventShape extends TimeBase, ReaBase {
  id?: string,
  created?: Date,
  note?: string,
  image?: string,
  agreedIn?: string,
  atLocation?: GeoPoint,
  toLocation?: GeoPoint,
  state?: string
}

export interface PathedData {
  id?: string;
  get path(): string;
}

export interface RootShape {
  resourceSpecification?: Record<string, ResourceSpecification>;
  processSpecification?: Record<string, ProcessSpecification>;
  agent?: Record<string, Agent>;
  plan?: Record<string, Plan>;
}

/**
 * Root interface, if we ever add more root level objects and indices, we'll need to
 * add them here.
 *
 * Elements in the root follow paths that correspond to their paths in the dht:
 *  * root.processSpecification.ps1
 *  * root.plan.<GUID>.process.<GUID>.committedInputs.<GUID>;
 */
 export class Root implements RootShape, PathedData {
  resourceSpecification: Record<string, ResourceSpecification>;
  processSpecification: Record<string, ProcessSpecification>;
  agent: Record<string, Agent>;
  plan: Record<string, Plan>;
  data?: Object;

  get path() {
    return 'root';
  }

  constructor(data?: Object) {
    this.resourceSpecification = {};
    this.processSpecification = {};
    this.agent = {};
    this.plan = {};
    this.data = data ? data : {};
  }

  public toJSON(){
    return this.data;
  }
}

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
    this.note = init.note ? init.note: undefined;
    this.image = init.image ? init.image: undefined;
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
    this.note = init.note ? init.note: undefined;
    this.image = init.image ? init.image: undefined;
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
    this.note = init.note ? init.note: undefined;
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

// Plan Classes

export class Plan implements PlanShape, PathedData {
  id: string;
  created: Date;
  name: string;
  note?: string;
  due?: Date;
  process?: Record<string, ProcessShape>;
  displayNode?: Record<string, DisplayNode>;
  displayEdge?: Record<string, DisplayEdge>;

  constructor(init: PlanShape) {
    this.id = init.id ? init.id : Guid.raw();
    this.created = init.created ? init.created : new Date();
    this.name = init.name;
    this.note = init.note ? init.note: undefined;
    this.due = init.due ? init.due: undefined;
    this.process = init.process ? init.process: undefined;
    this.displayNode = {};
    this.displayEdge = {};
  }

  static getPrefix(): string {
    return 'root.plan';
  }

  static getPath(id: string): string {
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

export class Process implements ProcessShape, PathedData {
  id: string; // who knows?? GUID (gweed)
  created: Date;
  name: string; // get from process spec
  finished: boolean; // defaults to false
  note?: string; // text-area
  classifiedAs?: string; // don't display
  inScopeOf?: string; // can be all sorts of things GUID. Thing picker, typeahead maybe?
  basedOn: string; // ID of a process specification
  plannedWithin: string; // ID of a Plan
  hasBegining?: Date;
  hasEnd?: Date;
  hasPointInTime?: Date;
  due?: Date;
  inputCommitments?: Map<string, InputCommitmentShape>; // Add button on left
  outputCommitments?: Map<string, OutputCommitmentShape>; // add button on right

  constructor (init: ProcessShape) {
    this.id = init.id ? init.id : Guid.raw();
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
    this.created = new Date();
  }

  static getPrefix(planId: string): string {
    return `root.plan.${planId}.process`;
  }

  static getPath(planId: string, id: string): string {
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
}

export class DisplayNode implements DisplayNodeShape, PathedData {
  id: string;
  position: XYPosition;
  vfPath: string;
  type?: string;
  data?: any;

  constructor(init: DisplayNodeShape) {
    this.id = init.id ? init.id : Guid.raw();
    this.position = init.position as XYPosition;
    this.vfPath = init.vfPath;
    this.type = init.type;
    this.data = init.data;
  }

  static getPrefix(planId: string): string {
    return `root.plan.${planId}.displayNode`;
  }

  static getPath(planId: string, id: string): string {
    return `${DisplayNode.getPrefix(planId)}.${id}`;
  }

  get path(): string {
    const planId = this.vfPath.split('.')[2];
    return DisplayNode.getPath(planId, this.id);
  }
}

export class DisplayEdge implements DisplayEdgeShape, PathedData {
  id: string;
  source: string;
  target: string;
  vfPath: string;

  constructor(init: DisplayEdgeShape) {
    this.id = init.id ? init.id : Guid.raw();
    this.source = init.source;
    this.target = init.target;
    this.vfPath = init.vfPath;
  }

  static getPrefix(planId: string): string {
    return `root.plan.${planId}.displayEdge`;
  }

  static getPath(planId: string, id: string): string {
    return `${DisplayEdge.getPrefix(planId)}.${id}`;
  }

  get path(): string {
    const planId = this.vfPath.split('.')[2];
    return DisplayEdge.getPath(planId, this.id);
  }
}

/**
 * Map from a parent path slug to a function that transforms the object into the corresponding class
 */
export const ObjectTransformations = {
  'agent': function (object: Object) { return new Agent(object as AgentShape); },
  'resourceSpecification': function (object: Object) { return new ResourceSpecification(object as ResourceSpecificationShape); },
  'processSpecification': function (object: Object) { return new ProcessSpecification(object as ProcessSpecificationShape); },
  'plan': function (object: Object) { return new Plan(object as PlanShape); },
  'process': function (object: Object) { return new Process(object as ProcessShape); },
  'displayNode': function (object: Object) { return new DisplayNode(object as DisplayNodeShape); },
  'displayEdge': function (object: Object) { return new DisplayEdge(object as DisplayEdgeShape); },
  'inputCommitment': function () { throw new Error('Not yet implemented'); },
  'outputCommitment': function () { throw new Error('Not yet implemented'); },
  'inputEconomicEvent': function () { throw new Error('Not yet implemented'); },
  'outputEconomicEvent': function () { throw new Error('Not yet implemented'); }
}

/**
 * Takes an object of Record<string, T> and maps it to Map<string, T>
 * @param obj
 * @returns
 */
export function objectEntriesToMap<T> (obj: Record<string, T>): Map<string, T> {
  return new Map<string, T>(
    Object.entries(obj)
  );
}

export const ObjectTypeMap = {
  'agent': Agent,
  'resourceSpecification': ResourceSpecification,
  'processSpecification': ProcessSpecification,
  'plan': Plan
};

// export function transformEntriesToMap(tempRoot: Object) {
//   const newRoot: Root = new Root();
//   for( let {placeholder, type} of ObjectTypeMap) {
//     if (tempRoot.hasOwnProperty(placeholder)) {
//       newRoot[placeholder] = objectEntriesToMap<typeof type>(tempRoot[placeholder]);
//     }
//   }
// }

