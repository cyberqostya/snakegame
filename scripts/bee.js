export default class Bee {
  constructor(canvas, config) {
    this.config = config;
    this.canvas = canvas;
    this.x = -this.config.sizeCell;
    this.y = -this.config.sizeCell;
    this.image = new Image();
    this.image.src = 'images/bee.svg';
    this.berry = {};
    this.path = [];
    this.pathCounter = 0;
  }

  getPath(berry) {
    this.path = [
      { x: berry.x - this.config.sizeCell, y: berry.y - this.config.sizeCell },
      { x: berry.x, y: berry.y - this.config.sizeCell },
      { x: berry.x + this.config.sizeCell, y: berry.y - this.config.sizeCell },
      { x: berry.x + this.config.sizeCell, y: berry.y },
      { x: berry.x + this.config.sizeCell, y: berry.y + this.config.sizeCell },
      { x: berry.x, y: berry.y + this.config.sizeCell },
      { x: berry.x - this.config.sizeCell, y: berry.y + this.config.sizeCell },
      { x: berry.x - this.config.sizeCell, y: berry.y },
    ];

    this.x = this.path[this.pathCounter].x;
    this.y = this.path[this.pathCounter].y;
  }

  update() {
    if(++this.pathCounter === this.path.length) this.pathCounter = 0;
    this.x = this.path[this.pathCounter].x;
    this.y = this.path[this.pathCounter].y;
  }

  draw() {
    this.canvas.context.drawImage(this.image, this.x + ((this.config.sizeCell - 14) / 2), this.y + ((this.config.sizeCell - 13) / 2), 14, 13);
  }
}