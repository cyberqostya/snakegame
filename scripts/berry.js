export default class Berry {
  constructor(canvas, config) {
    this.x = 0;
    this.y = 0;
    this.canvas = canvas;
    this.config = config;
  }

  randomPosition(array) {
    const randomIndex = Math.floor(Math.random() * array.length);
    this.x = array[randomIndex].x;
    this.y = array[randomIndex].y;
  }

  draw() {
    const context = this.canvas.context;
    context.beginPath();
    context.fillStyle = '#b54421';
    context.arc( this.x + (this.config.sizeCell / 2), this.y + (this.config.sizeCell / 2), this.config.sizeBerry, 0, 2 * Math.PI );
    context.fill();
  }
}