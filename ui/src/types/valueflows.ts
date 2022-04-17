// Knowledge
export interface ResourceSpecification {
  id: string,
  name: string,
  image?: string
  resourceClassifiedAs?: string,
  defaultUnitOfResource?: string,
  defaultUnitOfEffort?: string,
  note?: string
}
export interface ProcessSpecification {
  id: string,
  name: string,
  note?: string
}

export interface Agent {
  id: string,
  name: string,
  image?: string
  primaryLocation?: string,
  note?: string
}

// Plan
export interface Plan {
  id: string,
  name: string,
  due?: Date,
  created: Date,
  note?: string,
  processes?: Map<string, Process>
}

export interface InputCommitment extends TimeBase, ReaBase, Commitment {
  id: string,
  inputOf?: Process,
  outputOf?: never,
}

export interface OutputCommitment extends TimeBase, ReaBase, Commitment {
  id: string,
  inputOf?: never,
  outputOf?: Process,
}


// Observation
export interface Process extends TimeBase {
  id: string, // who knows?? GUID (gweed)
  name: string, // get from process spec
  finished: boolean, // defaults to false
  note?: string, // text-area
  classifiedAs?: string, // don't display
  inScopeOf?: string, // can be all sorts of things GUID. Thing picker, typeahead maybe? 
  basedOn: string, // ID of a process specification
  plannedWithin: string, // ID of a Plan
  inputCommitments?: Array<InputCommitment>, // Add button on left
  outputCommitments?: Array<OutputCommitment> // add button on right
}

export interface EconomicResource {
  id: string,
  name: string,
  accountingQuantity?: number,
  currentLocation?: GeoPoint,
  note?: string,
  classifiedAs?: string,
  image?: string,
  unitOfEffort?: string,
  state?: string,
  containedIn?: EconomicResource,
  stage?: ProcessSpecification
}

export interface InputEconomicEvent extends TimeBase, ReaBase, EconomicEvent {
  id: string,
  inputOf: Process,
  outputOf?: never
}

export interface OutputEconomicEvent extends TimeBase, ReaBase, EconomicEvent {
  id: string,
  inputOf?: never,
  outputOf: Process
}

// Generic
interface ReaBase {
  provider: Agent,
  receiver: Agent,
  resourceClassifiedAs?: ResourceSpecification,
  resourceInventoriedAs?: EconomicResource,
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

interface Commitment extends TimeBase, ReaBase {
  finished?: boolean,
  inScopeOf?: string,
  note?: string,
  agreedIn?: string,
  atLocation?: GeoPoint,
  state?: string 
  created: Date,
}

interface EconomicEvent extends TimeBase, ReaBase {
  note?: string,
  image?: string,
  agreedIn?: string,
  atLocation?: GeoPoint,
  toLocation?: GeoPoint,
  state?: string,
  created: Date
}