import React, { Component } from 'react'
import isEmail from 'validator/lib/isEmail';
import { Redirect } from 'react-router';
import './Login.css';
import Field from './Field';
import { client } from './Client'


class Singup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fields: {},
      fieldErrors: {},
      people: [],
      shouldRedirect: false,
      singupInProgress: false,
    };
  }

  onFormSubmit = (evt) => {
    const people = this.state.people;
    const person = this.state.fields;

    evt.preventDefault();

    if (this.validate()) return;
      people.push(person);

      this.setState({ loginInProgress: true});

      client.create_user(JSON.stringify(person))
        .then((person) => {
          this.setState({ people, fields: {}, shouldRedirect: true });
        })
        .catch(err => console.log(err));
  }

  onInputChange = ({ name, value, error }) => {
    const fields = this.state.fields;
    const fieldErrors = this.state.fieldErrors;

    fields[name] = value;
    fieldErrors[name] = error;

    this.setState({
      fields,
      fieldErrors,
      shouldRedirect: false,
      singupInProgress: false,
    });
  }

  validate = () => {
    const person = this.state.fields;
    const fieldErrors = this.state.fieldErrors;
    const errMessages = Object.keys(fieldErrors).filter((k) => fieldErrors[k]);

    if (!person.username) return true;
    if (!person.email) return true;
    if (!person.password) return true;
    if (errMessages.length) return true;

    return false;
  }

  render = () => {
    if (this.state.shouldRedirect) {
      return (
        <Redirect to='/game' />
      );
    } else {
      return (
        <div className="login-page">
         <div className="login-form">
          <form className="login-form" onSubmit={this.onFormSubmit}>

            <Field
              placeholder='Name'
              name='username'
              value={this.state.fields.name}
              onChange={this.onInputChange}
              validate={(val) => (val ? false : 'Name Required')}
            />

            <br />

            <Field
              placeholder='Email'
              name='email'
              value={this.state.fields.email}
              onChange={this.onInputChange}
              validate={(val) => (isEmail(val) ? false : 'Invalid Email')}
            />

            <br />

            <Field
              placeholder='Password'
              name='password'
              value={this.state.fields.password}
              onChange={this.onInputChange}
              validate={(val) => (val ? false : 'Pssword Required')}
            />

            <br />
            {
              this.state.singupInProgress ? (
                <div>LOADS...</div>
              ) : (
                <input type='submit' disabled={this.validate()} />
              )
            }
          </form>
        </div>
       </div>
      );
    }
  }
}

export default Singup;
