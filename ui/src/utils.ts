/**
 * Helper to create non-blocking poll loops.
 */
export const sleep100 = async () => {
  return new Promise((resolve) => setTimeout(resolve, 100))
}

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
    if (unfiltered[key] != undefined && unfiltered[key] != '') {
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
