import { getAlmostLastPart, getLastPart, PathedData } from "../../models/PathedData";
import { DataProvider } from "../../YatiTreeStore";
import { constructFromJSON, ModelBuilder } from "../../models/ModelConstructors";
import { getPath, traversePath, traverseTree } from "../../utils";

export class LocalstoreProvider implements DataProvider {

  /**
   * Main non-async function for fetching an object with specific path
   */
  private fetchKernel (path: string): PathedData {
    const data = window.localStorage.getItem(path);
    const name = getLastPart(path);
    const type = getAlmostLastPart(path);
    const PDO = constructFromJSON(type, name, data);
    return PDO;
  }

  /**
   * Fetches a model and its descendents given it's path
   */
   public fetch (path: string): Promise<PathedData> {
    // Outer promise that returns the data
    return new Promise<PathedData>((data_resolve) => {
      const tree = this.constructTree(this.getTreeIndex(), path);
      data_resolve(tree);
    });
  }

  /**
   * Persist a single PathedData object
   */
  public put (item: PathedData) {
    window.localStorage.setItem(item.path, JSON.stringify(item));
  }

  /**
   * Persist an array of PathedData objects
   */
  public putAll (items: PathedData[]) {
    items.map((item) => this.put(item))
  }

  /**
   * Deletes thing corresponding to the passed path
   */
  public delete (path: string) {
    window.localStorage.removeItem(path);
  }

  /**
   * Construct a tree recursively using the local store treeIndex
   */
  public constructTree(treeIndex: {}, startPath: string, oldPath: string = '') {
    // Compute the full path from all fragments
    const completePath = oldPath != '' ? `${oldPath}.${startPath}`: startPath;

    // Fetch the object corresponding to the path
    const constructedTree = this.fetchKernel(completePath);

    // This is the equivalent of getCursor, but on a tree of {}
    const newTreeIndex = getPath(treeIndex, startPath);

    // Get the children recursively
    const props = Reflect.ownKeys(newTreeIndex);
    for (let prop of props) {
      constructedTree[prop] = this.constructTree(newTreeIndex, prop.toString(), completePath);
    }

    // Return the tree
    return constructedTree;
  }

  /**
   * Serializes a tree into the localstore format
   */
  public serializeTree(tree: {}) {
    const store = {};
    const treeIndex = {};
    traverseTree(
      tree, 'root',
      (path, obj) => {
        const name = getLastPart(path);
        const type = getAlmostLastPart(path);
        if ((type in ModelBuilder && type != 'root') || name == 'root') {
          traversePath(
            treeIndex,
            path,
            () => {},
            (cursor, slug) => {
              cursor[slug] = {};
            }
          );
          store[path] = JSON.stringify(obj);
        }
      },
      (path, obj) => {}
    );
    store['treeIndex'] = JSON.stringify(treeIndex);
    return store;
  }

  public getTreeIndex(): {} {
    return JSON.parse(window.localStorage.getItem('treeIndex'));
  }

  /**
   * Saves a tree and it's index to the localstore
   */
  public saveTree(tree: {}) {
    const store = this.serializeTree(tree);
    const paths = Reflect.ownKeys(store);
    paths.forEach((path) => {
      window.localStorage.setItem(path as string, store[path]);
    });
  }

  /**
   * Deletes the whole tree, depth first order
   */
  public deleteTree() {
    const treeIndex = this.getTreeIndex();
    traverseTree(
      treeIndex, 'root',
      (path, obj) => {},
      (path, obj) => {
        this.delete(path);
      }
    );
    window.localStorage.removeItem('treeIndex');
  }
}
