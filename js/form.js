/**
 * Motokam 24/7 Mobile Mechanic Services
 * Contact Form JavaScript
 */

document.addEventListener('DOMContentLoaded', function() {
    'use strict';
    
    // ===== Variables =====
    const bookingForm = document.getElementById('booking-form');
    const formMessage = document.getElementById('form-message');
    
    if (!bookingForm || !formMessage) return;
    
    // Form field elements
    const nameInput = document.getElementById('name');
    const phoneInput = document.getElementById('phone');
    const emailInput = document.getElementById('email');
    const serviceSelect = document.getElementById('service');
    const locationInput = document.getElementById('location');
    const messageInput = document.getElementById('message');
    
    // ===== Form Validation Functions =====
    
    // Validate name (letters, spaces, at least 2 characters)
    function validateName(name) {
        const nameRegex = /^[A-Za-z\s]{2,}$/;
        return nameRegex.test(name);
    }
    
    // Validate UK phone number
    function validatePhone(phone) {
        // UK phone format: +44 XXXX XXXXXX or 07XXX XXXXXX
        const phoneRegex = /^(\+44\s?|0)[0-9\s]{9,13}$/;
        return phoneRegex.test(phone);
    }
    
    // Validate email
    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Validate location (non-empty, minimum length)
    function validateLocation(location) {
        return location.trim().length >= 5;
    }
    
    // Display error message for a field
    function showError(inputElement, message) {
        const formGroup = inputElement.parentElement;
        const errorElement = formGroup.querySelector('.error-message');
        
        formGroup.classList.add('error');
        errorElement.textContent = message;
    }
    
    // Clear error message for a field
    function clearError(inputElement) {
        const formGroup = inputElement.parentElement;
        const errorElement = formGroup.querySelector('.error-message');
        
        formGroup.classList.remove('error');
        errorElement.textContent = '';
    }
    
    // Validate all form fields
    function validateForm() {
        let isValid = true;
        
        // Validate Name
        if (!validateName(nameInput.value)) {
            showError(nameInput, 'Please enter a valid name (at least 2 characters, letters only)');
            isValid = false;
        } else {
            clearError(nameInput);
        }
        
        // Validate Phone
        if (!validatePhone(phoneInput.value)) {
            showError(phoneInput, 'Please enter a valid UK phone number');
            isValid = false;
        } else {
            clearError(phoneInput);
        }
        
        // Validate Email
        if (!validateEmail(emailInput.value)) {
            showError(emailInput, 'Please enter a valid email address');
            isValid = false;
        } else {
            clearError(emailInput);
        }
        
        // Validate Service
        if (serviceSelect.value === '') {
            showError(serviceSelect, 'Please select a service');
            isValid = false;
        } else {
            clearError(serviceSelect);
        }
        
        // Validate Location
        if (!validateLocation(locationInput.value)) {
            showError(locationInput, 'Please enter your location (at least 5 characters)');
            isValid = false;
        } else {
            clearError(locationInput);
        }
        
        return isValid;
    }
    
    // Live validation for fields on input/change
    nameInput.addEventListener('input', function() {
        if (this.value.trim() !== '') {
            if (!validateName(this.value)) {
                showError(this, 'Please enter a valid name (at least 2 characters, letters only)');
            } else {
                clearError(this);
            }
        }
    });
    
    phoneInput.addEventListener('input', function() {
        if (this.value.trim() !== '') {
            if (!validatePhone(this.value)) {
                showError(this, 'Please enter a valid UK phone number');
            } else {
                clearError(this);
            }
        }
    });
    
    emailInput.addEventListener('input', function() {
        if (this.value.trim() !== '') {
            if (!validateEmail(this.value)) {
                showError(this, 'Please enter a valid email address');
            } else {
                clearError(this);
            }
        }
    });
    
    serviceSelect.addEventListener('change', function() {
        if (this.value === '') {
            showError(this, 'Please select a service');
        } else {
            clearError(this);
        }
    });
    
    locationInput.addEventListener('input', function() {
        if (this.value.trim() !== '') {
            if (!validateLocation(this.value)) {
                showError(this, 'Please enter your location (at least 5 characters)');
            } else {
                clearError(this);
            }
        }
    });
    
    // Form submission handler
    bookingForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate form
        const isValid = validateForm();
        
        if (isValid) {
            // In a real application, this would send data to a server
            // For this example, we'll simulate a successful submission
            
            // Disable form elements during submission
            const formElements = bookingForm.elements;
            for (let i = 0; i < formElements.length; i++) {
                formElements[i].disabled = true;
            }
            
            // Show loading state on button
            const submitButton = bookingForm.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.textContent;
            submitButton.textContent = 'Sending...';
            
            // Simulate form submission with a delay
            setTimeout(function() {
                // Display success message
                formMessage.className = 'form-message success';
                formMessage.textContent = 'Your booking request has been sent successfully. We will contact you shortly to confirm your appointment.';
                
                // Reset form
                bookingForm.reset();
                
                // Re-enable form elements
                for (let i = 0; i < formElements.length; i++) {
                    formElements[i].disabled = false;
                }
                
                // Restore button text
                submitButton.textContent = originalButtonText;
                
                // Scroll to the message
                formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                
                // Hide message after some time
                setTimeout(function() {
                    formMessage.style.opacity = '0';
                    setTimeout(function() {
                        formMessage.className = 'form-message';
                        formMessage.textContent = '';
                        formMessage.style.opacity = '1';
                    }, 500);
                }, 5000);
                
            }, 1500);
        } else {
            // Display general error message
            formMessage.className = 'form-message error';
            formMessage.textContent = 'Please correct the errors in the form and try again.';
            
            // Scroll to first error
            const firstErrorField = bookingForm.querySelector('.form-group.error');
            if (firstErrorField) {
                firstErrorField.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
    });
});
