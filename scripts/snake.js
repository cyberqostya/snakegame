import Config from "./config.js";

export default class Snake {
  constructor(canvas) {
    this.canvas = canvas;
    this.config = new Config();
    this.x = 0;
    this.y = 0;
    this.tails = [];
    this.maxTails = 3;
    this.dx = this.config.sizeCell;
    this.dy = 0;

    this.control();
  }

  death() {
    this.x = 0;
    this.y = 0;
    this.tails = [];
    this.maxTails = 3;
    this.dx = this.config.sizeCell;
    this.dy = 0;
  }

  control() {
    document.querySelector('.mobile-controls').addEventListener("touchstart", (e) => {
      if (e.target.closest('.mobile-control._left') && this.dx !== this.config.sizeCell) {
        this.dx = -this.config.sizeCell;
        this.dy = 0;
      } else if (e.target.closest('.mobile-control._right') && this.dx !== -this.config.sizeCell) {
        this.dx = this.config.sizeCell;
        this.dy = 0;
      } else if (e.target.closest('.mobile-control._up') && this.dy !== this.config.sizeCell) {
        this.dx = 0;
        this.dy = -this.config.sizeCell;
      } else if (e.target.closest('.mobile-control._down') && this.dy !== -this.config.sizeCell) {
        this.dx = 0;
        this.dy = this.config.sizeCell;
      }
    });
  }

  _collisionBorder() {
    if(this.x < 0) {
      this.x = this.canvas.element.width - this.config.sizeCell;
    } else if(this.x >= this.canvas.element.width) {
      this.x = 0;
    }
  
    if(this.y < 0) {
      this.y = this.canvas.element.height - this.config.sizeCell;
    } else if(this.y >= this.canvas.element.height) {
      this.y = 0;
    }
  }

  update(berry, score) {
    this.x += this.dx;
    this.y += this.dy;
  
    // Столкновение со стеной
    this._collisionBorder();
  
    this.tails.unshift( { x: this.x, y: this.y } );
  
    if( this.tails.length > this.maxTails ) {
      this.tails.pop();
    }

    const head = this.tails[0];

    // Столкновение головы змейки с хвостом
    for (let i = 1; i < this.tails.length; i++) {
      if(head.x === this.tails[i].x && head.y === this.tails[i].y) {
        this.death();
        score.setToZero();
        berry.randomPosition();
        return;
      }
    }

    // Столкновение головы змейки с ягодой
    if(head.x === berry.x && head.y === berry.y) {
      this.maxTails++;
      score.incScore();
      berry.randomPosition();
    }

  }

  draw() {
    this.tails.forEach((i, index) => {
      if(index === 0) {

        // Окрашивается клетка головы змейки
        this.canvas.context.fillStyle = '#fa0556';

      } else {

        // Окрашивается клетка хвоста змейки
        this.canvas.context.fillStyle = '#a00034';
      }
      this.canvas.context.fillRect( i.x, i.y, this.config.sizeCell, this.config.sizeCell );
    });
  }
}