import { useState, useEffect, useContext} from 'react';
import getDataStore from '../data/DataStore';
import GlobalContext from './context';

export function usePath(path: string) {

  const store = useContext(GlobalContext);
  const cursor = store.getCursor(path);

  const [state, setState] = useState(() => {
    const obj = cursor;
    obj.dispatch = (fn, ...args) => fn(cursor, ...args);
    return obj;
  });

  useEffect(() => {
      const obj = store.getCursor(path);
      obj.dispatch = (fn, ...args) => fn(cursor, ...args);
      setState(obj);
  }, [cursor]);

  return state;
}
