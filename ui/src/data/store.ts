import ZomeApi from "../api/zomeApi";
import { getAppWs, setAgentPubKey, setCellId, setZomeApi } from '../hcWebsockets';
import { APP_ID } from '../holochainConf';
import { getZomeApi } from "../hcWebsockets";
import { RustNode, ThingInput } from "../types/holochain";
import { Guid } from "guid-typescript";
import { AgentShape, Agent, ProcessSpecificationShape, ProcessSpecification, ResourceSpecificationShape, ResourceSpecification, PlanShape, Plan, ProcessShape, Process } from "../types/valueflows";

/** 
 * Root interface, if we ever add more root level objects and indices, we'll need to
 * add them here.
 *
 * Elements in the root follow paths that correspond to their paths in the dht:
 *  * root.processSpecification.get('ps1')
 *  * root.plan.get('p1').process.get('pr1').committedInputs.get('c1');
 */
class Root {
  resourceSpecification: Map<Guid, ResourceSpecification>;
  processSpecification: Map<Guid, ProcessSpecification>;
  agent: Map<Guid, Agent>;
  plan: Map<Guid, Plan>;
  data: {};

  constructor() {
    this.resourceSpecification = new Map<Guid, ResourceSpecification>();
    this.processSpecification = new Map<Guid, ProcessSpecification>();
    this.agent = new Map<Guid, Agent>();
    this.plan = new Map<Guid, Plan>();
  }

  public toJSON(){
    return this.data;
  }
}

let dataStore: DataStore;

/**
 * Initialize our WS connection and set up the Zome API client
 */
async function initConnection(): Promise<ZomeApi> {
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
export default async function getDataStore(): Promise<DataStore> {
  if (dataStore == undefined) {
    const zomeApi = await initConnection();
    dataStore = new DataStore(zomeApi);
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
   * Builds and puts a ThingInput
   * @param path 
   * @param data 
   */
  protected async putThing(path: string, data: string) {
    const itemThing: ThingInput = {
      path: path,
      data: data
    };
    await this.zomeApi.put_thing(itemThing);
  }

  /**
   * Creates a root object
   */
  protected async createRoot() {
    await this.setRoot({});
  }

  public async setRoot(data: {}) {
    this.root.data = data;
    const json = JSON.stringify(this.root.data);
    console.log(json)
    await this.putThing('root', json);
  }

  public getProcessSpecification(id: Guid): ProcessSpecification {
    return this.root.processSpecification.get(id);
  }

  public getProcessSpecifications(): Array<ProcessSpecification> {
    return Array.from(this.root.processSpecification.values());
  }

  /**
   * Updates or adds a ProcessSpecification to our root and updates the DHT.
   * 
   * @param item 
   */
  public async setProcessSpecification(item: ProcessSpecification) {
    this.root.processSpecification.set(item.id, item);
    await this.putThing(
      item.path,
      JSON.stringify(item)
    );
  }

  public getResourceSpecification(id: Guid): ResourceSpecification {
    return this.root.resourceSpecification.get(id);
  }

  public getResourceSpecifications(): Array<ResourceSpecification> {
    return Array.from(this.root.resourceSpecification.values());
  }

  /**
   * Updates or adds a ResourceSpecification to our root and updates the DHT.
   * @param item 
   */
  public async setResourceSpecification(item: ResourceSpecification) {
    this.root.resourceSpecification.set(item.id, item);
    await this.putThing(
      item.path,
      JSON.stringify(item)
    );
  }

  public getAgent(id: Guid): Agent {
    return this.root.agent.get(id);
  }

  public getAgents(): Array<Agent> {
    return Array.from(this.root.agent.values());
  }

  /**
   * Updates or adds an Agent to our root and updates the DHT.
   * @param item 
   */
  public async setAgent(item: Agent) {
    this.root.agent.set(item.id, item);
    await this.putThing(
      item.path,
      JSON.stringify(item)
    );
  }

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
    await this.putThing(
      item.path,
      JSON.stringify(item)
    );
  }

  /**
   * Takes the data we receive in the following format and hydrates the data
   * structure with it:
   * const example = [
   *   { "idx": 0, "val": { "name": "root", "data": "{}" }, "parent": null, "children": [1, 6, 7, 9] },
   *   { "idx": 1, "val": { "name": "plan", "data": "" }, "parent": 0, "children": [2] },
   *   { "idx": 2, "val": { "name": "p1", "data": "{\"id\":\"p1\",\"name\":\"There is no plan B.\",\"created\":\"2022-04-16T02:05:48.695Z\"}" }, "parent": 1, "children": [3] },
   *   { "idx": 3, "val": { "name": "process", "data": "" }, "parent": 2, "children": [4] },
   *   { "idx": 4, "val": { "name": "p-426146548", "data": "{\"id\":\"p-426146548\",\"name\":\"Boil\",\"finished\":false,\"note\":\"\",\"classifiedAs\":\"\",\"inScopeOf\":\"\",\"basedOn\":\"\"}" }, "parent": 3, "children": [5] },
   *   { "idx": 5, "val": { "name": "meta", "data": "{\"position\":{\"x\":793.78125,\"y\":347}}" }, "parent": 4, "children": [] },
   *   { "idx": 6, "val": { "name": "agent", "data": "" }, "parent": 0, "children": [] },
   *   { "idx": 7, "val": { "name": "processSpecification", "data": "" }, "parent": 0, "children": [8] },
   *   { "idx": 8, "val": { "name": "ps-0001", "data": "{\"id\":\"ps-0001\",\"name\":\"Boil\",\"note\":\"Make it real hot\"}" }, "parent": 7, "children": [] },
   *   { "idx": 9, "val": { "name": "resourceSpecification", "data": "" }, "parent": 0, "children": [10] },
   *   { "idx": 10, "val": { "name": "rs-0001", "data": "{\"id\":\"rs-0001\",\"name\":\"Amaranth Seeds\",\"image\":\"\",\"resourceClassifiedAs\":\"\",\"defaultUnitOfResource\":\"\",\"defaultUnitOfEffort\":\"\",\"note\":\"\"}" }, "parent": 9, "children": [] }
   * ];
   * 
   * Since we know what our tree is going to look like ahead of time, we can make
   * some assumptions.
   * 
   * TODO: Right now, there's no way to refresh a particular node from the DHT
   * without fetching the whole tree structure again, we should remedy that.
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
      let deserializedObject: Object = new Object();

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

    const tempRoot = parallelObjects[0];
    console.log(parallelObjects);

    // Take the references we have for each placholder in the temp root and place them in their respective indices 
    placeholders.forEach((placeholder) => {
      let entries = [];
      // Make sure the objects were transforming exist
      if (tempRoot.hasOwnProperty(placeholder)) {
        switch (placeholder) {
          case 'agent': {
            entries = Object.entries(tempRoot[placeholder]).map((value): [Guid, Agent] => {
              return [Guid.parse(value[0]), value[1] as Agent];
            })
            this.root[placeholder] = new Map<Guid, Agent>(entries);
            break;
          }
          case 'resourceSpecification': {
            entries = Object.entries(tempRoot[placeholder]).map((value): [Guid, ResourceSpecification] => {
              return [Guid.parse(value[0]), value[1] as ResourceSpecification];
            })
            this.root[placeholder] = new Map<Guid, ResourceSpecification>(entries);
            break;
          }
          case 'processSpecification': {
            entries = Object.entries(tempRoot[placeholder]).map((value): [Guid, ProcessSpecification] => {
              return [Guid.parse(value[0]), value[1] as ProcessSpecification];
            })
            this.root[placeholder] = new Map<Guid, ProcessSpecification>(entries);
            break;
          }
          case 'plan': {
            entries = Object.entries(tempRoot[placeholder]).map((value): [Guid, Plan] => {
              return [Guid.parse(value[0]), value[1] as Plan];
            })
            this.root[placeholder] = new Map<Guid, Plan>(entries);
            break;
          }
          default: {
            throw new Error("Unkown placeholder type. Please add a case to handle a new index.");
          }
        }
      }
    });
  }

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
}