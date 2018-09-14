import { combineReducers } from 'redux';
import users from './reducer_user';

const rootReducer = combineReducers({
  users
});

export default rootReducer;
