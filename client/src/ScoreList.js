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
      <div className="col-sm-3 bg-success rounded-35px">
        {scores.map(score => <ScoreItem {...score}/>)}
      </div>
    );
  }
};

const ScoreItem = (props) => (
  <div className="alert alert-success M-3px">
    <strong>{props.username}</strong>{props.score}
  </div>
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
