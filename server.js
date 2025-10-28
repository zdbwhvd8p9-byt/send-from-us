const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const nodemailer = require('nodemailer');
const path = require('path');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Configure email transporter - Using Gmail SMTP
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false
  }
});

// Test email connection
transporter.verify((error, success) => {
  if (error) {
    console.log('Email service error:', error);
  } else {
    console.log('Email service ready');
  }
});

// API endpoint to handle transfer requests
app.post('/api/submit-transfer', async (req, res) => {
  try {
    const {
      fromCountry,
      toCountry,
      amount,
      purpose,
      commercialLink,
      productDescription,
      phoneNumber,
      email,
      language,
    } = req.body;

    // Validate required fields
    if (!fromCountry || !toCountry || !amount || !phoneNumber || !email) {
      return res.status(400).json({
        success: false,
        message: language === 'ar' ? 'يرجى ملء جميع الحقول المطلوبة' : 'Please fill all required fields',
      });
    }

    // Prepare email content
    const emailSubject = `طلب تحويل أموال جديد - New Transfer Request`;
    const emailBody = `
      <h2>طلب تحويل أموال جديد</h2>
      <p><strong>الدولة المرسل منها:</strong> ${fromCountry}</p>
      <p><strong>الدولة المرسل إليها:</strong> ${toCountry}</p>
      <p><strong>المبلغ:</strong> ${amount}</p>
      <p><strong>الغرض:</strong> ${purpose}</p>
      <p><strong>رابط الصفحة التجارية:</strong> ${commercialLink}</p>
      <p><strong>وصف المنتج:</strong> ${productDescription}</p>
      <p><strong>رقم التواصل:</strong> ${phoneNumber}</p>
      <p><strong>البريد الإلكتروني:</strong> ${email}</p>
      <hr>
      <h2>New Transfer Request</h2>
      <p><strong>From Country:</strong> ${fromCountry}</p>
      <p><strong>To Country:</strong> ${toCountry}</p>
      <p><strong>Amount:</strong> ${amount}</p>
      <p><strong>Purpose:</strong> ${purpose}</p>
      <p><strong>Commercial Link:</strong> ${commercialLink}</p>
      <p><strong>Product Description:</strong> ${productDescription}</p>
      <p><strong>Phone Number:</strong> ${phoneNumber}</p>
      <p><strong>Email:</strong> ${email}</p>
    `;

    // Send email to admin
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.ADMIN_EMAIL,
      subject: emailSubject,
      html: emailBody,
    });

    // Send confirmation email to user
    const confirmationSubject = language === 'ar' 
      ? 'تم استقبال طلبك بنجاح'
      : 'Your request has been received';
    
    const confirmationBody = language === 'ar'
      ? `<p>شكراً لك، تم استقبال طلبك بنجاح. سيتم التواصل معك خلال 24 ساعة.</p>`
      : `<p>Thank you, your request has been received successfully. We will contact you within 24 hours.</p>`;

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: confirmationSubject,
      html: confirmationBody,
    });

    res.json({
      success: true,
      message: language === 'ar'
        ? 'تم إرسال طلبك بنجاح، سيتم التواصل معك خلال 24 ساعة'
        : 'Your request has been sent successfully. We will contact you within 24 hours.',
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({
      success: false,
      message: 'حدث خطأ في الخادم / Server error',
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

