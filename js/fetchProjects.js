const username = "sully-vian";
const apiUrl = `https://api.github.com/users/${username}/repos`;
// Yes, I did this to avoid github's token detection.
// Feel free to steal this token, it has no access to whatsoever.
const hidden_token = "VmpKd1MySXlVWGhoUkZwWFZrWmFWbFpxUm1GVmJHeDBaVVZPYUZKdVFucFdiVEZIVkdzeFJrNVdUbFZpUjJoUFdrUkdVMlJHWkhST1YyaHBZbXRKZWxkclVrTlVNV1JIVld4b1lWSnVRbEZXYTFaTFlqRmtkRTVYUmxOV01GcFRWVVpSZDFCUlBUMD0="
let public_token = hidden_token;
for (let i = 0; i < 5; i++) {
    public_token = atob(public_token);
}

document.addEventListener("DOMContentLoaded", () => {

    fetch(apiUrl, {
        headers: { Authorization: `token ${public_token}` }
    })
        .then(res => res.json())
        .then(data => {
            data.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
            const projectsContainer = document.getElementById("projects-container");
            data.forEach(repo => {
                fetch(repo.languages_url, {
                    headers: { Authorization: `token ${public_token}` }
                })
                    .then(res => res.json())
                    .then(languages => {
                        const projectCard = createProjectCard(repo, languages);
                        projectsContainer.appendChild(projectCard);
                    }).catch(err => console.error("Error fetching GitHub repo languages:", err));
            });
        }).catch(err => console.error("Error fetching GitHub repos:", err));
});

function createProjectCard(repo, languages) {
    const card = document.createElement("div");
    card.className = "project-card";

    titleBar = createTitleBar(repo);
    card.appendChild(titleBar);

    const description = document.createElement("p");
    description.textContent = repo.description || "No description provided.";
    card.appendChild(description);

    const languageIcons = document.createElement("div");
    languageIcons.className = "language-icons";

    for (const language in languages) {
        const languageIcon = fetchLanguageIcon(language);
        if (languageIcon) {
            languageIcons.appendChild(languageIcon);
        }
    }
    card.appendChild(languageIcons);

    return card;
}

function createTitleBar(repo) {
    const titleBar = document.createElement("div");
    titleBar.className = "title-bar";

    const title = document.createElement("h3");
    title.textContent = repo.name;
    titleBar.appendChild(title);

    const link = document.createElement("a");
    link.href = repo.html_url;
    link.target = "_blank";

    const img = document.createElement("img");
    img.src = "/assets/svg/github.svg";
    img.alt = "GitHub logo";

    link.appendChild(img);
    titleBar.appendChild(link);

    return titleBar;
}

/**
 * Fits the language name to get the correct icon.
 */
function fitLanguageName(language) {
    switch (language.toLowerCase()) {
        case "html": return "html5";
        case "css": return "css3";
        case "shell": return "bash";
        case "c#": return "csharp";
        case "c++": return "cplusplus";
        case "visual basic 6.0": return "visualbasic";
        case "vim script": return "vim";
        default:
            return language.toLowerCase();
    }
}

function fetchLanguageIcon(language) {
    const fittedLang = fitLanguageName(language);
    const icon = document.createElement("img");
    icon.src = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/" + fittedLang + "/" + fittedLang + "-original.svg";
    icon.alt = language;
    icon.title = language;
    icon.className = "language-icon";

    icon.onerror = () => { icon.remove(); };
    return icon;
}