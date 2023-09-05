var inputDir = { x: 0, y: 0 };
const foodsound = new Audio("music/food.mp3");
const movesound = new Audio("music/move.mp3");
const gameoversound = new Audio("music/gameover.mp3");
const musicsound = new Audio("music/music.mp3");
var board = document.getElementById("board");
var hiscoreBox = document.getElementById("HighscoreBox");
var decrip = document.getElementById("description");
let speed = 5;
let score = 0;
let lastpaintime = 0;
var snakearr = [{ x: 13, y: 9 }];
food = { x: 5, y: 9 };

function main(ctime) {
  window.requestAnimationFrame(main);
  // console.log(ctime);
  if ((ctime - lastpaintime) / 1000 < 1 / speed) {
    return;
  }
  lastpaintime = ctime;
  gameengine();
}

function isCollide(snake) {
  //if snake bump into itself
  for (let i = 1; i < snakearr.length; i++) {
    if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
      return true;
    }
  }
  //if it collides with walls
  if (
    snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y <= 0) {
    return true;
  }
  return false;
}

function gameengine() {
  //update snake and food
  if (isCollide(snakearr)) {
    gameoversound.play();
    musicsound.pause();
    inputDir = { x: 0, y: 0 };
    alert("Game over! Press any key to play again! Your score is: "+score);
    score = 0;
    snakearr = [{ x: 13, y: 15 }];
    musicsound.play();
    }
    
  //if food eaten: score updation and regeneration of food
  if (snakearr[0].y === food.y && snakearr[0].x === food.x) {
    foodsound.play();
    score += 1;
    if (score > hiscoreval) {
      hiscoreval = score;
      localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
      hiscoreBox.innerHTML = "High Score: " + hiscoreval;
    }
    scoreBox.innerHTML = "Score: " + score;
    snakearr.unshift({
      x: snakearr[0].x + inputDir.x,
      y: snakearr[0].y + inputDir.y,
    });
      
    let a = 2;
    let b = 16;
    food = {
      x: Math.round(a + (b - a) * Math.random()),
      y: Math.round(a + (b - a) * Math.random()),
    };
  }

  for (let i = snakearr.length - 2; i >= 0; i--) {
    snakearr[i + 1] = { ...snakearr[i] };
  }
  snakearr[0].x += inputDir.x;
  snakearr[0].y += inputDir.y;

  //display snake
  board.innerHTML = "";
  snakearr.forEach((e, index) => {
    var snakeElement = document.createElement("div");
    snakeElement.style.gridRowStart = e.y;
    snakeElement.style.gridColumnStart = e.x;

    if (index === 0) {
      snakeElement.classList.add("head");
    } else {
      snakeElement.classList.add("snake");
    }
    board.appendChild(snakeElement);
  });
    
  //display food
  var foodElement = document.createElement("div");
  foodElement.style.gridRowStart = food.y;
  foodElement.style.gridColumnStart = food.x;
  foodElement.classList.add("food");
  board.appendChild(foodElement);
}

//high score
musicsound.play();
let hiscore = localStorage.getItem("hiscore");
if (hiscore === null) {
  hiscoreval = 0;
    localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
}
else {
  hiscoreval = JSON.parse(hiscore);
  hiscoreBox.innerHTML = "High Score: " + hiscore;
}

//baar baar repeat hoga
window.requestAnimationFrame(main);
window.addEventListener("keydown", (e) => {
  inputDir = { x: 0, y: 0 };
    movesound.play();
    decrip.innerHTML=" " ;
  switch (e.key) {
    case "ArrowUp":
      console.log("arrowup");
      inputDir.x = 0;
      inputDir.y = -1;
      break;

    case "ArrowDown":
      console.log("arrowdown");
      inputDir.x = 0;
      inputDir.y = 1;
      break;

    case "ArrowLeft":
      console.log("arrowleft");
      inputDir.x = -1;
      inputDir.y = 0;
      break;

    case "ArrowRight":
      console.log("arrowright");
      inputDir.x = 1;
      inputDir.y = 0;
      break;

    default:
      break;
  }
});
