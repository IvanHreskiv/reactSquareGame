import React from 'react';
import { connect } from 'react-redux';
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


const Game = (props) => {
  if (!props.crashed) {
    return (
      <Stage width={460} height={270}>
        <Layer>
          <Text text="Try click on rect"/>
          <ColoredRect
            x={props.square.x}
            y={props.square.y}
            width={props.square.width}
            height={props.square.height}
            fill={props.square.fill}
            shadowBlur={props.square.shadowBlur}
          />
          {props.obstacles.map(obstacle => <ColoredRect {...obstacle}/>)}
        </Layer>
      </Stage>
    );
  } else {
    return (
      <Stage width={460} height={270}>
        <Layer>
          <Text
            x={20}
            y={130}
            text="GAME OVER"
            fontSize={60}
            fontFamily={"Calibri"}
            fill={"red"}
          />
        </Layer>
      </Stage>
    );
  }
};


const mapStateToProps = state => {
  return {
    crashed: state.game.crashed,
    square: state.game.square,
    obstacles: state.game.obstacles
  };
};


const mapDispatchToProps = (dispatch) => {
  return {};
};

const VisibleGame = connect(mapStateToProps, mapDispatchToProps)(Game);

export default VisibleGame;
