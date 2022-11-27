import { useDebugValue } from 'react';
import useSyncExternalStoreExports from 'use-sync-external-store/shim';
import useSyncExternalStoreWithSelectorExports from 'use-sync-external-store/shim/with-selector';
const { useSyncExternalStore } = useSyncExternalStoreExports;
const { useSyncExternalStoreWithSelector } = useSyncExternalStoreWithSelectorExports;

/*
 * This uses the React v18 compatible shim for synchronous updates. Here's a
 * useful article:
 *  - https://blog.saeloun.com/2021/12/30/react-18-usesyncexternalstore-api
 * React documentation:
 *  - https://reactjs.org/docs/hooks-reference.html#usesyncexternalstore
 * Also, there is useful conversation on GitHub here:
 *  - https://github.com/reactwg/react-18/discussions/86
 */

/**
 * API Singletons created for ease of interaction with React
 */
export interface SyncExternalStoreApi<Snapshot> {
  // takes a callback function and returns an unsubscribe function
  subscribe: (_: () => void) => () => void;
  // returns the current snapshot of the data
  getSnapshot: () => Snapshot;
};

/**
 * useStore React hook:
 * Takes an adapted store (an object with the interface SyncExternalStoreApi),
 * and returns the current snapshot for use in the API. It also triggers
 * rerendering when the data changes.
 */
export function useStore<Snapshot>(
  store: SyncExternalStoreApi<Snapshot>
): Snapshot {
  const state = useSyncExternalStore<Snapshot>(
    store.subscribe,
    store.getSnapshot,  // Client side data snapshot
    store.getSnapshot   // Server side data snapshot
  )
  useDebugValue(state);
  return state;
}

/**
 * useStoreWithSelector React hook:
 * Takes an adapted store (an object with the interface SyncExternalStoreApi) and
 * a selector that returns a portion of the store to compare against.
 * and returns the current snapshot for use in the API. It also triggers
 * rerendering when the data changes.
 */
export function useStoreWithSelector<Snapshot, Selection>(
  store: SyncExternalStoreApi<Snapshot>,
  selector: (snapshot: Snapshot) => Selection
): Selection {
  const state = useSyncExternalStoreWithSelector<Snapshot>(
    store.subscribe,
    store.getSnapshot,  // Client side data snapshot
    store.getSnapshot,  // Server side data snapshot
    selector            // function traverses the structure to get to the wanted data
  )
  useDebugValue(state);
  return state;
}
