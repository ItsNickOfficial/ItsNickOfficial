
document.addEventListener('DOMContentLoaded', function () {

    // ── TESTIMONIAL ANIMATIONS ────────────────────────────────
    const testimonials = document.querySelectorAll('.testimonial');

    function isInViewport(element) {
        const rect = element.getBoundingClientRect();

        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= window.innerHeight &&
            rect.right <= window.innerWidth
        );
    }

    function checkTestimonials() {
        testimonials.forEach((testimonial, index) => {
            if (isInViewport(testimonial)) {
                testimonial.classList.add(
                    index % 2 === 0
                        ? 'animate-slide-in-right'
                        : 'animate-slide-in-left'
                );
            }
        });
    }

    checkTestimonials();
    window.addEventListener('scroll', checkTestimonials);

});
