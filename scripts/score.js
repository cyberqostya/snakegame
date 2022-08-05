export default class Score {
  constructor() {
    this.scoreBlock = document.querySelector('.score-count');
    this.score = 0;

    this.draw();
  }

  incScore() {
    this.score++;
    this.draw();
  }

  setToZero() {
    this.score = 0;
    this.draw();
  }

  draw() {
    this.scoreBlock.textContent = this.score;
  }
}