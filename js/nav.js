document.addEventListener("DOMContentLoaded", () => {
    fetchNavConent()
        .then(() => {
            document.dispatchEvent(new Event("navContentLoaded"));
        });
});

// import nav.html to all pages
function fetchNavConent() {
    return fetch("../html/components/nav.html")
        .then(res => res.text())
        .then(data => {
            document.querySelector("nav").innerHTML = data;
        }).catch(error => console.error("Error fetching nav content", error));
}