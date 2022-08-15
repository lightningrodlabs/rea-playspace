import { useDebugValue } from 'react';
import useSyncExternalStoreExports from 'use-sync-external-store/shim/with-selector';
import { PathedData } from './models/PathedData';
import { YatiSnapshot, YatiTreeStore } from './YatiTreeStore';
import { getPath } from './utils';
import { Root } from './models/Application/Root';

const { useSyncExternalStoreWithSelector } = useSyncExternalStoreExports;

/**
 * usePath React hook:
 * Given a particular path and store, it returns the current value for the path.
 *
 * This uses the React v18 compatible shim for synchronous updates. Here's a
 * useful article:
 *  - https://blog.saeloun.com/2021/12/30/react-18-usesyncexternalstore-api
 * React documentation:
 *  - https://reactjs.org/docs/hooks-reference.html#usesyncexternalstore
 * Also, there is useful conversation on GitHub here:
 *  - https://github.com/reactwg/react-18/discussions/86
 */
export function usePath(path: string, store: YatiTreeStore): PathedData {
  const selector = function (tree: YatiSnapshot) {
    return getPath(tree, path, false, true);
  }
  const api = store.getReactApi();
  const state = useSyncExternalStoreWithSelector<Root, PathedData>(
    api.subscribe,
    api.getSnapshot,
    api.getSnapshot,
    selector
  )
  useDebugValue(state);
  return state;
}
