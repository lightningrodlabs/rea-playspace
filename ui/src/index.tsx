import { StateTransitions, StateMachine } from './StateMachine';
import { getDataStore } from './data/DataStore';
import { LocalstoreProvider} from 'data-providers';
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
 | 'createDataStore'
 | 'fetchData'
 | 'loaded'

/**
* Application State Transitions
*
* List of possible state transitions:
* 'currentStatse' => ['next', 'allowed', 'state']
*/
const AppTransitions: StateTransitions<AppState> = {
 createDataStore: ['fetchData'],
 fetchData: ['loaded'],
 loaded: ['loaded'],
}

/**
 * Type of the state
 */
export type AppStateStore = {
  currentState: AppState
  dataStore: DataStore
}

const initialState: AppStateStore = {
  currentState: 'createDataStore',
  dataStore: undefined
}

const AppMachine = new StateMachine<AppState, AppStateStore>(initialState, AppTransitions);

AppMachine.on('createDataStore', async (state: AppStateStore) => {
  console.log('createDataStore');
  const dataStore = getDataStore();
  dataStore.addProvider('localstore', new LocalstoreProvider(ModelTree, ModelKinds));
  state.dataStore = dataStore;
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
