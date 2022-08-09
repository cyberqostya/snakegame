export default class Berry {
  constructor(canvas, config) {
    this.x = 0;
    this.y = 0;
    this.canvas = canvas;
    this.config = config;
    this.berries = [];
  }

  eat(berry) {
    this.berries = this.berries.filter(i => {
      if(i.x === berry.x && i.y === berry.y) {
        return;
      } else {
        return i;
      }
    })
  }

  addOnRandomPosition(array) {
    const randomIndex = Math.floor(Math.random() * array.length);
    this.x = array[randomIndex].x;
    this.y = array[randomIndex].y;

    const [src, width, height] = this._getBerryImage();
    const image = new Image();
    image.src = src;

    this.berries.push({ x: this.x, y: this.y, image, width, height });
  }

  reset() {
    this.x = -this.config.sizeCell;
    this.y = -this.config.sizeCell;
    this.berries = [];
  }

  draw() {
    this.berries.forEach(i => {
      this.canvas.context.drawImage(i.image, i.x + ((this.config.sizeCell - i.width) / 2), i.y + ((this.config.sizeCell - i.height) / 2), i.width, i.height);
    });
  }

  _getBerryImage() {
    const images = [
      {
        src: 'images/berry1.svg',
        originalWidth: 72,
        originalHeight: 96,
        newWidth: 9,
        newHeight: 12,
      },
      {
        src: 'images/berry2.svg',
        originalWidth: 104,
        originalHeight: 72,
        newWidth: 13,
        newHeight: 9,
      },
    ];

    const index = Math.floor(Math.random() * images.length);
    return [images[index].src, images[index].newWidth, images[index].newHeight];
  }
}