import React, { useEffect, useState } from "react";
import "@shoelace-style/shoelace/dist/themes/light.css";
import { setBasePath } from "@shoelace-style/shoelace/dist/utilities/base-path";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/layout/Header";
import LeftScreenNavMenu from "./components/layout/LeftScreenNavMenu";
import { APP_ID, APP_PORT } from './holochainConf';
import {  AppWebsocket, InstalledCell } from '@holochain/client';
import Knowledge from "./routes/Knowledge";
import Plan from "./routes/Plan";
import Observation from "./routes/Observation";
import ResourceSpecification from "./components/knowledge/resourceSpecification/ResourceSpecification"
import { HashToString, sleep100 } from "./utils";
import HoloService from "./service";
import Binding from "./routes/Binding";
import NewResourceSpecification from "./components/knowledge/resourceSpecification/NewResourceSpecification";
import ProcessSpecification from "./components/knowledge/processSpecification/ProcessSpecification";
import NewProcessSpecification from "./components/knowledge/processSpecification/NewProcessSpecification";

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
            <LeftScreenNavMenu />

            <div className="main-panel">
                <Routes>
                  <Route
                    path="/binding"
                    element={<Binding  service={service}/>}
                    >
                  </Route>    
                  <Route
                    path="/knowledge"
                    element={<Knowledge service={service}/>}>
                  </Route>
                  <Route
                    path="/plan"
                    element={<Plan myAgentId={HashToString(service.agentPubKey)} service={service}/>}>
                  </Route>
                  <Route
                    path="/observation"
                    element={<Observation />}>
                  </Route>
                  <Route
                    path="/resources"
                    element={<ResourceSpecification service={service}/>}
                  />
                  <Route
                    path="/resources/new"
                    element={<NewResourceSpecification service={service}/>}
                  />
                  <Route
                    path="/processes"
                    element={<ProcessSpecification service={service}/>}
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