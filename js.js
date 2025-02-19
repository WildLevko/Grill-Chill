alert("Перед використанням оновить сторінку! Удачі!🤝")

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const upButton = document.getElementById('up');
const downButton = document.getElementById('down');
const leftButton = document.getElementById('left');
const rightButton = document.getElementById('right');

const tileSize = 60;
const playerSize = 49;
const cabbageSize = 45;
const cabbage2Size = 50;

const cucumberImage = new Image();
const cabbageImage = new Image();
const cabbage2Image = new Image();
cucumberImage.src = 'БУрГер.png';
cabbageImage.src = 'hjnbr.png';
cabbage2Image.src = 'hjn.png';

let mazeData = [
  [0, 2, 0, 0, 0, 2, 0, 0],
  [0, 1, 1, 1, 1, 1, 1, 0],
  [0, 0, 0, 1, 0, 0, 1, 1],
  [1, 1, 0, 1, 0, 0, 0, 2],
  [1, 1, 0, 0, 0, 1, 1, 0],
  [0, 0, 0, 1, 0, 0, 0, 1],
  [1, 1, 0, 1, 0, 1, 1, 0],
  [0, 0, 0, 1, 0, 1, 0, 0],
  [1, 1, 1, 1, 0, 0, 0, 0]
];

let playerPosition = { x: 0, y: 0 };
const cabbagePosition = { x: 7, y: 6 };
const cabbage2Position = { x: 7, y: 0 };
let cabbageCollected = false;
let cabbage2Collected = false;

function drawMaze() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let row = 0; row < mazeData.length; row++) {
    for (let col = 0; col < mazeData[row].length; col++) {
      if (mazeData[row][col] === 1) {
        ctx.fillStyle = '#0361d4'; // Стена
        drawRoundedRect(col * tileSize, row * tileSize, tileSize, tileSize, 10);
      } else if (mazeData[row][col] === 2) {
        ctx.fillStyle = cabbageCollected ? 'rgba(175, 219, 14, 0)' : '#03d0d4';
        drawRoundedRect(col * tileSize, row * tileSize, tileSize, tileSize, 10);
      } else {
        ctx.fillStyle = 'rgba(175, 219, 14, 0)'; // Пустая клетка
        drawRoundedRect(col * tileSize, row * tileSize, tileSize, tileSize, 10);
      }
    }
  }

  ctx.drawImage(cucumberImage, playerPosition.x * tileSize + 10, playerPosition.y * tileSize + 10, playerSize, playerSize);

  if (!cabbageCollected) {
    ctx.drawImage(cabbageImage, cabbagePosition.x * tileSize + 10, cabbagePosition.y * tileSize + 10, cabbageSize, cabbageSize);
  }

  if (!cabbage2Collected) {
    ctx.drawImage(cabbage2Image, cabbage2Position.x * tileSize + 10, cabbage2Position.y * tileSize + 10, cabbageSize, cabbageSize);
  }
}

function drawRoundedRect(x, y, width, height, radius) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
  ctx.fill();
}


  ctx.drawImage(cucumberImage, playerPosition.x * tileSize + 10, playerPosition.y * tileSize + 10, playerSize, playerSize);

  if (!cabbageCollected) {
    ctx.drawImage(cabbageImage, cabbagePosition.x * tileSize + 10, cabbagePosition.y * tileSize + 10, cabbageSize, cabbageSize);
  }

  if (!cabbage2Collected) {
    ctx.drawImage(cabbage2Image, cabbage2Position.x * tileSize + 10, cabbage2Position.y * tileSize + 10, cabbageSize, cabbageSize);
  }


function checkForCollision() {
  if (playerPosition.x === cabbagePosition.x && playerPosition.y === cabbagePosition.y && !cabbageCollected) {
    cabbageCollected = true;

    // Удаляем жёлтые стены (2) после сбора первой капусты
    mazeData = mazeData.map(row => row.map(cell => (cell === 2 ? 0 : cell)));
  }

  if (playerPosition.x === cabbage2Position.x && playerPosition.y === cabbage2Position.y && !cabbage2Collected) {
    cabbage2Collected = true;
  }

  drawMaze();

  // Если собрали обе капусты, игра заканчивается
  if (cabbageCollected && cabbage2Collected) {
    setTimeout(() => {
      alert("Ви накормиои всіх! Всі ситі!🍔");
      resetGame();
    }, 100);
  }
}

function movePlayer(dx, dy) {
  const newX = playerPosition.x + dx;
  const newY = playerPosition.y + dy;

  if (newX >= 0 && newX < 8 && newY >= 0 && newY < 9 && mazeData[newY][newX] !== 1 && (mazeData[newY][newX] !== 2 || cabbageCollected)) {
    playerPosition.x = newX;
    playerPosition.y = newY;
    drawMaze();
    checkForCollision();
  }
}

function resetGame() {
  playerPosition = { x: 0, y: 0 };
  cabbageCollected = false;
  cabbage2Collected = false;
  
  
  // Восстанавливаем лабиринт
  mazeData = [
    [0, 2, 0, 0, 0, 2, 0, 0],
  [0, 1, 1, 1, 1, 1, 1, 0],
  [0, 0, 0, 1, 0, 0, 1, 1],
  [1, 1, 0, 1, 0, 0, 0, 2],
  [1, 1, 0, 0, 0, 1, 1, 0],
  [0, 0, 0, 1, 0, 0, 0, 1],
  [1, 1, 0, 1, 0, 1, 1, 0],
  [0, 0, 0, 1, 0, 1, 0, 0],
  [1, 1, 1, 1, 0, 0, 0, 0]
  ];

  drawMaze();
}

upButton.addEventListener('click', () => movePlayer(0, -1));
downButton.addEventListener('click', () => movePlayer(0, 1));
leftButton.addEventListener('click', () => movePlayer(-1, 0));
rightButton.addEventListener('click', () => movePlayer(1, 0));
drawMaze();

cucumberImage.onload = () => {
  cabbageImage.onload = () => {
    cabbage2Image.onload = drawMaze;
    cucumberImage.onload = drawMaze;
  };
};
document.addEventListener('keydown', (event) => {
  switch (event.key.toLowerCase()) {
    case 'w': // Вверх
      movePlayer(0, -1);
      break;
    case 's': // Вниз
      movePlayer(0, 1);
      break;
    case 'a': // Влево
      movePlayer(-1, 0);
      break;
    case 'd': // Вправо
      movePlayer(1, 0);
      break;
  }
});
