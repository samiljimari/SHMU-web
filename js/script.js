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

// Gallery lightbox functionality (for when photos are added)
function initGallery() {
    const photos = document.querySelectorAll('.photo-item img, .photo-grid img');
    
    photos.forEach(photo => {
        photo.addEventListener('click', function() {
            const lightbox = document.createElement('div');
            lightbox.classList.add('lightbox');
            lightbox.innerHTML = `
                <div class="lightbox-content">
                    <span class="lightbox-close">&times;</span>
                    <img src="${this.src}" alt="${this.alt}">
                </div>
            `;
            document.body.appendChild(lightbox);
            
            // Prevent body scroll when lightbox is open
            document.body.style.overflow = 'hidden';
            
            lightbox.querySelector('.lightbox-close').addEventListener('click', function() {
                document.body.style.overflow = '';
                lightbox.remove();
            });
            
            lightbox.addEventListener('click', function(e) {
                if (e.target === lightbox) {
                    document.body.style.overflow = '';
                    lightbox.remove();
                }
            });
            
            // Close on Escape key
            document.addEventListener('keydown', function closeOnEscape(e) {
                if (e.key === 'Escape') {
                    document.body.style.overflow = '';
                    lightbox.remove();
                    document.removeEventListener('keydown', closeOnEscape);
                }
            });
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
