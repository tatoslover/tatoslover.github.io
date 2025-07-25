/**
 * Simple Carousel for Gallery
 *
 * A lightweight carousel implementation that automatically rotates through slides
 * and allows for navigation via arrows and indicator dots.
 *
 * @author Samuel Love
 */

document.addEventListener('DOMContentLoaded', () => {
    // Get carousel elements
    const slides = document.querySelectorAll('.carousel-slide');
    const prevButton = document.querySelector('.prev-btn');
    const nextButton = document.querySelector('.next-btn');
    const indicators = document.querySelectorAll('.indicator');

    // Set up variables
    let currentSlide = 0;
    let slideInterval;
    let isPlaying = true;

    // Initialize the carousel
    function initCarousel() {
        // Hide all slides except the first one
        updateSlides();

        // Start auto sliding
        startSlideshow();

        // Set up event listeners
        setupEventListeners();
    }

    // Update slides based on currentSlide index
    function updateSlides() {
        // Hide all slides
        slides.forEach(slide => {
            slide.classList.remove('active');
            slide.setAttribute('aria-hidden', 'true');
        });

        // Show current slide
        slides[currentSlide].classList.add('active');
        slides[currentSlide].setAttribute('aria-hidden', 'false');

        // Update indicators
        indicators.forEach((indicator, index) => {
            if (index === currentSlide) {
                indicator.classList.add('active');
                indicator.setAttribute('aria-current', 'true');
            } else {
                indicator.classList.remove('active');
                indicator.setAttribute('aria-current', 'false');
            }
        });
    }

    // Go to a specific slide
    function goToSlide(index) {
        currentSlide = index;
        updateSlides();
    }

    // Go to the next slide
    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        updateSlides();
    }

    // Go to the previous slide
    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        updateSlides();
    }

    // Start the slideshow
    function startSlideshow() {
        stopSlideshow(); // Clear any existing interval
        isPlaying = true;
        slideInterval = setInterval(() => {
            // Only advance if user is not interacting and page is visible
            if (!document.hidden && isPlaying) {
                nextSlide();
            }
        }, 5000); // Change slide every 5 seconds
    }

    // Stop the slideshow
    function stopSlideshow() {
        clearInterval(slideInterval);
    }

    // Set up event listeners
    function setupEventListeners() {
        // Previous button
        prevButton.addEventListener('click', () => {
            prevSlide();
            stopSlideshow();
            startSlideshow(); // Reset timer
        });

        // Next button
        nextButton.addEventListener('click', () => {
            nextSlide();
            stopSlideshow();
            startSlideshow(); // Reset timer
        });

        // Indicator buttons
        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                goToSlide(index);
                stopSlideshow();
                startSlideshow(); // Reset timer
            });
        });

        // Pause on hover
        const carouselContainer = document.querySelector('.carousel-container');
        carouselContainer.addEventListener('mouseenter', () => {
            isPlaying = false;
        });

        carouselContainer.addEventListener('mouseleave', () => {
            isPlaying = true;
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            // Only respond to keyboard when carousel is in viewport
            const rect = carouselContainer.getBoundingClientRect();
            const isInViewport = (
                rect.top >= 0 &&
                rect.left >= 0 &&
                rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
                rect.right <= (window.innerWidth || document.documentElement.clientWidth)
            );

            if (isInViewport) {
                if (e.key === 'ArrowLeft') {
                    prevSlide();
                    stopSlideshow();
                    startSlideshow(); // Reset timer
                } else if (e.key === 'ArrowRight') {
                    nextSlide();
                    stopSlideshow();
                    startSlideshow(); // Reset timer
                }
            }
        });

        // Handle visibility change (tab switching, etc.)
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                stopSlideshow();
            } else {
                startSlideshow();
            }
        });

        // Touch swipe support
        let touchStartX = 0;
        let touchEndX = 0;

        carouselContainer.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        carouselContainer.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, { passive: true });

        function handleSwipe() {
            const swipeThreshold = 50;
            const swipeDistance = touchEndX - touchStartX;

            if (Math.abs(swipeDistance) > swipeThreshold) {
                if (swipeDistance < 0) {
                    // Swipe left - next slide
                    nextSlide();
                } else {
                    // Swipe right - previous slide
                    prevSlide();
                }
                stopSlideshow();
                startSlideshow(); // Reset timer
            }
        }
    }

    // Initialize the carousel
    initCarousel();
});
