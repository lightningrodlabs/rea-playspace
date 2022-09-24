// Building Blocks

import { HasAction } from "../data/models/Valueflows/Knowledge";

export interface HasIdDate {
  id?: string;
  created?: Date;
}

export interface HasTime {
  hasBegining?: Date | string;
  hasEnd?: Date | string;
  hasPointInTime?: Date | string;
  due?: Date | string;
}

export interface ReaBase {
  provider: string | AgentShape;                              // Agent ID or object
  receiver: string | AgentShape;                              // Agent ID or object
  resourceInventoriedAs?: string;     // EconomicResource ID or object
  resourceConformsTo?: string;   // ResourceSprecification ID or object
  resourceQuantity?: MeasurementShape;
  effortQuantity?: MeasurementShape;
  resourceClassifiedAs?: string;                              // General classification or grouping
  inScopeOf?: string;
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
  note?: string;
  agreedIn?: string;
  atLocation?: GeoDataShape;
  state?: string;
  inputOf?: string | ProcessShape;
  outputOf?: string | ProcessShape;
}

// Observation
export interface EconomicResourceShape extends HasIdDate {
  name: string;
  conformsTo: string;         // ResourceSpecification
  primaryAccountable: string; // Agent ID of the accountable party
  trackingIndentifier?: string;
  onhandQuantity?: MeasurementShape;
  accountingQuantity?: MeasurementShape;
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
  resourceInventoriedAs?: string;
  toResourceInventoriedAs?: string; // EconomicResource ID that the transfer will be inventoried as.
  inputOf?: string | ProcessShape;
  outputOf?: string | ProcessShape;
}

export interface FulfillmentShape extends HasIdDate {
  resourceQuantity?: MeasurementShape;
  effortQuantity?: MeasurementShape;
  fulfills: string;
  fulfilledBy: string;
}

export type FlowShape = CommitmentShape | EconomicEventShape;

// Geo

export interface GeoDataShape extends HasIdDate {
  type: string;
  name?: string;
  address?: string;
  point?: GeoPointShape | string;
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
