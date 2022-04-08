import React, { useEffect, useState, useRef } from "react";
import "@shoelace-style/shoelace/dist/themes/light.css";
import { setBasePath } from "@shoelace-style/shoelace/dist/utilities/base-path";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import LeftScreenNavMenu from "./components/LeftScreenNavMenu";
//import { SlButton } from "@shoelace-style/shoelace/dist/react";
import { APP_ID, ZOME_NAME, ADMIN_PORT, APP_PORT } from './holochainConf';
import { AdminWebsocket, AppWebsocket, InstalledAppInfo, InstalledCell } from '@holochain/client';
import Knowledge from "./routes/Knowledge";
import Plan from "./routes/Plan";
import Observation from "./routes/Observation";
import Resources from "./components/Resources";
import NewResource from "./components/NewResource";

const ADMIN_WS_URL = `ws://localhost:${ADMIN_PORT}`;
const APP_WS_URL = `ws://localhost:${APP_PORT}`;

setBasePath(
  "https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.0.0-beta.70/dist/"
);

interface Props {}

function HashToString(buff: Uint8Array): string {
  return buff.reduce((prev: string, curr: number) => {
    return prev + curr.toString(16).padStart(2, '0');
  }, '');
}

function StringToHash(s: string): Uint8Array {
  const b = new Uint8Array(Math.ceil(s.length/2));
  for (let i = 0; i < b.byteLength; i++) {
    b[i] = parseInt(s.slice(i*2,(i*2)+2),16);
  }
  return b;
}

const App: React.FC<Props> = () => {
  const [myAgentId, setMyAgentId] = useState<string>();
  const [client, setClient] = useState<AppWebsocket>();
  const [result, setResult] = useState("");
  const [appInfo, setAppInfo] = useState<InstalledAppInfo>();
  const [cellData, setCellData] = useState<InstalledCell>();
  const [loading, setLoading] = useState(true);

  const connect = async () => {
    const adminWs = await AdminWebsocket.connect(ADMIN_WS_URL);
    console.log('admin websocket opened');
    const appWs = await AppWebsocket.connect(APP_WS_URL);
    console.log('app websocket opened');
    adminWs.client.socket.addEventListener('close', () => {
      console.log('admin websocket closed');
    });
    appWs.client.socket.addEventListener('close', () => {
      console.log('app websocket closed');
    })

    // this stinks but works for now.
    // Check every 100ms and only then get app info or else app_info etc would just get missed.
    while (!(adminWs.client.socket.readyState === adminWs.client.socket.OPEN
      && appWs.client.socket.readyState === appWs.client.socket.OPEN)) {
        continue;
    }
    const app_info = await appWs.appInfo({ installed_app_id: APP_ID })
    setAppInfo(app_info)
    // this always fails on the first load. I need to change and save this file in order for appInfo to be available
    const cell_data = app_info.cell_data[0]
    setCellData(cell_data)
    
    // Test 
    const res = await appWs.callZome({
      cap_secret: null as any,
      cell_id: cell_data.cell_id,
      zome_name: 'projects',
      fn_name: 'fetch',
      provenance: cellData.cell_id[1],
      payload: null as any,
    }, 30000)
    setResult(res)
    setLoading(false)
    
    // @ts-ignore
    setClient(appWs);
    setMyAgentId('hello'); // maybe get rid of this?
  };

  useEffect(()=>{
    connect()
  },[])

  return (
    <BrowserRouter>
        <div className="container">
          <Header name="shane" />
          <div className="below-header">
            <LeftScreenNavMenu />

            <div className="main-panel">
              <p>{loading ? "Loading..." : `Fetched From Zome ${result}`}</p>
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