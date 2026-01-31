window.addEventListener("load", () => {
    const elements = document.querySelectorAll(".fade-up, .fade-in, ,card");
    elements.forEach((el, index) => {
        setTimeout(() => {
            el.classList.add("show");
        }, index * 200);
    });
});

const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
            }
        });
    }, { threshold: 0.2 }
);

document.querySelectorAll(".fade-up, .fade-in, .card").forEach((el) => {
    observer.observer(el);
});

window.addEventListener("DOMContentLoaded", () => {
    const text = document.querySelector(".animate-text");
    const image = document.querySelector(".animate-image");

    if (text) {
        text.classList.add("show-text");
    }
    If(image) {
        setTimeout(() => {
            image.classList.add("show-image");
        }, 800);
    }
});