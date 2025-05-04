/**
 * Motokam 24/7 Mobile Mechanic Services
 * Main JavaScript File
 */

document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    // ===== Variables =====
    const header = document.getElementById('header');
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const backToTopButton = document.getElementById('back-to-top');
    
    // ===== Mobile Menu Toggle =====
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            // Toggle menu icon animation
            const spans = this.querySelectorAll('span');
            if (this.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    }
    
    // ===== Smooth Scrolling for Anchor Links =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Close mobile menu if open
            if (navMenu.classList.contains('active')) {
                mobileMenuToggle.click();
            }
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = header.offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY;
                const offsetPosition = targetPosition - headerHeight;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ===== Sticky Header on Scroll =====
    function handleScroll() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
            backToTopButton.classList.add('visible');
        } else {
            header.classList.remove('scrolled');
            backToTopButton.classList.remove('visible');
        }
    }
    
    window.addEventListener('scroll', handleScroll);
    
    // Call once on initial load
    handleScroll();
    
    // ===== Back to Top Button =====
    if (backToTopButton) {
        backToTopButton.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // ===== Availability Indicator =====
    function updateAvailabilityStatus() {
        const statusDot = document.querySelector('.status-dot');
        const statusText = document.querySelector('.status-text');
        
        if (!statusDot || !statusText) return;
        
        // Check current time
        const now = new Date();
        const hours = now.getHours();
        
        // Since this is a 24/7 service, we'll simulate availability based on random logic
        // In a real application, this would connect to a backend or API
        
        // For demonstration, we'll randomize the status but make "Available Now" more common
        const random = Math.random();
        
        if (random < 0.7) {
            // Available
            statusDot.className = 'status-dot online';
            statusText.textContent = 'Available Now';
        } else if (random < 0.9) {
            // Busy
            statusDot.className = 'status-dot busy';
            statusText.textContent = 'On Call';
        } else {
            // If in early morning hours, more likely to be delayed
            statusDot.className = 'status-dot busy';
            statusText.textContent = 'Est. Response 30 min';
        }
    }
    
    // Update availability immediately and then every 3 minutes
    updateAvailabilityStatus();
    setInterval(updateAvailabilityStatus, 180000);
    
    // ===== Intersection Observer for Animation =====
    const animateElements = document.querySelectorAll('.service-card, .testimonial-content, .faq-item, .contact-form');
    
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    animateElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(element);
    });
});
