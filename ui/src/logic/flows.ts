// EDGE BUSINESS LOGIC

import { Edge, MarkerType, Node } from "react-flow-renderer";
import getDataStore from "../data/DataStore";
import { DisplayEdge, DisplayNode } from "../data/models/Application/Display";
import { ObjectTypeMap } from "../data/models/ObjectTransformations";
import { getAlmostLastPart } from "../data/models/PathedData";
import { Action, Agent, ResourceSpecification, Unit } from "../data/models/Valueflows/Knowledge";
import { EconomicEvent } from "../data/models/Valueflows/Observation";
import { Commitment, Process } from "../data/models/Valueflows/Plan";
import { FlowShape, MeasurementShape } from "../types/valueflows";

/**
 * Given an ID, it returns the DisplayNode, it's associated Valueflows object and type.
 * This differs from Edges in that there is only one object associated with it, while
 * DisplayEdges have many objects associated with them.
 */
export const getDisplayNodeBy = (id: string): any => {
  const store = getDataStore();
  const displayNode: DisplayNode = store.getById(id);
  const vfType = getAlmostLastPart(displayNode.vfPath);
  const T = ObjectTypeMap[vfType];
  const vfNode: typeof T = store.getCursor(displayNode.vfPath);

  return {
    displayNode,
    vfType,
    vfNode
  }
}

/**
 * Returns the first flow associated with the edge, always returns the commitment if present
 */
export const getFirstCommitmentOrEvent = (displayEdge: DisplayEdge): FlowShape => {
  const store = getDataStore();
  let path: string;
  if (Array.isArray(displayEdge.vfPath)) {
    let flowIndex = 0;
    const commitmentIndex = displayEdge.vfPath.findIndex(
      (path) => getAlmostLastPart(path) === 'commitment'
    );
    if (commitmentIndex > 0) {
      flowIndex = commitmentIndex;
    }
    path = displayEdge.vfPath[flowIndex];
  } else {
    path = displayEdge.vfPath;
  }
  return store.getCursor(path);
}

/**
 * Returns a clone of Commitment and Events associated with a display edge in a structured fashion.
 * @param vfPath 
 * @returns 
 */
export const getCommitmentAndEvents = (vfPath: string[] | string): {commitment: Commitment, events: EconomicEvent[]} => {
  const store = getDataStore();
  const events = new Array<EconomicEvent>();
  let commitmentPath: string;
  if (Array.isArray(vfPath)) {
    vfPath.forEach(
      (flowPath) => {
        if (getAlmostLastPart(flowPath) === 'commitment') {
          commitmentPath = flowPath;
        } else {
          events.push(new EconomicEvent(store.getCursor(flowPath) as EconomicEvent));
        }
      }
    );
  } else {
    commitmentPath = vfPath;
  }
  const commitment = commitmentPath ? new Commitment(store.getCursor(commitmentPath) as Commitment): null;
  return {commitment, events};
}

/**
 * Returns a set of sensible defaults for a flow
 */
export const flowDefaults = {
  // This is an input
  'resourceSpecification-process': (planId: string, resource: ResourceSpecification, process: Process): FlowShape => {
    return {
      plannedWithin: planId,
      resourceConformsTo: resource.id,
      provider: null,
      receiver: process.inScopeOf,
      action: 'use',
      inputOf: process.id
    };
  },
  // this is an output
  'process-resourceSpecification': (planId: string, process: Process, resource: ResourceSpecification): FlowShape => {
    return {
      plannedWithin: planId,
      resourceConformsTo: resource.id,
      provider: process.inScopeOf,
      receiver: null,
      action: 'use',
      outputOf: process.id
    };
  },
  // This is a transfer, set up the flow between the agents. User must select a
  // resourceSpecification.
  // TODO: The data model doesn't actualy have all the data needed to reconstruct
  // the graph. We don't actually know what the resource this is being transfered
  // to is without logging an event with resourceInventoriedAs and toResourceInventoriedAs
  'resourceSpecification-resourceSpecification': (planId: string, source: ResourceSpecification, target: ResourceSpecification): FlowShape => {
    return {
      plannedWithin: planId,
      resourceConformsTo: source.id,
      provider: null,
      receiver: null,
      action: 'transfer'
    };
  }
}

/**
 * Returns the minimum necessary changes to a flow when an edge is rewired.
 */
export const flowUpdates = {
  // This is an input
  'resourceSpecification-process': (flow: FlowShape, resource: ResourceSpecification, process: Process): FlowShape => {
    const clone = {...flow};
    clone.resourceConformsTo = resource.id;
    clone.receiver = process.inScopeOf;
    clone.inputOf = process.id;
    return clone;
  },
  // this is an output
  'process-resourceSpecification': (flow: FlowShape, process: Process, resource: ResourceSpecification): FlowShape => {
    const clone = {...flow};
    clone.resourceConformsTo = resource.id;
    clone.provider = process.inScopeOf;
    clone.outputOf = process.id;
    return clone;
  },
  // This is a transfer, set up the flow between the agents. User must select a resourceSpecification.
  'resourceSpecification-resourceSpecification': (flow: FlowShape, source: ResourceSpecification, target: ResourceSpecification): FlowShape => {
    const clone = {...flow};
    clone.resourceConformsTo = source.id;
    clone.action = flow.action as string in ['transfer', 'transfer-all-rights', 'transfer-custody'] ? flow.action : 'transfer';
    clone.inputOf = '';
    clone.outputOf = '';
    return clone;
  }
}

/**
 * Validate if a connection can happen
 */
export const validateFlow = (sourceType: string, targetType: string): boolean => {
  const validSourceTargets = {
    'resourceSpecification': [
      'process',
      'resourceSpecification'
    ],
    'process': [
      'resourceSpecification'
    ]
  };
  return validSourceTargets[sourceType]?.indexOf(targetType) >= 0
}

/**
 * Removes fields that shouldn't be set or not present in an Event and sets defaults
 */
export const getEventDefaultsFromCommitment = (commitment: Commitment): FlowShape => {
  const init = {...commitment};
  delete init.id;
  delete init.created;
  delete init.plannedWithin;
  delete init.due;
  delete init.note;
  init.hasPointInTime = new Date();
  return init;
}

/**
 * Removes fields that shouldn't be set or not present in an Event and sets defaults
 */
export const getEventDefaultsFromEvent = (event: EconomicEvent): FlowShape => {
  const init = {...event};
  delete init.id;
  delete init.created;
  delete init.note;
  init.hasPointInTime = new Date();
  return init;
}

/**
 * Returns a label for a flow (a Commitment or EconomicEvent)
 */
export const getLabelForFlow = (flow: FlowShape, provider: Agent, receiver: Agent, actions: Action[], units: Unit[]): string => {
  let label = "Reticualting splines...";

  let action = new Action({
    id: 'na',
    label: 'blank action',
    inputOutput: 'na',
    comment: "This indicates there's no action selected."
  });

  let resourceMeasurement: MeasurementShape = {
    hasNumericalValue: 0,
    hasUnit: ''
  };

  let resourceUnit = new Unit({
    id: 'na',
    name: 'blank unit',
    symbol: 'blank unit'
  });

  let effortMeasurement: MeasurementShape = {
    hasNumericalValue: 0,
    hasUnit: ''
  };

  let effortUnit = new Unit({
    id: 'na',
    name: 'blank unit',
    symbol: 'blank unit'
  });

  // Get the action
  if (flow.action && flow.action !== null) {
    action = actions.find((action) => action.id == flow.action as string);
  }

  /**
   * Simple conditional for not showing 'piece'.
   */
  function mungeSymbol(unit: Unit) {
    // Don't show the unit for pieces;
    return unit.id !== 'piece' ? unit.symbol: '';
  }

  /**
   * This turns a MeasurementShape into a string representation.
   * TODO: if we ensure that `flow.{resource,effort}Quantity is a `Measurement`
   *   we can move these functions onto the `Measurement` class.
   */
  function measumentString(quantity: MeasurementShape) {
    resourceUnit = units.find((unit) => unit.id == quantity.hasUnit);
    return `${quantity.hasNumericalValue} ${mungeSymbol(resourceUnit)}`;
  }

  /**
   * Conditionals are arranged to contruct the string in order.
   * TODO: see issue #72
   */

  label = `${action.label} `;

  // resourceQuantity
  if (
    flow.resourceQuantity != null
    && typeof flow.resourceQuantity == 'object'
    && flow.resourceQuantity.hasNumericalValue
    && flow.resourceQuantity.hasUnit
  ) {
    label += measumentString(flow.resourceQuantity);
  }

  // Use
  if (action.id == 'use') {
    label += ` from ${provider.name}`;
  }

  // effortQuantity
  if (
    flow.effortQuantity != null
    && typeof flow.effortQuantity == 'object'
    && flow.effortQuantity.hasNumericalValue
    && flow.effortQuantity.hasUnit
  ) {
    if (action.id = 'use') {
      label += ' for ';
    }
    label += measumentString(flow.effortQuantity);
  }

  // Transfer
  if (
    (action.id == 'transfer' || action.id == 'transfer-all-rights' || action.id == 'transfer-custody')
    && flow.provider
    && flow.receiver
    ) {
    return `${label} from ${provider.name} to ${receiver.name}`;
  }

  if (flow.inputOf && flow.provider) {
    return `${provider.name}: ${label}`;
  }

  if (flow.outputOf && flow.receiver) {
    return `${label} for ${receiver.name}`;
  }

  return label;
}

/**
 * Function to generate the label for a commitment edge.
 */
 export const getLabelForDisplayEdge = (displayEdge: DisplayEdge): string => {
  const store = getDataStore();
  const flowLabels = new Array<string>();
  let label = "No flows.";

  try {
    const actions: Action[] = store.getActions();
    const units: Unit[] = store.getUnits();
    const {commitment, events} = getCommitmentAndEvents(displayEdge.vfPath);
  
    // Generate label for the commitment
    if (commitment && commitment != null) {
      const provider = store.getById(commitment.provider as string);
      const receiver = store.getById(commitment.receiver as string);
      const commitmentLabel = getLabelForFlow(commitment, provider, receiver, actions, units)
      flowLabels.push(`Commitment: ${commitmentLabel}`);
    } else {
      console.log('No commitment for label.')
    }

    // Summarize events into a single event
    if (events.length > 0) {
      const firstEvent = events.shift();
      const summaryEvent = new EconomicEvent(getEventDefaultsFromEvent(firstEvent));
      events.forEach((event) => {
        // Guard against undefined or null values
        if (
          firstEvent.resourceQuantity
          && firstEvent.resourceQuantity != null
          && firstEvent.resourceQuantity.hasNumericalValue
          && firstEvent.resourceQuantity.hasNumericalValue != null
          && event.resourceQuantity
          && event.resourceQuantity != null
          && event.resourceQuantity.hasNumericalValue
          && event.resourceQuantity.hasNumericalValue != null
        ) {
          console.log(event.resourceQuantity.hasNumericalValue);
          summaryEvent.resourceQuantity.hasNumericalValue =
            summaryEvent.resourceQuantity.hasNumericalValue +
            event.resourceQuantity.hasNumericalValue;
        }
        // Guard against undefined or null values
        if (
          firstEvent.effortQuantity
          && firstEvent.effortQuantity != null
          && firstEvent.effortQuantity.hasNumericalValue
          && firstEvent.effortQuantity.hasNumericalValue != null
          && event.effortQuantity
          && event.effortQuantity != null
          && event.effortQuantity.hasNumericalValue
          && event.effortQuantity.hasNumericalValue != null
        ) {
          console.log(event.effortQuantity.hasNumericalValue);
          summaryEvent.effortQuantity.hasNumericalValue =
            summaryEvent.effortQuantity.hasNumericalValue +
            event.effortQuantity.hasNumericalValue;
        }
      });
      // Generate label for the summarized event
      const provider = store.getById(summaryEvent.provider as string);
      const receiver = store.getById(summaryEvent.receiver as string);
      const eventLabel = getLabelForFlow(summaryEvent, provider, receiver, actions, units)
      flowLabels.push(`Events: ${eventLabel}`);
    } else {
      console.log('No events for label.');
    }

    if (flowLabels.length > 0) {
      return flowLabels.join("\n");
    } else {
      return label;
    }
  } catch(err) {
    console.error(err);
    return "Error";
  }
}

/**
 * This returns the data in the format React Flow requires. The data.id is used
 * to map back to the DisplayEdge object in the store.
 *
 * TODO: maybe submit a PR to React Flows to either export the function that
 * builds these IDs, or make it more amenable to unique external IDs.
 */
export const displayEdgeToEdge = (displayEdge: DisplayEdge): Edge => {
  return {
    id: `reactflow__edge-${displayEdge.source}${displayEdge.sourceHandle || ''}-${displayEdge.target}${displayEdge.targetHandle || ''}`,
    source: displayEdge.source,
    target: displayEdge.target,
    sourceHandle: displayEdge.sourceHandle,
    targetHandle: displayEdge.targetHandle,
    label: getLabelForDisplayEdge(displayEdge),
    labelBgStyle: { fill: '#fff', color: '#fff', fillOpacity: 0.7 },
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
    data: {
      id: displayEdge.id
    }
  }
}

export const displayNodeToNode = (displayNode: DisplayNode): Node => {
  const store = getDataStore();
  const {id, name, type, vfPath, position} = displayNode;
  const vfObject = store.getCursor(vfPath);

  let agent = null;
  if (Object.hasOwn(vfObject,'inScopeOf')) {
    agent = store.getById(vfObject.inScopeOf).name;
  }

  return {
    id,
    position,
    type,
    data: {
      id,
      name,
      agent
    }
  }
}
