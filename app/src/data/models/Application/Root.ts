import { Pathed } from "data-providers";
import { assignFields } from "typed-object-tweezers";
import {
  ResourceSpecification,
  ProcessSpecification,
  Agent,
  Action,
  Actions,
  Unit,
  Units,
  EconomicEvent,
  EconomicResource,
  Fulfillment,
  Plan
} from "valueflows-models";

/**
 * This shape of the root object's data, this is application specific.
 */
export interface RootShape {
  planId: string;

  // All of the different child types under the root node, these are serialized
  // separately by their own classes under their own paths.
  action?: Record<string, Action>;
  resourceSpecification?: Record<string, ResourceSpecification>;
  processSpecification?: Record<string, ProcessSpecification>;
  agent?: Record<string, Agent>;
  plan?: Record<string, Plan>;
  unit?: Record<string, Unit>;
  economicResource?: Record<string, EconomicResource>;
  economicEvent?: Record<string, EconomicEvent>;
  fulfillment?: Record<string, Fulfillment>;
}

/**
 * Root interface, if we ever add more root level objects and indices, we'll need to
 * add them here.
 *
 * Elements in the root follow paths that correspond to their paths in the dht:
 *  * root.processSpecification.ps1
 *  * root.plan.p1.process.pr1.committedInputs.c1;
 */

export class Root implements RootShape {
  id: string;

  // Our root data
  planId: string;

  // All of the different child types under the root node, these are serialized
  // separately by their own classes under their own paths.
  action: Record<string, Pathed<Action>>;
  resourceSpecification: Record<string, Pathed<ResourceSpecification>>;
  processSpecification: Record<string, Pathed<ProcessSpecification>>;
  agent: Record<string, Pathed<Agent>>;
  plan: Record<string, Pathed<Plan>>;
  unit: Record<string, Pathed<Unit>>;
  economicResource: Record<string, Pathed<EconomicResource>>;
  economicEvent: Record<string, Pathed<EconomicEvent>>;
  fulfillment: Record<string, Pathed<Fulfillment>>;

  /**
   * The constructor should be able to handle these situations:
   *  - Starting fresh
   *  - Deserializing a root object
   *  - Cloning an existing root object
   */
  constructor(data?: RootShape) {
    // All the indices should be blank to start
    this.resourceSpecification = {};
    this.processSpecification = {};
    this.agent = {};
    this.plan = {};
    this.economicResource = {};
    this.economicEvent = {};
    this.fulfillment = {};

    // Actions should not be blank
    this.action = Actions;
    this.unit = Units;

    // If data has been passed in, set it otherwise, make it empty.
    if (data) {
      assignFields<RootShape, Root>(data, this);
    }
    this.planId = data ? data.planId : '';
    this.id = 'root';
  }

  public toJSON() {
    return { planId: this.planId };
  }
}
