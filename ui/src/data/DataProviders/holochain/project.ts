import ZomeApi from "./api/zomeApi";
import { RustNode, ThingInput } from "../../../types/holochain";
import { Action, Fiber } from "../../../lib/fiber";
import { getAlmostLastPart, PathedData } from "../../models/PathedData";
import { constructFromJSON } from "../../models/ModelConstructors";
import { DataProvider } from "../../YatiTreeStore";
import { assignFields } from "../../utils";
import { SignalMessage } from "../../models/Application/SignalMessage";

export class ProjectProvider implements DataProvider {

  protected zomeApi: ZomeApi;
  protected fiber: Fiber<void>;

  /**
   * Initialize class
   */
  constructor(zomeApi: ZomeApi) {
    this.zomeApi = zomeApi;
    this.fiber = new Fiber<void>();
  }

  /**
   * Higher-order function returning an async function which fetches the data
   * associated with the path
   */
  private fetchAction = (path: string, resolve: (r: PathedData) => void): Action<void> => {
    return async () => {
      const res = await this.zomeApi.get_thing(path);
      const hydrated = this.parseTree(res, 0);
      resolve(hydrated[path]);
    }
  }

  /**
   * Higher-order function returning an async function which stores the passed item
   */
  private putAction = (item: PathedData): Action<void> => {
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
  public fetch(path: string): Promise<PathedData> {
    // Outer promise that returns the data
    return new Promise<PathedData>((data_resolve) => {
      // Schedule the actual action for this promise to execute after all
      // currently shceduled tasks.
      this.fiber.schedule([this.fetchAction(path, data_resolve)]);
    });
  }

  /**
   * Persist a single PathedData object
   */
  public put(item: PathedData) {
    this.fiber.schedule([
      this.putAction(item)
    ]);
  }

  /**
   * Persist an array of PathedData objects
   *
   * Note: putAction has the code to queue a single put
   */
  public putAll(items: PathedData[]) {
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
   * Non-recursive path resolver the RustNodes
   */
  protected getRustNodePath(nodes: RustNode[], idx: number): string {
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
   * Recursively parses the data structure in a depth-first manner
   */
  protected parseTree(nodes: RustNode[], idx: number): Record<string, PathedData> {
    const node = nodes[idx];
    if (node) {
      const path = this.getRustNodePath(nodes, idx);
      const type = getAlmostLastPart(path);
      const { name, data } = node.val;
      let PDO: PathedData = constructFromJSON(type, name, data);

      if (node.children && node.children != null && node.children.length > 0) {
        node.children.forEach((child) => {
          assignFields<Record<string, PathedData>, PathedData>(this.parseTree(nodes, child), PDO);
        });
      }
      return {[name]: PDO};
    } else {
      return {};
    }
  }
}