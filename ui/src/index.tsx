import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { initConnection } from './data/DataStore';

// Or do we want to have a loading screen until this resolves?
initConnection().then(() => {
  ReactDOM.render(
    <App />,
    document.getElementById('root')
  );
});
