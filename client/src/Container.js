import React from 'react';
import { Route, withRouter } from 'react-router-dom'
import { client } from './Client';
import PropTypes from 'prop-types'
import LogInForm from './LogInForm';
import { connect } from 'react-redux';
import { logInUserAction, fetchUserDataAction } from './actions';

const Container = ({handleSubmit}) => (
  <Route
    exect path="/login"
    render={(props) => (
      <LogInForm {...props} onSubmit={handleSubmit}/>
    )
    }
  />
);

Container.propTypes = {
  handleSubmit: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    handleSubmit: (data) => {
      client.login(JSON.stringify(data))
        .then((json) => {
          let jsonWebToken = json.token;
          dispatch(logInUserAction(ownProps.history, jsonWebToken));
          return jsonWebToken;
        })
        .then((token) => dispatch(fetchUserDataAction(token)))
        .catch(err => console.log(err));
    }
  }
};

export const connectedContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(Container));
