import { Guid } from "guid-typescript";
import { XYPosition, Node, Edge } from 'react-flow-renderer';
import { PathedData, getAlmostLastPart } from "../PathedData";
import { NamedData } from "../NamedData";
import { rejectEmptyFields } from '../../../utils';

export interface DisplayNodeShape {
  id?: string;
  name: string;
  position: XYPosition;
  vfPath: string;
  planId: string;
  type?: string;
  data?: any;
}

export interface DisplayEdgeShape {
  id?: string;
  source: string;
  target: string;
  vfPath?: string;
  planId: string;
}

export class DisplayNode implements Node, PathedData, NamedData {
  id: string;
  name: string;
  position: XYPosition;
  vfPath: string;
  planId: string;
  type?: string;
  data: Object;

  constructor(init: DisplayNodeShape) {
    const filtered = rejectEmptyFields<DisplayNodeShape>(init);
    this.id = filtered.id ? filtered.id : Guid.raw();
    this.name = filtered.name;
    this.position = filtered.position as XYPosition;
    this.vfPath = filtered.vfPath;
    this.planId = filtered.planId;
    this.type = filtered.type;
    this.data = this.makeData();
  }

  public makeData(): Object {
    const type = getAlmostLastPart(this.vfPath);
    return {
      id: this.id,
      label: `${type.charAt(0).toUpperCase()}${type.slice(1)}`,
      name: this.name
    }
  }

  static getPrefix(planId: string): string {
    return `root.plan.${planId}.displayNode`;
  }

  static getPath(planId: string, id: string): string {
    return `${DisplayNode.getPrefix(planId)}.${id}`;
  }

  get path(): string {
    return DisplayNode.getPath(this.planId, this.id);
  }

  public toJSON() {
    return rejectEmptyFields<DisplayNodeShape>({
      id: this.id,
      name: this.name,
      position: this.position,
      vfPath: this.vfPath,
      planId: this.planId,
      type: this.type,
    });
  }
}

export class DisplayEdge implements Edge, DisplayEdgeShape, PathedData {
  id: string;
  source: string;
  target: string;
  vfPath?: string;
  planId: string;

  constructor(init: DisplayEdgeShape) {
    const filtered = rejectEmptyFields<DisplayEdgeShape>(init);
    this.id = filtered.id ? filtered.id : Guid.raw();
    this.source = filtered.source;
    this.target = filtered.target;
    this.vfPath = filtered.vfPath ? filtered.vfPath : undefined;
    this.planId = filtered.planId;
  }

  static getPrefix(planId: string): string {
    return `root.plan.${planId}.displayEdge`;
  }

  static getPath(planId: string, id: string): string {
    return `${DisplayEdge.getPrefix(planId)}.${id}`;
  }

  get path(): string {
    return DisplayEdge.getPath(this.planId, this.id);
  }

  public toJSON() {
    return rejectEmptyFields<DisplayEdgeShape>({
      id: this.id,
      source: this.source,
      target: this.target,
      vfPath: this.vfPath,
      planId: this.planId
    });
  }
}
