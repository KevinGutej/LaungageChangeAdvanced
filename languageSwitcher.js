const supportedLanguages = ['en', 'fr', 'es', 'ar'];

function translateText(sourceText, sourceLang, targetLang) {
    return `Translated (${sourceLang} to ${targetLang}): ${sourceText}`;
}

document.getElementById('translateBtn').addEventListener('click', function() {
    const sourceLang = document.getElementById('sourceLangSelector').value;
    const targetLang = document.getElementById('targetLangSelector').value;
    const sourceText = document.getElementById('sourceText').value;

    const translatedText = translateText(sourceText, sourceLang, targetLang);
    document.getElementById('translatedText').value = translatedText;
});

document.getElementById('swapLanguagesBtn').addEventListener('click', function() {
    const sourceLang = document.getElementById('sourceLangSelector').value;
    const targetLang = document.getElementById('targetLangSelector').value;

    document.getElementById('sourceLangSelector').value = targetLang;
    document.getElementById('targetLangSelector').value = sourceLang;

    const sourceText = document.getElementById('sourceText').value;
    const translatedText = document.getElementById('translatedText').value;

    document.getElementById('sourceText').value = translatedText;
    document.getElementById('translatedText').value = sourceText;
});

function speakText(text, lang) {
    const speech = new SpeechSynthesisUtterance();
    speech.lang = lang;
    speech.text = text;
    window.speechSynthesis.speak(speech);
}

document.getElementById('speakSourceText').addEventListener('click', function() {
    const sourceLang = document.getElementById('sourceLangSelector').value;
    const sourceText = document.getElementById('sourceText').value;
    speakText(sourceText, sourceLang);
});

document.getElementById('speakTranslatedText').addEventListener('click', function() {
    const targetLang = document.getElementById('targetLangSelector').value;
    const translatedText = document.getElementById('translatedText').value;
    speakText(translatedText, targetLang);
});

document.getElementById('submitFeedbackBtn').addEventListener('click', function () {
    const feedbackText = document.getElementById('feedbackText').value.trim();
    const rating = document.getElementById('rating').value;
    if (feedbackText) {
        logActivity(`Feedback submitted with rating ${rating}: ${feedbackText}`);
        document.getElementById('feedbackText').value = '';
    } else {
        alert('Please enter feedback before submitting.');
    }
});

function logActivity(activity) {
    const activityLog = document.getElementById('activityLog');
    const listItem = document.createElement('li');
    listItem.textContent = activity;
    activityLog.appendChild(listItem);
}
