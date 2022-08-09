export default class Config {
  constructor() {
    this.step = 0;
    this.maxStep = 6;
    this.cellsX = 19;
    this.cellsY = 19;
    this.sizeCell = 16;
    this.sizeBerry = this.sizeCell / 4;
    this.levelPointsToWin = 10; // 30
    this.levelModification = [];
    this.startSnakePosition = { x: (this.cellsX - 4) * this.sizeCell, y: this.sizeCell * 2 };

    this.levels = [
      {
        modifications: ['isRandomSnakeSpeed'],
        levelPointsToWin: 10, // 25
      },
      {
        modifications: ['isBerryChangedObstacle'],
        levelPointsToWin: 10, // 30
        startSnakePosition: { x: this.sizeCell * 2, y: this.sizeCell * 2 },
      },
      {
        modifications: ['isBorderDanger'],
        levelPointsToWin: 10,
        startSnakePosition: { x: this.sizeCell * 2, y: Math.floor(this.cellsX / 2) * this.sizeCell },
      },
      {
        modifications: ['isBorderDanger', 'isArrowsInvert'],
        levelPointsToWin: 1,
        startSnakePosition: { x: this.sizeCell * 2, y: Math.floor(this.cellsX / 2) * this.sizeCell },
        speed: 7,
      },
      {
        modifications: ['doubleLength', 'isBorderDanger'],
        levelPointsToWin: 6,
        startSnakePosition: { x: this.sizeCell * 2, y: Math.floor(this.cellsX - 2) * this.sizeCell },
      },
      {
        modifications: ['plusBorder'],
        levelPointsToWin: 10,
        startSnakePosition: { x: 0, y: this.cellsX * this.sizeCell },
      },
      {
        modifications: ['berryTimer'],
        levelPointsToWin: 10,
      },
      {
        modifications: ['isBeeAround'],
        levelPointsToWin: 8,
      },
    ];
  }

  setNewConfig(level) {
    const levelMods = this.levels[level-2];
    this.levelModification = levelMods.modifications;
    this.levelPointsToWin = levelMods.levelPointsToWin;
    this.startSnakePosition = levelMods.startSnakePosition || { x: (this.cellsX - 2) * this.sizeCell, y: this.sizeCell * 2 };
    this.maxStep = levelMods.speed || 6;
  }

  setSpeed(speed) {
    this.maxStep = speed;
  }
}
