import { Guid } from "guid-typescript";
import { PathedData } from "../PathedData";
import { DisplayNode, DisplayEdge } from "../Application/Display";
import { PlanShape, ProcessShape, InputCommitmentShape, OutputCommitmentShape } from "../../../types/valueflows";
import { rejectEmptyFields } from '../../../utils';

// Plan Classes

export class Plan implements PlanShape, PathedData {
  id: string;
  created: Date;
  name: string;
  note?: string;
  due?: Date;
  process?: Record<string, ProcessShape>;
  displayNode?: Record<string, DisplayNode>;
  displayEdge?: Record<string, DisplayEdge>;

  constructor(init: PlanShape) {
    const filtered = rejectEmptyFields<PlanShape>(init);
    this.id = filtered.id ? filtered.id : Guid.raw();
    this.created = filtered.created ? filtered.created : new Date();
    this.name = filtered.name;
    this.note = filtered.note ? filtered.note : undefined;
    this.due = filtered.due ? filtered.due : undefined;
    this.process = {};
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
    return {
      id: this.id.toString(),
      created: this.created,
      name: this.name,
      note: this.note,
      due: this.due
    };
  }
}

export class Process implements ProcessShape, PathedData {
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
  inputCommitments?: Map<string, InputCommitmentShape>; // Add button on left
  outputCommitments?: Map<string, OutputCommitmentShape>; // add button on right

  constructor(init: ProcessShape) {
    const filtered = rejectEmptyFields<ProcessShape>(init);
    this.id = filtered.id ? filtered.id : Guid.raw();
    this.created = filtered.created ? filtered.created : new Date();
    this.name = filtered.name;
    this.finished = filtered.finished ? filtered.finished : false;
    this.note = filtered.note;
    this.classifiedAs = filtered.classifiedAs;
    this.inScopeOf = filtered.inScopeOf;
    this.basedOn = filtered.basedOn;
    this.plannedWithin = filtered.plannedWithin;
    this.hasBegining = filtered.hasBegining;
    this.hasEnd = filtered.hasEnd;
    this.hasPointInTime = filtered.hasPointInTime;
    this.due = filtered.due;
    this.created = new Date();
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
    return {
      id: this.id.toString(),
      created: this.created,
      name: this.name,
      note: this.note,
      finished: this.finished,
      classifiedAs: this.classifiedAs,
      inScopeOf: this.inScopeOf,
      basedOn: this.basedOn,
      plannedWithin: this.plannedWithin,
      hasBegining: this.hasBegining,
      hasEnd: this.hasEnd,
      hasPointInTime: this.hasPointInTime,
      due: this.due
    };
  }
}
