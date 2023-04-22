import { DataProvider } from "../index"
import {
  Constructor,
  BreadthFirstTraversal,
  TraversePath,
  NOP,
  getParentPath,
  GetPath,
  getLastPart
} from "typed-object-tweezers"
import {
  WithPath,
  TreeDefinition,
  constructTreeAtPath,
  Pathed,
  PathFunctor,
  ModelKinds
} from "../WithPath"

export class LocalstoreProvider implements DataProvider {

  protected treeDefinition: TreeDefinition
  protected modelKinds: ModelKinds
  protected storageKey = 'REAPLAYSPACESTORE'

  /**
   * Initialize class
   */
  constructor(
    treeDefinition: TreeDefinition,
    modelKinds: Record<string, Constructor>
  ) {
    this.treeDefinition = treeDefinition
    this.modelKinds = modelKinds
  }

  /**
   * Fetches a model and its descendents given it's path
   */
   public fetch<T> (path: string): Promise<Pathed<T>> {
    // Outer promise that returns the data
    return new Promise<Pathed<T>>((data_resolve) => {
      const tree = this.parseTree<T>(this.getTreeIndex(), path)
      data_resolve(PathFunctor(tree, path));
    })
  }

  /**
   * Persist a single PathedData object
   */
  public put (item: WithPath) {
    const tree = this.parseTree(this.getTreeIndex())
    const parent = getParentPath(item.path)
    const itemSlug = getLastPart(item.path)
    const cursor = GetPath(tree, parent)
    cursor[itemSlug] = item
    this.saveTree(tree)
  }

  /**
   * Persist an array of PathedData objects
   */
  public putAll (items: WithPath[]) {
    items.map((item) => this.put(item))
  }

  /**
   * Deletes thing corresponding to the passed path
   */
  public delete (path: string) {
    const tree = this.parseTree(this.getTreeIndex())
    const parent = getParentPath(path)
    const itemSlug = getLastPart(path)
    const cursor = GetPath(tree, parent)
    delete cursor[itemSlug]
    this.saveTree(tree)
  }

  /**
   * Construct a tree using the local store treeIndex
   */
  public parseTree<T> (treeIndex: object, startPath = ''): T {
    const tree = PathFunctor({} as T, startPath);
    // Getting the parent path to make sure we start building the tree from the
    // right place. This make it equivalent to the path traversal in the Project
    // provider.
    const parentPath = getParentPath(startPath);
    BreadthFirstTraversal(treeIndex, parentPath, (node, key, path) => {
      constructTreeAtPath<any>(tree, node, key, path, this.treeDefinition, this.modelKinds)
    })
    // Return the tree starting at the path requested
    return (startPath === '') ? tree : tree[startPath]
  }

  /**
   * Serializes a tree into the localstore format, which can coincidentally be
   * used for writing things to a file for reimporting later.
   *
   * XXX: This actually could be made more efficient by using the same traversal on
   * the second tree as is used on the primary tree, but that would mean writing
   * a second version or a more general traversal that works across n trees at
   * the same time.
   */
  public serializeTree<T>(tree: T): string {
    const store = {};
    BreadthFirstTraversal(tree, '', (node, key, path) => {
      TraversePath(
        store,
        path,
        NOP,
        function noObject (cursor, slug) {
          cursor[slug] = JSON.parse(JSON.stringify(node))
        }
      );
    });
    return JSON.stringify(store)
  }

  public getTreeIndex(): object {
    return JSON.parse(window.localStorage.getItem(this.storageKey))
  }

  /**
   * Saves a tree and it's index to the localstore
   */
  public saveTree<T>(tree: T) {
    const store = this.serializeTree(tree)
    window.localStorage.setItem(this.storageKey, store)
  }

  /**
   * Deletes the whole tree
   */
  public deleteTree() {
    window.localStorage.removeItem(this.storageKey)
  }
}
