import { Guid } from "guid-typescript";
import { assignFields, fieldsToJSON } from "typed-object-tweezers";
import { HasIdDate, HasTime, Measurement, ReaBase } from "./Common";
import { HasAction, ActionKey, GeoDataShape, GeoData } from "./Knowledge";

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
  inputOf?: string;
  outputOf?: string;
}

// Plan Classes

/**
 * Plans are a container of sorts in Valueflows. They provide a very granular
 * level of planning below the agent (organization, individual, etc.) In the
 * spec, Plans are a refinement of a Scenario, which is based on a
 * Scenario Definition.
 */

export class Plan implements PlanShape {
  id: string;
  created: Date;
  name: string;
  note?: string;
  due?: Date;
  process?: Record<string, ProcessShape>;
  commitment: Record<string, CommitmentShape>;

  constructor(init: PlanShape) {
    assignFields<PlanShape, Plan>(init, this);
    this.id = this.id ? this.id : Guid.raw();
    this.created = this.created ? new Date(this.created) : new Date();
    this.due = init.due ? new Date(init.due) : undefined;
    this.note = init.note ? init.note : undefined;
    this.process = {};
    this.commitment = {};
  }

  public toJSON(): PlanShape {
    return fieldsToJSON<PlanShape, Plan>(
      this,
      [
        'id',
        'created',
        'name',
        'note',
        'due'
      ]
    );
  }
}

/**
 * Processes are mappings between multiple resources. They can describe how one
 * ResourceSpecification/EconomicResource is transformed.
 */
export class Process implements ProcessShape {
  id: string;
  created: Date;
  basedOn: string; // required: ID of a process specification
  plannedWithin: string; //required: ID of a Plan
  name: string; // get from process spec
  finished: boolean; // defaults to false
  note?: string; // text-area
  classifiedAs?: string; // don't display for now
  inScopeOf?: string; // can be all sorts of things GUID. Ignore for now.
  hasBegining?: Date;
  hasEnd?: Date;
  hasPointInTime?: Date;
  due?: Date;

  constructor(init: ProcessShape) {
    assignFields<ProcessShape, Process>(init, this);
    this.id = this.id ? this.id : Guid.raw();
    this.created = this.created ? new Date(this.created) : new Date();
    this.hasPointInTime = init.hasPointInTime ? new Date(Date.parse(init.hasPointInTime as string)) : undefined;
    this.hasBegining = init.hasBegining ? new Date(Date.parse(init.hasBegining as string)) : undefined;
    this.hasEnd = init.hasEnd ? new Date(Date.parse(init.hasEnd as string)) : undefined;
    this.due = init.due ? new Date(Date.parse(init.due as string)) : undefined;
    this.note = init.note ? init.note : undefined;
  }

  public toJSON(): ProcessShape {
    return fieldsToJSON<ProcessShape, Process>(
      this,
      [
        'id',
        'created',
        'name',
        'note',
        'finished',
        'classifiedAs',
        'inScopeOf',
        'basedOn',
        'plannedWithin',
        'hasBegining',
        'hasEnd',
        'hasPointInTime',
        'due'
      ]
    );
  }
}

/**
 * Commitments are really where the flows happen. They can describe the flow of
 * resources between agents and between processes. It is important to note that
 * the flows go from `provider` to `reciever` and from `EconomicResource`/
 * `ResourceSpecification` to `Process` via `inputOf` and from `Process` to
 * `EconomicResource`/`ResourceSpecification` via `outputOf`. Also note the
 * `receiver` on the `Process` side of `inputOf` is the `Agent` in charge of
 * completing the `Process`.
 */
export class Commitment implements CommitmentShape {
  id: string;
  created: Date;
  action: ActionKey;
  provider: string;               // Agent ID
  receiver: string;               // Agent ID
  inputOf?: string;
  outputOf?: string;
  resourceInventoriedAs?: string; // ResourceSprecification ID
  resourceConformsTo?: string;    // ResourceSprecification ID
  resourceQuantity?: Measurement;
  effortQuantity?: Measurement;
  resourceClassifiedAs?: string;  // General classification or grouping
  hasBegining?: Date;
  hasEnd?: Date;
  hasPointInTime?: Date;
  due?: Date;
  plannedWithin: string;
  independentDemandOf?: string;
  finished?: boolean;
  inScopeOf?: string;
  note?: string;
  agreedIn?: string;
  atLocation?: GeoData;
  state?: string;

  constructor(init: CommitmentShape) {
    assignFields<CommitmentShape, Commitment>(init, this);
    this.id = this.id ? this.id : Guid.raw();
    this.created = this.created ? new Date(this.created) : new Date();
    this.hasPointInTime = init.hasPointInTime ? new Date(init.hasPointInTime) : undefined;
    this.hasBegining = init.hasBegining ? new Date(init.hasBegining) : undefined;
    this.hasEnd = init.hasEnd ? new Date(init.hasEnd) : undefined;
    this.due = init.due ? new Date(init.due as string) : undefined;
    this.note = init.note ? init.note : undefined;
    this.resourceQuantity = (init.resourceQuantity && init.resourceQuantity != null) ? new Measurement(init.resourceQuantity): undefined;
    this.effortQuantity = (init.effortQuantity && init.effortQuantity != null) ? new Measurement(init.effortQuantity): undefined;
    this.atLocation = (this.atLocation && init.atLocation != null) ? new GeoData(this.atLocation) : undefined;
  }

  public toJSON(): CommitmentShape {
    return fieldsToJSON<CommitmentShape, Commitment>(
      this, [
        'id',
        'created',
        'action',
        'provider',
        'receiver',
        'inputOf',
        'outputOf',
        'resourceInventoriedAs',
        'resourceConformsTo',
        'resourceQuantity',
        'effortQuantity',
        'resourceClassifiedAs',
        'hasBegining',
        'hasEnd',
        'hasPointInTime',
        'due',
        'plannedWithin',
        'independentDemandOf',
        'finished',
        'inScopeOf',
        'note',
        'agreedIn',
        'atLocation',
        'state'
      ]
    );
  }
}
