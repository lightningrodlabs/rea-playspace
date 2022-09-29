import { Guid } from "guid-typescript";
import { PathedData } from "../PathedData";
import { NamedData } from "../NamedData";
import { GeoDataShape, EconomicResourceShape, EconomicEventShape, FulfillmentShape } from "../../../types/valueflows";
import { assignFields, toJSON } from '../../utils';
import { ActionKey, GeoData, Measurement } from "./Knowledge";

export class EconomicResource implements EconomicResourceShape, PathedData, NamedData {
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

  static getPrefix(): string {
    return 'root.economicResource';
  }

  static getPath(id: string): string {
    return `${EconomicResource.getPrefix()}.${id}`;
  }

  static getSytheticKey(r: EconomicResourceShape) {
    const loc = r.currentLocation ? `-${r.currentLocation}`: '';
    const stage = r.stage ? `-${r.stage}` : '';
    const state = r.state ? `-${r.state}` : '';
    const containedIn = r.containedIn ? `-${r.containedIn}` : '';
    return `${r.primaryAccountable}${loc}${stage}${state}${containedIn}`;
  }

  get path(): string {
    return EconomicResource.getPath(this.id);
  }

  // may need to include containedIn at some point
  get syntheticKey(): string {
    return EconomicResource.getSytheticKey(this);
  }

  public toJSON(): EconomicResourceShape {
    return toJSON<EconomicResourceShape, EconomicResource>(this);
  }
}

export type EconomicResources = EconomicResource[];

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
  atLocation?: GeoDataShape;        // Source Location
  toLocation?: GeoDataShape;        // Destination Location
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

  static getPrefix(): string {
    return 'root.economicEvent';
  }

  static getPath(id: string): string {
    return `${EconomicEvent.getPrefix()}.${id}`;
  }

  get path(): string {
    return EconomicEvent.getPath(this.id);
  }

  public toJSON(): EconomicEventShape {
    return toJSON<EconomicEventShape, EconomicEvent>(this);
  }
}

export type EconomicEvents = EconomicEvent[];

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

  static getPrefix(): string {
    return `root.fulfillment`;
  }

  static getPath(id: string): string {
    return `${Fulfillment.getPrefix()}.${id}`;
  }

  get path(): string {
    return Fulfillment.getPath(this.id);
  }

  public toJSON(): FulfillmentShape {
    return toJSON<FulfillmentShape, Fulfillment>(this);
  }
}
