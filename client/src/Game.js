import React from 'react';
import { connect } from 'react-redux';
import {setGameTimer, stopGame} from "./actions";
import { Stage, Layer, Rect, Text, Circle } from 'react-konva';
import './App.css';

export const ColoredRect = (props) => (
  <Rect
    x={props.x}
    y={props.y}
    width={props.width}
    height={props.height}
    fill={props.fill}
    shadowBlur={props.shadowBlur}
    onClick={props.onClick}
  />
);

export const ColoredCircle = (props) => (
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

const Game = ({handleOnStartClick, handleOnStopClick, square, obstacles}) => (
  <div>
    <Stage width={460} height={270}>
      <Layer>
        <Text text="Try click on rect" />
        <ColoredRect
          x={square.x}
          y={square.y}
          width={square.width}
          height={square.height}
          fill={square.fill}
          shadowBlur={square.shadowBlur}
        />
        {obstacles.map( obstacle => <ColoredRect {...obstacle}/> )}
      </Layer>
    </Stage>
    <Stage width={460} height={270}>
      <Layer>
      <ColoredCircle
        x={230}
        y={50}
        radius={40}
        fill={'red'}
        stroke={'black'}
        strokeWidth={4}
        onClick={handleOnStopClick}
        />
        <ColoredCircle
          x={130}
          y={50}
          radius={40}
          fill={'green'}
          stroke={'black'}
          strokeWidth={4}
          onClick={handleOnStartClick}
        />
    </Layer>
    </Stage>
  </div>
);


const mapStateToProps = state => {
  return {
    square: state.game.square,
    obstacles: state.game.obstacles
  };
};


const mapDispatchToProps = (dispatch) => {
  return {
    handleOnStartClick: () => {
      dispatch(setGameTimer());
    },
    handleOnStopClick: () => {
      dispatch(stopGame())
    }
  };
};

const VisibleGame = connect(mapStateToProps, mapDispatchToProps)(Game);

export default VisibleGame;
