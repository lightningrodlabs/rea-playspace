import { HolochainClient } from '@holochain-open-dev/cell-client'
import { AppWebsocket, AdminWebsocket, CellId, AgentPubKey, RoleId  } from '@holochain/client'
import ZomeApi from './api/zomeApi'
import { APP_PORT, ADMIN_PORT, APP_ID } from './holochainConf'
import { sleep100 } from './utils'

// @ts-ignore
export const APP_WS_URL = `ws://localhost:${APP_PORT}`
// @ts-ignore
const ADMIN_WS_URL = `ws://localhost:${ADMIN_PORT}`

let appWs: AppWebsocket
let adminWs: AdminWebsocket
let holochainClient: HolochainClient
let agentPubKey: AgentPubKey
let cellId: CellId
let zomeApi: ZomeApi

export async function getHolochainClient() {
  if (holochainClient) {
    return holochainClient;
  }
  const client: HolochainClient = new HolochainClient(
    await getAppWs()
  );
  holochainClient = client;
  return client;
}

export async function getAdminWs(): Promise<AdminWebsocket> {
  if (adminWs) {
    return adminWs;
  } else {
    adminWs = await AdminWebsocket.connect(ADMIN_WS_URL)
    while (!(adminWs.client.socket.readyState === adminWs.client.socket.OPEN)) {
      sleep100();
    }
    adminWs.client.socket.addEventListener('close', () => {
      console.log('admin websocket closed')
    })
    return adminWs;
  }
}

export async function getAppWs(signalsHandler?: any): Promise<AppWebsocket> {
  if (appWs) {
    return appWs;
  } else {
    appWs = await AppWebsocket.connect(APP_WS_URL, undefined, signalsHandler)
    while (!(appWs.client.socket.readyState === appWs.client.socket.OPEN)) {
      await sleep100();
    }
    appWs.client.socket.addEventListener('close', () => {
      console.log('app websocket closed')
    })
    return appWs;
  }
}

export function getAgentPubKey(): AgentPubKey {
  return agentPubKey
}

export function setAgentPubKey(setAs) {
  agentPubKey = setAs
}

export function getCellId() {
  return cellId;
}

export function setCellId(setAs) {
  cellId = setAs
}

export function getZomeApi() {
  return zomeApi;
}

export function setZomeApi(setAs) {
  zomeApi = setAs
}