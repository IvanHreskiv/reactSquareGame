import React from 'react'
import { connect } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';

const Score = (props) => (
  <div>
    <h1>{props.score}</h1>
  </div>
);


const mapStateToProps = (state) => {
  return {
    score: state.game.frameNo
  }
};


const mapDispatchToProps = (dispatch) => {
  return
}


const VisibleScore = connect(mapStateToProps, mapDispatchToProps)(Score);

export default VisibleScore;
