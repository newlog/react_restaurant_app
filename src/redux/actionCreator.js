import * as ActionTypes from './actionTypes';
import DISHES from '../shared/dishes';

// this is an action creator
export const addComment = (dishId, rating, author, comment) => ({
  type: ActionTypes.ADD_COMMENT,
  payload: {
    dishId, // this is equivalent to: dishId: dishId,
    rating,
    author,
    comment,
  },
});

// this is an action creator
export const dishesLoading = () => ({
  type: ActionTypes.DISHES_LOADING,
});

// this is an action creator
export const dishesFailed = (errmess) => ({
  type: ActionTypes.DISHES_FAILED,
  payload: errmess,
});

// this is an action creator
export const addDishes = (dishes) => ({
  type: ActionTypes.ADD_DISHES,
  payload: dishes,
});

// The detchDishes is a thunk thunk dispatches two actions (in the form of functions): First the dishesLoading gets executed, then the addDishes.
export const fetchDishes = () => (dispatch) => {
  dispatch(dishesLoading(true));

  // this returns a function after 2 seconds that dispatches the addDishes action
  setTimeout(() => {
    dispatch(addDishes(DISHES));
  }, 2000);
};
