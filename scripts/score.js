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
    this.lifesContainer = this.container.querySelector('.game-lifes');

    this.drawLifes();
  }

  decScore() {
    this.score--;
    this.drawScore();
  }

  setScoreToInitial() {
    this.score = this.config.levelPointsToWin;
    this.drawScore();
  }

  plus(num) {
    this.score += num;
    this.drawScore();
  }
  minus(num) {
    this.score -= num;
    this.drawScore();
  }
  mult(num) {
    this.score *= num;
    this.drawScore();
  }
  div(num) {
    this.score = Math.floor(this.score / num);
    this.drawScore();
  }
  sign() {
    this.score = -this.score;
    this.drawScore();
  }

  decLife() {
    this.lifes--;
    this.drawLifes();
    this.setScoreToInitial();
  }

  incLife() {
    if(this.lifes !== this.maxLifes) {
      this.lifes++;
    } else {
      this.maxLifes++;
      this.lifes++;
    }
    this.drawLifes();
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
    this.lifesContainer.innerHTML = '';
    for(let i=0; i<this.maxLifes; i++) {
      let src = '';
      if(i+1 <= this.lifes) {
        src = "./images/heart.svg";
      } else {
        src = "./images/heartless.svg";
      }
      this.lifesContainer.insertAdjacentHTML('beforeend', `<img class="game-life" alt="life" src="${src}" style="width:calc((100% - 4px * ${this.maxLifes - 1}) / ${this.maxLifes})">`);
    }
  }

  drawScore() {
    this.scoreBlock.textContent = this.score;
  }
}