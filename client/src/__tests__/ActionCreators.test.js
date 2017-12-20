import configureMockStore from 'redux-mock-store' // mock store
import thunk from 'redux-thunk'


const middlewares = [ thunk ];
const mockStore = configureMockStore(middlewares);

import { fetchUserDataAction, FETCH_USER_REQUEST } from '../actions';

describe('Fetch user data action creator', () => {
  it('dispatches the correct actions on successful fetch request', () => {
    const data = {
      username: 'username',
      email: 'email@email.com',
      id: 12336465
    };

    fetch.mockResponse(JSON.stringify({user: data}));

    const expectedActions = [
      { type: FETCH_USER_REQUEST },
      {"data": data, "type": "FETCH_USER_SUCCESS"}
    ];

    const store = mockStore({isFetching: false, data: {}, error: null});

    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRl' +
      'bW9AZGVtby5jb20iLCJmaXJzdE5hbWUiOiJKb2huMSIsImlkIjoxM' +
      'SwiaWF0IjoxNTExNTI4NzgzfQ.K8IBX_1VYma-TDvyAD8l5qYGmhY17Wc4PTupUv0utrY';

    return store.dispatch(fetchUserDataAction(token))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      })
  });

  it('dispatches the correct actions on failed fetch request', () => {
    fetch.mockReject({status: 503});

    const expectedActions = [
      { type: FETCH_USER_REQUEST },
      {"error": {status: 503}, "type": "FETCH_USER_FAILURE"}
    ];

    const store = mockStore({isFetching: false, data: {}, error: null});

    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRl' +
      'bW9AZGVtby5jb20iLCJmaXJzdE5hbWUiOiJKb2huMSIsImlkIjoxM' +
      'SwiaWF0IjoxNTExNTI4NzgzfQ.K8IBX_1VYma-TDvyAD8l5qYGmhY17Wc4PTupUv0utrY';

    return store.dispatch(fetchUserDataAction(token))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      })
  })
});
