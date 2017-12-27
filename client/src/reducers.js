import * as actions from './actions';


export function loginUserReducer(state = {}, action) {
  switch (action.type) {
    case actions.LOGIN_USER:
      return Object.assign({}, state, {
        jsonWebToken: action.jsonWebToken
      });
    default:
      return state;
  }
}

export function userReducer(state = {isFetching: false, data: {}, error: null}, action) {
  switch (action.type) {
    case actions.FETCH_USER_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        data: {},
        error: null
      });
    case actions.FETCH_USER_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        data: action.data,
        error: null
      });
    case actions.FETCH_USER_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        data: {},
        error: action.error
      });
    default:
      return state;
  }
}

const initialState =  {
  frameNo: 0,
  square: {
    x: 20,
    y: 20,
    width: 50,
    height: 50,
    fill:'red',
    shadowBlur: 5,
  },
  obstacles: [],
  interval: null
};

function everyinterval(state, n) {
  if ((state.frameNo / n) % 1 === 0) {return true;}
  return false;
}

export function gameReducer(state = initialState, action) {
  switch (action.type) {
    case actions.START_GAME:
      let stateObstacles = state.obstacles.map( (obstacle) => {
        obstacle.x -= 1;
        return obstacle;
      });
      const frameNo = state.frameNo + 1;
      //TODO Probably should be refactored
      if (state.frameNo === 1 || everyinterval(state, 150)) {
        return Object.assign({}, state, {
          obstacles: [...stateObstacles, ...action.obstacles],
          frameNo: frameNo
        });
      } else {
        return Object.assign({}, state, {
          obstacles: stateObstacles,
          frameNo: frameNo
        });
      }
    case actions.SET_GAME_INTERVAL:
      return Object.assign({}, state, {
        interval: action.interval
      });
    case actions.STOP_GAME:
      clearInterval(state.interval);
      return Object.assign({}, state, {
        interval: null
      });


    default:
      return state;
  }
}
