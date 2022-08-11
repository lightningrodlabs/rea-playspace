import { Guid } from "guid-typescript";
import { XYPosition, Node } from 'react-flow-renderer';
import { PathedData, getAlmostLastPart } from "../PathedData";
import { NamedData } from "../NamedData";
import { assignFields, fieldsToJSON } from '../../../utils';

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
  vfPath?: string[];
  planId: string;
  data?: any;
}

/**
 * This represents a node in React Flows. It corresponds to a few different
 * Valueflows objects.
 */
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

/**
 * Representation of an edge in the graph, represents a Valueflows Comittment.
 * 
 * Our representation of edges is slightly different from the representation in
 * React Flow. We need to be able to store what we care about, but also give
 * React Flow what it needs. Unfortunately, it adds a layer of complexity where
 * there is a React state that holds the data for the view and our data store.
 * This means we need to transform back and forth between the objects to maintain
 * consistency in both layers.
 */
export class DisplayEdge implements DisplayEdgeShape, PathedData {
  id: string;
  source: string;
  target: string;
  sourceHandle?: string | null;
  targetHandle?: string | null;
  vfPath?: string[];
  planId: string;

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
    return fieldsToJSON<DisplayEdgeShape, DisplayEdge>(
      this,
      ['id', 'source', 'target', 'sourceHandle', 'targetHandle', 'vfPath', 'planId']
    );
  }
}