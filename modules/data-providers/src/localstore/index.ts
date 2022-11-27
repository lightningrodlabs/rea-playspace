import { DataProvider } from "../index";
import { Constructor, BreadthFirstTraversal, TraversePath, NOP } from "typed-object-tweezers";
import { WithPath, TreeDefinition, constructTreeAtPath } from "../WithPath";


export class LocalstoreProvider implements DataProvider {

  protected treeDefinition: TreeDefinition;
  protected modelKinds: Record<string, Constructor>;
  protected storageKey: string = 'REAPLAYSPACESTORE';

  /**
   * Initialize class
   */
  constructor(treeDefinition: TreeDefinition, modelKinds: Record<string, Constructor>) {
    this.treeDefinition = treeDefinition;
    this.modelKinds = modelKinds;
  }

  /**
   * Fetches a model and its descendents given it's path
   */
   public fetch (path: string): Promise<WithPath> {
    // Outer promise that returns the data
    return new Promise<WithPath>((data_resolve) => {
      const tree = this.constructTree(this.getTreeIndex(), path);
      data_resolve(tree);
    });
  }

  /**
   * Persist a single PathedData object
   */
  public put (item: WithPath) {
    window.localStorage.setItem(item.path, JSON.stringify(item));
  }

  /**
   * Persist an array of PathedData objects
   */
  public putAll (items: WithPath[]) {
    items.map((item) => this.put(item));
  }

  /**
   * Deletes thing corresponding to the passed path
   */
  public delete (path: string) {
    window.localStorage.removeItem(path);
  }

  /**
   * Construct a tree using the local store treeIndex
   */
  public constructTree (treeIndex: {}, startPath: string = ''): {} {
    const tree = {};
    BreadthFirstTraversal(treeIndex, startPath, (node, key, path) => {
      const data = node;
      const name = key;
      constructTreeAtPath(tree, node, key, path, this.treeDefinition, this.modelKinds);
    });
    // Return the tree
    return tree;
  }

  /**
   * Serializes a tree into the localstore format, which can coincidentally be
   * used for writing things to a file for reimporting later.
   *
   * XXX: This actually could be made more efficient by using the same traversal on
   * the second tree as is used on the primary tree, but that would mean writing
   * a second version or a more general traversal that works across n trees at
   * thesame time.
   */
  public serializeTree<T>(tree: T): string {
    const store = {};
    BreadthFirstTraversal(tree, '', (node, key, path) => {
      TraversePath(
        store,
        path,
        NOP,
        function noObject (cursor, slug) {
          cursor[slug] = JSON.parse(JSON.stringify(node));
        }
      );
    });
    return JSON.stringify(store);
  }

  public getTreeIndex(): {} {
    return JSON.parse(window.localStorage.getItem(this.storageKey));
  }

  /**
   * Saves a tree and it's index to the localstore
   */
  public saveTree<T>(tree: T) {
    const store = this.serializeTree(tree);
    window.localStorage.setItem(this.storageKey, store);
  }

  /**
   * Deletes the whole tree
   */
  public deleteTree<T>() {
    window.localStorage.removeItem(this.storageKey);
  }
}
