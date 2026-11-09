
document.addEventListener("DOMContentLoaded", () => {
  const nav = document.querySelector(".site-nav");
  const toggle = nav?.querySelector(".site-nav__toggle");

  if (!nav || !toggle) return;

  const navLinks = Array.from(
    nav.querySelectorAll(".site-nav__link")
  );

  const closeMenu = () => {
    nav.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Άνοιγμα μενού");
  };

  // Hamburger toggle
  toggle.addEventListener("click", () => {
    const opened = nav.classList.toggle("is-open");

    toggle.setAttribute("aria-expanded", String(opened));
    toggle.setAttribute(
      "aria-label",
      opened ? "Κλείσιμο μενού" : "Άνοιγμα μενού"
    );
  });

  // Close menu when clicking a link
  nav.querySelectorAll(".site-nav__links a").forEach(link => {
    link.addEventListener("click", closeMenu);
  });

  // Close with Escape
  document.addEventListener("keydown", event => {
    if (event.key === "Escape") closeMenu();
  });

  // Close when clicking outside
  document.addEventListener("click", event => {
    if (!nav.contains(event.target)) closeMenu();
  });

  // Match CSS breakpoint
  window.addEventListener("resize", () => {
    if (window.innerWidth > 1024) closeMenu();
  });

  // Active section tracking
  const sections = [
      { id: "header", href: "/" },
      { id: "services", href: "#services" },
      { id: "footer-contact", href: "#footer-contact" }
  ];

  const updateActiveLink = () => {
    const navHeight = nav.offsetHeight;
    const scrollPosition = window.scrollY + navHeight + 100;

    let activeHref = "/";

    sections.forEach(({ id, href }) => {
      const section = document.getElementById(id);

      if (section && section.offsetTop <= scrollPosition) {
        activeHref = href;
      }
    });

    // Contact section belongs to the contact navigation
    const contactSection = document.getElementById("contact");

    if (
      contactSection &&
      contactSection.offsetTop <= scrollPosition
    ) {
      activeHref = "#footer-contact";
    }

    navLinks.forEach(link => {
      const isActive = link.getAttribute("href") === activeHref;

      link.classList.toggle("is-current", isActive);

      if (isActive) {
        link.setAttribute("aria-current", "location");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  };

  // Update active link efficiently during scroll
  let scrollScheduled = false;

  window.addEventListener("scroll", () => {
    if (scrollScheduled) return;

    scrollScheduled = true;

    requestAnimationFrame(() => {
      updateActiveLink();
      scrollScheduled = false;
    });
  }, { passive: true });

  updateActiveLink();
});
