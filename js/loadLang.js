document.addEventListener("navContentLoaded", () => {
    // load last selected language or default to english
    const lang = localStorage.getItem("selectedLang") || "en";
    loadLang(lang);

    const langSwitch = document.getElementById("lang-switch");
    langSwitch.checked = (lang === "fr"); // checked <=> french

    langSwitch.addEventListener("change", (event) => {
        const selectedLang = event.target.checked ? "fr" : "en";
        localStorage.setItem("selectedLang", selectedLang);
        loadLang(selectedLang);
    });
});

function loadLang(lang) {
    fetch(`/lang/${lang}.jsonc`)
        .then(res => res.json())
        .then(data => {
            for (const key in data) {
                const element = document.querySelector(`[data-lang="${key}"]`);
                if (element) {
                    element.innerHTML = data[key].replace(/\n/g, "<br>");
                }
            }
        })
        .catch(err => console.error(`Error loading language file for language \"${lang}\"`, err));
}