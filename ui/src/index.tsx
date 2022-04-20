import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { initConnection } from './data/store';

initConnection().then(() => {
  ReactDOM.render(
    <App />,
    document.getElementById('root')
  );
});
