import ZomeApi from "../api/zomeApi";
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
interface Root {
  resourceSpecification: Map<Guid, ResourceSpecification>,
  processSpecification: Map<Guid, ProcessSpecification>,
  agent: Map<Guid, Agent>,
  plan: Map<Guid, Plan>,
}

function makeRoot(): Root {
  return {
    resourceSpecification: new Map<Guid, ResourceSpecification>(),
    processSpecification: new Map<Guid, ProcessSpecification>(),
    agent: new Map<Guid, Agent>(),
    plan: new Map<Guid, Plan>()
  }
}

/**
 * Data store object
 */
export default class DataStore {

  private zomeApi: ZomeApi;
  private root: Root;
  
  constructor(zomeApi?: ZomeApi) {
    this.zomeApi = zomeApi ? zomeApi : getZomeApi();
    this.root = makeRoot();
  }

  protected async putThing(path: string, data: string) {
    const itemThing: ThingInput = {
      path: path,
      data: data
    };
    await this.zomeApi.put_thing(itemThing);
  }

  protected async createRoot() {
    await this.putThing('root', JSON.stringify({}));
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
      `root.resourceSpecification.${item.id.toString()}`,
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
      `root.agent.${item.id}`,
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
   * TODO: If this plan object has all of of its child objects, currently this
   * will save everything including those child objects which should be split off
   * into other objects. This can be fixed in several ways:
   * 1) Make classes that make sure only the right fields should be serialized.
   * 2) Make things all be in flat indices under the root, except for meta data
   *    and also 1) with regard to meta.
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
   * TODO: One other reason to switch to a flat structure is just because having
   * this tree at the data layer doesn't really help us, it only seems to add a
   * layer of complexity since everything has to be referenced from the path to
   * the object. It also makes the path itself be dependent on the IDs of the the
   * containing node, it might be nicer if the objects could update themselves
   * without their parent being involved.
   * 
   * TODO: Right now, there's no way to refresh a particular node from the DHT
   * without fetching the whole tree structure again, we should remedy that.
   * 
   * @param res response from ZomeAPI
   */
  protected hydrateFromZome(res: RustNode[]) {
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

    // Take the references we have for each placholder in the temp root and place them in their respective indices 
    placeholders.forEach((placeholder) => {
      let entries = [];
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
      await this.createRoot();
      await this.setPlan({
        id: Guid.create(),
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