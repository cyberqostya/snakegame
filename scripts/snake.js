export default class Snake {
  constructor(canvas, config) {
    this.canvas = canvas;
    this.config = config;
    this.x = this.config.startSnakePosition.x;
    this.y = this.config.startSnakePosition.y;
    this.tails = [];
    this.maxTails = 3;
    this.dx = this.config.sizeCell;
    this.dy = 0;
  }

  reset() {
    this.x = this.config.startSnakePosition.x;
    this.y = this.config.startSnakePosition.y;
    this.tails = [];
    this.maxTails = 3;
    this.dx = this.config.sizeCell;
    this.dy = 0;
  }

  checkBorder() {
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

  draw() {
    this.tails.forEach((i, index) => {
      if(index === 0) {

        // Окрашивается клетка головы змейки
        this.canvas.context.fillStyle = '#7A7FF2';

      } else {

        // Окрашивается клетка хвоста змейки
        this.canvas.context.fillStyle = '#1920C1';
      }
      this.canvas.context.fillRect( i.x, i.y, this.config.sizeCell, this.config.sizeCell );
    });
  }
}