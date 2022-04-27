
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
