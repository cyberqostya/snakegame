export default class Config {
  constructor() {
    this.step = 0;
    this.maxStep = 6;
    this.sizeCell = 16;
    this.sizeBerry = this.sizeCell / 4;
    this.levelPointsToWin = 1;
    this.levelModification = [];

    this.levels = [
      {
        modifications: 'isRandomSnakeSpeed',
        levelPointsToWin: 8
      },
      {
        modifications: 'isBerryChangedObstacle',
        levelPointsToWin: 8
      },
      {
        modifications: ['isBerryChangedObstacle', 'isBorderDanger'],
        levelPointsToWin: 3
      },
      {
        isArrowsInvert: true,
      },
      {
        isFireBalls: true,
      },
      {
        isLessSpace: true,
      },
      {
        isBorderMadeThin: true,
      },
      {
        isBerryX2: true,
      },
      {
        isDeadBerryAround: true,
      },
      {
        isBerryAppearTimer: true,
      },
    ];
  }

  setNewConfig(level) {
    const levelMods = this.levels[level-2];
    this.levelModification = levelMods.modifications;
    this.levelPointsToWin = levelMods.levelPointsToWin;
  }

  setSpeed(speed) {
    this.maxStep = speed;
  }
}
