const supportedLanguages = ['en', 'fr', 'es', 'ar'];
const rtlLanguages = ['ar'];

const dateFormatOptions = {
    en: { day: '2-digit', month: '2-digit', year: 'numeric' },
    fr: { day: '2-digit', month: '2-digit', year: 'numeric' },
    es: { day: '2-digit', month: '2-digit', year: 'numeric' },
    ar: { day: '2-digit', month: '2-digit', year: 'numeric' }
};

function detectLocationAndSetLanguage() {
    fetch('https://ipapi.co/json/')
        .then(response => response.json())
        .then(data => {
            const countryCode = data.country_code;
            let language = 'en';

            if (countryCode === 'FR') {
                language = 'fr';
            } else if (countryCode === 'ES') {
                language = 'es';
            } else if (countryCode === 'SA') {
                language = 'ar';
            }

            document.getElementById('langSelector').value = language;
            loadLanguageData(language);
            setDirection(language);
        })
        .catch(() => {
            console.error('Failed to detect location.');
        });
}

function speakText(lang) {
    const speech = new SpeechSynthesisUtterance();
    speech.lang = lang;
    speech.text = `${document.getElementById('mainHeading').textContent}. ${document.getElementById('mainDescription').textContent}`;
    window.speechSynthesis.speak(speech);
}

function initializeChatBot() {
    const chatMessages = document.getElementById('chatMessages');
    const chatInput = document.getElementById('chatInput');
    const sendChat = document.getElementById('sendChat');

    sendChat.addEventListener('click', function() {
        const userMessage = chatInput.value;
        if (userMessage) {
            const messageContainer = document.createElement('p');
            messageContainer.textContent = `You: ${userMessage}`;
            chatMessages.appendChild(messageContainer);
            chatInput.value = '';
            getChatbotResponse(userMessage);
        }
    });
}

function getChatbotResponse(message) {
    const chatMessages = document.getElementById('chatMessages');
    const botResponse = document.createElement('p');
    botResponse.textContent = `Bot: I see you said "${message}". How can I help further?`;
    chatMessages.appendChild(botResponse);
}

function initializeSpeechToText() {
    const speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new speechRecognition();

    const chatInput = document.getElementById('chatInput');

    recognition.onresult = function(event) {
        const transcript = event.results[0][0].transcript;
        chatInput.value = transcript;
    };

    document.getElementById('speechToText').addEventListener('click', function() {
        recognition.start();
    });
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

function applyColorScheme(scheme) {
    document.body.classList.remove('blue-scheme', 'green-scheme', 'red-scheme');
    if (scheme !== 'default') {
        document.body.classList.add(`${scheme}-scheme`);
    }
    localStorage.setItem('colorScheme', scheme);
}

function applyFontSize(size) {
    document.body.style.setProperty('--font-size', `${size}px`);
    localStorage.setItem('fontSize', size);
}

function updateWordCount() {
    const descriptionText = document.getElementById('mainDescription').textContent;
    const wordCount = descriptionText.split(/\s+/).length;
    document.getElementById('wordCounter').textContent = wordCount;
}

function initializePage() {
    const savedLanguage = localStorage.getItem('preferredLanguage') || 'en';
    const savedTheme = localStorage.getItem('preferredTheme') || 'light';
    const savedFontSize = localStorage.getItem('fontSize') || 16;
    const savedColorScheme = localStorage.getItem('colorScheme') || 'default';

    document.getElementById('langSelector').value = savedLanguage;
    document.getElementById('themeToggle').checked = savedTheme === 'dark';
    document.getElementById('fontSize').value = savedFontSize;
    document.getElementById('colorScheme').value = savedColorScheme;

    loadLanguageData(savedLanguage);
    setDirection(savedLanguage);
    applyTheme(savedTheme);
    applyFontSize(savedFontSize);
    applyColorScheme(savedColorScheme);
    updateWordCount();
    setInterval(updateTimeDisplay, 1000);

    initializeChatBot();
    initializeSpeechToText();
    detectLocationAndSetLanguage();
}

function updateTimeDisplay() {
    const now = new Date();
    document.getElementById('timeDisplay').textContent = now.toLocaleTimeString();
}

document.getElementById('langSelector').addEventListener('change', function() {
    const selectedLanguage = this.value;
    loadLanguageData(selectedLanguage);
    saveUserLanguage(selectedLanguage);
    setDirection(selectedLanguage);
});

document.getElementById('themeToggle').addEventListener('change', function() {
    const selectedTheme = this.checked ? 'dark' : 'light';
    applyTheme(selectedTheme);
});

document.getElementById('fontSize').addEventListener('input', function() {
    applyFontSize(this.value);
});

document.getElementById('colorScheme').addEventListener('change', function() {
    applyColorScheme(this.value);
});

document.getElementById('textToSpeech').addEventListener('click', function() {
    const selectedLanguage = document.getElementById('langSelector').value;
    speakText(selectedLanguage);
});

document.getElementById('acceptCookies').addEventListener('click', function() {
    document.getElementById('cookieBanner').style.display = 'none';
    localStorage.setItem('cookiesAccepted', 'true');
});

document.getElementById('accessibilityMode').addEventListener('click', function() {
    document.body.classList.toggle('accessibility-mode');
});

document.addEventListener('DOMContentLoaded', function() {
    if (!localStorage.getItem('cookiesAccepted')) {
        document.getElementById('cookieBanner').style.display = 'block';
    }
});

initializePage();
