import ZomeApi from "../api/zomeApi";
import { getAppWs, setAgentPubKey, setCellId, setZomeApi } from '../hcWebsockets';
import { APP_ID } from '../holochainConf';
import { getZomeApi } from "../hcWebsockets";
import { RustNode, ThingInput } from "../types/holochain";
import {
  PathedData,
  Root,
  Agent,
  ProcessSpecification,
  ResourceSpecification,
  Plan,
  Process,
  DisplayNode,
  DisplayEdge,
  ObjectTransformations,
  RootShape
} from "../types/valueflows";
import { Path } from "react-router-dom";

let dataStore: DataStore;

/**
 * Initialize our WS connection and set up the Zome API client
 */
export async function initConnection(): Promise<void> {
  const appWs = await getAppWs();
  const app_info = await appWs.appInfo({ installed_app_id: APP_ID });
  const [_dnaHash, agentPubKey] = app_info.cell_data[0].cell_id;
  const zomeApi = new ZomeApi(appWs);
  setAgentPubKey(agentPubKey);
  setCellId(app_info.cell_data[0].cell_id);
  setZomeApi(zomeApi);
  dataStore = new DataStore();
  await dataStore.fetchOrCreateRoot();
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

  constructor() {
    this.zomeApi = getZomeApi();
    this.root = new Root();
  }

  public getCursor(path: string): any {
    const pathSlugs: Array<string> = path.split('.');
    const first: string = pathSlugs.shift();
    const traversed = [];
    let cursor = this.root;
    if (first != 'root') {
      throw new Error("Path is malformed. All paths should start with 'root'.");
    }
    traversed.push(first);
    for (let slug of pathSlugs) {
      if (Object.hasOwn(cursor, slug)) {
        cursor = cursor[slug];
        traversed.push(slug);
      } else {
        const tPath = traversed.join('.');
        throw new Error(`Could not find element '${slug}' in '${tPath}'.`)
      }
    }

    return cursor;
  }

  /**
   * Fetches a single terminal object given its full path and id.
   *
   * Limitations, this might not work right with certain objects, but
   * @param path
   * @returns
   */
  public async fetchSingle(path: string): Promise<PathedData> {
    const type = path.split('.').at(-2);
    const res = await this.zomeApi.get_thing(path);
    console.log('res', res);
    this.hydrateFromZome(res);
    return this.getCursor(path);
  }

  /**
   * Fetches all of the entries under a particular path
   * @param path
   * @returns
   */
  public async fetchAll(path: string): Promise<PathedData[]> {
    const type = path.split('.').at(-1);
    const res = await this.zomeApi.get_thing(path);
    this.hydrateFromZome(res);
    return Object.values(this.getCursor(path));
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
    try {
      await this.zomeApi.put_thing(itemThing);
    } catch (e) {
      console.log(e);
    }
  }

  /**
   * Stores and saves any PathedItem
   * @param item
   */
  public async set(item: PathedData) {
    this.getCursor(this.getParentPath(item.path))[item.id] = item;
    await this.put(item);
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
      const plan = new Plan({
        name: 'Default Plan Name'
      });
      await this.setRoot({planId: plan.id});
      await this.set(plan);
    } else  {
      // We have the data, lets hydrate it
      this.hydrateFromZome(res);
    }
  }

  /**
   * Sets the data on the root object
   * @param data
   */
  public async setRoot(data: Object) {
    this.root.data = data;
    await this.put(this.root);
  }

  public async getRoot() {
    return this.root.data
  }

  // Data helpers/transformers

  public getParentPath(path: string): string {
    return path.split('.').slice(0, -1).join('.');
  }

  public getLastPart(path: string): string {
    return path.split('.').at(-1);
  }

  protected getRustNodePath(idx: number, nodes: RustNode[]): string {
    const slugs: string[] = [];

    let name = nodes[idx].val.name;
    slugs.unshift(name);
    let parent = nodes[idx].parent;
    while (parent !== null) {
      slugs.unshift(nodes[parent].val.name);
      parent = nodes[parent].parent;
    }
    return slugs.join('.');
  }

  /**
   * Takes the data we receive from the Zome API and hydrates the root structure.
   *
   * NOTE: if a completely new datached object is created and we receive a signal
   * for it, this will throw an error when the cursor can reach the path. Either
   * we'll need to reorder messages to create the shortest paths first, or we'll
   * need to just fetch the whole tree from the root.
   *
   * @param res response from ZomeAPI
   */
  protected hydrateFromZome(res: RustNode[]) {

    // An array of parallel objects and references to deserilzed objects
    const parallelObjects = new Array<Object>();

    // Cycle through the result array and construct/deserialize the objects
    // The built up tree will be in parallelObjects[0] when done
    res.forEach((node: RustNode, i: number) => {
      const parent = node.parent;
      const {name, data} = node.val;
      const path = this.getRustNodePath(i, res);
      const parentPath = this.getParentPath(path);

      // Temporarily assign an empty object
      let deserializedObject: Object = {};

      // Deserialize if not an empty string (if this is a link in a path in the DHT)
      if (data != "") {
        deserializedObject = JSON.parse(data);
      }

      // Assign to the parallel objects array
      parallelObjects[i] = deserializedObject;
      if (parentPath !== "") {
        const parentCursor = this.getCursor(parentPath);
        const parentName = this.getLastPart(parentPath);
        if (parentName in ObjectTransformations) {
          const instance = ObjectTransformations[parentName](deserializedObject);
          parentCursor[name] = instance;
        } else {
          parentCursor[name] = deserializedObject;
        }
      } else {
        this.root.data = deserializedObject;
      }
    });
  }
}