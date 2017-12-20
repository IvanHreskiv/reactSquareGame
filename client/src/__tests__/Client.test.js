import { client } from '../Client';

const LOCAL_STORAGE_KEY = 'sr-spotiafy-fake-auth';

describe('Login', () => {
  it('login user', () => {
    const user = {
      username: 'username',
      password: 'password'
    };

    const res = JSON.stringify({
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRl' +
      'bW9AZGVtby5jb20iLCJmaXJzdE5hbWUiOiJKb2huMSIsImlkIjoxM' +
      'SwiaWF0IjoxNTExNTI4NzgzfQ.K8IBX_1VYma-TDvyAD8l5qYGmhY17Wc4PTupUv0utrY'
    });

    fetch.mockResponse(res);

    return client.login(user)
      .then((json) => {
        expect(json.token).toBeDefined();
        expect(typeof json.token).toBe('string');
        expect(client.token).toBeDefined();
        expect(typeof client.token).toBe('string');
        expect(localStorage.setItem).toHaveBeenLastCalledWith(LOCAL_STORAGE_KEY, json.token);
      })
  })
});

describe('Logout', () => {
  it('logout user', () => {
    client.logout();
    expect(client.token).toBeNull();
  })
});

