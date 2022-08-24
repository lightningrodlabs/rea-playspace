import {
  Action,
  Agent,
  ProcessSpecification,
  ResourceSpecification,
  Unit,
  Actions
} from "./models/Valueflows/Knowledge";
import {
  Plan
} from "./models/Valueflows/Plan";
import {
  Fulfillment
} from "./models/Valueflows/Observation";
import {
  DisplayNode,
  DisplayEdge
} from "./models/Application/Display";
import { YatiTreeStore, DataProvider } from "./YatiTreeStore";
import { Root } from "./models/Application/Root";
import { EconomicEvent } from "./models/Valueflows/Observation";
import { PathedData } from "./models/PathedData";

export class DataStore extends YatiTreeStore {

  constructor(providers?: Record<string, DataProvider>) {
    super(providers);
  }

  // Root helpers

  public createDefaultRoot() {
    // if it doesn't, create it and a placeholder plan
    console.info('root does not exist. creating...');
    const plan = new Plan({
      name: 'Default Plan Name'
    });
    this.root = new Root({planId: plan.id})
    this.set(this.root);
    this.set(plan);
    // Need to index tree starting with the root
    this.pathIndex.indexTree({
      root: this.root,
      path: ''
    } as PathedData);
  }

  /**
   * Checks to see if we have anything in our DataProvider,
   * if not sets up defaults for the app.
   */
  public async fetchOrCreateRoot(): Promise<any> {
    // check if root object exists
    try {
      const root = await this.fetch('root');
      if (root instanceof Root) {
        this.root = root;
      } else {
        this.createDefaultRoot();
      }
    } catch (e) {
      this.createDefaultRoot();
    }
  }

  // ProcessSprecification helpers

  // Get from store
  // Equivalent to getCursor(ProcessSpecification.getPath(id))
  public getProcessSpecification(id: string): ProcessSpecification {
    return this.root.processSpecification[id];
  }

  // For fetching updates when we get signals
  public async fetchProcessSpecification(id: string) {
    return await this.fetch(ProcessSpecification.getPath(id));
  }

  public getProcessSpecifications(): Array<ProcessSpecification> {
    return Object.values(this.root.processSpecification);
  }

  public async fetchProcessSpecifications() {
    return this.fetchAll(ProcessSpecification.getPrefix());
  }

  // ResourceSpecification helpers

  public getResourceSpecification(id: string): ResourceSpecification {
    return this.root.resourceSpecification[id];
  }

  public async fetchResourceSpecification(id: string) {
    return await this.fetch(ResourceSpecification.getPath(id));
  }

  public getResourceSpecifications(): Array<ResourceSpecification> {
    return Object.values(this.root.resourceSpecification);
  }

  public async fetchResourceSpecifications() {
    return await this.fetchAll(ResourceSpecification.getPrefix());
  }

  // Economic Event helpers

  public async fetchAllEconomicEvents(): Promise<Array<EconomicEvent>> {
    return (await this.fetchAll("root.economicEvent")) as Array<EconomicEvent>;
  }

  // Agent helpers

  public getAgent(id: string): Agent {
    return this.root.agent[id];
  }

  public async fetchAgent(id: string): Promise<Agent> {
    return await this.fetch(Agent.getPath(id)) as Agent;
  }

  public getAgents(): Array<Agent> {
    return Object.values(this.root.agent);
  }

  public async fetchAgents(): Promise<Array<Agent>> {
    return await this.fetchAll(Agent.getPrefix()) as Array<Agent>;
  }

  // Plan helpers
  public getCurrentPlanId(): string {
    return this.root['planId'];
  }

  public getPlan(id: string): Plan {
    return this.root.plan[id];
  }

  public async fetchPlan(id: string) {
    return await this.fetch(Plan.getPath(id));
  }

  public getPlans(): Array<Plan> {
    return Object.values(this.root.plan);
  }

  public async fetchPlans() {
    return await this.fetchAll(Plan.getPrefix());
  }

  // Fulfillment helpers
  public filterFulfillmentsByCommitmentAndEvent(commitmentId: string, eventId: string) {
    return Object.values(this.root.fulfillment).filter((f: Fulfillment) => f.fulfills == commitmentId && f.fulfilledBy == eventId);
  }

  public filterFulfillmentsByCommitment(commitmentId: string) {
    return Object.values(this.root.fulfillment).filter((f: Fulfillment) => f.fulfills == commitmentId);
  }

  public filterFulfillmentsByEvent( eventId: string) {
    return Object.values(this.root.fulfillment).filter((f: Fulfillment) => f.fulfilledBy == eventId);
  }

  // Display* helpers
  public getDisplayNodes(planId: string): DisplayNode[] {
    return Object.values(this.getCursor(DisplayNode.getPrefix(planId)));
  }

  public getDisplayEdges(planId: string): DisplayEdge[] {
    return Object.values(this.getCursor(DisplayEdge.getPrefix(planId)));
  }

  // Commitment helpers
  /**
   * XXX: this.root.action return children that have all fields set to {}
   */
  public getActions(): Action[] {
    return Object.values(Actions);
  }

  public getUnits(): Unit[] {
    return Object.values(this.root.unit);
  }

}

const dataStore = new DataStore();

/**
 * Fetches DataStore
 */
 export default function getDataStore(): DataStore {
  return dataStore;
}