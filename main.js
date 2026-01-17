/**
 * Scroll Reveal Animation Logic
 */
function initReveal() {
    const reveals = document.querySelectorAll(".reveal");

    const observerOptions = {
        root: null,
        rootMargin: "0px",
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
            }
        });
    }, observerOptions);

    reveals.forEach(element => observer.observe(element));
}

/**
 * Lightbox Modal Logic for Certifications
 */
function openLightbox(imgSrc) {
    const lightbox = document.getElementById("certLightbox");
    const lightboxImg = document.getElementById("lightboxImg");

    lightboxImg.src = imgSrc;
    lightbox.style.display = "flex";
    document.body.style.overflow = "hidden"; // Prevent scrolling when open
}

function closeLightbox() {
    const lightbox = document.getElementById("certLightbox");
    lightbox.style.display = "none";
    document.body.style.overflow = "auto"; // Re-enable scrolling
}

// Initialize on DOMContentLoaded
document.addEventListener("DOMContentLoaded", () => {
    initReveal();

    // Smooth scroll for nav links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === "#") return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Close lightbox on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === "Escape") closeLightbox();
    });
});
