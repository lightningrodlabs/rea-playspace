import { Context, createContext } from '@holochain-open-dev/context';
import { HreaModelerStore } from './hrea-modeler-store';

export const hreaModelerStoreContext: Context<HreaModelerStore> = createContext(
  'hc_zome_hrea_modelers/store'
);
