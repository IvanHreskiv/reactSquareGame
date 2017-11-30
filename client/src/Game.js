import React, { Component } from 'react';
import './App.css';
import PropTypes from 'prop-types';
import { client } from './Client'
import 'bootstrap/dist/css/bootstrap.min.css';

class GameContainer extends Component {
  state = {
    score: 0,
  };

  handleScoreChanged = (score) => {
    this.setState({score: score});
  } 

  onStopClick = () => {
    console.log("Stop    ");
  }

  onStartClick = () => {
    console.log(this.context.user);
  }

  onSaveClick = () => {
    const data = {
      user_id: 1,
      score: this.state.score,
    };
    client.create_score(data);
    console.log("Save");
  }

  render() {
    return (
      <div>
        <ScoreComponent
          score={this.state.score}
        />
        <Game
          onScoreChanged={this.handleScoreChanged}
        />

        <br />

        <button onClick={this.onStartClick} type="button" className="btn btn-success center-block col-sm-3 M-30px">Start</button>
        <button onClick={this.onStopClick} type="button" className="btn btn-danger center-block col-sm-3 M-30px">Stop</button>
        <button onClick={this.onSaveClick} type="button" className="btn btn-warning center-block col-sm-3 M-30px">Save</button>
      </div>
    );
  }
}

GameContainer.contextTypes = {
  user: PropTypes.object
};

class ScoreComponent extends Component {
  render() {
    return (
      <div>
        <h1>{this.props.score}</h1>
      </div> 
    );
  }

}

class Game extends Component {
  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyDown);
    this.gamePiece = new Square(30, 30, "red", 10, 120);
    this.gameObstacles = [];
    this.updateCanvas();
    this.start();
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  start = () => {
    console.log(this.refs);
    this.interval = setInterval(this.updateCanvas, 20)
    this.frameNo = 0;
  };

  clear = () => {
    this.context.clearRect(0, 0, 480, 270);
  };

  stop = () => {
    clearInterval(this.interval);
  };

  handleKeyDown = (e) => {
    switch (e.keyCode) {
      case 37:
        this.gamePiece.moveLeft();
        break;
      case 38:
        this.gamePiece.moveUp();
        break;
      case 39:
        this.gamePiece.moveRight();
        break;
      case 40:
        this.gamePiece.moveDown();
        break;
      case 13:
        this.start();
        break;
      default:
    }
  };

  everyinterval = (n) => {
    if ((this.frameNo / n) % 1 === 0) {return true;}
    return false;
  };

  updateCanvas = () => {
    this.context = this.refs.canvas.getContext('2d');
    for (let i = 0; i < this.gameObstacles.length; i += 1) {
      if (this.gamePiece.crashWith(this.gameObstacles[i])) {
        this.stop();
        return;
      }
    }
    this.clear();
    this.frameNo += 1;
    if (this.frameNo === 1 || this.everyinterval(150)) {
      let x = 480;
      let minHeight = 20;
      let maxHeight = 200;
      let height = Math.floor(Math.random()*(maxHeight-minHeight+1)+minHeight);
      let minGap = 50;
      let maxGap = 200;
      let gap = Math.floor(Math.random()*(maxGap-minGap+1)+minGap);
      this.gameObstacles.push(new CanvasComponent(10, height, "green", x, 0));
      this.gameObstacles.push(new CanvasComponent(10, x - height - gap, "green", x, height + gap));
    }
    for (let i = 0; i < this.gameObstacles.length; i += 1) {
      this.gameObstacles[i].x += -1;
      this.gameObstacles[i].update(this.context);
    }


    this.gamePiece.newPos();
    this.gamePiece.update(this.context);
    this.props.onScoreChanged(this.frameNo?this.frameNo:0);
  };

  render() {
    return (
        <canvas ref="canvas" width={480} height={270}/>
    );
  }
}

class CanvasComponent {
  constructor(width, height, color, x, y) {
    this.width = width;
    this.height = height; this.x = x;
    this.y = y;
    this.speedX = 0;
    this.speedY = 120;
    this.color = color;
  }

  update = (ctx) => {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  };

  newPos = () => {
    this.x = this.speedX;
    this.y = this.speedY;
  };

  crashWith = (otherobj) => {
    const myleft = this.x;
    const myright = this.x + (this.width);
    const mytop = this.y;
    const mybottom = this.y + (this.height);
    const otherleft = otherobj.x;
    const otherright = otherobj.x + (otherobj.width);
    const othertop = otherobj.y;
    const otherbottom = otherobj.y + (otherobj.height);
    let crash = true;
    if ((mybottom < othertop) ||
      (mytop > otherbottom) ||
      (myright < otherleft) ||
      (myleft > otherright)) {
      crash = false;
    }
    return crash;
  }
}


class Square extends CanvasComponent {
  moveRight = () => {
    if (this.speedX + 1 + this.width <= 480) {
      this.speedX += 1
    }
  };

  moveLeft = () => {
    if (this.speadX -1 >= 0) {
      this.speedX -= 1;
    }
  };

  moveUp = () => {
    if (this.speedY - 2 >= 0) {
      this.speedY -= 2
    }
  };

  moveDown = () => {
    if (this.speedY + 2 + this.height <= 270) {
      this.speedY += 2
    }
  }
}


export default GameContainer;
