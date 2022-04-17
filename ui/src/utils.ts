import { RustNode, TreeNode } from "./types/holochain";

export const sleep100 = async () => {
  return new Promise((resolve) => setTimeout(resolve, 100))
}
