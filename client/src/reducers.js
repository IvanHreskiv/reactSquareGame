import * as actions from './actions';
//TODO move it to somewhere
import { ColoredRect } from './Game';


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

//TODO move it to somewhere
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
  obstacles.push(ColoredRect(props1));
  obstacles.push(ColoredRect(props2));

  return obstacles
};

const initialState =  {
  square: {
    x: 20,
    y: 20,
    width: 50,
    height: 50,
    fill:'red',
    shadowBlur: 5,
  },
  obstacles: genColumnObstacle()
};

export function gameReducer(state = initialState, action) {
  switch (action.type) {
    case actions.START_GAME:
      return state;
    default:
      return state;
  }
}
