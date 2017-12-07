import React, { Component } from 'react';
import './App.css';
import GameContainer from './Game';
import UserInfo from './UserInfo';
import 'bootstrap/dist/css/bootstrap.min.css';

class Main extends Component {
  render() {
    return (
      <div className="H-100">
        <div className="col-sm-4 bg-info rounded-35px">
          <UserInfo
            user_id={this.props.user_id}
          />
        </div>
        <div className="col-sm-4 bg-primary rounded-35px">
          <GameContainer
            user_id={this.props.user_id}
          />
        </div>
        <div className="col-sm-3 bg-success rounded-35px">
          <div className="alert alert-info M-3px">
            <strong>Success!</strong> Indicates a successful or positive action.
          </div>
           <div className="alert alert-success M-3px">
            <strong>Success!</strong> Indicates a successful or positive action.
          </div>
           <div className="alert alert-warning M-3px">
            <strong>Success!</strong> Indicates a successful or positive action.
          </div>
           <div className="alert alert-danger M-3px">
            <strong>Success!</strong> Indicates a successful or positive action.
          </div>
           <div className="alert alert-success M-3px">
            <strong>Success!</strong> Indicates a successful or positive action.
          </div>
           <div className="alert alert-success M-3px">
            <strong>Success!</strong> Indicates a successful or positive action.
          </div>
        </div>
      </div> 
    );
  }

}

export default Main;
