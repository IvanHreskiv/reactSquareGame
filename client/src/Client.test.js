import { client } from './Client';

//global.fetch = require('jest-fetch-mock');

//jest.mock('../node_modules/node-fetch', () => {
//  return require('jest-fetch-mock');
//});



describe('Get user', () => {
  it('fetches user data', () => {
    fetch.mockResponse(JSON.stringify({username: 'username'}));

    client.getUser(1)
      .then((user) => {
        expect(user).toBe({username: 'username'});
      })
  })
});


describe('My test suite', () => {
  it('`true` should be `true`', () => {
    expect(true).toBe(true);
  });
  it('`false` should be `false`', () => {
    expect(false).toBe(false);
  });
});