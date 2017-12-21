/*
 * action type
 */
import { client } from './Client';
import { decodeToken } from './helpers';


export const LOGIN_USER = 'LOGIN_USER';
export const START_GAME = 'START_GAME';
export const FETCH_USER_REQUEST = 'FETCH_POSTS_REQUEST';
export const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS';
export const FETCH_USER_FAILURE = 'FETCH_USER_FAILURE';

/*
 * action creators
 */

export function logInUserAction(history, token) {
  localStorage.setItem('jwt', token);
  history.push('/main');

  return {
    type: LOGIN_USER,
    jsonWebToken: token
  }
}

export function fetchUserRequestAction() {
  return {
    type: FETCH_USER_REQUEST,
  }
}

export function fetchUserFailureAction(error) {
  return {
    type: FETCH_USER_FAILURE,
    error: error
  }
}

export function fetchUserSuccessAction(json) {
  return {
    type: FETCH_USER_SUCCESS,
    data: json.user
  }
}

export function fetchUserDataAction(token) {
  const decoded = decodeToken(token);

  return function (dispatch) {
    dispatch(fetchUserRequestAction());

    return client.getUser(decoded.payload.id)
      .then(json => dispatch(fetchUserSuccessAction(json)))
      .catch(error => dispatch(fetchUserFailureAction(error)))
  }

}

export function startGame(obstacles) {
  return {
    type: START_GAME,
    obstacles
  }
}
