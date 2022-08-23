export default class Config {
  constructor() {
    this.step = 0;
    this.maxStep = 8;
    this.cellsX = 19;
    this.cellsY = 19;
    this.sizeCell = 16;
    this.sizeBerry = this.sizeCell / 4;
    this.levelPointsToWin = 1;
    this.levelModification = [];
    this.startSnakePosition = { x: (this.cellsX - 6) * this.sizeCell, y: this.sizeCell * 2 };

    this.levels = [
      {
        modifications: ['isRandomSnakeSpeed'],
        levelPointsToWin: 1, //24
        speed: 5,
      },
      {
        modifications: ['isBerryChangedObstacle'],
        levelPointsToWin: 1, //20
      },
      {
        modifications: ['isBorderDanger'],
        levelPointsToWin: 1, //25
        startSnakePosition: { x: this.sizeCell * 2, y: Math.floor(this.cellsX / 2) * this.sizeCell },
      },
      {
        modifications: ['isBorderDanger', 'isArrowsInvert'],
        levelPointsToWin: 1, //7
        startSnakePosition: { x: this.sizeCell, y: Math.floor(this.cellsX / 2) * this.sizeCell },
      },
      {
        modifications: ['doubleLength', 'isBorderDanger'],
        levelPointsToWin: 1,//7
        startSnakePosition: { x: this.sizeCell * 2, y: Math.floor(this.cellsX - 2) * this.sizeCell },
      },
      {
        modifications: ['plusBorder'],
        levelPointsToWin: 1, //12
      },
      {
        modifications: ['berryTimer', 'isBorderDanger'],
        levelPointsToWin: 1, //20
        speed: 6,
      },
      {
        modifications: ['isBeeAround'],
        levelPointsToWin: 1, //14
      },
      {
        modifications: ['berryType', 'isBorderDanger'],
        levelPointsToWin: 1, //100
        startSnakePosition: { x: this.sizeCell * 2, y: Math.floor(this.cellsX / 2) * this.sizeCell },
      },
    ];
  }

  setNewConfig(level) {
    const levelMods = this.levels[level-2];
    this.levelModification = levelMods.modifications;
    this.levelPointsToWin = levelMods.levelPointsToWin;
    this.startSnakePosition = levelMods.startSnakePosition || { x: (this.cellsX - 6) * this.sizeCell, y: this.sizeCell * 2 };
    this.maxStep = levelMods.speed || 8;
  }

  setSpeed(speed) {
    this.maxStep = speed;
  }
}
