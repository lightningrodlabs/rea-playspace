import { mergeObjectDefinitionTrees } from '../src';
import { Test1, Test2, TreeDef} from './fixtures';

describe('mergeTrees', () => {
  it('should merge two trees', () => {
    expect(JSON.stringify(mergeObjectDefinitionTrees(Test1, Test2))).toEqual(JSON.stringify(TreeDef));
  });
});