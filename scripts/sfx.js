export default class Sfx {
  constructor() {
    this.arrowSound = new Howl({ src: ['./sfx/arrowSound.mp3'] });
    this.snakeEatSound = new Howl({ src: ['./sfx/eat.mp3'] });
    this.gameoverSound = new Howl({ src: ['./sfx/gameover.mp3'] });
    this.loselifeSound = new Howl({ src: ['./sfx/ohmy.mp3'] });
    this.lvlupSound = new Howl({ src: ['./sfx/lvlup.mp3'] });
    this.damageSound = new Howl({ src: ['./sfx/damage.mp3'] });
    this.easterSound = new Howl({ src: ['./sfx/easter.mp3'] });
    this.letmidieSound = new Howl({ src: ['./sfx/letmidie.mp3'] });
    this.easymodeSound = new Howl({ src: ['./sfx/easymode.mp3'] });
    this.hardmodeSound = new Howl({ src: ['./sfx/hardmode.mp3'] });
  }

  arrowPress() { this.arrowSound.play() }
  snakeEat() { this.snakeEatSound.play() }
  gameover() { this.gameoverSound.play() }
  loselife() { 
    this.damageSound.play();
    Math.random() > 0.7 ? this.letmidieSound.play() : this.loselifeSound.play();
  }
  lvlup() { this.lvlupSound.play() }
  easter() { this.easterSound.play() }
  easymode() { this.easymodeSound.play() }
  hardmode() { this.hardmodeSound.play() }
}