import React from 'react'
import './LoginForm.css';
import { Field, reduxForm } from 'redux-form'
import { Link } from 'react-router-dom';
import 'bootstrap-social';
import 'font-awesome/css/font-awesome.min.css';

const validate = values => {
  const errors = {};
  if (!values.username) {
    errors.username = 'Required'
  } else if (values.username.length > 15) {
    errors.username = 'Must be 15 characters or less'
  }
  if (!values.password) {
    errors.password = 'Required'
  }

  return errors
};

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
const asyncValidate = (values) => {
  return sleep(1000).then(() => {
    if (['john', 'paul', 'george', 'ringo'].includes(values.username)) {
      throw { username: 'That username is taken' }
    }
  });
};


const renderField = ({
                       input,
                       label,
                       type,
                       meta: { asyncValidating, touched, error, warning }
                     }) => (
  <div>
    <label>{label}</label>
    <div className={asyncValidating ? 'async-validating' : ''}>
      <input {...input} placeholder={label} type={type} />
      {touched &&
      ((error && <span>{error}</span>) ||
        (warning && <span>{warning}</span>))}
    </div>
  </div>
);

const LogInForm = props => {
  const { handleSubmit, pristine, reset, submitting } = props
  return (
    <div className="login-page">
      <div className="login-form">
        <form className="login-form" onSubmit={handleSubmit}>
          <Field
            name="username"
            type="text"
            component={renderField}
            label="Username"
          />
          <Field
            name="password"
            type="password"
            component={renderField}
            label="Password"
          />
          <div>
            <button type="submit" disabled={submitting}>
              Submit
            </button>
            <button type="button" disabled={pristine || submitting} onClick={reset}>
              Clear Values
            </button>
          </div>
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

export default reduxForm({
  form: 'logInForm', // a unique identifier for this form
  validate, // <--- validation function given to redux-form
  //asyncValidate,
  //asyncBlurFields: ['username']
})(LogInForm)