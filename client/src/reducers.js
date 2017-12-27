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
  crashed: false,
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

function crashWith(obj, otherobj) {
  const myleft = obj.x;
  const myright = obj.x + (obj.width);
  const mytop = obj.y;
  const mybottom = obj.y + (obj.height);
  const otherleft = otherobj.x;
  const otherright = otherobj.x + (otherobj.width);
  const othertop = otherobj.y;
  const otherbottom = otherobj.y + (otherobj.height);
  let crash = true;
  if ((mybottom < othertop) ||
    (mytop > otherbottom) ||
    (myright < otherleft) ||
    (myleft > otherright)) {
    crash = false;
  }
  return crash;
}

export function gameReducer(state = initialState, action) {
  switch (action.type) {
    //TODO should be ranamed to draw
    case actions.START_GAME:
      let crashed = false;
      for (let i = 0; i < state.obstacles.length; i += 1) {
        if (crashWith(state.square, state.obstacles[i])) {
          crashed = true;
        }
      }
      let stateObstacles = state.obstacles.map( (obstacle) => {
        obstacle.x -= 1;
        return obstacle;
      });
      const frameNo = state.frameNo + 1;
      //TODO Probably should be refactored
      if (state.frameNo === 1 || everyinterval(state, 150)) {
        return Object.assign({}, state, {
          obstacles: [...stateObstacles, ...action.obstacles],
          frameNo: frameNo,
          crashed: crashed
        });
      } else {
        return Object.assign({}, state, {
          obstacles: stateObstacles,
          frameNo: frameNo,
          crashed: crashed
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
    case actions.MOVE_UP:
      return Object.assign({}, state, {
        square: Object.assign({}, state.square, {
          y: state.square.y - 1
        })
      });
    case actions.MOVE_DOWN:
      return Object.assign({}, state, {
        square: Object.assign({}, state.square, {
          y: state.square.y + 1
        })
      });
    case actions.MOVE_RIGHT:
      return Object.assign({}, state, {
        square: Object.assign({}, state.square, {
          x: state.square.x + 1
        })
      });
    case actions.MOVE_LEFT:
      return Object.assign({}, state, {
        square: Object.assign({}, state.square, {
          x: state.square.x - 1
        })
      });


    default:
      return state;
  }
}
