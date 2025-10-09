export default function handler(req, res) {
  res.setHeader("Content-Type", "text/html");
  res.send(`
<!DOCTYPE html>
<html lang="ar">
<head>
<meta charset="UTF-8">
<title>🐍 لعبة الزعيم</title>
<style>
body {
  margin: 0; background: radial-gradient(circle, #111, #000);
  color: #0f0; font-family: monospace; text-align: center;
}
canvas { background: #000; margin-top: 20px; border: 2px solid #0f0; }
button { background: #0f0; color: #000; border: none; padding: 10px 20px; margin: 5px; cursor: pointer; border-radius: 10px; font-weight: bold; }
#logo { font-size: 24px; color: #0f0; margin-top: 10px; text-shadow: 0 0 10px #0f0; }
</style>
</head>
<body>
  <div id="logo">⚔️ الزعيم ⚔️</div>
  <canvas id="game" width="400" height="400"></canvas><br>
  <button onclick="startGame()">ابدأ</button>
  <button onclick="pauseGame()">توقف</button>
  <button onclick="speedUp()">سرّع</button>
  <div id="score">النتيجة: 0</div>
<script>
const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');
let snake = [{x:10,y:10}];
let food = {x:5,y:5};
let dx=1, dy=0;
let score=0;
let speed=150;
let running=false;

function draw() {
  ctx.fillStyle='black'; ctx.fillRect(0,0,400,400);
  ctx.fillStyle='lime';
  snake.forEach(p => ctx.fillRect(p.x*20,p.y*20,18,18));
  ctx.fillStyle='red'; ctx.fillRect(food.x*20,food.y*20,18,18);
  document.getElementById('score').innerText='النتيجة: '+score;
}

function move() {
  const head = {x:snake[0].x+dx,y:snake[0].y+dy};
  snake.unshift(head);
  if (head.x===food.x && head.y===food.y) {
    score++; food={x:Math.floor(Math.random()*20),y:Math.floor(Math.random()*20)};
  } else {
    snake.pop();
  }
  if (head.x<0||head.x>19||head.y<0||head.y>19||snake.slice(1).some(p=>p.x===head.x&&p.y===head.y)) {
    running=false; alert('انتهت اللعبة! النتيجة: '+score); score=0; snake=[{x:10,y:10}];
  }
  draw();
}

let interval;
function startGame() {
  if (!running) {
    running=true;
    interval=setInterval(move,speed);
  }
}
function pauseGame() {
  running=false;
  clearInterval(interval);
}
function speedUp() {
  if (speed>50) speed-=20;
  pauseGame();
  startGame();
}
document.addEventListener('keydown',e=>{
  if(e.key==='ArrowUp'&&dy===0){dx=0;dy=-1;}
  if(e.key==='ArrowDown'&&dy===0){dx=0;dy=1;}
  if(e.key==='ArrowLeft'&&dx===0){dx=-1;dy=0;}
  if(e.key==='ArrowRight'&&dx===0){dx=1;dy=0;}
});
draw();
</script>
</body>
</html>
`);
}
