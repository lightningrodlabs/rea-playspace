import { DataProvider, Pathed, PathFunctor, TreeDefinition } from "data-providers";
import { assignFields, Constructor } from "typed-object-tweezers";
import { TreeStoreWithIndex } from "./TreeIndex";
import { TreeState } from "./TreeStore";

/**
 * Mixin to create a TreeStore with an index of paths by object id
 */
export class IndexedTreeWithProviders<RootKey extends string, R> extends TreeStoreWithIndex<RootKey, R> {
  protected providers: Record<string, DataProvider>;
  protected defaultProvider: string;

  constructor(
    initTreeState: TreeState<RootKey, R>,
    treeDefinition?: TreeDefinition,
    modelKinds?: Record<string, Constructor>,
    defaultProvider: string = 'localstore'
  ) {
    super(initTreeState, treeDefinition, modelKinds);
    this.providers = {};
    this.defaultProvider = defaultProvider
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
   * 
   * Alternatively, we can use the tree definition to specify on a case by case
   * basis which provider should be used for each object type.
   */
  public getProvider(path: string) {
    return this.providers[this.defaultProvider];
  }

  /**
   * Fetches an object by path
   */
  public async fetch<T>(path: string): Promise<Pathed<T>> {
    const provider = this.getProvider(path);
    const item = await provider.fetch(path);
    this.setLocal(item);

    // Return the item
    return item;
  }

  /**
   * Fetches all of the entries under a particular path
   */
  public async fetchAll<T>(path: string): Promise<Pathed<T>[]> {
    const provider = this.getProvider(path);
    return Object.values(provider.fetch(path));
  }

  /**
   * Sets or updates a S item in the tree and persists it
   */
  public set<T>(item: Pathed<T>) {
    this.setLocal(item);

    // Persist
    const provider = this.getProvider(item.path);
    provider.put(item);
  }

  /**
   * Generic function for upserting a S object. Will always replace the object.
   *
   * Example usage:
   * const newCommitment = upsert(commitmentUpdates, Commitment);
   */
  public upsert<U> (updates: Pathed<U>, constructor: Constructor<U>): Pathed<U> {
    const obj: U = new constructor(updates);
    assignFields<U, U>(updates, obj);
    const pathedObj = PathFunctor(obj, updates.path);
    this.set(pathedObj);
    return obj;
  }

  /**
   * Deletes the given path from both local and the DHT
   */
  public delete(path: string) {
    this.deleteLocal(path);
    const provider = this.getProvider(path);
    provider.delete(path);
  }
}
