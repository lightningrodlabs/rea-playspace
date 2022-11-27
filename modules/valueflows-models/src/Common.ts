import { assignFields, fieldsToJSON, toJSON } from "typed-object-tweezers";

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

export interface MeasurementShape {
  hasNumericalValue: number;  // actual quantity
  hasUnit: string;            // ID of unit
}

export interface ReaBase {
  provider: string;                     // Agent ID or object
  receiver: string;                     // Agent ID or object
  resourceInventoriedAs?: string;       // EconomicResource ID or object
  resourceConformsTo?: string;          // ResourceSprecification ID or object
  resourceQuantity?: MeasurementShape;
  effortQuantity?: MeasurementShape;
  resourceClassifiedAs?: string;        // General classification or grouping
  inScopeOf?: string;
}

/**
 * Basic model of a measurement from the OM Schema
 */

export class Measurement implements MeasurementShape {
  hasNumericalValue: number;  // actual quantity
  hasUnit: string;            // ID of unit

  constructor(init?: MeasurementShape) {
    this.hasNumericalValue = 0;
    this.hasUnit = '';
    if (init) {
      assignFields<MeasurementShape, Measurement>(init, this);
    }
  }

  public toJSON(): MeasurementShape {
    return fieldsToJSON<MeasurementShape, Measurement>(
      this, ['hasNumericalValue', 'hasUnit']
    );
  }
}
