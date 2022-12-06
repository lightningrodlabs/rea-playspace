import {
  Action,
  Agent,
  Unit,
  Plan,
  Fulfillment
} from "valueflows-models";
import {
  DisplayNode,
  DisplayEdge
} from "./models/Application/Display";
import {
  ExtendedPlan
} from "./models/Application";
import { Root } from "./models/Application/Root";
import { LocalstoreProvider, Pathed, PathFunctor, TreeDefinition } from "data-providers";
import { IndexedTreeWithProviders, TreeState } from "yaati";
import { ModelTree, ModelKinds } from './models/Application';
import { BreadthFirstTraversal, Constructor } from "typed-object-tweezers";

/**
 * Our lovely data store
 * its functionality is composed of every module from Yaati and data-providers
 */
export class DataStore extends IndexedTreeWithProviders<'root', Root> {

  constructor(
    initTreeState: TreeState<'root', Root>,
    treeDefinition?: TreeDefinition,
    modelKinds?: Record<string, Constructor>
  ) {
    super(initTreeState, treeDefinition, modelKinds)
  }

  // Root helpers

  public createDefaultRoot() {
    // if it doesn't, create it and a placeholder plan
    console.info('root does not exist. creating...');
    const root = new Root();
    const PathedRoot: Pathed<Root> = PathFunctor(root, 'root');
    this.set(PathedRoot);
    // Need to index tree starting with the root
    this.pathIndex.indexTree(this.treeState);
  }

  /**
   * Checks to see if we have anything in our DataProvider,
   * if not sets up defaults for the app.
   */
  public async fetchOrCreateRoot(): Promise<any> {
    // check if root object exists
    try {
      const root: Root = await this.fetch('root');
      if (root instanceof Root) {
        const treeState: TreeState<'root', Root> = { 'root': root };
        this.treeState = treeState;
      } else {
        this.createDefaultRoot();
      }
    } catch (e) {
      console.warn(e);
      this.createDefaultRoot();
    }
  }

  // Agent helpers

  public getAgents(): Array<Pathed<Agent>> {
    return Object.values(this.treeState.root.agent);
  }

  // Plan helpers
  public getCurrentPlanId(): string {
    return this.treeState.root['planId'];
  }

  // Fulfillment helpers
  public filterFulfillmentsByCommitmentAndEvent(commitmentId: string, eventId: string) {
    return Object.values(this.treeState.root.fulfillment).filter((f: Pathed<Fulfillment>) => f.fulfills == commitmentId && f.fulfilledBy == eventId);
  }

  public filterFulfillmentsByCommitment(commitmentId: string) {
    return Object.values(this.treeState.root.fulfillment).filter((f: Pathed<Fulfillment>) => f.fulfills == commitmentId);
  }

  public filterFulfillmentsByEvent( eventId: string) {
    return Object.values(this.treeState.root.fulfillment).filter((f: Pathed<Fulfillment>) => f.fulfilledBy == eventId);
  }

  // Display* helpers
  public getDisplayNodes(planId: string): Pathed<DisplayNode>[] {
    return Object.values(this.getCursor(`root.plan.${planId}.displayNode`));
  }

  public getDisplayEdges(planId: string): Pathed<DisplayEdge>[] {
    return Object.values(this.getCursor(`root.plan.${planId}.displayEdge`));
  }

  // Commitment helpers

  public getActions(): Pathed<Action>[] {
    return Object.values(this.treeState.root.action);
  }

  public getUnits(): Pathed<Unit>[] {
    return Object.values(this.treeState.root.unit);
  }

  // Localstore helpers

  /**
   * Stores the whole tree
   */
  public async saveLocalTree() {
    try {
      const localstore = this.providers['localstore'] as LocalstoreProvider;
      localstore.saveTree(this.treeState);
    } catch (e) {
      console.error(`Received error: ${e}\nPlease make sure a localstore provider is loaded.`)
    }
  }

  /**
   * Throw away the tree stored in local store
   */
  public deleteLocalTree() {
    try {
      const localstore = this.providers['localstore'] as LocalstoreProvider;
      localstore.deleteTree();
    } catch (e) {
      console.error(`Received error: ${e}\nPlease make sure a localstore provider is loaded.`)
    }
  }

  /**
   * Fetches the version of the tree stored in the local store
   */
  public async fetchLocalTree(): Promise<void> {
    try {
      const localstore = this.providers['localstore'];
      return localstore.fetch('').then((store) => {
        console.log(store);
        this.treeState = store;
        this.pathIndex.indexTree(this.treeState);
      });
    } catch (e) {
      console.error(`Received error: ${e}\nPlease make sure a localstore provider is loaded.`)
    }
  }

  /**
   * Persists the entire tree, using the treeState as the reference
   */
  public saveInMemoryTree() {
    const self = this;
    BreadthFirstTraversal(
      this.treeState,
      '',
      (obj: any, key, path) => {
        console.log(path)
        if (obj.id && obj.path) {
          console.log('setting', obj)
          self.set(obj);
        }
      }
    );
  }
}

const dataStore = new DataStore({} as TreeState<'root', Root>, ModelTree, ModelKinds);

/**
 * Fetches DataStore
 */
 export function getDataStore() {
  return dataStore;
}