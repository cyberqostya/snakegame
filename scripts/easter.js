export default class Easter {
  constructor(config) {
    this.config = config;

    this.coordEgg = {
      x: -1 * this.config.sizeCell,
      y: 14 * this.config.sizeCell,
    }

    this.konamiCode = ['up', 'up', 'down', 'down', 'left', 'right', 'left', 'right'];
    this.konamiCounter = 0;
  }

  checkKonami(direction) {
    if(direction === this.konamiCode[this.konamiCounter]) {
      this.konamiCounter++;
      return this.konamiCounter === this.konamiCode.length;
    } else {
      this.konamiCounter = 0;
    }
  }
}