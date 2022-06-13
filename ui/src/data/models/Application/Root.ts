import { PathedData } from "../PathedData";
import { ResourceSpecification, ProcessSpecification, Agent, Action, Actions, Unit, Units } from "../Valueflows/Knowledge";
import { EconomicEvent, EconomicResource, Fulfillment } from "../Valueflows/Observation";
import { Plan } from "../Valueflows/Plan";

/**
 * This shape of the root object's data, this is application specific.
 */
export interface RootShape {
  planId: string;
}

/**
 * Root interface, if we ever add more root level objects and indices, we'll need to
 * add them here.
 *
 * Elements in the root follow paths that correspond to their paths in the dht:
 *  * root.processSpecification.ps1
 *  * root.plan.p1.process.pr1.committedInputs.c1;
 */

export class Root implements RootShape, PathedData {

  // Our root data
  planId: string;

  // All of the different child types under the root node, these are serialized
  // separately by their own classes under their own paths.
  action: Record<string, Action>;
  resourceSpecification: Record<string, ResourceSpecification>;
  processSpecification: Record<string, ProcessSpecification>;
  agent: Record<string, Agent>;
  plan: Record<string, Plan>;
  unit: Record<string, Unit>;
  economicResource: Record<string, EconomicResource>;
  economicEvent: Record<string, EconomicEvent>;
  fulfillment: Record<string, Fulfillment>;

  get path() {
    return 'root';
  }

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

    this.planId = data ? data.planId : '';
  }

  public toJSON() {
    return { planId: this.planId };
  }
}
