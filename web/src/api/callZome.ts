import { AppWebsocket } from "@holochain/client";
import { getAgentPubKey, getCellId } from "../hcWebsockets";

  export async function callZome(appWs: AppWebsocket, zome: string, fn_name: string, payload: any): Promise<any> {

    return appWs.callZome({
      cap_secret: null,
      cell_id: getCellId(),
      zome_name: zome,
      fn_name: fn_name,
      payload: payload,
      provenance: getAgentPubKey()
    })
  }