import * as ActionTypes from './actionTypes';

const Feedback = (state = { errMess: null, feedback: [] }, action) => {
  switch (action.type) {
    case ActionTypes.FEEDBACK_FAILED:
      return { ...state, errMess: action.payload };
    case ActionTypes.ADD_FEEDBACK: {
      const feedback = action.payload;
      return { ...state, feedback: state.feedback.concat(feedback) };
    }
    default: {
      return state;
    }
  }
};

export default Feedback;
