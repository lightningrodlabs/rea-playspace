import { RustNode, TreeNode } from "./types/holochain";

export const sleep100 = async () => {
  return new Promise((resolve) => setTimeout(resolve, 100))
}

// tweak this into the shape we want???
export function buildTree(tree: Array<RustNode>, node: RustNode): TreeNode {
  let t: TreeNode = { val: node.val, children: [] };
  for (const n of node.children) {
    t.children.push(buildTree(tree, tree[n]));
  }
  // console.log(JSON.stringify(t, null, 2));
  return t;
}