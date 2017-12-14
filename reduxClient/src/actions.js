/*
 * action type
 */
import { client } from './Client'


export const LOGIN_USER = 'LOGIN_USER';
export const FETCH_USER_REQUEST = 'FETCH_POSTS_REQUEST';
export const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS';
export const FETCH_USER_FAILURE = 'FETCH_USER_FAILURE';

/*
 * action creators
 */

export function logIn(history, token) {
  localStorage.setItem('jwt', token);
  history.push('/main');

  return {
    type: LOGIN_USER,
    jsonWebToken: token
  }
}


const decodeToken = (jwt) => {
  const [headerB64, payloadB64] = jwt.split('.');
  const headerStr = new Buffer(headerB64, 'base64').toString();
  const payloadStr = new Buffer(payloadB64, 'base64').toString();
  return {
    header: JSON.parse(headerStr),
    payload: JSON.parse(payloadStr)
  };
};

export function fetchUserRequest() {
  return {
    type: FETCH_USER_REQUEST,
  }
}

export function fetchUserFailure(error) {
  return {
    type: FETCH_USER_FAILURE,
    error: error
  }
}

export function fetchUserSuccess(json) {
  return {
    type: FETCH_USER_SUCCESS,
    data: json.user
  }
}

export function fetchUserData(token) {
  const decoded = decodeToken(token);

  return function (dispatch) {
    dispatch(fetchUserRequest());

    return client.getUser(decoded.payload.id)
      .then(json => dispatch(fetchUserSuccess(json)))
      .catch(error => dispatch(fetchUserFailure(error)))
  }

}
