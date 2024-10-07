const gameContainer = document.getElementById('game-container');
const basket = document.getElementById('basket');
const scoreElement = document.getElementById('score');
let score = 0;
let basketX = 260;
let objects = [];
let gameOver = false;

function createObject() {
  const object = document.createElement('div');
  object.classList.add('object');
  object.style.left = Math.random() * (gameContainer.offsetWidth - 20) + 'px';
  object.style.top = '-20px';
  gameContainer.appendChild(object);
  objects.push(object);
}

function moveObjects() {
  objects.forEach((object, index) => {
    object.style.top = parseInt(object.style.top) + 1 + 'px';

    if (parseInt(object.style.top) > gameContainer.offsetHeight) {
      object.remove();
      objects.splice(index, 1);
      gameOver = false;
    }

    // Check if the object was caught
    if (parseInt(object.style.left) >= basketX &&
        parseInt(object.style.left) <= basketX + basket.offsetWidth &&
        parseInt(object.style.top) + 20 >= gameContainer.offsetHeight - basket.offsetHeight) {
      object.remove();
      objects.splice(index, 1);
      score++;
      scoreElement.textContent = 'Score: ' + score;
    }
  });
}

function moveBasket(direction) {
  if (direction === 'left' && basketX > 0) {
    basketX -= 20;
  } else if (direction === 'right' && basketX < gameContainer.offsetWidth - basket.offsetWidth) {
    basketX += 20;
  }
  basket.style.left = basketX + 'px';
}

document.addEventListener('keydown', (event) => {
  if (gameOver) return; // Don't respond to key presses after game over

  switch (event.key) {
    case 'ArrowLeft':
      moveBasket('left');
      break;
    case 'ArrowRight':
      moveBasket('right');
      break;
  }
});

function gameLoop() {
  if (gameOver) {
    alert('Game Over! Your score: ' + score);
    return;
  }

  moveObjects();
  if (Math.random() < 0.01) { // Create new objects randomly
    createObject();
  }
  requestAnimationFrame(gameLoop);
}

gameLoop();
