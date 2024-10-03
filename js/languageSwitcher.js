const supportedLanguages = ['en', 'fr', 'es', 'ar'];
const rtlLanguages = ['ar'];

function loadLanguageData(lang) {
    fetch(`languages/${lang}.json`)
        .then(response => response.json())
        .then(data => {
            document.getElementById('navHome').textContent = data.navHome;
            document.getElementById('navAbout').textContent = data.navAbout;
            document.getElementById('navContact').textContent = data.navContact;
            document.getElementById('mainHeading').textContent = data.mainHeading;
            document.getElementById('mainDescription').textContent = data.mainDescription;
        });
}

function saveUserLanguage(lang) {
    localStorage.setItem('preferredLanguage', lang);
}

function setDirection(lang) {
    if (rtlLanguages.includes(lang)) {
        document.body.setAttribute('dir', 'rtl');
    } else {
        document.body.removeAttribute('dir');
    }
}

function initializePage() {
    const savedLanguage = localStorage.getItem('preferredLanguage') || 'en';
    document.getElementById('langSelector').value = savedLanguage;
    loadLanguageData(savedLanguage);
    setDirection(savedLanguage);
}

document.getElementById('langSelector').addEventListener('change', function() {
    const selectedLanguage = this.value;
    loadLanguageData(selectedLanguage);
    saveUserLanguage(selectedLanguage);
    setDirection(selectedLanguage);
});

document.getElementById('year').textContent = new Date().getFullYear();
initializePage();
