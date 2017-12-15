import React, { Component } from 'react';
import { BrowserRouter as Router, Route, withRouter, Redirect } from 'react-router-dom'
import thunkMiddleware from 'redux-thunk'
import { reducer as formReducer } from 'redux-form';
import { combineReducers, createStore, applyMiddleware } from 'redux';
import { Provider, connect } from 'react-redux';
import PropTypes from 'prop-types'
import LogInForm from './LogInForm';
import './App.css';
import UserInfo from './UserInfo';
import { loginUser, user } from './reducers';
import { logIn, fetchUserData } from './actions';
import { client } from './Client'


const reducer = combineReducers({
  user: user,
  jsonWebToken: loginUser,
  form: formReducer});

let store = createStore(
  reducer,
  applyMiddleware(
    thunkMiddleware
  ));

const Container = ({handleSubmit}) => (
    <Route
      exect path="/login"
      render={(props) => (
        <LogInForm {...props} onSubmit={handleSubmit}/>
      )
      }
    />
);

Container.propTypes = {
  handleSubmit: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    handleSubmit: (data) => {
      client.login(JSON.stringify(data))
        .then((json) => {
          let jsonWebToken = json.token;
          store.dispatch(logIn(ownProps.history, jsonWebToken));
          return jsonWebToken;
        })
        .then((token) => store.dispatch(fetchUserData(token)))
        .catch(err => console.log(err));
    }
  }
};

const connectedContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(Container));

const RouteWhenLoggedIn1 = ({ component: Component, ...rest }) => {
  const jwt = client.isLoggedIn();
  if (jwt) {
    store.dispatch(fetchUserData(jwt));
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
            <RouteWhenLoggedIn1 exect path="/main" component={UserInfo} />
          </div>
        </Router>
      </Provider>
    );
  }
}


export default App;
