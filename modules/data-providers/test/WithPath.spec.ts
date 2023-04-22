import {
  ObjectValues,
  PathData,
  TreeDefinition,
  PathWalkerCallback,
  walkTreeDefinition,
  Pathed,
  PathFunctor,
  mergeObjectDefinitionTrees,
  buildModel,
  constructTreeAtPath
} from '../src/WithPath';
import { Root, A, B, C, D, modelKinds, TreeDef, Test1, Test2 } from './fixtures';
import { cloneDeep } from "lodash";

describe('PathFunctor', () => {
  it('should convert from a T to a Pathed<T>', () => {
    type V = {
      greeting: string
    }
    const v: V = {greeting: "Hi"}
    const pathed = PathFunctor(v, "I.am.pathed")
    expect(pathed.path).toEqual("I.am.pathed")
  });
})

describe('mergeObjectDefinitionTrees', () => {
  it('should merge two trees', () => {
    expect(JSON.stringify(mergeObjectDefinitionTrees(Test1, Test2))).toEqual(JSON.stringify(TreeDef))
  })
})

describe('walkTreeDefinition', () => {
  it('should fail when passed an illegal path', () => {
    expect(() => { walkTreeDefinition(TreeDef, 'not') }).toThrow('Path not valid for TreeDefinition: not')
  })

  it('should walk the tree', () => {
    const treeDataSnapshots: PathData[][] = new Array<PathData[]>()
    const walker: PathWalkerCallback = (treeDefinition: TreeDefinition, treeDatas: PathData[]) => {
      treeDataSnapshots.push(cloneDeep(treeDatas))
    }
    const treeDatas = walkTreeDefinition(TreeDef, 'root.a.42', walker)
    expect(treeDataSnapshots).toStrictEqual([
      [{kind: 'root', values: { singleton: true } }],
      [{kind: 'root', values: { singleton: true } },
      {kind: 'a', values: { singleton: false, primaryKey: 'id', keyValue: "42", parentKey: undefined, parentKeyValue: undefined } }]
    ])
    expect(treeDatas).toStrictEqual([
      {kind: 'root', values: { singleton: true } },
      {kind: 'a', values: { singleton: false, primaryKey: 'id', keyValue: "42", parentKey: undefined, parentKeyValue: undefined } }
    ])
  })
})

describe('buildModel', () => {
  it('should fail when passed an illegal path', () => {
    expect(() => { buildModel(TreeDef, modelKinds, 'not', {}) }).toThrow('Path not valid for TreeDefinition: not')
  })

  it('should construct a new A', () => {
    const a = {
      'id': '42',
      'name': 'Jillian'
    }
    const newAgent = buildModel<{}, A> (TreeDef, modelKinds, 'root.a.42', a)
    if (newAgent instanceof A) {
      expect(newAgent.id).toBe('42')
      expect(newAgent.path).toBe('root.a.42')
    } else {
      throw Error("Function buildModel did not return the correct instance type.")
    }
  })

  it('should not construct a new A when passed the parent path', () => {
    const a = {}
    const thing = buildModel<{},{}>(TreeDef, modelKinds, 'root.a', a)
    expect(thing).toEqual({
      path: 'root.a'
    })
  })

  it('should construct a new C', () => {
    const c = {
      'id': 'hi'
    }
    const newCommitment = buildModel<{}, C>(TreeDef, modelKinds, 'root.a.42.c.hi', c)
    if (newCommitment instanceof C) {
      expect(newCommitment.id).toBe('hi')
      expect(newCommitment.path).toBe('root.a.42.c.hi')
    } else {
      throw Error("Function buildModel did not return the correct instance type.")
    }
  })
})

describe('constructTreeAtPath', () => {
  it('should start to build a tree starting at the root', () => {
    const container = {}
    constructTreeAtPath<{}, Pathed<{}>>(container, {id:'root', name:'ada'}, 'root', 'root', TreeDef, modelKinds);
    expect(container instanceof Root).toBeTruthy
  })
})
