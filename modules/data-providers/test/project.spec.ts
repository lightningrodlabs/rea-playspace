import { parseTree } from '../src/holochain/project/HolochainTree';
import { Root, A, B, C, D, modelKinds, TreeDef, rust_nodes, tree_test } from './fixtures';

describe('ProjectProvider', () => {
  it('should construct a tree given an API response', () => {
    const tree = parseTree<Root>(TreeDef, rust_nodes, modelKinds);
    expect(tree).toEqual(tree_test);
  });
});