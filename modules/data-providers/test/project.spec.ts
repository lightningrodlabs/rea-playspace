import { HolochainClient } from '@holochain-open-dev/cell-client';
import { CellId } from '@holochain/client';
import { AddOutput, TreeNode, ThingInput } from '../src/holochain/project/types';
import { ProjectProvider, ZomeApi } from '../src/holochain/project';
import { Root, A, B, C, D, ModelKinds, TreeDef, rust_nodes, tree_test } from './fixtures';

const zome_mock: ZomeApi = {
  client: {} as HolochainClient,
  cellId: {} as CellId,
  put_thing: async (input: ThingInput): Promise<AddOutput> => {
    return {} as Promise<AddOutput>;
  },
  get_thing: async (path_str: string): Promise<Array<TreeNode>> => {
    return {} as Promise<Array<TreeNode>>;
  },
  delete_thing: async (path_str: string): Promise<void> => {},
  signal_call: async (message: string): Promise<void> => {}
};

describe('ProjectProvider', () => {
  it('should construct a tree given an API response', () => {
    const provider = new ProjectProvider(TreeDef, ModelKinds, zome_mock);
    const tree = provider.parseTree<Root>(TreeDef, rust_nodes);
    expect(tree).toEqual(tree_test);
  });
});