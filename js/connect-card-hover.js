/**
 * Connect Card Hover Effects
 * Adds subtle 3D tilt and interactive hover effects to Connect With Me cards
 */

document.addEventListener("DOMContentLoaded", function () {
  initConnectCardEffects();
});

/**
 * Initializes hover effects for Connect Cards
 */
function initConnectCardEffects() {
  const connectCards = document.querySelectorAll("#connect .connect-card");

  // No cards found, exit early
  if (!connectCards.length) return;

  // Configure tilt effect settings
  const settings = {
    max: 15,          // Maximum tilt rotation (degrees)
    perspective: 1000, // Perspective value for 3D space
    scale: 1.05,      // Scale on hover
    speed: 500,       // Speed of the transition
    easing: "cubic-bezier(.03,.98,.52,.99)" // Easing for smooth animation
  };

  // Apply effect to each card
  connectCards.forEach(card => {
    // Add perspective to parent for 3D effect
    card.style.perspective = `${settings.perspective}px`;

    // Variables to track card state
    let isHovering = false;
    let timeout = null;

    // Add event listeners
    card.addEventListener("mouseenter", handleMouseEnter);
    card.addEventListener("mousemove", handleMouseMove);
    card.addEventListener("mouseleave", handleMouseLeave);
    card.addEventListener("click", handleClick);

    // Apply initial transition styles
    card.style.transition = `transform ${settings.speed}ms ${settings.easing}`;

    // Cache card dimensions for performance
    let cardRect = card.getBoundingClientRect();

    // Update card dimensions on window resize
    window.addEventListener("resize", () => {
      cardRect = card.getBoundingClientRect();
    });

    /**
     * Handle mouse enter
     */
    function handleMouseEnter() {
      isHovering = true;

      // Update card dimensions in case they changed
      cardRect = card.getBoundingClientRect();

      // Clear timeout if it exists
      if (timeout !== null) {
        clearTimeout(timeout);
        timeout = null;
      }

      // Add active class for CSS interactions
      card.classList.add("tilt-active");

      // Force a card transform update based on current mouse position
      const event = new MouseEvent("mousemove", {
        clientX: cardRect.left + cardRect.width / 2,
        clientY: cardRect.top + cardRect.height / 2
      });
      card.dispatchEvent(event);
    }

    /**
     * Handle mouse move to calculate tilt
     * @param {MouseEvent} event - Mouse move event
     */
    function handleMouseMove(event) {
      if (!isHovering) return;

      // Get mouse position relative to card
      const mouseX = event.clientX - cardRect.left;
      const mouseY = event.clientY - cardRect.top;

      // Calculate rotation based on mouse position
      // When mouse is at center, tiltX and tiltY are 0
      // When mouse is at edge, tilt reaches maximum value
      const tiltX = ((settings.max / 2) - (mouseY / cardRect.height * settings.max)).toFixed(2);
      const tiltY = ((mouseX / cardRect.width * settings.max) - (settings.max / 2)).toFixed(2);

      // Apply transform to the card
      card.style.transform = `
        perspective(${settings.perspective}px)
        rotateX(${tiltX}deg)
        rotateY(${tiltY}deg)
        scale3d(${settings.scale}, ${settings.scale}, ${settings.scale})
      `;

      // Add a subtle shadow shift based on tilt
      const shadowX = (tiltY / settings.max * 10).toFixed(2);
      const shadowY = (tiltX / settings.max * 10).toFixed(2);
      card.style.boxShadow = `
        ${shadowX}px ${shadowY}px 20px rgba(0, 0, 0, 0.2)
      `;
    }

    /**
     * Handle mouse leave
     */
    function handleMouseLeave() {
      isHovering = false;
      card.classList.remove("tilt-active");

      // Reset transform with a small delay to ensure smooth animation
      timeout = setTimeout(() => {
        card.style.transform = `
          perspective(${settings.perspective}px)
          rotateX(0deg)
          rotateY(0deg)
          scale3d(1, 1, 1)
        `;
        card.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)";
      }, 50);
    }

    /**
     * Handle card click - add a ripple effect
     * @param {MouseEvent} event - Click event
     */
    function handleClick(event) {
      // Create ripple element
      const ripple = document.createElement("div");
      ripple.className = "card-ripple";

      // Position ripple at click point
      const rect = card.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;

      // Add ripple to card
      card.appendChild(ripple);

      // Remove ripple after animation
      setTimeout(() => {
        ripple.remove();
      }, 600);
    }
  });

  // Add ripple effect styles
  const style = document.createElement("style");
  style.textContent = `
    #connect .connect-card {
      overflow: hidden;
    }
    .card-ripple {
      position: absolute;
      width: 10px;
      height: 10px;
      background: rgba(255, 255, 255, 0.6);
      border-radius: 50%;
      transform: scale(0);
      animation: ripple 0.6s linear;
      pointer-events: none;
    }
    @keyframes ripple {
      to {
        transform: scale(30);
        opacity: 0;
      }
    }
    .tilt-active {
      z-index: 1;
    }
  `;
  document.head.appendChild(style);
}
