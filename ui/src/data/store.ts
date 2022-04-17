import ZomeApi from "../api/zomeApi";
import { getZomeApi } from "../hcWebsockets";
import { RustNode, ThingInput } from "../types/holochain";
import { Agent, ProcessSpecification, ResourceSpecification, Plan, Process } from "../types/valueflows";

/* 

Elements in the root follow paths that correspond to their paths in the dht:
 * root.processSpecification.get('ps1')
 * root.plan.get('p1').process.get('pr1').committedInputs.get('c1');

*/
class Root {
  public resourceSpecification: Map<string, ResourceSpecification>;
  public processSpecification: Map<string, ProcessSpecification>;
  public agent: Map<string, Agent>;
  public plan: Map<string, Plan>;

  constructor() {
    this.resourceSpecification = new Map<string, ResourceSpecification>();
    this.processSpecification = new Map<string, ProcessSpecification>();
    this.agent = new Map<string, Agent>();
    this.plan = new Map<string, Plan>();
  }
}

export default class DataStore {

  private zomeApi: ZomeApi;
  private root: Root;
  
  constructor(zomeApi?: ZomeApi) {
    this.zomeApi = zomeApi ? zomeApi : getZomeApi();
    this.root = new Root();
  }

  protected async putThing(path: string, data: string) {
    const itemThing: ThingInput = {
      path: path,
      data: data
    };
    await this.zomeApi.put_thing(itemThing);
  }

  protected async createRoot() {
    const root = {}
      const rootInput: ThingInput = {
        path: 'root',
        data: JSON.stringify(root)
      }
      await this.zomeApi.put_thing(rootInput);
  }

  public getProcessSpecification(id: string): ProcessSpecification {
    return this.root.processSpecification.get(id);
  }

  public getProcessSpecifications(): Array<ProcessSpecification> {
    return Array.from(this.root.processSpecification.values());
  }

  /**
   * Updates or adds a ProcessSpecification to our root and updates the DHT.
   * 
   * TODO:
   * All of the following set* methods can be replaced with one method iff we
   * convert our types to objects that know their own paths and have a method
   * that returns a ThingInput. It also would let us have objects that basically
   * know how to update themselves.
   * 
   * @param item 
   */
  public async setProcessSpecification(item: ProcessSpecification) {
    this.root.processSpecification.set(item.id, item);
    await this.putThing(
      `root.processSpecification.${item.id}`,
      JSON.stringify(item)
    );
  }

  public getResourceSpecification(id: string): ResourceSpecification {
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
      `root.resourceSpecification.${item.id}`,
      JSON.stringify(item)
    );
  }

  public getAgent(id: string): Agent {
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
      `root.agent.${item.id}`,
      JSON.stringify(item)
    );
  }

  public getPlan(id: string): Plan {
    return this.root.plan.get(id);
  }

  public getPlans(): Array<Plan> {
    return Array.from(this.root.plan.values());
  }

  /**
   * Updates or adds a Plan to our root and updates the DHT.
   * @param item 
   */
  public async setPlan(item: Plan) {
    this.root.plan.set(item.id, item);
    await this.putThing(
      `root.plan.${item.id}`,
      JSON.stringify(item)
    );
  }

  /**
   * Takes the data we receive in the following format and hydrates the data structure with it:
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
   * Since we know what our tree is going to look like ahead of time, we can make some assumptions.
   * 
   * @param res response from ZomeAPI
   */
  protected hydrateFromZome(res: RustNode[]) {
    res.forEach((node: RustNode, i: number) => {
      const parent = node.parent;
      const {name, data} = node.val;

      if(parent !== null && data != '') {
        const klass = res[parent].val.name;
        switch (klass) {
          case 'agent': {
            this.root.agent.set(name, JSON.parse(data) as Agent);
            break;
          }
          case 'processSpecification': {
            this.root.processSpecification.set(name, JSON.parse(data) as ProcessSpecification);
            break;
          }
          case 'resourceSpecification': {
            this.root.resourceSpecification.set(name, JSON.parse(data) as ResourceSpecification);
            break;
          }
          case 'plan': {
            this.root.plan.set(name, JSON.parse(data) as Plan);
            break;
          }
          case 'process': {
            const process: Process = JSON.parse(data) as Process;
            const plan_id: string = process.plannedWithin;
            if (plan_id !== undefined) {
              const plan = this.root.plan.get(plan_id);
              if (!('processes' in plan)){
                plan.processes = new Map<string, Process>();
              }
              const processes = plan.processes.set(name, process);
            }
            break;
          }
        }
      }
    });
  }

  /**
   * Checks to see if we have anything in our DHT and chain, if not sets it up.
   */
  public async getOrCreateRoot() {
    // check if root object exists
    const res = await this.zomeApi.get_thing('root');
    if (res[0].val.data === '') {
      // if it doesn't, create it and a placeholder plan
      console.log('root does not exist. creating...');
      await this.createRoot();
      await this.setPlan({
        id: 'p1',
        name: 'There is no plan B.',
        created: new Date()
      });
    } else  {
      // We Have the data, lets hydrate it
      this.hydrateFromZome(res);
      console.log('root', this.root);
    }
  }
}