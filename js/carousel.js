/**
 * Auto-Sliding Carousel with Indicators
 * A carousel that automatically transitions between slides and has indicator dots
 */

// Initialize carousel when the DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  initAutoCarousel();
});

function initAutoCarousel(targetContainer = null) {
  const galleryContainer =
    targetContainer || document.querySelector(".gallery-container");
  if (!galleryContainer) return;

  // Clear existing content and add carousel class
  galleryContainer.innerHTML = "";
  galleryContainer.classList.add("auto-carousel");

  // Add title text for accessibility
  galleryContainer.setAttribute("aria-label", "Photo Gallery");

  // Create carousel structure
  const carouselWrapper = document.createElement("div");
  carouselWrapper.className = "carousel-wrapper";

  const carouselSlides = document.createElement("div");
  carouselSlides.className = "carousel-slides";

  // Get all images from the gallery folder
  const galleryImages = [
    "biking.jpeg",
    "crossfit.jpeg",
    "goats.jpeg",
    "hydroponics.jpeg",
    "kayak.jpeg",
    "nursery.jpeg",
    "permaculture.jpeg",
    "rarotonga.jpeg",
    "singing.jpeg",
  ];

  // Add images to carousel
  galleryImages.forEach((image, index) => {
    const slide = document.createElement("div");
    slide.className = "carousel-slide";
    if (index === 0) slide.classList.add("active");

    // Enhance accessibility
    slide.setAttribute("role", "group");
    slide.setAttribute(
      "aria-label",
      `Slide ${index + 1} of ${galleryImages.length}`,
    );
    slide.setAttribute("aria-hidden", index === 0 ? "false" : "true");

    const img = document.createElement("img");
    img.alt = image.split(".")[0].replace(/_/g, " ");
    img.classList.add("carousel-image");
    img.setAttribute("loading", index < 2 ? "eager" : "lazy");

    // Add loading animation
    const loader = document.createElement("div");
    loader.className = "image-loader";
    slide.appendChild(loader);

    // Progressive loading with fade-in effect
    img.onload = function () {
      loader.style.display = "none";
      img.classList.add("loaded");

      // Add a small delay before showing to ensure smooth animation
      setTimeout(() => {
        img.style.opacity = "1";
      }, 50);
    };

    // Handle loading errors
    img.onerror = function () {
      loader.style.display = "none";
      img.src = "assets/logos/placeholder.svg";
      img.alt = "Image failed to load";
    };

    // Set source after setting up onload
    img.src = `assets/gallery/${image}`;

    // Add title to the slide
    const caption = document.createElement("div");
    caption.className = "slide-caption";
    caption.textContent = image.split(".")[0].replace(/_/g, " ");

    slide.appendChild(img);
    slide.appendChild(caption);
    carouselSlides.appendChild(slide);
  });

  // Create navigation buttons
  const prevButton = document.createElement("button");
  prevButton.className = "carousel-control prev";
  prevButton.innerHTML = "&#10094;";
  prevButton.setAttribute("aria-label", "Previous slide");

  const nextButton = document.createElement("button");
  nextButton.className = "carousel-control next";
  nextButton.innerHTML = "&#10095;";
  nextButton.setAttribute("aria-label", "Next slide");

  // Create indicators
  const indicators = document.createElement("div");
  indicators.className = "carousel-indicators";

  galleryImages.forEach((image, index) => {
    const dot = document.createElement("button");
    dot.className = "indicator-dot";
    if (index === 0) dot.classList.add("active");
    dot.setAttribute("aria-label", `Go to slide ${index + 1}`);

    // Add tooltip for better usability
    dot.title = image.split(".")[0].replace(/_/g, " ");

    dot.addEventListener("click", () => {
      goToSlide(index);
    });

    indicators.appendChild(dot);
  });

  // Add event listeners for navigation
  prevButton.addEventListener("click", () => {
    navigateSlide(-1);
    resetAutoplay();
  });

  nextButton.addEventListener("click", () => {
    navigateSlide(1);
    resetAutoplay();
  });

  // Assemble carousel
  carouselWrapper.appendChild(carouselSlides);
  carouselWrapper.appendChild(prevButton);
  carouselWrapper.appendChild(nextButton);
  carouselWrapper.appendChild(indicators);
  galleryContainer.appendChild(carouselWrapper);

  // Navigation functions
  function navigateSlide(direction) {
    const slides = document.querySelectorAll(".carousel-slide");
    const dots = document.querySelectorAll(".indicator-dot");
    let activeIndex = 0;

    // Find current active slide
    slides.forEach((slide, index) => {
      if (slide.classList.contains("active")) {
        activeIndex = index;
        slide.classList.remove("active");
        slide.setAttribute("aria-hidden", "true");
        dots[index].classList.remove("active");
      }
    });

    // Calculate new index
    let newIndex = (activeIndex + direction) % slides.length;
    if (newIndex < 0) newIndex = slides.length - 1;

    // Activate new slide and indicator
    slides[newIndex].classList.add("active");
    slides[newIndex].setAttribute("aria-hidden", "false");
    dots[newIndex].classList.add("active");

    // Preload next slide's image if it exists
    const nextIndex = (newIndex + 1) % slides.length;
    const nextSlideImg = slides[nextIndex].querySelector("img");
    if (nextSlideImg && nextSlideImg.getAttribute("loading") === "lazy") {
      nextSlideImg.setAttribute("loading", "eager");
    }

    // Announce slide change for screen readers
    const slideAnnouncer =
      document.getElementById("slide-announcer") ||
      document.createElement("div");
    if (!document.getElementById("slide-announcer")) {
      slideAnnouncer.id = "slide-announcer";
      slideAnnouncer.className = "sr-only";
      slideAnnouncer.setAttribute("aria-live", "polite");
      carouselWrapper.appendChild(slideAnnouncer);
    }

    const imgAlt = slides[newIndex].querySelector("img").alt;
    slideAnnouncer.textContent = `Now showing: ${imgAlt}, slide ${newIndex + 1} of ${slides.length}`;
  }

  function goToSlide(index) {
    const slides = document.querySelectorAll(".carousel-slide");
    const dots = document.querySelectorAll(".indicator-dot");

    // Remove active class from all slides and dots
    slides.forEach((slide, i) => {
      slide.classList.remove("active");
      slide.setAttribute("aria-hidden", "true");
      dots[i].classList.remove("active");
    });

    // Activate selected slide and dot
    slides[index].classList.add("active");
    slides[index].setAttribute("aria-hidden", "false");
    dots[index].classList.add("active");

    // Announce slide change for screen readers
    const slideAnnouncer = document.getElementById("slide-announcer");
    if (slideAnnouncer) {
      const imgAlt = slides[index].querySelector("img").alt;
      slideAnnouncer.textContent = `Now showing: ${imgAlt}, slide ${index + 1} of ${slides.length}`;
    }

    resetAutoplay();
  }

  // Autoplay functionality
  let autoplayInterval;

  function startAutoplay() {
    // Preload next image for smoother transitions
    function preloadNextImage(index) {
      const nextIndex = (index + 1) % galleryImages.length;
      const preloadImg = new Image();
      preloadImg.src = `assets/gallery/${galleryImages[nextIndex]}`;
    }

    autoplayInterval = setInterval(() => {
      // Find current active slide index
      const slides = document.querySelectorAll(".carousel-slide");
      let activeIndex = 0;
      slides.forEach((slide, index) => {
        if (slide.classList.contains("active")) {
          activeIndex = index;
        }
      });

      // Preload the next image before navigating
      preloadNextImage(activeIndex);

      // Navigate to next slide
      navigateSlide(1);
    }, 4000); // Change slide every 4 seconds for better UX
  }

  function resetAutoplay() {
    clearInterval(autoplayInterval);
    startAutoplay();

    // Add loading animation CSS
    const style = document.createElement("style");
    style.textContent = `
      .carousel-image {
        opacity: 0;
        transition: opacity 0.5s ease;
        width: 100%;
        height: 100%;
        object-fit: cover;
        will-change: opacity;
      }
      .carousel-image.loaded {
        opacity: 1;
      }
      .image-loader {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 40px;
        height: 40px;
        border: 4px solid rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        border-top-color: var(--accent);
        animation: spin 1s infinite linear;
      }
      @keyframes spin {
        0% { transform: translate(-50%, -50%) rotate(0deg); }
        100% { transform: translate(-50%, -50%) rotate(360deg); }
      }
      .sr-only {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
        border-width: 0;
      }
    `;
    document.head.appendChild(style);
  }

  // Start autoplay
  startAutoplay();

  // Pause autoplay when hovering over carousel or when user is interacting
  carouselWrapper.addEventListener("mouseenter", () => {
    clearInterval(autoplayInterval);
  });

  carouselWrapper.addEventListener("mouseleave", () => {
    startAutoplay();
  });

  // Add touch swipe support for mobile devices
  let touchStartX = 0;
  let touchEndX = 0;

  carouselWrapper.addEventListener(
    "touchstart",
    (e) => {
      touchStartX = e.changedTouches[0].screenX;
      clearInterval(autoplayInterval);
    },
    { passive: true },
  );

  carouselWrapper.addEventListener(
    "touchend",
    (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
      startAutoplay();
    },
    { passive: true },
  );

  function handleSwipe() {
    if (touchEndX < touchStartX - 50) {
      // Swipe left, go to next slide
      navigateSlide(1);
    } else if (touchEndX > touchStartX + 50) {
      // Swipe right, go to previous slide
      navigateSlide(-1);
    }
  }

  // Add keyboard navigation
  carouselWrapper.setAttribute("tabindex", "0");
  carouselWrapper.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") {
      navigateSlide(-1);
      resetAutoplay();
    } else if (e.key === "ArrowRight") {
      navigateSlide(1);
      resetAutoplay();
    }
  });

  // Pause on focus for accessibility
  carouselWrapper.addEventListener("focus", () => {
    clearInterval(autoplayInterval);
  });

  carouselWrapper.addEventListener("blur", () => {
    startAutoplay();
  });
}
