/*
 * action type
 */
import { client } from './Client';
import { decodeToken } from './helpers';
import v1 from 'uuid';


export const LOGIN_USER = 'LOGIN_USER';
export const CRASHED = 'CRASHED';
export const CHECK_IF_CRASHED = 'CHECK_IF_CRASHED';
export const DRAW_GAME = 'DRAW_GAME';
export const STOP_GAME = 'STOP_GAME';
export const STOP_GAME_IF_CRASHED = 'STOP_GAME_IF_CRASHED';
export const MOVE_UP = 'MOVE_UP';
export const MOVE_DOWN = 'MOVE_DOWN';
export const MOVE_RIGHT = 'MOVE_RIGHT';
export const MOVE_LEFT = 'MOVE_LEFT';
export const INCREASE_FRAME_NO = 'INCREASE_FRAME_NO';
export const MOVE_OBSTACLES_LEFT = 'MOVE_OBSTACLES_LEFT';
export const FETCH_USER_REQUEST = 'FETCH_POSTS_REQUEST';
export const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS';
export const FETCH_USER_FAILURE = 'FETCH_USER_FAILURE';
export const SAVE_GAME_INTERVAL = 'SAVE_GAME_INTERVAL';

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
    x: x, y: 0, width: 10, height: height, fill: 'red', shadowBlur: 5, key: v1()
  };
  const props2 = {
    x: x, y: (height + gap), width: 10, height: (x - height), fill: 'red', shadowBlur: 5, key: v1()
  };
  obstacles.push(props1);
  obstacles.push(props2);

  return obstacles
};

export function saveGameInterval(interval) {
  return {
    type: SAVE_GAME_INTERVAL,
    interval
  }
}

export function startGame() {
  return function (dispatch) {
    const interval = setInterval(() => dispatch(updateGame()), 20);
    dispatch(saveGameInterval(interval));
  }
}

export function checkIfCrashed() {
  return {
    type: CHECK_IF_CRASHED
  }
}

export function stopIfCrashed() {
  return {
    type: STOP_GAME_IF_CRASHED
  };
}

export function updateGame() {
  return function (dispatch) {
    dispatch(checkIfCrashed());
    dispatch(stopIfCrashed());
    dispatch(moveObstaclesLeft(1));
    dispatch(drawGame(genColumnObstacle()));
    dispatch(increaseFrameNo(1));
  }
}

export function drawGame(obstacles) {
  return {
    type: DRAW_GAME,
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

export function moveObstaclesLeft(step) {
  return {
    type: MOVE_OBSTACLES_LEFT,
    step
  }
}

export function increaseFrameNo(count) {
  return {
    type: INCREASE_FRAME_NO,
    count
  };
}
