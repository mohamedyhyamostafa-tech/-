const http = require("http");

const html = `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>🐍 Alzaeem Tech AI - Snake Game</title>
<style>
body {
  background: radial-gradient(circle at center, #0a0a0a, #000);
  color: #00ffcc;
  font-family: 'Poppins', sans-serif;
  text-align: center;
  margin: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
}
canvas {
  background: #111;
  box-shadow: 0 0 25px #00ffcc;
  border-radius: 12px;
}
h1 {
  color: #00ffff;
  text-shadow: 0 0 20px #00ffff;
  font-size: 2em;
}
.controls {
  margin-top: 20px;
}
button {
  background: #00ffcc;
  color: #000;
  border: none;
  padding: 10px 20px;
  margin: 6px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  transition: 0.3s;
}
button:hover {
  background: #00ffaa;
}
#score {
  margin: 10px;
  font-size: 1.3em;
}
</style>
</head>
<body>
  <h1>🤖 Alzaeem Tech AI Snake Game</h1>
  <canvas id="game" width="400" height="400"></canvas>
  <div id="score">Score: 0</div>
  <div class="controls">
    <button onclick="changeDir('UP')">⬆️</button><br>
    <button onclick="changeDir('LEFT')">⬅️</button>
    <button onclick="changeDir('DOWN')">⬇️</button>
    <button onclick="changeDir('RIGHT')">➡️</button><br>
    <button onclick="startGame()">🚀 Start</button>
  </div>

<script>
let canvas = document.getElementById('game');
let ctx = canvas.getContext('2d');
let box = 20;
let snake = [{x: 9 * box, y: 10 * box}];
let food = {x: Math.floor(Math.random()*19+1)*box, y: Math.floor(Math.random()*19+1)*box};
let score = 0;
let d;
let game;
let speed = 150;

document.addEventListener('keydown', dir);

function dir(event){
    if(event.keyCode == 37 && d != "RIGHT") d = "LEFT";
    else if(event.keyCode == 38 && d != "DOWN") d = "UP";
    else if(event.keyCode == 39 && d != "LEFT") d = "RIGHT";
    else if(event.keyCode == 40 && d != "UP") d = "DOWN";
}

function changeDir(direction){
    if(direction == "LEFT" && d != "RIGHT") d = "LEFT";
    else if(direction == "UP" && d != "DOWN") d = "UP";
    else if(direction == "RIGHT" && d != "LEFT") d = "RIGHT";
    else if(direction == "DOWN" && d != "UP") d = "DOWN";
}

function draw(){
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, 400, 400);

    for(let i = 0; i < snake.length; i++){
        ctx.fillStyle = (i == 0) ? "#00ffcc" : "#00ffaa";
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
        ctx.strokeStyle = "#000";
        ctx.strokeRect(snake[i].x, snake[i].y, box, box);
    }

    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, box, box);

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if(d == "LEFT") snakeX -= box;
    if(d == "UP") snakeY -= box;
    if(d == "RIGHT") snakeX += box;
    if(d == "DOWN") snakeY += box;

    if(snakeX == food.x && snakeY == food.y){
        score++;
        document.getElementById('score').innerText = "Score: " + score;
        food = {x: Math.floor(Math.random()*19+1)*box, y: Math.floor(Math.random()*19+1)*box};
    } else {
        snake.pop();
    }

    let newHead = {x: snakeX, y: snakeY};

    if(snakeX < 0 || snakeY < 0 || snakeX >= 400 || snakeY >= 400 || collision(newHead, snake)){
        clearInterval(game);
        alert('Game Over! Score: ' + score);
        return;
    }

    snake.unshift(newHead);
}

function collision(head, array){
    for(let i = 0; i < array.length; i++){
        if(head.x == array[i].x && head.y == array[i].y){
            return true;
        }
    }
    return false;
}

function startGame(){
    clearInterval(game);
    snake = [{x: 9 * box, y: 10 * box}];
    d = undefined;
    score = 0;
    document.getElementById('score').innerText = "Score: 0";
    game = setInterval(draw, speed);
}
</script>
</body>
</html>
`;

http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/html" });
  res.end(html);
}).listen(3000, () => {
  console.log("✅ Snake Game running at: http://localhost:3000");
});
