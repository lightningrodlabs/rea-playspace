import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import getDataStore from './data/store';

getDataStore().then(() => {
  ReactDOM.render(
    <App />,
    document.getElementById('root')
  );
});
