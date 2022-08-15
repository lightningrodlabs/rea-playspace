/**
 * PathedData interface, provides the basic interface for all objects in the tree
 */
export interface PathedData {
  id?: string;
  get path(): string;
}

// HELPER FUNCTIONS

export function getParentPath(path: string): string {
  return path.split('.').slice(0, -1).join('.');
}

export function getLastPart(path: string): string {
  return path.split('.').at(-1);
}

export function getAlmostLastPart(path: string): string {
  return path.split('.').at(-2);
}
