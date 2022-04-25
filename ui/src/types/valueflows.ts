// Building Blocks

interface IdDate {
  id?: string;
  created?: Date;
}

interface TimeBase {
  hasBegining?: Date;
  hasEnd?: Date;
  hasPointInTime?: Date;
  due?: Date;
}

interface ReaBase {
  resourceInventoriedAs?: string; // ResourceSprecification ID
  resourceConformsTo?: string;    // ResourceSprecification ID
  resourceQuantity?: number;
  effortQuantity?: number;
  provider: string;               // Agent ID
  receiver: string;               // Agent ID
  resourceClassifiedAs?: string;  // General classification or grouping
}

interface ProcessInput {
  inputOf: string;  // Process ID
  outputOf?: never; // Should not have an output Process ID
}

interface ProcessOutput {
  inputOf?: never;  // Should not have an input Process ID
  outputOf: string; // Process ID
}

// Knowledge

export interface AgentShape extends IdDate {
  name: string,
  note?: string,
  image?: string,
  primaryLocation?: string
}

export interface ResourceSpecificationShape extends IdDate {
  name: string,
  note?: string,
  image?: string,
  resourceClassifiedAs?: string,
  defaultUnitOfResource?: string,
  defaultUnitOfEffort?: string
}

export interface ProcessSpecificationShape extends IdDate {
  name: string,
  note?: string
}

// Plan

export interface PlanShape extends IdDate {
  name: string,
  note?: string,
  due?: Date
  process?: Record<string, ProcessShape>
}

export interface ProcessShape extends IdDate, TimeBase {
  name: string,
  note?: string, // text-area
  finished: boolean, // defaults to false
  classifiedAs?: string, // don't display
  inScopeOf?: string, // can be all sorts of things GUID. Thing picker, typeahead maybe?
  basedOn: string, // ID of a process specification
  plannedWithin: string, // ID of a Plan
}

interface CommitmentShape extends IdDate, TimeBase, ReaBase {
  finished?: boolean,
  inScopeOf?: string,
  note?: string,
  agreedIn?: string,
  atLocation?: GeoPoint,
  state?: string
}

export interface InputCommitmentShape extends CommitmentShape, ProcessInput {}
export interface OutputCommitmentShape extends CommitmentShape, ProcessOutput {}

// Observation
export interface EconomicResourceShape {
  name: string;
  trackingIndentifier: string;
  accountingQuantity?: number;
  onhandQuantity: number;
  currentLocation?: GeoPoint;
  note?: string;
  classifiedAs?: string;
  image?: string;
  unitOfEffort?: string;
  state?: string;
  conformsTo: string;         // ResourceSpecification
  containedIn?: string;       // EconomicResource ID
  stage?: string;             // ProcessSpecification ID
  primaryAccountable: string; // Agent ID of the accountable party
}

interface EconomicEventShape extends IdDate, TimeBase, ReaBase {
  note?: string;
  image?: string;
  agreedIn?: string;
  atLocation?: GeoPoint;
  toLocation?: GeoPoint;
  state?: string;
  toResourceInventoriedAs: string; // EconomicResource ID that the transfer will be inventoried as.
}

export interface InputEconomicEventShape extends EconomicEventShape, ProcessInput {}
export interface OutputEconomicEventShape extends EconomicEventShape, ProcessOutput {}

// Geo

export interface GeoPoint {
  lat: number;
  lng: number;
}
