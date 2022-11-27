import { ObjectValues, PathData, TreeDefinition, PathWalkerCallback, walkTreeDefinition } from '../src';
import { Root, A, B, C, D, ModelKinds, TreeDef } from './fixtures';
import { cloneDeep } from "lodash";

describe('walkTreeDefinition', () => {
  it('should fail when passed an illegal path', () => {
    expect(() => { walkTreeDefinition(TreeDef, 'not') }).toThrow('Path not valid for TreeDefinition: not');
  });

  it('should walk the tree', () => {
    const treeDataSnapshots: PathData[][] = new Array<PathData[]>();
    const walker: PathWalkerCallback = (treeDefinition: TreeDefinition, treeDatas: PathData[]) => {
      treeDataSnapshots.push(cloneDeep(treeDatas));
    }
    const treeDatas = walkTreeDefinition(TreeDef, 'root.a.42', walker);
    expect(treeDataSnapshots).toStrictEqual([
      [{kind: 'root', values: { singleton: true } }],
      [{kind: 'root', values: { singleton: true } },
      {kind: 'a', values: { singleton: false, primaryKey: 'id', keyValue: "42", parentKey: undefined, parentKeyValue: undefined } }]
    ]);
    expect(treeDatas).toStrictEqual([
      {kind: 'root', values: { singleton: true } },
      {kind: 'a', values: { singleton: false, primaryKey: 'id', keyValue: "42", parentKey: undefined, parentKeyValue: undefined } }
    ]);
  });
});
