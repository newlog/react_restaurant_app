import * as ActionTypes from './actionTypes';
import baseUrl from '../shared/baseUrl';

// SEPARATE ACTION CREATORS AND ADD THE APPROPRIATE CREATORS FOR LEADERS

/* Everything in this file are action creators */

export const addComment = (dishId, rating, author, comment) => ({
  type: ActionTypes.ADD_COMMENT,
  payload: {
    dishId, // this is equivalent to: dishId: dishId,
    rating,
    author,
    comment,
  },
});

export const addComments = (comments) => ({
  type: ActionTypes.ADD_COMMENTS,
  payload: comments,
});

// This got refactored with await by the IDE. Let's try it...
/*
export const fetchComments = () => async (dispatch) => {
  const response = await fetch(`${baseUrl}comments`);
  const comments = await response.json();
  return dispatch(addComments(comments));
};
*/

export const commentsFailed = (errmess) => ({
  type: ActionTypes.COMMENTS_FAILED,
  payload: errmess,
});

export const fetchComments = () => (dispatch) => {
  return fetch(`${baseUrl}comments`)
    .then(
      (response) => {
        if (response.ok) {
          return response; // when we return this response, the response is passed to then next .then()
        }
        const error = new Error(
          `Error ${response.status}: ${response.statusText}`,
        );
        error.response = response;
        throw error; // when the error is thrown, we can catch it later in the promise
      },
      // this part of code is in case no response is returned
      (error) => {
        const errmess = new Error(error.message);
        throw errmess;
      },
    )
    .then((response) => response.json())
    .then((comments) => dispatch(addComments(comments)))
    .catch((error) => dispatch(commentsFailed(error.message)));
};

export const dishesLoading = () => ({
  type: ActionTypes.DISHES_LOADING,
});

export const dishesFailed = (errmess) => ({
  type: ActionTypes.DISHES_FAILED,
  payload: errmess,
});

export const addDishes = (dishes) => ({
  type: ActionTypes.ADD_DISHES,
  payload: dishes,
});

// The fetchDishes is a thunk. A thunk dispatches two actions (in the form of functions): First the dishesLoading gets executed, then the addDishes.
export const fetchDishes = () => (dispatch) => {
  dispatch(dishesLoading(true));

  return fetch(`${baseUrl}dishes`)
    .then(
      (response) => {
        if (response.ok) {
          return response; // when we return this response, the response is passed to then next .then()
        }
        const error = new Error(
          `Error ${response.status}: ${response.statusText}`,
        );
        error.response = response;
        throw error; // when the error is thrown, we can catch it later in the promise
      },
      // this part of code is in case no response is returned
      (error) => {
        const errmess = new Error(error.message);
        throw errmess;
      },
    )
    .then((response) => response.json()) // convert the incoming response into JSON
    .then((dishes) => dispatch(addDishes(dishes)))
    .catch((error) => dispatch(dishesFailed(error.message)));
};

export const leadersLoading = () => ({
  type: ActionTypes.LEADERS_LOADING,
});

export const leadersFailed = (errmess) => ({
  type: ActionTypes.LEADERS_FAILED,
  payload: errmess,
});

export const addLeaders = (leaders) => ({
  type: ActionTypes.LEADERS_ADD,
  payload: leaders,
});

// The fetchLeaders is a thunk. A thunk dispatches two actions (in the form of functions): First the dishesLoading gets executed, then the addDishes.
export const fetchLeaders = () => (dispatch) => {
  dispatch(leadersLoading(true));

  return fetch(`${baseUrl}leaders`)
    .then(
      (response) => {
        if (response.ok) {
          return response; // when we return this response, the response is passed to then next .then()
        }
        const error = new Error(
          `Error ${response.status}: ${response.statusText}`,
        );
        error.response = response;
        throw error; // when the error is thrown, we can catch it later in the promise
      },
      // this part of code is in case no response is returned
      (error) => {
        const errmess = new Error(error.message);
        throw errmess;
      },
    )
    .then((response) => response.json()) // convert the incoming response into JSON
    .then((leaders) => dispatch(addLeaders(leaders)))
    .catch((error) => dispatch(leadersFailed(error.message)));
};

export const promosLoading = () => ({
  type: ActionTypes.PROMOS_LOADING,
});

export const promosFailed = (errmess) => ({
  type: ActionTypes.PROMOS_FAILED,
  payload: errmess,
});

export const addPromos = (promos) => ({
  type: ActionTypes.ADD_PROMOS,
  payload: promos,
});

export const fetchPromos = () => (dispatch) => {
  dispatch(promosLoading(true));

  return fetch(`${baseUrl}promotions`)
    .then(
      (response) => {
        if (response.ok) {
          return response; // when we return this response, the response is passed to then next .then()
        }
        const error = new Error(
          `Error ${response.status}: ${response.statusText}`,
        );
        error.response = response;
        throw error; // when the error is thrown, we can catch it later in the promise
      },
      // this part of code is in case no response is returned
      (error) => {
        const errmess = new Error(error.message);
        throw errmess;
      },
    )
    .then((response) => response.json()) // convert the incoming response into JSON
    .then((dishes) => dispatch(addPromos(dishes)))
    .catch((error) => dispatch(promosFailed(error.message)));
};
