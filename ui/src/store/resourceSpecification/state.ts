import { ResourceSpecification } from "../../data/models/Valueflows/Knowledge";

// what you can do with this data store. User perspective.
export enum actions {
  ADD_RESOURCE_SPEC = 'add-resource-spec',
  UPDATE_RESOURCE_SPEC = 'update-resource-spec',
  DELTE_RESOURCE_SPEC = 'delete-resource-spec',
  RESET = 'reset'
};

// the shape of the store
export type State = {
  resourceSpecification: Record<string, ResourceSpecification>;
  isLoading: boolean;
  hasError: boolean;
}

const initialState: State = {
  resourceSpecification: {},
  isLoading: false,
  hasError: false
};

type Action =
  | {
      type: actions.ADD_RESOURCE_SPEC;
      payload: Required<ResourceSpecification>
    }
  | {
      type: actions.UPDATE_RESOURCE_SPEC;
      payload: Required<ResourceSpecification>
    }
  | {type: actions.DELTE_RESOURCE_SPEC; payload: string}
  | {type: actions.RESET}

export const reducer = (state = initialState, action: Action) => {

  switch (action.type) {
    case actions.ADD_RESOURCE_SPEC: {
      // should I put zome calls here?
      return { ...state.resourceSpecification, resourceSpecification: action.payload };
    }
    case actions.UPDATE_RESOURCE_SPEC: {
      // should I put zome calls here?
      let stateCopy = {...state};
      stateCopy.resourceSpecification[action.payload.id] = action.payload;
      return { ...stateCopy};
    }
    case actions.DELTE_RESOURCE_SPEC: {
      // should I put zome calls here?
      let stateCopy = {...state};
      delete stateCopy.resourceSpecification[action.payload];
      return { ...stateCopy};
    }
    case 'reset': {
      return initialState;
    }
    default:
      return state;
  }
};