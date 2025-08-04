
// NAVIGATION BAR CODE HERE
document.addEventListener('DOMContentLoaded', function () {
    // Mobile Navigation Toggle
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const nav = document.querySelector('.nav');

    mobileNavToggle.addEventListener('click', function () {
        this.classList.toggle('active');
        nav.classList.toggle('active');
    });

    // Close mobile menu when clicking on a nav link
    const navLinks = document.querySelectorAll('.nav-list a');
    navLinks.forEach(link => {
        link.addEventListener('click', function () {
            mobileNavToggle.classList.remove('active');
            nav.classList.remove('active');
        });
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add shadow to header on scroll
    const header = document.querySelector('.header');
    window.addEventListener('scroll', function () {
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
        } else {
            header.style.boxShadow = '0 1px 3px rgba(0,0,0,0.12)';
        }
    });


});


// SCROLL TO REVEAL CODE, JUST PASTE THE CLASSES NAME WITHOUT DOT
const revealClassList = ['btn', 'client-logo-wrapper', 'about-card', 'service-card', 'testimonial-card', 'section-pre-title', 'section-title', 'section-description', 'cta-content', 'footer-col', 'footer-bottom', 'service-detail-header', 'tier', 'accordion-toggle', 'checklist li', 'steps li', 'service-detail-col h3', 'border-in-between' , 'service-nav-link' , 'floating' , 'form-group-services' , 'contact-icon' , 'contact-information' , 'contact-info-1 h2', 'contact-info-1 p' , 'hero-title' , 'hero-subtitle' , 'hero-cta' , 'story-image' , 'story-content p' , 'story-content h2' , 'stat-card' , 'values-section h2' , 'value-card h3' , 'value-card p' , 'value-icon' , 'team-card-front' , 'team-section h2'];

function setupScrollRevealByClass(classList) {
    const elementsToReveal = [];

    classList.forEach(className => {
        document.querySelectorAll(`.${className}`).forEach(el => {
            el.classList.add('js-reveal'); // Add internal reveal class
            elementsToReveal.push(el);
        });
    });

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                obs.unobserve(entry.target); // Only reveal once
            }
        });
    }, { threshold: 0.4 });

    elementsToReveal.forEach(el => observer.observe(el));
}
document.addEventListener('DOMContentLoaded', () => {
    setupScrollRevealByClass(revealClassList);
});