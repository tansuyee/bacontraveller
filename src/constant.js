const ROOT_API = window.location.protocol + "//" + window.location.hostname + ":8000";

export const API_URL = {
  LOGIN: `${ROOT_API}/v1/login`,
  SIGNUP: `${ROOT_API}/v1/users`,
  GET_ALL_POST: `${ROOT_API}/v1/posts`,
  POST_BASE: `${ROOT_API}/v1/posts`,
}
