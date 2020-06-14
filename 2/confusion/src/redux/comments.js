import COMMENTS from '../shared/comments';
import * as ActionTypes from './actionTypes';

const Comments = (state = COMMENTS, action) => {
  switch (action.type) {
    case ActionTypes.ADD_COMMENT: {
      const comment = action.payload;
      comment.id = state.length;
      comment.date = new Date().toISOString();
      return state.concat(comment); // only add the comment in memory, we still need to implement persistence
    }
    default: {
      return state;
    }
  }
};

export default Comments;
