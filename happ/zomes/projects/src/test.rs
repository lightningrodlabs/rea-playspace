#[cfg(test)]
mod tests {
  use crate::{mark_tree_for_delete, Tree, Node, Content, prune_tree, reindex_tree};

  /**
   * Tests the output of mark_tree, prune_tree and reindex_tree when get_thing is called.
   */
  #[test]
  fn clean_tree_test() {
    // IF
    // Create tree. Nodes 4 and 6 are dead nodes. Nodes 3 and 5 are dead branches. All 4 should be removed
    let node0: Node<Content> = Node { 
        idx: 0, 
        val: Content { 
          name: "root".into(), 
          data: "{\"planId\":\"91280020-277b-9cb8-0c2f-719aac942d94\"}".into() 
        }, 
        parent: None, 
        children: [1, 7].into() 
      };

    let node1: Node<Content> = Node { 
      idx: 1, 
      val: Content { 
        name: "plan".into(), 
        data: "".into() 
      }, 
      parent: Some(0), 
      children: [2].into() 
    };
    
    let node2: Node<Content> = Node { 
      idx: 2, 
      val: Content { 
        name: "91280020-277b-9cb8-0c2f-719aac942d94".into(), 
        data: "{\"id\":\"91280020-277b-9cb8-0c2f-719aac942d94\",\"created\":\"2022-04-22T22:17:58.418Z\",\"name\":\"Default Plan Name\"}".into()
        }, 
        parent: Some(1), 
        children: [3, 5].into() 
    };

    // Dead branch. Once dead node is removed, this becomes a dead node.
    let node3: Node<Content> = Node {
      idx: 3, 
      val: Content { 
        name: "process".into(), 
        data: "".into() 
      }, 
      parent: Some(2), 
      children: [4].into() 
    };

    // Dead node
    let node4: Node<Content> = Node {
      idx: 4, 
      val: Content {
        name: "1546e981-c94f-5641-744e-2fed040f5463".into(), 
        data: "".into() 
      }, 
      parent: Some(3), 
      children: [].into() 
    };

    // Dead branch. Once dead node is removed, this becomes a dead node.
    let node5: Node<Content> = Node {
      idx: 5, 
      val: Content {
        name: "displayNode".into(), 
        data: "".into() 
      },
      parent: Some(2), 
      children: [6].into() 
    };

    // Dead node
    let node6: Node<Content> = Node {
      idx: 6, 
      val: Content {
        name: "c052fe2e-af10-545d-ab80-196874da64f2".into(),
        data: "".into()
      }, 
      parent: Some(5), 
      children: [].into() 
    };

    let node7: Node<Content> = Node {
      idx: 7, 
      val: Content { 
        name: "processSpecification".into(),
        data: "".into() 
      }, 
      parent: Some(0), 
      children: [8].into() 
    };
    let node8: Node<Content> = Node {
      idx: 8, 
      val: Content {
         name: "db3c3466-b6ed-5be4-127e-1516e332ec49".into(), 
         data: "{\"id\":\"db3c3466-b6ed-5be4-127e-1516e332ec49\",\"created\":\"2022-04-22T22:18:17.574Z\",\"name\":\"boil\"}".into() 
      }, 
      parent: Some(7), 
      children: [].into() 
    };

    let tree = &mut Tree {
      tree: vec![node0, node1, node2, node3, node4, node5, node6, node7, node8],
    };

    // WHEN - mark -> prune -> reindex tree
    let mut to_delete = vec![false; tree.tree.len()];
    mark_tree_for_delete(tree, &mut to_delete).ok();
    
    let mut pruned_tree: Tree<Content> = Tree { tree: vec![] };
    prune_tree(tree, &mut pruned_tree, &mut to_delete).ok();
  
    let mut reindexed_tree: Tree<Content> = Tree { tree: vec![] };
    reindex_tree(pruned_tree, &mut reindexed_tree).ok();

    // THEN - total number of nodes is correct
    assert_eq!(reindexed_tree.tree.len(), 5);

    // idx of nodes are correct
    for (i, node) in reindexed_tree.tree.iter().enumerate() {
      println!("{}: {:?}", i, node);
      assert_eq!(i, node.idx);
    }
  }
}