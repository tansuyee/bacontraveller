import axios from 'axios';
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE
} from './types';
import { API_URL } from '../constant';

export function signup(creds) {
  return function (dispatch) {
    dispatch(requestSignup(creds))

    return axios({
      method: 'post',
      url: API_URL.SIGNUP,
      data: creds
    })
    .then((response) => {
      dispatch(receiveSignup(response.data))
    })
    .catch((err) => {
      if (err.response) {
        console.log("Error: ", err)
        dispatch(signupError(err.response.data.message))
      }
      throw err;
    })
  }
}

export function login(creds) {
  return function (dispatch) {
    dispatch(requestLogin(creds))

    return axios({
      method: 'post',
      url: API_URL.LOGIN,
      data: creds
    })
    .then((response) => {
      console.log(response);
      localStorage.setItem('token', response.data.token)
      dispatch(receiveLogin(response.data))
    })
    .catch((err) => {
      if (err.response) {
        console.log("Error: ", err)
        dispatch(loginError(err.response.data.message))
      }
      throw err;
    })
  }
}

function requestSignup(creds) {
  return {
    type: SIGNUP_REQUEST,
    payload: {
      isFetching: true,
      isAuthenticated: false,
      creds
    }
  }
}

function receiveSignup(user) {
  return {
    type: SIGNUP_SUCCESS,
    payload: {
      isFetching: false,
      isAuthenticated: false
    }
  }
}

function signupError(message) {
  return {
    type: SIGNUP_FAILURE,
    payload: {
      isFetching: false,
      isAuthenticated: false,
      message
    }
  }
}

function requestLogin(creds) {
  return {
    type: LOGIN_REQUEST,
    payload: {
      isFetching: true,
      isAuthenticated: false,
      creds
    }
  }
}

function receiveLogin(user) {
  return {
    type: LOGIN_SUCCESS,
    payload: {
      isFetching: false,
      isAuthenticated: true,
      token: user.token,
      user: user
    }
  }
}

function loginError(message) {
  return {type: LOGIN_FAILURE,
    payload: {
      isFetching: false,
      isAuthenticated: false,
      message
    }
  }
}
