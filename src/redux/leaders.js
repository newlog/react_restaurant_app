import * as ActionTypes from './actionTypes';

const Leaders = (
  state = {
    isLoading: true, // by default set to true because initially the leaders are an empty array
    errMess: null,
    leaders: [],
  },
  action,
) => {
  switch (action.type) {
    case ActionTypes.LEADERS_ADD: {
      // the state is not mutated, you get the received state and returning a new state
      return {
        ...state,
        isLoading: false,
        errMess: null,
        leaders: action.payload,
      };
    }
    case ActionTypes.LEADERS_LOADING: {
      return { ...state, isLoading: true, errMess: null, leaders: [] };
    }
    case ActionTypes.LEADERS_FAILED: {
      return {
        ...state,
        isLoading: false,
        errMess: action.payload,
        leaders: [],
      };
    }
    default: {
      return state;
    }
  }
};

export default Leaders;
