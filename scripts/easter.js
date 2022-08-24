export default class Easter {
  constructor(config) {
    this.config = config;

    this.coordEgg = {
      x: -1 * this.config.sizeCell,
      y: 14 * this.config.sizeCell,
    }
  }

  // Отслеживание использований
  firstEgg() {
    const code = ['up', 'up', 'down', 'down', 'left', 'right', 'left', 'right'];
  }

  // coordEgg() {
    
  // }
}