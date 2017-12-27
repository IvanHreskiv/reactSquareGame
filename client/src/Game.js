import React from 'react';
import { connect } from 'react-redux';
import { startGame } from "./actions";
import { Stage, Layer, Rect, Text } from 'react-konva';
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

const Game = ({handleOnClick, square, obstacles}) => (
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
        onClick={handleOnClick}
      />
      {obstacles}
    </Layer>
  </Stage>
);

const genColumnObstacle = () => {
  let obstacles = [];
  let x = 460;
  let minHeight = 20;
  let maxHeight = 200;
  let height = Math.floor(Math.random()*(maxHeight-minHeight+1)+minHeight);
  let minGap = 50;
  let maxGap = 200;
  let gap = Math.floor(Math.random()*(maxGap-minGap+1)+minGap);
  const props1 = {
    x: x, y: 0, width: 10, height: height, fill: 'red', shadowBlur: 5
  };
  const props2 = {
    x: x, y: (height + gap), width: 10, height: (x - height), fill: 'red', shadowBlur: 5
  };
  obstacles.push(ColoredRect(props1));
  obstacles.push(ColoredRect(props2));

  return obstacles
};

const mapStateToProps = state => {
  return {
    square: state.game.square,
    obstacles: state.game.obstacles
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleOnClick: () => {
      dispatch(startGame(genColumnObstacle()));
    }
  };
};

const VisibleGame = connect(mapStateToProps, mapDispatchToProps)(Game);

export default VisibleGame;
