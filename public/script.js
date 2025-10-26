// Language translations
const translations = {
    ar: {
        heroTitle: 'Send from us - أرسل منا بأمان',
        heroSubtitle: 'نقل أموالك بسهولة وأمان من ليبيا إلى العالم',
        formTitle: 'نموذج طلب تحويل الأموال',
        fromCountryLabel: 'الدولة المرسل منها',
        toCountryLabel: 'الدولة المرسل إليها',
        amountLabel: 'المبلغ',
        purposeLabel: 'الغرض من التحويل',
        commercialLinkLabel: 'رابط صفحتك التجارية',
        productDescriptionLabel: 'وصف المنتج أو العملية',
        phoneNumberLabel: 'رقم التواصل (واتساب أو هاتف)',
        emailLabel: 'البريد الإلكتروني',
        submitBtn: 'إرسال العملية',
        successText: 'تم إرسال طلبك بنجاح، سيتم التواصل معك خلال 24 ساعة.',
        errorText: 'حدث خطأ، يرجى المحاولة مرة أخرى.',
        footerText: 'جميع الحقوق محفوظة © 2024 Send from us',
        fromCountryPlaceholder: 'مثال: ليبيا',
        toCountryPlaceholder: 'مثال: الصين',
        amountPlaceholder: 'أدخل المبلغ',
        purposePlaceholder: 'مثال: شراء منتجات',
        phoneNumberPlaceholder: '+218...',
        productDescriptionPlaceholder: 'أدخل وصف تفصيلي للمنتج أو العملية',
    },
    en: {
        heroTitle: 'Send from us - Secure Money Transfer',
        heroSubtitle: 'Transfer your money easily and safely from Libya to the world',
        formTitle: 'Money Transfer Request Form',
        fromCountryLabel: 'From Country',
        toCountryLabel: 'To Country',
        amountLabel: 'Amount',
        purposeLabel: 'Purpose of Transfer',
        commercialLinkLabel: 'Your Commercial Page Link',
        productDescriptionLabel: 'Product or Transaction Description',
        phoneNumberLabel: 'Contact Number (WhatsApp or Phone)',
        emailLabel: 'Email Address',
        submitBtn: 'Submit Request',
        successText: 'Your request has been sent successfully. We will contact you within 24 hours.',
        errorText: 'An error occurred, please try again.',
        footerText: 'All rights reserved © 2024 Send from us',
        fromCountryPlaceholder: 'Example: Libya',
        toCountryPlaceholder: 'Example: China',
        amountPlaceholder: 'Enter the amount',
        purposePlaceholder: 'Example: Buy products',
        phoneNumberPlaceholder: '+218...',
        productDescriptionPlaceholder: 'Enter a detailed description of the product or transaction',
    }
};

let currentLanguage = 'ar';

// DOM Elements
const langArBtn = document.getElementById('langAr');
const langEnBtn = document.getElementById('langEn');
const transferForm = document.getElementById('transferForm');
const submitBtn = document.getElementById('submitBtn');
const successMessage = document.getElementById('successMessage');
const errorMessage = document.getElementById('errorMessage');

// Language switching
langArBtn.addEventListener('click', () => switchLanguage('ar'));
langEnBtn.addEventListener('click', () => switchLanguage('en'));

function switchLanguage(lang) {
    currentLanguage = lang;
    
    // Update active button
    if (lang === 'ar') {
        langArBtn.classList.add('active');
        langEnBtn.classList.remove('active');
        document.documentElement.lang = 'ar';
        document.documentElement.dir = 'rtl';
    } else {
        langEnBtn.classList.add('active');
        langArBtn.classList.remove('active');
        document.documentElement.lang = 'en';
        document.documentElement.dir = 'ltr';
    }
    
    // Update all text content
    updatePageText();
    
    // Save language preference
    localStorage.setItem('preferredLanguage', lang);
}

function updatePageText() {
    const t = translations[currentLanguage];
    
    document.getElementById('heroTitle').textContent = t.heroTitle;
    document.getElementById('heroSubtitle').textContent = t.heroSubtitle;
    document.getElementById('formTitle').textContent = t.formTitle;
    document.getElementById('fromCountryLabel').textContent = t.fromCountryLabel;
    document.getElementById('toCountryLabel').textContent = t.toCountryLabel;
    document.getElementById('amountLabel').textContent = t.amountLabel;
    document.getElementById('purposeLabel').textContent = t.purposeLabel;
    document.getElementById('commercialLinkLabel').textContent = t.commercialLinkLabel;
    document.getElementById('productDescriptionLabel').textContent = t.productDescriptionLabel;
    document.getElementById('phoneNumberLabel').textContent = t.phoneNumberLabel;
    document.getElementById('emailLabel').textContent = t.emailLabel;
    document.getElementById('submitBtn').textContent = t.submitBtn;
    document.getElementById('successText').textContent = t.successText;
    document.getElementById('errorText').textContent = t.errorText;
    document.getElementById('footerText').textContent = t.footerText;
    
    // Update placeholders
    document.getElementById('fromCountry').placeholder = t.fromCountryPlaceholder;
    document.getElementById('toCountry').placeholder = t.toCountryPlaceholder;
    document.getElementById('amount').placeholder = t.amountPlaceholder;
    document.getElementById('purpose').placeholder = t.purposePlaceholder;
    document.getElementById('phoneNumber').placeholder = t.phoneNumberPlaceholder;
    document.getElementById('productDescription').placeholder = t.productDescriptionPlaceholder;
}

// Form submission
transferForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Hide previous messages
    successMessage.style.display = 'none';
    errorMessage.style.display = 'none';
    
    // Disable submit button
    submitBtn.disabled = true;
    submitBtn.classList.add('loading');
    
    // Collect form data
    const formData = {
        fromCountry: document.getElementById('fromCountry').value,
        toCountry: document.getElementById('toCountry').value,
        amount: document.getElementById('amount').value,
        purpose: document.getElementById('purpose').value,
        commercialLink: document.getElementById('commercialLink').value,
        productDescription: document.getElementById('productDescription').value,
        phoneNumber: document.getElementById('phoneNumber').value,
        email: document.getElementById('email').value,
        language: currentLanguage,
    };
    
    try {
        const response = await fetch('/api/submit-transfer', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });
        
        const data = await response.json();
        
        if (data.success) {
            // Show success message
            successMessage.style.display = 'block';
            
            // Reset form
            transferForm.reset();
            
            // Scroll to message
            successMessage.scrollIntoView({ behavior: 'smooth' });
        } else {
            // Show error message
            document.getElementById('errorText').textContent = data.message;
            errorMessage.style.display = 'block';
            errorMessage.scrollIntoView({ behavior: 'smooth' });
        }
    } catch (error) {
        console.error('Error:', error);
        errorMessage.style.display = 'block';
        errorMessage.scrollIntoView({ behavior: 'smooth' });
    } finally {
        // Re-enable submit button
        submitBtn.disabled = false;
        submitBtn.classList.remove('loading');
    }
}

// Initialize on page load
window.addEventListener('DOMContentLoaded', () => {
    // Load saved language preference
    const savedLanguage = localStorage.getItem('preferredLanguage') || 'ar';
    switchLanguage(savedLanguage);
});

