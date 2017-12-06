import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Redirect } from 'react-router';
import Login from './Login';
import Main from './Main';
import Logout from './Logout';
import Singup from './Singup';
import { client } from './Client'


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user_id: null,
    };
  }

  onUserLoggedIn = (id) => {
    this.setState({user_id: id});
    console.log(this.state);
  }

  render() {
    return (
      <Router>
        <div>
          <Route exact path='/' component={Login} />
          <Route exact path='/login'
            render={(props) => <Login {...props} handleUserLoggedIn={this.onUserLoggedIn}/>}
          />
          <RouteWhenLoggedIn exact path='/game' component={Main} />
          <Route exact path='/logout' component={Logout} />
          <Route exact path='/singup' component={Singup} />
          <Route exact path='/auth' component={Auth} />
        </div>
      </Router>
    );
  }
}


const RouteWhenLoggedIn = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    client.isLoggedIn() ? (
      <Component {...props} />
    ) : (
      <Redirect to='/login' />
    )
  )} />
);

class Auth extends Component {

    constructor(props) {
      super(props);

      client.authenticate()
    }

    render() {
        return (
            <div>Hello</div>
        );
    }
}
export default App;
