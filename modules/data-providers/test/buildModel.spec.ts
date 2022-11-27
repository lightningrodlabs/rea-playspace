import { buildModel } from '../src';

import { Root, A, B, C, D, ModelKinds, TreeDef } from './fixtures';

describe('buildModel', () => {
  it('should fail when passed an illegal path', () => {
    expect(() => { buildModel(TreeDef, ModelKinds, 'not', {}) }).toThrow('Path not valid for TreeDefinition: not');
  });

  it('should construct a new A', () => {
    const a = {
      'id': '42',
      'name': 'Jillian'
    };
    const newAgent = buildModel<{}, A> (TreeDef, ModelKinds, 'root.a.42', a);
    if (newAgent instanceof A) {
      expect(newAgent.id).toBe('42');
      expect(newAgent.path).toBe('root.a.42')
    } else {
      throw Error("Function buildModel did not return the correct instance type.");
    }
  });

  it('should not construct a new A when passed the parent path', () => {
    const a = {};
    const thing = buildModel (TreeDef, ModelKinds, 'root.a', a);
    expect(thing).toEqual({});
  });

  it('should construct a new C', () => {
    const c = {
      'id': 'hi'
    };
    const newCommitment = buildModel (TreeDef, ModelKinds, 'root.a.42.c.hi', c);
    if (newCommitment instanceof C) {
      expect(newCommitment.id).toBe('hi');
      expect(newCommitment.path).toBe('root.a.42.c.hi');
    } else {
      throw Error("Function buildModel did not return the correct instance type.");
    }
  });
});
