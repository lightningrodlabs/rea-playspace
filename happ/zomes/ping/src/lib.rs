use hdk::prelude::*;
use holo_hash::{AgentPubKeyB64};
use hc_zome_profiles_types::{AgentProfile};

entry_defs![
    Anchor::entry_def(),
    Path::entry_def()
];

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Payload {
    path: String,
    agent_pubkey: AgentPubKeyB64
}

#[hdk_extern]
pub fn init(_: ()) -> ExternResult<InitCallbackResult> {
    let mut functions = GrantedFunctions::new();
    functions.insert((zome_info()?.name, "remote_update_for_ui".into()));
    let grant = ZomeCallCapGrant {
        access: CapAccess::Unrestricted,
        functions,
        tag: "".into(),
    };
    create_cap_grant(grant)?;
    Ok(InitCallbackResult::Pass)
}

/**
 *  The UI will call this function when a change has been made when a CRUD operation has occured resulting to a change in UI state
 */
#[hdk_extern]
pub fn ui_updated(input_payload: String) -> ExternResult<()> {
    debug!("ui_updated called with payload: {}", input_payload.clone());
    
    // get vec of all profiles
    let player_response = call(
        CallTargetCell::Local,
        "profiles".into(), 
        "get_all_profiles".into(), 
        None, 
        ())?;
    
   let extern_players =  match player_response {
        ZomeCallResponse::Ok(content) => Ok(content),
        _ => Err(WasmError::Guest("Response is not agents".into())),
    }?;

    let players:Vec<AgentProfile> = extern_players.decode()?;

    // Send a signal to all other agents
    let this_agent_pub_key = agent_info()?.agent_initial_pubkey.into();
    let others: Vec<AgentProfile> = players.into_iter().filter(|x| x.agent_pub_key != this_agent_pub_key).collect();

    for other in others {
        let payload = Payload {
            path: input_payload.clone(),
            agent_pubkey: other.clone().agent_pub_key
        };
    
        debug!("signaling agent: {:?}", other);
        call_remote(
            other.agent_pub_key.into(),
            "ping".into(),
            "remote_update_for_ui".into(),
            None,
            payload.clone()
        )?;
        debug!("Called remote_update_for_ui with payload {:?}", payload);
    }

    Ok(())
}

// agents call this function in other cells. emit_signal will be handled by a signalCallback in frontend
#[hdk_extern]
pub fn remote_update_for_ui(payload: Payload)  -> ExternResult<()> {
    emit_signal(payload.clone())?;
    debug!("External Call Recieved: update_for_ui with payload: {:?}", payload);
    Ok(())
}