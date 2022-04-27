import { RustNode } from "../../types/holochain";

export interface PathedData {
  id?: string;
  get path(): string;
}

export function getParentPath(path: string): string {
  return path.split('.').slice(0, -1).join('.');
}

export function getLastPart(path: string): string {
  return path.split('.').at(-1);
}

export function getRustNodePath(idx: number, nodes: RustNode[]): string {
  const parts: string[] = [];

  let name = nodes[idx].val.name;
  parts.unshift(name);
  let parent = nodes[idx].parent;
  while (parent !== null) {
    parts.unshift(nodes[parent].val.name);
    parent = nodes[parent].parent;
  }
  return parts.join('.');
}