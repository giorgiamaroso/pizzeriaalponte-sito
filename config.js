let currentSlide = 0;
const slides = document.querySelectorAll('.slider-image');

function showSlide(index) {
    const totalSlides = slides.length;
    if (index >= totalSlides) {
        currentSlide = 0;
    } else if (index < 0) {
        currentSlide = totalSlides - 1;
    } else {
        currentSlide = index;
    }

    const offset = -currentSlide * 100;
    document.querySelector('.slider-wrapper').style.transform = `translateX(${offset}%)`;
    
    // Update dots
    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot, idx) => {
        dot.classList.remove('active');
        if (idx === currentSlide) {
            dot.classList.add('active');
        }
    });
}

function changeSlide(n) {
    showSlide(currentSlide + n);
}

showSlide(0);