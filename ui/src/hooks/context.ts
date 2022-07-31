import { createContext } from 'react';
import getDataStore from '../data/DataStore';

const GlobalContext = createContext(getDataStore());
export default GlobalContext;