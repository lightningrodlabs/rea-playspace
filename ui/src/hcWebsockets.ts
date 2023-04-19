
import { AppAgentWebsocket } from '@holochain/client';
import { sleep100 } from './utils';

let appWs: AppAgentWebsocket;

export async function getAppWs(): Promise<AppAgentWebsocket> {
  if (appWs) {
    return appWs;
  } else {
    // TODO: We are assuming the new launcher takes care of the client config, but we could resurrect the variable
    appWs = await AppAgentWebsocket.connect("", "reaplayspace");
    while (!(appWs.appWebsocket.client.socket.readyState === appWs.appWebsocket.client.socket.OPEN)) {
      await sleep100();
    }
    appWs.appWebsocket.client.socket.addEventListener('close', () => {
      console.info('app websocket closed')
    })
    return appWs;
  }
}
