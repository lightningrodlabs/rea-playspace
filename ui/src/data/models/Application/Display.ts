import { Guid } from "guid-typescript";
import { XYPosition } from 'react-flow-renderer';
import { PathedData } from "../PathedData";

export interface DisplayNodeShape {
  id?: string;
  position: XYPosition;
  vfPath: string;
  type?: string;
  data?: any;
}

export interface DisplayEdgeShape {
  id?: string;
  source: string;
  target: string;
  vfPath: string;
}

export class DisplayNode implements DisplayNodeShape, PathedData {
  id: string;
  position: XYPosition;
  vfPath: string;
  type?: string;
  data?: any;

  constructor(init: DisplayNodeShape) {
    this.id = init.id ? init.id : Guid.raw();
    this.position = init.position as XYPosition;
    this.vfPath = init.vfPath;
    this.type = init.type;
    this.data = init.data;
  }

  static getPrefix(planId: string): string {
    return `root.plan.${planId}.displayNode`;
  }

  static getPath(planId: string, id: string): string {
    return `${DisplayNode.getPrefix(planId)}.${id}`;
  }

  get path(): string {
    const planId = this.vfPath.split('.')[2];
    return DisplayNode.getPath(planId, this.id);
  }
}

export class DisplayEdge implements DisplayEdgeShape, PathedData {
  id: string;
  source: string;
  target: string;
  vfPath: string;

  constructor(init: DisplayEdgeShape) {
    this.id = init.id ? init.id : Guid.raw();
    this.source = init.source;
    this.target = init.target;
    this.vfPath = init.vfPath;
  }

  static getPrefix(planId: string): string {
    return `root.plan.${planId}.displayEdge`;
  }

  static getPath(planId: string, id: string): string {
    return `${DisplayEdge.getPrefix(planId)}.${id}`;
  }

  get path(): string {
    const planId = this.vfPath.split('.')[2];
    return DisplayEdge.getPath(planId, this.id);
  }
}
