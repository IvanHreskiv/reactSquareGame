import React, { Component } from 'react'
import './Login.css';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';
import { client } from './Client'

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loginInProgress: false,
      shouldRedirect: false,
    };
  }

  performLogin = () => {
    this.setState({ loginInProgress: true});
    client.login().then(
      () => {this.setState({ shouldRedirect: true}); console.log("Accepted")}
    );
  };

  render() {
    if (this.state.shouldRedirect) {
      return (
        <Redirect to='/game' />
      );
    } else {
      return (
      <div className="login-page">
        <div className="login-form">
          <form className="login-form">
            <input type="text" placeholder="username"/>
            <input type="password" placeholder="password"/>
            {
              this.state.loginInProgress ? (
                <div>LOADS...</div>
              ) : (
                <div onClick={this.performLogin}>
                    <button>login</button>
                </div>
              )
            }
            <p className="message">Not registered?
              <Link to='/singup'>
                <span>Create an account</span>
              </Link>
            </p>
          </form>
        </div>
      </div>

      )

    }
  }
}


export default Login;

