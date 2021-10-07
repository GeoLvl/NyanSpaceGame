const player = document.querySelector(".player");
const square = document.querySelector("#background");
const startPanel = document.querySelector(".startpanel");
const score = document.querySelector(".score");
const scoreUp = document.querySelector("#scoreUp");
const phase = document.querySelector(".phase");
// const phaseUp = document.querySelector("#phaseUp");
const wrap = document.querySelector(".wrap");
let number = 5;
let playerX;
let playerY;

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
    const playerX = player.style.left;
    const playerY = player.style.top;
    const playerWidth = player.style.width;
    const playerHeight = player.style.height;

    const obstacle = new Obstacle();
    obstacle.create();
    obstacleArr.push(obstacle);

    obstacleArr.forEach((obstacle) => {
      obstacle.moveLeft();
      obstacle.draw();
      if (obstacle.x === -10) {
        // obstacle.remove();
        // obstacle.shift();
      }
    });

    obstacleArr.forEach((obstacle) => {
      // console.log(x, y)
      console.log(obstacle);
      // console.log(player);

      if (
        playerX < obstacle.x + obstacle.width &&
        playerX + playerWidth > obstacle.x &&
        playerY < obstacle.y + obstacle.height &&
        playerY + playerHeight > obstacle.y
      ) {
        alert("game over");
      }

      // if (x < obstacle.x + obstacle.width && x + obstacle.width > obstacle.x && y < obstacle.y + obstacle.height && player.height + y > obstacle.y){
      // alert('game over');
      // };
    });
  }, 1000);
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
    this.domElm.style.width = this.width + "%";
    this.domElm.style.height = this.height + "%";
    this.domElm.style.left = this.x + "vw";
    this.domElm.style.top = this.y + "vh";
  }
  remove() {
    square.removeChild(this.domElm);
  }
}

class Obstacle extends Component {
  constructor() {
    super();
    this.width = Math.floor(Math.random() * (5 - 2 + 1) + 5);
    this.height = Math.floor(Math.random() * (5 - 2 + 1) + 5);

    this.x = 105 - this.width;
    this.y = Math.floor(Math.random() * (100 - this.height + 1));
  }
  moveLeft() {
    this.x -= 5;
  }
}
