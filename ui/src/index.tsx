import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { initConnection } from './data/DataStore';
import "@holochain-open-dev/profiles/create-profile";
import "@holochain-open-dev/profiles/list-profiles";

// Add the context-provider element
import "@holochain-open-dev/context/context-provider";

// Or do we want to have a loading screen until this resolves?
initConnection().then(() => {
  ReactDOM.render(
    <App />,
    document.getElementById('root')
  );
});
