export default class Popup {
  constructor() {
    this.element = document.querySelector('.menu-popup');
    this.textBlock = this.element.querySelector('.menu-popup__text');
    this.button = this.element.querySelector('.menu-popup__button');

    this.changeSentences = [
      'На новом уровне, что-то поменялось.',
      'На новом уровне, опять что-то поменялось.',
      'На новом уровне, снова что-то поменялось.',
      'На новом уровне, опять что-то поменялось. Ты удивлен?',
      'И сейчас что-то поменялось. А ты только привык к этому режиму...',
      'На новом уровне, что-то поменялось или не поменялось или пошел я.',
      'todo: Написать, что на уровне что-то поменялось, не используя "что-то", "поменялось" и "уровень"',
      'Самсинк хэз чэнжд.',
    ];
  }

  changeText(newText) {
    this.textBlock.innerHTML = newText;
  }

  newLevel(level) {
    this.changeText(`
      <p>Поздравляю, уровень&nbsp;${level} пройден!</p>
      <p>${this.changeSentences[level-1]}</p>
      <p>Вперед!</p>
    `);
    this.show();
  }

  loseLife(reason) {
    let reasonSentence;
    if(reason === 'tail') {
      reasonSentence = 'Наверное не стоило кусать себя за хвост, не так ли?';
    } else if(reason === 'obstacle') {
      reasonSentence = 'А тебе разве не говорили не есть всякие коричневые квадратные штуковины?';
    }

    this.changeText(`
      <p>Оу май, ты потерял жизнь</p>
      <p>${reasonSentence}</p>
    `);
    this.show();
  }

  gameover() {
    this.changeText(`GAME OVER`);
    this.show();
  }

  show() {
    this.element.style.pointerEvents = 'all';
    this.element.style.opacity = '1';
  }

  hide() {
    this.element.style.pointerEvents = 'none';
    this.element.style.opacity = '0';
  }
}