import React, { Component } from 'react';
import avatar from './avatar.jpg';
import { Link } from 'react-router-dom';
import { client } from './Client'
import './UserInfo.css';
import 'bootstrap-social';
import 'font-awesome/css/font-awesome.min.css';

class UserInfo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: 'jdoe',
      fName: 'John',
      lName: 'Doe',
      email: 'jdoe@gmail.com'
    };
  }

  componentDidMount() {
    client.getUser(21)
    .then((res) => {
      this.setState({
        username: res.user.username,
        fName: res.user.firstName,
        lName: res.user.lastName,
        email: res.user.email
      });
    });
  }

  render() {
    return (
      <div className="card">
          <h1>{this.state.username}</h1>
        <img src={avatar} alt="John" className="h-100%"/>
          <p className="title">{this.state.fName + ' ' + this.state.lName }</p>
          <p>{this.state.email}</p>
        <Link to='/logout'><button type="button">Log Out</button></Link>
      </div>
    );
  }
}


export default UserInfo;
