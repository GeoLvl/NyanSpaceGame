const player = document.querySelector(".player");
const square = document.querySelector("#background");
const startPanel = document.querySelector(".startpanel");
const score = document.querySelector(".score");
const scoreUp = document.querySelector("#scoreUp");
const phase = document.querySelector(".phase");
// const phaseUp = document.querySelector("#phaseUp");
const wrap = document.querySelector(".wrap");
let number = 5;
const playerWidth = 100; //px
const playerHeight = 50; //px
let playerX;
let playerY;
let currentTime = 0;

let screenWidth =
  window.innerWidth ||
  document.documentElement.clientWidth ||
  document.body.clientWidth;
let screenHeight =
  window.innerHeight ||
  document.documentElement.clientHeight ||
  document.body.clientHeight;

//      START GAME

function startGame() {
  playerX = player.getBoundingClientRect().x;
  playerY = player.getBoundingClientRect().y;

  //      DISPLAY MANIPULATION
  console.log("start");
  startPanel.style.display = "none";
  player.style.display = "block";
  phase.style.display = "none;";
  score.style.display = "block";
  wrap.style.display = "block";

  player.style.width = playerWidth + "px";
  player.style.height = playerHeight + "px";

  //     MOUSE MOUVEMENT
  document.addEventListener("mousemove", (e) => {
    let x = e.pageX;
    let y = e.pageY;
    player.style.left = x - 25 + "px";
    player.style.top = y - 25 + "px";
  });

  //     OBSTACLE
  asteroid();

  //     SCORE TIMER
  timer();
}

//     SCORE TIMER
const timer = function scoreUpdate() {
  let count = 0;
  setInterval(() => {
    count++;
    scoreUp.innerHTML = count;
  }, 1000);
};

//     OBSTACLE
function asteroid() {
  console.log();
  const obstacleArr = [];

  setInterval(() => {
    const playerX = parseInt(player.style.left.replace("px", ""));
    const playerY = parseInt(player.style.top.replace("px", ""));

    currentTime++;

    if (currentTime % 12 === 0) {
      const obstacle = new Obstacle();
      obstacle.create();
      obstacleArr.push(obstacle);
    }

    obstacleArr.forEach((obstacle) => {
      obstacle.moveLeft();
      obstacle.draw();
      if (obstacle.x === -10) {
        // obstacle.remove();
        // obstacle.shift();
      }
    });

    obstacleArr.forEach((obstacle) => {
      console.log(player.style);
      console.log(playerX, playerY, playerWidth, playerHeight);
      console.log(obstacle);

      if (
        playerX < obstacle.x + obstacle.width &&
        playerX + playerWidth > obstacle.x &&
        playerY < obstacle.y + obstacle.height &&
        playerY + playerHeight > obstacle.y
      ) {
        alert("game over");
      }

      //   if (obstacle.x < 50) {
      //     if (playerX || playerY || playerWidth || playerHeight || obstacle) {
      //       console.log(playerX, playerY, playerWidth, playerHeight);
      //       console.log(obstacle);
      //     }
      //   }

      // if (x < obstacle.x + obstacle.width && x + obstacle.width > obstacle.x && y < obstacle.y + obstacle.height && player.height + y > obstacle.y){
      // alert('game over');
      // };
    });
  }, 20);
}

//     CLASS OBSTACLES
class Component {
  constructor() {
    this.domElm = null;
  }
  create() {
    this.domElm = document.createElement("div");
    this.domElm.className = "asteroid";
    square.appendChild(this.domElm);
  }
  draw() {
    this.domElm.style.width = this.width + "px";
    this.domElm.style.height = this.height + "px";
    this.domElm.style.left = this.x + "px";
    this.domElm.style.top = this.y + "px";
  }
  remove() {
    square.removeChild(this.domElm);
  }
}

class Obstacle extends Component {
  constructor() {
    super();
    this.width = Math.floor(Math.random() * (100 - 2 + 1) + 50);
    this.height = Math.floor(Math.random() * (100 - 2 + 1) + 50);

    this.x = screenWidth +10 ;
    this.y = Math.floor(Math.random() * (screenHeight));
  }
  moveLeft() {
    this.x -= screenWidth / 95;
  }
}
