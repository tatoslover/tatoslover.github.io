document.addEventListener("DOMContentLoaded", function () {
  // Mobile navigation menu toggle
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".nav-menu");

  if (hamburger && navMenu) {
    hamburger.addEventListener("click", function () {
      hamburger.classList.toggle("active");
      navMenu.classList.toggle("active");
    });

    // Close mobile menu when clicking on a nav link
    document.querySelectorAll(".nav-link").forEach((n) =>
      n.addEventListener("click", () => {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
      }),
    );
  }

  // Collapsible project sections
  const collapsibles = document.querySelectorAll(".collapsible");

  collapsibles.forEach((button) => {
    const content = button.nextElementSibling;
    const label = button.querySelector(".toggle-label");

    // Start with content hidden
    content.classList.remove("expanded");
    label.textContent = "Expand";

    button.addEventListener("click", function () {
      const isExpanded = content.classList.contains("expanded");

      if (isExpanded) {
        content.classList.remove("expanded");
        label.textContent = "Expand";
      } else {
        content.classList.add("expanded");
        label.textContent = "Hide";
      }
    });
  });

  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        const offsetTop = target.offsetTop - 120; // Account for fixed header and navbar
        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        });
      }
    });
  });

  // Add scroll effect to header and navbar
  window.addEventListener("scroll", function () {
    const header = document.querySelector(".main-header");
    const navbar = document.querySelector(".navbar");
    const navLinks = document.querySelectorAll(".nav-link");
    const portfolioTitle = document.querySelector(".portfolio-title");
    const bars = document.querySelectorAll(".bar");

    if (window.scrollY > 100) {
      // Scrolled - orange/copper background
      if (header) header.style.background = "rgba(204, 102, 51, 0.95)";
      if (navbar) navbar.style.background = "rgba(204, 102, 51, 0.95)";
      navLinks.forEach((link) => (link.style.color = "white"));
      if (portfolioTitle) portfolioTitle.style.color = "white";
      bars.forEach((bar) => (bar.style.backgroundColor = "white"));
    } else {
      // Top - navy background
      if (header) header.style.background = "rgba(51, 102, 153, 0.95)";
      if (navbar) navbar.style.background = "rgba(51, 102, 153, 0.95)";
      navLinks.forEach((link) => (link.style.color = "white"));
      if (portfolioTitle) portfolioTitle.style.color = "white";
      bars.forEach((bar) => (bar.style.backgroundColor = "white"));
    }
  });
});
