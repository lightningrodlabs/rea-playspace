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
  provider: string;                   // Agent ID
  receiver: string;                   // Agent ID
  resourceInventoriedAs?: string;     // ResourceSprecification ID
  resourceConformsTo?: string;        // ResourceSprecification ID
  resourceQuantity?: MeasurementShape;
  effortQuantity?: MeasurementShape;
  resourceClassifiedAs?: string;      // General classification or grouping
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

export type InputOutput = 'input' | 'output' | 'both' | 'na';

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
  atLocation?: GeoDataShape;
  state?: string;
  inputOf?: string;
  outputOf?: string;
}

// Observation
export interface EconomicResourceShape {
  name: string;
  conformsTo: string;         // ResourceSpecification
  primaryAccountable: string; // Agent ID of the accountable party
  trackingIndentifier: string;
  onhandQuantity: number;
  accountingQuantity?: number;
  currentLocation?: GeoDataShape;
  note?: string;
  classifiedAs?: string;
  image?: string;
  unitOfEffort?: string;      // Unit ID
  state?: string;
  stage?: string;             // ProcessSpecification ID
  containedIn?: string;       // EconomicResource ID
  lot?: string;
}

export interface EconomicEventShape extends HasIdDate, HasTime, HasAction, ReaBase {
  note?: string;
  image?: string;
  agreedIn?: string;
  atLocation?: GeoDataShape;
  toLocation?: GeoDataShape;
  state?: string;
  toResourceInventoriedAs?: string; // EconomicResource ID that the transfer will be inventoried as.
  inputOf?: string;
  outputOf?: string;
}

export interface FulfillmentShape extends HasIdDate {
  resourceQuantity?: number;
  effortQuantity?: number;
  fulfills: string;
  fulfilledBy: string;
}

// Geo

export interface GeoDataShape extends HasIdDate {
  type: string;
  address?: string;
  point?: GeoPointShape;
}

export interface GeoPointShape extends HasIdDate {
  lat: number;
  lng: number;
}

export interface UnitShape {
  id: string;
  name: string;
  symbol: string;
}

export interface MeasurementShape {
  hasNumericalValue: number;  // actual quantity
  hasUnit: string;            // ID of unit
}
