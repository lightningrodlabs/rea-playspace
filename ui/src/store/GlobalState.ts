import { createContext, useReducer } from 'react';
import { StraightEdge } from 'react-flow-renderer';
import { ResourceSpecificationShape } from '../types/valueflows';
import Context from './context';
import { reducer, actions, initialState } from './reducers';


const GlobalState  {

  const [state, dispatch] = useReducer(reducer, initialState);

  const addResourceSpecification = (resourceSpec: ResourceSpecificationShape) => {
    setTimeout(() => {
      dispatch({ type: actions.ADD_RESOURCE_SPEC, resourceSpec: resourceSpec });
    }, 700);
  };

  const updateResourceSpecification = (resourceSpec: ResourceSpecificationShape) => {
    setTimeout(() => {
      dispatch({ type: actions.UPDATE_RESOURCE_SPEC, resourceSpec: resourceSpec });
    }, 700);
  };

  const deleteResourceSpecification = (resourceSpecId: string) => {
    setTimeout(() => {
      dispatch({ type: actions.DELTE_RESOURCE_SPEC, resourceSpecId: resourceSpecId });
    }, 700);
  };

  // return (
  //   <Context.Provider
  //     value={{
  //       state: state,
  //       addResourceSpec: addResourceSpecification,
  //       updateResourceSpec: updateResourceSpecification,
  //       deleteResourceSpec: deleteResourceSpecification
  //     }}
  //   >
  //     {children}
  //   </Context.Provider>
  // );
};

export default GlobalState;