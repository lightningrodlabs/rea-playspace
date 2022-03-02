use hdk::prelude::*;

// TODO: update
// use hdk_crud::signals::create_receive_signal_cap_grant;

#[hdk_extern]
pub fn init(_: ()) -> ExternResult<InitCallbackResult> {
    init_handler()
}

pub fn init_handler() -> ExternResult<InitCallbackResult> {
    // TODO: update
    // create_receive_signal_cap_grant()?;

    Ok(InitCallbackResult::Pass)
}


#[hdk_extern]
pub fn first_zome_fn(_: ()) -> ExternResult<i32> {
    Ok(32)
}

entry_defs!(PathEntry::entry_def());
