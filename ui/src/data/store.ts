import ZomeApi from "../api/zomeApi";
import { getAppWs, setAgentPubKey, setCellId, setZomeApi } from '../hcWebsockets';
import { APP_ID } from '../holochainConf';
import { getZomeApi } from "../hcWebsockets";
import { RustNode, ThingInput } from "../types/holochain";
import { Guid } from "guid-typescript";
import {
  PathedData,
  Root,
  AgentShape,
  Agent,
  ProcessSpecificationShape,
  ProcessSpecification,
  ResourceSpecificationShape,
  ResourceSpecification,
  PlanShape,
  Plan,
  ProcessShape,
  Process,
  objectEntriesToMap
} from "../types/valueflows";

let dataStore: DataStore;

/**
 * Initialize our WS connection and set up the Zome API client
 */
export async function initConnection(): Promise<ZomeApi> {
  const appWs = await getAppWs();
  const app_info = await appWs.appInfo({ installed_app_id: APP_ID });
  const [_dnaHash, agentPubKey] = app_info.cell_data[0].cell_id;
  const zomeApi = new ZomeApi(appWs);
  setAgentPubKey(agentPubKey);
  setCellId(app_info.cell_data[0].cell_id);
  setZomeApi(zomeApi);
  return zomeApi;
}

/**
 * Fetches the DataStore or initialtiazes a new one
 * @returns DataStore
 */
export default function getDataStore(): DataStore {
  if (dataStore == undefined) {
    dataStore = new DataStore();
  }
  return dataStore;
}

/**
 * Data store object
 */
export class DataStore {

  private zomeApi: ZomeApi;
  private root: Root;

  constructor(zomeApi?: ZomeApi) {
    this.zomeApi = zomeApi ? zomeApi : getZomeApi();
    this.root = new Root();
  }

  /**
   * Puts any object that knows it's path and how to properly serialize itself
   * @param item
   */
  public async put(item: PathedData) {
    const itemThing: ThingInput = {
      path: item.path,
      data: JSON.stringify(item)
    };
    await this.zomeApi.put_thing(itemThing);
  }


  // Root helpers

  /**
   * Checks to see if we have anything in our DHT and chain, if not sets it up.
   */
   public async fetchOrCreateRoot() {
    // check if root object exists
    const res = await this.zomeApi.get_thing('root');
    if (res[0].val.data === '') {
      // if it doesn't, create it and a placeholder plan
      console.log('root does not exist. creating...');
      try {
        await this.createRoot();
      } catch (e) {
        console.log(e);
      }

      await this.setPlan(new Plan({
        name: 'There is no plan B.'
      }));
    } else  {
      // We Have the data, lets hydrate it
      this.hydrateFromZome(res);
      console.log('root', this.root);
    }
  }

  /**
   * Creates an empty root object
   */
  protected async createRoot() {
    await this.setRoot({});
  }

  /**
   * Sets the data on the root object
   * @param data
   */
  public async setRoot(data: {}) {
    this.root.data = data;
    this.put(this.root);
  }


  // ProcessSprecification helpers

  public async fetchProcessSpecification(id: Guid) {
    const res = await this.zomeApi.get_thing(ProcessSpecification.getPath(id));
    console.log(res);
    // TODO: Need to hydrate
  }

  public getProcessSpecification(id: Guid): ProcessSpecification {
    return this.root.processSpecification.get(id);
  }

   /**
   * Updates or adds a ProcessSpecification to our root and updates the DHT.
   *
   * @param item
   */
  public async setProcessSpecification(item: ProcessSpecification) {
    this.root.processSpecification.set(item.id, item);
    await this.put(item);
  }

  public async fetchProcessSpecifications() {
    const res = await this.zomeApi.get_thing(ProcessSpecification.getPrefix());
    console.log(res);
    // TODO: Need to hydrate
  }

  public getProcessSpecifications(): Array<ProcessSpecification> {
    return Array.from(this.root.processSpecification.values());
  }


  // ResourceSpecification helpers

  public async fetchResourceSpecification(id: Guid) {
    const res = await this.zomeApi.get_thing(ResourceSpecification.getPath(id));
    console.log(res);
    // TODO: Need to hydrate
  }

  public getResourceSpecification(id: Guid): ResourceSpecification {
    return this.root.resourceSpecification.get(id);
  }

  /**
   * Updates or adds a ResourceSpecification to our root and updates the DHT.
   * @param item
   */
  public async setResourceSpecification(item: ResourceSpecification) {
    this.root.resourceSpecification.set(item.id, item);
    await this.put(item);
  }

  public async fetchResourceSpecifications() {
    const res = await this.zomeApi.get_thing(ResourceSpecification.getPrefix());
    console.log(res);
    // TODO: Need to hydrate
  }

  public getResourceSpecifications(): Array<ResourceSpecification> {
    return Array.from(this.root.resourceSpecification.values());
  }


  // Agent helpers

  public async fetchAgent(id: Guid) {
    const res = await this.zomeApi.get_thing(Agent.getPath(id));
    console.log(res);
    // TODO: Need to hydrate
  }

  public getAgent(id: Guid): Agent {
    return this.root.agent.get(id);
  }

  /**
   * Updates or adds an Agent to our root and updates the DHT.
   * @param item
   */
  public async setAgent(item: Agent) {
    this.root.agent.set(item.id, item);
    await this.put(item);
  }

  public async fetchAgents() {
    const res = await this.zomeApi.get_thing(Agent.getPrefix());
    console.log(res);
    // TODO: Need to hydrate
  }

  public getAgents(): Array<Agent> {
    return Array.from(this.root.agent.values());
  }


  // Plan helpers

  public fetchPlan() {

  }

  public getPlan(id: Guid): Plan {
    return this.root.plan.get(id);
  }

  public getPlans(): Array<Plan> {
    return Array.from(this.root.plan.values());
  }

  /**
   * Updates or adds a Plan to our root and updates the DHT.
   *
   * @param item
   */
  public async setPlan(item: Plan) {
    this.root.plan.set(item.id, item);
    await this.put(item);
  }

  // Process helpers

  public async setProcess(item: Process) {
    this.root.plan.get(item.plannedWithin).process[''+item.id] = item;
    await this.put(item);
    await this.put(item.getMetaAsMeta());
  }

  // DisplayedAgent helpers

  // DisplayedResource helpers

  // Data helpers/transformers

  /**
   * Takes the data we receive from the Zome API and hydrates the root structure.
   *
   * Since we know what our tree is going to look like ahead of time, we can make
   * some assumptions.
   *
   * TODO: Right now, there's no way to refresh a particular node from the DHT
   * without fetching the whole tree structure again, we should remedy that. This
   * will mean separating this function into multiple stages, the first half is
   * general, but the second half will only apply to objects stored in the root
   * indices in the Map<Guid, X>s.
   *
   * @param res response from ZomeAPI
   */
  protected hydrateFromZome(res: RustNode[]) {
    console.log(res);
    // Placeholders will have no data set, and they will always be under the root level
    const placeholders = ['agent', 'resourceSpecification', 'processSpecification', 'plan'];
    // An array of parallel objects and references to deserilzed objects
    const parallelObjects = new Array<{}>();

    // Cycle through the result array and construct/deserialize the objects
    // The built up tree will be in parallelObjects[0] when done
    res.forEach((node: RustNode, i: number) => {
      const parent = node.parent;
      const {name, data} = node.val;

      // Temporarily assign an empty object
      let deserializedObject: Object = {};

      // Deserialize if not an empty string (if this is a link in a path in the DHT)
      if (data != "") {
        deserializedObject = JSON.parse(data);
      }

      // Assign to the parallel objects array
      parallelObjects[i] = deserializedObject;

      // If it has a parent then place a reference to it in the parent object
      if (parent !== null) {
        const parentName = res[parent].val.name;
        switch (parentName) {
          case 'agent': {
            parallelObjects[parent][name] = new Agent(deserializedObject as AgentShape);
            break;
          }
          case 'resourceSpecification': {
            parallelObjects[parent][name] = new ResourceSpecification(deserializedObject as ResourceSpecificationShape);
            break;
          }
          case 'processSpecification': {
            parallelObjects[parent][name] = new ProcessSpecification(deserializedObject as ProcessSpecificationShape);
            break;
          }
          case 'plan': {
            parallelObjects[parent][name] = new Plan(deserializedObject as PlanShape);
            break;
          }
          case 'process': {
            parallelObjects[parent][name] = new Process(deserializedObject as ProcessShape);
            break;
          }
          default: {
            parallelObjects[parent][name] = deserializedObject;
          }
        }
      }
    });

    const ObjectToMapTranformations = [
      {placeholder: 'agent', type: Agent },
      {placeholder: 'resourceSpecification', type: ResourceSpecification },
      {placeholder: 'processSpecification', type: ProcessSpecification },
      {placeholder: 'plan', type: Plan }
    ];

    const tempRoot = parallelObjects[0];
    console.log(parallelObjects);

    for( let {placeholder, type} of ObjectToMapTranformations) {
      if (tempRoot.hasOwnProperty(placeholder)) {
        this.root[placeholder] = objectEntriesToMap<typeof type>(tempRoot[placeholder]);
      }
    }
  }

}