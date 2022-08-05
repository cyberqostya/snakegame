export default class Popup {
  constructor() {
    this.element = document.querySelector('.menu-popup');
    this.textBlock = this.element.querySelector('.menu-popup__text');
    this.button = this.element.querySelector('.menu-popup__button');
  }

  changeText(newText) {
    this.textBlock.textContent = newText;
  }

  show() {
    this.element.style.pointerEvents = 'all';
    this.element.style.opacity = '1';
  }

  hide() {
    this.element.style.pointerEvents = 'none';
    this.element.style.opacity = '0';
  }
}