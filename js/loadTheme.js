document.addEventListener("componentsLoaded", () => {
    // load last selected theme or default to light
    const theme = localStorage.getItem("selectedTheme") || "light";
    loadTheme(theme);

    const themeSwitch = document.getElementById("theme-switch");
    themeSwitch.checked = (theme === "dark"); // checked <=> dark

    themeSwitch.addEventListener("change", (event) => {
        const selectedTheme = event.target.checked ? "dark" : "light";
        localStorage.setItem("selectedTheme", selectedTheme);
        loadTheme(selectedTheme);
    });
});

function loadTheme(theme) {
    if (theme === "dark") {
        document.body.classList.add("dark-theme");
    } else {
        document.body.classList.remove("dark-theme");
    }
    // console.log(`Theme loaded: ${theme}`);
}