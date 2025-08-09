/**
 * Connect Card Hover Effects
 * Adds lifting animation to Connect With Me cards
 */

document.addEventListener("DOMContentLoaded", function () {
  initConnectCardEffects();
});

/**
 * Initializes hover effects for Connect Cards
 */
function initConnectCardEffects() {
  // Ensure this script runs after a slight delay to make sure DOM is fully ready
  setTimeout(() => {
    const connectCards = document.querySelectorAll("#connect .connect-card");

    // No cards found, exit early
    if (!connectCards.length) return;

    initLiftEffect(connectCards);
  }, 100);
}

/**
 * Initializes the lift effect for the provided cards
 * @param {NodeList} connectCards - The cards to apply the effect to
 */
function initLiftEffect(connectCards) {
  // Configure lift effect settings
  const settings = {
    liftAmount: 15, // Pixels to lift on hover
    scale: 1.03, // Scale on hover
    speed: 300, // Speed of the transition in ms
    easing: "cubic-bezier(0.25, 0.46, 0.45, 0.94)", // Easing for smooth animation
  };

  console.log(`Applying lift effect to ${connectCards.length} connect cards`);

  // Apply effect to each card
  connectCards.forEach((card) => {
    // Disable existing CSS hover effects
    card.classList.add("js-hover-enabled");

    // Variables to track card state
    let timeout = null;

    // Add event listeners
    card.addEventListener("mouseenter", handleMouseEnter);
    card.addEventListener("mouseleave", handleMouseLeave);

    // Apply initial transition styles
    card.style.transition = `transform ${settings.speed}ms ${settings.easing},
                            box-shadow ${settings.speed}ms ${settings.easing}`;
    card.style.willChange = "transform, box-shadow";

    // Cache initial box-shadow for reference
    const initialBoxShadow = window.getComputedStyle(card).boxShadow;

    /**
     * Handle mouse enter
     */
    function handleMouseEnter() {
      // Clear timeout if it exists
      if (timeout !== null) {
        clearTimeout(timeout);
        timeout = null;
      }

      // Add active class for CSS interactions
      card.classList.add("lift-active");

      // Apply lifting transform
      card.style.transform = `translateY(-${settings.liftAmount}px) scale(${settings.scale})`;

      // Apply enhanced shadow
      card.style.boxShadow = `0 ${settings.liftAmount}px 30px rgba(0, 0, 0, 0.2)`;
    }

    /**
     * Handle mouse leave
     */
    function handleMouseLeave() {
      card.classList.remove("lift-active");

      // Reset transform with a small delay to ensure smooth animation
      timeout = setTimeout(() => {
        // Reset transform and shadow to initial values
        card.style.transform = "";
        card.style.boxShadow = initialBoxShadow;
      }, 50);
    }
  });

  // Add styles
  const style = document.createElement("style");
  style.textContent = `
    .lift-active {
      z-index: 10 !important;
    }
    /* Disable CSS hover effects when JS is active */
    #connect .js-hover-enabled:hover {
      transform: none !important;
      background-color: var(--accent) !important;
      box-shadow: none !important;
    }
    /* Ensure text/icon colors change on hover with JS */
    #connect .js-hover-enabled.lift-active h3,
    #connect .js-hover-enabled.lift-active p,
    #connect .js-hover-enabled.lift-active .card-link-text {
      color: var(--text-black) !important;
    }
    #connect .js-hover-enabled.lift-active .connect-icon img {
      filter: brightness(0) saturate(100%) invert(100%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(100%) contrast(100%) !important;
    }
  `;
  document.head.appendChild(style);
}
