use std::collections::BTreeMap;

use hdk::prelude::holo_hash::AgentPubKeyB64;
use hdk::prelude::*;

/// HreaModeler entry definition.
///
/// The hrea_modeler must include at a minimum the nickname of the agent
/// in order to be able to search for agents by nickname.
#[hdk_entry(id = "hrea_modeler", visibility = "public")]
#[derive(Clone)]
#[serde(rename_all = "camelCase")]
pub struct HreaModeler {
    pub nickname: String,
    pub fields: BTreeMap<String, String>,
}

/// Used as a return type of all functions.
#[derive(Clone, Serialize, Deserialize, Debug)]
#[serde(rename_all = "camelCase")]
pub struct AgentHreaModeler {
    pub agent_pub_key: AgentPubKeyB64,
    pub hrea_modeler: HreaModeler,
}

/// Input for the `search_hrea_modelers` zome function.
/// 
/// The nickname prefix must be of at least 3 characters.
#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct SearchHreaModelerInput {
    pub nickname_prefix: String,
}
