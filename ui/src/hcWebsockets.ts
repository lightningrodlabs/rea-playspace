
import { HolochainClient } from '@holochain-open-dev/cell-client'
import { AdminWebsocket, AgentPubKey, AppSignal, AppSignalCb, AppWebsocket, CellId } from '@holochain/client'
import ZomeApi from './api/zomeApi'
import getDataStore from './data/DataStore'
import { APP_PORT, ADMIN_PORT } from './holochainConf'
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

const signalCb: AppSignalCb =  async (signal: AppSignal) => {
  console.log('signal', signal);
  const store = getDataStore();
  await store.fetchFromSignal(signal.data.payload.path);
  // trigger UI to update in Home.tsx
}

export async function getHolochainClient() {
  if (holochainClient) {
    return holochainClient;
  }
  
  const client = new HolochainClient(await getAppWs(signalCb));
  client.addSignalHandler(signalCb);
  holochainClient = client;
  return client;
}

export async function getAppWs(signalsHandler?: AppSignalCb): Promise<AppWebsocket> {
  if (appWs) {
    return appWs;
  } else {
    console.log('signalHandler', signalsHandler);
    appWs = await AppWebsocket.connect(APP_WS_URL, 12000, signalsHandler);
    console.log('appWs', appWs);
    while (!(appWs.client.socket.readyState === appWs.client.socket.OPEN)) {
      await sleep100();
    }
    appWs.client.socket.addEventListener('close', () => {
      console.log('app websocket closed')
    })
    return appWs;
  }
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