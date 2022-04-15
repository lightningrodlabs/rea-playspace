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

  for path in path.children_paths()? {
      let v = path.as_ref();
      let val = Content {
          name: String::try_from(&v[v.len()-1])?,
          data: match get_entry(&path, LinkTag::new("data"))? {
            Some(thing) => thing.data,
            None => "".into()
          },
        };
      let idx = tree.insert(node, val);
      build_tree(tree, idx, path)?;
  }
  Ok(())
}

#[hdk_extern]
pub fn get_thing(path_str: String) -> ExternResult<Tree<Content>> {
  info!("getting thing with path {}", path_str.clone());
  let root_path = Path::from(path_str.clone());
    let val = Content {
        name: String::from(path_str),
        data: match get_entry(&root_path, LinkTag::new("data"))? {
          Some(thing) => thing.data,
          None => "".into()
        },
    };
    let mut tree = Tree::new(val);
    build_tree(&mut tree, 0, root_path)?;
    Ok(tree)
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