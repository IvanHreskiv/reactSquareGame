import React from 'react'
import { connect } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';


const ScoreList = ({isFetching, scores, error}) => {
  if (isFetching) {
    return (
      <i className="fa fa-circle-o-notch fa-spin"></i>
    );
  } else {
    return (
        <ul className="list-group">
          {scores.map(score => <ScoreItem {...score}/>)}
        </ul>
    );
  }
};

const ScoreItem = (props) => (
  <li className="list-group-item list-group-item-success">
    <h1>{props.username} {props.total}</h1>
  </li>
);

const mapStateToProps = (state) => {
  return {
    isFetching: state.scores.isFetching,
    scores: state.scores.scores,
    error: state.scores.error
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

const VisibleScoreList = connect(mapStateToProps, mapDispatchToProps)(ScoreList);
export default VisibleScoreList;
