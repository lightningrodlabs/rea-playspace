import { Guid } from "guid-typescript";
import { XYPosition, Node, Edge, MarkerType } from 'react-flow-renderer';
import { PathedData, getAlmostLastPart } from "../PathedData";
import { NamedData } from "../NamedData";
import { assignFields, toJSON, fieldsToJSON } from '../../../utils';

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
  label: string;
  vfPath?: string;
  planId: string;
  markerEnd: Object;
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
    assignFields<DisplayNodeShape, DisplayNode>(init, this);
    this.id = this.id ? this.id : Guid.raw();
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
    return fieldsToJSON<DisplayNodeShape, DisplayNode>(
      this,
      ['id', 'name', 'position', 'vfPath', 'planId', 'type']
    );
  }
}

export class DisplayEdge implements Edge, DisplayEdgeShape, PathedData {
  id: string;
  source: string;
  target: string;
  label: string;
  vfPath?: string;
  planId: string;
  markerEnd: MarkerType;

  constructor(init: DisplayEdgeShape) {
    assignFields<DisplayEdgeShape, DisplayEdge>(init, this);
    this.id = this.id ? this.id : Guid.raw();
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
    return toJSON<DisplayEdgeShape, DisplayEdge>(this);
  }
}
