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

// Scroll to gallery section with smooth animation
function scrollToGallery() {
    const gallery = document.getElementById('gallery');
    gallery.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// Function to close modal with animation
function closeModal(modal) {
    modal.classList.add('closing');
    setTimeout(() => {
        modal.classList.remove('show');
        modal.classList.remove('closing');
        document.getElementById('contactForm').reset();
    }, 300);
}

// Contact form and modal handling
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Show the popup
    const modal = document.getElementById('thankYouModal');
    modal.classList.add('show');
    
    // Get form data
    const formData = new FormData(this);
    
    // Submit form data via fetch
    fetch('https://formsubmit.co/giorgiamaroso02@gmail.com', {
        method: 'POST',
        body: formData
    }).then(response => {
        // Keep popup visible for 2 seconds then close with animation
        setTimeout(() => {
            closeModal(modal);
        }, 2000);
    }).catch(error => {
        console.error('Error:', error);
        closeModal(modal);
    });
});

// Close modal when clicking outside of it
window.addEventListener('click', function(event) {
    const modal = document.getElementById('thankYouModal');
    if (event.target === modal) {
        closeModal(modal);
    }
});