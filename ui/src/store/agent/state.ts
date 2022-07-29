import { Agent, ResourceSpecification } from "../../data/models/Valueflows/Knowledge";

// what you can do with this data store. User perspective.
export enum actions {
  ADD_AGENT = 'add-agent',
  UPDATE_AGENT = 'update-agent',
  DELTE_AGENT = 'delete-agent',
  RESET = 'reset'
};

// the shape of the store
export type State = {
  agent: Record<string, Agent>;
  isLoading: boolean;
  hasError: boolean;
}

const initialState: State = {
  agent: {},
  isLoading: false,
  hasError: false
};

type Action =
  | {
      type: actions.ADD_AGENT;
      payload: Required<Agent>
    }
  | {
      type: actions.UPDATE_AGENT;
      payload: Required<Agent>
    }
  | {type: actions.DELTE_AGENT; payload: string}
  | {type: actions.RESET}

export const reducer = (state = initialState, action: Action) => {

  switch (action.type) {
    case actions.ADD_AGENT: {
      // should I put zome calls here?
      return { ...state.agent, agent: action.payload };
    }
    case actions.UPDATE_AGENT: {
      // should I put zome calls here?
      let stateCopy = {...state};
      stateCopy.agent[action.payload.id] = action.payload;
      return { ...stateCopy};
    }
    case actions.DELTE_AGENT: {
      // should I put zome calls here?
      let stateCopy = {...state};
      delete stateCopy.agent[action.payload];
      return { ...stateCopy};
    }
    case 'reset': {
      return initialState;
    }
    default:
      return state;
  }
};