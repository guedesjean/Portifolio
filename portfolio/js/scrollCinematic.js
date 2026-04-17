let current = 0;
const sections = document.querySelectorAll("section");
let isAnimating = false;

function goToSection(index) {
    if (index < 0 || index >= sections.length) return;

    isAnimating = true;

    sections.forEach((sec, i) => {
        if (i === index) {
            // seção ativa entra
            sec.style.transform = "translateX(0) scale(1)";
            sec.style.opacity = "1";
            sec.style.zIndex = "2";
        } else if (i < index) {
            // saiu para esquerda
            sec.style.transform = "translateX(-100%) scale(0.9)";
            sec.style.opacity = "0.3";
            sec.style.zIndex = "1";
        } else {
            // vem da direita
            sec.style.transform = "translateX(100%) scale(0.9)";
            sec.style.opacity = "0.3";
            sec.style.zIndex = "1";
        }
    });

    current = index;

    setTimeout(() => {
        isAnimating = false;
    }, 700);
}

// SCROLL
window.addEventListener("wheel", (e) => {
    if (isAnimating) return;

    if (e.deltaY > 0) {
        goToSection(current + 1);
    } else {
        goToSection(current - 1);
    }
});

// INIT
window.onload = () => {
    goToSection(0);
};