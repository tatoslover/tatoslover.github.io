// animations.js - Portfolio animations and interactions

// ======================
// Typewriter Effect
// ======================
function typeWriter(element, texts, speed = 100) {
  let textIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let currentText = "";

  // Removed blinking cursor for cleaner look

  function type() {
    const fullText = texts[textIndex];

    if (isDeleting) {
      currentText = fullText.substring(0, charIndex - 1);
      charIndex--;
    } else {
      currentText = fullText.substring(0, charIndex + 1);
      charIndex++;
    }

    element.textContent = currentText;

    let typeSpeed = isDeleting ? speed / 2 : speed;

    if (!isDeleting && charIndex === fullText.length) {
      typeSpeed = 2000; // Pause at end
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      textIndex = (textIndex + 1) % texts.length;
      typeSpeed = 500; // Pause before new text
    }

    setTimeout(type, typeSpeed);
  }

  type();
}

// ======================
// Particles Background
// ======================
function createParticles() {
  const particlesContainer = document.querySelector(".particles");
  if (!particlesContainer) return;

  const particleCount = 50;

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement("div");
    particle.className = "particle";
    particle.style.left = Math.random() * 100 + "%";
    particle.style.animationDelay = Math.random() * 20 + "s";
    particle.style.animationDuration = 20 + Math.random() * 10 + "s";
    particlesContainer.appendChild(particle);
  }
}

// ======================
// Scroll Reveal Animation
// ======================
function handleScrollReveal() {
  const reveals = document.querySelectorAll(".scroll-reveal, .stagger-item");
  const contactCards = document.querySelectorAll(".contact-card.scroll-reveal");

  reveals.forEach((element, index) => {
    const windowHeight = window.innerHeight;
    const elementTop = element.getBoundingClientRect().top;
    const elementVisible = 150;

    if (elementTop < windowHeight - elementVisible) {
      if (element.classList.contains("stagger-item")) {
        setTimeout(() => {
          element.classList.add("revealed");
        }, index * 100);
      } else {
        element.classList.add("revealed");
      }
    }
  });

  // Special stagger for contact cards
  contactCards.forEach((card, index) => {
    const windowHeight = window.innerHeight;
    const elementTop = card.getBoundingClientRect().top;
    const elementVisible = 150;

    if (
      elementTop < windowHeight - elementVisible &&
      !card.classList.contains("revealed")
    ) {
      setTimeout(() => {
        card.classList.add("revealed");
      }, index * 150);
    }
  });
}

// ======================
// Counter Animation
// ======================
function animateCounter(element, target, duration = 2000) {
  const start = 0;
  const increment = target / (duration / 16);
  let current = start;

  const updateCounter = () => {
    current += increment;
    if (current < target) {
      element.textContent = Math.floor(current);
      requestAnimationFrame(updateCounter);
    } else {
      element.textContent = target;
    }
  };

  updateCounter();
}

// ======================
// Skill Progress Bars (for existing skill bars if any)
// ======================
function animateSkillBars() {
  const skillBars = document.querySelectorAll(".skill-progress");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const width = entry.target.getAttribute("data-width");
          entry.target.style.width = width + "%";
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 },
  );

  skillBars.forEach((bar) => {
    observer.observe(bar);
  });
}

// ======================
// Project Skills Animation (Option D)
// ======================
function initProjectSkills() {
  const projectCards = document.querySelectorAll(".project-skill-card");

  projectCards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`;

    // Add hover effect for tech list items
    const techItems = card.querySelectorAll(".project-tech-list li");
    techItems.forEach((item, i) => {
      item.style.transitionDelay = `${i * 0.05}s`;
    });
  });
}

// ======================
// Navigation Enhancements
// ======================
function enhanceNavigation() {
  const navLinks = document.querySelectorAll(".nav-link");
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".nav-menu");

  // Smooth scroll for navigation links
  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      const href = link.getAttribute("href");
      if (href.startsWith("#")) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          const offset = 120; // Account for fixed header
          const targetPosition = target.offsetTop - offset;
          window.scrollTo({
            top: targetPosition,
            behavior: "smooth",
          });

          // Close mobile menu if open
          if (hamburger && hamburger.classList.contains("active")) {
            hamburger.classList.remove("active");
            navMenu.classList.remove("active");
          }
        }
      }
    });
  });

  // Hamburger menu animation
  if (hamburger) {
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("active");
      navMenu.classList.toggle("active");
    });
  }
}

// ======================
// Card Hover Effects
// ======================
function enhanceCards() {
  const cards = document.querySelectorAll(".card, .project-skill-card");

  cards.forEach((card) => {
    card.addEventListener("mouseenter", function (e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      this.style.setProperty("--mouse-x", `${x}px`);
      this.style.setProperty("--mouse-y", `${y}px`);
    });
  });
}

// ======================
// Loading Animation
// ======================
function showLoader() {
  const loader = document.createElement("div");
  loader.className = "loader";
  loader.innerHTML = '<div class="spinner"></div>';
  document.body.appendChild(loader);

  window.addEventListener("load", () => {
    setTimeout(() => {
      loader.style.opacity = "0";
      setTimeout(() => {
        loader.remove();
      }, 300);
    }, 500);
  });
}

// ======================
// Tooltip Enhancement
// ======================
function enhanceTooltips() {
  const tooltipElements = document.querySelectorAll("[data-tooltip]");

  tooltipElements.forEach((element) => {
    // Check if tooltip already exists
    if (element.querySelector(".tooltip")) return;

    const tooltipText = element.getAttribute("data-tooltip");
    const tooltip = document.createElement("span");
    tooltip.className = "tooltip";
    tooltip.textContent = tooltipText;

    // Create wrapper if element doesn't have position
    const computedStyle = window.getComputedStyle(element);
    if (computedStyle.position === "static") {
      element.style.position = "relative";
    }

    element.appendChild(tooltip);
  });
}

// ======================
// Initialize All Animations
// ======================
document.addEventListener("DOMContentLoaded", () => {
  // Create particles for hero section
  createParticles();

  // Initialize typewriter effect
  const typewriterElement = document.querySelector(".typewriter");
  if (typewriterElement) {
    const texts = ["Data Scientist", "Software Engineer", "Lifelong Learner"];
    typewriterElement.textContent = ""; // Clear initial text
    typeWriter(typewriterElement, texts, 100);
  }

  // Initialize navigation
  enhanceNavigation();

  // Initialize cards
  enhanceCards();

  // Initialize project skills (Option D)
  initProjectSkills();

  // Initialize scroll reveal
  handleScrollReveal();
  window.addEventListener("scroll", handleScrollReveal);

  // Initialize skill bars (if any exist)
  animateSkillBars();

  // Initialize counters
  const counters = document.querySelectorAll(".counter");
  counters.forEach((counter) => {
    const target = parseInt(counter.getAttribute("data-target"));
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(counter, target);
          observer.unobserve(counter);
        }
      });
    });
    observer.observe(counter);
  });

  // Initialize tooltips
  enhanceTooltips();

  // Re-initialize tooltips on dynamic content
  const observer = new MutationObserver(() => {
    enhanceTooltips();
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });

  // Add fade-in animation to main content
  const mainContent = document.querySelector("main");
  if (mainContent) {
    mainContent.style.opacity = "0";
    mainContent.style.transition = "opacity 0.5s ease";
    setTimeout(() => {
      mainContent.style.opacity = "1";
    }, 100);
  }
});

// ======================
// Performance Optimization
// ======================
let scrollTimeout;
window.addEventListener("scroll", () => {
  if (scrollTimeout) {
    window.cancelAnimationFrame(scrollTimeout);
  }
  scrollTimeout = window.requestAnimationFrame(() => {
    handleScrollReveal();
  });
});
