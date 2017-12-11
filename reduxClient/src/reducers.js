import { LOGIN_USER } from './actions';


export function loginUser(state = {}, action) {

  switch (action.type) {
    case LOGIN_USER:
      return Object.assign({}, state, {
        jsonWebToken: action.jsonWebToken
      });
    default:
      return state;
  }
}
