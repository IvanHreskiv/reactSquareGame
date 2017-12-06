import fetch from 'isomorphic-fetch'

const LOCAL_STORAGE_KEY = 'sr-spotiafy-fake-auth';
const SERVER_HOST = 'http://squaregame.com:3001';


class Client {
  counstructor() {
    this.useLocalStorage = (typeof localStorage !== 'undefined');

    if (this.useLocalStorage) {
      this.token = localStorage.getItem(LOCAL_STORAGE_KEY);

      if (this.token) {
        this.isTokenValid().then((bool) => {
          if (!bool) {
            this.token = null
          }
        })  
      }
    }
  }
  isLoggedIn() {
    return !!this.token
  }

  setToken(token) {
    this.token = token;

    if (this.useLocaltorage) {
      localStorage.setItem(LOCAL_STORAGE_KEY, token)
    }

    return token
  }

  removeToken() {
    this.token = null;

    if (this.useLocalStorage) {
      localStorage.removeItem(LOCAL_STORAGE_KEY)
    }
  }

  isTokenValid() {
    return true;
  }

  checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
      return response
    } else {
      const error = new Error(`HTTP Error ${response.statusText}`);
      error.responcse = response;
      console.log(error);
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
      .then((json) => this.setToken(json.token))
  }

  logout() {
    this.removeToken()
  }

  create_score(data) {
    return fetch( SERVER_HOST + '/api/scores', {
      method: 'POST',
      headers: {
        accept: 'application/json',
      },
      body: data,
    }).then(this.checkStatus)
      .then(this.parseJson)
  }

  create_user(data) {
    return fetch( SERVER_HOST + '/api/users', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: data,
    }).then(this.checkStatus)
      .then(this.parseJson)
      .then((json) => this.setToken(json.token))
  }

  authenticate() {
      return fetch( SERVER_HOST + '/auth', {
          method: 'GET',
      }).then(this.checkStatus)
        .then(this.parseJson)
  }
}


export const client = new Client();
