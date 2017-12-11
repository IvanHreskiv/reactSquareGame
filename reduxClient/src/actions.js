/*
 * action type
 */

export const LOGIN_USER = 'LOGIN_USER';

/*
 * action creators
 */

export function logIn(token) {
  // redirect to home
  localStorage.setItem('jwt', token);

  return {
    type: LOGIN_USER,
    jsonWebToken: token
  }
}

