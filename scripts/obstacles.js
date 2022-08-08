export default class Obstacles {
  constructor(canvas, config) {
    this.obstacles = [];
    this.x = 0;
    this.y = 0;
    this.canvas = canvas;
    this.config = config;
    this.img = new Image();
    this.img.src = 'images/obstacle.svg';
  }

  update(coords) {
    this.x = coords.x;
    this.y = coords.y;
    this.obstacles.push({ x: this.x, y: this.y, isNotFresh: false });
  }

  makeNotFresh() {
    this.obstacles.at(-1).isNotFresh = true;
  }

  reset() {
    this.obstacles = [];
    this.x = 0;
    this.y = 0;
  }

  draw() {
    this.obstacles.forEach(i => {
      if(i.isNotFresh) this.canvas.context.drawImage(this.img, i.x, i.y);
    });
  }
}