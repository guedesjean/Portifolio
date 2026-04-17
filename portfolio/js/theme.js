function toggleTheme() {
    const body = document.body;

    body.classList.add("theme-transition");
    body.classList.toggle("dark");

    const theme = body.classList.contains("dark") ? "dark" : "light";
    localStorage.setItem("theme", theme);

    setTimeout(() => {
        body.classList.remove("theme-transition");
    }, 500);
}

document.addEventListener("DOMContentLoaded", () => {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {
        document.body.classList.add("dark");
    } else if (savedTheme === "light") {
        document.body.classList.remove("dark");
    }
});