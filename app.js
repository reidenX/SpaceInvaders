const space = document.querySelector(".space");
let playerControls = document.addEventListener("keydown", movePlayer);
let gameOverMessage = document.querySelector(".gameOver");
let playerPosition = 202;
let alienIndex;
let shooting;
let alienSpeed = 2000;

let killedAliens = [];
let aliens = [
  0, 1, 3, 4, 5, 8, 9, 11, 12, 14, 18, 19, 20, 22, 24, 25, 26, 32, 33, 36, 39,
  41, 43, 44,
];

//layout---------------------------------------
for (let i = 0; i < 210; i++) {
  const square = document.createElement("div");
  space.appendChild(square);
}

const gridTiles = Array.from(document.querySelectorAll(".space div"));

//Render-------------------------------------
function draw() {
  for (let i = 0; i < aliens.length; i++) {
    if (!killedAliens.includes(i)) {
      gridTiles[aliens[i]].classList.add("aliens");
    }
  }
}

function remove() {
  for (let i = 0; i < aliens.length; i++) {
    gridTiles[aliens[i]].classList.remove("aliens");
  }
}

//ALiens------------------------------------
function moveAlien() {
  remove();
  for (let i = 0; i < aliens.length; i++) {
    aliens[i] += 15;
  }

  draw();
}

alienIndex = setInterval(() => {
  moveAlien();
}, alienSpeed);

//PlayerControls--------------------------------
gridTiles[playerPosition].classList.add("player");

function movePlayer(e) {
  gridTiles[playerPosition].classList.remove("player");

  let key = e.key;
  let rightEdge = playerPosition % 15 < 14;
  let leftEdge = playerPosition % 15 !== 0;

  if ((key == "D" || key == "d" || key == "ArrowRight") && rightEdge) {
    playerPosition += 1;
  }

  if ((key == "A" || key == "a" || key == "ArrowLeft") && leftEdge) {
    playerPosition -= 1;
  }

  // switch (e.key) {
  //   case "ArrowRight":
  //     if (playerPosition % 15 < 14) playerPosition += 1;
  //     break;
  //   case "ArrowRight":
  //     if (playerPosition % 15 < 14) playerPosition += 1;
  //     break;
  //   case "ArrowLeft":
  //     if (playerPosition % 15 !== 0) playerPosition -= 1;
  //     break;
  // }
  gridTiles[playerPosition].classList.add("player");
}

const score = document.querySelector(".score");
let currentScore = 0;

//SHOOT-----------------------------------------
function shoot() {
  let bulletIndex = playerPosition;
  let bullet = gridTiles[bulletIndex];
  let bulletId;

  function moveBullet() {
    bullet.classList.remove("bullet");
    bullet = gridTiles[(bulletIndex -= 15)];
    bullet.classList.add("bullet");
    if (bullet.classList.contains("aliens")) {
      clearInterval(bulletId);
      bullet.classList.remove("bullet");
      gridTiles[bulletIndex].classList.remove("aliens");

      const shotAlien = aliens.indexOf(bulletIndex);
      killedAliens.push(shotAlien);
      console.log(killedAliens);

      currentScore++;
      score.innerHTML = `Score: ${currentScore}`;
    }

    if (bulletIndex <= 15) {
      clearInterval(bulletId);
      bullet.classList.remove("bullet");
    }
  }

  bulletId = setInterval(moveBullet, 100);
}

shooting = setInterval(shoot, 500);
//UPDATE-------------------------------
const gameUpdate = setInterval(gameOver, 500);

function gameOver() {
  function clear() {
    clearInterval(alienIndex);
    clearInterval(shooting);
    clearInterval(gameUpdate);
    playerControls = document.removeEventListener("keydown", movePlayer);
    document.removeEventListener("keydown", shoot);
  }

  if (killedAliens.length === aliens.length) {
    clear();
    gameOverMessage.innerHTML = "You Won";
  }

  aliens.map((alienCurrentTile) => {
    if (alienCurrentTile >= 195) {
      clear();
      gameOverMessage.innerHTML = "Game Over";
    }
  });

  if (gridTiles[playerPosition].classList.contains("player" && "aliens")) {
    clear();
    gameOverMessage.innerHTML = "Game Over";
  }
}
