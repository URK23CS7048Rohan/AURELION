// ==========================================
// AURELION 2026 - Interactive Features
// ==========================================

// ==========================================
// SMOOTH SCROLL & NAVIGATION
// ==========================================
document.addEventListener('DOMContentLoaded', function () {
    // Theme Toggle
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;

    // Check for saved theme preference or default to dark
    const currentTheme = localStorage.getItem('theme') || 'dark';
    if (currentTheme === 'light') {
        body.classList.add('light-theme');
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', function () {
            body.classList.toggle('light-theme');

            // Save theme preference
            const theme = body.classList.contains('light-theme') ? 'light' : 'dark';
            localStorage.setItem('theme', theme);

            // Ensure video keeps playing after theme switch
            const heroVideo = document.querySelector('.hero-video');
            if (heroVideo && heroVideo.paused) {
                heroVideo.play();
            }

            // Add a little animation to theme toggle
            this.style.transform = 'rotate(360deg)';
            setTimeout(() => {
                this.style.transform = '';
            }, 300);
        });
    }

    // Mobile menu toggle
    const mobileToggle = document.getElementById('mobileToggle');
    const navMenu = document.getElementById('navMenu');

    if (mobileToggle) {
        mobileToggle.addEventListener('click', function () {
            navMenu.classList.toggle('active');
        });
    }

    // Smooth scroll for navigation links
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                // Close mobile menu if open
                navMenu.classList.remove('active');

                // Smooth scroll to section
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });

                // Update active state
                navLinks.forEach(l => l.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });

    // Update active nav link on scroll
    window.addEventListener('scroll', function () {
        let current = '';
        const sections = document.querySelectorAll('section');

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (pageYOffset >= sectionTop - 100) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // Navbar background on scroll
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', function () {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(10, 10, 15, 0.95)';
        } else {
            navbar.style.background = 'rgba(10, 10, 15, 0.8)';
        }
    });
});

// ==========================================
// COUNTDOWN TIMER
// ==========================================
function initCountdown() {
    // Set the date for the hackathon: February 27, 2026 08:00:00
    const hackathonDate = new Date('2026-02-27T08:00:00').getTime();

    const daysElement = document.getElementById('days');
    const hoursElement = document.getElementById('hours');
    const minutesElement = document.getElementById('minutes');
    const secondsElement = document.getElementById('seconds');

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = hackathonDate - now;

        // Calculate time units
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Display the result
        if (daysElement) daysElement.textContent = String(days).padStart(2, '0');
        if (hoursElement) hoursElement.textContent = String(hours).padStart(2, '0');
        if (minutesElement) minutesElement.textContent = String(minutes).padStart(2, '0');
        if (secondsElement) secondsElement.textContent = String(seconds).padStart(2, '0');

        // If the countdown is finished
        if (distance < 0) {
            clearInterval(countdownInterval);
            if (daysElement) daysElement.textContent = '00';
            if (hoursElement) hoursElement.textContent = '00';
            if (minutesElement) minutesElement.textContent = '00';
            if (secondsElement) secondsElement.textContent = '00';
        }
    }

    // Update immediately
    updateCountdown();

    // Update every second
    const countdownInterval = setInterval(updateCountdown, 1000);
}

// Initialize countdown when DOM is loaded
document.addEventListener('DOMContentLoaded', initCountdown);

// ==========================================
// FAQ ACCORDION
// ==========================================
document.addEventListener('DOMContentLoaded', function () {
    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(question => {
        question.addEventListener('click', function () {
            const faqItem = this.parentElement;
            const isActive = faqItem.classList.contains('active');

            // Close all FAQ items
            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('active');
            });

            // Toggle current item
            if (!isActive) {
                faqItem.classList.add('active');
            }
        });
    });
});

// ==========================================
// SCROLL ANIMATIONS
// ==========================================
function initScrollAnimations() {
    const fadeElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .slide-in-up');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    fadeElements.forEach(element => {
        observer.observe(element);
    });
}

// Initialize scroll animations when DOM is loaded
document.addEventListener('DOMContentLoaded', initScrollAnimations);

// ==========================================
// PARALLAX EFFECT FOR HERO ORBS
// ==========================================
document.addEventListener('DOMContentLoaded', function () {
    const orbs = document.querySelectorAll('.gradient-orb');

    window.addEventListener('scroll', function () {
        const scrolled = window.pageYOffset;

        orbs.forEach((orb, index) => {
            const speed = 0.5 + (index * 0.2);
            const yPos = -(scrolled * speed);
            orb.style.transform = `translateY(${yPos}px)`;
        });
    });
});

// ==========================================
// BUTTON CLICK EFFECTS
// ==========================================
document.addEventListener('DOMContentLoaded', function () {
    const buttons = document.querySelectorAll('.btn');

    buttons.forEach(button => {
        button.addEventListener('click', function (e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');

            this.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
});

// Add ripple animation styles dynamically
const style = document.createElement('style');
style.textContent = `
    .btn {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.5);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ==========================================
// TRACK CARD HOVER EFFECTS
// ==========================================
document.addEventListener('DOMContentLoaded', function () {
    const trackCards = document.querySelectorAll('.track-card');

    trackCards.forEach(card => {
        card.addEventListener('mouseenter', function () {
            this.style.background = 'linear-gradient(135deg, rgba(168, 85, 247, 0.1), rgba(6, 182, 212, 0.1))';
        });

        card.addEventListener('mouseleave', function () {
            this.style.background = '';
        });
    });
});

// ==========================================
// FORM VALIDATION (if you add a registration form later)
// ==========================================
function validateRegistrationForm(formElement) {
    const requiredFields = formElement.querySelectorAll('[required]');
    let isValid = true;

    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            isValid = false;
            field.classList.add('error');
        } else {
            field.classList.remove('error');
        }
    });

    // Email validation
    const emailField = formElement.querySelector('input[type="email"]');
    if (emailField && emailField.value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailField.value)) {
            isValid = false;
            emailField.classList.add('error');
        }
    }

    // Phone validation
    const phoneField = formElement.querySelector('input[type="tel"]');
    if (phoneField && phoneField.value) {
        const phoneRegex = /^[0-9]{10}$/;
        if (!phoneRegex.test(phoneField.value.replace(/\s/g, ''))) {
            isValid = false;
            phoneField.classList.add('error');
        }
    }

    return isValid;
}

// ==========================================
// PERFORMANCE OPTIMIZATIONS
// ==========================================
// Debounce function for scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ==========================================
// PREVENT EXTERNAL LINK NAVIGATION (optional)
// ==========================================
document.addEventListener('DOMContentLoaded', function () {
    // Update placeholder registration links
    const registerButtons = document.querySelectorAll('a[href="#register"], a[href="#"]');

    registerButtons.forEach(button => {
        button.addEventListener('click', function (e) {
            // If href is just "#", prevent default and show alert
            if (this.getAttribute('href') === '#') {
                e.preventDefault();
                alert('Registration will open soon! Stay tuned for updates.');
            }
        });
    });
});

// ==========================================
// CONSOLE EASTER EGG
// ==========================================
console.log('%c🚀 AURELION 2026 🚀', 'color: #a855f7; font-size: 24px; font-weight: bold;');
console.log('%cInnovate for a Better Tomorrow', 'color: #06b6d4; font-size: 16px;');
console.log('%cAI Towards Food, Water, Health & Energy', 'color: #9ca3af; font-size: 12px;');
console.log('%c\nInterested in the code? We love curious minds!', 'color: #d1d5db; font-size: 14px;');
console.log('%cJoin us at AURELION 2026 on February 27, 2026', 'color: #a855f7; font-size: 14px; font-weight: bold;');

// ==========================================
// EASTER EGG TV MODAL
// ==========================================
const easterEggBtn = document.getElementById('easterEggBtn');
const tvModal = document.getElementById('tvModal');
const tvCloseBtn = document.getElementById('tvCloseBtn');

if (easterEggBtn && tvModal) {
    easterEggBtn.addEventListener('click', function () {
        tvModal.classList.add('active');
    });
}

if (tvCloseBtn && tvModal) {
    tvCloseBtn.addEventListener('click', function () {
        tvModal.classList.remove('active');
    });

    // Close on background click
    tvModal.addEventListener('click', function (e) {
        if (e.target === tvModal) {
            tvModal.classList.remove('active');
        }
    });

    // Close on Escape key
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && tvModal.classList.contains('active')) {
            tvModal.classList.remove('active');
        }
    });
}

// ==========================================
// ANIMATED COUNTERS
// ==========================================
document.addEventListener('DOMContentLoaded', function () {
    const statValues = document.querySelectorAll('.stat-value');

    const animateCounter = (element) => {
        const target = parseInt(element.dataset.target);
        const prefix = element.dataset.prefix || '';
        const suffix = element.dataset.suffix || '';
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;

        const updateCounter = () => {
            current += step;
            if (current < target) {
                element.textContent = prefix + Math.floor(current).toLocaleString() + suffix;
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = prefix + target.toLocaleString() + suffix;
            }
        };

        updateCounter();
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                entry.target.classList.add('counted');
                animateCounter(entry.target);
            }
        });
    }, { threshold: 0.5 });

    statValues.forEach(el => observer.observe(el));
});

// ==========================================
// SECTION-SPECIFIC FLOATING PARTICLES
// ==========================================
document.addEventListener('DOMContentLoaded', function () {
    const sectionCanvases = document.querySelectorAll('.section-particles');

    sectionCanvases.forEach(canvas => {
        const section = canvas.parentElement;
        const ctx = canvas.getContext('2d');
        let particles = [];
        const particleCount = 30;

        function resize() {
            canvas.width = section.offsetWidth;
            canvas.height = section.offsetHeight;
        }

        function createParticle() {
            return {
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                size: Math.random() * 2 + 0.5,
                speedX: (Math.random() - 0.5) * 0.3,
                speedY: (Math.random() - 0.5) * 0.3,
                opacity: Math.random() * 0.5 + 0.2,
                twinkle: Math.random() * 0.02
            };
        }

        function init() {
            resize();
            particles = [];
            for (let i = 0; i < particleCount; i++) {
                particles.push(createParticle());
            }
        }

        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particles.forEach(p => {
                p.x += p.speedX;
                p.y += p.speedY;

                // Twinkle effect
                p.opacity += p.twinkle;
                if (p.opacity > 0.7 || p.opacity < 0.2) {
                    p.twinkle = -p.twinkle;
                }

                // Wrap around edges
                if (p.x < 0) p.x = canvas.width;
                if (p.x > canvas.width) p.x = 0;
                if (p.y < 0) p.y = canvas.height;
                if (p.y > canvas.height) p.y = 0;

                // Draw star shape
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255, 200, 100, ${p.opacity})`;
                ctx.shadowBlur = 8;
                ctx.shadowColor = 'rgba(255, 180, 80, 0.5)';
                ctx.fill();
            });

            requestAnimationFrame(animate);
        }

        window.addEventListener('resize', resize);
        init();
        animate();
    });
});

// ==========================================
// 3D TILT EFFECT FOR CARDS
// ==========================================
document.addEventListener('DOMContentLoaded', function () {
    const tiltCards = document.querySelectorAll('[data-tilt]');

    tiltCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 15;
            const rotateY = (centerX - x) / 15;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });
});

