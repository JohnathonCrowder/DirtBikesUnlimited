document.addEventListener('DOMContentLoaded', () => {
    // Initialize all functions when DOM is fully loaded
    initNavbarScroll();
    initScrollAnimations();
    initSmoothScroll();
    initParallaxEffects();
    initServiceCardHover();
});

// Change navbar style on scroll
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
        }
    });
}

// Smooth scroll for navigation links
function initSmoothScroll() {
    const links = document.querySelectorAll("a[href^='#']");
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            document.querySelector(targetId).scrollIntoView({ behavior: 'smooth' });
        });
    });
}

// Initialize sliding animations on scroll
function initScrollAnimations() {
    const elements = document.querySelectorAll('.fade-in');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    elements.forEach(el => observer.observe(el));
}

// Create parallax scrolling effects
function initParallaxEffects() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxBackgrounds = document.querySelectorAll('.parallax');
        parallaxBackgrounds.forEach(bg => {
            const speed = bg.dataset.speed || 0.5;
            bg.style.backgroundPositionY = -(scrolled * speed) + 'px';
        });
    });
}

// Interactive hover effects for service cards
function initServiceCardHover() {
    const cards = document.querySelectorAll('.service-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', (e) => {
            gsap.to(e.currentTarget, { duration: 0.3, y: -10, boxShadow: '0 10px 20px rgba(0,0,0,0.2)' });
        });
        card.addEventListener('mouseleave', (e) => {
            gsap.to(e.currentTarget, { duration: 0.3, y: 0, boxShadow: '0 4px 10px rgba(0,0,0,0.1)' });
        });
    });
}

// Dynamic counter animation (for stats or facts)
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / 100;
    const timer = setInterval(() => {
        start += increment;
        element.textContent = Math.floor(start);
        if (start >= target) {
            clearInterval(timer);
            element.textContent = target;
        }
    }, duration / 100);
}

// Example usage: 
// Call this when stats section comes into view
// animateCounter(document.getElementById('bikesRepaired'), 5000);

// Simple form validation (for contact forms)
function validateForm(formId) {
    const form = document.getElementById(formId);
    form.addEventListener('submit', (e) => {
        let valid = true;
        const requiredFields = form.querySelectorAll('[required]');
        requiredFields.forEach(field => {
            if (!field.value) {
                valid = false;
                field.classList.add('error');
            } else {
                field.classList.remove('error');
            }
        });
        if (!valid) e.preventDefault();
    });
}

// Optional: Preloader
window.addEventListener('load', () => {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        preloader.classList.add('preloader--hidden');
    }
});