/**
 * Helper to create non-blocking poll loops.
 */
export const sleep100 = async () => {
  return new Promise((resolve) => setTimeout(resolve, 100))
}
