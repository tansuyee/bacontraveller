import _ from 'lodash';
import {
  POST_GET_ALL,
  POST_GET,
  POST_CREATE,
} from '../actions/types';

export default function (state = [], action) {
  switch (action.type) {
    case POST_GET:
    case POST_CREATE:
      const post = action.payload.data;
      return _.extend({}, state, {[post.id]: post});
    case POST_GET_ALL:
      const posts = action.payload.data;
      return _.extend({}, state, _.keyBy(posts, 'id'));
    default:
      return state;
  }
}
