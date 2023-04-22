import { LocalstoreProvider } from '../src/localstore';
import { Root, A, B, C, D, modelKinds, TreeDef, tree_test } from './fixtures';

const fakePlasticTree = "{\"root\":{\"id\":\"root\",\"a\":{\"3\":{\"id\":\"3\",\"c\":{\"5\":{\"id\":\"5\"},\"7\":{\"id\":\"7\"},\"path\":\"root.a.3.c\"},\"d\":{}},\"path\":\"root.a\"},\"b\":{\"1\":{\"id\":\"1\"},\"path\":\"root.b\"}}}";

describe ('LocalstoreProvider', () => {

  it('should reconstruct a tree from a serialized version', () => {
    const localstore = new LocalstoreProvider(TreeDef, modelKinds);
    const tree = localstore.parseTree<Root>(JSON.parse(fakePlasticTree), '');
    expect(tree['root'] instanceof Root).toBeTruthy;
    expect(tree['root'].id).toBe('root');
    expect(tree['root']['a']['3'] instanceof A).toBeTruthy;
    expect(tree['root']['a']['3'].id).toBe('3');
    expect(tree['root']['b']['1'] instanceof B).toBeTruthy;
    expect(tree['root']['b']['1'].id).toBe('1');
    expect(tree['root']['a']['3']['c']['5'] instanceof C).toBeTruthy;
    expect(tree['root']['a']['3']['c']['5'].id).toBe('5');
  });

  it('should serialize a tree', () => {
    const localstore = new LocalstoreProvider(TreeDef, modelKinds);
    const tree = localstore.serializeTree(tree_test);
    expect(tree).toBe(fakePlasticTree);
  });

});
