/**
 * Motokam 24/7 Mobile Mechanic Services
 * Testimonials Slider JavaScript
 */

document.addEventListener('DOMContentLoaded', function() {
    'use strict';
    
    // ===== Variables =====
    const testimonialSlides = document.querySelectorAll('.testimonial-slide');
    const sliderDots = document.querySelectorAll('.slider-dot');
    
    if (testimonialSlides.length === 0 || sliderDots.length === 0) return;
    
    let currentSlide = 0;
    let autoSlideInterval;
    
    // Function to show a specific slide
    function showSlide(index) {
        // Hide all slides
        testimonialSlides.forEach(slide => {
            slide.classList.remove('active');
            slide.style.opacity = '0';
        });
        
        // Deactivate all dots
        sliderDots.forEach(dot => {
            dot.classList.remove('active');
        });
        
        // Show the selected slide
        testimonialSlides[index].classList.add('active');
        testimonialSlides[index].style.opacity = '1';
        
        // Activate the corresponding dot
        sliderDots[index].classList.add('active');
        
        // Update current slide index
        currentSlide = index;
    }
    
    // Function to move to the next slide
    function nextSlide() {
        const newIndex = (currentSlide + 1) % testimonialSlides.length;
        showSlide(newIndex);
    }
    
    // Function to move to the previous slide
    function prevSlide() {
        const newIndex = (currentSlide - 1 + testimonialSlides.length) % testimonialSlides.length;
        showSlide(newIndex);
    }
    
    // Set up click event listeners for the dots
    sliderDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            resetAutoSlide();
            showSlide(index);
        });
    });
    
    // Set up keyboard navigation
    document.addEventListener('keydown', function(e) {
        const testimonialSection = document.querySelector('.testimonials-section');
        const sectionRect = testimonialSection.getBoundingClientRect();
        
        // Only navigate if the testimonial section is in view
        if (sectionRect.top < window.innerHeight && sectionRect.bottom > 0) {
            if (e.key === 'ArrowLeft') {
                resetAutoSlide();
                prevSlide();
            } else if (e.key === 'ArrowRight') {
                resetAutoSlide();
                nextSlide();
            }
        }
    });
    
    // Set up touch swipe functionality
    const testimonialContainer = document.querySelector('.testimonial-container');
    let touchStartX = 0;
    let touchEndX = 0;
    
    testimonialContainer.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
    }, false);
    
    testimonialContainer.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, false);
    
    function handleSwipe() {
        const swipeThreshold = 50;
        if (touchEndX < touchStartX - swipeThreshold) {
            // Swipe left, go to next slide
            resetAutoSlide();
            nextSlide();
        } else if (touchEndX > touchStartX + swipeThreshold) {
            // Swipe right, go to previous slide
            resetAutoSlide();
            prevSlide();
        }
    }
    
    // Set up automatic sliding
    function startAutoSlide() {
        autoSlideInterval = setInterval(nextSlide, 5000); // Change slide every 5 seconds
    }
    
    function resetAutoSlide() {
        clearInterval(autoSlideInterval);
        startAutoSlide();
    }
    
    // Initialize the slider
    function initSlider() {
        // Show the first slide initially
        showSlide(0);
        
        // Start automatic sliding
        startAutoSlide();
        
        // Stop auto-sliding when hovering over the slider
        testimonialContainer.addEventListener('mouseenter', function() {
            clearInterval(autoSlideInterval);
        });
        
        // Resume auto-sliding when mouse leaves the slider
        testimonialContainer.addEventListener('mouseleave', function() {
            startAutoSlide();
        });
    }
    
    // Initialize the slider
    initSlider();
});
