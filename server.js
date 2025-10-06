// ✅ استيراد المكتبات
const express = require('express');
const helmet = require('helmet');
const compression = require('compression');
const rateLimit = require('express-rate-limit');
const cors = require('cors');
const path = require('path');

const app = express();

// 🧱 أمان أساسي
app.use(helmet());             // حماية الهيدرز
app.use(cors());               // السماح بالوصول الآمن
app.use(compression());        // ضغط البيانات لزيادة السرعة

// 🛡️ تحديد معدل الطلبات لمنع الهجمات
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // كل دقيقة
  max: 100,                 // أقصى عدد طلبات في الدقيقة
  message: '❌ تم تجاوز الحد المسموح للطلبات. الرجاء الانتظار قليلاً.'
});
app.use(limiter);

// 🌐 عرض ملفات الموقع (HTML / CSS / JS)
app.use(express.static(path.join(__dirname, 'public')));

// 🔗 فتح الروابط الخارجية بأمان
app.get('/go', (req, res) => {
  const target = req.query.url;
  if (!target) return res.status(400).send('❌ لم يتم إدخال رابط');
  try {
    const safeUrl = new URL(target);
    res.redirect(safeUrl.toString());
  } catch {
    res.status(400).send('❌ رابط غير صالح');
  }
});

// 🚀 تشغيل السيرفر
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ السيرفر يعمل على المنفذ ${PORT}`));
