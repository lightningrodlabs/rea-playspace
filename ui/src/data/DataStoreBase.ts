import ZomeApi from "../api/zomeApi";
import { getZomeApi } from "../hcWebsockets";
import { RustNode, ThingInput } from "../types/holochain";
import { getLastPart, getParentPath, getRustNodePath, PathedData } from "./models/PathedData";
import { ObjectTransformations } from "./models/ObjectTransformations";
import { Root, RootShape } from "./models/Application/Root";
import { Action, Fiber } from "../lib/fiber";

/**
 * Data store object
 */

export class DataStoreBase {

  protected zomeApi: ZomeApi;
  protected fiber: Fiber<void>;
  protected root: Root;
  protected pathIndex: Map<string, string>;

  constructor() {
    this.zomeApi = getZomeApi();
    this.fiber = new Fiber<void>();
    this.root = new Root();
    this.pathIndex = new Map<string, string>();
  }

  /**
   * Traverses down a path and returns a reference to the object specified by the path.
   * @param path
   * @returns
   */
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
        throw new Error(`Could not find element '${slug}' in '${tPath}'.`);
      }
    }
    return cursor;
  }

  /**
   * Look up path by id.
   */
  public lookUpPath(id: string): string {
    return this.pathIndex.get(id);
  }

  /**
   * Looks up an object by id.
   */
  public getById(id: string): any {
    return this.getCursor(this.lookUpPath(id));
  }

  /**
   * Fetches a single terminal object given its full path and id.
   *
   * TODO: Should we schedule these for execution after all updates have been made?
   *
   * @param path
   * @returns
   */
  public async fetch(path: string): Promise<PathedData> {
    const res = await this.zomeApi.get_thing(path);
    this.hydrateFromZome(res);
    return this.getCursor(path);
  }

  /**
   * Fetches all of the entries under a particular path
   *
   * TODO: Should we schedule these for execution after all updates have been made?
   *
   * @param path
   * @returns
   */
  public async fetchAll(path: string): Promise<PathedData[]> {
    const res = await this.zomeApi.get_thing(path);
    this.hydrateFromZome(res);
    return Object.values(this.getCursor(path));
  }

  /**
   * Higher-order function returning an async function which stores the item passed in
   */
  private putAction = (item: PathedData): Action<void> => {
    const itemThing: ThingInput = {
      path: item.path,
      data: JSON.stringify(item)
    };
    return async () => {
      await this.zomeApi.put_thing(itemThing);
      return;
    }
  }

  /**
   * Persist a PathedData object
   * @param item
   */
  public put(item: PathedData) {
    this.fiber.schedule([
      this.putAction(item)
    ]);
  }

  /**
   * Persist an array of PathedData objects
   */
  public putAll(items: PathedData[]) {
    this.fiber.schedule(
      items.map((item) => this.putAction(item))
    );
  }

  /**
   * Sets or updates a PathedData item in the tree and persists it
   * @param item
   */
  public set(item: PathedData) {
    // This is necessary to make sure we are manipulating the correct reference
    this.getCursor(getParentPath(item.path))[item.id] = item;
    // Update the path index
    this.pathIndex.set(item.id, item.path);
    // Persist to DHT
    this.put(item);
  }

  /**
   * Persists the entire tree, using the pathIndex as the reference
   */
  public saveTree() {
    const self = this;
    // Store everything in the order it was added to the path index (which should be from shortest to longest path)
    this.fiber.schedule(
      Array.from(this.pathIndex.values()).map(
        (path) => {
          console.log(path);
          try {
            const item = self.getCursor(path);
            return self.putAction(item);
          } catch (e) {
            console.log('Path not found in tree store');
            return (async () => {});
          }
        }
      )
    );
    this.put(self.root);
  }

  /**
  * Deletes thing corresponding to the path 
  * @param path
  */
  public delete(path: string) {
    this.fiber.schedule([
      () => this.zomeApi.delete_thing(path)
    ]);
  }

  // Root helpers

  /**
   * Checks to see if we have anything in our DHT and chain, if not sets it up.
   * Any applications should override this.
   */
  public async fetchOrCreateRoot() {
    // check if root object exists
    const res = await this.zomeApi.get_thing('root');
    if (res[0].val.data === '') {
      // if it doesn't, create it and a placeholder plan
      console.log('root does not exist. creating...');
      this.put(this.root);
    } else {
      // We have the data, lets hydrate it
      this.hydrateFromZome(res);
    }
  }

  public async saveLocalRoot() {
    const res = await this.zomeApi.get_thing('root');
    if ((res as []).length > 3) {
      window.localStorage.setItem('root', JSON.stringify(res));
    } else {
      throw new Error('Cowardly refusing to save.');
    }
  }

  public deleteLocalRoot() {
    window.localStorage.removeItem('root');
  }

  public fetchLocalRoot() {
    const local_json = window.localStorage.getItem('root');
    if (local_json != null) {
      const res = JSON.parse(window.localStorage.getItem('root'));
      this.hydrateFromZome(res);
    }
  }

  // Data helpers/transformers

  /**
   * Takes the data we receive from the Zome API and hydrates the root structure.
   *
   * NOTE: if a completely new detached object is created and we receive a signal
   * for it, this will throw an error when the cursor can't reach the path. Either
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
      const { name, data } = node.val;
      console.log(data);
      const path = getRustNodePath(i, res);
      const parentPath = getParentPath(path);

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
        const parentName = getLastPart(parentPath);
        if (parentName in ObjectTransformations) {
          // Transform object into a class instance
          const instance = ObjectTransformations[parentName](deserializedObject);
          // Place the class instance on the parent indexed by id
          parentCursor[name] = instance;
          // Place the path of the object in the index (by id)
          this.pathIndex.set(instance.id, instance.path);
        } else {
          // We have a plan container object with no class
          parentCursor[name] = deserializedObject;
        }
      } else {
        // It's the Root!
        this.root = new Root(deserializedObject as RootShape);
      }
    });
  }
}
