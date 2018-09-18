import { combineReducers } from 'redux';
import users from './reducer_user';
import auth from './reducer_auth';

const rootReducer = combineReducers({
  auth,
  users
});

export default rootReducer;
