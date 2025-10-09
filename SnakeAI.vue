<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white">
    <h1 class="text-3xl font-bold mb-4 flex items-center gap-2">
      ⚔️ الزعيم Snake AI ⚔️
    </h1>

    <div class="bg-gray-900 rounded-2xl p-4 shadow-2xl">
      <canvas ref="canvas" width="400" height="400" class="rounded-lg border border-gray-700"></canvas>

      <div class="flex justify-between mt-4 space-x-2">
        <button @click="toggleGame" class="btn">{{ running ? '⏸️ توقف' : '▶️ تشغيل' }}</button>
        <button @click="restartGame" class="btn">🔄 إعادة</button>
        <button @click="increaseSpeed" class="btn">⚡ أسرع</button>
        <button @click="decreaseSpeed" class="btn">🐢 أبطأ</button>
      </div>

      <div class="text-center mt-3">
        <p>🎯 النتيجة: <span class="font-bold">{{ score }}</span></p>
        <p>🚀 السرعة: <span class="font-bold">{{ speed }}</span></p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const canvas = ref(null);
const ctx = ref(null);
const running = ref(false);
const snake = ref([{ x: 10, y: 10 }]);
const food = ref({ x: 15, y: 15 });
const direction = ref({ x: 1, y: 0 });
const score = ref(0);
const speed = ref(150);
let gameLoop = null;

// توليد موقع عشوائي للطعام
const randomPosition = () => Math.floor(Math.random() * 20);

// ذكاء بسيط: يحاول التقرب من الطعام
function autoMove() {
  const head = snake.value[0];
  if (food.value.x > head.x) direction.value = { x: 1, y: 0 };
  else if (food.value.x < head.x) direction.value = { x: -1, y: 0 };
  else if (food.value.y > head.y) direction.value = { x: 0, y: 1 };
  else if (food.value.y < head.y) direction.value = { x: 0, y: -1 };
}

// تحديث اللعبة
function update() {
  autoMove();
  const newHead = {
    x: snake.value[0].x + direction.value.x,
    y: snake.value[0].y + direction.value.y,
  };

  // الاصطدام بالجدار أو بنفسه
  if (
    newHead.x < 0 ||
    newHead.y < 0 ||
    newHead.x >= 20 ||
    newHead.y >= 20 ||
    snake.value.some((s) => s.x === newHead.x && s.y === newHead.y)
  ) {
    running.value = false;
    clearInterval(gameLoop);
    alert(`💀 انتهت اللعبة! النتيجة: ${score.value}`);
    return;
  }

  snake.value.unshift(newHead);

  if (newHead.x === food.value.x && newHead.y === food.value.y) {
    score.value++;
    food.value = { x: randomPosition(), y: randomPosition() };
  } else {
    snake.value.pop();
  }

  draw();
}

// رسم اللعبة
function draw() {
  ctx.value.fillStyle = "#111";
  ctx.value.fillRect(0, 0, 400, 400);

  // الطعام
  ctx.value.fillStyle = "#ff4747";
  ctx.value.fillRect(food.value.x * 20, food.value.y * 20, 20, 20);

  // الثعبان
  ctx.value.fillStyle = "#00ff7f";
  snake.value.forEach((part) => {
    ctx.value.fillRect(part.x * 20, part.y * 20, 18, 18);
  });
}

function toggleGame() {
  if (running.value) {
    running.value = false;
    clearInterval(gameLoop);
  } else {
    running.value = true;
    gameLoop = setInterval(update, speed.value);
  }
}

function restartGame() {
  snake.value = [{ x: 10, y: 10 }];
  direction.value = { x: 1, y: 0 };
  score.value = 0;
  food.value = { x: randomPosition(), y: randomPosition() };
  toggleGame();
}

function increaseSpeed() {
  if (speed.value > 50) speed.value -= 20;
  if (running.value) {
    clearInterval(gameLoop);
    gameLoop = setInterval(update, speed.value);
  }
}

function decreaseSpeed() {
  if (speed.value < 400) speed.value += 20;
  if (running.value) {
    clearInterval(gameLoop);
    gameLoop = setInterval(update, speed.value);
  }
}

onMounted(() => {
  ctx.value = canvas.value.getContext("2d");
  draw();
});

onUnmounted(() => clearInterval(gameLoop));
</script>

<style scoped>
.btn {
  @apply bg-gray-800 hover:bg-gray-700 text-white font-semibold px-3 py-1 rounded-lg transition;
}
canvas {
  image-rendering: pixelated;
}
</style>
