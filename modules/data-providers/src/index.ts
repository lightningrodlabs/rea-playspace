/**
 * Data provider interface
 */
export interface DataProvider {
  fetch(path: string): Promise<any>;
  put(item: any): void;
  delete(path: string): void;
}

export type {
  WithPath,
  Pathed,
  TreeDefinition,
  TreeEntry,
  ObjectValues,
  PathData,
  PathWalkerCallback,
} from "./WithPath";
export {
  PathFunctor,
  mergeObjectDefinitionTrees,
  walkTreeDefinition,
  buildModel,
  constructTreeAtPath
} from "./WithPath";

export type { ActionResult, Action } from "./lib/fiber";
export { Fiber } from "./lib/fiber";

export type { Op } from "./holochain/project";
export {
  SignalMessage,
  ZomeApi,
  ProjectProvider
} from "./holochain/project";

export { LocalstoreProvider } from "./localstore";