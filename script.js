document.querySelectorAll('.service-section.services-list li').forEach((item) => {
    item.addEventListener('click', function () {
      // Hide all service contents
      document.querySelectorAll('.service-section.service-content').forEach((content) => {
        content.classList.remove('active');
        content.classList.add('hidden');
      });
  
      // Get the target content
      const targetContent = document.getElementById(this.dataset.content);
  
      // Show the target content with animation
      targetContent.classList.remove('hidden');
      setTimeout(() => {
        targetContent.classList.add('active');
      }, 50);
    });
  });
// Add this script before the closing </body> tag in your HTML file
document.addEventListener("DOMContentLoaded", () => {
    const testimonials = document.querySelectorAll(".testimonial");

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
                if (index % 2 === 0) {
                    // Apply animation for the upper testimonial (from right)
                    testimonial.classList.add("animate-slide-in-right");
                } else {
                    // Apply animation for the lower testimonial (from left)
                    testimonial.classList.add("animate-slide-in-left");
                }
            }
        });
    }

    // Check initially if any testimonials are in the viewport
    checkTestimonials();

    // Add scroll event listener
    window.addEventListener("scroll", checkTestimonials);
});


  // https://penacademic.net/