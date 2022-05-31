import { Guid } from "guid-typescript";
import { PathedData } from "../PathedData";
import { NamedData } from "../NamedData";
import { GeoDataShape, GeoPointShape, EconomicResourceShape, EconomicEventShape, FulfillmentShape } from "../../../types/valueflows";
import { assignFields, toJSON } from '../../../utils';

export class GeoData implements GeoDataShape {
  id: string;
  created: Date;
  type: string;
  address: string;
  point: GeoPoint;

  constructor(init: GeoDataShape) {
    assignFields<GeoDataShape, GeoData>(init, this);
    this.id = this.id ? this.id : Guid.raw();
    this.created = this.created ? this.created : new Date();
  }

  static getPrefix(): string {
    return 'root.geoData';
  }

  static getPath(id: string): string {
    return `${GeoData.getPrefix()}.${id}`;
  }

  get path(): string {
    return GeoData.getPath(this.id);
  }

  public toJSON(): GeoDataShape {
    return toJSON<GeoDataShape, GeoData>(this);
  }
}

export class GeoPoint implements GeoPointShape {
  id: string;
  created: Date;
  lat: number;
  lng: number;

  constructor(init: GeoPointShape) {
    assignFields<GeoPointShape, GeoPoint>(init, this);
    this.id = this.id ? this.id : Guid.raw();
    this.created = this.created ? this.created : new Date();
  }

  static getPrefix(): string {
    return 'root.geoPoint';
  }

  static getPath(id: string): string {
    return `${GeoPoint.getPrefix()}.${id}`;
  }

  get path(): string {
    return GeoPoint.getPath(this.id);
  }

  public toJSON(): GeoPointShape {
    return toJSON<GeoPointShape, GeoPoint>(this);
  }
}

export class EconomicResource implements EconomicResourceShape, PathedData, NamedData {
  id: string;
  created: Date;
  name: string;
  conformsTo: string;         // ResourceSpecification
  primaryAccountable: string; // Agent ID of the accountable party
  trackingIndentifier: string;
  onhandQuantity: number;
  accountingQuantity?: number;
  currentLocation?: GeoData;
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
    this.created = this.created ? this.created : new Date();
  }

  static getPrefix(): string {
    return 'root.economicResource';
  }

  static getPath(id: string): string {
    return `${EconomicResource.getPrefix()}.${id}`;
  }

  get path(): string {
    return EconomicResource.getPath(this.id);
  }

  public toJSON(): EconomicResourceShape {
    return toJSON<EconomicResourceShape, EconomicResource>(this);
  }
}

export class EconomicEvent implements EconomicEventShape {
  id: string;
  created: Date;
  action: string;
  provider: string;                 // Agent ID
  receiver: string;                 // Agent ID
  resourceInventoriedAs?: string;   // EconomicResource ID
  toResourceInventoriedAs?: string; // EconomicResource ID that the transfer will be inventoried as on the receiving side.
  resourceConformsTo?: string;      // ResourceSprecification ID
  inputOf?: string;                 // Process ID
  outputOf?: string;                // Process ID
  atLocation?: GeoDataShape;        // Source Location
  toLocation?: GeoDataShape;        // Destination Location
  resourceQuantity?: number;
  effortQuantity?: number;
  resourceClassifiedAs?: string;    // General classification or grouping
  note?: string;
  image?: string;
  agreedIn?: string;
  state?: string;
  hasBegining?: Date;
  hasEnd?: Date;
  hasPointInTime?: Date;
  due?: Date;

  constructor(init: EconomicEventShape) {
    assignFields<EconomicEventShape, EconomicEvent>(init, this);
    this.id = this.id ? this.id : Guid.raw();
    this.created = this.created ? this.created : new Date();
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

export class Fulfillment implements FulfillmentShape {
  id: string;
  created: Date;
  resourceQuantity?: number;
  effortQuantity?: number;
  fulfills: string;           // Commitment ID
  fulfilledBy: string;        // EconomicEvent ID

  constructor(init: FulfillmentShape) {
    assignFields<FulfillmentShape, Fulfillment>(init, this);
    this.id = this.id ? this.id : Guid.raw();
    this.created = this.created ? this.created : new Date();
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
