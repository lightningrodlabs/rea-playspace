import { 
  Dictionary,
  assignFields,
  GetPath,
  BreadthFirstTraversal,
  DepthFirstTraversal
} from '../src';

export class Root {
  'a': Dictionary<A> = {};
  'b': Dictionary<B> = {};

  constructor(init: {}) {
    assignFields<{}, this>(init, this);
  }
};
export class A {
  'c': Dictionary<C> = {};
  'd': Dictionary<D> = {};
  'id': string;
  constructor(init: {}) {
    assignFields<{}, this>(init, this);
  }
};
export class B {
  'id': string;
  constructor(init: {}) {
    assignFields<{}, this>(init, this);
  }
};
export class C {
  'id': string;
  constructor(init: {}) {
    assignFields<{}, this>(init, this);
  }
};
export class D {
  'id': string;
  constructor(init: {}) {
    assignFields<{}, this>(init, this);
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

describe('The traversal algorithms', () => {

  describe('GetPath', () => {
    it('should return the same object given an empty path', () => {
      const root = GetPath(tree_test, '');
      expect(root).toBe(tree_test);
    });

    it('should return the correct object given path root.a.3.c.5', () => {
      const c = GetPath(tree_test, 'root.a.3.c.5');
      expect(c).toBe(tree_test.root.a[3].c[5]);
    });
  });

  describe('BreadthFirstTraversal', () => {
    it('should traverse breadth first', () => {
      const visited = Array<string>();
      BreadthFirstTraversal(tree_test, '', (node, key, path) => {
        visited.push(key);
      });
      expect(visited).toEqual(['root','a','b','3','1','c','d','5','7']);
    });
  });

  describe('DepthFirstTraversal', () => {
    it('should traverse depth first', () => {
      const visited = Array<string>();
      DepthFirstTraversal(tree_test, '', (node, key, path) => {
        visited.push(key);
      });
      expect(visited).toEqual(['root','a','3','c','5','7','d','b','1']);
    });
  });

});