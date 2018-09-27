import _ from 'lodash';
import {
  USER_GET,
  USER_EDIT,
  USER_FOLLOW,
  USER_UNFOLLOW,
} from '../actions/types';

export default function (state = [], action) {
  switch (action.type) {
    case USER_GET:
    case USER_FOLLOW:
    case USER_UNFOLLOW:
      const user = action.payload.data;
      return _.extend({}, state, {[user.id]: user});
    case USER_EDIT:
      const currUser = action.payload.data;
      return _.extend({}, state, {[currUser.id]: _.extend(state[currUser.id], currUser)});
    default:
      return state;
  }
}
