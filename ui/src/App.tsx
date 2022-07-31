import React, { useEffect, useState } from "react";
import "@shoelace-style/shoelace/dist/themes/light.css";
import { setBasePath } from "@shoelace-style/shoelace/dist/utilities/base-path";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/layout/Header";
import Home from "./Home";
import NewAgent from "./components/layout/create/NewAgent";
import Pi from "./components/layout/Pi";
import getDataStore from "./data/DataStore";
import Modal from "react-modal"
import {
  ProfilesStore
} from "@holochain-open-dev/profiles";
import { getProfilesStore } from "./data/ProfilesStore";
import ProfilePrompt from "./components/ProfilePrompt";
import { ProfilesContext } from "./elements";
import { ResourceSpecificationShape } from "./types/valueflows";
import ResourceSpecificationView from "./components/layout/create/ResourceSpecificationView";
import ProcessSpecificationView from "./components/layout/create/ProcessSpecificationView";

Modal.setAppElement("#root");

setBasePath(
  "https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.0.0-beta.70/dist/"
);

interface Props {}

const App: React.FC<Props> = () => {
  const [isModelOpen, setIsModalOpen] = useState(false);
  const [rsEdit, setRsEdit] = useState<ResourceSpecificationShape>();

  function handleSetRsEdit(resourceSpec: ResourceSpecificationShape) {
    console.log('handleSetRsEdit ', resourceSpec);
    setRsEdit(resourceSpec);
  }

  function piHandler(event) {
    const store = getDataStore();
    console.log(event.buttons);
    // Either 'shift' + 'meta' + 'alt' or 'shift' + 'ctrl' + 'alt' deletes the local root
    if (event.shiftKey && ((event.metaKey && event.altKey) || (event.ctrlKey && event.altKey))) {
      store.deleteLocalRoot();
      console.log('Deleted local root.');
    // Either 'shift' + one of {'meta', 'ctrl', 'alt'} uses the local root to hydrate and save to the chain
    } else if (event.shiftKey && (event.metaKey || event.ctrlKey || event.altKey)) {
      setIsModalOpen(true);
      console.log('Should hydrate...');
      store.fetchLocalRoot();
      store.saveTree();
      setTimeout(() => setIsModalOpen(false), 1500);
    // Save to the local root if 'shift' if pressed
    } else if (event.shiftKey) {
      store.saveLocalRoot().then(() => {
        console.log('Saved root locally.');
      }).catch((e) => {
        console.log(`Could not store root because: ${e}`);
      });
    } else {
      console.log('oh, so close...');
    }
  }

  const [store, setStore] = useState<ProfilesStore>();

  useEffect(() => {
    getProfilesStore().then((store) => {
      setStore(store);
    });
  }, []);


  const Main = () => {
    return (
      <BrowserRouter>
        <div className="container">
          <Header />
          <div className="below-header">
            <div className="main-panel">
              <Routes>
                <Route
                    path="/"
                    element={<Home setEdit={handleSetRsEdit}/>}>
                  </Route>

                  <Route
                    path="/agents/new"
                    element={<NewAgent />}
                  />
                  <Route
                    path="/agents/edit">
                    <Route path=":id" element={<NewAgent />} />
                  </Route>
                  <Route
                    path="/resources/new"
                    element={<ResourceSpecificationView />}
                  />
                  <Route
                    path="/resources/edit">
                    <Route path=":id" element={<ResourceSpecificationView />} />
                  </Route>
                  <Route
                    path="/processes/new"
                    element={<ProcessSpecificationView />}
                  />
                  <Route
                    path="/processes/edit">
                    <Route path=":id" element={<ProcessSpecificationView />} />
                  </Route>
                </Routes>
            </div>
          </div>
          <Modal
            style={{
              overlay: {zIndex: 2000},
              content: {
                top: '30%',
                left: '30%',
                right: '30%',
                bottom: 'auto',
                transform: 'translate(-20%, -20%)',
              }
            }}
            isOpen={isModelOpen}>
            <div style={{
              textAlign: 'center',
              alignContent: 'center',
              width: '100%'
            }}><img src="/img/net.gif" /></div>
          </Modal>
          <Pi onClick={piHandler} />
        </div>
      </BrowserRouter>
    );
  }
  if (!store) {
    return <span>Loading.......</span>;
  }
  return (
    <div>
      <ProfilesContext store={store}>
        <ProfilePrompt>
          <Main />
        </ProfilePrompt>
      </ProfilesContext>
    </div>
  );
};

export default App;