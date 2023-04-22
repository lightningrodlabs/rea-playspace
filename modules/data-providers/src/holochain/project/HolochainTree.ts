import { constructTreeAtPath, ModelKinds, Pathed, PathedTreeNode, PathFunctor, TreeDefinition } from "../../WithPath";
import { TreeNode } from "./HolochainTypes";

export function BreadthFirst(
  nodes: TreeNode[],
  visitor: (node: TreeNode, idx: number) => void
) {
  // Iterate over the RustNodes in breadth first order starting with node zero
  const visited = new Set<number>()
  const toVisit = [0]
  do {
    const currentIdx = toVisit.shift()
    if (currentIdx !== undefined && Number.isFinite(currentIdx)) {
      const node = nodes[currentIdx]
      // If we have a node and we haven't visited it...
      if (node && !visited.has(currentIdx)) {
        if (node.idx != currentIdx) {
          console.warn(`For some reason, the current index ${currentIdx} does not match the node.idx ${node.idx}`)
        }
        // Append the children to the toVisit array to make sure we visit them.
        if (node.children) {
          toVisit.push(...node.children)
        }
        visitor(node, currentIdx)
      }
    }
  } while (toVisit.length > 0)
}

export function DepthFirst(
  nodes: TreeNode[],
  visitor: (node: TreeNode, idx: number) => void
) {
  // Iterate over the RustNodes in breadth first order starting with node zero
  const visited = new Set<number>()
  const toVisit = [0]
  do {
    const currentIdx = toVisit.shift()
    if (currentIdx !== undefined && Number.isFinite(currentIdx)) {
      const node = nodes[currentIdx]
      // If we have a node and we haven't visited it...
      if (node && !visited.has(currentIdx)) {
        if (node.idx != currentIdx) {
          console.warn(`For some reason, the current index ${currentIdx} does not match the node.idx ${node.idx}`)
        }
        // Append the children to the toVisit array to make sure we visit them.
        if (node.children) {
          toVisit.unshift(...node.children)
        }
        visitor(node, currentIdx)
      }
    }
  } while (toVisit.length > 0)
}

/**
 * Non-recursive path resolver for the TreeNodes
 */
export function getTreeNodePath(
  nodes: TreeNode[],
  idx: number
): string {
  const parts: string[] = []
  const name = nodes[idx].val.name
  parts.unshift(name)
  let parent = nodes[idx].parent
  while (parent != undefined && Number.isFinite(parent)) {
    parts.unshift(nodes[parent].val.name)
    parent = nodes[parent].parent
  }
  return parts.join('.')
}

/**
 * Parse the tree from the zome's TreeNode[] into our path addressible struct.
 *
 * In the most basic case, we will just fetch 'root'.
 * That will return every object in the 'tree'
 * So we start with the root node, and progress through all of it's branches
 * through to it's children.
 *
 * In the case of fetching a path 'root.c.1`, will start at that point with
 * no prior data to fill in the data for the root, for c, of for any other of
 * c's descendents besides 1. We start at 'root.c.1' and move towards it's
 * children.
 */
export function parseTree<T>(
  treeDefinition: TreeDefinition,
  nodes: TreeNode[],
  modelKinds: ModelKinds
): PathedTreeNode<T> {
  // New tree
  const tree = {};
  BreadthFirst(nodes, (node, idx) => {
    // Parse out the data from the node
    const { name, data: serializedData } = node.val
    const data = (serializedData && serializedData !== '') ? JSON.parse(serializedData): {}
    const path = getTreeNodePath(nodes, idx)
    constructTreeAtPath(tree, data, name, path, treeDefinition, modelKinds)
  });
  return tree;
}