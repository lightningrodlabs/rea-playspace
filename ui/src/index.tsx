import { StateTransitions, StateMachine } from './StateMachine';
import { AppAgentWebsocket, AppSignal, AppSignalCb } from '@holochain/client';
import { getDataStore } from './data/DataStore';
import { getAppWs } from './hcWebsockets';
import { APP_ID, ROLE_NAME, ZOME_NAME } from "./AppConf";
import { buildModel, LocalstoreProvider, Pathed, ProjectProvider, SignalMessage, ZomeApi } from 'data-providers';
import { ModelTree, ModelKinds } from './data/models/Application';
import { DataStore } from './data/DataStore'
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
/*

Application State Management
============================

When the application loads there are several things which should happen in
succession and should be handled by a state machine.

* Make the connection to Holochain
* Set-up shared Holochain state information (from appInfo)
* Instantiate the DataStore and DataProviders
* Connect the signal handlers
* Fetch the root (or maybe the root.plan?)
* Display a list of available Plans, if any exist, or allow creating a plan
* Once a plan is selected or created, show the FlowCanvas UI.

There are other possibilities for the progression, for instance, we could create
a UI that allows creating Agents, ResourceSpecifications, ProcessSpecifications
and Plans that has a completely different screen to begin with.

*/

/**
 * Application States
 */
 export type AppState =
 | 'connecting'
 | 'setAppInfo'
 | 'createDataStore'
 | 'connectSignalHandlers'
 | 'fetchData'
 | 'loaded'

/**
* Application State Transitions
*
* List of possible state transitions:
* 'currentStatse' => ['next', 'allowed', 'state']
*/
const AppTransitions: StateTransitions<AppState> = {
 connecting: ['setAppInfo'],
 setAppInfo: ['createDataStore'],
 createDataStore: ['connectSignalHandlers'],
 connectSignalHandlers: ['fetchData'],
 fetchData: ['loaded'],
 loaded: ['loaded'],
}

/**
 * Type of the state
 */
export type AppStateStore = {
  currentState: AppState
  holochainClient: AppAgentWebsocket
  appInfo: {}
  dataStore: DataStore
}

const initialState: AppStateStore = {
  currentState: 'connecting',
  holochainClient: undefined,
  appInfo: undefined,
  dataStore: undefined
}

const AppMachine = new StateMachine<AppState, AppStateStore>(initialState, AppTransitions);

AppMachine.on('connecting', async (state: AppStateStore) => {
  console.log('connecting');
  state.holochainClient = await getAppWs();
  AppMachine.to('setAppInfo');
});

AppMachine.on('setAppInfo', async (state: AppStateStore) => {
  console.log('setAppInfo');
  state.appInfo = await state.holochainClient.appWebsocket.appInfo({
    installed_app_id: APP_ID
  });
  console.log(state.appInfo);
  AppMachine.to('createDataStore');
});

AppMachine.on('createDataStore', async (state: AppStateStore) => {
  console.log('createDataStore');
  const zomeApi = new ZomeApi(state.holochainClient, ROLE_NAME, ZOME_NAME);
  const dataStore = getDataStore();
  dataStore.addProvider('project', new ProjectProvider(ModelTree, ModelKinds, zomeApi));
  dataStore.addProvider('localstore', new LocalstoreProvider(ModelTree, ModelKinds));
  state.dataStore = dataStore;
  AppMachine.to('connectSignalHandlers');
});

AppMachine.on('connectSignalHandlers', async (state: AppStateStore) => {
  console.log('connectSignalHandlers');

  const signalCb: AppSignalCb = async (signal: AppSignal) => {
    const message = signal.payload as string;
    const signalMessage = new SignalMessage(JSON.parse(message));
    switch (signalMessage.op) {
      case 'put':
        if (signalMessage.data) {
          const path = signalMessage.path;
          let PDO = buildModel<{}, { id: string }>(ModelTree, ModelKinds, path, signalMessage.data);
          state.dataStore.setLocal(PDO as Pathed<{ id: string }>);
        }
        break;
      case 'delete':
        state.dataStore.deleteLocal(signalMessage.path);
        break;
      default:
        console.warn(`Unknown op ${signalMessage.op}`);
        break;
    }
  };
  state.holochainClient.on("signal", signalCb);
  AppMachine.to('fetchData');
});

AppMachine.on('fetchData', async (state: AppStateStore) => {
  console.log('fetchData');
  await state.dataStore.fetchOrCreateRoot();
  AppMachine.to('loaded');
});

AppMachine.on('loaded', async (state: AppStateStore) => {
  console.log('loaded');
  ReactDOM.render(
    <App appStore={state} />,
    document.getElementById('root')
  );
});

AppMachine.go();
