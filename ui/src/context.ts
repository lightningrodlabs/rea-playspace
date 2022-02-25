import { Context, createContext } from '@holochain-open-dev/context';
import { ModelerStore } from './modeler-store';

export const modelerStoreContext: Context<ModelerStore> = createContext('modeler/store');