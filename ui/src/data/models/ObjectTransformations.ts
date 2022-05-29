/**
 * This is the Rosetta Stone for understanding how the the DataStoreBase and
 * other locations in the code transform between plain Typescript objects and
 * the Model classes.
 *
 * If a transformation isn't happening that you think should be, then it's
 * probably missing from here.
 */

import {
  AgentShape,
  ResourceSpecificationShape,
  ProcessSpecificationShape,
  PlanShape,
  ProcessShape,
  CommitmentShape} from "../../types/valueflows";
import {
  Root
} from "./Application/Root";
import {
  Agent,
  ResourceSpecification,
  ProcessSpecification
} from "./Valueflows/Knowledge";
import {
  Commitment,
  Plan,
  Process
} from "./Valueflows/Plan";
import {
  DisplayNode,
  DisplayNodeShape,
  DisplayEdge,
  DisplayEdgeShape
} from "./Application/Display";

/**
 * Map from a parent path slug to a function that transforms the object into the corresponding class
 */
export const ObjectTransformations = {
  'agent': (object: Object) => new Agent(object as AgentShape),
  'resourceSpecification': (object: Object) => new ResourceSpecification(object as ResourceSpecificationShape),
  'processSpecification': (object: Object) => new ProcessSpecification(object as ProcessSpecificationShape),
  'plan': (object: Object) => new Plan(object as PlanShape),
  'process': (object: Object) => new Process(object as ProcessShape),
  'displayNode': (object: Object) => new DisplayNode(object as DisplayNodeShape),
  'displayEdge': (object: Object) => new DisplayEdge(object as DisplayEdgeShape),
  'commitment': (object: Object) => new Commitment(object as CommitmentShape),
  'economicEvent': function () { throw new Error('Not yet implemented'); }
};

/**
 * Maps of strings to actual Model classes.
 *
 * Used to map to object types used in the functions below, but can also be used
 * like so:
 *
 *   const {item, type} = JSON.parse(event.dataTransfer.getData('application/reactflow'));
 *   const T = ObjectTypeMap[type];
 *   const transformer = ObjectTransformations[type];
 *   const data: typeof T = transformer(item);
 *
 * This takes the type we stored and uses it to deserialize the data back into the
 * correct model automatically.
 */
export const ObjectTypeMap = {
  'root': Root,
  'agent': Agent,
  'resourceSpecification': ResourceSpecification,
  'processSpecification': ProcessSpecification,
  'plan': Plan,
  'process': Process,
  'displayNode': DisplayNode,
  'displayEdge': DisplayEdge,
  'commitment': Commitment,
  // TODO:
  'economicEvent': undefined
};

/**
 * Takes an object of Record<string, T> and maps it to Map<string, T>
 * @param obj
 * @returns
 */
export function objectEntriesToMap<T>(obj: Record<string, T>): Map<string, T> {
  return new Map<string, T>(
    Object.entries(obj)
  );
}

/**
 * Transforms a plan Typescript object tree into a Root class with Map<string, T>
 * This is currently unused, as it was a premature optimization.
 * @param tempRoot
 */
export function transformEntriesToMap(tempRoot: Object) {
  const newRoot: Root = new Root();
  for (let [placeholder, type] of Object.entries(ObjectTypeMap)) {
    if (tempRoot.hasOwnProperty(placeholder)) {
      newRoot[placeholder] = objectEntriesToMap<typeof type>(tempRoot[placeholder]);
    }
  }
}
