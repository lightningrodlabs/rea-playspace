/**
 * Yati tree based data store
 * --------------------------
 * Yati is a highly structured tree with lots of goodies on its branches. It is
 * a typed tree that has a common interface for each node.
 *
 * Yaati is the name of the Cherimoya tree in the Siera Popoluca language.
 */

import { getAlmostLastPart, getLastPart, getParentPath, PathedData } from "./models/PathedData";
import { Root } from "./models/Application/Root";
import { HasIdDate } from "../types/valueflows";
import { assignFields, getPath, traverseTree } from "./utils";
import { constructFromObj, ModelBuilder, ModelConstructorMap } from "./models/ModelConstructors";
import { LocalstoreProvider } from "./DataProviders/local/localstore";

/**
 * Data provider interface
 */
export interface DataProvider {
  fetch(path: string): Promise<PathedData>;
  put(item: PathedData): void;
  delete(path: string): void;
}

/**
 * Callbacks
 */
export type YatiCb = () => void;

/**
 * Snapshots
 */
export type YatiSnapshot = { root: Root };

/**
 * API Singletons created for ease of interaction with React
 */
export type YatiReactApi = {
  subscribe: (cb: YatiCb ) => YatiCb;
  getSnapshot: () => YatiSnapshot;
};

/**
 * Path index store and helper functions
 */
export class YatiTreeIndex extends Map<string, string> {

  /**
   * Indexes all items in the tree (or subtree)
   */
  public indexTree(tree: PathedData) {
    traverseTree(
      tree,
      '',
      (path, obj: PathedData) => {
        const type = getAlmostLastPart(path);
        if (type && type != '' && type in ModelBuilder && typeof obj == 'object' && obj.id) {
          this.set(obj.id, path);
        }
      },
      (path, obj) => {}
    );
  }
}

/**
 * Implements a basic subscriber list and allows dispatching messages in a non-blocking way
 */
export class YatiSubscriberList extends Map<string, Array<YatiCb>> {

  /**
   * Subscribe to changes on a particular path
   */
  public subscribe(callback: YatiCb, path: string = 'root'): YatiCb {
    if (this.has(path)) {
      const subscribers = this.get(path);
      /**
       * This used to check to see if the value was already present in the array,
       * however, that was causing issues with React. Perhaps certain memoized
       * callback functions all have the same identity? I'll have to look into
       * this more later. The important thing is that it works.
       */
      subscribers.push(callback);
    } else {
      this.set(path, [callback]);
    }
    // Get the index of the last instance of the callback that we just added and
    // use it to remove it when the unsubscribe callback is called.
    const subscribers = this.get(path);
    const index = subscribers.lastIndexOf(callback);
    const self = this;
    return () => {
      if (index > 0) {
        self.set(path, subscribers.splice(index, 1));
      }
    }
  }

  /**
   * Dispatch a change to the subscribers
   */
  public dispatch(path: string) {
    if (this.has(path)) {
      console.info(`dispatching for ${path}`);
      const subscribers = this.get(path);
      subscribers.forEach(
        (callback) => {
          setTimeout(() => callback(), 0);
        }
      )
    }
  }
}

/**
 * Main tree class - a data store should extend this class.
 */
export class YatiTreeStore {

  protected root: Root;
  protected providers: Record<string, DataProvider>;
  protected pathIndex: YatiTreeIndex;
  public subscribers: YatiSubscriberList;
  protected reactAPI: YatiReactApi;
  protected snapshot: YatiSnapshot;

  constructor(providers?: Record<string, DataProvider>) {
    this.root = new Root();
    this.providers = providers? providers : {};
    this.pathIndex = new YatiTreeIndex();
    this.subscribers = new YatiSubscriberList();
    this.snapshot = this.createSnapshot();
  }

  /**
   * Add a provider to the store
   */
  public addProvider(key: string, provider: DataProvider) {
    if (this.providers[key]) {
      throw new Error(`Provider '${key}' already set.`);
    } else {
      this.providers[key] = provider;
    }
  }

  /**
   * Returns the correct provider given a path
   *
   * XXX: Doesn't do anything besides return the 'project' provider
   * Eventually, this will return different providers based on the path. For
   * instance, 'root', 'root.plan.*.displayNode', and 'root.plan.*.displayEdge'
   * all need to be on the 'project' provider, while the rest will be on the
   * 'hREA' provider.
   */
  public getProvider(path: string) {
    return this.providers['project'];
  }

  /**
   * Allows users to subscribe to changes on a particular path
   *
   * XXX: So I'm trying to think of a reason why we might might to allow more
   * flexible specifications of paths for subscriptions. I think the idea I had
   * around regexes is overkill. Does it make sense to subscribe to a synthesized
   * array of 'root.plan.*.process.*'? I'm leanning towards no, but this could be
   * powerful.
   */
  public subscribe(callback: YatiCb, path?: string): YatiCb {
    return this.subscribers.subscribe(callback, path);
  }

  /**
   * This function traverses up the tree and calls the dispatch on all the parent objects
   * XXX: Might this be in the wrong order? Need to descend into the tree instead of ascend from child?
   */
  private dispatch(path: string) {
    let currPath = path;
    while (currPath.split('').length > 0) {
      this.subscribers.dispatch(currPath);
      currPath = getParentPath(currPath);
    }
  }

  /**
   * This creates a snapshot in time of the tree.
   *
   * This is used each timea change is made to the tree. It is also used for when
   * the React hook needs to determine when we need to re-render.
   */
  public createSnapshot(): YatiSnapshot {
    const tree = {
      root: new Root(this.root.toJSON())
    };
    traverseTree(
      { root: this.root },
      'root',
      (path, obj: PathedData & { toJSON(): () => {}}) => {
        const type = getAlmostLastPart(path);
        const name = getLastPart(path);
        if ((type && type in ModelBuilder && type != 'root') || name === 'root') {
          const PDO = constructFromObj(type, name, obj.toJSON());
          const parentPath = getParentPath(path);
          const parent = getPath(tree, parentPath);
          parent[name] = PDO;
        }
      },
      (path, obj) => {}
    );
    return tree;
  }

  /**
   * This returns the one and only snapshot. This is for React to be able to have
   * referential equality between objects that haven't changed.
   */
  public getSnapshot(): YatiSnapshot {
    if (this.snapshot) {
      return this.snapshot;
    } else {
      this.snapshot = this.createSnapshot();
      return this.snapshot;
    }
  }

  /**
   * This returns the React API convenience singleton.
   */
  public getReactApi(): YatiReactApi {
    if (this.reactAPI) {
      return this.reactAPI;
    } else {
      const self = this;
      this.reactAPI = {
        subscribe: (cb: YatiCb) => self.subscribe(cb, 'root'),
        getSnapshot: () => self.getSnapshot()
      }
      return this.reactAPI;
    }
  }

  /**
   * Returns the tree root
   */
  public getRoot(): Root {
    return this.root;
  }

  /**
   * Traverses down a path and returns a reference to the object specified by the path
   */
  public getCursor(path: string): any {
    return getPath(this.root, path, true, true);
  }

  /**
   * Look up path by id
   */
  public lookUpPath(id: string): string {
    return this.pathIndex.get(id);
  }

  /**
   * Looks up an object by id
   */
  public getById(id: string): any {
    return this.getCursor(this.lookUpPath(id));
  }

  /**
   * Fetches an object by path
   */
  public async fetch(path: string) {
    const provider = this.getProvider(path);
    const item = await provider.fetch(path)
    this.setLocal(item);

    // Return the item
    return item;
  }

  /**
   * Fetches all of the entries under a particular path
   */
  public async fetchAll(path: string): Promise<PathedData[]> {
    const provider = this.getProvider(path);
    return Object.values(provider.fetch(path));
  }

  /**
   * Sets or updates a PathedData item in the tree and persists it
   */
  public setLocal(item: PathedData) {
    if (item.path == 'root') {
      this.root = item as Root;
      this.pathIndex.indexTree({
        root: this.root,
        path: ''
      } as PathedData);
    } else {
      // This is necessary to make sure we are manipulating the correct reference
      const parentPath = getParentPath(item.path);
      const parent = this.getCursor(parentPath);
      try {
        parent[item.id] = item;
      } catch (e) {
        console.warn(e);
      }
    }

    // Update the path index
    this.pathIndex.set(item.id, item.path);

    // Snapshot
    this.snapshot = this.createSnapshot();

    // Dispatch changes
    this.dispatch(item.path);
  }

  /**
   * Sets or updates a PathedData item in the tree and persists it
   */
  public set(item: PathedData) {
    this.setLocal(item);

    // Persist
    const provider = this.getProvider(item.path);
    provider.put(item);
  }

  /**
   * Generic function for upserting a PathedData object. Will always replace the object.
   *
   * Example usage:
   * const newCommitment = upsert<CommitmentShape, Commitment>(commitmentUpdates, Commitment);
   */
   public upsert<T extends HasIdDate, U extends PathedData> (updates: T, constructor: {new (init: any): U}): U {
    const obj: U = new constructor(updates);
    assignFields<T, U>(
      updates,
      obj
    );
    this.set(obj);
    return obj;
  }

  /**
   * Deletes the given path in local memory
   */
   public deleteLocal(path: string) {

    let parent = this.getCursor(getParentPath(path));
    const childKey = getLastPart(path);
    delete parent[childKey];
  
    // Snapshot
    this.snapshot = this.createSnapshot();

    // Dispatch changes
    this.dispatch(path);
   }

  /**
   * Deletes the given path from both local and the DHT
   */
  public delete(path: string) {
    this.deleteLocal(path);
    const provider = this.getProvider(path);
    provider.delete(path);
  }

  // Root helpers

  /**
   * Stores the whole tree
   */
  public async saveLocalTree() {
    const localstore = this.providers['localstore'] as LocalstoreProvider;
    localstore.saveTree(this);
  }

  /**
   * Throw away the tree stored in local store
   */
  public deleteLocalTree() {
    const localstore = this.providers['localstore'] as LocalstoreProvider;
    localstore.deleteTree();
  }

  /**
   * Fetches the version of the tree stored in the local store
   */
  public fetchLocalTree() {
    const localstore = this.providers['localstore'];
    localstore.fetch('root').then((root) => {
      this.root = root as Root;
      this.pathIndex.indexTree({
        root: this.root,
        path: ''
      } as PathedData);
    });
  }

  /**
   * Persists the entire tree, using the pathIndex as the reference
   */
  public saveInMemoryTree() {
    const self = this;
    traverseTree(
      {root: this.root},
      '',
      (path, obj: PathedData) => {
        if (obj.id) {
          this.set(obj);
        }
      },
      (path, obj) => {}
    );
  }

}
