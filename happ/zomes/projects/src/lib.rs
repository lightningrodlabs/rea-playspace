mod test;
mod data;
mod tree_clean;

//use hc_zome_profiles_types::Profile;
use hdk::{prelude::*, hash_path::path::Component};
use holo_hash::{EntryHashB64, ActionHashB64};
use tracing::{info};
use data::*;
use tree_clean::{mark_tree, reindex_tree, prune_tree};
use projects_core::{EntryTypes, LinkTypes, Thing};

#[hdk_extern]
pub fn init(_: ()) -> ExternResult<InitCallbackResult> {
    let mut functions = GrantedFunctions::new();
    functions.insert((ZomeName::new("projects"), FunctionName::new("remote_update_for_ui")));
    let grant = ZomeCallCapGrant {
        access: CapAccess::Unrestricted,
        functions,
        tag: "".into(),
    };
    create_cap_grant(grant.into())?;
    debug!("Init success");
    Ok(InitCallbackResult::Pass)
}

// /**
//  *  The UI will call this function when a change has been made when a CRUD operation has occured resulting to a change in UI state
//  */
#[hdk_extern]
pub fn ui_updated(message: String) -> ExternResult<()> {
  // get vec of all profiles
  let response: ZomeCallResponse = call(
      CallTargetCell::Local,
      ZomeName::new("profiles"), 
      FunctionName::new("get_all_profiles"), 
      None, 
      ()
  )?;

  let records: Vec<Record> =  match response {
    ZomeCallResponse::Ok(content)=> Ok(content),
    _ => Err(wasm_error!(WasmErrorInner::Guest("Network, Unauthorized, or Countersigning error".into())))
  }?.decode::<Vec<Record>>().unwrap();

  let mut all_agent_pub_keys: Vec<AgentPubKey> = Vec::new();
  for record in records {
    all_agent_pub_keys.push(record.signed_action.action().author().to_owned());
  }

  // Send a signal to all other agents
  let this_agent_pub_key: AgentPubKey = agent_info()?.agent_initial_pubkey;
  let other_agent_pub_keys: Vec<AgentPubKey> = all_agent_pub_keys.into_iter().filter(|x| *x != this_agent_pub_key).collect();

  for other in other_agent_pub_keys {
    let payload = SignalPayload {
        message: message.clone()
    };
    debug!("Called agent {:?}", other.clone());

    call_remote(
        other,
        ZomeName::new("projects"),
        FunctionName::new("remote_update_for_ui"),
        None,
        payload.clone()
    )?;
    debug!("Called remote_update_for_ui with payload {:?}", payload);
  }

  Ok(())
}

// // agents call this function in other cells. emit_signal will be handled by a signalCallback in frontend
#[hdk_extern]
pub fn remote_update_for_ui(payload: SignalPayload)  -> ExternResult<()> {
    emit_signal(payload.clone())?;
    debug!("External Call Recieved: update_for_ui with payload: {:?}", payload);
    Ok(())
}

#[hdk_extern]
pub fn put_thing(input: ThingInput) -> ExternResult<AddOutput> {
  info!("putting thing with path {}", input.path.clone());
  let path = Path::try_from(input.path.clone())?;
  let typed_path = path.clone().into_typed(ScopedLinkType::try_from(LinkTypes::Path)?);
  typed_path.ensure()?;
  let thing = Thing{data: input.data};
  let header_hash = create_entry(EntryTypes::Thing(thing.clone()))?;
  let entry_hash = hash_entry(&thing)?;

  let anchor_hash = path.path_entry_hash()?;
  create_link(
    anchor_hash, 
    entry_hash.clone(),
    LinkTypes::Data,
    ())?;

  let output = AddOutput {
    header_hash: ActionHashB64::from(header_hash),
    entry_hash: EntryHashB64::from(entry_hash)
  };

  Ok(output)
}

fn get_entry(path: &Path) -> ExternResult<Option<Thing>> {
  let links = get_links(path.path_entry_hash()?, LinkTypes::Data, None)?;
  match links.into_iter().max_by(|x, y| x.timestamp.cmp(&y.timestamp)) {
    None => Ok(None),
    Some(link) => {
      match get(link.target, GetOptions::default())? {
        None => Ok(None),
        Some(record) => {
          match record.entry().to_app_option() {
            Ok(Some(entry)) => Ok(Some(entry)),
            _ => Ok(None),
          }
        }
      }
    }
  }  
}

fn build_tree(tree: &mut Tree<Content>, node: usize, path: Path) -> ExternResult<()>{
  for child_path in path.into_typed(ScopedLinkType::try_from(LinkTypes::Path)?).children_paths()? {
    let v: &Vec<Component> = child_path.as_ref();

    let data = match get_entry(&child_path)? {
      Some(thing) => thing.data,
      None => "".into()
    };
    let val = Content {
      name: String::try_from(&v[v.len()-1]).map_err(|e| wasm_error!(e.into()))?,
      data: data
    };
    let idx = tree.insert(node, val);
    build_tree(tree, idx, child_path.into())?;
  }
  Ok(())
}

#[hdk_extern]
pub fn get_thing(path_str: String) -> ExternResult<Option<Tree<Content>>> {
  let root_path = Path::from(path_str.clone());
  let val = Content {
      name: String::from(path_str.clone()),
      data: match get_entry(&root_path)? {
        Some(thing) => thing.data,
        None => "".into()
      }
  };

  let mut tree = Tree::new(val);
  build_tree(&mut tree, 0, root_path)?;
  let mut to_delete = vec![false; tree.tree.len()];
  mark_tree(&mut tree, &mut to_delete)?;
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

  let links: Vec<Link> = get_links(path.path_entry_hash()?, LinkTypes::Data, None)?;  
  // loop over the links  
  for link in links.into_iter() {
    // get the entry from the link
    let thing_entry_hash = link.target;
    let record = try_get_record(thing_entry_hash.into_entry_hash().expect("Not an entryhash."), GetOptions::default())?;

    // get the header hash from the entry
    let thing_header = record.action_address().clone();

    // use header hash to delete the entry
    let delete_input = DeleteInput {
        deletes_action_hash: thing_header,
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
/// Attempts to get an record at the entry_hash and returns it
/// if the record exists
pub fn try_get_record(entry_hash: EntryHash, get_options: GetOptions) -> ExternResult<Record> {
  match get(entry_hash.clone(), get_options)? {
      Some(record) => Ok(record),
      None => Err(wasm_error!(WasmErrorInner::Guest(format!(
          "There is no record at the hash {}",
          entry_hash
      )))),
  }
}





