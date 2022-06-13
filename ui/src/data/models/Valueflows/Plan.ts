import { Guid } from "guid-typescript";
import { PathedData } from "../PathedData";
import { NamedData } from "../NamedData";
import { DisplayNode, DisplayEdge } from "../Application/Display";
import {
  PlanShape,
  ProcessShape,
  CommitmentShape,
  MeasurementShape,
  GeoDataShape
} from "../../../types/valueflows";
import { assignFields, fieldsToJSON, toJSON } from '../../../utils';

// Plan Classes

/**
 * Plans are a container of sorts in Valueflows. They provide a very granular
 * level of planning below the agent (organization, individual, etc.) In the
 * spec, Plans are a refinement of a Scenario, which is based on a
 * Scenario Definition.
 */
export class Plan implements PlanShape, PathedData, NamedData {
  id: string;
  created: Date;
  name: string;
  note?: string;
  due?: Date;
  process?: Record<string, ProcessShape>;
  commitment: Record<string, CommitmentShape>;
  displayNode?: Record<string, DisplayNode>;
  displayEdge?: Record<string, DisplayEdge>;

  constructor(init: PlanShape) {
    assignFields<PlanShape, Plan>(init, this);
    this.id = this.id ? this.id : Guid.raw();
    this.created = this.created ? this.created : new Date();
    this.process = {};
    this.commitment = {};
    this.displayNode = {};
    this.displayEdge = {};
  }

  static getPrefix(): string {
    return 'root.plan';
  }

  static getPath(id: string): string {
    return `${Plan.getPrefix()}.${id}`;
  }

  get path(): string {
    return Plan.getPath(this.id);
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
export class Process implements ProcessShape, PathedData, NamedData {
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
    this.created = this.created ? this.created : new Date();
  }

  static getPrefix(planId: string): string {
    return `root.plan.${planId}.process`;
  }

  static getPath(planId: string, id: string): string {
    return `${Process.getPrefix(planId)}.${id}`;
  }

  get path(): string {
    return Process.getPath(this.plannedWithin, this.id);
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
export class Commitment implements CommitmentShape, PathedData {
  id: string;
  created: Date;
  action: string;
  provider: string;               // Agent ID
  receiver: string;               // Agent ID
  inputOf?: string;
  outputOf?: string;
  resourceInventoriedAs?: string; // ResourceSprecification ID
  resourceConformsTo?: string;    // ResourceSprecification ID
  resourceQuantity?: MeasurementShape;
  effortQuantity?: MeasurementShape;
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
  atLocation?: GeoDataShape;
  state?: string;

  constructor(init: CommitmentShape) {
    assignFields<CommitmentShape, Commitment>(init, this);
    this.id = this.id ? this.id : Guid.raw();
    this.created = this.created ? this.created : new Date();

  }

  static getPrefix(planId: string): string {
    return `root.plan.${planId}.commitment`;
  }

  static getPath(planId: string, id: string): string {
    return `${Commitment.getPrefix(planId)}.${id}`;
  }

  get path(): string {
    return Commitment.getPath(this.plannedWithin, this.id);
  }

  public toJSON(): CommitmentShape {
    return toJSON<CommitmentShape, Commitment>(this);
  }
}
