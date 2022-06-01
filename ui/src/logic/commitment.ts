
// EDGE BUSINESS LOGIC

import { ResourceSpecification } from "../data/models/Valueflows/Knowledge";
import { Commitment, Process } from "../data/models/Valueflows/Plan";
import { CommitmentShape } from "../types/valueflows";

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
  // This is a transfer, set up the flow between the agents. User must select a resourceSpecification.
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
