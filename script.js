document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('section');
    const prevArrow = document.getElementById('prev-arrow');
    const nextArrow = document.getElementById('next-arrow');
    let currentSlide = 0;

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.remove('active');
            if (i === index) {
                slide.classList.add('active');
            }
        });
    }

    function goToNextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    function goToPrevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    }

    // Event Listeners
    document.addEventListener('keydown', (event) => {
        if (event.key === 'ArrowRight') {
            goToNextSlide();
        } else if (event.key === 'ArrowLeft') {
            goToPrevSlide();
        }
    });

    nextArrow.addEventListener('click', goToNextSlide);
    prevArrow.addEventListener('click', goToPrevSlide);

    // Show the initial slide
    showSlide(currentSlide);
});
