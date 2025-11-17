document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('section');
    let currentSlide = 0;

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.remove('active');
            if (i === index) {
                slide.classList.add('active');
            }
        });
    }

    document.addEventListener('keydown', (event) => {
        if (event.key === 'ArrowRight') {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        } else if (event.key === 'ArrowLeft') {
            currentSlide = (currentSlide - 1 + slides.length) % slides.length;
            showSlide(currentSlide);
        }
    });

    // Show the initial slide
    showSlide(currentSlide);
});