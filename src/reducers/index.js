import { combineReducers } from 'redux';
import users from './reducer_user';
import auth from './reducer_auth';
import posts from './reducer_posts';

const rootReducer = combineReducers({
  auth,
  posts,
  users,
});

export default rootReducer;
