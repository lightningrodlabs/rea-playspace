# typed-object-tweezers

This is a catch all module of various different typed utilities. Even contains methods for breadth and depth first traversals over a set of objects. Also allows fetching a particular type of object by following a string path through the set of objects. Does not use recursion to avoid call stack limits in the browser. **Warning**: does not account for loops, but accounting for them is a simple change to add a WeakSet to check and see if a node has been visited.

The `src/index.ts` file is fairly well documented. Check there until I write docs.
