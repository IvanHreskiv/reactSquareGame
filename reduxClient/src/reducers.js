import { LOGIN_USER, USER_LOGGED_IN } from './actions';
import { client } from './Client'


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

const decodeToken = (jwt) => {
  const [headerB64, payloadB64] = jwt.split('.');
  const headerStr = new Buffer(headerB64, 'base64').toString();
  const payloadStr = new Buffer(payloadB64, 'base64').toString();
  return {
    header: JSON.parse(headerStr),
    payload: JSON.parse(payloadStr)
  };
};

export function user(state = {}, action) {
  switch (action.type) {
    case USER_LOGGED_IN:
      const decoded = decodeToken(action.token);
      //TODO: it does not works
      client.getUser(decoded.payload.id)
      .then((res) => {
        return Object.assign({}, state, {
          user: res.user
        });
      })
      .catch(err => console.log(err))

      return {
        username: 'jdoe',
        fName: 'John',
        lName: 'Doe',
        email: 'jdoe@gmail.com'
      };
    default:
      return state;
  }
}
