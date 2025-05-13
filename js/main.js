/**
 * Motokam 24/7 Mobile Mechanic Services
 * Services Carousel JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {
    const carousel = document.querySelector('.services-carousel');
    const prevBtn = document.querySelector('.carousel-btn.prev');
    const nextBtn = document.querySelector('.carousel-btn.next');
    const cards = document.querySelectorAll('.service-card');

    if (!carousel || !cards.length) return;

    let currentIndex = 0;

    function scrollToCard(index) {
        const card = cards[index];
        if (card) {
            const left = card.offsetLeft - (carousel.clientWidth / 2 - card.offsetWidth / 2);
            carousel.scrollTo({ left, behavior: 'smooth' });
        }
    }

    prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            scrollToCard(currentIndex);
        }
    });

    nextBtn.addEventListener('click', () => {
        if (currentIndex < cards.length - 1) {
            currentIndex++;
            scrollToCard(currentIndex);
        }
    });

    // Optional: adjust on resize
    window.addEventListener('resize', () => scrollToCard(currentIndex));
});
