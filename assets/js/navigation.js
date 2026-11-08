
document.addEventListener("DOMContentLoaded", () => {
  const nav = document.querySelector(".site-nav");
  const toggle = nav?.querySelector(".site-nav__toggle");

  if (!nav || !toggle) return;

  const closeMenu = () => {
    nav.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Άνοιγμα μενού");
  };

  toggle.addEventListener("click", () => {
    const opened = nav.classList.toggle("is-open");

    toggle.setAttribute("aria-expanded", String(opened));
    toggle.setAttribute(
      "aria-label",
      opened ? "Κλείσιμο μενού" : "Άνοιγμα μενού"
    );
  });

  nav.querySelectorAll(".site-nav__links a").forEach(link => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("keydown", event => {
    if (event.key === "Escape") closeMenu();
  });

  document.addEventListener("click", event => {
    if (!nav.contains(event.target)) closeMenu();
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 800) closeMenu();
  });
});
