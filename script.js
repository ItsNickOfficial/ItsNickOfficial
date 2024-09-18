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
  

  // https://penacademic.net/