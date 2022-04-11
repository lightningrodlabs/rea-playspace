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
import { HashToString, sleep100 } from "./utils";
import HoloService from "./service";
import { ThingInput } from "./types/types";

const ADMIN_WS_URL = `ws://localhost:${ADMIN_PORT}`;
const APP_WS_URL = `ws://localhost:${APP_PORT}`;

setBasePath(
  "https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.0.0-beta.70/dist/"
);

interface Props {}

const App: React.FC<Props> = () => {
  const [service, setService]= useState<HoloService>();
  const [loading, setLoading] = useState(true);
  const [response, setResponse] = useState<AddOutput | undefined>();

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
    console.log('cell data? ', cell_data);
    setService(new HoloService(appWs, cell_data, cell_data.cell_id[1]));
    setLoading(false);
  };

  const enter_initial_data = async () => {
    const thing: ThingInput = {
      path: 'some.path',
      data: 'some data'
    };

    setResponse(await service.put_thing(thing));
  }
  
  useEffect(() => {
    init();
  }, []);

  const Response = () => {

    if (response === undefined) {
      return (<p>Press button to do a thing</p>);
    }
    return (
      <p>Initial Thing - header:{response.header_hash} entry:{response.entry_hash}</p>
    );
  }

  return (
    <BrowserRouter>
        <div className="container">
          <Header name={'myAgentId'} />
          <div className="below-header">
            <LeftScreenNavMenu />

            <div className="main-panel">
              <p>{loading ? "Loading..." : `Loaded`}</p>
              <button onClick={enter_initial_data}>Put Thing</button>
              <Response />
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