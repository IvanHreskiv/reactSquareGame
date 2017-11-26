import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './App.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Redirect } from 'react-router';
import Login from './Login';
import Logout from './Logout';
import Header from './Header';
import Singup from './Singup';
import GameContainer from './Game';
import { client } from './Client'


class App extends Component {
  getChildContext = () => {
    return {
      user: {
        name: 'username',
        email: 'email@rmail.com'
      }
    };
  }

  render() {
    return (
      <Router>
        <div>
          <Header />
          <Route exact path='/' render={props => (
            <Link to='/login'>
              <span>login</span>
            </Link>
          )} />
          <Route exact path='/login' component={Login} />
          <RouteWhenLoggedIn exact path='/game' component={GameContainer} />
          <Route exact path='/logout' component={Logout} />
          <Route exact path='/singup' component={Singup} />
        </div>
      </Router>
    );
  }
}

App.childContextTypes = {
  user: PropTypes.object
};



const RouteWhenLoggedIn = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    client.isLoggedIn() ? (
      <Component {...props} />
    ) : (
      <Redirect to='/login' />
    )
  )} />
);

export default App;
