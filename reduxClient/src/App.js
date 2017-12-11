import React, { Component } from 'react';
import logo from './logo.svg';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { reducer as formReducer, Field, reduxForm } from 'redux-form';
import { combineReducers, createStore } from 'redux';
import { Provider } from 'react-redux';
import LogInForm from './LogInForm';
import './App.css';
import { loginUser } from './reducers';
import { logIn } from './actions';
import { client } from './Client'

const reducer = combineReducers({
  jsonWebToken: loginUser,
  form: formReducer});

let store = createStore(reducer, {});

const userD = {username: 'username1'};
store.dispatch(logIn(userD));

console.log(store.getState());


class App extends Component {
  handleSubmit = (data) => {
    client.login(JSON.stringify(data))
      .then((json) => {
        let jsonWebToken = json.token;
        store.dispatch(logIn(jsonWebToken));
      })
      .catch(err => console.log(err));

  };

  render() {
    return (
      <Provider store={store}>
        <Router>
          <div style={{ padding: 15 }}>
            <Route path="/main" component={LogInForm} />
            <LogInForm onSubmit={this.handleSubmit}/>
          </div>
        </Router>
      </Provider>
    );

  }
}

export default App;
