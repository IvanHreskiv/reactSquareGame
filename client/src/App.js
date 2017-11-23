import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Login from './Login';
import Logout from './Logout';
import Singup from './Singup';
import GameContainer from './Game';


class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path='/' render={props => (
            <Link to='/login'>
              <span>login</span>
            </Link>
          )} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/game' component={GameContainer} />
          <Route exact path='/logout' component={Logout} />
          <Route exact path='/singup' component={Singup} />
        </div>
      </Router>
    );
  }
}


export default App;
