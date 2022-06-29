mod test;
mod data;
mod tree_clean;

use hdk::{prelude::*, hash_path::path::Component};
use holo_hash::{EntryHashB64, HeaderHashB64};
use tracing::{info};
use data::*;
use tree_clean::{mark_tree, reindex_tree, prune_tree};

entry_defs![
  PathEntry::entry_def(),
  Thing::entry_def()
];

#[hdk_extern]
pub fn put_thing(input: ThingInput) -> ExternResult<AddOutput> {
  info!("putting thing with path {}", input.path.clone());
  let path = Path::try_from(input.path.clone())?;
  path.ensure()?;
  let thing = Thing{data: input.data};
  let header_hash = create_entry(&thing)?;
  let entry_hash = hash_entry(&thing)?;

  let anchor_hash = path.path_entry_hash()?;
  create_link(
    anchor_hash, 
    entry_hash.clone(),
    HdkLinkType::Any,
    LinkTag::new("data"))?;

  let output = AddOutput {
    header_hash: HeaderHashB64::from(header_hash),
    entry_hash: EntryHashB64::from(entry_hash)
  };

  Ok(output)
}

fn get_entry(path: &Path, tag: LinkTag) -> ExternResult<Option<Thing>> {
  debug!("getting entry...");
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

fn children_pathz(path: Path) -> ExternResult<Vec<Path>> {
  let children = path.children()?;
  let components: ExternResult<Vec<Option<Component>>> = children
      .into_iter()
      .map(|link| {
          let component_bytes = &link.tag.0[..];
          warn!("bytes: {:?}", component_bytes.clone());
          if component_bytes.is_empty() {
              Ok(None)
          } else {
              let vec_bytes = component_bytes.to_vec();
              warn!("bytes to vec: {:?}", vec_bytes);
              let unsafe_bytes = UnsafeBytes::from(vec_bytes);
              warn!("unsafeBytes: {:?}", unsafe_bytes);
              let serialized_bytes = SerializedBytes::from(unsafe_bytes);
              warn!("Serialized Bytes: {:?}", serialized_bytes);
              Ok(Some(
                serialized_bytes.try_into().map_err(WasmError::Serialize)?      
              ))
          }
      })
      .collect();
  warn!("made it here: {:?}", components.clone());
  Ok(components?
      .into_iter()
      .map(|maybe_component| {
          let mut new_path = path.clone();
          debug!("new_path: {:?}", new_path.clone());
          if let Some(component) = maybe_component {
              debug!("append component");
              new_path.append_component(component);
              debug!("appended path: {:?}", new_path.clone());
          }
          new_path
      })
      .collect()
    )
}

fn build_tree(tree: &mut Tree<Content>, node: usize, path: Path) -> ExternResult<()>{
  debug!("path: {:?}", path.path_entry()?);
  match children_pathz(path.clone()) {
    Ok(path) => debug!("path: {:?}", path),
    Err(err) => error!("bad path or something: {}", err),
  }

  debug!("Building tree at node: {}, tree: {:?}, path: {:?}", &node, tree.clone(), path.clone());
  for child_path in children_paths(path.clone())? {
    let v: &Vec<Component> = child_path.as_ref();

    let data = match get_entry(&child_path, LinkTag::new("data"))? {
      Some(thing) => {
        debug!("got thing: {:?}", thing.clone());
        thing.data
      },
      None => "".into()
    };
    debug!("data: {:?}", data.clone());
    let val = Content {
      name: String::try_from(&v[v.len()-1])?,
      data: data
    };
    debug!("val in build tree: {:?}", val.clone());
    let idx = tree.insert(node, val);
    build_tree(tree, idx, child_path)?;
  }
  debug!("done building tree");
  Ok(())
}

#[hdk_extern]
pub fn get_thing(path_str: String) -> ExternResult<Option<Tree<Content>>> {
  debug!("get thing with path: {}", path_str.clone());
  let root_path = Path::from(path_str.clone());
  let val = Content {
      name: String::from(path_str.clone()),
      data: match get_entry(&root_path, LinkTag::new("data"))? {
        Some(thing) => thing.data,
        None => "".into()
      }
  };
  debug!("val: {:?}", val.clone());

  let mut tree = Tree::new(val);
  build_tree(&mut tree, 0, root_path)?;
  debug!("built tree?");
  debug!("tree: {:?}", tree.clone());
  let mut to_delete = vec![false; tree.tree.len()];
  mark_tree(&mut tree, &mut to_delete)?;
  debug!("to_delete: {:?}", to_delete);
  let mut pruned_tree: Tree<Content> = Tree { tree: vec![] };
  prune_tree(&mut tree, &mut pruned_tree, &mut to_delete)?;
  debug!("pruned_tree: {:?}", pruned_tree.clone());
  let mut reindexed_tree: Tree<Content> = Tree { tree: vec![] };
  reindex_tree(pruned_tree, &mut reindexed_tree)?;
  
  debug!("reindexed_tree: {:?}", reindexed_tree);
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
    let element = try_get_element(thing_entry_hash.into_entry_hash().expect("Not an entryhash."), GetOptions::default())?;

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





