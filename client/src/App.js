import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Login from './Login';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path='/' render={props => (
            <Link
              to='/login'
              activateStyle={{ textDecoration: 'none', color: 'black' }}>
              <span>login</span>
            </Link>
          )} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/game' component={Game} />
        </div>
      </Router>
    );
  }
}


class Game extends Component {
  componentDidMount() {
    //TODO neet to think aboutn defaulg attributes in class
    this.context = this.refs.canvas.getContext('2d');
    document.addEventListener("keydown", this.handleKeyDown);
    this.start();
  }

  constructor() {
    super();
    this.gamePiece = new Square(30, 30, "red", 10, 120);
    this.gameObstacles = [];
    this.score = new TextComponent(30, 30, "black", 400, 20);
  }

  start = () => {
    this.interval = setInterval(() => { this.updateCanvas() }, 20)
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
    }
  };

  everyinterval = (n) => {
    if ((this.frameNo / n) % 1 === 0) {return true;}
    return false;
  };

  updateCanvas = () => {
    for (let i = 0; i < this.gameObstacles.length; i += 1) {
      if (this.gamePiece.crashWith(this.gameObstacles[i])) {
        const text = `GAME OVER!!!`;
        const message = new TextComponent(30, 30, "red", 110, 20);
        message.update(this.context, text);
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

    const text = `SCORE: ${this.frameNo}`;
    this.score.update(this.context, text);
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
  constructor(width, height, color, x, y) {
    super(width, height, color, x, y)
  }

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


class TextComponent extends CanvasComponent {
  constructor(width, height, color, x, y) {
    super(width, height, color, x, y)
    this.text = '';
  }

  update = (ctx, text) => {
    this.text = text;
    ctx.font = this.widh + " " + this.height;
    ctx.fillStyle = this.color;
    ctx.fillText(this.text, this.x, this.y);
  }
}

export default App;
