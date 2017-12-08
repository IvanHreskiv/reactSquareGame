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
  render() {
    return (
      <Router>
        <div>
          <RouteWhenLoggedIn exact path='/' component={Main} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/logout' component={Logout} />
          <Route exact path='/singup' component={Singup} />
          <Route exact path='/auth' component={Auth} />
        </div>
      </Router>
    );
  }
}


//TODO need to ability to pass addition props
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

      this.state = {
        success: false,
        error: false
      }
    }

    componentDidMount() {
      client.authenticate()
      .then(res => this.setState({
        success: true,
        error: false
      }))
      .catch(res => this.setState({
        success: true,
        error: false
      }));
    }

    render() {
        return (
            <div>Hello</div>
        );
    }
}
export default App;
