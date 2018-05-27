import { combineReducers } from 'redux';
import bookReducer from './bookReducer';
import userReducer from './userReducer';

const rootReducer = combineReducers({
  bookReducer,
  userReducer,
});

export default rootReducer;
