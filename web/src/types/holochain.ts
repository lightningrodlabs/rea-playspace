import { HeaderHashB64 } from "@holochain-open-dev/core-types"
import { HoloHashB64 } from "@holochain/client"

// container for a set things. Only 1 to begin with
export interface Project {
  id: String,
  name: String
}

export interface Thing {
  data: string
}

// Maps to AddOutput and NewProjectOutput structs
export interface AddOutput {
  header_hash: HoloHashB64,
  entry_hash: HoloHashB64
}

export interface NewProjectOutput {
  header_hash: HoloHashB64,
  entry_hash: HoloHashB64
}

export interface UpdateProjectInput {
  original_header_hash: HeaderHashB64,
  updated_project: Project
}

export interface ThingInput {
  path: String,
  data: String
}

export interface Node<T> {
  idx: number,
  val: T,
  parent: number | null,
  children: number[],
}
export interface Tree<T> {
  tree: Node<T>[]
}

export interface Content {
  name: string,
  data: string,
}

export enum action {
  work,
  accept,
  use
}