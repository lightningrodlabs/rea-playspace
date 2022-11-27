import { SyncExternalStoreApi } from './useStore';
import { Readable } from 'svelte/store';

/**
 * Wraps a Readable from Svelte to be used with useSyncExternalStore* hook 
 */
export function wrapReadable<T>(store: Readable<T>): SyncExternalStoreApi<T> {
  let snapshot: T;
  return {
    subscribe: function (cb: () => void) {
      return store.subscribe((value: T) => {
        snapshot = value;
        cb();
      })
    },
    getSnapshot: function (): T {
      return snapshot;
    }
  }
}