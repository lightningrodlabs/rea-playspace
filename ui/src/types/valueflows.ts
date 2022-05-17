// Building Blocks

interface HasIdDate {
  id?: string;
  created?: Date;
}

interface HasTime {
  hasBegining?: Date;
  hasEnd?: Date;
  hasPointInTime?: Date;
  due?: Date;
}

interface ReaBase {
  provider: string;               // Agent ID
  receiver: string;               // Agent ID
  resourceInventoriedAs?: string; // ResourceSprecification ID
  resourceConformsTo?: string;    // ResourceSprecification ID
  resourceQuantity?: number;
  effortQuantity?: number;
  resourceClassifiedAs?: string;  // General classification or grouping
}

interface HasAction {
  action: string;
}

// Knowledge

export interface AgentShape extends HasIdDate {
  name: string,
  note?: string,
  image?: string,
  primaryLocation?: string
}

export interface ResourceSpecificationShape extends HasIdDate {
  name: string,
  note?: string,
  image?: string,
  resourceClassifiedAs?: string,
  defaultUnitOfResource?: string,
  defaultUnitOfEffort?: string
}

export interface ProcessSpecificationShape extends HasIdDate {
  name: string,
  note?: string
}

export type InputOutput = 'input' | 'output';

export type ResourceEffect = 'decrement' | 'decrementIncrement' | 'increment' | 'update' | 'remove' | 'noEffect';

export interface ActionShape {
  id: string;
  label: string;
  inputOutput?: InputOutput;
  resourceEffect?: ResourceEffect;
  onhandEffect?: ResourceEffect;
  pairsWith?: string;
  locationEffect?: string;
  containedEffect?: string;
  comment?: string;
}

// Plan

export interface PlanShape extends HasIdDate {
  name: string,
  note?: string,
  due?: Date
  process?: Record<string, ProcessShape>
}

export interface ProcessShape extends HasIdDate, HasTime {
  name: string,
  note?: string, // text-area
  finished: boolean, // defaults to false
  classifiedAs?: string, // don't display
  inScopeOf?: string, // can be all sorts of things GUID. Thing picker, typeahead maybe?
  basedOn: string, // ID of a process specification
  plannedWithin: string, // ID of a Plan
}

export interface CommitmentShape extends HasIdDate, HasTime, HasAction, ReaBase {
  plannedWithin: string;
  independentDemandOf?: string;
  finished?: boolean;
  inScopeOf?: string;
  note?: string;
  agreedIn?: string;
  atLocation?: GeoPoint;
  state?: string;
  inputOf?: string;
  outputOf?: string;
}

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

export interface EconomicEventShape extends HasIdDate, HasTime, HasAction, ReaBase {
  note?: string;
  image?: string;
  agreedIn?: string;
  atLocation?: GeoPoint;
  toLocation?: GeoPoint;
  state?: string;
  toResourceInventoriedAs: string; // EconomicResource ID that the transfer will be inventoried as.
  inputOf?: string;
  outputOf?: string;
}

// Geo

export interface GeoPoint {
  lat: number;
  lng: number;
}
