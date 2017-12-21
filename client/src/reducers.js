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
  square: {
    x: 20,
    y: 20,
    width: 50,
    height: 50,
    fill:'red',
    shadowBlur: 5,
  },
  obstacles: []
};

export function gameReducer(state = initialState, action) {
  switch (action.type) {
    case actions.START_GAME:
      return Object.assign({}, state, {
        obstacles: action.obstacles
      });
    default:

      return state;
  }
}
