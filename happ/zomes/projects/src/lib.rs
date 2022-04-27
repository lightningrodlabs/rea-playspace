use std::collections::BTreeMap;

use hdk::prelude::*;
use holo_hash::{EntryHashB64, HeaderHashB64};
use tracing::{info};
mod project;

use project::Project;

entry_defs![
  PathEntry::entry_def(),
  Thing::entry_def(),
  Project::entry_def()
];

// Actual blob of data stored on the DHT
#[hdk_entry(id = "thing")]
#[derive(Clone)]
#[serde(rename_all = "camelCase")]
pub struct Thing {
  pub data: String,
}

// returned after successful write to DHT
#[derive(Serialize, Deserialize, Debug)]
pub struct AddOutput {
  header_hash: HeaderHashB64,
  entry_hash: EntryHashB64,
}

// Passed in from UI
#[derive(Serialize, Deserialize, Debug)]
pub struct ThingInput {
  path: String,
  data: String,
}

// Sent back to UI
#[derive(Clone, Serialize, Deserialize, Debug, Default, PartialEq)]
pub struct Content {
    name: String,
    data: String,
}

#[hdk_extern]
pub fn put_thing(input: ThingInput) -> ExternResult<AddOutput> {
  info!("putting thing with path {}", input.path.clone());
  let path = Path::try_from(input.path.clone())?;
  path.ensure()?;
  let thing = Thing{data: input.data};
  let header_hash = create_entry(&thing)?;
  let entry_hash = hash_entry(&thing)?;

  let anchor_hash = path.path_entry_hash()?;
  create_link(anchor_hash, entry_hash.clone(), LinkTag::new("data"))?;

  let output = AddOutput {
    header_hash: HeaderHashB64::from(header_hash),
    entry_hash: EntryHashB64::from(entry_hash)
  };

  Ok(output)
}

fn get_entry(path: &Path, tag: LinkTag) -> ExternResult<Option<Thing>> {
  let links = get_links(path.path_entry_hash()?, Some(tag))?;
  match links.into_iter().max_by(|x, y| x.timestamp.cmp(&y.timestamp)) {
    None => Ok(None),
    Some(link) => {
      match get(link.target, GetOptions::default())? {
        None => Ok(None),
        Some(element) => {
          match element.entry().to_app_option() {
            Ok(Some(entry)) => Ok(Some(entry)),
            _ => Ok(None),
          }
        }
      }
    }
  }  
}

fn build_tree(tree: &mut Tree<Content>, node: usize, path: Path) -> ExternResult<()>{
  // root.plan.p1-guid.process.pr-guid -> for each segment in path
  for path in path.children_paths()? {
    let v = path.as_ref();

    let data = match get_entry(&path, LinkTag::new("data"))? {
      Some(thing) => thing.data,
      None => "".into()
    };
    let val = Content {
      name: String::try_from(&v[v.len()-1])?,
      data: data
    };
    let idx = tree.insert(node, val);
    build_tree(tree, idx, path)?;
  }
  Ok(())
}

// Dead node marker
fn mark_tree_for_delete(tree: &mut Tree<Content>, to_delete: &mut Vec<bool>) -> ExternResult<()>{
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
fn prune_tree(tree: &mut Tree<Content>, pruned_tree: &mut Tree<Content>, to_delete: &mut Vec<bool>) -> ExternResult<()> {

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
fn reindex_tree(pruned_tree: Tree<Content>, reindexed_tree: &mut Tree<Content>) -> ExternResult<()> {
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

#[hdk_extern]
pub fn get_thing(path_str: String) -> ExternResult<Option<Tree<Content>>> {
  let root_path = Path::from(path_str.clone());

  let val = Content {
      name: String::from(path_str.clone()),
      data: match get_entry(&root_path, LinkTag::new("data"))? {
        Some(thing) => thing.data,
        None => "".into()
      }
  };

  let mut tree = Tree::new(val);
  build_tree(&mut tree, 0, root_path)?;
 
  let mut to_delete = vec![false; tree.tree.len()];
  mark_tree_for_delete(&mut tree, &mut to_delete)?;
  
  let mut pruned_tree: Tree<Content> = Tree { tree: vec![] };
  prune_tree(&mut tree, &mut pruned_tree, &mut to_delete)?;

  let mut reindexed_tree: Tree<Content> = Tree { tree: vec![] };
  reindex_tree(pruned_tree, &mut reindexed_tree)?;

  Ok(Some(reindexed_tree))
}

#[hdk_extern]
pub fn delete_thing(path_str: String) -> ExternResult<()> {
  info!("delete thing with path {}", path_str.clone());
  let path = Path::from(path_str.clone());
  // every update to a Thing will be linked to the Path terminus via 'data' link
  // tag. Get all Links with tag 'data'.

  let links: Vec<Link> = get_links(path.path_entry_hash()?, Some(LinkTag::new("data")))?;  
  // loop over the links  
  for link in links.into_iter() {
    // get the entry from the link
    let thing_entry_hash = link.target;
    let element = try_get_element(thing_entry_hash, GetOptions::default())?;

    // get the header hash from the entry
    let thing_header = element.header_address().clone();

    // use header hash to delete the entry
    let delete_input = DeleteInput {
        deletes_header_hash: thing_header,
        chain_top_ordering: ChainTopOrdering::Strict,
    };
    delete_entry(delete_input)?;

    // use the create header hash of the link to reference and delete the 'data' link.
    delete_link(link.create_link_hash)?;
    
    // This would be preferred as it would remove the need to prune
    // the tree before returning. Waiting back to hear from core.
    // delete_link(path.create_path_link_hash)?;
  }
  Ok(())
}
/// Attempts to get an element at the entry_hash and returns it
/// if the element exists
pub fn try_get_element(entry_hash: EntryHash, get_options: GetOptions) -> ExternResult<Element> {
  match get(entry_hash.clone(), get_options)? {
      Some(element) => Ok(element),
      None => Err(WasmError::Guest(format!(
          "There is no element at the hash {}",
          entry_hash
      ))),
  }
}

#[derive(Clone, Serialize, Deserialize, Debug, Default)]
pub struct Tree<T> 
where
    T: PartialEq
{
    pub tree: Vec<Node<T>>,
}

impl<T> Tree<T>
where
    T: PartialEq
{
    // create a new tree with a root node at index 0
    pub fn new(root: T) -> Self {
        Self {
            tree: vec![Node::new(0, None, root)]
        }
    }

    // inserts value into parent, return index of new node or 0 if parent doesn't exist
    pub fn insert(&mut self, parent: usize, val: T) -> usize {
        let idx = self.tree.len();
        match self.tree.get_mut(parent) {
            None => 0,
            Some(node) => {
                node.children.push(idx);
                self.tree.push(Node::new(idx, Some(parent), val));
                idx
            }
        }
    }
}

#[derive(Clone, Serialize, Deserialize, Debug, Default)]
pub struct Node<T>
where
    T: PartialEq
{
    idx: usize,
    val: T,
    parent: Option<usize>,
    children: Vec<usize>,
}

impl<T> Node<T>
where
    T: PartialEq
{
    fn new(idx: usize, parent: Option<usize>, val: T) -> Self {
        Self {
            idx,
            val,
            parent,
            children: vec![],
        }
    }
}


#[cfg(test)]
mod tests {
  use crate::{mark_tree_for_delete, Tree, Node, Content, prune_tree, reindex_tree};

  #[test]
  fn clean_tree_test() {
    // IF
    // build tree
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

    let node3: Node<Content> = Node {
      idx: 3, 
      val: Content { 
        name: "process".into(), 
        data: "".into() 
      }, 
      parent: Some(2), 
      children: [4].into() 
    };

    let node4: Node<Content> = Node {
      idx: 4, 
      val: Content {
        name: "1546e981-c94f-5641-744e-2fed040f5463".into(), 
        data: "".into() 
      }, 
      parent: Some(3), 
      children: [].into() 
    };

    let node5: Node<Content> = Node {
      idx: 5, 
      val: Content {
        name: "displayNode".into(), 
        data: "".into() 
      },
      parent: Some(2), 
      children: [6].into() 
    };

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

    // WHEN - call mark -> prune -> reindex tree
    let mut to_delete = vec![false; tree.tree.len()];
    mark_tree_for_delete(tree, &mut to_delete).ok();
    
    let mut pruned_tree: Tree<Content> = Tree { tree: vec![] };
    prune_tree(tree, &mut pruned_tree, &mut to_delete).ok();
  
    let mut reindexed_tree: Tree<Content> = Tree { tree: vec![] };
    reindex_tree(pruned_tree, &mut reindexed_tree).ok();

    // THEN - assert length is correct
    assert_eq!(reindexed_tree.tree.len(), 5);

    // TODO - deep compare reindexed tree with expected output
  }
}