import { AppWebsocket, AdminWebsocket, CellId, AgentPubKey  } from '@holochain/client'
import ZomeApi from './api/zomeApi'
import { APP_PORT, ADMIN_PORT } from './holochainConf'

// export for use by holochainMiddleware (redux)
// @ts-ignore
export const APP_WS_URL = `ws://localhost:${APP_PORT}`
// @ts-ignore
const ADMIN_WS_URL = `ws://localhost:${ADMIN_PORT}`

let appWs: AppWebsocket
let adminWs: AdminWebsocket
let agentPubKey: AgentPubKey
let cellId: CellId
let zomeApi: ZomeApi

export async function getAdminWs(): Promise<AdminWebsocket> {
  if (adminWs) {
    return adminWs
  } else {
    adminWs = await AdminWebsocket.connect(ADMIN_WS_URL)
    setInterval(() => {
      if (adminWs.client.socket.readyState === adminWs.client.socket.OPEN) {
        adminWs.listDnas()
      }
    }, 60000)
    adminWs.client.socket.addEventListener('close', () => {
      console.log('admin websocket closed')
    })
    return adminWs
  }
}

export async function getAppWs(signalsHandler?: any): Promise<AppWebsocket> {
  if (appWs) {
    return appWs
  } else {
    // undefined is for default request timeout
    appWs = await AppWebsocket.connect(APP_WS_URL, undefined, signalsHandler)
    setInterval(() => {
      if (appWs.client.socket.readyState === appWs.client.socket.OPEN) {
        appWs.appInfo({
          installed_app_id: 'rea_playspace'
        })
      }
      // break from setInterval once data acquired
    }, 60000)
    appWs.client.socket.addEventListener('close', () => {
      console.log('app websocket closed')
    })
    return appWs
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