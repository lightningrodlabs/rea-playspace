import React, { useState } from "react";
import "@shoelace-style/shoelace/dist/themes/light.css";
import { setBasePath } from "@shoelace-style/shoelace/dist/utilities/base-path";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/layout/Header";
import Pi from "./components/layout/Pi";
import { getDataStore } from "./data/DataStore";
import Modal from "react-modal"
import ProfilePrompt from "./components/ProfilePrompt";
import { ProfilesContext } from "./components/ProfileComponents";
import { ResourceSpecificationShape } from "valueflows-models";
import Home from './pages/Home';
import ResourceSpecificationView from "./pages/create/ResourceSpecificationView";
import ProcessSpecificationView from "./pages/create/ProcessSpecificationView";
import AgentView from "./pages/create/AgentView";
import Plans from "./pages/Plans";
import PlanView from "./pages/create/PlanView";
import EditPlan from "./pages/PlanEdit";
import EventLedger from "./pages/EventLedger";
import Agents from "./pages/Agents";
import ResourceSpecifications from "./pages/ResourceSpecifications";
import ResourceLedger from "./pages/ResourceLedger";
import { AppStateStore } from './index';

Modal.setAppElement("#root");

setBasePath(
  "https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.0.0-beta.70/dist/"
);

interface Props {
  appStore: AppStateStore
}

const App: React.FC<Props> = ({appStore}) => {
  const [isModelOpen, setIsModalOpen] = useState(false);
  const [rsEdit, setRsEdit] = useState<ResourceSpecificationShape>();

  function handleSetRsEdit(resourceSpec: ResourceSpecificationShape) {
    setRsEdit(resourceSpec);
  }

  async function piHandler(event) {
    const store = getDataStore();
    // Either 'shift' + 'meta' + 'alt' or 'shift' + 'ctrl' + 'alt' deletes the local root
    if (event.shiftKey && ((event.metaKey && event.altKey) || (event.ctrlKey && event.altKey))) {
      store.deleteLocalTree();
      console.warn('Deleted local root.');
    // Either 'shift' + one of {'meta', 'ctrl', 'alt'} uses the local root to hydrate and save to the chain
    } else if (event.shiftKey && (event.metaKey || event.ctrlKey || event.altKey)) {
      setIsModalOpen(true);
      console.info('Should hydrate...');
      // Oh look, store.fetchLocalTree is async...
      await store.fetchLocalTree();
      console.log(store.createSnapshot());
      store.saveInMemoryTree();
      setTimeout(() => setIsModalOpen(false), 1500);
    // Save to the local root if 'shift' if pressed
    } else if (event.shiftKey) {
      store.saveLocalTree().then(() => {
        console.info('Saved root locally.');
      }).catch((e) => {
        console.error(`Could not store root because: ${e}`);
      });
    } else {
      console.error('oh, so close...');
    }
  }

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
                    element={<Home />}>
                  </Route>
                  <Route
                    path="/agents/new"
                    element={<AgentView />}
                  />
                  <Route
                    path="/agents/edit">
                    <Route path=":id" element={<AgentView />} />
                  </Route>
                  <Route
                    path="/agents"
                    element={<Agents />} 
                  />
                  <Route
                    path="/resource-specifications"
                    element={<ResourceSpecifications />}
                  />
                  <Route
                    path="/resource-specifications/new"
                    element={<ResourceSpecificationView />}
                  />
                  <Route
                    path="/resource-specifications/edit">
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
                  <Route
                    path="/plans"
                    element={<Plans />}
                  />
                  <Route
                    path="/plans/new"
                    element={<PlanView />}
                  />
                  <Route
                    path="/plans/update">
                    <Route path=":id" element={<PlanView/>} />
                  </Route>
                  <Route
                    path="/plans/edit">
                    <Route path=":id" element={<EditPlan setEdit={handleSetRsEdit}/>} />
                  </Route>
                  <Route
                    path="/events"
                    element={<EventLedger />}
                  />
                  <Route
                    path="/resources"
                    element={<ResourceLedger />}
                  />
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

  return (
    <div>
      <ProfilesContext store={appStore.profileStore}>
          <ProfilePrompt wrappedProfileReadable={appStore.wrappedProfileReadable}>
            <Main />
          </ProfilePrompt>
      </ProfilesContext>
    </div>
  );
};

export default App;