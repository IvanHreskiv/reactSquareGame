import React, { Component } from 'react'
import { client } from './Client'
import 'bootstrap/dist/css/bootstrap.min.css';


class ScoreList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      scores: [
        {username: 'username1', score: 120},
        {username: 'username2', score: 123},
        {username: 'username3', score: 124},
        {username: 'username4', score: 125},
        {username: 'username5', score: 126},
      ]
    }
  }
  render() {
    const scores = this.state.scores.map((score) => (
      <ScoreItem
        username={score.username}
        score={score.score}
      />
    ));
    return (
      <div className="col-sm-3 bg-success rounded-35px">
        {scores}
      </div>
    );
  }
}

class ScoreItem extends Component {
  render() {
    return (
      <div className="alert alert-success M-3px">
        <strong>{this.props.username}</strong>{this.props.score}
      </div>
    );
  }
}

export default ScoreList;
