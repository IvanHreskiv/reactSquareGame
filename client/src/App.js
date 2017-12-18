import React, { Component } from 'react';
import { BrowserRouter as Router, Route, withRouter, Redirect } from 'react-router-dom'
import thunkMiddleware from 'redux-thunk'
import { reducer as formReducer } from 'redux-form';
import { combineReducers, createStore, applyMiddleware } from 'redux';
import { Provider, connect } from 'react-redux';
import './App.css';
import UserInfo from './UserInfo';
import LogOut from './Logout';
import { loginUserReducer, userReducer } from './reducers';
import { fetchUserDataAction } from './actions';
import { connectedContainer } from './Container';
import { client } from './Client'


const reducer = combineReducers({
  user: userReducer,
  jsonWebToken: loginUserReducer,
  form: formReducer});

let store = createStore(
  reducer,
  applyMiddleware(
    thunkMiddleware
  ));

const RouteWhenLoggedIn = ({ component: Component, ...rest }) => {
  const jwt = client.isLoggedIn();
  if (jwt) {
    store.dispatch(fetchUserDataAction(jwt));
    return (
      <Route {...rest} render={(props) => (
          <Component {...props} />)}/>
      );
  } else {
    return (
      <Redirect to='/login' />
    );
  }
};


class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div style={{ padding: 15 }}>
            <Route exect path="/" component={connectedContainer} />
            <Route exect path="/logout" component={LogOut} />
            <RouteWhenLoggedIn exect path="/main" component={UserInfo} />
          </div>
        </Router>
      </Provider>
    );
  }
}


export default App;
