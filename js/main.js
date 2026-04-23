document.addEventListener("DOMContentLoaded", function () {
  initTheme();
  initHamburger();
  initScrollSpy();
  initBackToTop();
  initScrollReveal();
});

// ===== THEME =====

function initTheme() {
  const saved = localStorage.getItem("theme") || "dark";
  applyTheme(saved, false);

  document.getElementById("theme-toggle").addEventListener("click", () => {
    const current = document.documentElement.getAttribute("data-theme");
    const next = current === "dark" ? "light" : "dark";
    localStorage.setItem("theme", next);
    applyTheme(next, true);
  });
}

function applyTheme(theme, animate) {
  const html = document.documentElement;
  if (animate) html.style.transition = "background-color 0.3s ease";
  html.setAttribute("data-theme", theme);
  const toggle = document.getElementById("theme-toggle");
  if (toggle) toggle.textContent = theme === "dark" ? "☀" : "☾";
  updateSvgColors(theme);
}

function updateSvgColors(theme) {
  const svgShields = document.querySelectorAll(".svg-shield:not(.academic-logo)");
  const filter = theme === "dark"
    ? "brightness(1.2) contrast(0.8) invert(0.2)"
    : "brightness(0.7) contrast(1.1)";
  svgShields.forEach((svg) => { svg.style.filter = filter; });
}

// ===== HAMBURGER =====

function initHamburger() {
  const hamburger = document.getElementById("hamburger");
  const header = hamburger.closest("header");
  const navLinks = document.querySelectorAll("#main-nav a");

  hamburger.addEventListener("click", () => {
    const isOpen = header.classList.toggle("nav-open");
    hamburger.setAttribute("aria-expanded", isOpen);
  });

  // Close on nav link click
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      header.classList.remove("nav-open");
      hamburger.setAttribute("aria-expanded", "false");
    });
  });

  // Close when clicking outside
  document.addEventListener("click", (e) => {
    if (!header.contains(e.target)) {
      header.classList.remove("nav-open");
      hamburger.setAttribute("aria-expanded", "false");
    }
  });
}

// ===== SCROLL SPY =====

function initScrollSpy() {
  const sections = document.querySelectorAll("main section[id]");
  const navLinks = document.querySelectorAll("#main-nav a");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          navLinks.forEach((link) => {
            link.classList.toggle(
              "active",
              link.getAttribute("href") === `#${entry.target.id}`
            );
          });
        }
      });
    },
    { threshold: 0.4 }
  );

  sections.forEach((section) => observer.observe(section));
}

// ===== SCROLL REVEAL =====

function initScrollReveal() {
  const elements = document.querySelectorAll(".scroll-reveal");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  elements.forEach((el) => observer.observe(el));
}

// ===== BACK TO TOP =====

function initBackToTop() {
  const btn = document.getElementById("back-to-top");
  const firstSection = document.querySelector("main section");

  const observer = new IntersectionObserver(
    ([entry]) => btn.classList.toggle("visible", !entry.isIntersecting),
    { threshold: 0 }
  );

  if (firstSection) observer.observe(firstSection);

  btn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}
