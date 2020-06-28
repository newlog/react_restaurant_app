import * as ActionTypes from './actionTypes';

const Dishes = (
  state = {
    isLoading: true, // by default set to true because initially the dishes are an empty array
    errMess: null,
    dishes: [],
  },
  action,
) => {
  switch (action.type) {
    case ActionTypes.ADD_DISHES: {
      // the state is not mutated, you get the received state and returning a new state
      return {
        ...state,
        isLoading: false,
        errMess: null,
        dishes: action.payload,
      };
    }
    case ActionTypes.DISHES_LOADING: {
      return { ...state, isLoading: true, errMess: null, dishes: [] };
    }
    case ActionTypes.DISHES_FAILED: {
      return {
        ...state,
        isLoading: false,
        errMess: action.payload,
        dishes: [],
      };
    }
    default: {
      return state;
    }
  }
};

export default Dishes;
