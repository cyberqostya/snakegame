export default class Canvas {
  constructor(config) {
    this.config = config;
    this.element = document.createElement( 'canvas' );
    this.context = this.element.getContext( '2d' );
    this.element.width = this.config.cellsX * this.config.sizeCell;
    this.element.height = this.config.cellsY * this.config.sizeCell;
    this.cells = [];
    document.querySelector('.canvas-wrapper').append(this.element);

    this._fillCells();
  }

  _fillCells() {
    for(let i = 0; i < this.config.cellsY; i++) {
      for(let j = 0; j < this.config.cellsX; j++) {
        this.cells.push({ x: j * this.config.sizeCell, y: i * this.config.sizeCell });
      }
    }
  }
}