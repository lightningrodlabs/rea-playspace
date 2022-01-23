use hdk::prelude::*;

use hdk_crud::signals::create_receive_signal_cap_grant;

#[hdk_extern]
pub fn init(_: ()) -> ExternResult<InitCallbackResult> {
    init_handler()
}

pub fn init_handler() -> ExternResult<InitCallbackResult> {
    create_receive_signal_cap_grant()?;

    Ok(InitCallbackResult::Pass)
}

entry_defs!(Path::entry_def());
