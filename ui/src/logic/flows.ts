// EDGE BUSINESS LOGIC

import { Edge, MarkerType, Node } from "react-flow-renderer";
import { DateToUiString } from "../components/util";
import { getDataStore } from "../data/DataStore";
import { DisplayEdge, DisplayNode } from "../data/models/Application/Display";
import { ModelKinds } from "../data/models/Application";
import { getAlmostLastPart } from "typed-object-tweezers";
import {
  Action,
  Agent,
  isInSet,
  isTransfer,
  ResourceSpecification,
  Unit,
  EconomicEvent,
  Commitment,
  Process,
  Flow,
  MeasurementShape,
  FlowShape
} from "valueflows-models";

/**
 * Given an ID, it returns the DisplayNode, it's associated Valueflows object and type.
 * This differs from Edges in that there is only one object associated with it, while
 * DisplayEdges have many objects associated with them.
 */
export const getDisplayNodeBy = (id: string): any => {
  const store = getDataStore();
  const displayNode: DisplayNode = store.getById(id);
  const vfType = getAlmostLastPart(displayNode.vfPath);
  const T = ModelKinds[vfType];
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
export const getFirstCommitmentOrEvent = (displayEdge: DisplayEdge): Flow => {
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
 * Hydrate the resource from the key
 */
export const getResource = (flow: Flow) => {
  const store  = getDataStore();
  if (flow && flow.resourceConformsTo) {
    return store.getById<ResourceSpecification>(flow.resourceConformsTo as string);
  }
  return null;
}

/**
 * Hydrate the provider from the key
 */
export const getProvider = (flow: Flow) => {
  const store = getDataStore();
  if (flow && flow.provider) {
    return store.getById<Agent>(flow.provider as string);
  }
  return null;
};

/**
 * Hydrate the recevier from the key
 */
export const getReceiver = (flow: Flow) => {
  const store = getDataStore();
  if (flow && flow.receiver) {
    return store.getById<Agent>(flow.receiver as string);
  }
  return null;
};

/**
 * Hydrate the conforming resource from the key, or the defaults
 */
export const getConformingResource = (flow: FlowShape, initial?: FlowShape): ResourceSpecification => {
  const store = getDataStore();
  if (flow && flow.resourceConformsTo) {
    return store.getById<ResourceSpecification>(flow.resourceConformsTo);
  } else if (initial && initial.resourceConformsTo) {
    return store.getById<ResourceSpecification>(initial.resourceConformsTo);
  } else {
    return null;
  }
};

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
      action: 'produce',
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
  'resourceSpecification-process': (flow: Flow, resource: ResourceSpecification, process: Process): FlowShape => {
    const clone = {...flow};
    clone.resourceConformsTo = resource.id;
    clone.receiver = process.inScopeOf;
    clone.inputOf = process.id;
    return clone;
  },
  // this is an output
  'process-resourceSpecification': (flow: Flow, process: Process, resource: ResourceSpecification): FlowShape => {
    const clone = {...flow};
    clone.resourceConformsTo = resource.id;
    clone.provider = process.inScopeOf;
    clone.outputOf = process.id;
    return clone;
  },
  // This is a transfer, set up the flow between the agents. User must select a resourceSpecification.
  'resourceSpecification-resourceSpecification': (flow: Flow, source: ResourceSpecification, target: ResourceSpecification): FlowShape => {
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
  init.hasPointInTime = event.hasPointInTime ? new Date(event.hasPointInTime) : null;
  return init;
}

export const getAllowedActions = (flow: FlowShape, actions: Action[]): Action[] => {
  let allowedActions = [];
  if(Object.hasOwn(flow, 'inputOf')) {
    allowedActions = actions.filter((action) => (action.inputOutput === 'input' || action.inputOutput === 'both'));
  } else if (Object.hasOwn(flow, 'outputOf')) {
    allowedActions = actions.filter((action) => (action.inputOutput === 'output' || action.inputOutput === 'both'));
  } else {
    allowedActions = actions.filter((action) => action.inputOutput === 'na');
  }
  return allowedActions;
}

/**
 * Returns a label for a flow (a Commitment or EconomicEvent)
 */
export const getLabelForFlow = (flow: Flow, resource: ResourceSpecification, provider: Agent, receiver: Agent, actions: Action[], units: Unit[]): string => {
  // default label
  let label = "Error creating label.";

  // default action, for debugging
  let action = new Action({
    id: null,
    label: 'blank action',
    eventQuantity: null,
    createResource: null,
    inputOutput: 'na',
    comment: "This indicates there's no action selected."
  });

  // Get the action
  if (flow.action && flow.action !== null) {
    action = actions.find((action) => action.id == flow.action as string);
  }

  // Blank unit
  const blankUnit = new Unit({
    id: 'na',
    name: 'blank unit',
    symbol: 'blank unit'
  });

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
  function measurementString(quantity: MeasurementShape) {
    let unit = units.find((unit) => unit.id == quantity.hasUnit);
    return `${quantity.hasNumericalValue} ${mungeSymbol(unit ? unit : blankUnit)}`;
  }

  /**
   * Get the flow's resourceQuantity as a string
   */
  function resourceQuantity(flow: Flow): string {
    if (
      flow.resourceQuantity != null
      && typeof flow.resourceQuantity == 'object'
      && flow.resourceQuantity.hasNumericalValue
      && flow.resourceQuantity.hasUnit
    ) {
      return ` ${measurementString(flow.resourceQuantity)} `;
    }
    return '';
  }

  /**
   * Get the flow's resourceQuantity as a string
   */
  function effortQuantity(flow: Flow, show?: boolean): string {
    if (
      flow.effortQuantity != null
      && typeof flow.effortQuantity == 'object'
      && flow.effortQuantity.hasNumericalValue
      && flow.effortQuantity.hasUnit
    ) {
      return `${show ? ' for': ''} ${measurementString(flow.effortQuantity)} `;
    }
    return '';
  }

  /**
   * XXX: this actually seems fishy
   */
  function dateString(flow: Flow):string {
    if (flow instanceof Commitment && flow.due) {
      return ` ${DateToUiString(flow.due as Date)}`;
    }
    if (flow.hasPointInTime) {
      return ` ${DateToUiString(flow.hasPointInTime as Date)}`;
    }
    return '';
  }

  function getName(obj: {}): string {
    if (obj && Object.hasOwn(obj, 'name')) {
      return obj['name'];
    } else {
      return 'Missing Name';
    }
  }

  /**
   * Conditionals are arranged to construct the string in order.
   *
   * work: action N unit by provider [due date]
   * cite: action [resource name] by provider
   * use: action N unit (resourceQty) for M unit (effortQty) [resource name] from provider [due date]
   * transfers: action N unit [resource name] from provider to receiver [due date]
   * move, raise, lower: action N unit [resource name] in provider
   * other inputs: action N unit [resource name] from provider [due date]
   * outputs: action N unit [resource name] for receiver [due date]
   */

  const resourceName = getName(resource);
  const providerName = getName(provider);
  const receiverName = getName(receiver);

  // Work
  if (action.id == 'work') {
    return `${action.label}${effortQuantity(flow)}by ${providerName}${dateString(flow)}`;
  }

  // Cite
  if (action.id == 'cite') {
    return `${action.label} ${resourceName} by ${providerName}`;
  }

  // Use
  if (action.id == 'use') {
    return `${action.label}${resourceQuantity(flow)}${effortQuantity(flow, true)}${resourceName} from ${providerName}${dateString(flow)}`;
  }

  // Transfer
  if (
    isTransfer(action.id)
    && flow.provider
    && flow.receiver
  ) {
    return `${action.label}${resourceQuantity(flow)}${resourceName} from ${providerName} to ${receiverName}${dateString(flow)}`;
  }

  // Move, Raise, Lower
  if (isInSet(['move', 'raise', 'lower'], action.id)) {
    return `${action.label}${resourceQuantity(flow)}${resourceName} in ${providerName}`;
  }

  // Input
  if (
    isInSet(['input', 'both'], action.inputOutput)
    && flow.inputOf && flow.provider
  ) {
    return `${action.label}${resourceQuantity(flow)}${resourceName} from ${providerName}${dateString(flow)}`;
  }

  // Output
  if (
    isInSet(['output', 'both'], action.inputOutput)
    && flow.outputOf && flow.receiver
  ) {
    return `${action.label}${resourceQuantity(flow)}${resourceName} for ${receiverName}${dateString(flow)}`;
  }

  return label;
}

/**
 * Summarizes a set of events in one event
 */
function summarizeEvents(events: EconomicEvent[]):EconomicEvent {
  const clone = [...events];
  const firstEvent = clone.shift();
  const summaryEvent = new EconomicEvent(getEventDefaultsFromEvent(firstEvent));
  clone.forEach((event) => {
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
      summaryEvent.effortQuantity.hasNumericalValue =
        summaryEvent.effortQuantity.hasNumericalValue +
        event.effortQuantity.hasNumericalValue;
    }
  });
  return summaryEvent;
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
      const provider = store.getById<Agent>(commitment.provider);
      const receiver = store.getById<Agent>(commitment.receiver);
      const resource = store.getById<ResourceSpecification>(commitment.resourceConformsTo);
      const commitmentLabel = getLabelForFlow(commitment, resource, provider, receiver, actions, units)
      flowLabels.push(`Commitment: ${commitmentLabel}`);
    } else {
      console.warn('No commitment for label.')
    }

    // Summarize events into a single event
    if (events.length > 0) {
      // Generate label for the summarized event
      const summaryEvent = summarizeEvents(events);
      const provider = store.getById<Agent>(summaryEvent.provider);
      const receiver = store.getById<Agent>(summaryEvent.receiver);
      const resource = store.getById<ResourceSpecification>(summaryEvent.resourceConformsTo);
      const eventLabel = getLabelForFlow(summaryEvent, resource, provider, receiver, actions, units)
      flowLabels.push(`Events: ${eventLabel}`);
    } else {
      console.warn('No events for label.');
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
    labelBgStyle: { fill: '#F1FFE7', fillOpacity: 0.7 },
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
  const vfObject = store.getCursor<Flow>(vfPath);

  let agent = null;
  if (Object.hasOwn(vfObject,'inScopeOf')) {
    agent = store.getById<Agent>(vfObject.inScopeOf).name;
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
