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



// Add any class names here that you want to animate
const revealClassList = ['btn', 'client-logo-wrapper', 'about-card', 'service-card', 'testimonial-card', 'hero-content', 'section-pre-title', 'section-title', 'section-description', 'cta-content', 'footer-col', 'footer-bottom', 'service-detail-header', 'tier', 'accordion-toggle', 'checklist li', 'steps li', 'service-detail-col h3', 'border-in-between'];

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



// Smooth scroll parallax effect for .cta-section
window.addEventListener("scroll", () => {
    const section = document.querySelector(".cta-section");
    if (!section) return;

    const scrollTop = window.scrollY;
    const offsetTop = section.offsetTop;
    const height = section.offsetHeight;

    if (scrollTop + window.innerHeight >= offsetTop && scrollTop <= offsetTop + height) {
        const relativeScroll = scrollTop - offsetTop;
        const parallaxSpeed = 0.6;

        section.style.setProperty('--parallax-offset', `${relativeScroll * parallaxSpeed}px`);
    }
});




































// SERVICES CUSTOM SCROLL TO SERVICE
document.addEventListener('DOMContentLoaded', function () {
    const navLinks = document.querySelectorAll('.service-nav-link');
    const sections = document.querySelectorAll('[id^="service-"]');
    const slider = document.getElementById('sliderBg');
    const nav = document.getElementById('servicesNav');

    function moveSliderToActive() {
        const activeLink = nav.querySelector('.service-nav-link.active');
        if (activeLink) {
            const offsetLeft = activeLink.offsetLeft;
            const width = activeLink.offsetWidth;
            slider.style.width = `${width}px`;
            slider.style.left = `${offsetLeft}px`;
        }
    }

    function scrollToActiveLink() {
        const activeLink = nav.querySelector('.service-nav-link.active');
        if (activeLink) {
            const navRect = nav.getBoundingClientRect();
            const linkRect = activeLink.getBoundingClientRect();

            // Calculate center positions
            const navCenter = navRect.left + navRect.width / 2;
            const linkCenter = linkRect.left + linkRect.width / 2;

            // Calculate difference to scroll so active link is centered
            const scrollOffset = linkCenter - navCenter;

            // Scroll nav horizontally by that offset smoothly
            nav.scrollBy({ left: scrollOffset, behavior: 'smooth' });
        }
    }


    function setActiveLinkById(id) {
        navLinks.forEach(link => {
            const match = link.getAttribute('href') === `#${id}`;
            link.classList.toggle('active', match);
        });
        moveSliderToActive();
        scrollToActiveLink();
    }

    // Smooth scroll on click
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            window.scrollTo({
                top: targetSection.offsetTop - 140,
                behavior: 'smooth'
            });

            // Set active immediately after scroll
            setTimeout(() => {
                setActiveLinkById(targetId.replace('#', ''));
            }, 400);
        });
    });

    // Intersection Observer to track section in view
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.3 // better for mobile
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                setActiveLinkById(id);
            }
        });
    }, observerOptions);

    sections.forEach(section => observer.observe(section));

    // Extra scroll fallback for mobile
    window.addEventListener('scroll', () => {
        let found = false;
        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            if (!found && rect.top <= 250 && rect.bottom >= 250) {
                setActiveLinkById(section.getAttribute('id'));
                found = true;
            }
        });
    });

    // Resize = re-align slider
    window.addEventListener('resize', () => {
        moveSliderToActive();
        scrollToActiveLink();
    });

    // Initial alignment
    setTimeout(() => {
        moveSliderToActive();
        scrollToActiveLink();
    }, 100);
});


// Toggle accordion panels (for Sample Deliverables, FAQs, etc.)
document.addEventListener('click', function (e) {
    const btn = e.target.closest('.accordion-toggle');
    if (!btn) return;

    const acc = btn.closest('.accordion');
    const panel = acc.querySelector('.accordion-panel');

    const expanded = acc.getAttribute('aria-expanded') === 'true';
    acc.setAttribute('aria-expanded', expanded ? 'false' : 'true');

    if (!expanded) {
        // open
        panel.style.maxHeight = panel.scrollHeight + 'px';
    } else {
        // close
        panel.style.maxHeight = 0;
    }
});

// Initialize all accordions as closed
document.querySelectorAll('.accordion').forEach(acc => {
    acc.setAttribute('aria-expanded', 'false');
    const panel = acc.querySelector('.accordion-panel');
    if (panel) panel.style.maxHeight = 0;
});