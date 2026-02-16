// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            // Animate hamburger icon
            hamburger.classList.toggle('active');
        });

        // Close menu when clicking on a link
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!hamburger.contains(event.target) && !navMenu.contains(event.target)) {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });
    }
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add animation on scroll (optional enhancement)
function revealOnScroll() {
    const elements = document.querySelectorAll('.card, .sport-card, .timeline-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });

    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(element);
    });
}

// Initialize animations when page loads
document.addEventListener('DOMContentLoaded', revealOnScroll);

// Gallery lightbox functionality with navigation
function initGallery() {
    const photos = Array.from(document.querySelectorAll('.photo-item img, .photo-grid img, .venue-map'));
    
    if (photos.length === 0) return;
    
    let currentIndex = 0;
    let activeLightbox = null;
    
    function showLightbox(index) {
        currentIndex = index;
        const photo = photos[currentIndex];
        
        if (activeLightbox) {
            // Update existing lightbox
            const img = activeLightbox.querySelector('img');
            img.src = photo.src;
            img.alt = photo.alt;
            updateCounter();
        } else {
            // Create new lightbox
            activeLightbox = document.createElement('div');
            activeLightbox.classList.add('lightbox');
            activeLightbox.innerHTML = `
                <div class="lightbox-content">
                    <span class="lightbox-close">&times;</span>
                    <button class="lightbox-prev" aria-label="Previous">&lsaquo;</button>
                    <button class="lightbox-next" aria-label="Next">&rsaquo;</button>
                    <img src="${photo.src}" alt="${photo.alt}">
                    <div class="lightbox-counter"></div>
                </div>
            `;
            document.body.appendChild(activeLightbox);
            document.body.style.overflow = 'hidden';
            
            updateCounter();
            
            // Close button
            activeLightbox.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
            
            // Previous button
            activeLightbox.querySelector('.lightbox-prev').addEventListener('click', function(e) {
                e.stopPropagation();
                showPrevious();
            });
            
            // Next button
            activeLightbox.querySelector('.lightbox-next').addEventListener('click', function(e) {
                e.stopPropagation();
                showNext();
            });
            
            // Click outside to close
            activeLightbox.addEventListener('click', function(e) {
                if (e.target === activeLightbox) {
                    closeLightbox();
                }
            });
            
            // Keyboard navigation
            document.addEventListener('keydown', handleKeyboard);
        }
    }
    
    function updateCounter() {
        if (activeLightbox && photos.length > 1) {
            const counter = activeLightbox.querySelector('.lightbox-counter');
            counter.textContent = `${currentIndex + 1} / ${photos.length}`;
        }
    }
    
    function showNext() {
        currentIndex = (currentIndex + 1) % photos.length;
        showLightbox(currentIndex);
    }
    
    function showPrevious() {
        currentIndex = (currentIndex - 1 + photos.length) % photos.length;
        showLightbox(currentIndex);
    }
    
    function closeLightbox() {
        if (activeLightbox) {
            document.body.style.overflow = '';
            activeLightbox.remove();
            activeLightbox = null;
            document.removeEventListener('keydown', handleKeyboard);
        }
    }
    
    function handleKeyboard(e) {
        if (!activeLightbox) return;
        
        if (e.key === 'Escape') {
            closeLightbox();
        } else if (e.key === 'ArrowRight') {
            showNext();
        } else if (e.key === 'ArrowLeft') {
            showPrevious();
        }
    }
    
    // Add click handlers to all photos
    photos.forEach((photo, index) => {
        photo.style.cursor = 'pointer';
        photo.addEventListener('click', function() {
            showLightbox(index);
        });
    });
}

// Call gallery init when photos are loaded
document.addEventListener('DOMContentLoaded', initGallery);

// Update results dynamically (example function for future use)
function updateResults(sport, team1Score, team2Score) {
    const scoreElement = document.querySelector(`#${sport}-score`);
    if (scoreElement) {
        scoreElement.textContent = `${team1Score} : ${team2Score}`;
    }
}

// Countdown timer (optional - for event date)
function startCountdown(eventDate) {
    const countdownElement = document.getElementById('countdown');
    if (!countdownElement) return;
    
    const countdown = setInterval(function() {
        const now = new Date().getTime();
        const distance = new Date(eventDate).getTime() - now;
        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        if (countdownElement) {
            countdownElement.innerHTML = `
                <div class="countdown-item">
                    <span class="countdown-number">${days}</span>
                    <span class="countdown-label">Days</span>
                </div>
                <div class="countdown-item">
                    <span class="countdown-number">${hours}</span>
                    <span class="countdown-label">Hours</span>
                </div>
                <div class="countdown-item">
                    <span class="countdown-number">${minutes}</span>
                    <span class="countdown-label">Minutes</span>
                </div>
                <div class="countdown-item">
                    <span class="countdown-number">${seconds}</span>
                    <span class="countdown-label">Seconds</span>
                </div>
            `;
        }
        
        if (distance < 0) {
            clearInterval(countdown);
            if (countdownElement) {
                countdownElement.innerHTML = "<h3>Event is Live!</h3>";
            }
        }
    }, 1000);
}

// Uncomment and set the event date when known
// startCountdown('2026-06-15T09:00:00');
