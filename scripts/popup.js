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
    } else if(reason === 'border') {
      reasonSentence = 'Кажется, что кто-то построил стены вокруг карты';
    } else if(reason === 'berries') {
      reasonSentence = 'То, чем питалась твоя змея, размножилось и убило её. Вот такая вот эволюционная цепочка';
    } else if(reason === 'bee') {
      reasonSentence = 'Ужалила...';
    }

    this.changeText(`
      <p>Оу май, ты потерял жизнь</p>
      <p>${reasonSentence}</p>
    `);
    this.show();
  }

  enter1() {
    this.changeText(`
      <p>Приветствую тебя на игре «Змейка за пятьсот»!</p>
      <p>Введи имя, чтобы начать игру:</p>
      <form>
        <input type="text" name="name" required minlength="2" />
        <button>ОК</button>
      </form>
      <p style="font-size:12px">*для получения приза важно, чтобы имя совпадало с реальным</p>
    `);
    this.show(false);
  }
  enter2() {
    this.changeText(`
      <p>Спасибо, \${name}.</p>
      <p>Желаю приятной игры!</p>
    `);
    this.show();
  }


  start() {
    this.changeText(`
      <p>Ну что, начнём игру, name?</p>
    `);
    this.show();
  }


  gameover() {// Цитата про безумие исходя из количества попыток
    this.changeText(`
      Вот и всё, ребята!
    `);
    this.show();
  }

  show(withBtn = true) {
    this.element.style.pointerEvents = 'all';
    this.element.style.opacity = '1';
    if(withBtn) {
      this.button.style.display = 'block';
      setTimeout(()=>{ this.button.classList.add('_active') },50);
    }
  }

  hide() {
    this.element.style.pointerEvents = 'none';
    this.element.style.opacity = '0';
    this.button.classList.remove('_active');
    this.button.style.display = 'none';

  }
}