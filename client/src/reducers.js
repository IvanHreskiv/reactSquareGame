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
  frameNo: 1,
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
    case actions.CHECK_IF_CRASHED:
      let crashed = false;
      for (let i = 0; i < state.obstacles.length; i += 1) {
        if (crashWith(state.square, state.obstacles[i])) {
          crashed = true;
        }
      }
      return Object.assign({}, state, {
        crashed: crashed
      });
    case actions.STOP_GAME_IF_CRASHED:
      if (state.crashed) {
        clearInterval(state.interval);
        return Object.assign({}, state, {
          interval: null
        });
      } else {
        return state;
      }
    case actions.MOVE_OBSTACLES_LEFT:
      let obstacles = state.obstacles.map( (obstacle) => {
        obstacle.x -= action.step;
        return obstacle;
      });
      return Object.assign({}, state, {
        obstacles: obstacles
      });
    case actions.INCREASE_FRAME_NO:
      const frameNo = state.frameNo + action.count;
      return Object.assign({}, state, {
        frameNo: frameNo
      });
    case actions.DRAW_GAME:
      if (state.frameNo === 1 || everyinterval(state, 150)) {
        return Object.assign({}, state, {
          obstacles: [...state.obstacles, ...action.obstacles],
        });
      } else {
        return state;
      }
    case actions.SAVE_GAME_INTERVAL:
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
