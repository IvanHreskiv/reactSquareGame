import React from 'react';
import { connect } from 'react-redux';
import * as actions from "./actions";
import { Stage, Layer, Circle } from 'react-konva';
import './App.css';

const ColoredCircle = (props) => (
  <Circle
    x={props.x}
    y={props.y}
    radius={props.radius}
    fill={props.fill}
    stroke={props.stroke}
    strokeWidth={props.strokeWidth}
    onClick={props.onClick}
  />
);

const ControlPanel = (props) => (
  <Stage width={460} height={270}>
    <Layer>
      <ColoredCircle
        x={230}
        y={50}
        radius={40}
        fill={'red'}
        stroke={'black'}
        strokeWidth={4}
        onClick={props.handleOnStopClick}
      />
      <ColoredCircle
        x={130}
        y={50}
        radius={40}
        fill={'green'}
        stroke={'black'}
        strokeWidth={4}
        onClick={props.handleOnStartClick}
      />
      <ColoredCircle
        x={230}
        y={150}
        radius={20}
        fill={'grey'}
        stroke={'black'}
        strokeWidth={4}
        onClick={props.handleOnUpClick}
      />
      <ColoredCircle
        x={230}
        y={200}
        radius={20}
        fill={'grey'}
        stroke={'black'}
        strokeWidth={4}
        onClick={props.handleOnDownClick}
      />
      <ColoredCircle
        x={180}
        y={200}
        radius={20}
        fill={'grey'}
        stroke={'black'}
        strokeWidth={4}
        onClick={props.handleOnLeftClick}
      />
      <ColoredCircle
        x={280}
        y={200}
        radius={20}
        fill={'grey'}
        stroke={'black'}
        strokeWidth={4}
        onClick={props.handleOnRightClick}
      />
    </Layer>
  </Stage>

);


const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleOnStartClick: () => {
      dispatch(actions.startGame());
    },
    handleOnStopClick: () => {
      dispatch(actions.stopGame())
    },
    handleOnUpClick: () => {
      dispatch(actions.moveUP())
    },
    handleOnDownClick: () => {
      dispatch(actions.moveDown())
    },
    handleOnLeftClick: () => {
      dispatch(actions.moveLeft())
    },
    handleOnRightClick: () => {
      dispatch(actions.moveRight())
    }
  };
};

const VisibleControlPanel = connect(mapStateToProps, mapDispatchToProps)(ControlPanel);

export default VisibleControlPanel;
