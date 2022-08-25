export default class Sfx {
  constructor() {
    this.sound = new Howl({
      src: ['./sfx/arrowSound.mp3']
    });
  }

  arrowPress() { 
    this.sound.play();
  }


  snakeEat() { new Audio('./sfx/eat.mp3').play() }
  gameover() { new Audio('./sfx/gameover.mp3').play() }
  loselife() { new Audio('./sfx/ohmy.mp3').play() }
  lvlup() { new Audio('./sfx/lvlup.mp3').play() }
  damage() { new Audio('./sfx/damage.mp3').play() }
  easter() { new Audio('./sfx/easter.mp3').play() }
}