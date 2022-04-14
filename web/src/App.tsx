import React, { useEffect, useState } from "react";
import "@shoelace-style/shoelace/dist/themes/light.css";
import { setBasePath } from "@shoelace-style/shoelace/dist/utilities/base-path";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/layout/Header";
import { APP_ID, APP_PORT } from './holochainConf';
import {  AppWebsocket, InstalledCell } from '@holochain/client';
import { HashToString, sleep100 } from "./utils";
import HoloService from "./service";
import NewResourceSpecification from "./NewResourceSpecification";
import NewProcessSpecification from "./components/knowledge/processSpecification/NewProcessSpecification";
import Home from "./Home";
import NewAgent from "./components/knowledge/agents/NewAgent";

// const ADMIN_WS_URL = `ws://localhost:${ADMIN_PORT}`;
const APP_WS_URL = `ws://localhost:${APP_PORT}`;

setBasePath(
  "https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.0.0-beta.70/dist/"
);

interface Props {}

const App: React.FC<Props> = () => {
  const [service, setService]= useState<HoloService>();
  const [loading, setLoading] = useState(true);

  const init = async () => {
    const appWs = await AppWebsocket.connect(APP_WS_URL);
    appWs.client.socket.addEventListener('close', () => {
      console.log('app websocket closed');
    });

    // check every 100ms for ready connection. Proceed when ready
    while (!(appWs.client.socket.readyState === appWs.client.socket.OPEN)) {
        await sleep100();
    }

    const app_info = await appWs.appInfo({ installed_app_id: APP_ID });
    const cell_data: InstalledCell = app_info.cell_data[0];
    setService(new HoloService(appWs, cell_data, cell_data.cell_id[1]));
    setLoading(false);
  };
  
  useEffect(() => {
    init();
  }, []);

  const Main = () => {
    if (loading) {
      return (<p>"Loading..."</p>);
    }
    return (
      <BrowserRouter>
        <div className="container">
          <Header name={HashToString(service.agentPubKey)} />
          <div className="below-header">
            {/* <LeftScreenNavMenu /> */}
            
            <div className="main-panel">
                <Routes>  
                <Route
                    path="/"
                    element={<Home myAgentId={HashToString(service.agentPubKey)} service={service}/>}>
                  </Route>

                  <Route
                    path="/agents/new"
                    element={<NewAgent service={service}/>}
                  />
                  <Route
                    path="/resources/new"
                    element={<NewResourceSpecification service={service}/>}
                  />
                  <Route
                    path="/processes/new"
                    element={<NewProcessSpecification service={service}/>}
                  />
                </Routes>
            </div>
          </div>
        </div>
      </BrowserRouter>
    );
  }

  return (
    <Main />
  );
};

export default App;