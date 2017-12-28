import React from 'react';
import { connect } from 'react-redux';
import './App.css';
import UserInfo from './UserInfo';
import VisibleGame from './Game';
import VisibleControlPanel from './ControlPanel';
import VisibleScoreList from './ScoreList';
import 'bootstrap/dist/css/bootstrap.min.css';

const Main = () => (
  <div className="H-100">
    <div className="col-sm-4 bg-info rounded-35px">
      <UserInfo/>
    </div>
    <div className="col-sm-4 bg-primary rounded-35px">
      <VisibleGame/>
      <VisibleControlPanel />
    </div>
    <div className="col-sm-4 bg-info rounded-35px">
      <VisibleScoreList />
    </div>
  </div>
);


const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

const VisibleMain = connect(mapStateToProps, mapDispatchToProps)(Main);

export default VisibleMain;
