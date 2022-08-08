import Canvas from "./canvas.js";
import GameLoop from "./gameLoop.js";
import Snake from "./snake.js";
import Score from "./score.js";
import Berry from "./berry.js";
import Popup from "./popup.js";
import Config from "./config.js";
import Obstacles from "./obstacles.js";
import { findUniquesCoordObjectsFromArrays } from './supportFunctions.js';

const config = new Config();
const canvas = new Canvas();
const snake = new Snake(canvas, config);
const berry = new Berry(canvas, config);
const gameLoop = new GameLoop( config, updateAll, drawAll );
const popup = new Popup();
const score = new Score(config);
const obstacles = new Obstacles(canvas, config);


// Объявление необходимых для работы игры переменных

const loseLifeReasons = {
  tail: 'tail',
  obstacle: 'obstacle',
  border: 'border',
}


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
      loseLife(loseLifeReasons.tail);
      return;
    }
  }

  // Столкновение головы змейки с ягодой
  if(head.x === berry.x && head.y === berry.y) {

    score.decScore();
    
    // Проверка прошел ли игрок уровень
    if(score.score === 0) {
      gameLoop.stop();
      snake.reset();
      berry.reset();
      popup.newLevel(score.level);
      score.incLevel();


      // Модификация уровня
      // Появление препятствия вместо ягоды
      if(config.levelModification.includes('isBerryChangedObstacle')) {
        obstacles.reset();
      }
      // Конец модификации


      // Модификация уровня
      // Увеличение скорости змейки рандомно
      if(config.levelModification.includes('isRandomSnakeSpeed')) {
        config.setSpeed(6);
      }
      // Конец модификации

      
      config.setNewConfig(score.level);
      score.setScoreToInitial();

      return;
    }


    // Модификация уровня
    // Появление препятствия вместо ягоды
    if(config.levelModification.includes('isBerryChangedObstacle')) {
      obstacles.update({ x: berry.x, y: berry.y });
    }
    // Конец модификации


    // Модификация уровня
    // Увеличение скорости змейки рандомно
    if(config.levelModification.includes('isRandomSnakeSpeed')) {
      const speeds = [2, 10, 27];
      const index = Math.round(Math.random() * 2);
      config.setSpeed( speeds[index] );
    }
    // Конец модификации


    snake.maxTails++;
    let arrayForBerry;
    // Модификация уровня
    // Появление препятствия вместо ягоды
    if(config.levelModification.includes('isBerryChangedObstacle')) {
      arrayForBerry = findUniquesCoordObjectsFromArrays(canvas.cells, snake.tails.concat(obstacles.obstacles));
      // Конец модификации
    } else {
      arrayForBerry = findUniquesCoordObjectsFromArrays(canvas.cells, snake.tails);
    }
    
    
    berry.randomPosition( arrayForBerry );
  }

  // Модификация уровня
  // Появление препятствия вместо ягоды
  // Столкновение головы змеи с препятствием
  if(config.levelModification.includes('isBerryChangedObstacle')) {
    for (let i = 0; i < obstacles.obstacles.length; i++) {
      if(head.x === obstacles.obstacles[i].x && head.y === obstacles.obstacles[i].y && obstacles.obstacles[i].isNotFresh) {
        loseLife(loseLifeReasons.obstacle);
        return;
      }
      
    }
  }
  // Конец модификации
}


function drawAll() {
  canvas.context.clearRect( 0, 0, canvas.element.width, canvas.element.height );
  snake.draw();
  berry.draw();

  // Модификация уровня
  // Появление препятствия вместо ягоды когда змейка прошла мимо
  if(config.levelModification.includes('isBerryChangedObstacle') && obstacles.obstacles.length > 0 && snake.tails.length > 0) {
    let snakeOnObstacle = false;
    obstaclesLoop:
    for (let i = 0; i < obstacles.obstacles.length; i++) {
      for (let j = 0; j < snake.tails.length; j++) {
        if(obstacles.obstacles[i].x === snake.tails[j].x && obstacles.obstacles[i].y === snake.tails[j].y) {
          snakeOnObstacle = true;
          break obstaclesLoop;
        } 
      }
    }
    if(!snakeOnObstacle) obstacles.makeNotFresh();
  }
  obstacles.draw();
  // Конец модификации
}


function loseLife(reason) {
  gameLoop.stop();
  score.decLife();
  snake.reset();
  if(score.lifes === 0) {
    return popup.gameover();
  }
  popup.loseLife(reason);


  // Модификация уровня
  // Появление препятствия вместо ягоды
  if(config.levelModification.includes('isBerryChangedObstacle')) {
    obstacles.reset();
  }
  // Конец модификации


  // Модификация уровня
  // Увеличение скорости змейки рандомно
  if(config.levelModification.includes('isRandomSnakeSpeed')) {
    config.setSpeed(6);
  }
  // Конец модификации
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