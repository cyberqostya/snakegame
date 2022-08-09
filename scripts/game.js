import Canvas from "./canvas.js";
import GameLoop from "./gameLoop.js";
import Snake from "./snake.js";
import Score from "./score.js";
import Berry from "./berry.js";
import Popup from "./popup.js";
import Config from "./config.js";
import Obstacles from "./obstacles.js";
import { findUniquesCoordObjectsFromArrays } from './supportFunctions.js';
import Bee from "./bee.js";

const config = new Config();
const canvas = new Canvas(config);
const snake = new Snake(canvas, config);
const berry = new Berry(canvas, config);
const gameLoop = new GameLoop( config, updateAll, drawAll );
const popup = new Popup();
const score = new Score(config);
const obstacles = new Obstacles(canvas, config);
const bee = new Bee(canvas, config);


// Объявление необходимых для работы игры переменных

const loseLifeReasons = {
  tail: 'tail',
  obstacle: 'obstacle',
  border: 'border',
  berries: 'berries',
}


function updateAll() {

  snake.x += snake.dx;
  snake.y += snake.dy;


  // Модификация уровня
  // Пчела
  if(config.levelModification.includes('isBeeAround')) {
    bee.update();
  }
  // Конец модификации
  

  // Модификация уровня
  // Появление ягод по таймеру
  if(config.levelModification.includes('berryTimer')) {
    appearTimerBerry();
    if(berry.berries.length > 5) {
      return loseLife(loseLifeReasons.berries);
    }
  }
  // Конец модификации


  // Модификация уровня
  // Границы бьют
  if(config.levelModification.includes('isBorderDanger')) {

    if(snake.x < 0 || snake.x >= canvas.element.width || snake.y < 0 || snake.y >= canvas.element.height) {
      return loseLife(loseLifeReasons.border);
    }

    // Конец модификации
  } else {
    snake.checkBorder();
  }
  

  snake.tails.unshift( { x: snake.x, y: snake.y } );

  if( snake.tails.length > snake.maxTails ) {
    snake.tails.pop();
  }


  // Модификация уровня
  // Граница в форме +
  if(config.levelModification.includes('plusBorder')) {
    const plusArray = [];
    const yCenterCoord = Math.floor(config.cellsY / 2) * config.sizeCell;
    const xCenterCoord = Math.floor(config.cellsX / 2) * config.sizeCell;
    for (let i = 0; i < config.cellsX; i++) {
      plusArray.push({ x: config.sizeCell * i, y: yCenterCoord, isNotFresh: true });
    }
    for (let i = 0; i < config.cellsY; i++) {
      plusArray.push({ x: xCenterCoord, y: config.sizeCell * i, isNotFresh: true });
    }
    obstacles.addObstacles(plusArray);
  }
  // Конец модификации


  const head = snake.tails[0];

  // Столкновение головы змейки с хвостом
  for (let i = 1; i < snake.tails.length; i++) {
    if(head.x === snake.tails[i].x && head.y === snake.tails[i].y) {
      loseLife(loseLifeReasons.tail);
      return;
    }
  }

  // Столкновение головы змейки с ягодой
  for (let i = 0; i < berry.berries.length; i++) {
    if(head.x === berry.berries[i].x && head.y === berry.berries[i].y) {
      
      score.decScore();
      
      // Проверка прошел ли игрок уровень
      if(score.score === 0) {
        gameLoop.stop();
        berry.reset();
        popup.newLevel(score.level);
        score.incLevel();


        // Модификация уровня
        // Появление препятствия вместо ягоды ИИ Граница в форме +
        if(config.levelModification.includes('isBerryChangedObstacle') || config.levelModification.includes('plusBorder')) {
          obstacles.reset();
        }
        // Конец модификации

        
        config.setNewConfig(score.level);
        snake.reset();
        score.setScoreToInitial();

        return;
      }


      // Модификация уровня
      // Появление препятствия вместо ягоды
      if(config.levelModification.includes('isBerryChangedObstacle')) {
        obstacles.update({ x: berry.berries[i].x, y: berry.berries[i].y });
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


      // Модификация уровня
      // Увеличение размера змейки вдвое
      if(config.levelModification.includes('doubleLength')) {
        snake.maxTails = snake.maxTails * 2;
      } else {
        snake.maxTails++;
      }
      // Конец модификации

      
      berry.eat( berry.berries[i] );


      // Модификация уровня
      // Появление ягод по таймеру
      if(!config.levelModification.includes('berryTimer')) {
        addBerry();
      }
      // Конец модификации
    }
  }


  // Модификация уровня
  // Появление препятствия вместо ягоды ИИ Граница в форме +
  // Столкновение головы змеи с препятствием
  if(config.levelModification.includes('isBerryChangedObstacle') || config.levelModification.includes('plusBorder')) {
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


  // Модификация уровня
  // Пчела
  if(config.levelModification.includes('isBeeAround')) {
    bee.draw();
  }
  // Конец модификации
}



function addBerry() {

  let arrayForBerry;
  // Модификация уровня
  // Появление препятствия вместо ягоды ИИ Граница в форме +
  if(config.levelModification.includes('isBerryChangedObstacle') || config.levelModification.includes('plusBorder')) {
    arrayForBerry = findUniquesCoordObjectsFromArrays(canvas.cells, snake.tails.concat(obstacles.obstacles).concat(berry.berries));
    // Конец модификации
  } else {
    arrayForBerry = findUniquesCoordObjectsFromArrays(canvas.cells, snake.tails.concat(berry.berries));
  }
  
  berry.addOnRandomPosition( arrayForBerry );

}


// Модификация уровня
// Появление ягод по таймеру
let isTimerBerryAppear = true;
function appearTimerBerry() {
  if(isTimerBerryAppear) {
    isTimerBerryAppear = false;

    setTimeout(() => {
      let arrayForBerry = findUniquesCoordObjectsFromArrays(canvas.cells, snake.tails.concat(berry.berries));
      berry.addOnRandomPosition( arrayForBerry );
      isTimerBerryAppear = true;
    }, 800);
  }
}
// Конец модификации


function loseLife(reason) {
  gameLoop.stop();
  score.decLife();
  snake.reset();
  berry.reset();
  if(score.lifes === 0) {
    return popup.gameover();
  }
  popup.loseLife(reason);


  // Модификация уровня
  // Появление препятствия вместо ягоды ИИ Граница в форме +
  if(config.levelModification.includes('isBerryChangedObstacle') || config.levelModification.includes('plusBorder')) {
    obstacles.reset();
  }
  // Конец модификации


  // Модификация уровня
  // Увеличение скорости змейки рандомно
  if(config.levelModification.includes('isRandomSnakeSpeed')) {
    config.setSpeed(6);
  }
  // Конец модификации


  // Модификация уровня
  // Появление ягод по таймеру
  if(config.levelModification.includes('berryTimer')) {
    isTimerBerryAppear = true;
  }
  // Конец модификации
}




// Начало работы



// Отключение зума при двойном тапе?
window.addEventListener('dblclick', (e) => { e.preventDefault() });



// Обработчик на кнопку формы - начало игры / конец игры
popup.button.addEventListener('touchstart', () => {
  if(score.lifes === 0) {
    location.reload();
  } else {
    popup.hide();
    gameLoop.start();
    berry.addOnRandomPosition(canvas.cells);


    // Модификация уровня
    // Пчела
    if(config.levelModification.includes('isBeeAround')) {
      bee.getPath(berry.berries[0]);
    }
    // Конец модификации

  }
});



// Обработчик на кнопки управления змейкой
document.querySelector('.mobile-controls').addEventListener("touchstart", (e) => {

  // Модификация уровня
  // Инвертированные стрелки
  if(config.levelModification.includes('isArrowsInvert')) {
    if (e.target.closest('.mobile-control._left') && snake.tails[1].x - snake.tails[0].x !== config.sizeCell) {
      snake.dx = config.sizeCell;
      snake.dy = 0;
    } else if (e.target.closest('.mobile-control._right') && snake.tails[0].x - snake.tails[1].x !== config.sizeCell) {
      snake.dx = -config.sizeCell;
      snake.dy = 0;
    } else if (e.target.closest('.mobile-control._up') && snake.tails[0].y - snake.tails[1].y !== config.sizeCell) {
      snake.dy = config.sizeCell;
      snake.dx = 0;
    } else if (e.target.closest('.mobile-control._down') && snake.tails[1].y - snake.tails[0].y !== config.sizeCell) {
      snake.dy = -config.sizeCell;
      snake.dx = 0;
    }
    // Конец модификации
  } else {
    if (e.target.closest('.mobile-control._left') && snake.tails[0].x - snake.tails[1].x !== config.sizeCell) {
      snake.dx = -config.sizeCell;
      snake.dy = 0;
    } else if (e.target.closest('.mobile-control._right') && snake.tails[1].x - snake.tails[0].x !== config.sizeCell) {
      snake.dx = config.sizeCell;
      snake.dy = 0;
    } else if (e.target.closest('.mobile-control._up') && snake.tails[1].y - snake.tails[0].y !== config.sizeCell) {
      snake.dy = -config.sizeCell;
      snake.dx = 0;
    } else if (e.target.closest('.mobile-control._down') && snake.tails[0].y - snake.tails[1].y !== config.sizeCell) {
      snake.dy = config.sizeCell;
      snake.dx = 0;
    }
  }
  
});



// Отрисовали начальные данные
score.drawLevel();
score.drawScore();



// Показали попап для начала игры
popup.show();






// DELETE
// DELETE
// DELETE
// DELETE
document.addEventListener("keydown", (e) => {

  // Модификация уровня
  // Инвертированные стрелки
  if(config.levelModification.includes('isArrowsInvert')) {
    if (e.key === 'ArrowLeft' && snake.tails[1].x - snake.tails[0].x !== config.sizeCell) {
      snake.dx = config.sizeCell;
      snake.dy = 0;
    } else if (e.key === 'ArrowRight' && snake.tails[0].x - snake.tails[1].x !== config.sizeCell) {
      snake.dx = -config.sizeCell;
      snake.dy = 0;
    } else if (e.key === 'ArrowUp' && snake.tails[0].y - snake.tails[1].y !== config.sizeCell) {
      snake.dy = config.sizeCell;
      snake.dx = 0;
    } else if (e.key === 'ArrowDown' && snake.tails[1].y - snake.tails[0].y !== config.sizeCell) {
      snake.dy = -config.sizeCell;
      snake.dx = 0;
    }
    // Конец модификации
  } else {
    if (e.key === 'ArrowLeft' && snake.tails[0].x - snake.tails[1].x !== config.sizeCell) {
      snake.dx = -config.sizeCell;
      snake.dy = 0;
    } else if (e.key === 'ArrowRight' && snake.tails[1].x - snake.tails[0].x !== config.sizeCell) {
      snake.dx = config.sizeCell;
      snake.dy = 0;
    } else if (e.key === 'ArrowUp' && snake.tails[1].y - snake.tails[0].y !== config.sizeCell) {
      snake.dy = -config.sizeCell;
      snake.dx = 0;
    } else if (e.key === 'ArrowDown' && snake.tails[0].y - snake.tails[1].y !== config.sizeCell) {
      snake.dy = config.sizeCell;
      snake.dx = 0;
    }
  }
  
});