/**
 * Example: type ClickOrComponent = RequireAtLeastOne<MenuItem, 'click' | 'component'>
 */
export type RequireAtLeastOne<T, Keys extends keyof T = keyof T> = Pick<T, Exclude<keyof T, Keys>> 
  & { [K in Keys]-?: Required<Pick<T, K>> & Partial<Pick<T, Exclude<Keys, K>>> }[Keys];

/**
 * Example: type OnlyOneClickOrComponent = RequireOnlyOne<MenuItem, 'click' | 'component'>
 */
export type RequireOnlyOne<T, Keys extends keyof T = keyof T> = Pick<T, Exclude<keyof T, Keys>>
  & { [K in Keys]-?: Required<Pick<T, K>> & Partial<Record<Exclude<Keys, K>, undefined>> }[Keys];

export type Concrete<Type> = {
  [Property in keyof Type]-?: Type[Property];
};

/**
 * Adds a type tag to an object or basic type.
 * See: https://spin.atomicobject.com/2018/01/15/typescript-flexible-nominal-typing/
 */
interface Flavoring<FlavorT> {
  _type?: FlavorT;
}
export type Flavor<T, FlavorT> = T & Flavoring<FlavorT>;

/**
 * Dictionary types
 */
export type Dictionary<T> = { [key: string]: T };

/**
 * Readonly Dictionary
 */
export type ReadonlyDictionary<T> = { readonly [key: string]: T };

/**
 * A constructor that returns a specific Class type
 */
export type Constructor<T = Object> = new (...args: any[]) => T;

/**
 * Type of a function that returns a T
 */
export type Factory<T = Object> = (...args: any[]) => T;

/**
 * Function that takes a class constructor and returns a function that builds the class
 */
export function BuildFactory<T = Object>(constructor: Constructor<T>): Factory<T> {
  return (...args: any[]): T => new constructor(...args);
}

/**
 * A constructor that takes a certain input type and returns a specific Class type
 */
export type ConstrainedConstructor<S = Object, T = Object> = new (...args: S[]) => T;

/**
 * Type of a function that takes an object of type S and returns a T
 */
export type ConstrainedFactory<S = Object, T = Object> = (init: S) => T;

/**
 * Function that takes an object of type S and a class constructor. Returns a function takes an input of type S that builds the class.
 */
export function BuildConstrainedFactory<S = Object, T = Object>(_: S, constructor: ConstrainedConstructor<S, T>): ConstrainedFactory<S, T> {
  return (init: S): T => new constructor(init);
}

/**
 * A NOP for convenience
 */
export function NOP() {}

/**
 * Takes an object of Record<string, T> and maps it to Map<string, T>
 * @param obj
 * @returns
 */
 export function RecordToMap<T = Object>(obj: Record<string, T>): Map<string, T> {
  return new Map<string, T>(
    Object.entries(obj)
  );
}

/**
 * Takes an object (likely the result of a form) and removes fields that are
 * undefined or empty strings.
 * @param unfiltered
 * @returns
 */
export function rejectEmptyFields<T = Object>(unfiltered: T): T {
  const filtered: T = {} as T;
  Object.keys(unfiltered).forEach((key) => {
    if (unfiltered[key] != undefined && unfiltered[key] != '') {
      filtered[key] = unfiltered[key];
    }
  });
  return filtered;
}

/**
 * Assigns properties to the current object
 */
export function assignFields<T = Object, U = Object>(unfiltered: T, context: U) {
  const fields = Object.keys(unfiltered);
  fields.forEach((key) => {
    if (unfiltered[key] != undefined && (unfiltered[key] != '')) {
      context[key] = unfiltered[key];
    }
  });
}

/**
 * Overwrites properties of the current object
 */
export function overwriteFields<T extends Object, U extends Object>(unfiltered: T, context: U) {
  const fields = Object.keys(unfiltered);
  fields.forEach((key) => {
    context[key] = unfiltered[key];
  });
}

/**
 * Only exports not-inherited properties as a POJO for serialization
 * If you need to explort a list of properties that includes inherited properties, use `fieldsToJSON`
 */
export function toJSON<T extends Object, U extends Object> (context: U): T {
  const filtered: T = {} as T;
  const fields = Object.keys(context);
  fields.forEach((key) => {
    if (context[key] != undefined && context[key] != '') {
      filtered[key] = context[key];
    }
  });
  return filtered;
}

/**
 * Only returns a subset of the properties as a POJO for serialization
 * TODO: In some cases it makes more sense to mask fields instead.
 */
export function fieldsToJSON<T extends Object, U extends Object> (context: U, fieldMask: Array<string>): T {
  const filtered: T = {} as T;
  const fields = Object.keys(context);
  fields.forEach((key) => {
    const index = fieldMask.findIndex((value) => value == key);
    if (index > -1 && key in context && context[key] != undefined && context[key] != '') {
      filtered[key] = context[key];
    }
  });
  return filtered;
}

/**
 * Naive diffing function
 */
export function objectsDiff<T extends Object> (A: T, B: T): boolean {
  if (A && A != null && B && B != null) {
    const aFields = Object.keys(A);
    const bFields = Object.keys(B);

    // Compare right side with left side (logical AND)
    const right = aFields.reduce((acc, aField) => {
      return (
        acc
        && bFields.includes(aField)
        && A[aField] === B[aField]
      );
    }, true);

    // Compare left side with right side (logical AND)
    const left = bFields.reduce((acc, bField) => {
      return (
        acc
        && aFields.includes(bField)
        && A[bField] === B[bField]
      );
    }, true);

    // If one side of the comparison is false, it's changed in some way
    return !(left&&right);
  }
  return true;
}

// Tree Traversal Functions

/**
 * Traverse a path down an object tree and returns the final object/value,
 * Allows executing functions based on finding or not finding an object in the path.
 */
export function TraversePath<T = {}, R = {}> (
  init: T,
  path: string,
  hasObject: (cursor: T, slug: string) => void,
  noObject: (cursor: T, slug: string) => void
): R {
  let cursor: any = init;
  let pathSlugs: Array<string>;
  if (path != '') {
    try {
      pathSlugs = path.split('.');
    } catch(e) {
      pathSlugs = [path]
    }
    for (let slug of pathSlugs) {
      if (cursor === undefined) {
        noObject(cursor, slug);
        return {} as R;
      }
      if (slug in cursor) {
        hasObject(cursor, slug);
        cursor = cursor[slug];
      } else {
        noObject(cursor, slug);
        cursor = {} as R;
      }
    }
  }
  return cursor;
}

/**
 * Traverses a path through tree and returns the final object/value
 */
export function GetPath<T extends {}, R extends {}> (
  tree: T,
  startPath: string
): R {
  const traversed = [];
  return TraversePath<T, R>(
    tree,
    startPath,
    (cursor, slug) => { traversed.push(slug); },
    (cursor, slug) => {
      const tPath = traversed.join('.');
      console.warn(`Could not find element '${slug}' in '${tPath}'.`);
      cursor = undefined;
    }
  );
}

/**
 * Tracks the current object context in a breadth first traversal.
 */
type BreadthFirstContext = Flavor<{
  context: {};
  path?: string;
}, "bf">;

/**
 * Tracks the current object context in a depth first traversal.
 */
type DepthFirstContext = Flavor<{
  key: string,
  context: {};
  path?: string;
}, "df">;

/**
 * Breadth first tree traversal.
 * Does not use recursion, so it can get around stack recursion limits.
 */
export function BreadthFirstTraversal<T extends {}> (
  tree: T,
  startPath: string,
  walker: (node: {}, key: string, path: string) => void
) {
  // create the initial context
  const initialContext = {
    context: GetPath(tree, startPath),
    path: startPath
  };
  // create our queue with the initial context
  const iterationContexts: BreadthFirstContext[] = [initialContext];
  do {
    // take the next context off the queue
    const currentContext: BreadthFirstContext = iterationContexts.shift();
    if (currentContext && currentContext.context) {
      // iterate over children in the current context
      Object.keys(currentContext.context).forEach((key) => {
        const currentObject = currentContext.context[key];
        if (currentObject instanceof Object
          && !(currentObject instanceof Date)
          && !(currentObject instanceof Function)
        ) {
          const contextPath = currentContext.path;
          const currentPath = contextPath === '' ? key : [contextPath, key].join('.');
          // walk the path and push the children contexts onto the queue
          walker(currentObject, key, currentPath);
          iterationContexts.push({
            context: currentObject,
            path: currentPath
          });
        }
      });
    }
  } while (iterationContexts.length > 0);
}

/**
 * Create all the contexts for a certain child
 */
function createDepthFirstContexts(context: {}, path: string): DepthFirstContext[] {
  const keys = Object.keys(context);
  return keys.map((key) => {
    return {
      key,
      context,
      path
    };
  });
}

/**
 * Depth first tree traversal.
 * Does not use recursion, so it can get around stack recursion limits.
 */
export function DepthFirstTraversal<T extends {}> (
  tree: T,
  startPath: string,
  walker: (node: {}, key: string, path: string) => void
) {
  // create our queue with the initial context
  const iterationContexts: DepthFirstContext[] = createDepthFirstContexts(GetPath(tree, startPath), startPath);
  do {
    // take the next context off the queue
    const currentContext: DepthFirstContext = iterationContexts.shift();
    if (currentContext) {
      const { key, context } = currentContext;
      const currentObject = context[key];
      if (currentObject instanceof Object
        && !(currentObject instanceof Date)
        && !(currentObject instanceof Function)
      ) {
        const contextPath = currentContext.path;
        const currentPath = contextPath === '' ? key : [contextPath, key].join('.');
        // walk the path and unshift the children contexts onto the queue
        walker(currentObject, key, currentPath);
        iterationContexts.unshift(...createDepthFirstContexts(currentObject, currentPath));
      }
    }
  } while (iterationContexts.length > 0);
}

// Helper Functions

export function getParentPath(path: string): string {
  try {
    const parts = path.split('.');
    return parts.slice(0, parts.length -1 ).join('.');
  } catch(e) {
    return '';
  }
}

export function getLastPart(path: string): string {
  try {
    const parts = path.split('.');
    return parts[parts.length - 1];
  } catch(e) {
    return '';
  }
}

export function getAlmostLastPart(path: string): string {
  try {
    const parts = path.split('.');
    if (parts.length == 1) {
      return '';
    }
    return parts.slice(parts.length - 2, parts.length - 1)[0];
  } catch(e) {
    return '';
  }
}

export function getPathLength(path: string): number {
  if (path === '') return 0;
  try {
    const parts = path.split('.');
    return parts.length;
  } catch(e) {
    if (path && path !== '') return 1;
    return 0;
  }
}
