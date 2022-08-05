import Canvas from "./canvas.js";
import GameLoop from "./gameLoop.js";
import Snake from "./snake.js";
import Score from "./score.js";
import Berry from "./berry.js";

class Game {
  constructor(container) {
    this.canvas = new Canvas(container);
    this.snake = new Snake(this.canvas);
    this.berry = new Berry(this.canvas);
    this.score = new Score();
    new GameLoop(this.update, this.draw);
  }

  update = () => {
    this.snake.update( this.berry, this.score );
  }
  draw = () => {
    this.canvas.context.clearRect(0,0,this.canvas.element.width,this.canvas.element.height);
    this.snake.draw();
    this.berry.draw();
  }
}

new Game( document.querySelector('.canvas-wrapper') );