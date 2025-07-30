/**
 * Main JavaScript file for portfolio website
 * Handles theme toggle functionality
 */

document.addEventListener("DOMContentLoaded", function () {
  // Initialize theme toggle immediately to prevent flash of unstyled content
  setTimeout(() => {
    initThemeToggle();
  }, 0);
});

/**
 * Initializes theme toggle functionality
 * Handles system preferences, user preferences, and toggle button interaction
 */
function initThemeToggle() {
  const themeToggle = document.getElementById("theme-toggle");
  const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");

  // Check for saved theme preference or use the system preference
  const currentTheme =
    localStorage.getItem("theme") ||
    (prefersDarkScheme.matches ? "dark" : "light");

  // Set initial theme without transition
  document.documentElement.setAttribute("data-theme", currentTheme);

  // Force reflow to apply theme immediately
  document.body.offsetHeight;

  // Add body class for theme transitions
  document.body.classList.add("theme-ready");

  // Update button state based on current theme
  updateThemeToggleIcon(currentTheme);

  // Update SVG colors based on current theme
  updateSvgColors(currentTheme);

  // Toggle theme when button is clicked
  themeToggle.addEventListener("click", function () {
    // Simple toggle without complex animations
    const currentTheme = document.documentElement.getAttribute("data-theme");
    const newTheme = currentTheme === "light" ? "dark" : "light";

    // Update the theme
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);

    // Update button appearance - simplified
    if (newTheme === "dark") {
      document.querySelector(".light-icon").style.display = "inline";
      document.querySelector(".dark-icon").style.display = "none";
    } else {
      document.querySelector(".light-icon").style.display = "none";
      document.querySelector(".dark-icon").style.display = "inline";
    }

    // Update SVG colors based on new theme
    updateSvgColors(newTheme);
  });

  // Listen for system preference changes
  prefersDarkScheme.addEventListener("change", function (e) {
    // Only update if the user hasn't manually set a preference
    if (!localStorage.getItem("theme")) {
      const newTheme = e.matches ? "dark" : "light";
      document.documentElement.setAttribute("data-theme", newTheme);
      updateThemeToggleIcon(newTheme);

      // Update SVG colors for system preference changes
      updateSvgColors(newTheme);
    }
  });
}

/**
 * Updates the theme toggle button icon based on current theme
 * @param {string} theme - The current theme ('light' or 'dark')
 */
function updateThemeToggleIcon(theme) {
  const lightIcon = document.querySelector(".light-icon");
  const darkIcon = document.querySelector(".dark-icon");

  // Simple display toggle without animations
  if (theme === "dark") {
    lightIcon.style.display = "inline";
    darkIcon.style.display = "none";
  } else {
    lightIcon.style.display = "none";
    darkIcon.style.display = "inline";
  }
}

// End of theme toggle functionality

/**
 * Adjusts SVG colors based on current theme
 * This function updates SVG shield colors to match the current theme
 */
function updateSvgColors(theme) {
  const svgShields = document.querySelectorAll(".svg-shield");

  svgShields.forEach((svg) => {
    if (theme === "dark") {
      // Add a filter to make the SVGs more visible on dark background
      svg.style.filter = "brightness(1.2) contrast(0.8) invert(0.2)";
    } else {
      // Reset filter for light mode
      svg.style.filter = "none";
    }
  });
}

// End of file
