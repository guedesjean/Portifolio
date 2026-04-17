const projectContainer = document.getElementById("project-list");

projects.forEach(project => {
    projectContainer.innerHTML += project.render();
});

function scrollToSection(id) {
    document.getElementById(id).scrollIntoView({ behavior: "smooth" });
}