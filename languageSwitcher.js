const siteTexts = {
    en: {
        mainPageLink: "Main Page",
        titleMessage: "Welcome to Language Change Website",
        infoParagraph: "Using JavaScript, this website can change to any Language in just a few clicks.",
        langLabel: "Choose Your Language:"
    },
    fr: {
        mainPageLink: "Page Principale",
        titleMessage: "Bienvenue sur le site de changement de langue",
        infoParagraph: "Grâce à JavaScript, ce site peut passer à n'importe quelle langue en quelques clics.",
        langLabel: "Choisissez votre langue :"
    }
};
          
function updateSiteContent(language) {
    document.getElementById("mainPageLink").textContent = siteTexts[language].mainPageLink;
    document.getElementById("titleMessage").textContent = siteTexts[language].titleMessage;
    document.getElementById("infoParagraph").textContent = siteTexts[language].infoParagraph;
    document.getElementById("langLabel").textContent = siteTexts[language].langLabel;
}

document.getElementById("languageOptions").addEventListener("change", function () {
    const selectedLang = this.value;
    updateSiteContent(selectedLang);
});

document.getElementById("currentYear").textContent = new Date().getFullYear();

const userLanguage = navigator.language.slice(0, 2);
const defaultLang = siteTexts[userLanguage] ? userLanguage : 'en';
document.getElementById("languageOptions").value = defaultLang;
updateSiteContent(defaultLang);
