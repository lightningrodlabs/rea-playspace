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
  CommitmentShape,
  UnitShape,
  EconomicResourceShape,
  EconomicEventShape,
  FulfillmentShape
} from "../../types/valueflows";
import {
  Root, RootShape
} from "./Application/Root";
import {
  Agent,
  ResourceSpecification,
  ProcessSpecification,
  Unit
} from "./Valueflows/Knowledge";
import {
  Commitment,
  Plan,
  Process
} from "./Valueflows/Plan";
import {
  EconomicResource,
  EconomicEvent,
  Fulfillment
} from './Valueflows/Observation';
import {
  DisplayNode,
  DisplayNodeShape,
  DisplayEdge,
  DisplayEdgeShape
} from "./Application/Display";
import { PathedData } from "./PathedData";

/**
 * Map from a parent path slug to a function that transforms the object into the corresponding class
 */
export const ModelBuilder = {
  'root' : (object: Object) => new Root(object as RootShape),
  'agent': (object: Object) => new Agent(object as AgentShape),
  'resourceSpecification': (object: Object) => new ResourceSpecification(object as ResourceSpecificationShape),
  'processSpecification': (object: Object) => new ProcessSpecification(object as ProcessSpecificationShape),
  'plan': (object: Object) => new Plan(object as PlanShape),
  'process': (object: Object) => new Process(object as ProcessShape),
  'displayNode': (object: Object) => new DisplayNode(object as DisplayNodeShape),
  'displayEdge': (object: Object) => new DisplayEdge(object as DisplayEdgeShape),
  'commitment': (object: Object) => new Commitment(object as CommitmentShape),
  'unit': (object: Object) => new Unit(object as UnitShape),
  'economicResource': (object: Object) => new EconomicResource(object as EconomicResourceShape),
  'economicEvent': (object: Object) => new EconomicEvent(object as EconomicEventShape),
  'fulfillment': (object: Object) => new Fulfillment(object as FulfillmentShape)
};

/**
 * Create enum of all the possible model types
 */
export type ModelType = keyof typeof ModelBuilder;

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
export const ModelConstructorMap = {
  'root': Root,
  'agent': Agent,
  'resourceSpecification': ResourceSpecification,
  'processSpecification': ProcessSpecification,
  'plan': Plan,
  'process': Process,
  'displayNode': DisplayNode,
  'displayEdge': DisplayEdge,
  'commitment': Commitment,
  'unit': Unit,
  'economicResource': EconomicResource,
  'economicEvent': EconomicEvent,
  'fulfillment': Fulfillment
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
  for (let [placeholder, type] of Object.entries(ModelConstructorMap)) {
    if (tempRoot.hasOwnProperty(placeholder)) {
      newRoot[placeholder] = objectEntriesToMap<typeof type>(tempRoot[placeholder]);
    }
  }
}

/**
 * Constructs a model from PPJO given it's type and name
 * The name is only required to determine the root
 */
 export function constructFromObj(type: string, name: string, data: {}): PathedData {
  let PDO: PathedData = null;
  if (type && type != "") {
    // In some cases, the type is 'root', but it's just the index, don't make a Root object
    if (type in ModelBuilder && (type != 'root' || name == 'root')) {
      PDO = ModelBuilder[type](data);
    } else {
      PDO = {} as PathedData;
    }
  } else {
    if (name == 'root') {
      PDO = ModelBuilder['root'](data);
    }
  }
  return PDO;
}

/**
 * Constructs a model from JSON given it's type and name
 * The name is only required to determine the root
 */
export function constructFromJSON(type: string, name: string, data: string): PathedData {
  let PDO: PathedData = null
  if (data != "") {
    PDO = constructFromObj(type, name, JSON.parse(data));
  } else {
    PDO = {} as PathedData;
  }
  return PDO;
}
