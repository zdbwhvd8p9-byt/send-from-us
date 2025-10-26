# منصة تحويل الأموال | Money Transfer Platform

منصة إلكترونية وسيط آمنة لتحويل الأموال بين التجار الليبيين والموردين في الخارج (الصين، أوروبا، وغيرها).

---

## 🎯 المميزات | Features

- ✅ نموذج طلب سهل وآمن | Easy and secure request form
- ✅ دعم لغتين (العربية والإنجليزية) | Bilingual support (Arabic & English)
- ✅ إرسال تلقائي للبريد الإلكتروني | Automatic email notifications
- ✅ تصميم احترافي وسريع | Professional and fast design
- ✅ واجهة مستخدم بسيطة | Simple user interface

---

## 🚀 البدء السريع | Quick Start

### المتطلبات | Requirements

- Node.js (v14 أو أعلى)
- npm أو yarn

### التثبيت | Installation

```bash
# استنساخ المشروع
git clone <repository-url>
cd money_transfer_platform

# تثبيت المكتبات
npm install

# نسخ ملف البيئة
cp .env.example .env
```

### الإعدادات | Configuration

قم بتعديل ملف `.env` وأضف بيانات بريدك الإلكتروني:

```env
PORT=3000
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
ADMIN_EMAIL=admin@example.com
```

**ملاحظة:** إذا كنت تستخدم Gmail، يجب عليك:
1. تفعيل المصادقة الثنائية
2. إنشاء كلمة مرور تطبيق خاصة

### التشغيل | Running

```bash
# تشغيل الخادم
npm start

# أو للتطوير
npm run dev
```

الموقع سيكون متاحاً على: `http://localhost:3000`

---

## 📋 آلية العمل | How It Works

1. **المستخدم يملأ النموذج** - يدخل بيانات التحويل والمنتج
2. **إرسال الطلب** - يتم إرسال البيانات إلى الخادم
3. **إرسال البريد** - يتلقى الإدارة البريد بجميع التفاصيل
4. **تأكيد للعميل** - يتلقى العميل رسالة تأكيد
5. **المراجعة والتنفيذ** - تقوم الإدارة بمراجعة الطلب وتنفيذه

---

## 📧 البيانات المرسلة | Submitted Data

عند إرسال الطلب، يتم إرسال البيانات التالية:

- الدولة المرسل منها
- الدولة المرسل إليها
- المبلغ
- الغرض من التحويل
- رابط الصفحة التجارية
- وصف المنتج
- رقم التواصل
- البريد الإلكتروني

---

## 🎨 التخصيص | Customization

### تغيير الألوان

عدّل متغيرات CSS في `public/styles.css`:

```css
:root {
    --primary-color: #0066cc;
    --secondary-color: #d4af37;
    /* ... */
}
```

### إضافة لغات جديدة

أضف الترجمات في `public/script.js`:

```javascript
const translations = {
    fr: {
        heroTitle: 'Plateforme de transfert d\'argent sécurisée',
        // ...
    }
};
```

---

## 📱 الاستجابة | Responsiveness

الموقع مصمم بشكل كامل للعمل على:
- الأجهزة المكتبية
- الأجهزة اللوحية
- الهواتف الذكية

---

## 🔒 الأمان | Security

- ✅ التحقق من صحة البيانات على الخادم
- ✅ استخدام HTTPS (عند النشر)
- ✅ حماية من CORS
- ✅ عدم تخزين كلمات المرور

---

## 📞 الدعم | Support

للمساعدة أو الإبلاغ عن مشاكل، يرجى التواصل عبر البريد الإلكتروني.

---

## 📄 الترخيص | License

ISC License

---

**تم التطوير بواسطة:** Manus AI Team
**آخر تحديث:** 2024

