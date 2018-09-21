import _ from 'lodash';
import {
  USER_GET,
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
    default:
      return state;
  }
}
