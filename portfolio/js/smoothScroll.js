const sections = [
    document.querySelector("#home"),
    document.querySelector("#about"),
    document.querySelector("#skills"),
    document.querySelector("#projects"),
    document.querySelector("#contact")
].filter(Boolean);

const projectsSection = document.querySelector("#projects");
const projectsTrack = document.querySelector(".projects-track");
const projectPanels = [...document.querySelectorAll(".project-panel")];
const dots = [...document.querySelectorAll(".side-nav-dot")];
const currentCounter = document.getElementById("projectsCurrent");
const progressBar = document.getElementById("projectsCounterProgress");
const isMobile = window.innerWidth <= 768;

let isAnimating = false;
let currentSectionIndex = 0;
let currentProjectIndex = 0;

function getClosestSectionIndex() {
    const y = window.scrollY;
    let closestIndex = 0;
    let closestDistance = Infinity;

    sections.forEach((section, index) => {
        const distance = Math.abs(section.offsetTop - y);
        if (distance < closestDistance) {
            closestDistance = distance;
            closestIndex = index;
        }
    });

    return closestIndex;
}

function updateProjectsUI(index) {
    dots.forEach((dot, i) => dot.classList.toggle("active", i === index));

    if (currentCounter) {
        currentCounter.textContent = String(index + 1).padStart(2, "0");
    }

    if (progressBar) {
        progressBar.style.height = `${((index + 1) / projectPanels.length) * 100}%`;
    }

    projectPanels.forEach((panel, i) => {
        panel.classList.toggle("is-active", i === index);
    });
}

function animateActivePanel(index) {
    const panel = projectPanels[index];
    if (!panel) return;

    const info = panel.querySelector(".project-info");
    const visual = panel.querySelector(".project-visual");
    const card = panel.querySelector(".basic-project-card");

    if (info) {
        gsap.fromTo(info,
            { x: -120, opacity: 0, filter: "blur(10px)" },
            { x: 0, opacity: 1, filter: "blur(0px)", duration: 0.95, ease: "power4.out" }
        );
    }

    if (visual) {
        gsap.fromTo(visual,
            { x: 140, opacity: 0, scale: 0.94, rotationY: -8 },
            { x: 0, opacity: 1, scale: 1, rotationY: 0, duration: 1.05, ease: "power4.out" }
        );
    }

    if (card) {
        gsap.fromTo(card,
            { x: 120, opacity: 0, scale: 0.94, filter: "blur(8px)" },
            { x: 0, opacity: 1, scale: 1, filter: "blur(0px)", duration: 0.9, ease: "power4.out" }
        );
    }
}

function animateProjectsTo(index) {
    if (isMobile) return;

    currentProjectIndex = Math.max(0, Math.min(index, projectPanels.length - 1));
    updateProjectsUI(currentProjectIndex);

    gsap.to(projectsTrack, {
        x: -window.innerWidth * currentProjectIndex,
        duration: 1.05,
        ease: "power4.inOut"
    });

    gsap.to(projectPanels, {
        opacity: 0.35,
        scale: 0.94,
        duration: 0.8,
        ease: "power2.out",
        overwrite: true
    });

    gsap.to(projectPanels[currentProjectIndex], {
        opacity: 1,
        scale: 1,
        duration: 0.95,
        ease: "power3.out",
        overwrite: true
    });

    animateActivePanel(currentProjectIndex);
}

function goToSection(index, afterEnter) {
    if (index < 0 || index >= sections.length) return;

    isAnimating = true;
    currentSectionIndex = index;

    gsap.to(window, {
        duration: 0.3,
        scrollTo: { y: sections[index].offsetTop, autoKill: false },
        ease: "power4.inOut",
        onComplete: () => {
            if (typeof afterEnter === "function") {
                afterEnter();
            }
            setTimeout(() => {
                isAnimating = false;
            }, 120);
        }
    });
}

function handleProjectsWheel(direction) {
    if (direction > 0) {
        if (currentProjectIndex < projectPanels.length - 1) {
            isAnimating = true;
            animateProjectsTo(currentProjectIndex + 1);
            setTimeout(() => {
                isAnimating = false;
            }, 1050);
        } else {
            goToSection(currentSectionIndex + 1);
        }
    } else {
        if (currentProjectIndex > 0) {
            isAnimating = true;
            animateProjectsTo(currentProjectIndex - 1);
            setTimeout(() => {
                isAnimating = false;
            }, 1050);
        } else {
            goToSection(currentSectionIndex - 1);
        }
    }
}

function handleWheel(event) {

    if (isMobile) return;
    event.preventDefault();
    

    if (isAnimating) return;
    if (Math.abs(event.deltaY) < 10) return;

    currentSectionIndex = getClosestSectionIndex();
    const direction = event.deltaY > 0 ? 1 : -1;
    const currentSection = sections[currentSectionIndex];

    if (currentSection === projectsSection) {
        handleProjectsWheel(direction);
        return;
    }

    const nextIndex = currentSectionIndex + direction;
    if (nextIndex < 0 || nextIndex >= sections.length) return;

    if (sections[nextIndex] === projectsSection) {
        goToSection(nextIndex, () => {
            currentProjectIndex = 0;
            animateProjectsTo(0);
        });
        return;
    }

    goToSection(nextIndex);
}

function scrollToSection(id) {
    const targetIndex = sections.findIndex(section => section.id === id);
    if (targetIndex === -1) return;

    if (sections[targetIndex] === projectsSection) {
        goToSection(targetIndex, () => {
            currentProjectIndex = 0;
            animateProjectsTo(0);
        });
        return;
    }

    goToSection(targetIndex);
}

dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
        if (isAnimating) return;

        const projectsIndex = sections.indexOf(projectsSection);

        if (getClosestSectionIndex() !== projectsIndex) {
            goToSection(projectsIndex, () => {
                currentProjectIndex = index;
                animateProjectsTo(index);
            });
            return;
        }

        isAnimating = true;
        animateProjectsTo(index);
        setTimeout(() => {
            isAnimating = false;
        }, 1050);
    });
});

window.addEventListener("wheel", handleWheel, { passive: false });

window.addEventListener("load", () => {
    if (isMobile) {
        if (projectsTrack) {
            gsap.set(projectsTrack, { x: 0, clearProps: "transform" });
        }
        return;
    }

    gsap.set(projectsTrack, { x: 0 });
    updateProjectsUI(0);
});