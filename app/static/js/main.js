gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', () => {
    initNavbarScroll();
    initScrollAnimations();
    initSmoothScroll();
    initParallaxEffects();
    initServiceCardHover();
    animateHeroContent();
});

function animateHeroContent() {
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        gsap.set(heroContent.children, {opacity: 0, y: 50});  // Set everything invisible initially

        gsap.to(heroContent.children, {  
            opacity: 1,
            y: 0,
            duration: 1,
            stagger: 0.3,
            ease: "power2.out"
        });
    }
}

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

function initScrollAnimations() {
    gsap.utils.toArray('.fade-in').forEach(element => {
        gsap.from(element, {
            opacity: 0, 
            y: 50, 
            duration: 1,
            scrollTrigger: {
                trigger: element,
                start: "top 80%",
                toggleActions: "play none none none"
            },
            onComplete: () => {
                gsap.set(element, { opacity: 1, y: 0 });
            }
        });
    });

    const serviceCards = gsap.utils.toArray('.service-card');
    gsap.from(serviceCards, {
        opacity: 0,
        y: 100,
        stagger: 0.2,
        duration: 0.8,
        scrollTrigger: {
            trigger: ".service-grid",
            start: "top 75%",
        },
        onComplete: () => {
            gsap.set(serviceCards, { opacity: 1, y: 0 });
        }
    });
}

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

document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    mobileMenuToggle.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        this.classList.toggle('active');
    });
});