// --- Mobile Menu Logic (Global) ---
function toggleMenu() {
    const mobileMenu = document.querySelector('.mobile-menu');
    mobileMenu.classList.toggle('active');
}

document.addEventListener('DOMContentLoaded', () => {
    // Prevent script crash if libraries fail
    try {
        gsap.registerPlugin(ScrollTrigger);
    } catch (e) {
        console.warn("GSAP/ScrollTrigger not loaded", e);
    }

    // --- Custom Cursor Logic (Desktop Only) ---
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorCircle = document.querySelector('.cursor-circle');

    if (window.matchMedia("(min-width: 1025px)").matches && cursorDot && cursorCircle) {
        document.addEventListener('mousemove', (e) => {
            gsap.to(cursorDot, { x: e.clientX, y: e.clientY, duration: 0.1, ease: "power2.out" });
            gsap.to(cursorCircle, { x: e.clientX - 20, y: e.clientY - 20, duration: 0.4, ease: "power2.out" });
        });

        const interactiveElements = document.querySelectorAll('a, .cta-button, .bento-item, .video-container');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                gsap.to(cursorCircle, { scale: 1.5, borderColor: '#64FFDA', duration: 0.3 });
                gsap.to(cursorDot, { scale: 0.5, duration: 0.3 });
            });
            el.addEventListener('mouseleave', () => {
                gsap.to(cursorCircle, { scale: 1, borderColor: 'rgba(100, 255, 218, 0.3)', duration: 0.3 });
                gsap.to(cursorDot, { scale: 1, duration: 0.3 });
            });
        });
    }

    // --- Hero Animations ---
    try {
        const tl = gsap.timeline();
        tl.from('.hero-label', { y: 20, opacity: 0, duration: 1, ease: 'power3.out' })
            .from('.hero-name', { y: 50, opacity: 0, duration: 1.2, ease: 'power4.out' }, "-=0.8")
            .from('.hero-description', { x: -20, opacity: 0, duration: 1, ease: 'power3.out' }, "-=0.5")
            .from('.hero-visual', { scale: 1.1, opacity: 0, duration: 1.5, ease: 'exp.out' }, "-=1");
    } catch (e) { console.warn("GSAP Animations failed", e); }

    // --- Components Reveal ---
    const scrollItems = ['.bento-item', '.video-card', '.fade-up'];
    scrollItems.forEach(selector => {
        gsap.utils.toArray(selector).forEach((item, i) => {
            try {
                gsap.from(item, {
                    scrollTrigger: { trigger: item, start: "top 85%", toggleActions: "play none none reverse" },
                    y: 50, opacity: 0, duration: 0.8, delay: (selector.includes('bento') ? i * 0.1 : 0), ease: "power2.out"
                });
            } catch (e) { }
        });
    });

    // --- Typed.js Initialization ---
    if (document.querySelector('.typing-text') && typeof Typed !== 'undefined') {
        new Typed('.typing-text', {
            strings: ['an Administrator', 'a Strategist', 'a Nation Builder'],
            typeSpeed: 50, backSpeed: 30, backDelay: 2000, loop: true, showCursor: true, cursorChar: '|'
        });
    }

    // --- Mobile Menu Button Event ---
    const menuBtn = document.querySelector('.mobile-menu-btn');
    if (menuBtn) {
        menuBtn.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent bubbling issues
            toggleMenu();
        });
    }

    // --- Close Mobile Menu on Link Click ---
    const mobileLinks = document.querySelectorAll('.mobile-menu a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            const mobileMenu = document.querySelector('.mobile-menu');
            if (mobileMenu) {
                mobileMenu.classList.remove('active');
            }
        });
    });

    // --- Close Mobile Menu on Click Outside ---
    document.addEventListener('click', (e) => {
        const mobileMenu = document.querySelector('.mobile-menu');
        const menuBtn = document.querySelector('.mobile-menu-btn');

        if (mobileMenu && mobileMenu.classList.contains('active')) {
            if (!mobileMenu.contains(e.target) && !menuBtn.contains(e.target)) {
                mobileMenu.classList.remove('active');
            }
        }
    });

    // --- Search Logic ---
    const searchBtn = document.querySelector('.search-btn');
    const searchOverlay = document.querySelector('.search-overlay');
    const closeSearchBtn = document.querySelector('.close-search');

    if (searchBtn && searchOverlay) {
        searchBtn.addEventListener('click', () => {
            searchOverlay.classList.add('active');
            const input = document.querySelector('.search-input');
            if (input) input.focus();
        });
    }

    if (closeSearchBtn && searchOverlay) {
        closeSearchBtn.addEventListener('click', () => searchOverlay.classList.remove('active'));
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && searchOverlay && searchOverlay.classList.contains('active')) {
            searchOverlay.classList.remove('active');
        }
    });

    // --- Smart Navbar & Magnetic Buttons ---
    let lastScrollY = window.scrollY;
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > lastScrollY && window.scrollY > 100) {
            if (navbar) navbar.classList.add('navbar-hidden');
        } else {
            if (navbar) navbar.classList.remove('navbar-hidden');
        }
        lastScrollY = window.scrollY;
    });

    const magneticButtons = document.querySelectorAll('.cta-button, .scroll-down, .search-btn, .fab-connect');
    magneticButtons.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            gsap.to(btn, { x: x * 0.3, y: y * 0.3, duration: 0.2, ease: 'power2.out' });
        });
        btn.addEventListener('mouseleave', () => {
            gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.3)' });
        });
    });

    // --- Hero Slideshow Logic (Extracted Photos) ---
    const slides = document.querySelectorAll('.hero-slide');
    if (slides.length > 0) {
        let currentSlide = 0;

        // Ensure first slide is active initially
        slides[0].classList.add('active');

        setInterval(() => {
            // Remove active from current
            slides[currentSlide].classList.remove('active');

            // Move to next
            currentSlide = (currentSlide + 1) % slides.length;

            // Add active to next
            slides[currentSlide].classList.add('active');
        }, 5000); // 5 seconds per slide
    }
});
