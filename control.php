<?php
session_start();

// بيانات الدخول الثابتة (حساسة لحالة الأحرف)
const ADMIN_EMAIL = 'moh@gmail.com';
const ADMIN_PASS  = '0000';

// تسجيل خروج
if(isset($_GET['logout'])){
    session_destroy();
    header("Location: /control"); // إعادة توجيه إلى control بدون امتداد
    exit;
}

// معالجة تسجيل الدخول
$error = '';
if($_SERVER['REQUEST_METHOD']==='POST' && isset($_POST['login'])){
    $email = trim($_POST['email'] ?? '');
    $pass  = trim($_POST['password'] ?? '');
    if($email === ADMIN_EMAIL && $pass === ADMIN_PASS){
        $_SESSION['admin'] = $email;
        header("Location: /control"); // إعادة توجيه بعد تسجيل الدخول
        exit;
    } else {
        $error = "❌ البريد أو كلمة المرور غير صحيحة";
    }
}

// روابط لوحة التحكم
$links = [
    "https://alzaeem1.gt.tc/scan1",
    "https://alzaeem1.gt.tc/scan",
    "https://alzaeem1.gt.tc/str",
    "https://alzaeem1.gt.tc/mm",
    "https://alzaeem1.gt.tc/admin",
    "https://alzaeem1.gt.tc/file1",
    "https://alzaeem1.gt.tc/scan1"
];
$icons = ["fa-qrcode","fa-camera","fa-file-alt","fa-users","fa-user-cog","fa-file","fa-rocket"];
?>
<!DOCTYPE html>
<html lang="ar">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>⚔️لوحة تحكم الزعيم⚔️</title>
<link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet">
<style>
body {
  margin:0;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background: linear-gradient(135deg,#0f0c29,#302b63,#24243e);
  color: #fff;
}
header {
  display:flex;
  align-items:center;
  justify-content:space-between;
  padding:20px 40px;
  background: rgba(0,0,0,0.5);
  backdrop-filter: blur(8px);
}
header h1 {
  font-size:2em;
  letter-spacing:2px;
  display:flex;
  align-items:center;
}
header h1 i {
  margin-right:10px;
  color:#ffdd00;
}
.container {
  max-width:1200px;
  margin:40px auto;
  display:grid;
  grid-template-columns: repeat(auto-fit,minmax(200px,1fr));
  gap:30px;
  padding:0 20px;
}
.card {
  background: rgba(255,255,255,0.05);
  border:2px solid #ffdd00;
  border-radius:16px;
  text-align:center;
  padding:30px 20px;
  transition: all 0.3s ease;
  cursor:pointer;
  box-shadow:0 0 20px rgba(255,221,0,0.3);
  text-decoration:none;
  color:#fff;
}
.card:hover {
  background:#ffdd00;
  color:#000;
  transform:translateY(-10px) scale(1.05);
  box-shadow:0 0 30px rgba(255,221,0,0.7);
}
.card i {
  font-size:3em;
  margin-bottom:15px;
}
.card p {
  font-size:1.1em;
  font-weight:bold;
  margin:0;
}
footer {
  text-align:center;
  padding:20px;
  color:#aaa;
  font-size:0.9em;
}
.login-box {
  max-width:400px;
  margin:80px auto;
  padding:30px;
  background: rgba(0,0,0,0.6);
  border-radius:12px;
  text-align:center;
}
.login-box input, .login-box button {
  width:100%;
  padding:12px;
  margin:8px 0;
  border-radius:8px;
  border:0;
}
.login-box input { background:#111; color:#fff; }
.login-box button { background:#ffdd00; color:#000; font-weight:700; cursor:pointer; }
.error { color:#ff7777; margin-top:10px; }
.top-links{
  display:flex; gap:15px; justify-content:center; flex-wrap:wrap; margin-top:20px;
}
.top-links a{
  background: rgba(255,255,255,0.05);
  padding:12px 18px;
  border-radius:12px;
  text-decoration:none;
  display:flex;
  align-items:center;
  gap:8px;
  border:2px solid #ffdd00;
  color:#fff;
  font-weight:700;
  transition:0.3s;
}
.top-links a:hover{
  background:#ffdd00;
  color:#000;
}
</style>
</head>
<body>

<?php if(!isset($_SESSION['admin'])): ?>
<div class="login-box">
  <h1><i class="fas fa-shield-alt"></i> ⚔️Alzaeem1TC⚔️</h1>
  <form method="post">
    <input type="email" name="email" placeholder="البريد الإلكتروني" required autofocus>
    <input type="password" name="password" placeholder="كلمة المرور" required>
    <button name="login">دخول</button>
  </form>
  <?php if($error): ?><div class="error"><?php echo htmlspecialchars($error); ?></div><?php endif; ?>
</div>
<?php else: ?>
<header>
  <h1><i class="fas fa-shield-alt"></i> ⚔️Alzaeem1TC⚔️</h1>
  <a href="/control?logout" style="color:#ffdd00;text-decoration:none;font-weight:bold;">🚪 خروج</a>
</header>

<div class="top-links">
<?php
foreach($links as $i => $link){
    $name = htmlspecialchars(basename($link));
    $icon = $icons[$i] ?? "fa-link";
    echo '<a href="'.$link.'"><i class="fas '.$icon.'"></i>'.$name.'</a>';
}
?>
</div>

<footer>
  لوحة تحكم الزعيم | جميع الحقوق محفوظة © سيفين مقاطعين
</footer>
<?php endif; ?>

</body>
</html>
