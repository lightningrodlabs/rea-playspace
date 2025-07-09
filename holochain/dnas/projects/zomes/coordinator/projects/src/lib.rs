mod types;

use hdk::prelude::*;
use tracing::{info};
use crate::types::{ThingInput, AuthoredThing};
use projects_integrity::{EntryTypes, LinkTypes, Thing};


#[hdk_extern]
pub fn put_thing(input: ThingInput) -> ExternResult<AuthoredThing> {
  info!("putting thing {} with path {}", input.data, input.path);

  let thing = Thing{data: input.data.clone()};

  let thing_hash = create_entry(&EntryTypes::Thing(thing))?;
  let all_things_path = Path::from("all_things");
  create_link(
    all_things_path.path_entry_hash()?,
    thing_hash.clone(),
    LinkTypes::AllThings,
    (),
  )?;

  let input_path = Path::from(input.path.clone()).typed(LinkTypes::PathedThings)?;
  create_link(
    input_path.path_entry_hash()?, 
    thing_hash.clone(),
    LinkTypes::PathedThings,
    ()
  )?;

  let record = get(thing_hash.clone(), GetOptions::local())?.ok_or(wasm_error!(
    WasmErrorInner::Guest("Could not find the newly created Thing".to_string())
  ))?;

  Ok(record.try_into()?)
}

// #[hdk_extern]
// pub fn get_thing_by_path(path_str: String) -> ExternResult<AuthoredThing> {
//   info!("getting thing with path {}", path_str.clone());
//   let path = Path::from(path_str.clone());

//   let val = Content {
//     name: String::from(path_str.clone()),
//     data: match get_path(path.clone().typed(LinkTypes::PathedThings)?)? {
//       Some(thing) => thing.data,
//       None => "".into()
//     }
//   };

//   let mut tree = Tree::new(val);
//   build_tree(&mut tree, 0, path.clone())?;
//   Ok(Some(tree))
// }

#[hdk_extern]
pub fn get_latest_thing(path_str: String) -> ExternResult<Option<AuthoredThing>> {
  let path = Path::from(path_str);
  let links = get_links(
    GetLinksInputBuilder::try_new(path.path_entry_hash()?, LinkTypes::PathedThings)?.build(),
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
        wasm_error!(WasmErrorInner::Guest(format!("Failed to deserialize Dino: {:?}",e)))
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
pub fn get_all_things() -> ExternResult<Vec<AuthoredThing>> {
  get_all_things_with_options(GetOptions::network())
}

#[hdk_extern]
pub fn get_all_things_local() -> ExternResult<Vec<AuthoredThing>> {
  get_all_things_with_options(GetOptions::local())
}

fn get_all_things_with_options(get_options: GetOptions) -> ExternResult<Vec<AuthoredThing>> {
  let path = Path::from("all_things");
  let links = get_links(
    GetLinksInputBuilder::try_new(path.path_entry_hash()?, LinkTypes::AllThings)?
      .get_options(get_options.strategy)
      .build(),
  )?;

  let mut out = Vec::with_capacity(links.len());
  for link in links {
    if let Ok(action_hash) = link.target.try_into() {
      let maybe_record = get::<ActionHash>(action_hash, get_options.clone())?;

      if let Some(thing) = maybe_record.map(TryInto::try_into).transpose()? {
        out.push(thing);
      }
    }
  }

  Ok(out)
}

#[hdk_extern]
pub fn delete_thing(original_thing_hash: ActionHash) -> ExternResult<ActionHash> {
  let path = Path::from("all_things");
  let links = get_links(
    GetLinksInputBuilder::try_new(path.path_entry_hash()?, LinkTypes::AllThings)?.build(),
  )?;
  for link in links {
    if let Some(hash) = link.target.into_action_hash() {
      if hash == original_thing_hash {
        delete_link(link.create_link_hash)?;
      }
    }
  }
  let links = get_links(
    GetLinksInputBuilder::try_new(path.path_entry_hash()?, LinkTypes::PathedThings)?.build(),
  )?;
  for link in links {
    if let Some(hash) = link.target.into_action_hash() {
      if hash == original_thing_hash {
        delete_link(link.create_link_hash)?;
      }
    }
  }
  delete_entry(original_thing_hash)
}

#[hdk_extern]
pub fn delete_thing_by_path(path_str: String) -> ExternResult<Vec<ActionHash>> {
  let path = Path::from(path_str);
  let links = get_links(
      GetLinksInputBuilder::try_new(path.path_entry_hash()?, LinkTypes::PathedThings)?.build(),
  )?;
  let mut out = Vec::with_capacity(links.len());
  for link in links {
    if let Some(hash) = link.target.into_action_hash() {
      delete_link(link.create_link_hash)?;

      let all_things_path = Path::from("all_things");
      let all_things_links = get_links(
        GetLinksInputBuilder::try_new(all_things_path.path_entry_hash()?, LinkTypes::AllThings)?.build(),
      )?;
      for link in all_things_links {
        if let Some(all_links_hash) = link.target.into_action_hash() {
          if hash == all_links_hash {
            delete_link(link.create_link_hash)?;
          }
        }
      }
      out.push(delete_entry(hash)?)
    }
  }
  Ok(out)
}

