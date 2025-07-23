mod types;

use hdk::prelude::*;
use crate::types::{ThingInput, AuthoredThing, Content, Collection};
use projects_integrity::{EntryTypes, LinkTypes, Thing};

#[hdk_extern]
pub fn put_thing(input: ThingInput) -> ExternResult<AuthoredThing> {
  let tree_path = Path::from(input.path.clone()).typed(LinkTypes::Tree)?;
  let _ = tree_path.ensure();

  let thing = Thing{data: input.data.clone()};
  let thing_hash = create_entry(&EntryTypes::Thing(thing))?;

  create_link(
    tree_path.path_entry_hash()?,
    thing_hash.clone(),
    LinkTypes::Leaf,
    ()
  )?;

  let record = get(thing_hash.clone(), GetOptions::local())?.ok_or(wasm_error!(
    WasmErrorInner::Guest("Could not find the newly created Thing".to_string())
  ))?;

  Ok(record.try_into()?)
}

#[hdk_extern]
pub fn delete_thing(path_str: String) -> ExternResult<Vec<ActionHash>> {
  let path = Path::from(path_str).typed(LinkTypes::Tree)?;
  let links = get_links(
      GetLinksInputBuilder::try_new(path.path_entry_hash()?, LinkTypes::Leaf)?.build(),
  )?;
  let mut out = Vec::with_capacity(links.len());
  for link in links {
    if let Some(hash) = link.target.into_action_hash() {
      delete_link(link.create_link_hash)?;
      out.push(delete_entry(hash)?)
    }
  }
  Ok(out)
}

#[hdk_extern]
pub fn get_thing(path_str: String) -> ExternResult<Option<AuthoredThing>> {
  let path = Path::from(path_str).typed(LinkTypes::Tree)?;
  get_latest_thing_from_path(path)
}

pub fn get_latest_thing_from_path(path: TypedPath) -> ExternResult<Option<AuthoredThing>> {
  let links = get_links(
    GetLinksInputBuilder::try_new(path.path_entry_hash()?, LinkTypes::Leaf)?.build(),
  )?;
  let latest_link = links
    .into_iter()
    .max_by(|link_a, link_b| link_a.timestamp.cmp(&link_b.timestamp));

  let latest_thing_record = match latest_link {
    Some(link) => {
      let latest_thing_hash = link.target
      .clone()
      .into_action_hash()
      .ok_or(wasm_error!(WasmErrorInner::Guest(
        "No action hash associated with link".to_string()
      )))?;
      get(latest_thing_hash, GetOptions::network())?
    },
    None => None
  };

  let maybe_authored_thing = match latest_thing_record {
    Some(record) => {
      let maybe_thing = record.entry.to_app_option().map_err(|e| {
        wasm_error!(WasmErrorInner::Guest(format!("Failed to deserialize Thing: {:?}",e)))
      })?;
      return match maybe_thing {
        Some(thing) => Ok(Some(AuthoredThing {
          thing,
          author: record.action().author().clone(),
          address: record.action_address().clone(),
        })),
        None => Ok(None),
      }
    },
    None => Ok(None)
  };

  maybe_authored_thing
}

#[hdk_extern]
pub fn get_all_children(path_str: String) -> ExternResult<Collection<Content<AuthoredThing>>> {
  get_all_children_with_options(path_str, GetOptions::network())
}

#[hdk_extern]
pub fn get_all_children_local(path_str: String) -> ExternResult<Collection<Content<AuthoredThing>>> {
  get_all_children_with_options(path_str, GetOptions::local())
}

fn get_all_children_with_options(path_str: String, get_options: GetOptions) -> ExternResult<Collection<Content<AuthoredThing>>> {

  let path: TypedPath = Path::from(path_str.clone()).typed(LinkTypes::Tree)?;

  let children_paths = path.children_paths()?;
  let count = children_paths.len();
  let mut data = Vec::with_capacity(count);
  let mut log = Vec::with_capacity(count * 3);
  for path in children_paths {
    let current_path: &Vec<Component> = path.as_ref();
    let name = String::try_from(&current_path[current_path.len()-1])
      .map_err(|e| wasm_error!(WasmErrorInner::Guest(e.into())))?;
    // log.push(format!("getting child {:?}", path.clone()));
    if let Ok(Some(authored_thing)) = get_latest_thing_from_path(path.clone()) {
      // log.push(format!("have authored thing {:?}", authored_thing));
      data.push(Content{name, data: authored_thing});
    }
  }
  Ok(Collection{root: path_str.clone(), count, data, log})
}
