import { useStoreWithSelector } from './hooks/useStore';
import { YatiSnapshot, YatiTreeStore } from './YatiTreeStore';
import { getPath } from './utils';

export function usePath<T>(path: string, store: YatiTreeStore): T {
  const selector = function (tree: YatiSnapshot): T {
    return getPath(tree, path, false, true) as T;
  }
  return useStoreWithSelector<YatiSnapshot, T>(store, selector);
}
