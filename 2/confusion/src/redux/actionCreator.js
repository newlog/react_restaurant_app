import * as ActionTypes from './actionTypes';

const addComment = (dishId, rating, author, comment) => ({
  type: ActionTypes.ADD_COMMENT,
  payload: {
    dishId, // this is equivalent to: dishId: dishId,
    rating,
    author,
    comment,
  },
});

export default addComment;
