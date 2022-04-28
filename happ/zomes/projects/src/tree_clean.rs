use std::collections::BTreeMap;

use hdk::prelude::*;

use crate::data::*;
/**
 * This is a workaround to not being able to delete Path entries/links.
 */

// Dead node marker
pub fn mark_tree(tree: &mut Tree<Content>, to_delete: &mut Vec<bool>) -> ExternResult<()>{
  for node in tree.tree.clone().into_iter().rev() {
    if node.children.len() == 0 && node.val.data.eq("") {
      to_delete[node.idx] = true;
    }

    let mut are_children_deleted: bool =  true;
    for child in node.children.iter() {
      are_children_deleted = to_delete[*child] && are_children_deleted;
    }

    if are_children_deleted && node.val.data.eq("") && node.val.name != "root" {
      to_delete[node.idx] = true;
    }
  };
  Ok(())
}

// removed marked nodes
pub fn prune_tree(tree: &mut Tree<Content>, pruned_tree: &mut Tree<Content>, to_delete: &mut Vec<bool>) -> ExternResult<()> {

   // convert Vec<bool> to Vec<usize>
   let mut idx_to_delete: Vec<usize> = vec![];
   for (i, node) in to_delete.iter().enumerate() {
     if *node {
       idx_to_delete.push(i);
     }
   }
 
   // move non-deleted nodes to new tree
   // update the children of those nodes 
   for (idx, node) in to_delete.iter().enumerate() {
     // if current node to delete is false, move it to new tree
     if !*node {
       let mut node: Node<Content> = tree.tree[idx].clone();
       node.children.retain(|idx| !idx_to_delete.contains(idx));
       pruned_tree.tree.push(node);
     }
   }
  Ok(())
}

// update idx, parents and children
pub fn reindex_tree(pruned_tree: Tree<Content>, reindexed_tree: &mut Tree<Content>) -> ExternResult<()> {
  info!("Reindexing tree...");
  // K: old idx of node V: new idx of node
  // This map is populated as nodes get reindexed.
  // This map get used to update the children Vec of nodes.
  let mut idx_map: BTreeMap<usize, usize> = BTreeMap::new();

  let rev_index: Vec<usize> = (0..pruned_tree.tree.len()).rev().collect();
  let it = rev_index.iter().zip(pruned_tree.tree.iter().rev());
  // crawl through nodes backwards and get map of old and new idxs
  for (_, (i, node)) in it.enumerate() {
    // nodes idx and location in tree Vec are mismatched. Condition to reindex.
    if *i != node.idx {
      // insert map of index change
      idx_map.insert(node.idx, *i);
    }
  }

  // for each node, update the parent and children from mapped idxs
  // push onto reindexed_tree
  for node in pruned_tree.tree.iter() {
    let mut reindexed_node = node.clone();

    for entry in idx_map.iter() {

      // update idx
      if node.idx == *entry.0 {
        reindexed_node.idx = *entry.1;
      }

      // update children
      for child in node.children.iter() {
        if child == entry.0 {
          reindexed_node.children.retain(|c| c != entry.0);
          reindexed_node.children.push(*entry.1);
        }
      }

      // update parent
      if node.parent == Some(*entry.0) {
        reindexed_node.parent = Some(*entry.1);
      }
    }
    reindexed_tree.tree.push(reindexed_node);
  }
  
  reindexed_tree.tree.sort_by(|a, b| a.idx.cmp(&b.idx));
  info!("Reindexing tree complete.");
  Ok(())
}