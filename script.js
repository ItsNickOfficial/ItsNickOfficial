document.addEventListener('DOMContentLoaded', function () {

    // ── TESTIMONIAL ANIMATIONS ────────────────────────────────────
    const testimonials = document.querySelectorAll('.testimonial');

    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    function checkTestimonials() {
        testimonials.forEach((testimonial, index) => {
            if (isInViewport(testimonial)) {
                testimonial.classList.add(index % 2 === 0
                    ? 'animate-slide-in-right'
                    : 'animate-slide-in-left'
                );
            }
        });
    }

    checkTestimonials();
    window.addEventListener('scroll', checkTestimonials);

    // ── MODAL ─────────────────────────────────────────────────────
    var modal = document.getElementById('supportModal');
    var supportLink = document.getElementById('support-link');
    var closeButton = document.querySelector('.close-button');
    var pageContent = document.querySelector('body > :not(#supportModal)');

    if (supportLink) {
        supportLink.onclick = function (event) {
            event.preventDefault();
            modal.classList.add('show');
            pageContent.classList.add('blur');
        };
    }

    if (closeButton) {
        closeButton.onclick = function () {
            modal.classList.remove('show');
            pageContent.classList.remove('blur');
        };
    }

    window.onclick = function (event) {
        if (event.target == modal) {
            modal.classList.remove('show');
            pageContent.classList.remove('blur');
        }
    };

    // ── FAQ ───────────────────────────────────────────────────────
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        item.addEventListener('click', function () {
            this.classList.toggle('active');
            faqItems.forEach(otherItem => {
                if (otherItem !== this) otherItem.classList.remove('active');
            });
        });
    });

    // ── INITIAL LAYOUT ────────────────────────────────────────────
    handleLayout();
});

// ── BURGER MENU (also called inline from HTML) ────────────────────
function myFunction() {
    var x = document.getElementById('myTopnav');
    var body = document.body;
    if (x.className === 'top-nav') {
        x.className += ' responsive';
        body.classList.add('no-scroll');
    } else {
        x.className = 'top-nav';
        body.classList.remove('no-scroll');
    }
}

// ── DESKTOP PANEL SWITCHER ────────────────────────────────────────
// Named function so removeEventListener can target the exact same reference
function desktopClickHandler() {
    document.querySelectorAll('.service-section.service-content').forEach((content) => {
        content.classList.remove('active');
        content.classList.add('hidden');
    });
    const targetContent = document.getElementById(this.dataset.content);
    if (!targetContent) return;
    targetContent.classList.remove('hidden');
    setTimeout(() => targetContent.classList.add('active'), 50);
}

function buildDesktopListeners() {
    document.querySelectorAll('.service-section.services-list li').forEach((item) => {
        item.addEventListener('click', desktopClickHandler);
    });

    // Show first service panel by default
    const allContent = document.querySelectorAll('.service-section.service-content');
    allContent.forEach(c => { c.classList.remove('active'); c.classList.add('hidden'); });
    if (allContent[0]) {
        allContent[0].classList.remove('hidden');
        setTimeout(() => allContent[0].classList.add('active'), 50);
    }
}

function destroyDesktopListeners() {
    document.querySelectorAll('.service-section.services-list li').forEach((item) => {
        item.removeEventListener('click', desktopClickHandler);
    });
}

// ── MOBILE ACCORDION ──────────────────────────────────────────────
function buildMobileAccordion() {
    const listItems = document.querySelectorAll('.service-section.services-list li');

    listItems.forEach(function (li) {
        const targetId = li.getAttribute('data-content');
        const sourceContent = document.getElementById(targetId);
        if (!sourceContent) return;

        const panel = document.createElement('div');
        panel.classList.add('mobile-accordion-content');
        panel.innerHTML = sourceContent.innerHTML;
        li.parentNode.insertBefore(panel, li.nextSibling);

        li.addEventListener('click', function () {
            const isOpen = li.classList.contains('accordion-open');

            document.querySelectorAll('.service-section.services-list li').forEach(el => {
                el.classList.remove('accordion-open');
            });
            document.querySelectorAll('.mobile-accordion-content').forEach(el => {
                el.classList.remove('open');
            });

            if (!isOpen) {
                li.classList.add('accordion-open');
                panel.classList.add('open');
            }
        });
    });
}

function destroyMobileAccordion() {
    document.querySelectorAll('.mobile-accordion-content').forEach(el => el.remove());
    document.querySelectorAll('.service-section.services-list li').forEach(li => {
        li.classList.remove('accordion-open');
    });
}

// ── MASTER LAYOUT HANDLER ─────────────────────────────────────────
function handleLayout() {
    const isMobile = window.innerWidth <= 768;
    const accordionBuilt = document.querySelector('.mobile-accordion-content') !== null;

    if (isMobile && !accordionBuilt) {
        destroyDesktopListeners();
        buildMobileAccordion();
    } else if (!isMobile && accordionBuilt) {
        destroyMobileAccordion();
        buildDesktopListeners();
    } else if (!isMobile && !accordionBuilt) {
        // First load on desktop
        buildDesktopListeners();
    }
}

// ── DEBOUNCED RESIZE ──────────────────────────────────────────────
let resizeTimer;
window.addEventListener('resize', function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(handleLayout, 150);
});