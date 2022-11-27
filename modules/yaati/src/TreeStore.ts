/**
 * Yaati tree based data store
 * --------------------------
 * Yaati is a highly structured tree with lots of goodies on its branches. It is
 * a typed tree that has a common interface for each node.
 *
 * Yaati is the name of the Cherimoya tree in the Sierra Popoluca (Nuntajɨɨyi) language.
 * It has highly structured fruit:
 * https://en.wikipedia.org/wiki/Cherimoya#/media/File:Cherimoya_bottle_Cupisnique_pre-columbian_santiago.JPG
 */


/**
 * Need to split this out into at least two parts:
 *   - the core tree store and it's mutators
 *   - an aspect that composes into an indexed tree store
 *   - an aspect that provides the data provider capabilities
 *   - an aspect that provides the localstorage interface
 *
 * These can be mixins
 */
import { SubscriberList } from './SubscriberList';
import { GetPath, getLastPart, getParentPath } from "typed-object-tweezers";
import { SyncExternalStoreApi } from "store-adaptors";
import { Pathed } from "data-providers";
import { cloneDeep } from 'lodash';

/**
 * TreeState for the store and snapshots
 */
export type TreeState<RootKey extends string, T> = {
  [x in RootKey]: T;
};

/**
 * Callbacks
 */
export type SubscriberCallback = () => void;

/**
 * Main tree class - a data store should extend this class.
 */
export class TreeStore<RootKey extends string, R> implements SyncExternalStoreApi<TreeState<RootKey, R>> {

  protected treeState: TreeState<RootKey, R>;
  public subscribers: SubscriberList;


  constructor(
    initTreeState: TreeState<RootKey, R>
  ) {
    this.treeState = cloneDeep(initTreeState);
    this.subscribers = new SubscriberList();
  }

  /**
   * Allows users to subscribe to changes on a particular path.
   *
   * Defining the function this way ensures `this` is properly defined.
   */
  public subscribe = (callback: SubscriberCallback, path?: string): SubscriberCallback => {
    return this.subscribers.subscribe(callback, path);
  }

  /**
   * This function traverses up the tree and calls the dispatch on all the parent objects
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
   * This is used each time a change is made to the tree. It is also used for
   * when the React hook needs to determine when we need to re-render.
   *
   * XXX: this is an inefficient hack, we really should be updating the snapshot
   * everytime a fetch, put, or delete happens by shallow cloning the treeState
   * (so that React knows that the data structure has changed when it does com-
   * parisons) and actually doing something like a persistent data structure,
   * where only the modified parts of the tree are created anew. 
   */
  public createSnapshot(): TreeState<RootKey, R> {
    const tree = {};
    if (this.treeState) {
      return cloneDeep(this.treeState);
      /**
       * BreadthFirstTraversal(this.treeState, '', (node, key, path) => {
       * // Need to check if the object is in the contsructors in this.modelKinds if so, do this
       *   const object = buildModel(this.treeDefinition, this.modelKinds, path, node);
       *   const parentPath = getParentPath(path);
       *   const branch = GetPath(tree, parentPath);
       *   branch[key] = object;
       * // else shallow clone and continue, the children will be overwritten with a shallow clone of their own
       * });
       */
    }
    return tree as TreeState<RootKey, R>;
  }

  /**
   * This returns the one and only snapshot. This is for React to be able to have
   * referential equality between objects that haven't changed.
   *
   * Defining the function this way ensures `this` is properly defined.
   */
  public getSnapshot = (): TreeState<RootKey, R> => {
    return this.treeState;
  }

  /**
   * Returns the tree root
   */
  public getRoot(rootKey?: RootKey): R {
    return this.treeState[rootKey];
  }

  /**
   * Traverses down a path and returns a reference to the object specified by the path
   */
  public getCursor<T>(path: string): Pathed<T> {
    return GetPath(this.treeState, path);
  }

  /**
   * Sets or updates an item in the tree and persists it
   */
  public setLocal<T>(item: Pathed<T>) {
    this.treeState = this.createSnapshot();
    // This is necessary to make sure we are manipulating the correct reference
    const parentPath = getParentPath(item.path);
    const key = getLastPart(item.path);
    const branch = GetPath(this.treeState, parentPath);
    try {
      branch[key] = item;
    } catch (e) {
      console.warn(e);
    }
    // Dispatch changes
    this.dispatch(item.path);
  }

  /**
   * Deletes the given path in local memory
   */
   public deleteLocal(path: string) {
    this.treeState = this.createSnapshot();
    let parent = this.getCursor(getParentPath(path));
    const childKey = getLastPart(path);
    delete parent[childKey];
    // Dispatch changes
    this.dispatch(path);
   }
}
