
/* =========================================
   ACADEMIC HELP — TESTIMONIALS CAROUSEL
   ========================================= */

document.addEventListener('DOMContentLoaded', () => {
    const carousel = document.querySelector('.testimonials-carousel');
    if (!carousel) return;

    const viewport = carousel.querySelector(
        '.testimonials-carousel__viewport'
    );
    const track = carousel.querySelector(
        '.testimonials-carousel__track'
    );
    const cards = [...track.querySelectorAll('.testimonial-card')];
    const controls = carousel.querySelector(
        '.testimonials-carousel__controls'
    );
    const counter = carousel.querySelector(
        '.testimonials-carousel__counter'
    );
    const prevButton = carousel.querySelector('[data-direction="prev"]');
    const nextButton = carousel.querySelector('[data-direction="next"]');

    if (!cards.length) return;

    const reducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
    );

    let currentIndex = 0;
    let autoPlayTimer = null;
    let touchStartX = null;
    let touchStartY = null;

    const AUTOPLAY_DELAY = 6000;

    function visibleCount() {
        return window.matchMedia('(max-width: 650px)').matches ? 1 : 2;
    }

    function maxIndex() {
        return Math.max(0, cards.length - visibleCount());
    }

    function updateCarousel() {
        const count = visibleCount();
        const max = maxIndex();

        currentIndex = Math.min(currentIndex, max);

        const firstCard = cards[0];
        const step = cards.length > 1
            ? cards[1].offsetLeft - firstCard.offsetLeft
            : firstCard.getBoundingClientRect().width;

        track.style.transform =
            `translateX(-${currentIndex * step}px)`;

        const hasOverflow = cards.length > count;
        controls.hidden = !hasOverflow;

        viewport.setAttribute(
            'aria-label',
            hasOverflow
                ? 'Αξιολογήσεις. Χρησιμοποίησε τα βελάκια ή σύρε για πλοήγηση.'
                : 'Αξιολογήσεις πελατών'
        );

        counter.textContent =
            `${currentIndex + 1} / ${max + 1}`;
    }

    function goTo(index) {
        const max = maxIndex();

        if (index > max) {
            currentIndex = 0;
        } else if (index < 0) {
            currentIndex = max;
        } else {
            currentIndex = index;
        }

        updateCarousel();
    }

    function stopAutoPlay() {
        if (autoPlayTimer !== null) {
            window.clearInterval(autoPlayTimer);
            autoPlayTimer = null;
        }
    }

    function startAutoPlay() {
        stopAutoPlay();

        if (
            maxIndex() === 0 ||
            reducedMotion.matches ||
            document.hidden
        ) {
            return;
        }

        autoPlayTimer = window.setInterval(() => {
            goTo(currentIndex + 1);
        }, AUTOPLAY_DELAY);
    }

    prevButton.addEventListener('click', () => {
        goTo(currentIndex - 1);
        startAutoPlay();
    });

    nextButton.addEventListener('click', () => {
        goTo(currentIndex + 1);
        startAutoPlay();
    });

    carousel.addEventListener('mouseenter', stopAutoPlay);
    carousel.addEventListener('mouseleave', startAutoPlay);

    carousel.addEventListener('focusin', stopAutoPlay);
    carousel.addEventListener('focusout', event => {
        if (!carousel.contains(event.relatedTarget)) {
            startAutoPlay();
        }
    });

    viewport.addEventListener('keydown', event => {
        if (event.key === 'ArrowRight') {
            event.preventDefault();
            goTo(currentIndex + 1);
        } else if (event.key === 'ArrowLeft') {
            event.preventDefault();
            goTo(currentIndex - 1);
        }
    });

    viewport.addEventListener('touchstart', event => {
        touchStartX = event.touches[0].clientX;
        touchStartY = event.touches[0].clientY;
        stopAutoPlay();
    }, { passive: true });

    viewport.addEventListener('touchend', event => {
        if (touchStartX === null || touchStartY === null) return;

        const deltaX = event.changedTouches[0].clientX - touchStartX;
        const deltaY = event.changedTouches[0].clientY - touchStartY;

        if (
            Math.abs(deltaX) > 50 &&
            Math.abs(deltaX) > Math.abs(deltaY)
        ) {
            goTo(currentIndex + (deltaX < 0 ? 1 : -1));
        }

        touchStartX = null;
        touchStartY = null;
        startAutoPlay();
    }, { passive: true });

    viewport.addEventListener('touchcancel', () => {
        touchStartX = null;
        touchStartY = null;
        startAutoPlay();
    });

    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            stopAutoPlay();
        } else {
            startAutoPlay();
        }
    });

    window.addEventListener('resize', () => {
        updateCarousel();
        startAutoPlay();
    });

    reducedMotion.addEventListener('change', startAutoPlay);

    updateCarousel();
    startAutoPlay();
});
