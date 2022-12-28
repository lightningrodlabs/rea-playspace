import { Pathed, TreeDefinition } from "data-providers";
import { BreadthFirstTraversal, Constructor, getAlmostLastPart } from "typed-object-tweezers";
import { TreeState, TreeStore } from "./TreeStore";

/**
 * Path index store and helper functions
 */
export class TreeIndex<RootKey extends string, T> extends Map<string, string> {

  protected treeDefinition: TreeDefinition;
  protected modelKinds: Record<string, Constructor>;

  /**
   * Initialize class
   */
  constructor(treeDefinition: TreeDefinition, modelKinds: Record<string, Constructor>) {
    super();
    this.treeDefinition = treeDefinition;
    this.modelKinds = modelKinds;
  }

  /**
   * Indexes all items in the tree (or subtree)
   */
  public indexTree(treeState: TreeState<RootKey, T>) {
    this.clear();
    BreadthFirstTraversal(
      treeState,
      '',
      (obj: any, key, path) => {
        const kind = getAlmostLastPart(path);
        if (kind && kind != '' && kind in this.modelKinds && typeof obj == 'object' && obj.id) {
          this.set(obj.id, path);
        }
      }
    );
  }
}

/**
 * Extends TreeStore to have a TreeIndex for fast lookup
 */
export class TreeStoreWithIndex<RootKey extends string, R> extends TreeStore<RootKey, R> {
  public pathIndex: TreeIndex<RootKey, R>;
  protected treeDefinition: TreeDefinition;
  protected modelKinds: Record<string, Constructor>;

  constructor(
    initTreeState: TreeState<RootKey, R>,
    treeDefinition?: TreeDefinition,
    modelKinds?: Record<string, Constructor>
  ) {
    super(initTreeState);
    this.treeDefinition = treeDefinition;
    this.modelKinds = modelKinds;
    this.pathIndex = new TreeIndex(this.treeDefinition, this.modelKinds);
    this.pathIndex.indexTree(this.treeState);
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
  public getById<T>(id: string): Pathed<T> {
    return this.getCursor(this.lookUpPath(id));
  }

  /**
   * Sets or updates an item in the tree and persists it
   */
  public setLocal<T>(item: Pathed<T>) {
    super.setLocal<T>(item);
    // Update the path index
    this.pathIndex.indexTree(this.treeState);
  }

  /**
   * Deletes an item in the tree
   */
  public deleteLocal(path: string) {
    super.deleteLocal(path);
    // Update the path index
    this.pathIndex.indexTree(this.treeState);
  }
}

