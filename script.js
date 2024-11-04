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

document.addEventListener("DOMContentLoaded", function () {
  // Get the modal element
  var modal = document.getElementById("supportModal");

  // Get the button/link that opens the modal
  var supportLink = document.getElementById("support-link");

  // Get the <span> element that closes the modal
  var closeButton = document.querySelector(".close-button");

  // Get the main page content to blur
  var pageContent = document.querySelector("body > :not(#supportModal)");

  // When the user clicks on the "Support" link, open the modal
  supportLink.onclick = function (event) {
      event.preventDefault(); // Prevent default anchor behavior
      modal.classList.add("show");
      pageContent.classList.add("blur");
  }

  // When the user clicks on <span> (x), close the modal
  closeButton.onclick = function () {
      modal.classList.remove("show");
      pageContent.classList.remove("blur");
  }

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function (event) {
      if (event.target == modal) {
          modal.classList.remove("show");
          pageContent.classList.remove("blur");
      }
  }
});

// FAQ
document.addEventListener('DOMContentLoaded', function () {
  // Select all the FAQ items, not just the question
  const faqItems = document.querySelectorAll('.faq-item');
  
  // Add a click event listener to each faq-item
  faqItems.forEach(item => {
      item.addEventListener('click', function () {
          // Toggle the active class to show or hide the answer
          this.classList.toggle('active');
          
          // Close other open FAQs (Accordion behavior)
          faqItems.forEach(otherItem => {
              if (otherItem !== this) {
                  otherItem.classList.remove('active');
              }
          });
      });
  });
});


  // https://penacademic.net/