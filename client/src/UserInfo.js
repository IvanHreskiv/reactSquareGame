import React from 'react';
import avatar from './avatar.jpg';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import './UserInfo.css';
import 'bootstrap-social';
import 'font-awesome/css/font-awesome.min.css';

const UserInfo = ({username, fName, lName, email}) => (
  <div className="card">
    <h1>{username}</h1>
    <img src={avatar} alt="John" className="h-100%"/>
    <p className="title">{fName + ' ' + lName }</p>
    <p>{email}</p>
    <Link to='/logout'><button type="button">Log Out</button></Link>
  </div>
);

UserInfo.propTypes = {
  username: PropTypes.string.isRequired,
  fName: PropTypes.string.isRequired,
  lName: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired
};

const mapStateToProps = state => {
  const user = state.user.data;
  return {
    username: user.username || '',
    fName: user.fName || '',
    lName: user.lName || '',
    email: user.email || ''
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

const VisibleUserInfo = connect(mapStateToProps, mapDispatchToProps)(UserInfo);

export default VisibleUserInfo;
