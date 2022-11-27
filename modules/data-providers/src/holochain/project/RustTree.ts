import { TreeNode } from "./types";

export function BreadthFirst(nodes: TreeNode[], visitor: (node: TreeNode, idx: number) => void) {
  // Iterate over the RustNodes in breadth first order starting with node zero
  const visited = new Set<number>();
  const toVisit = [0];
  do {
    const currentIdx = toVisit.shift();
    const node = nodes[currentIdx];
    // If we have a node and we haven't visited it...
    if (node && !visited.has(currentIdx)) {
      if (node.idx != currentIdx) {
        console.warn(`For some reason, the current index ${currentIdx} does not match the node.idx ${node.idx}`);
      }
      // Append the children to the toVisit array to make sure we visit them.
      if (node.children) {
        toVisit.push(...node.children);
      }
      visitor(node, currentIdx)
    }
  } while (toVisit.length > 0);
};

export function DepthFirst(nodes: TreeNode[], visitor: (node: TreeNode, idx: number) => void) {
  // Iterate over the RustNodes in breadth first order starting with node zero
  const visited = new Set<number>();
  const toVisit = [0];
  do {
    const currentIdx = toVisit.shift();
    const node = nodes[currentIdx];
    // If we have a node and we haven't visited it...
    if (node && !visited.has(currentIdx)) {
      if (node.idx != currentIdx) {
        console.warn(`For some reason, the current index ${currentIdx} does not match the node.idx ${node.idx}`);
      }
      // Append the children to the toVisit array to make sure we visit them.
      if (node.children) {
        toVisit.unshift(...node.children);
      }
      visitor(node, currentIdx);
    }
  } while (toVisit.length > 0);
};