import React, { useEffect, useState, useRef } from "react";
import "@shoelace-style/shoelace/dist/themes/light.css";
import { setBasePath } from "@shoelace-style/shoelace/dist/utilities/base-path";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import LeftScreenNavMenu from "./components/LeftScreenNavMenu";
import { SlButton } from "@shoelace-style/shoelace/dist/react";
import { REACT_APP_HC_APP_ID, APP_PORT, MAIN_APP_ID } from './holochainConf';
import Knowledge from "./routes/Knowledge";
import Plan from "./routes/Plan";
import Observation from "./routes/Observation";
import Resources from "./components/Resources";
import ResourceTransfer from "./components/ResourceTransfer";
import NewResource from "./components/NewResource";
import { getAdminWs, getAppWs } from './hcWebsockets';
import { AppWebsocket } from '@holochain/client';

setBasePath(
  "https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.0.0-beta.70/dist/"
);

interface Props {}

const App: React.FC<Props> = () => {
  const [result, setResult] = useState<number>()
  const [cellId, setCellId] = useState()
  const client = useRef<AppWebsocket>()
  const APP_WS_URL = `ws://localhost:${APP_PORT}`

  async function getCellID() {
    let appInfo = await client.current.appInfo(MAIN_APP_ID)
    console.log('appInfo?', appInfo)
  }


  async function connet() {

  }

  // async function fetch() {}
  //   await wsClient.callZome({
  //     cap: null,
  //     cell_id: [1, 2],
  //     zome_name: "project",
  //     fn_name: 'fetch',
  //     provenance: null,
  //     payload: null,
  //    }, 30000)
  // }

  useEffect(()=>{

  },[])

  return (
    <BrowserRouter>
        <div className="container">
          <Header name="shane" />
          <div className="below-header">
            <LeftScreenNavMenu /*probably pass wsClient here*/ />

            <div className="main-panel">
              <p>Am I rendering? {result ? result : "waiting..."}</p>
                <Routes>
                  <Route
                    path="/knowledge"
                    element={<Knowledge />}>
                  </Route>
                  <Route
                    path="/plan"
                    element={<Plan />}>
                  </Route>
                  <Route
                    path="/"
                    element={<Observation />}>
                  </Route>
                  <Route
                    path="/resources"
                    element={<Resources />}
                  />
                  {/* <Route
                    path="/resources/transfer"
                    element={<ResourceTransfer />}
                  /> */}
                  <Route
                    path="/resources/new"
                    element={<NewResource />}
                  />
                </Routes>
            </div>
          </div>
        </div>
    </BrowserRouter>
  );
};

export default App;