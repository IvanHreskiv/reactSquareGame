import React, { Component } from 'react';
import logo from './logo.svg';
import { BrowserRouter as Router, Route, withRouter } from 'react-router-dom'
import { reducer as formReducer, Field, reduxForm } from 'redux-form';
import { combineReducers, createStore } from 'redux';
import { Provider, connect } from 'react-redux';
import PropTypes from 'prop-types'
import LogInForm from './LogInForm';
import './App.css';
import UserInfo from './UserInfo';
import { loginUser, user } from './reducers';
import { logIn, userLoggedIn} from './actions';
import { client } from './Client'

const reducer = combineReducers({
  user: user,
  jsonWebToken: loginUser,
  form: formReducer});

let store = createStore(reducer, {});

const Container = ({handleSubmit}) => (
  <div style={{ padding: 15 }}>
    <Route exect path="/main" component={UserInfo} />
    <Route
      exect path="/login"
      render={(props) => (
        <LogInForm {...props} onSubmit={handleSubmit}/>
      )
      }
    />
  </div>
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
        .then((token) => store.dispatch(userLoggedIn(token)))
        .catch(err => console.log(err));
    }
  }
};

const connectedContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(Container));

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Route exect path="/" component={connectedContainer} />
        </Router>
      </Provider>
    );

  }
}


export default App;
