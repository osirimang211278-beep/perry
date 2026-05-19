console.log("script.js is loaded ✅");

// Only one DOMContentLoaded listener — everything inside
document.addEventListener('DOMContentLoaded', () => {

    // ── Hero animations (only on index.html) ──
    const heroText = document.querySelector(".animate-text");
    const heroImage = document.querySelector(".animate-image");

    if (heroText) {
        setTimeout(() => heroText.classList.add("show-text"), 700);
    }
    if (heroImage) {
        setTimeout(() => heroImage.classList.add("show-image"), 1300);
    }

    const navToggle = document.querySelector(".nav-toggle");
    const navLinks = document.querySelector(".nav-links");

    if (navToggle && navLinks) {
        navToggle.addEventListener("click", () => {
            const isOpen = navLinks.getAttribute("data-visible") === "true";
            navLinks.setAttribute("data-visible", String(!isOpen));
            navToggle.setAttribute("aria-expanded", String(!isOpen));
            navToggle.classList.toggle("open", !isOpen);
        });

        document.addEventListener("click", (event) => {
            if (
                !navLinks.contains(event.target) &&
                !navToggle.contains(event.target) &&
                navLinks.getAttribute("data-visible") === "true"
            ) {
                navLinks.setAttribute("data-visible", "false");
                navToggle.setAttribute("aria-expanded", "false");
                navToggle.classList.remove("open");
            }
        });
    }

    const backToTopButton = document.querySelector(".back-to-top");

    if (backToTopButton) {
        const toggleBackToTop = () => {
            if (window.scrollY > window.innerHeight / 2) {
                backToTopButton.classList.add("visible");
            } else {
                backToTopButton.classList.remove("visible");
            }
        };

        toggleBackToTop();
        window.addEventListener("scroll", toggleBackToTop);

        backToTopButton.addEventListener("click", () => {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }

    // ── Scroll reveal for cards / fade-up elements (used on all pages) ──
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("show");
                    // Optional: stop observing after it's shown (better performance)
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.18,
            rootMargin: "0px 0px -100px 0px"
        }
    );

document.querySelectorAll(".fade-up, .card").forEach((el) => {
    observer.observe(el);
});

// ── Contact form AJAX submission ──
const form = document.getElementById("contact-form");
const messageDiv = document.getElementById("form-message");

if (form && messageDiv) {
    form.addEventListener("submit", async(e) => {
        e.preventDefault();

        // Reset message
        messageDiv.style.display = 'none';
        messageDiv.className = 'form-message';
        messageDiv.textContent = '';

        const submitButton = form.querySelector('button[type="submit"]');
        const originalButtonText = submitButton.textContent;
        submitButton.disabled = true;
        submitButton.textContent = 'Sending...';

        try {
            const formData = new FormData(form);

            const response = await fetch("https://formspree.io/f/mvzwqqya", {
                method: "POST",
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                form.reset(); // clear inputs
                window.location.href = 'contact-success.html';
            } else {
                throw new Error("Server responded with error: " + response.status);
            }
        } catch (error) {
            messageDiv.textContent =
                "Sorry, something went wrong. Please try again or message us directly on WhatsApp.";
            messageDiv.classList.add("error");
            messageDiv.style.display = "block";
            console.error("Form submission error:", error);
        } finally {
            submitButton.disabled = false;
            submitButton.textContent = originalButtonText;
        }
    });
} else {
    console.warn("Contact form or message div not found on this page");
}
});

// Optional: disable right-click & F12 (keep only if you really need it — many users dislike it)
document.addEventListener("contextmenu", (e) => e.preventDefault());
document.addEventListener("keydown", (e) => {
    if (e.key === "F12") e.preventDefault();
});