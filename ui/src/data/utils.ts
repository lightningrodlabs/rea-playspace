/**
 * Takes an object (likely the result of a form) and removes fields that are
 * undefined or empty strings.
 * @param unfiltered
 * @returns
 */
 export function rejectEmptyFields<T>(unfiltered: T): T {
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
export function assignFields<T extends Object, U extends Object>(unfiltered: T, context: U) {
  const fields = Reflect.ownKeys(unfiltered);
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
  const fields = Reflect.ownKeys(unfiltered);
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
  const fields = Reflect.ownKeys(context);
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
export function fieldsToJSON<T extends Object, U extends Object> (context: U, fields: Array<string>): T {
  const filtered: T = {} as T;
  fields.forEach((key) => {
    if (Reflect.has(context, key) && context[key] != undefined && context[key] != '') {
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
    const aFields = Reflect.ownKeys(A);
    const bFields = Reflect.ownKeys(B);

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


/**
 * Traverse a path down a tree and returns the final object/value,
 * Allows executing functions based on finding or not finding an object in the path.
 */
export function traversePath (
  tree: {},
  path: string,
  hasObject: (cursor: {}, slug: string) => void,
  noObject: (cursor: {}, slug: string) => void,
  skipRoot: boolean = false,
  checkRoot: boolean = false
) {
  let cursor = tree;
  if (path != '') {
    const pathSlugs: Array<string> = path.split('.');
    const first: string = skipRoot ? pathSlugs.shift() : pathSlugs[0];
    if (checkRoot && first != 'root') {
      throw new Error("Path is malformed. All paths should start with 'root'.");
    }
    for (let slug of pathSlugs) {
      if (Object.hasOwn(cursor, slug)) {
        hasObject(cursor, slug);
        cursor = Reflect.get(cursor, slug);
      } else {
        noObject(cursor, slug);
        cursor = Reflect.get(cursor, slug);
      }
    }
  }
  return cursor;
}

/**
 * Traverses a path through tree and returns the final object/value
 */
export function getPath (
  tree: {},
  startPath: string,
  skipRoot: boolean = false,
  checkRoot: boolean = false
) {
  const traversed = [];
  return traversePath(
    tree,
    startPath,
    (cursor, slug) => { traversed.push(slug); },
    (cursor, slug) => {
      const tPath = traversed.join('.');
      console.warn(`Could not find element '${slug}' in '${tPath}'.`);
      cursor = {};
    },
    skipRoot,
    checkRoot
  );
}

/**
 * Traverses a tree in pre-, post-, or both orders based on which callbacks are provided
 */
export function traverseTree(
  tree: {},
  startPath: string,
  pre: (path: string, obj: {}) => void,
  post: (path: string, obj: {}) => void,
  oldPath: string = ''
) {
  // Compute the full path from all fragments
  const completePath = oldPath != '' ? `${oldPath}${startPath ? '.' + startPath : ''}`: startPath;

  // Fetch the object corresponding to the path
  try{
    const curr = getPath(tree, startPath);
    pre(completePath, curr);
    if (typeof curr == 'object' && !(curr instanceof Date) && curr != null) {
      // Get the children recursively
      const props = Reflect.ownKeys(curr);
      for (let prop of props) {
        traverseTree(curr, prop.toString(), pre, post, completePath);
      }
    }
    post(completePath, curr);
  } catch (e) {
    console.warn('failed:', e)
  }
}
