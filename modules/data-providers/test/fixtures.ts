import { Dictionary, assignFields, fieldsToJSON } from 'typed-object-tweezers';
import { TreeNode } from '../src/holochain/project/types';
import { TreeDefinition } from '../src';

export class Root {
  'a': Dictionary<A> = {};
  'b': Dictionary<B> = {};
  'id': string;

  constructor(init: {}) {
    assignFields<{}, this>(init, this);
  }

  toJSON() {
    return { id: this.id };
  }
};
export class A {
  'c': Dictionary<C> = {};
  'd': Dictionary<D> = {};
  'id': string;
  constructor(init: {}) {
    assignFields<{}, this>(init, this);
  }

  toJSON() {
    return fieldsToJSON(this, ['id']);
  }
};
export class B {
  'id': string;
  constructor(init: {}) {
    assignFields<{}, this>(init, this);
  }

  toJSON() {
    return fieldsToJSON(this, ['id']);
  }
};
export class C {
  'id': string;
  constructor(init: {}) {
    assignFields<{}, this>(init, this);
  }

  toJSON() {
    return fieldsToJSON(this, ['id']);
  }
};
export class D {
  'id': string;
  constructor(init: {}) {
    assignFields<{}, this>(init, this);
  }

  toJSON() {
    return fieldsToJSON(this, ['id']);
  }
};

export const ModelKinds = {
  'root': Root,
  'a': A,
  'b': B,
  'c': C,
  'd': D
}

export const Test1: TreeDefinition = {
  'root': {
    singleton: true,
    children: {
      'a': {
        primaryKey: 'id'
      },
      'b': {
        primaryKey: 'id'
      },
    }
  }
};

export const Test2: TreeDefinition = {
  'root': {
    children: {
      'a': {
        children: {
          'c': {
            primaryKey: 'id',
            parentKey: 'parentKey'
          },
          'd': {
            primaryKey: 'id',
            parentKey: 'parentKey'
          },
        },
      },
    }
  }
};

export const TreeDef: TreeDefinition = {
  'root': {
    singleton: true,
    children: {
      'a': {
        primaryKey: 'id',
        children: {
          'c': {
            primaryKey: 'id',
            parentKey: 'parentKey'
          },
          'd': {
            primaryKey: 'id',
            parentKey: 'parentKey'
          },
        },
      },
      'b': {
        primaryKey: 'id'
      },
    }
  }
};

export const tree_test = {
  'root': new Root({
    id: 'root',
    path: 'root',
    'a': {
      '3': new A({
        id: '3',
        path: 'root.a.3',
        'c': {
          '5': new C({
            id: '5',
            path: 'root.a.3.c.5'
          }),
          '7': new C({
            id: '7',
            path: 'root.a.3.c.7'
          })
        },
        'd': {}
      })
    },
    'b': {
      '1': new B({
        id: '1',
        path: 'root.b.1'
      })
    }
  })
};

/**
 * Paths in the form of data returned from the zome:
 * root
 * root.a.3
 * root.b.1
 * root.a.3.c.5
 * root.a.3.c.7
 */
export const rust_nodes: TreeNode[] = [
  {idx: 0, parent: null, children: [1, 2], val: {name: 'root', data: '{"id":"root"}'}},
  {idx: 1, parent: 0, children: [3], val: {name: 'a', data: ''}},
  {idx: 2, parent: 0, children: [4], val: {name: 'b', data: ''}},
  {idx: 3, parent: 1, children: [5], val: {name: '3', data: '{"id":"3"}'}},
  {idx: 4, parent: 2, children: [], val: {name: '1', data: '{"id":"1"}'}},
  {idx: 5, parent: 3, children: [6, 7], val: {name: 'c', data: ''}},
  {idx: 6, parent: 5, children: [], val: {name: '5', data: '{"id":"5"}'}},
  {idx: 7, parent: 5, children: [], val: {name: '7', data: '{"id":"7"}'}},
];
