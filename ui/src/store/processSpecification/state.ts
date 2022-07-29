import { ProcessSpecification } from "../../data/models/Valueflows/Knowledge";

// what you can do with this data store. User perspective.
export enum actions {
  ADD_PROCESS_SPEC = 'add-process-spec',
  UPDATE_PROCESS_SPEC = 'update-process-spec',
  DELTE_PROCESS_SPEC = 'delete-process-spec',
  RESET = 'reset'
};

// the shape of the store
export type State = {
  processSpecification: Record<string, ProcessSpecification>;
  isLoading: boolean;
  hasError: boolean;
}

const initialState: State = {
  processSpecification: {},
  isLoading: false,
  hasError: false
};

type Action =
  | {
      type: actions.ADD_PROCESS_SPEC;
      payload: Required<ProcessSpecification>
    }
  | {
      type: actions.UPDATE_PROCESS_SPEC;
      payload: Required<ProcessSpecification>
    }
  | {type: actions.DELTE_PROCESS_SPEC; payload: string}
  | {type: actions.RESET}

export const reducer = (state = initialState, action: Action) => {

  switch (action.type) {
    case actions.ADD_PROCESS_SPEC: {
      // should I put zome calls here?
      return { ...state.processSpecification, ProcessSpecification: action.payload };
    }
    case actions.UPDATE_PROCESS_SPEC: {
      // should I put zome calls here?
      let stateCopy = {...state};
      stateCopy.processSpecification[action.payload.id] = action.payload;
      return { ...stateCopy};
    }
    case actions.DELTE_PROCESS_SPEC: {
      // should I put zome calls here?
      let stateCopy = {...state};
      delete stateCopy.processSpecification[action.payload];
      return { ...stateCopy};
    }
    case 'reset': {
      return initialState;
    }
    default:
      return state;
  }
};