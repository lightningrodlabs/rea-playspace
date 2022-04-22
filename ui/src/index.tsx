import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { initConnection } from './data/DataStore';

initConnection().then(() => {
  ReactDOM.render(
    <App />,
    document.getElementById('root')
  );
});
