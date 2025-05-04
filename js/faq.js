/**
 * Motokam 24/7 Mobile Mechanic Services
 * FAQ Accordion JavaScript
 */

document.addEventListener('DOMContentLoaded', function() {
    'use strict';
    
    // ===== Variables =====
    const faqItems = document.querySelectorAll('.faq-item');
    
    if (faqItems.length === 0) return;
    
    // Function to toggle FAQ item
    function toggleFAQ(item) {
        const isActive = item.classList.contains('active');
        
        // Close all items first
        faqItems.forEach(faqItem => {
            faqItem.classList.remove('active');
        });
        
        // If the clicked item wasn't active, open it
        if (!isActive) {
            item.classList.add('active');
        }
    }
    
    // Set up click event listeners for FAQ questions
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            toggleFAQ(item);
        });
        
        // Add keyboard accessibility
        question.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleFAQ(item);
            }
        });
    });
    
    // Enable keyboard navigation between FAQ items
    faqItems.forEach((item, index) => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('keydown', (e) => {
            let targetItem;
            
            switch (e.key) {
                case 'ArrowDown':
                    e.preventDefault();
                    targetItem = faqItems[(index + 1) % faqItems.length].querySelector('.faq-question');
                    targetItem.focus();
                    break;
                case 'ArrowUp':
                    e.preventDefault();
                    targetItem = faqItems[(index - 1 + faqItems.length) % faqItems.length].querySelector('.faq-question');
                    targetItem.focus();
                    break;
                case 'Home':
                    e.preventDefault();
                    faqItems[0].querySelector('.faq-question').focus();
                    break;
                case 'End':
                    e.preventDefault();
                    faqItems[faqItems.length - 1].querySelector('.faq-question').focus();
                    break;
            }
        });
    });
    
    // Add ARIA attributes for accessibility
    faqItems.forEach((item, index) => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        
        const questionId = `faq-question-${index}`;
        const answerId = `faq-answer-${index}`;
        
        question.setAttribute('id', questionId);
        question.setAttribute('aria-expanded', 'false');
        question.setAttribute('aria-controls', answerId);
        
        answer.setAttribute('id', answerId);
        answer.setAttribute('aria-labelledby', questionId);
        answer.setAttribute('role', 'region');
        
        // Update ARIA attributes when toggling
        question.addEventListener('click', () => {
            const isExpanded = item.classList.contains('active');
            question.setAttribute('aria-expanded', isExpanded.toString());
        });
    });
    
    // Automatically open the first FAQ item when the page loads (optional)
    function openFirstFAQ() {
        toggleFAQ(faqItems[0]);
    }
    
    // Open first FAQ item (comment out if not desired)
    // openFirstFAQ();
});
