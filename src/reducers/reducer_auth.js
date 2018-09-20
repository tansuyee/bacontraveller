import _ from 'lodash';
import {
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_REQUEST,
  SIGNUP_FAILURE
} from '../actions/types';

export default function (state = { isLoggedIn: false }, action) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return _.extend({}, state, { isLoggedIn: true, login: action.payload });
    case SIGNUP_SUCCESS:
      return _.extend({}, state, { isSignedUp: true, login: action.payload });
    case LOGIN_FAILURE:
    case LOGIN_REQUEST:
    case SIGNUP_FAILURE:
    case SIGNUP_REQUEST:
      return _.extend({}, state, { login: action.payload });
    default:
      return state;
  }
}
