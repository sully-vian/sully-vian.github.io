const username = "sully-vian";
const apiUrl = `https://api.github.com/users/${username}/repos`;
const public_token = "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"; // doesn't have any real permission, feel free to steal it

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
        const languageIcon = getLanguageIcon(language);
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
    img.src = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg";
    img.alt = "GitHub logo";

    link.appendChild(img);
    titleBar.appendChild(link);

    return titleBar;
}

function getLanguageIcon(language) {
    const icon = document.createElement("img");

    switch (language) {
        case "C":
            icon.src = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/c/c-original.svg";
            icon.alt = "C";
            icon.title = "C";
            break;
        case "HTML":
            icon.src = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg";
            icon.alt = "HTML";
            icon.title = "HTML";
            break;
        case "Java":
            icon.src = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg";
            icon.alt = "Java";
            icon.title = "Java";
            break;
        case "Javascript":
            icon.src = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg";
            icon.alt = "Javascript";
            icon.title = "Javascript";
            break;
        case "OCaml":
            icon.src = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/ocaml/ocaml-original.svg";
            icon.alt = "OCaml";
            icon.title = "OCaml";
        case "Python":
            icon.src = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg";
            icon.alt = "Python";
            icon.title = "Python";
            break;
        case "Shell":
            icon.src = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bash/bash-original.svg";
            icon.alt = "Shell";
            icon.title = "Shell";
            break;
        case "TypeScript":
            icon.src = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg";
            icon.alt = "TypeScript";
            icon.title = "TypeScript";
            break;
        default:
            return null;
    }

    icon.className = "language-icon";
    return icon;
}