import { RustNode, TreeNode } from "./types/holochain";

export const sleep100 = async () => {
  return new Promise((resolve) => setTimeout(resolve, 100))
}

// export function HashToString(buff: Uint8Array): string {
//   return buff.reduce((prev: string, curr: number) => {
//     return prev + curr.toString(16).padStart(2, '0');
//   }, '');
// }

// export function StringToHash(s: string): Uint8Array {
//   const b = new Uint8Array(Math.ceil(s.length/2));
//   for (let i = 0; i < b.byteLength; i++) {
//     b[i] = parseInt(s.slice(i*2,(i*2)+2),16);
//   }
//   return b;
// }

// tweak this into the shape we want???
export function buildTree(tree: Array<RustNode>, node: RustNode): TreeNode {
  let t: TreeNode = { val: node.val, children: [] };
  for (const n of node.children) {
    t.children.push(buildTree(tree, tree[n]));
  }
  console.log(JSON.stringify(t, null, 2));
  return t;
}