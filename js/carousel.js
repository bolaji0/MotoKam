/**
 * Motokam 24/7 Mobile Mechanic Services
 * Services Carousel JavaScript
 */

document.addEventListener('DOMContentLoaded', function() {
    'use strict';
    
    // ===== Variables =====
    const servicesCarousel = document.querySelector('.services-carousel');
    const prevButton = document.querySelector('.carousel-btn.prev');
    const nextButton = document.querySelector('.carousel-btn.next');
    const serviceCards = document.querySelectorAll('.service-card');
    
    if (!servicesCarousel || !prevButton || !nextButton || serviceCards.length === 0) return;
    
    // Set initial state
    let currentPosition = 0;
    let cardWidth = serviceCards[0].offsetWidth;
    let cardMargin = parseInt(window.getComputedStyle(serviceCards[0]).marginRight);
    let visibleCards = calculateVisibleCards();
    let maxPosition = serviceCards.length - visibleCards;
    
    // Calculate number of visible cards based on viewport
    function calculateVisibleCards() {
        const carouselWidth = servicesCarousel.clientWidth;
        return Math.floor(carouselWidth / (cardWidth + cardMargin));
    }
    
    // Update carousel state on window resize
    function updateCarouselState() {
        cardWidth = serviceCards[0].offsetWidth;
        cardMargin = parseInt(window.getComputedStyle(serviceCards[0]).marginRight);
        visibleCards = calculateVisibleCards();
        maxPosition = Math.max(0, serviceCards.length - visibleCards);
        
        // Adjust current position if needed
        if (currentPosition > maxPosition) {
            currentPosition = maxPosition;
            scrollToPosition(currentPosition);
        }
        
        // Update button states
        updateButtonStates();
    }
    
    // Scroll to a specific card position
    function scrollToPosition(position) {
        const scrollAmount = position * (cardWidth + cardMargin);
        servicesCarousel.scrollTo({
            left: scrollAmount,
            behavior: 'smooth'
        });
    }
    
    // Update button enabled/disabled states
    function updateButtonStates() {
        prevButton.disabled = currentPosition <= 0;
        nextButton.disabled = currentPosition >= maxPosition;
        
        prevButton.style.opacity = prevButton.disabled ? '0.5' : '1';
        nextButton.style.opacity = nextButton.disabled ? '0.5' : '1';
    }
    
    // Move to the previous slide
    function moveToPrev() {
        if (currentPosition > 0) {
            currentPosition--;
            scrollToPosition(currentPosition);
            updateButtonStates();
        }
    }
    
    // Move to the next slide
    function moveToNext() {
        if (currentPosition < maxPosition) {
            currentPosition++;
            scrollToPosition(currentPosition);
            updateButtonStates();
        }
    }
    
    // Event listeners for navigation buttons
    prevButton.addEventListener('click', moveToPrev);
    nextButton.addEventListener('click', moveToNext);
    
    // Handle keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (document.activeElement === prevButton || document.activeElement === nextButton || isElementInViewport(servicesCarousel)) {
            if (e.key === 'ArrowLeft') {
                moveToPrev();
            } else if (e.key === 'ArrowRight') {
                moveToNext();
            }
        }
    });
    
    // Check if an element is in the viewport
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
    
    // Handle touch events for swiping
    let touchStartX = 0;
    let touchEndX = 0;
    
    servicesCarousel.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
    }, false);
    
    servicesCarousel.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, false);
    
    function handleSwipe() {
        const swipeThreshold = 50;
        if (touchEndX < touchStartX - swipeThreshold) {
            // Swipe left, go to next slide
            moveToNext();
        } else if (touchEndX > touchStartX + swipeThreshold) {
            // Swipe right, go to previous slide
            moveToPrev();
        }
    }
    
    // Handle window resize
    window.addEventListener('resize', updateCarouselState);
    
    // Initialize
    updateCarouselState();
    
    // Automatic scrolling (optional)
    let autoScrollInterval;
    
    function startAutoScroll() {
        autoScrollInterval = setInterval(() => {
            if (currentPosition >= maxPosition) {
                // Reset to beginning when reaching the end
                currentPosition = 0;
            } else {
                currentPosition++;
            }
            scrollToPosition(currentPosition);
            updateButtonStates();
        }, 5000); // Scroll every 5 seconds
    }
    
    function stopAutoScroll() {
        clearInterval(autoScrollInterval);
    }
    
    // Pause auto-scroll on hover or interaction
    servicesCarousel.addEventListener('mouseenter', stopAutoScroll);
    servicesCarousel.addEventListener('touchstart', stopAutoScroll);
    prevButton.addEventListener('mouseenter', stopAutoScroll);
    nextButton.addEventListener('mouseenter', stopAutoScroll);
    
    // Resume auto-scroll when not interacting
    servicesCarousel.addEventListener('mouseleave', startAutoScroll);
    
    // Start auto-scrolling
    startAutoScroll();
});
