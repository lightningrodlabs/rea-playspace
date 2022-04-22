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