import React, { Component } from 'react';
import './App.css';
import { client } from './Client'
import GameContainer from './Game';
import UserInfo from './UserInfo';
import ScoreList from './ScoreList';
import 'bootstrap/dist/css/bootstrap.min.css';

class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user_id: null,
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

  componentDidMount() {
    console.log(client.token);
    const decodedToken = this.decodeToken(client.token);
    this.setState({user_id: decodedToken.payload.id});
  }

  render() {
    return (
      <div className="H-100">
        <div className="col-sm-4 bg-info rounded-35px">
          <UserInfo
            user_id={this.state.user_id}
          />
        </div>
        <div className="col-sm-4 bg-primary rounded-35px">
          <GameContainer
            user_id={this.state.user_id}
          />
        </div>
        <ScoreList />
      </div>
    );
  }

}

export default Main;
