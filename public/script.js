// Language Management
const currentLanguage = localStorage.getItem('language') || 'ar';
let language = currentLanguage;

// Set initial language
document.documentElement.lang = language;
document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
updateLanguageButtons();

// Language Button Event Listeners
document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        language = this.dataset.lang;
        localStorage.setItem('language', language);
        document.documentElement.lang = language;
        document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
        updatePageContent();
        updateLanguageButtons();
    });
});

function updateLanguageButtons() {
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang === language);
    });
}

function updatePageContent() {
    document.querySelectorAll('[data-ar][data-en]').forEach(element => {
        const text = language === 'ar' ? element.dataset.ar : element.dataset.en;
        if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
            element.placeholder = text;
        } else {
            element.textContent = text;
        }
    });
}

// Initialize page content
updatePageContent();

// Form Submission
document.getElementById('transferForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const submitBtn = this.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.classList.add('loading');
    
    const formData = {
        fromCountry: 'Libya',
        toCountry: this.querySelector('[name="toCountry"]').value,
        amount: this.querySelector('[name="amount"]').value,
        purpose: this.querySelector('[name="purpose"]').value,
        commercialLink: this.querySelector('[name="commercialLink"]').value,
        productDescription: this.querySelector('[name="productDescription"]').value,
        phoneNumber: this.querySelector('[name="phoneNumber"]').value,
        email: this.querySelector('[name="email"]').value,
        language: language
    };
    
    try {
        const response = await fetch('/api/submit-transfer', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });
        
        const data = await response.json();
        
        if (data.success) {
            // Show success message
            const successMsg = document.getElementById('successMessage');
            successMsg.style.display = 'block';
            
            // Reset form
            this.reset();
            
            // Scroll to success message
            successMsg.scrollIntoView({ behavior: 'smooth' });
            
            // Hide success message after 5 seconds
            setTimeout(() => {
                successMsg.style.display = 'none';
            }, 5000);
        } else {
            alert(data.message || 'حدث خطأ / An error occurred');
        }
    } catch (error) {
        console.error('Error:', error);
        alert(language === 'ar' ? 'حدث خطأ في الاتصال' : 'Connection error');
    } finally {
        submitBtn.disabled = false;
        submitBtn.classList.remove('loading');
    }
});

// Currency Converter
const currencyRates = {
    USD: 4.8,
    EUR: 5.2,
    GBP: 6.0,
    CNY: 0.68,
    SAR: 1.28
};

const blackMarketMultiplier = 1.2; // 20% markup for black market

async function fetchExchangeRates() {
    try {
        const currency = document.getElementById('currencySelect').value;
        const response = await fetch(`https://api.exchangerate.host/latest?base=${currency}&symbols=LYD`);
        const data = await response.json();
        
        if (data.success) {
            const officialRate = data.rates.LYD;
            const localRate = officialRate * blackMarketMultiplier;
            
            updateConversionDisplay(officialRate, localRate);
            updateLastUpdate();
        }
    } catch (error) {
        console.error('Error fetching rates:', error);
        // Use fallback rates
        const currency = document.getElementById('currencySelect').value;
        const officialRate = currencyRates[currency] || 4.8;
        const localRate = officialRate * blackMarketMultiplier;
        updateConversionDisplay(officialRate, localRate);
    }
}

function updateConversionDisplay(officialRate, localRate) {
    const amount = parseFloat(document.getElementById('convertAmount').value) || 1;
    const manualRate = parseFloat(document.getElementById('manualRate').value);
    
    const finalLocalRate = manualRate || localRate;
    
    document.getElementById('officialRate').textContent = 
        `${(amount * officialRate).toFixed(2)} LYD`;
    document.getElementById('localRate').textContent = 
        `${(amount * finalLocalRate).toFixed(2)} LYD`;
}

function updateLastUpdate() {
    const now = new Date();
    const timeString = now.toLocaleTimeString(language === 'ar' ? 'ar-LY' : 'en-US');
    document.getElementById('lastUpdate').textContent = timeString;
}

// Event Listeners for Currency Converter
document.getElementById('currencySelect').addEventListener('change', fetchExchangeRates);
document.getElementById('convertAmount').addEventListener('input', () => {
    const officialRate = parseFloat(document.getElementById('officialRate').textContent);
    const localRate = parseFloat(document.getElementById('localRate').textContent);
    updateConversionDisplay(officialRate / parseFloat(document.getElementById('convertAmount').value || 1), 
                           localRate / parseFloat(document.getElementById('convertAmount').value || 1));
});

document.getElementById('manualRate').addEventListener('input', () => {
    const amount = parseFloat(document.getElementById('convertAmount').value) || 1;
    const manualRate = parseFloat(document.getElementById('manualRate').value);
    if (manualRate) {
        document.getElementById('localRate').textContent = 
            `${(amount * manualRate).toFixed(2)} LYD`;
    }
});

// Initialize currency converter
fetchExchangeRates();

// Auto-update rates every 5 minutes
setInterval(fetchExchangeRates, 5 * 60 * 1000);
