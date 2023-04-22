import { DataProvider } from "../../index";
import { Constructor } from "typed-object-tweezers";
import { Action, Fiber } from "../../lib/fiber";
import { ZomeApi } from "./ZomeApi";
import { SignalMessage } from "./SignalMessage";
import { ThingInput } from "./HolochainTypes";
import { TreeDefinition, Pathed } from "../../WithPath";
import { parseTree } from "./HolochainTree";

export class ProjectProvider implements DataProvider {

  protected zomeApi: ZomeApi;
  protected fiber: Fiber<void>;
  protected treeDefinition: TreeDefinition;
  protected modelKinds: Record<string, Constructor<any>>;

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
  private fetchAction = <T extends object>(path: string, resolve: (r: Pathed<T>) => void): Action<void> => {
    return async () => {
      const res = await this.zomeApi.get_thing(path);
      const hydrated = parseTree<T>(this.treeDefinition, res, this.modelKinds);
      // TODO: This feels like a hack. Need to look at the whole type system.
      // The objects should alternate between a Pathed<Container> and values of Pathed<T>
      resolve(hydrated[path] as Pathed<T>);
    }
  }

  /**
   * Higher-order function returning an async function which stores the passed item
   */
  private putAction = <T>(item: Pathed<T>): Action<void> => {
    if (item.path) {
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
    } else {
      return async () => {}
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

}