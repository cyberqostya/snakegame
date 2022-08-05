export default class Canvas {
  constructor(container) {
    this.element = document.createElement( 'canvas' );
    this.context = this.element.getContext( '2d' );
    this.element.width = 304;
    this.element.height = 304;
    container.append(this.element);
  }
}