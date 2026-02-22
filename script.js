document.addEventListener("DOMContentLoaded", () => {     // Hero animations (index.html)
        
    const heroText = document.querySelector(".animate-text");    
    const heroImage = document.querySelector(".animate-image");    
    if (heroText) {         setTimeout(() => heroText.classList.add("show-text"), 700);     }    
    if (heroImage) {         setTimeout(() => heroImage.classList.add("show-image"), 1300);     }     // Scroll-based reveal for cards and fade-up elements (both pages)
        
    const observer = new IntersectionObserver(        (entries) => {             entries.forEach((entry) => {                 if (entry.isIntersecting) {                     entry.target.classList.add("show");                     // Optional: unobserve after shown to improve performance
                                    
                observer.unobserve(entry.target);                 }             });         },          {             threshold: 0.18,             rootMargin: "0px 0px -100px 0px"         }    );    
    document.querySelectorAll(".fade-up, .card").forEach((el) => {         observer.observe(el);     });
});
// Disable right-click & F12 (optional – keep if you want)
document.addEventListener('contextmenu', e => e.preventDefault());
document.addEventListener('keydown', e => {    
    if (e.key === "F12") e.preventDefault();
});