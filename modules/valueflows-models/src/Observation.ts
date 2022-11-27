import { Guid } from "guid-typescript";
import { assignFields, fieldsToJSON } from "typed-object-tweezers";
import { HasIdDate, HasTime, ReaBase, MeasurementShape, Measurement } from "./Common";
import { ActionKey, HasAction, GeoDataShape, GeoData } from "./Knowledge";

export interface EconomicResourceShape extends HasIdDate {
  name: string;
  conformsTo: string;         // ResourceSpecification
  primaryAccountable?: string; // Agent ID of the accountable party
  trackingIdentifier?: string;
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

export class EconomicResource implements EconomicResourceShape {
  id: string;
  created: Date;
  name: string;
  conformsTo: string;         // ResourceSpecification
  primaryAccountable: string; // Agent ID of the accountable party
  trackingIdentifier: string;
  onhandQuantity?: Measurement;
  accountingQuantity?: Measurement;
  currentLocation?: GeoDataShape;
  note?: string;
  classifiedAs?: string;
  image?: string;
  unitOfEffort?: string;
  state?: string;
  stage?: string;             // ProcessSpecification ID
  containedIn?: string;       // EconomicResource ID
  lot?: string;

  constructor(init: EconomicResourceShape) {
    assignFields<EconomicResourceShape, EconomicResource>(init, this);
    this.id = this.id ? this.id : Guid.raw();
    this.created = this.created ? new Date(this.created) : new Date();
    this.accountingQuantity = init.accountingQuantity ? new Measurement(init.accountingQuantity) : new Measurement();
    this.onhandQuantity = init.onhandQuantity ? new Measurement(init.onhandQuantity) : new Measurement();
    this.currentLocation = (this.currentLocation && this.currentLocation != null) ? new GeoData(this.currentLocation) : null;
    this.stage = this.stage ? this.stage : null;
    this.state = this.state ? this.state : null;
    this.containedIn = this.containedIn ? this.containedIn : null;
    this.note = init.note ? init.note : null;
  }

  static getSytheticKey(r: EconomicResourceShape) {
    const loc = r.currentLocation ? `-${r.currentLocation}`: '';
    const stage = r.stage ? `-${r.stage}` : '';
    const state = r.state ? `-${r.state}` : '';
    const containedIn = r.containedIn ? `-${r.containedIn}` : '';
    return `${r.primaryAccountable}${loc}${stage}${state}${containedIn}`;
  }

  // may need to include containedIn at some point
  get syntheticKey(): string {
    return EconomicResource.getSytheticKey(this);
  }

  public toJSON(): EconomicResourceShape {
    return fieldsToJSON<EconomicResourceShape, EconomicResource>(
      this, [
        'id',
        'created',
        'name',
        'conformsTo',
        'primaryAccountable',
        'trackingIdentifier',
        'onhandQuantity',
        'accountingQuantity',
        'currentLocation',
        'note',
        'classifiedAs',
        'image',
        'unitOfEffort',
        'state',
        'stage',
        'containedIn',
        'lot'
      ]
    );
  }
}

export type EconomicResources = EconomicResource[];

export interface EconomicEventShape extends HasIdDate, HasTime, HasAction, ReaBase {
  note?: string;
  image?: string;
  agreedIn?: string;
  atLocation?: GeoDataShape;
  toLocation?: GeoDataShape;
  state?: string;
  resourceInventoriedAs?: string;
  toResourceInventoriedAs?: string; // EconomicResource ID that the transfer will be inventoried as.
  newInventoriedResource?: EconomicResourceShape; // For compatibililty with hREA, used to pass the parameters for a new EconomicResource in one request
  inputOf?: string;
  outputOf?: string;
}

export class EconomicEvent implements EconomicEventShape {
  id: string;
  created: Date;
  action: ActionKey;
  provider: string;                 // Agent ID
  receiver: string;                 // Agent ID
  resourceInventoriedAs?: string;   // EconomicResource ID
  toResourceInventoriedAs?: string; // EconomicResource ID that the transfer will be inventoried as on the receiving side.
  newInventoriedResource?: EconomicResourceShape;
  inputOf?: string;                 // Process ID
  outputOf?: string;                // Process ID
  atLocation?: GeoData;             // Source Location
  toLocation?: GeoData;             // Destination Location
  resourceConformsTo?: string;      // ResourceSprecification ID
  resourceQuantity?: Measurement;
  effortQuantity?: Measurement;
  resourceClassifiedAs?: string;    // General classification or grouping
  note?: string;
  image?: string;
  agreedIn?: string;
  state?: string;
  hasBegining?: Date;
  hasEnd?: Date;
  hasPointInTime?: Date;
  inScopeOf: string;
  triggeredBy: string;              // EconomicEvent ID

  constructor(init: EconomicEventShape) {
    assignFields<EconomicEventShape, EconomicEvent>(init, this);
    this.id = this.id ? this.id : Guid.raw();
    this.created = this.created ? new Date(this.created) : new Date();
    this.note = init.note ? init.note : null;
    this.hasPointInTime = init.hasPointInTime ? new Date(init.hasPointInTime) : null;
    this.hasBegining = init.hasBegining ? new Date(init.hasBegining) : null;
    this.hasEnd = init.hasEnd ? new Date(init.hasEnd) : null;
    this.resourceQuantity = (init.resourceQuantity && init.resourceQuantity != null) ? new Measurement(init.resourceQuantity): new Measurement();
    this.effortQuantity = (init.effortQuantity && init.effortQuantity != null) ? new Measurement(init.effortQuantity): new Measurement();
    this.atLocation = (this.atLocation && init.atLocation != null) ? new GeoData(this.atLocation) : null;
    this.toLocation = (this.toLocation && init.toLocation != null) ? new GeoData(this.toLocation) : null;
  }

  public toJSON(): EconomicEventShape {
    return fieldsToJSON<EconomicEventShape, EconomicEvent>(
      this, [
        'id',
        'created',
        'action',
        'provider',
        'receiver',
        'resourceInventoriedAs',
        'toResourceInventoriedAs',
        'inputOf',
        'outputOf',
        'atLocation',
        'toLocation',
        'resourceConformsTo',
        'resourceQuantity',
        'effortQuantity',
        'resourceClassifiedAs',
        'note',
        'image',
        'agreedIn',
        'state',
        'hasBegining',
        'hasEnd',
        'hasPointInTime',
        'inScopeOf',
        'triggeredBy'
      ]
    );
  }
}

export type EconomicEvents = EconomicEvent[];

export interface FulfillmentShape extends HasIdDate {
  resourceQuantity?: MeasurementShape;
  effortQuantity?: MeasurementShape;
  fulfills: string;
  fulfilledBy: string;
}

export class Fulfillment implements FulfillmentShape {
  id: string;
  created: Date;
  resourceQuantity?: Measurement;
  effortQuantity?: Measurement;
  fulfills: string;           // Commitment ID
  fulfilledBy: string;        // EconomicEvent ID

  constructor(init: FulfillmentShape) {
    assignFields<FulfillmentShape, Fulfillment>(init, this);
    this.id = this.id ? this.id : Guid.raw();
    this.created = this.created ? new Date(this.created) : new Date();
    this.resourceQuantity = (init.resourceQuantity && init.resourceQuantity != null) ? new Measurement(init.resourceQuantity): null;
    this.effortQuantity = (init.effortQuantity && init.effortQuantity != null) ? new Measurement(init.effortQuantity): null;
  }

  public toJSON(): FulfillmentShape {
    return fieldsToJSON<FulfillmentShape, Fulfillment>(
      this, [
        'id',
        'created',
        'resourceQuantity',
        'effortQuantity',
        'fulfills',
        'fulfilledBy'
      ]
    );
  }
}
