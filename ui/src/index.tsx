import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { initConnection } from './data/DataStore';
import "@holochain-open-dev/profiles/create-profile";
import "@holochain-open-dev/profiles/list-profiles";
import "@holochain-open-dev/profiles/agent-avatar";
import "@holochain-open-dev/profiles/my-profile";
import "@holochain-open-dev/profiles/profiles-context";

// Or do we want to have a loading screen until this resolves?
initConnection().then(() => {
  ReactDOM.render(
    <App />,
    document.getElementById('root')
  );
});
