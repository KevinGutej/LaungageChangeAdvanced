const supportedLanguages = ['en', 'fr', 'es', 'ar'];
const rtlLanguages = ['ar'];

const dateFormatOptions = {
    en: { day: '2-digit', month: '2-digit', year: 'numeric' },
    fr: { day: '2-digit', month: '2-digit', year: 'numeric' },
    es: { day: '2-digit', month: '2-digit', year: 'numeric' },
    ar: { day: '2-digit', month: '2-digit', year: 'numeric' }
};

function speakText(lang) {
    const speech = new SpeechSynthesisUtterance();
    speech.lang = lang;
    speech.text = `${document.getElementById('mainHeading').textContent}. ${document.getElementById('mainDescription').textContent}`;
    window.speechSynthesis.speak(speech);
}

function loadLanguageData(lang) {
    fetch(`languages/${lang}.json`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Failed to load language file for ${lang}`);
            }
            return response.json();
        })
        .then(data => {
            document.getElementById('navHome').textContent = data.navHome;
            document.getElementById('navAbout').textContent = data.navAbout;
            document.getElementById('navContact').textContent = data.navContact;
            document.getElementById('mainHeading').textContent = data.mainHeading;
            document.getElementById('mainDescription').textContent = data.mainDescription;

            const today = new Date();
            const formattedDate = today.toLocaleDateString(lang, dateFormatOptions[lang]);
            document.getElementById('formattedDate').textContent = formattedDate;
        })
        .catch(error => {
            console.error(error);
            alert(`Error: Unable to load language file for ${lang}`);
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

function applyTheme(theme) {
    if (theme === 'dark') {
        document.body.classList.add('dark-theme');
    } else {
        document.body.classList.remove('dark-theme');
    }
    localStorage.setItem('preferredTheme', theme);
}

function applyFontSize(size) {
    document.body.style.setProperty('--font-size', `${size}px`);
    localStorage.setItem('fontSize', size);
}

function initializePage() {
    const savedLanguage = localStorage.getItem('preferredLanguage') || 'en';
    const savedTheme = localStorage.getItem('preferredTheme') || 'light';
    const savedFontSize = localStorage.getItem('fontSize') || '16';

    document.getElementById('langSelector').value = savedLanguage;
    document.getElementById('themeToggle').checked = savedTheme === 'dark';
    document.getElementById('fontSize').value = savedFontSize;

    loadLanguageData(savedLanguage);
    setDirection(savedLanguage);
    applyTheme(savedTheme);
    applyFontSize(savedFontSize);
}

document.getElementById('langSelector').addEventListener('change', function () {
    const selectedLanguage = this.value;
    loadLanguageData(selectedLanguage);
    saveUserLanguage(selectedLanguage);
    setDirection(selectedLanguage);
});

document.getElementById('themeToggle').addEventListener('change', function () {
    const selectedTheme = this.checked ? 'dark' : 'light';
    applyTheme(selectedTheme);
});

document.getElementById('fontSize').addEventListener('input', function () {
    applyFontSize(this.value);
});

document.getElementById('textToSpeech').addEventListener('click', function () {
    const selectedLanguage = document.getElementById('langSelector').value;
    speakText(selectedLanguage);
});

document.getElementById('year').textContent = new Date().getFullYear();

initializePage();
