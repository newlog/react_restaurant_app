import * as ActionTypes from './actionTypes';

const Comments = (state = { errMess: null, comments: [] }, action) => {
  switch (action.type) {
    case ActionTypes.ADD_COMMENTS: // to download/fetch previous comments
      return { ...state, errMess: null, comments: action.payload };
    case ActionTypes.COMMENTS_FAILED:
      return { ...state, errMess: action.payload };
    case ActionTypes.ADD_COMMENT: {
      // to post a new comment
      const comment = action.payload;
      return { ...state, comments: state.comments.concat(comment) };
    }
    default: {
      return state;
    }
  }
};

export default Comments;
