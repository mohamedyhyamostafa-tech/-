// استدعاء المكتبات الأساسية
import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// إعداد المجلد الذي يحتوي على ملفات الموقع
app.use(express.static(path.join(__dirname, "public")));

// الصفحة الرئيسية
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// تشغيل السيرفر المحلي
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`⚔️ Alzaeem server running on port ${PORT}`));
