import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Login from './Login';
import Logout from './Logout';
import Game from './Game';


class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path='/' render={props => (
            <Link
              to='/login'
              activateStyle={{ textDecoration: 'none', color: 'black' }}>
              <span>login</span>
            </Link>
          )} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/game' component={Game} />
          <Route exact path='/logout' component={Logout} />
        </div>
      </Router>
    );
  }
}


export default App;
