const typingElement = document.getElementById("typing");
const texts = [
    "Analista de Dados",
    "Desenvolvedor Web",
    " JAVA • JavaScript • PHP • Python • Power BI • VBA • SQL"
];
 
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
    if (!typingElement) return;

    const currentText = texts[textIndex];
    typingElement.textContent = currentText.substring(0, charIndex);

    if (!isDeleting) {
        charIndex++;
        if (charIndex > currentText.length) {
            isDeleting = true;
            setTimeout(typeEffect, 1200);
            return;
        }
    } else {
        charIndex--;
        if (charIndex < 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            charIndex = 0;
        }
    }

    setTimeout(typeEffect, isDeleting ? 45 : 90);
}

document.addEventListener("DOMContentLoaded", typeEffect);