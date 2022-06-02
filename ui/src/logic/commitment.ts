
// EDGE BUSINESS LOGIC

import { Edge, MarkerType } from "react-flow-renderer";
import getDataStore from "../data/DataStore";
import { DisplayEdge, DisplayNode } from "../data/models/Application/Display";
import { ObjectTypeMap } from "../data/models/ObjectTransformations";
import { getAlmostLastPart } from "../data/models/PathedData";
import { Action, ResourceSpecification, Unit } from "../data/models/Valueflows/Knowledge";
import { Commitment, Process } from "../data/models/Valueflows/Plan";
import { CommitmentShape, MeasurementShape } from "../types/valueflows";

export const commitmentDefaults = {
  // This is an input
  'resourceSpecification-process': (planId: string, resource: ResourceSpecification, process: Process): CommitmentShape => {
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
  'process-resourceSpecification': (planId: string, process: Process, resource: ResourceSpecification): CommitmentShape => {
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
  'resourceSpecification-resourceSpecification': (planId: string, source: ResourceSpecification, target: ResourceSpecification): CommitmentShape => {
    return {
      plannedWithin: planId,
      resourceConformsTo: source.id,
      provider: null,
      receiver: null,
      action: 'transfer'
    };
  }
}

export const commitmentUpdates = {
  // This is an input
  'resourceSpecification-process': (commitment: Commitment, resource: ResourceSpecification, process: Process): Commitment => {
    const clone = new Commitment(commitment);
    clone.resourceConformsTo = resource.id;
    clone.receiver = process.inScopeOf;
    clone.inputOf = process.id;
    return clone;
  },
  // this is an output
  'process-resourceSpecification': (commitment: Commitment, process: Process, resource: ResourceSpecification): Commitment => {
    const clone = new Commitment(commitment);
    clone.resourceConformsTo = resource.id;
    clone.provider = process.inScopeOf;
    clone.outputOf = process.id;
    return clone
  },
  // This is a transfer, set up the flow between the agents. User must select a resourceSpecification.
  'resourceSpecification-resourceSpecification': (commitment: Commitment, source: ResourceSpecification, target: ResourceSpecification): Commitment => {
    const clone = new Commitment(commitment);
    clone.resourceConformsTo = source.id;
    clone.action = commitment.action in ['transfer', 'transfer-all-rights', 'transfer-custody'] ? commitment.action : 'transfer';
    clone.inputOf = '';
    clone.outputOf = '';
    return clone
  }
}

/**
 * Validate if a connection can happen
 */
export const validateConnection = (sourceType: string, targetType: string): boolean => {
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

export const getLabel = (displayEdge: DisplayEdge): string => {
  const store = getDataStore();
  // Grab the paths to the objects by their ID and grab the type of their vfPath
  const sourceNode: DisplayNode = store.getById(displayEdge.source);
  const sourceType = getAlmostLastPart(sourceNode.vfPath);

  const targetNode: DisplayNode = store.getById(displayEdge.target);
  const targetType = getAlmostLastPart(targetNode.vfPath);

  const commitment: Commitment = store.getCursor(displayEdge.vfPath);
  const action: Action = store.getActions().find((action) => action.id == commitment.action);
  const measurement: MeasurementShape = {
    hasNumericalValue: 0,
    hasUnit: ''
  };

  if (commitment.resourceQuantity != null && commitment.effortQuantity == null) {
    measurement.hasNumericalValue = commitment.resourceQuantity.hasNumericalValue;
    measurement.hasUnit = commitment.resourceQuantity.hasUnit;
  }
  if (commitment.resourceQuantity == null && commitment.effortQuantity != null) {
    measurement.hasNumericalValue = commitment.effortQuantity.hasNumericalValue;
    measurement.hasUnit = commitment.effortQuantity.hasUnit;
  }

  const unit: Unit = store.getUnits().find((unit) => unit.id == measurement.hasUnit);
  const baseLabel = `${action.label} ${measurement.hasNumericalValue} ${unit.symbol}`


  const type = `${sourceType}-${targetType}`;
  switch (type) {
    case 'resourceSpecification-process':
      if (commitment.provider){
        const provider = store.getById(commitment.provider);
        return `${provider.name}: ${baseLabel}`;
      }
      break;
    case 'process-resourceSpecification':
      return baseLabel;
      break;
    case 'resourceSpecification-resourceSpecification':
      if (commitment.provider && commitment.receiver){
        const provider = store.getById(commitment.provider);
        const receiver = store.getById(commitment.receiver);
        return `${baseLabel} from ${provider.name} to ${receiver.name}`;
      }
      break;
  }

  return baseLabel;
}

/**
 * This returns the data in the format React Flow requires. The data.id is used
 * to map back to the DisplayEdge object in the store.
 *
 * TODO: maybe submit a PR to React Flows to either export the function that
 * builds these IDs, or make it more amenable to unique external IDs.
 */
export const displayEdgeToEdge = (displayEdge: DisplayEdge): Edge  => {
  return {
    id: `reactflow__edge-${displayEdge.source}${displayEdge.sourceHandle || ''}-${displayEdge.target}${displayEdge.targetHandle || ''}`,
    source: displayEdge.source,
    target: displayEdge.target,
    sourceHandle: displayEdge.sourceHandle,
    targetHandle: displayEdge.targetHandle,
    label: getLabel(displayEdge),
    labelBgStyle: { fill: '#fff', color: '#fff', fillOpacity: 0.7 },
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
    data: {
      id: displayEdge.id
    }
  }
}
