export default class Score {
  constructor(config) {
    this.config = config;
    this.container = document.querySelector('.game-header');
    
    this.score = config.levelPointsToWin;
    this.scoreBlock = this.container.querySelector('.score-count');

    this.level = 1;
    this.levelBlock = this.container.querySelector('.game-lvl-count');

    this.maxLifes = 3;
    this.lifes = this.maxLifes;
    this.lifesBlock = this.container.querySelectorAll('.game-life');
  }

  decScore() {
    this.score--;
    this.drawScore();
  }

  setScoreToInitial() {
    this.score = this.config.levelPointsToWin;
    this.drawScore();
  }

  decLife() {
    this.lifes--;
    if( this.lifes === 0 ) {
      console.log('game over');
    }
    this.drawLifes();
    this.setScoreToInitial();
  }

  incLevel() {
    this.level++;
    this.drawLevel();
  }

  setLevelToOne() {
    this.level = 1;
    this.drawLevel();
  }

  drawLevel() {
    this.levelBlock.textContent = this.level;
  }

  drawLifes() {
    Array.from(this.lifesBlock)[this.maxLifes - this.lifes - 1].setAttribute('src', './images/heartless.svg');
  }

  drawScore() {
    this.scoreBlock.textContent = this.score;
  }
}