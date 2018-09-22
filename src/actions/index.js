import _ from 'lodash';
import axios from 'axios';
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  LOGOUT,
  POST_GET_ALL,
  POST_GET,
  POST_CREATE,
  POST_ACCEPT,
  POST_COMMENT,
  USER_GET,
  USER_FOLLOW,
  USER_UNFOLLOW
} from './types';
import { API_URL } from '../constant';

function authorisedGetRequest(url) {
  return axios.get(
    url,
    { headers:
      {'Authorization': `Bearer ${localStorage.getItem('access_token')}`}
    })
}

function authorisedPostRequest(extra_params) {
  let params = {
    method: 'post',
    headers: {'Authorization': `Bearer ${localStorage.getItem('access_token')}`}
  }
  return axios(_.merge(params, extra_params));
}

export function followUser(id) {
  const url = API_URL.USER_BASE + `/${id}/follow`;
  const request = authorisedPostRequest({url});

  return {type: USER_FOLLOW, payload: request};
}

export function unfollowUser(id) {
  const url = API_URL.USER_BASE + `/${id}/follow`;
  const request = axios({
    url,
    method: 'delete',
    headers: {'Authorization': `Bearer ${localStorage.getItem('access_token')}`}
  })

  return {type: USER_UNFOLLOW, payload: request};
}

export function getUser(id) {
  const url = API_URL.USER_BASE + `/${id}`;
  const request = axios.get(url);

  return {type: USER_GET, payload: request};
}

export function configAndInitialize() {
  const token = localStorage.getItem('access_token');
  if (token) {
    return function (dispatch) {

      const userId = JSON.parse(atob(_.split(token, '.')[1])).id;
      const url = API_URL.USER_BASE + `/${userId}`;

      return axios.get(url)
      .then((response) => {
        dispatch(receiveLogin({user: response.data}))
      })
    }
  }
}

export function commentPost(data) {
  const url = API_URL.POST_BASE + `/${data.id}/comments`;
  const request = authorisedPostRequest({
    url,
    data: {
      text: data.text
    }
  });

  return {type: POST_COMMENT, payload: request};
}

export function acceptPost(id) {
  const url = API_URL.POST_BASE + `/${id}/accept`;
  const request = authorisedPostRequest({
    url
  });

  return {type: POST_ACCEPT, payload: request};
}

export function createPost(data) {
  const url = API_URL.POST_BASE;
  const request = authorisedPostRequest({
    url,
    data
  });

  return {type: POST_CREATE, payload: request}
}

export function getPost(id) {
  const url = API_URL.POST_BASE + `/${id}`;
  const request = axios.get(url);

  return {type: POST_GET, payload: request};
}

export function getAllPosts() {
  const url = API_URL.GET_ALL_POST;
  const request = axios.get(url);

  return {type: POST_GET_ALL, payload: request};
}


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
      localStorage.setItem('access_token', response.data.token)
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

export function logOut() {
  localStorage.removeItem('access_token');
  return {type: LOGOUT,
    payload: {
      isFetching: false,
      isAuthenticated: false,
    }
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
      user: user.user
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
