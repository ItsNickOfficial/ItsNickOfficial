
document.addEventListener("DOMContentLoaded", () => {
  const hero = document.querySelector(".hero");

  if (!hero) return;

  // Respect accessibility preferences
  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  );

  if (reducedMotion.matches) return;

  hero.classList.add("hero--animate");

  // Trigger entrance animation on the next frame
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      hero.classList.add("hero--visible");
    });
  });
});
