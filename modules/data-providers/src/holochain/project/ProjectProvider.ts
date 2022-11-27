import { DataProvider } from "../../index";
import { Constructor } from "typed-object-tweezers";
import { TreeDefinition, Pathed, constructTreeAtPath } from "../../WithPath";
import { Action, Fiber } from "../../lib/fiber";
import { ZomeApi } from "./ZomeApi";
import { TreeNode, ThingInput } from "./types";
import { SignalMessage } from "./SignalMessage";
import { BreadthFirst } from "./RustTree";

export class ProjectProvider implements DataProvider {

  protected zomeApi: ZomeApi;
  protected fiber: Fiber<void>;
  protected treeDefinition: TreeDefinition;
  protected modelKinds: Record<string, Constructor>;

  /**
   * Initialize class
   */
  constructor(treeDefinition: TreeDefinition, modelKinds: Record<string, Constructor>, zomeApi: ZomeApi) {
    this.treeDefinition = treeDefinition;
    this.modelKinds = modelKinds;
    this.zomeApi = zomeApi;
    this.fiber = new Fiber<void>();
  }

  /**
   * Higher-order function returning an async function which fetches the data
   * associated with the path
   */
  private fetchAction = <T>(path: string, resolve: (r: Pathed<T>) => void): Action<void> => {
    return async () => {
      const res = await this.zomeApi.get_thing(path);
      const hydrated = this.parseTree<T>(this.treeDefinition, res);
      resolve(hydrated[path]);
    }
  }

  /**
   * Higher-order function returning an async function which stores the passed item
   */
  private putAction = <T>(item: Pathed<T>): Action<void> => {
    const itemThing: ThingInput = {
      path: item.path,
      data: JSON.stringify(item)
    };
    const signal = new SignalMessage({
      op: 'put',
      path: item.path,
      data: item
    })
    const signalString = JSON.stringify(signal);
    return async () => {
      await this.zomeApi.put_thing(itemThing);
      await this.zomeApi.signal_call(signalString);
    }
  }

  /**
   * Higher-order function returning an async function which deletes the passed path
   */
  private deleteAction = (path: string): Action<void> => {
    const signal = new SignalMessage({
      op: 'delete',
      path: path
    })
    const signalString = JSON.stringify(signal);
    return async () => {
      await this.zomeApi.delete_thing(path);
      await this.zomeApi.signal_call(signalString);
    }
  }

  /**
   * Fetches a model and its descendents given it's path
   */
  public fetch<T>(path: string): Promise<Pathed<T>> {
    // Outer promise that returns the data
    return new Promise<Pathed<T>>((data_resolve) => {
      // Schedule the actual action for this promise to execute after all
      // currently shceduled tasks.
      this.fiber.schedule([this.fetchAction(path, data_resolve)]);
    });
  }

  /**
   * Persist a single PathedData object
   */
  public put<T>(item: Pathed<T>) {
    this.fiber.schedule([
      this.putAction(item)
    ]);
  }

  /**
   * Persist an array of PathedData objects
   *
   * Note: putAction has the code to queue a single put
   */
  public putAll<T>(items: Pathed<T>[]) {
    this.fiber.schedule(
      items.map((item) => this.putAction(item))
    );
  }

  /**
   * Deletes thing corresponding to the passed path
   * @param path
   */
  public delete(path: string) {
    this.fiber.schedule([
      this.deleteAction(path)
    ]);
  }

  /**
   * Non-recursive path resolver for the TreeNodes
   */
  protected getTreeNodePath(nodes: TreeNode[], idx: number): string {
    const parts: string[] = [];

    let name = nodes[idx].val.name;
    parts.unshift(name);
    let parent = nodes[idx].parent;
    while (parent !== null) {
      parts.unshift(nodes[parent].val.name);
      parent = nodes[parent].parent;
    }
    return parts.join('.');
  }

  /**
   * Parse the tree from the zome's TreeNode[] into our path addressible struct.
   *
   * In the most basic case, we will just fetch 'root'.
   * That will return every object in the 'tree'
   * So we start with the root node, and progress through all of it's branches
   * through to it's children.
   *
   * In the case of fetching a path 'root.c.1`, will start at that point with
   * no prior data to fill in the data for the root, for c, of for any other of
   * c's descendents besides 1. We start at 'root.c.1' and move towards it's
   * children.
   */
  public parseTree<T>(treeDefinition: TreeDefinition, nodes: TreeNode[]): Record<string, Pathed<T>> {
    // New tree
    const tree = {};

    BreadthFirst(nodes, (node, idx) => {
      // Parse out the data from the node
      const { name, data: serializedData } = node.val;
      const data = (serializedData && serializedData !== '') ? JSON.parse(serializedData): {};
      const path = this.getTreeNodePath(nodes, idx);
      constructTreeAtPath(tree, data, name, path, treeDefinition, this.modelKinds)
    });
    return tree;
  }
}