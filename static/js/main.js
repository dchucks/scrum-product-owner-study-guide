// BookLanding Theme JavaScript — Scrum PO Study Guide override
// This file lives in static/js/main.js (project root) and replaces
// the theme's version. It re-implements all theme behaviour PLUS
// adds spoToggleFaq() needed by our custom FAQ section.

document.addEventListener('DOMContentLoaded', function () {

    // ── Mobile Navigation Toggle (theme .navbar) ──────────────
    const mobileToggle = document.getElementById('mobileToggle');
    const navMenu = document.getElementById('navMenu');

    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', function () {
            navMenu.classList.toggle('active');
            const spans = mobileToggle.querySelectorAll('span');
            const isOpen = navMenu.classList.contains('active');
            spans[0].style.transform = isOpen ? 'rotate(-45deg) translate(-5px, 6px)' : 'none';
            spans[1].style.opacity   = isOpen ? '0' : '1';
            spans[2].style.transform = isOpen ? 'rotate(45deg) translate(-5px, -6px)' : 'none';
        });

        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function () {
                navMenu.classList.remove('active');
                const spans = mobileToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity   = '1';
                spans[2].style.transform = 'none';
            });
        });
    }

    // ── Smooth scroll with navbar offset ─────────────────────
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const target = document.querySelector(targetId);
            if (!target) return;
            e.preventDefault();
            const navbar = document.querySelector('.navbar');
            const offset = navbar ? navbar.offsetHeight + 20 : 80;
            window.scrollTo({ top: target.offsetTop - offset, behavior: 'smooth' });
        });
    });

    // ── Navbar scroll shadow ──────────────────────────────────
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', function () {
            navbar.style.boxShadow = window.pageYOffset > 100
                ? '0 4px 24px rgba(0,0,0,0.5)'
                : 'none';
        });
    }

    // ── Books Carousel ────────────────────────────────────────
    const carousel = document.querySelector('.books-carousel');
    const prevBtn  = document.querySelector('.carousel-prev');
    const nextBtn  = document.querySelector('.carousel-next');

    if (carousel && prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => carousel.scrollBy({ left: -300, behavior: 'smooth' }));
        nextBtn.addEventListener('click', () => carousel.scrollBy({ left:  300, behavior: 'smooth' }));
        function updateBtns() {
            const s = carousel.scrollLeft;
            const max = carousel.scrollWidth - carousel.clientWidth;
            prevBtn.style.opacity = s > 0 ? '1' : '0.5';
            nextBtn.style.opacity = s < max - 10 ? '1' : '0.5';
        }
        carousel.addEventListener('scroll', updateBtns);
        updateBtns();
    }

    // ── Intersection Observer (fade-in) ───────────────────────
    const observer = new IntersectionObserver(entries => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                e.target.style.opacity   = '1';
                e.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -80px 0px' });

    document.querySelectorAll(
        '.feature-card, .testimonial-card, .faq-item, .book-card, ' +
        '.spo-feature-card, .spo-testimonial-card, .spo-faq-item, .spo-buy-card'
    ).forEach(el => {
        el.style.opacity   = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.55s ease, transform 0.55s ease';
        observer.observe(el);
    });
});

// ── SPO FAQ accordion ─────────────────────────────────────────
// Called via onclick="spoToggleFaq(this)" on each .spo-faq-q button.
function spoToggleFaq(btn) {
    const item   = btn.closest('.spo-faq-item');
    const isOpen = item.classList.contains('spo-open');

    // Close all open items
    document.querySelectorAll('.spo-faq-item.spo-open').forEach(el => {
        el.classList.remove('spo-open');
    });

    // Open clicked item if it was closed
    if (!isOpen) {
        item.classList.add('spo-open');
    }
}