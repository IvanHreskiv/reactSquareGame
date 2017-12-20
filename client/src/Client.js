const LOCAL_STORAGE_KEY = 'sr-spotiafy-fake-auth';
const SERVER_HOST = 'http://squaregame.com:3001';


class Client {
  constructor() {
    this.token = localStorage.getItem(LOCAL_STORAGE_KEY);
  }

  isLoggedIn() {
    return this.token;
  }

  setToken(token) {
    this.token = token;

    localStorage.setItem(LOCAL_STORAGE_KEY, token)
  }

  removeToken() {
    this.token = null;

    localStorage.removeItem(LOCAL_STORAGE_KEY)
  }

  checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
      return response
    } else {
      const error = new Error(`HTTP Error ${response.statusText}`);
      error.responcse = response;
      throw error
    }
  }

  parseJson(response) {
    return response.json()
  }


  login(data) {
    return fetch( SERVER_HOST + '/api/login', {
      method: 'POST',
      headers: new Headers({
        'content-type': 'application/json'
      }),
      body: data,
    }).then(this.checkStatus)
      .then(this.parseJson)
      .then((json) => {
        this.setToken(json.token);
        return json;
      })
  }

  logout() {
    this.removeToken()
  }

  create_score(data) {
    return fetch( SERVER_HOST + '/api/scores', {
      method: 'POST',
      headers: new Headers({
        'content-type': 'application/json',
        'Authorization': 'JWT ' + this.token,
      }),
      body: data,
    }).then(this.checkStatus)
      .then(this.parseJson)
  }

  getUser(id) {
    return fetch( SERVER_HOST +`/api/users/${id}`, {
      method: 'GET',
      headers: new Headers({
        'content-type': 'application/json',
        'Authorization': 'JWT ' + localStorage.getItem('jwt'),
      }),
    }).then(this.checkStatus)
      .then(this.parseJson)
  }

  getScores() {
    return fetch( SERVER_HOST + '/api/user_scores/', {
      method: 'GET',
      headers: new Headers({
        'content-type': 'application/json',
        'Authorization': 'JWT ' + localStorage.getItem('jwt'),
      }),
    }).then(this.checkStatus)
      .then(this.parseJson)
  }

  create_user(data) {
    return fetch( SERVER_HOST + '/api/users', {
      method: 'POST',
      headers: new Headers({
        'content-type': 'application/json',
      }),
      body: data,
    }).then(this.checkStatus)
      .then(this.parseJson)
      .then((json) => this.setToken(json.token))
  }

  authenticate() {
      return fetch( SERVER_HOST + '/auth/facebook', {
          method: 'GET',
      }).then(this.checkStatus)
        .then(this.parseJson)
  }
}

export const client = new Client();
