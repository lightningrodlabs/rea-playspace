import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { getAgentPubKey, getAppWs, getZomeApi, setAgentPubKey, setCellId, setZomeApi } from './hcWebsockets';
import { sleep100 } from './utils';
import { APP_ID } from './holochainConf';
import ZomeApi from './api/zomeApi';

getAppWs().then(async(appWs)=> {
  appWs.client.socket.addEventListener('close', () => {
    console.log('app websocket closed');
  });

  const app_info = await appWs.appInfo({ installed_app_id: APP_ID });

  const [_dnaHash, agentPubKey] = app_info.cell_data[0].cell_id;
  setAgentPubKey(agentPubKey);
  setCellId(app_info.cell_data[0].cell_id);
  setZomeApi(new ZomeApi(appWs));
  
  ReactDOM.render(
    <App />,
    document.getElementById('root')
  );
});

