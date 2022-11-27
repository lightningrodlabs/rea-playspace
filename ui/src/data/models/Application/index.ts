/**
 * This is the Rosetta Stone for understanding how the models are construted and
 * where they live in the tree.
 */

import {
  Agent,
  Unit,
  GeoPoint,
  GeoData,
  ResourceSpecification,
  ProcessSpecification,
  Action,
  PlanShape,
  Plan,
  Process,
  Commitment,
  EconomicResource,
  EconomicEvent,
  Fulfillment,
  Measurement
} from "valueflows-models";

import {
  Position,
  DisplayNode,
  DisplayEdge
} from './Display';
import {
  Root
} from './Root';

import { Pathed, TreeDefinition } from "data-providers";

class ExtendedPlan extends Plan {
  displayNode: Record<string, Pathed<DisplayNode>>;
  displayEdge: Record<string, Pathed<DisplayEdge>>;

  constructor(init: PlanShape) {
    super(init);
    this.displayNode = {};
    this.displayEdge = {};
  }
}

export const ModelKinds = {
  'root': Root,
  'agent': Agent,
  'unit': Unit,
  'geoPoint': GeoPoint,
  'geoData': GeoData,
  'atLocation': GeoData,
  'toLocation': GeoData,
  'currentLocation': GeoData,
  'resourceQuantity': Measurement,
  'effortQuantity': Measurement,
  'accountingQuantity': Measurement,
  'onhandQuantity': Measurement,
  'resourceSpecification': ResourceSpecification,
  'processSpecification': ProcessSpecification,
  'action': Action,
  'plan': ExtendedPlan,
  'process': Process,
  'intent': Object,         // TODO
  'proposal': Object,       // TODO
  'proposedIntent': Object, // TODO
  'agreement': Object,      // TODO
  'commitment': Commitment,
  'economicResource': EconomicResource,
  'economicEvent': EconomicEvent,
  'fulfillment': Fulfillment,
  'position': Position,
  'displayNode': DisplayNode,
  'displayEdge': DisplayEdge,
  'vfPath': Object,         // This allows arrays in JSON data to work.
};

export type ModelType = keyof typeof ModelKinds;

/**
 * Currently, our Root is a singleton and most other classes are children of it.
 * In the next iteration of this, we should change that so there can be multiple
 * root objects that can all represent a particular namespace that these objects
 * exist within. This is because we need remove the conflict that happens when
 * each and every agent overwrites the same root object. This refactor is mostly
 * to enable this kind of flexibility that out initial implementation didn't
 * allow.
 *
 * Since we have all of this data, we can walk this tree at the same time we
 * traverse the graph data retrieved from zome or localstorage.
 */
export const ModelTree: TreeDefinition = {
  'root': {
    singleton: true, // indicates there is only one root with no specific id
    children: {
      'agent': {
        primaryKey: 'id'
      },
      'unit': {
        primaryKey: 'id'
      },
      'resourceSpecification': {
        primaryKey: 'id'
      },
      'processSpecification': {
        primaryKey: 'id'
      },
      'action': {
        primaryKey: 'id'
      },
      'plan': {
        primaryKey: 'id',
        children: {
          'process': {
            primaryKey: 'id',
            parentKey: 'plannedWithin'
          },
          'commitment': {
            primaryKey: 'id',
            parentKey: 'plannedWithin',
            children: {
              'atLocation': {
                singleton: true
              },
              'resourceQuantity': {
                singleton: true
              },
              'effortQuantity': {
                singleton: true
              }
            }
          },
          'displayNode': {
            primaryKey: 'id',
            parentKey: 'plannedWithin',
            children: {
              'position': {
                singleton: true
              }
            }
          },
          'displayEdge': {
            primaryKey: 'id',
            parentKey: 'plannedWithin',
            children: {
              'vfPath': {
                singleton: true
              }
            }
          },
        },
      },
      'intent': {},
      'proposal': {
        children: {
          'proposedIntent': {
            parentKey: 'publishedIn',
            // need a way to remap a single field to a specific instance, maybe?
            substituteWith: {
              'publishes': 'root.intent' // needs to replace the publishes foreign key with a reference to this specific intent
            }
          }
        }
      },
      'agreement': {
        // need to skip items with no kind
        children: {
          'commitment': {
            primaryKey: 'id',
            parentKey: 'clauseOf'
          },
        }
      },
      'economicResource': {
        primaryKey: 'id',
        children: {
          'accountingQuantity': {
            singleton: true
          },
          'onhandQuantity': {
            singleton: true
          },
          'currentLocation': {
            singleton: true
          }
        }
      },
      'economicEvent': {
        primaryKey: 'id',
        children: {
          'atLocation': {
            singleton: true
          },
          'toLocation': {
            singleton: true
          },
          'resourceQuantity': {
            singleton: true
          },
          'effortQuantity': {
            singleton: true
          }
        }
      },
      'fulfillment': {
        primaryKey: 'id'
      },
    }
  }
};
