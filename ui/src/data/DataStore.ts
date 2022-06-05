import ZomeApi from "../api/zomeApi";
import {  getHolochainClient, setAgentPubKey, setCellId, setZomeApi } from '../hcWebsockets';

import {
  Action,
  Agent,
  ProcessSpecification,
  ResourceSpecification,
  Unit
} from "./models/Valueflows/Knowledge";
import {
  Plan,
  Process
} from "./models/Valueflows/Plan";

import {
  DisplayNode,
  DisplayEdge
} from "./models/Application/Display";
import { DataStoreBase } from "./DataStoreBase";
import { Root } from "./models/Application/Root";

let dataStorePromise: Promise<DataStore>;
let dataStore: DataStore;


/**
 * Initialize Holochain WS connection, set up Zome API client and DataStore singletons.
 *
 * By the time this promise resolves, any call to `getDataStore` is gauranteed to
 * have a reference to our singleton
 */
 export async function initConnection(): Promise<DataStore> {
  dataStorePromise = new Promise(async (res) => {
    const client = await getHolochainClient();
    const app_info = client.appInfo;
    const [_dnaHash, agentPubKey] = app_info.cell_data[0].cell_id;

    const zomeApi = new ZomeApi(client);
    setAgentPubKey(agentPubKey);
    setCellId(app_info.cell_data[0].cell_id);
    setZomeApi(zomeApi);

    dataStore = new DataStore();
    await dataStore.fetchOrCreateRoot();
    res(dataStore);
  });
  return dataStorePromise;
}

/**
 * Fetches DataStore
 */
export default function getDataStore(): DataStore {
  return dataStore;
}

export class DataStore extends DataStoreBase {

  constructor() {
    super();
  }

  // Root helpers

  /**
   * Checks to see if we have anything in our DHT and chain, if not sets it up.
   */
  public override async fetchOrCreateRoot() {
    // check if root object exists
    const res = await this.zomeApi.get_thing('root');
    if (res.length === 0) {
      // if it doesn't, create it and a placeholder plan
      console.log('root does not exist. creating...');
      const plan = new Plan({
        name: 'Default Plan Name'
      });
      this.root = new Root({planId: plan.id})
      await this.put(this.root);
      await this.set(plan);
    } else  {
      // We have the data, lets hydrate it
      this.hydrateFromZome(res);
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
    return await this.fetchSingle(ProcessSpecification.getPath(id));
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
    return await this.fetchSingle(ResourceSpecification.getPath(id));
  }

  public getResourceSpecifications(): Array<ResourceSpecification> {
    return Object.values(this.root.resourceSpecification);
  }

  public async fetchResourceSpecifications() {
    return await this.fetchAll(ResourceSpecification.getPrefix());
  }


  // Agent helpers

  public getAgent(id: string): Agent {
    return this.root.agent[id];
  }

  public async fetchAgent(id: string): Promise<Agent> {
    return await this.fetchSingle(Agent.getPath(id)) as Agent;
  }

  public getAgents(): Array<Agent> {
    return Object.values(this.root.agent);
  }

  public async fetchAgents() {
    return await this.fetchAll(Agent.getPrefix());
  }

  public getCurrentPlanId(): string {
    return this.root['planId'];
  }

  // Plan helpers
  public getPlan(id: string): Plan {
    return this.root.plan[id];
  }

  public async fetchPlan(id: string) {
    return await this.fetchSingle(Plan.getPath(id));
  }

  public getPlans(): Array<Plan> {
    return Object.values(this.root.plan);
  }

  public async fetchPlans() {
    return await this.fetchAll(Plan.getPrefix());
  }

  // Display* helpers
  public getDisplayNodes(planId: string): DisplayNode[] {
    return Object.values(this.getCursor(DisplayNode.getPrefix(planId)));
  }

  public getDisplayEdges(planId: string): DisplayEdge[] {
    return Object.values(this.getCursor(DisplayEdge.getPrefix(planId)));
  }

  // Commitment helpers
  public getActions(): Action[] {
    return Object.values(this.root.action);
  }

  public getUnits(): Unit[] {
    return Object.values(this.root.unit);
  }
}

