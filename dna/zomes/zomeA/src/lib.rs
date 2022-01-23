use hdk::prelude::*;
use holo_hash::{AgentPubKeyB64, HeaderHashB64};

use hdk_crud::{
    retrieval::{fetch_links::FetchLinks, get_latest_for_entry::GetLatestEntry},
    signals::{create_receive_signal_cap_grant, ActionSignal},
};

#[hdk_extern]
pub fn init(_: ()) -> ExternResult<InitCallbackResult> {
    init_handler()
}

pub fn init_handler() -> ExternResult<InitCallbackResult> {
    create_receive_signal_cap_grant()?;

    Ok(InitCallbackResult::Pass)
}

entry_defs!(Path::entry_def());
