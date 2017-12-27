/*
 * action type
 */
import { client } from './Client';
import { decodeToken } from './helpers';


export const LOGIN_USER = 'LOGIN_USER';
export const START_GAME = 'START_GAME';
export const STOP_GAME = 'STOP_GAME';
export const MOVE_UP = 'MOVE_UP';
export const MOVE_DOWN = 'MOVE_DOWN';
export const MOVE_RIGHT = 'MOVE_RIGHT';
export const MOVE_LEFT = 'MOVE_LEFT';
export const FETCH_USER_REQUEST = 'FETCH_POSTS_REQUEST';
export const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS';
export const FETCH_USER_FAILURE = 'FETCH_USER_FAILURE';
export const SET_GAME_INTERVAL = 'SET_GAME_INTERVAL';

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

const genColumnObstacle = () => {
  let obstacles = [];
  let x = 460;
  let minHeight = 20;
  let maxHeight = 200;
  let height = Math.floor(Math.random()*(maxHeight-minHeight+1)+minHeight);
  let minGap = 50;
  let maxGap = 200;
  let gap = Math.floor(Math.random()*(maxGap-minGap+1)+minGap);
  const props1 = {
    x: x, y: 0, width: 10, height: height, fill: 'red', shadowBlur: 5
  };
  const props2 = {
    x: x, y: (height + gap), width: 10, height: (x - height), fill: 'red', shadowBlur: 5
  };
  obstacles.push(props1);
  obstacles.push(props2);

  return obstacles
};

export function saveGameInterval(interval) {
  return {
    type: SET_GAME_INTERVAL,
    interval
  }
}

export function setGameTimer() {
  return function (dispatch) {
    const interval = setInterval(() => dispatch(startGame(genColumnObstacle())), 20);
    dispatch(saveGameInterval(interval));
  }
}

export function startGame(obstacles) {
  return {
    type: START_GAME,
    obstacles
  }
}

export function stopGame() {
  return {
    type: STOP_GAME,
  }
}

export function moveUP() {
  return {
    type: MOVE_UP
  }
}

export function moveDown() {
  return {
    type: MOVE_DOWN
  }
}

export function moveRight() {
  return {
    type: MOVE_RIGHT
  }
}

export function moveLeft() {
  return {
    type: MOVE_LEFT
  }
}
