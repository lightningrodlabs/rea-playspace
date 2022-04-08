import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';


// // initialize the appWs with the signals handler
// const signalCallback = signalsHandlers(store)

// getAppWs(signalCallback).then(async (client) => {
//   try {
//     const profilesInfo = await client.appInfo({
//       installed_app_id: MAIN_APP_ID,
//     })
//     const { cell_id: cellId } = profilesInfo.cell_data.find(
//       ({ role_id }) => role_id === PROFILES_ROLE_ID
//     )
//     const [_dnaHash, agentPubKey] = cellId
//     // cache buffer version of agentPubKey
//     setAgentPubKey(agentPubKey)
//     const cellIdString = cellIdToString(cellId)
//     store.dispatch(setProfilesCellId(cellIdString))
//     // all functions of the Profiles DNA
//     const profilesZomeApi = new ProfilesZomeApi(client)

//     const profiles = await profilesZomeApi.profile.fetchAgents(cellId)
//     store.dispatch(fetchAgents(cellIdString, profiles))
//     const profile = await profilesZomeApi.profile.whoami(cellId)
//     store.dispatch(whoami(cellIdString, profile))
//     const agentAddress = await profilesZomeApi.profile.fetchAgentAddress(cellId)
//     store.dispatch(fetchAgentAddress(cellIdString, agentAddress))
//     // which projects do we have installed?
//     const projectCellIds = await getProjectCellIdStrings()
//     store.dispatch(setProjectsCellIds(projectCellIds))
//   } catch (e) {
//     console.error(e)
//     return
//   }
// })

ReactDOM.render(
  <React.StrictMode>
      <App />
  </React.StrictMode>,
  document.getElementById('root')
);

