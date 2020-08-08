import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import Dishes from './dishes';
import Comments from './comments';
import Promotions from './promotions';
import Leaders from './leaders';
import Feedback from './feedback';

const ConfigureStore = () => {
  const store = createStore(
    combineReducers({
      dishes: Dishes,
      comments: Comments,
      promotions: Promotions,
      leaders: Leaders,
      feedback: Feedback,
    }),
    applyMiddleware(thunk, logger),
  );
  return store;
};

export default ConfigureStore;
