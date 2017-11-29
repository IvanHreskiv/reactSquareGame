import React, { Component } from 'react'
import isEmail from 'validator/lib/isEmail';
import Field from './Field';
import { client } from './Client'


class Singup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fields: {},
      fieldErrors: {},
      people: [],
    };
  }

  onFormSubmit = (evt) => {
    const people = this.state.people;
    const person = this.state.fields;

    evt.preventDefault();

    if (this.validate()) return;
      people.push(person);

      client.create_user(JSON.stringify(person))
        .then((person) => {
          this.setState({ people, fields: {} });
        })
        .catch(err => console.log(err));
  }

  onInputChange = ({ name, value, error }) => {
    const fields = this.state.fields;
    const fieldErrors = this.state.fieldErrors;

    fields[name] = value;
    fieldErrors[name] = error;

    this.setState({ fields, fieldErrors });
  }

  validate = () => {
    const person = this.state.fields;
    const fieldErrors = this.state.fieldErrors;
    const errMessages = Object.keys(fieldErrors).filter((k) => fieldErrors[k]);

    if (!person.username) return true;
    if (!person.email) return true;
    if (errMessages.length) return true;

    return false;
  }

  render = () => {
    return (
      <div>
        <h1>Sign Up Sheet</h1>

        <form onSubmit={this.onFormSubmit}>

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

          <input type='submit' disabled={this.validate()} />
        </form>
      </div>
    );
  }
}

export default Singup;
