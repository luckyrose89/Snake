// Start game on click on start button
document.addEventListener("DOMContentLoaded", () => {
  const blocks = document.querySelectorAll(".game-grid__block");
  const scoreDisplay = document.querySelector(".score-value");
  const startButton = document.querySelector(".start");

  const width = 10; // specifies the vertical distance traveled in a direction
  let applePosition = 0; // the position of apple on the game grid
  let direction = 1; // the direction of the snake, 1 being right and -1 being left
  let currentIndex = 0; //the starting div on the game grid;
  let snakeIndex = [2, 1, 0]; //The positon of snake body with head being 2, 1 being body and 0 being tails
  let score = 0;
  let speed = 0.9;
  let intervalTime = 0;
  let interval;

  // a function to start the game
  function startGame() {
    snakeIndex.forEach((index) => blocks[index].classList.remove("snake"));
    blocks[applePosition].classList.remove("apple");
    clearInterval(interval);
    direction = 1;
    score = 0;
    randomApple();
    scoreDisplay.textContent = score;
    intervalTime = 500;
    applePosition = 0;
    snakeIndex = [2, 1, 0];
    currentIndex = 0;
    snakeIndex.forEach((index) => blocks[index].classList.add("snake"));
    interval = setInterval(moveOutComes, intervalTime);
  }

  // a function that determines move outcomes
  function moveOutComes() {
    //determine collision outcomes
    if (
      (snakeIndex[0] + width >= width * width && direction === width) || // if snake reaches bottom wall
      (snakeIndex[0] - width < 0 && direction === -width) || // if snake reaches top wall
      (snakeIndex[0] % width === width - 1 && direction === 1) || // if snake hits right wall
      (snakeIndex[0] % width === 0 && direction === -1) || // if snake hits left wall
      blocks[snakeIndex[0] + direction].classList.contains("snake") // if the snake runs into itself
    ) {
      clearInterval(interval);
    }

    // removing tail and position snake head according to direction
    const tail = snakeIndex.pop(); //remove the last, tail element from snake's body array
    blocks[tail].classList.remove("snake"); // remove the class snake from the tail block
    snakeIndex.unshift(snakeIndex[0] + direction); // points snake head in direction it moves

    // determine snake upon consuming apple
    if (blocks[snakeIndex[0]].classList.contains("apple")) {
      blocks[snakeIndex[0]].classList.remove("apple");
      blocks[tail].classList.add("snake");
      snakeIndex.push(tail);
      randomApple();
      score++;
      scoreDisplay.textContent = score;
      clearInterval(interval);
      intervalTime = intervalTime * speed;
      interval = setInterval(moveOutComes, intervalTime);
    }

    blocks[snakeIndex[0]].classList.add("snake"); // add snake class to snake's head block
  }

  // a function that generate apple in trandom block index
  function randomApple() {
    do {
      applePosition = Math.floor(Math.random() * blocks.length);
    } while (blocks[applePosition].classList.contains("snake")); // apple blocks dont appear on snake blocks

    blocks[applePosition].classList.add("apple");
  }

  // a function to control snake based on keycodes
  function control(e) {
    if (e.keyCode === 39) {
      direction = 1;
      e.preventDefault();
    } else if (e.keyCode === 38) {
      direction = -width;
    } else if (e.keyCode === 37) {
      direction = -1;
      e.preventDefault();
    } else if (e.keyCode === 40) {
      direction = +width;
    }
  }

  document.addEventListener("keyup", control);
  startButton.addEventListener("click", startGame);
});
