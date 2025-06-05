import { HoloHashB64, ActionHash } from "@holochain/client"

// container for a set things. Only 1 to begin with
export interface Project {
  id: string,
  name: string
};

// Maps to AddOutput and NewProjectOutput structs
export interface AddOutput {
  header_hash: HoloHashB64,
  entry_hash: HoloHashB64
};

export interface NewProjectOutput {
  header_hash: HoloHashB64,
  entry_hash: HoloHashB64
};

export interface UpdateProjectInput {
  original_header_hash: ActionHash,
  updated_project: Project
};

export interface ThingInput {
  path: string,
  data: string
};

export type Content = {
  name: string,
  data: null | string
};

export type TreeNode = {
  idx: number;
  parent?: null | number;
  children: Array<number>;
  val: Content;
};
