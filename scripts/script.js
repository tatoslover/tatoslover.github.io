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
          behaviour: "smooth",
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
      navLinks.forEach((link) => (link.style.colour = "white"));
      if (portfolioTitle) portfolioTitle.style.colour = "white";
      bars.forEach((bar) => (bar.style.backgroundColor = "white"));
    } else {
      // Top - navy background
      if (header) header.style.background = "rgba(51, 102, 153, 0.95)";
      if (navbar) navbar.style.background = "rgba(51, 102, 153, 0.95)";
      navLinks.forEach((link) => (link.style.colour = "white"));
      if (portfolioTitle) portfolioTitle.style.colour = "white";
      bars.forEach((bar) => (bar.style.backgroundColor = "white"));
    }
  });

  // Smooth scroll navigation with proper offset for consolidated header
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      if (href.startsWith("#")) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          const headerHeight =
            document.querySelector(".main-header").offsetHeight;
          const offset = headerHeight + 20; // Add small buffer
          const targetPosition = target.offsetTop - offset;
          window.scrollTo({
            top: targetPosition,
            behavior: "smooth",
          });
        }
      }
    });
  });

  // Header color change on scroll
  function handleHeaderScroll() {
    const header = document.querySelector(".main-header");
    const headerTop = document.querySelector(".header-top");
    const navbar = document.querySelector(".navbar");
    const themeToggle = document.querySelector(".theme-toggle-section");
    const body = document.body;
    const scrollPosition = window.scrollY;
    const threshold = 50; // Scroll threshold in pixels

    // Define colors
    const lightThemeScrolled = "rgba(70, 130, 180, 0.95)"; // Blue
    const darkThemeScrolled = "rgba(255, 140, 0, 0.95)"; // Orange
    const originalColor = "var(--nav-bg)";

    if (scrollPosition > threshold) {
      // Apply scrolled state
      const scrollColor = body.classList.contains("dark-theme")
        ? darkThemeScrolled
        : lightThemeScrolled;

      header.style.backgroundColor = scrollColor;
      headerTop.style.backgroundColor = scrollColor;
      navbar.style.backgroundColor = scrollColor;
      themeToggle.style.backgroundColor = scrollColor;

      header.classList.add("scrolled");
    } else {
      // Reset to original state
      header.style.backgroundColor = "";
      headerTop.style.backgroundColor = "";
      navbar.style.backgroundColor = "";
      themeToggle.style.backgroundColor = "";

      header.classList.remove("scrolled");
    }
  }

  // Add scroll event listener with throttling for performance
  let headerScrollTimeout;
  window.addEventListener("scroll", () => {
    if (headerScrollTimeout) {
      window.cancelAnimationFrame(headerScrollTimeout);
    }
    headerScrollTimeout = window.requestAnimationFrame(handleHeaderScroll);
  });

  // Initial call to set correct state
  handleHeaderScroll();

  // Theme toggle functionality
  const themeToggle = document.getElementById("theme-toggle");

  if (themeToggle) {
    const body = document.body;
    const html = document.documentElement;
    const icon = themeToggle.querySelector("i");

    // Enable manual theme control
    html.classList.add("manual-theme");

    // Check for saved theme preference or default to light
    const savedTheme = localStorage.getItem("theme") || "light";

    // Apply initial theme
    if (savedTheme === "dark") {
      body.classList.add("dark-theme");
      body.classList.remove("light-theme");
      if (icon) {
        icon.classList.remove("fa-moon");
        icon.classList.add("fa-sun");
      }
    } else {
      body.classList.add("light-theme");
      body.classList.remove("dark-theme");
      if (icon) {
        icon.classList.remove("fa-sun");
        icon.classList.add("fa-moon");
      }
    }

    // Theme toggle event listener
    themeToggle.addEventListener("click", function () {
      console.log("Theme toggle clicked");

      if (body.classList.contains("dark-theme")) {
        // Switch to light mode
        console.log("Switching to light mode");
        body.classList.remove("dark-theme");
        body.classList.add("light-theme");
        if (icon) {
          icon.classList.remove("fa-sun");
          icon.classList.add("fa-moon");
        }
        localStorage.setItem("theme", "light");
      } else {
        // Switch to dark mode
        console.log("Switching to dark mode");
        body.classList.remove("light-theme");
        body.classList.add("dark-theme");
        if (icon) {
          icon.classList.remove("fa-moon");
          icon.classList.add("fa-sun");
        }
        localStorage.setItem("theme", "dark");
      }
    });
  } else {
    console.error("Theme toggle button not found");
  }
});
