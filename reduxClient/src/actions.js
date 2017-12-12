/*
 * action type
 */
export const LOGIN_USER = 'LOGIN_USER';
export const USER_LOGGED_IN = 'USER_LOGGED_IN';

/*
 * action creators
 */

export function logIn(history, token) {
  localStorage.setItem('jwt', token);
  history.push('/main');

  return {
    type: LOGIN_USER,
    jsonWebToken: token
  }
}


export function userLoggedIn(token) {
  return {
    type: USER_LOGGED_IN,
    token: token
  }
}
