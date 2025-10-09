<!DOCTYPE html>
<html lang="ar">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Vue.js على Vercel</title>
  <!-- استدعاء Vue 3 عبر CDN -->
  <script src="https://unpkg.com/vue@3/dist/vue.global.prod.js"></script>
  <style>
    body { font-family: Arial, sans-serif; text-align: center; margin-top: 50px; }
    button { padding: 10px 20px; font-size: 16px; cursor: pointer; }
  </style>
</head>
<body>
  <div id="app">
    <h1>{{ message }}</h1>
    <input v-model="message" placeholder="اكتب هنا" />
    <button @click="resetMessage">إعادة ضبط</button>
  </div>

  <script>
    const { createApp } = Vue;

    createApp({
      data() {
        return {
          message: "مرحباً بك في Vue.js على Vercel!"
        }
      },
      methods: {
        resetMessage() {
          this.message = "تم إعادة ضبط الرسالة 😎";
        }
      }
    }).mount('#app');
  </script>
</body>
</html>
