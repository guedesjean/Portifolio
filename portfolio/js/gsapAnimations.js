gsap.registerPlugin(ScrollTrigger);

// loader
gsap.to("#loader", {
    opacity: 0,
    duration: 0.8,
    delay: 1,
    ease: "power2.out",
    onComplete: () => {
        const loader = document.getElementById("loader");
        if (loader) loader.style.display = "none";
    }
});

// reveal normal
gsap.utils.toArray(".reveal").forEach((el) => {
    gsap.to(el, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
            trigger: el,
            start: "top 82%"
        }
    });
});

// contato reveal
const contactSection = document.querySelector("#contact");
if (contactSection) {
    gsap.from(".contact-content", {
        y: 60,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
            trigger: "#contact",
            start: "top 80%"
        }
    });
}