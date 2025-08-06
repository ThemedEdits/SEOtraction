
// SERVICES CUSTOM SCROLL INDICATOR
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



// HIDATION OF SERVICE-WRAPPER WHEN SERVICE-DETAIL IS GONE
document.addEventListener('DOMContentLoaded', function () {
    const navWrapper = document.querySelector('.services-nav-wrapper');
    const serviceDetails = document.querySelectorAll('.accordion-panel');

    if (!navWrapper || serviceDetails.length === 0) return;

    const lastDetail = serviceDetails[serviceDetails.length - 1];

    const hidePercent = 20;

    window.addEventListener('scroll', () => {
        const lastRect = lastDetail.getBoundingClientRect();
        const triggerPoint = window.innerHeight * (hidePercent / 100);

        if (lastRect.bottom <= triggerPoint) {
            navWrapper.classList.add('hide');
        } else {
            navWrapper.classList.remove('hide');
        }
    });

});