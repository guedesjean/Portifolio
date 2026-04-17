let currentSection = 0;
const sections = document.querySelectorAll("section");
let isScrolling = false;

function scrollToSection(index) {
    if (index < 0 || index >= sections.length) return;

    isScrolling = true;

    sections[index].scrollIntoView({
        behavior: "smooth"
    });

    currentSection = index;

    setTimeout(() => {
        isScrolling = false;
    }, 800);
}

// SCROLL DO MOUSE
window.addEventListener("wheel", (e) => {
    if (isScrolling) return;

    if (e.deltaY > 0) {
        scrollToSection(currentSection + 1);
    } else {
        scrollToSection(currentSection - 1);
    }
});