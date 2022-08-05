import Config from "./config.js";

export default class Canvas {
  constructor() {
    this.config = new Config();
    this.element = document.createElement( 'canvas' );
    this.context = this.element.getContext( '2d' );
    this.element.width = 304;
    this.element.height = 304;
    this.cells = [];
    document.querySelector('.canvas-wrapper').append(this.element);

    this._fillCells();
  }

  _fillCells() {
    const cellsXQuantity = this.element.width / this.config.sizeCell;
    const cellsYQuantity = this.element.height / this.config.sizeCell;
    for(let i = 0; i < cellsYQuantity; i++) {
      for(let j = 0; j < cellsXQuantity; j++) {
        this.cells.push({ x: j * this.config.sizeCell, y: i * this.config.sizeCell });
      }
    }
    ;
  }
}