(() => {
  const header = document.querySelector(".site-header");
  const toggle = document.querySelector(".nav-toggle");
  const links = document.getElementById("nav-links");
  const year = document.getElementById("year");

  if (year) year.textContent = new Date().getFullYear();

  // Header border once the page scrolls
  const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 8);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  // Mobile nav
  const setOpen = (open) => {
    toggle.setAttribute("aria-expanded", String(open));
    links.classList.toggle("is-open", open);
  };

  toggle.addEventListener("click", () => {
    setOpen(toggle.getAttribute("aria-expanded") !== "true");
  });

  links.addEventListener("click", (event) => {
    if (event.target.closest("a")) setOpen(false);
  });

  // Reveal sections as they enter the viewport
  const reveals = document.querySelectorAll(".reveal");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (reduceMotion || !("IntersectionObserver" in window)) {
    reveals.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );

  reveals.forEach((el) => observer.observe(el));
})();
