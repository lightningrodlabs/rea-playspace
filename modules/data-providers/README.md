# Data Providers

This is a simple library for requesting tree shaped data from local storage and a "Project Zome" in Holochain.

This allows us to create two data structures that map the tree structure onto an existing set of data models:

```ts
/** 
 * Assume that Root, A, B, C, D are all existing structures classes that should
 * be in a particular relation to one another.
 */
export const ModelKinds = {
  'root': Root,
  'a': A,
  'b': B,
  'c': C,
  'd': D
}

/**
 * This defines the relationships of the data between the objects and the
 * particular tree structure they should be arranged in.
 *
 * Each of the objects in this tree can take the following form:
 * export type TreeEntry = Flavor<{
 *  // The object doesn't have an ID, and just one exists on the parent object.
 *  singleton?: boolean;
 *  // The primary key used to identify the object
 *  primaryKey?: string;
 *  // The key in the object used to refer to it's 'parent' relationship.
 *  parentKey?: string;
 *  // This is a yet to be decided field used to connect to objects that have the opposite directionality of their keys.
 *  substituteWith?: {};
 *  // Record<string, TreeEntry>
 *  children?: TreeDefinition;
 * }, "TreeEntry">;
 */
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
```

To use these just import them, set up the above structures and call them like so:

```ts
import { LocalstoreProvider } from 'data-providers";

const fakePlasticTree = "{\"root\":{\"id\":\"root\",\"a\":{\"3\":{\"id\":\"3\",\"c\":{\"5\":{\"id\":\"5\"},\"7\":{\"id\":\"7\"}},\"d\":{}}},\"b\":{\"1\":{\"id\":\"1\"}}}}";

const localstore = new LocalstoreProvider(TreeDef, ModelKinds);
const deserializedTree = localstore.constructTree(JSON.parse(fakePlasticTree));
const serializedTree = localstore.serializeTree(deserializedTree);
// should be true serializedTree == falkePlasticTree
```

In order to use the `ProjectProvider` you also need to have a properly configured Holochain client to pass into it:

```ts
const projectStore = new ProjectProvider(ModelTree, ModelKinds, zomeApi);
```
