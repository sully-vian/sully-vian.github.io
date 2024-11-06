document.addEventListener("DOMContentLoaded", () => {
    Promise.all([fetchNavContent(), fetchFooterContent()])
        .then(() => {
            document.dispatchEvent(new Event("componentsLoaded"));
        });
});

// import nav.html to all pages
function fetchNavContent() {
    return fetch("../html/components/nav.html")
        .then(res => res.text())
        .then(data => {
            document.querySelector("nav").innerHTML = data;
        }).catch(error => console.error("Error fetching nav content", error));
}

function fetchFooterContent() {
    return fetch("../html/components/footer.html")
        .then(res => res.text())
        .then(data => {
            document.querySelector("footer").innerHTML = data;
        }).catch(error => console.error("Error fetching footer content", error));
}