import Config from "./config.js";
import { getRandomInt } from "./supportFunctions.js";

export default class Berry {
  constructor(canvas) {
    this.x = 0;
    this.y = 0;
    this.canvas = canvas;
    this.config = new Config();
    this.randomPosition();
  }

  randomPosition() {
    this.x = getRandomInt( 0, this.canvas.element.width / this.config.sizeCell ) * this.config.sizeCell;
    this.y = getRandomInt( 0, this.canvas.element.height / this.config.sizeCell ) * this.config.sizeCell;
  }

  draw() {
    const context = this.canvas.context;
    context.beginPath();
    context.fillStyle = '#a00014';
    context.arc( this.x + (this.config.sizeCell / 2), this.y + (this.config.sizeCell / 2), this.config.sizeBerry, 0, 2 * Math.PI );
    context.fill();
  }
}