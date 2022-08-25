export default class Popup {
  constructor() {
    this.element = document.querySelector('.menu-popup');
    this.textBlock = this.element.querySelector('.menu-popup__text');
    this.button = this.element.querySelector('.menu-popup__button');

    this.changeSentences = [
      'Получать готовое скучно. Добиваться знаний самому - вот истинное удовольствие.',
      'Успех зависит от скорости адаптации к новым обстоятельствам.',
      'Способность к адаптации — важная часть выживания. Если задача кажется непреодолимой, попробуй подойти к ней с другого угла.',
      'Дело не в том, что жизнь становится проще или сложнее. Мы просто учимся справляться с ней.',
      'Приспосабливаться к новому нужно поскорее, поскольку, не приспособившись вовремя, ты рискуешь не приспособиться вообще.',
      'Пусть lvl равно четыре. Тогда икс равно ноль, а игрик равно пятнадцать. Вдруг поможет',
      'Не позволяй прошлому занимать слишком много места в настоящем.',
      'Преврати свои раны в мудрость.',
      'Final BOSS!',
    ];
  }

  changeText(newText) {
    this.textBlock.innerHTML = newText;
  }

  newLevel(level) {
    this.changeText(`
      <p>Уровень&nbsp;${level} пройден!</p>
      <p style="font-style:italic; font-size:19px">${this.changeSentences[level-1]}</p>
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
      reasonSentence = 'Пчела рандома ужалила тебя. Теперь ты ходишь задом наперед!';
    }

    this.changeText(`
      <p>Оу май, ты потерял жизнь</p>
      <p>${reasonSentence}</p>
    `);
    this.show();
  }

  enter1() {
    this.changeText(`
      <p>Приветствую тебя на игре «ЗMEЙ-K»</p>
      <p>Введи имя, чтобы начать игру:</p>
      <form class="menu-popup__form">
        <input type="text" name="name" required minlength="2" pattern="[^-]+" />
        <button>ОК</button>
      </form>
      <p style="font-size:12px; font-style:italic">*для получения приза важно, чтобы имя совпадало с реальным</p>
    `);
    this.show(false);
  }
  enter2(nameCodeArray) {
    const [name, code] = nameCodeArray;
    this.changeText(`
      <p>Удачи,</p>
      <p class="menu-popup__name">${name}</p></p>
      <p>Желаю приятной игры!</p>
    `);
    this.show();
  }


  start(nameCodeArray) {
    const [name, code] = nameCodeArray;
    this.changeText(`
      <p>О, привет,</p>
      <p class="menu-popup__name">${name}</p></p>
      <p>Начнём игру?</p>
    `);
    this.show();
  }


  gameover() {// Цитата про безумие исходя из количества попыток
    this.changeText(`
      Вот и всё, ребята!
    `);
    this.show();
  }


  win(nameCodeArray, deaths) {
    const [name, code] = nameCodeArray;
    this.changeText(`
      <p>Поздравляю!</p>
      <p>
        <span class="menu-popup__name">${name}
          <span class="menu-popup__name-code">${code}</span>
        </span>
      </p>
      <p>Ты прошел «ЗMEЙ-K» с&nbsp;${deaths + 1}&nbsp;попытки!</p>
      <p style="font-size:10px; font-style:italic;">*Сделай скриншот этого экрана и размести его в любой соцсети. Не забудь поделиться впечатлениями, написав пару слов, отметь меня (<a target="_blank" href="https://vk.com/cyberqostya">@cyberqostya</a>) и получи заслуженный приз!</p>
    `);
    this.show(false);
  }


  easterCoord() {
    this.changeText(`
      <p>Секрет найден!</p>
      <p>Дополнительная жизнь твоя. Пользуйся ей с осторожностью.</p>
    `);
    this.show();
  }


  easterKonami() {
    this.changeText(`
      <p>Секрет найден!</p>
      <p>Дополнительная жизнь твоя. Откуда ты знаешь про этот код??</p>
    `);
    this.show();
  }


  notDesktop() {
    this.changeText(`
      <p>Это игра доступна только на мобильных устройствах.</p>
      <p>Сканируй код и за дело!</p>
      <img class="qrcode" src="./images/qr.svg" alt="qr">
    `);
    this.show(false);
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