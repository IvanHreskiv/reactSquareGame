import React, { Component } from 'react'
import './Login.css';
import { Link } from 'react-router-dom';
import Field from './Field';
import { Redirect } from 'react-router';
import { client } from './Client'
import 'bootstrap-social';
import 'font-awesome/css/font-awesome.min.css';


class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fields: {},
      fieldErrors: {},
      loginInProgress: false,
      shouldRedirect: false,
    };
  }

  decodeToken = (jwt) => {
    const [headerB64, payloadB64] = jwt.split('.');
    const headerStr = new Buffer(headerB64, 'base64').toString();
    const payloadStr = new Buffer(payloadB64, 'base64').toString();
    return {
      header: JSON.parse(headerStr),
      payload: JSON.parse(payloadStr)
    };
  }

  //TODO: it has a lot in common with singup component
  performLogin = () => {
    const person = this.state.fields;
    this.setState({ loginInProgress: true});
    client.login(JSON.stringify(person))
    .then(token => this.decodeToken(token))
    .then((decodedToken) => {
      this.setState({ shouldRedirect: true});
      this.props.handleUserLoggedIn(decodedToken.payload.id);
    });
  };

  onInputChange = ({ name, value, error }) => {
    const fields = this.state.fields;
    const fieldErrors = this.state.fieldErrors;

    fields[name] = value;
    fieldErrors[name] = error;

    this.setState({
      fields,
      fieldErrors,
      shouldRedirect: false,
      loginInProgress: false,
    });
  }

  validate = () => {
    const person = this.state.fields;
    const fieldErrors = this.state.fieldErrors;
    const errMessages = Object.keys(fieldErrors).filter((k) => fieldErrors[k]);

    if (!person.username) return true;
    if (!person.password) return true;
    if (errMessages.length) return true;

    return false;
  }

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
            <Field
              placeholder='UserName'
              name='username'
              value={this.state.fields.username || ''}
              onChange={this.onInputChange}
              validate={(val) => (val ? false : 'UaerName Required')}
            />
            <Field
              placeholder='Password'
              name='password'
              value={this.state.fields.password || ''}
              onChange={this.onInputChange}
              validate={(val) => (val ? false : 'Password Required')}
            />
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
          <Link to='/auth'>
            <div className="btn btn-block btn-social btn-facebook">
              <span className="fa fa-facebook"></span> Sign in with Facebook
            </div>
          </Link>
        </div>
      </div>

      )

    }
  }
}


export default Login;

