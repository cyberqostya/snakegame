import Canvas from "./canvas.js";
import GameLoop from "./gameLoop.js";
import Snake from "./snake.js";
import Score from "./score.js";
import Berry from "./berry.js";
import Popup from "./popup.js";
import Config from "./config.js";

const config = new Config();
const canvas = new Canvas();
const snake = new Snake(canvas, config);
const berry = new Berry(canvas, config);
const gameLoop = new GameLoop( config, updateAll, drawAll );
const popup = new Popup();
const score = new Score();


// Объявление необходимых для работы игры переменных

function updateAll() {
  // snake.update( berry, snakeDeath, snakeEat );

  snake.x += snake.dx;
  snake.y += snake.dy;
  
  // Столкновение со стеной
  snake.checkBorder();

  snake.tails.unshift( { x: snake.x, y: snake.y } );

  if( snake.tails.length > snake.maxTails ) {
    snake.tails.pop();
  }

  const head = snake.tails[0];

  // Столкновение головы змейки с хвостом
  for (let i = 1; i < snake.tails.length; i++) {
    if(head.x === snake.tails[i].x && head.y === snake.tails[i].y) {
      score.decLife();
      if(score.lifes === 0) {
        popup.changeText(`GAME OVER`);
      } else {
        popup.changeText(`Осталось ${score.lifes} жизни, соберись!`);
      }
      snake.reset();
      popup.show();
      gameLoop.stop();
      return;
    }
  }

  // Столкновение головы змейки с ягодой
  if(head.x === berry.x && head.y === berry.y) {
    snake.maxTails++;
    berry.randomPosition( snake.getCellsWithoutSnake() );
    score.incScore();
  }
}


function drawAll() {
  canvas.context.clearRect( 0, 0, canvas.element.width, canvas.element.height );
  snake.draw();
  berry.draw();
}




// Начало работы



// Обработчик на кнопку формы - начало игры / конец игры
popup.button.addEventListener('touchstart', () => {
  if(score.lifes === 0) {
    location.reload();
  } else {
    popup.hide();
    gameLoop.start();
    berry.randomPosition(canvas.cells);
  }
});



// Обработчик на кнопки управления змейкой
document.querySelector('.mobile-controls').addEventListener("touchstart", (e) => {
  if (e.target.closest('.mobile-control._left') && snake.dx !== config.sizeCell) {
    snake.dx = -config.sizeCell;
    snake.dy = 0;
  } else if (e.target.closest('.mobile-control._right') && snake.dx !== -config.sizeCell) {
    snake.dx = config.sizeCell;
    snake.dy = 0;
  } else if (e.target.closest('.mobile-control._up') && snake.dy !== config.sizeCell) {
    snake.dx = 0;
    snake.dy = -config.sizeCell;
  } else if (e.target.closest('.mobile-control._down') && snake.dy !== -config.sizeCell) {
    snake.dx = 0;
    snake.dy = config.sizeCell;
  }
});



// Отрисовали начальные данные
score.drawLevel();
score.drawScore();



// Показали попап для начала игры
popup.show();