import { Dictionary, assignFields, fieldsToJSON } from 'typed-object-tweezers'
import { ModelKinds, TreeDefinition } from 'data-providers';

export class Root {
  'a': Dictionary<A> = {}
  'b': Dictionary<B> = {}
  'id': string

  constructor(init: object) {
    assignFields<object, this>(init, this)
  }

  toJSON() {
    return { id: this.id }
  }
}

export class A {
  'c': Dictionary<C> = {}
  'd': Dictionary<D> = {}
  'id': string
  constructor(init: object) {
    assignFields<object, this>(init, this)
  }

  toJSON() {
    return fieldsToJSON(this, ['id'])
  }
}

export class B {
  'id': string;
  constructor(init: object) {
    assignFields<object, this>(init, this)
  }

  toJSON() {
    return fieldsToJSON(this, ['id'])
  }
}

export class C {
  'id': string;
  constructor(init: object) {
    assignFields<object, this>(init, this)
  }

  toJSON() {
    return fieldsToJSON(this, ['id'])
  }
}

export class D {
  'id': string;
  constructor(init: object) {
    assignFields<object, this>(init, this)
  }

  toJSON() {
    return fieldsToJSON(this, ['id'])
  }
}

export const modelKinds: ModelKinds = {
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
}

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
}

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
}

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
          }),
          'path': 'root.a.3.c'
        },
        'd': {}
      }),
      'path': 'root.a'
    },
    'b': {
      '1': new B({
        id: '1',
        path: 'root.b.1'
      }),
      'path': 'root.b'
    }
  })
}
