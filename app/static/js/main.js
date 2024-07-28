// Initialize GSAP plugins
gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', () => {
    initNavbarScroll();
    initScrollAnimations();
    initSmoothScroll();
    initParallaxEffects();
    initServiceCardHover();
    animateHeroContent();
});

// Animate hero content on page load
function animateHeroContent() {
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        gsap.from(heroContent.children, {
            opacity: 0,
            y: 50,
            duration: 1,
            stagger: 0.3,
            ease: "power2.out"
        });
    }
}

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

// Enhanced Parallax Effect
function initParallaxEffects() {
    const parallaxElements = document.querySelectorAll('.parallax');
    parallaxElements.forEach(el => {
        const speed = el.dataset.speed || 0.5;
        gsap.to(el, {
            backgroundPositionY: () => innerHeight * speed * -1,
            ease: "none",
            scrollTrigger: {
                trigger: el,
                start: "top top",
                end: "bottom top",
                scrub: true
            }
        });
    });
}

// Enhanced Scroll Animations
function initScrollAnimations() {
    // General fade-in elements
    gsap.utils.toArray('.fade-in').forEach(element => {
        gsap.from(element, { 
            opacity: 0, 
            y: 50, 
            duration: 1, 
            scrollTrigger: {
                trigger: element,
                start: "top 80%",
                toggleActions: "play none none none"
            }
        });
    });

    // Special staggered animation for service cards
    const serviceCards = gsap.utils.toArray('.service-card');
    gsap.from(serviceCards, {
        opacity: 0,
        y: 100,
        stagger: 0.2,  // Cards will animate in sequence
        duration: 0.8,
        scrollTrigger: {
            trigger: ".service-grid",
            start: "top 75%",
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
            gsap.to(window, {duration: 1, scrollTo: targetId, ease: "power2.inOut"});
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
    gsap.to(element, {
        textContent: target, 
        duration: duration / 1000, 
        ease: "power1.out",
        snap: { textContent: 1 },
        stagger: {
            each: 0.15,
            onUpdate: function() {
                this.targets()[0].innerHTML = Math.ceil(this.targets()[0].textContent);
            },
        }
    });
}

// Example: Use this where you have counter elements
// document.querySelectorAll('.counter').forEach(counter => {
//     const target = parseInt(counter.getAttribute('data-target'), 10);
//     ScrollTrigger.create({
//         trigger: counter,
//         onEnter: () => animateCounter(counter, target)
//     });
// });

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