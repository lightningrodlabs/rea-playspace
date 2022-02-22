//! ## hc_zome_hrea_modelers
//! 
//! HreaModeler zome for any Holochain app.
//! 
//! If you need to manage hrea_modeler (nickname, name, avatar, age and other useful personal information)
//! you can directly include this zome in your DNA.
//! 
//! Read about how to include both this zome and its frontend module in your application [here](https://holochain-open-dev.github.io/hrea_modeler).

use hdk::prelude::holo_hash::AgentPubKeyB64;
use hdk::prelude::*;

mod handlers;
mod utils;

use hc_zome_hrea_modelers_types::*;

entry_defs![PathEntry::entry_def(), HreaModeler::entry_def()];

/// Creates the hrea_modeler for the agent executing this call.
#[hdk_extern]
pub fn create_hrea_modeler(hrea_modeler: HreaModeler) -> ExternResult<AgentHreaModeler> {
    handlers::create_hrea_modeler(hrea_modeler)
}

/// Updates the hrea_modeler for the agent executing this call.
#[hdk_extern]
pub fn update_hrea_modeler(hrea_modeler: HreaModeler) -> ExternResult<AgentHreaModeler> {
    handlers::update_hrea_modeler(hrea_modeler)
}

/// From a search input of at least 3 characters, returns all the agents whose nickname starts with that prefix.
#[hdk_extern]
pub fn search_hrea_modelers(
    search_hrea_modelers_input: SearchHreaModelerInput,
) -> ExternResult<Vec<AgentHreaModeler>> {
    let agent_hrea_modelers = handlers::search_hrea_modelers(search_hrea_modelers_input.nickname_prefix)?;

    Ok(agent_hrea_modelers)
}

/// Returns the hrea_modeler for the given agent, if they have created it.
#[hdk_extern]
pub fn get_agent_hrea_modeler(agent_pub_key: AgentPubKeyB64) -> ExternResult<Option<AgentHreaModeler>> {
    let agent_hrea_modeler = handlers::get_agent_hrea_modeler(agent_pub_key)?;

    Ok(agent_hrea_modeler)
}

/// Returns the hrea_modeler for the given agents if they have created them.
///
/// Use this function if you need to get the hrea_modeler for multiple agents at the same time,
/// as it will be more performant than doing multiple `get_agent_hrea_modeler`.
#[hdk_extern]
pub fn get_agents_hrea_modeler(
    agent_pub_keys_b64: Vec<AgentPubKeyB64>,
) -> ExternResult<Vec<AgentHreaModeler>> {
    let agent_hrea_modelers = handlers::get_agents_hrea_modeler(agent_pub_keys_b64)?;

    Ok(agent_hrea_modelers)
}

/// Gets the hrea_modeler for the agent calling this function, if they have created it.
#[hdk_extern]
pub fn get_my_hrea_modeler(_: ()) -> ExternResult<Option<AgentHreaModeler>> {
    let agent_info = agent_info()?;

    let agent_hrea_modeler =
        handlers::get_agent_hrea_modeler(AgentPubKeyB64::from(agent_info.agent_initial_pubkey))?;

    Ok(agent_hrea_modeler)
}

/// Gets all the hrea_modeler that have been created in the network.
///
/// Careful! This will not be very performant in large networks.
/// In the future a cursor type functionality will be added to make this function performant.
#[hdk_extern]
pub fn get_all_hrea_modelers(_: ()) -> ExternResult<Vec<AgentHreaModeler>> {
    let agent_hrea_modelers = handlers::get_all_hrea_modelers()?;

    Ok(agent_hrea_modelers)
}
