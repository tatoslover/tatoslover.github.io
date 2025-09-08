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

// Disable profile image animations when the page loads
document.addEventListener("DOMContentLoaded", function () {
  disableProfileImageAnimations();
});

/**
 * Function to disable all profile image animations
 */
function disableProfileImageAnimations() {
  const profileImage = document.querySelector(".profile-image");
  const profileImageImg = document.querySelector(".profile-image img");

  if (profileImage) {
    // Stop any existing animations
    profileImage.style.animation = "none";
    profileImage.style.transform = "none";
    profileImage.style.transition = "none";

    // Prevent any future animations
    profileImage.style.animationName = "none !important";
    profileImage.style.animationDuration = "0s !important";
    profileImage.style.transformStyle = "flat !important";
  }

  if (profileImageImg) {
    // Stop any existing animations on the image
    profileImageImg.style.animation = "none";
    profileImageImg.style.transform = "none";
    profileImageImg.style.transition = "none";

    // Prevent any future animations
    profileImageImg.style.animationName = "none !important";
    profileImageImg.style.animationDuration = "0s !important";
  }
}

/**
 * Initializes theme toggle functionality
 * Handles system preferences, user preferences, and toggle button interaction
 */
function initThemeToggle() {
  // Always use dark mode only
  const currentTheme = "dark";

  // Apply dark theme immediately
  document.documentElement.setAttribute("data-theme", currentTheme);

  // Force reflow to apply theme immediately
  document.body.offsetHeight;

  // Add body class for theme transitions
  document.body.classList.add("theme-ready");

  // Update SVG colors for dark mode
  updateSvgColors();

  // Remove theme toggle button from DOM completely
  const themeToggle = document.getElementById("theme-toggle");
  if (themeToggle && themeToggle.parentNode) {
    themeToggle.parentNode.removeChild(themeToggle);
  }
}

/**
 * This function has been removed as we no longer need theme toggle functionality
 * The site now always uses dark mode
 */

// End of theme toggle functionality

/**
 * Adjusts SVG colors for dark mode
 * This function updates SVG shield colors to be visible on dark background
 */
function updateSvgColors() {
  // Call function to disable profile image animations
  disableProfileImageAnimations();

  const svgShields = document.querySelectorAll(
    ".svg-shield:not(.academic-logo)",
  );

  svgShields.forEach((svg) => {
    // Always apply dark mode filter
    svg.style.filter = "brightness(1.2) contrast(0.8) invert(0.2)";
  });
}

// End of file
