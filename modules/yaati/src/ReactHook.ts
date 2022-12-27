import { useStoreWithSelector } from 'react-store-adaptors';
import { TreeState, TreeStore } from './TreeStore';
import { GetPath } from 'typed-object-tweezers';

export function usePath<RootKey extends string, R, Selection>(
  path: string,
  store: TreeStore<RootKey, R>
): Selection {
  const selector = function (tree: TreeState<RootKey, R>): Selection {
    return GetPath(tree, path);
  }
  return useStoreWithSelector<TreeState<RootKey, R>, Selection>(store, selector);
}
