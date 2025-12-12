// ============================================
// PRELOADER
// ============================================
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    setTimeout(() => {
        preloader.classList.add('hidden');
    }, 1000);
});

// ============================================
// CUSTOM CURSOR
// ============================================
const cursor = document.getElementById('cursor');
const cursorDot = document.getElementById('cursorDot');

if (window.matchMedia('(pointer: fine)').matches) {
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        cursor.classList.add('active');
        
        cursorDot.style.left = e.clientX + 'px';
        cursorDot.style.top = e.clientY + 'px';
        cursorDot.classList.add('active');
    });

    // Cursor interactions
    const interactiveElements = document.querySelectorAll('a, button, .btn, .service-card, .portfolio-item');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
            cursor.style.opacity = '0.5';
        });
        
        element.addEventListener('mouseleave', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1)';
            cursor.style.opacity = '1';
        });
    });
}

// ============================================
// NAVIGATION
// ============================================
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Active navigation link on scroll
const sections = document.querySelectorAll('section[id]');

function activateNavLink() {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                } else {
                    link.classList.remove('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', activateNavLink);

// Smooth scroll for navigation links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ============================================
// THEME TOGGLE (Dark/Light Mode)
// ============================================
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
const body = document.body;

// Check for saved theme preference or default to light mode
const currentTheme = localStorage.getItem('theme') || 'light';
body.setAttribute('data-theme', currentTheme);
updateThemeIcon(currentTheme);

// Theme toggle functionality
themeToggle.addEventListener('click', () => {
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
    if (theme === 'dark') {
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    } else {
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
    }
}

// ============================================
// SCROLL ANIMATIONS
// ============================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all elements with fade-in class
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.service-card, .portfolio-item, .testimonial-card, .about-text, .about-image');
    
    animatedElements.forEach((el, index) => {
        el.classList.add('fade-in');
        el.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(el);
    });
});

// ============================================
// CONTACT FORM HANDLING
// ============================================
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value
    };
    
    // Here you would typically send the data to a server
    // For now, we'll just show an alert
    console.log('Form submitted:', formData);
    
    // Show success message (you can customize this)
    alert('Thank you for your message! I will get back to you soon.');
    
    // Reset form
    contactForm.reset();
});

// ============================================
// PORTFOLIO ITEM HOVER EFFECTS
// ============================================
const portfolioItems = document.querySelectorAll('.portfolio-item');

portfolioItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
        item.style.transform = 'translateY(-10px)';
    });
    
    item.addEventListener('mouseleave', () => {
        item.style.transform = 'translateY(0)';
    });
});

// ============================================
// SERVICE CARD ANIMATIONS
// ============================================
const serviceCards = document.querySelectorAll('.service-card');

serviceCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        const icon = card.querySelector('.service-icon');
        icon.style.transform = 'scale(1.1) rotate(5deg)';
    });
    
    card.addEventListener('mouseleave', () => {
        const icon = card.querySelector('.service-icon');
        icon.style.transform = 'scale(1) rotate(0deg)';
    });
});

// ============================================
// SMOOTH SCROLL POLYFILL FOR OLDER BROWSERS
// ============================================
if (!('scrollBehavior' in document.documentElement.style)) {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/gh/cferdinandi/smooth-scroll@15/dist/smooth-scroll.polyfills.min.js';
    document.head.appendChild(script);
}

// ============================================
// SKILLS CARDS ANIMATION
// ============================================
const proficiencyCards = document.querySelectorAll('.proficiency-card');

const cardsObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 50);
            cardsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

proficiencyCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    cardsObserver.observe(card);
});

// ============================================
// HERO CTA BUTTON ANIMATIONS
// ============================================
const ctaButtons = document.querySelectorAll('.btn');

ctaButtons.forEach(button => {
    button.addEventListener('mouseenter', () => {
        button.style.transform = 'translateY(-3px) scale(1.05)';
    });
    
    button.addEventListener('mouseleave', () => {
        button.style.transform = 'translateY(0) scale(1)';
    });
});

// ============================================
// PARALLAX EFFECT FOR HERO SECTION (OPTIONAL)
// ============================================
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const floatingElementsContainer = document.querySelector('.floating-elements');
    
    // Hide floating elements when scrolling past hero section
    if (floatingElementsContainer) {
        const heroHeight = hero ? hero.offsetHeight : window.innerHeight;
        if (scrolled > heroHeight * 0.5) {
            floatingElementsContainer.style.opacity = '0';
            floatingElementsContainer.style.pointerEvents = 'none';
            floatingElementsContainer.style.transition = 'opacity 0.5s ease';
        } else {
            floatingElementsContainer.style.opacity = '1';
            floatingElementsContainer.style.pointerEvents = 'auto';
        }
    }
    
    if (hero) {
        const heroContent = hero.querySelector('.hero-content');
        if (heroContent && scrolled < window.innerHeight) {
            heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
            heroContent.style.opacity = 1 - (scrolled / window.innerHeight) * 0.5;
        }
    }
});

// ============================================
// FLOATING ELEMENTS ANIMATION
// ============================================
function initFloatingElements() {
    const floatingElements = document.querySelectorAll('.floating-element');
    
    if (floatingElements.length === 0) return;
    
    const elementSize = 60; // Size of floating elements
    const minDistance = 120; // Minimum distance between elements
    const positions = []; // Track all element positions
    const allElements = []; // Store all element data for collision detection
    
    floatingElements.forEach((element, index) => {
        // Random initial position across entire viewport with spacing
        let x, y;
        let attempts = 0;
        let validPosition = false;
        
        // Ensure elements are spaced apart
        do {
            x = Math.random() * (window.innerWidth - elementSize);
            y = Math.random() * (window.innerHeight - elementSize);
            
            validPosition = true;
            // Check distance from all existing positions
            for (let pos of positions) {
                const distance = Math.sqrt(Math.pow(x - pos.x, 2) + Math.pow(y - pos.y, 2));
                if (distance < minDistance) {
                    validPosition = false;
                    break;
                }
            }
            attempts++;
        } while (!validPosition && attempts < 50);
        
        // Store this position
        positions.push({ x, y });
        
        // Visible movement velocity - increased for noticeable movement
        let vx = (Math.random() - 0.5) * 0.8;
        let vy = (Math.random() - 0.5) * 0.8;
        let speed = parseFloat(element.dataset.speed) || 1; // Base speed
        
        // Set initial position
        element.style.left = x + 'px';
        element.style.top = y + 'px';
        element.style.transition = 'none'; // Remove transition for smooth movement
        
        // Store element reference for collision detection
        const elementData = { element, x, y, vx, vy, speed };
        allElements.push(elementData);
        
        // Random movement function
        function moveRandomly() {
            // Update position
            x += vx * speed;
            y += vy * speed;
            
            // Collision detection with other elements - keep them spaced
            for (let other of allElements) {
                if (other === elementData) continue;
                const distance = Math.sqrt(Math.pow(x - other.x, 2) + Math.pow(y - other.y, 2));
                if (distance < minDistance && distance > 0) {
                    // Push away from other element
                    const angle = Math.atan2(y - other.y, x - other.x);
                    vx = Math.cos(angle) * 0.5;
                    vy = Math.sin(angle) * 0.5;
                }
            }
            
            // Boundary detection for entire viewport with bounce
            if (x <= 0) {
                vx = Math.abs(vx) * 0.9; // Bounce back
                x = 0;
            } else if (x >= window.innerWidth - elementSize) {
                vx = -Math.abs(vx) * 0.9; // Bounce back
                x = window.innerWidth - elementSize;
            }
            
            if (y <= 0) {
                vy = Math.abs(vy) * 0.9; // Bounce back
                y = 0;
            } else if (y >= window.innerHeight - elementSize) {
                vy = -Math.abs(vy) * 0.9; // Bounce back
                y = window.innerHeight - elementSize;
            }
            
            // Update stored position
            elementData.x = x;
            elementData.y = y;
            elementData.vx = vx;
            elementData.vy = vy;
            
            // Apply position
            element.style.left = x + 'px';
            element.style.top = y + 'px';
            
            // Random direction change occasionally
            if (Math.random() < 0.005) {
                vx = (Math.random() - 0.5) * 0.8;
                vy = (Math.random() - 0.5) * 0.8;
            }
        }
        
        // Touch/Click interaction - speed up
        function speedUp() {
            speed = 4; // Increase speed when clicked/touched
            element.classList.add('very-fast');
            element.style.opacity = '1';
            
            // Add a random push in random direction
            vx += (Math.random() - 0.5) * 2;
            vy += (Math.random() - 0.5) * 2;
            
            // Reset after 2 seconds
            setTimeout(() => {
                speed = 1; // Return to base speed
                element.classList.remove('very-fast');
                element.style.opacity = '';
            }, 2000);
        }
        
        // Event listeners for touch and click
        element.addEventListener('click', speedUp);
        element.addEventListener('touchstart', (e) => {
            e.preventDefault();
            speedUp();
        });
        
        // Start animation - smooth 60fps movement
        setInterval(moveRandomly, 16); // ~60fps for smooth movement
    });
}

// Initialize floating elements when page loads
window.addEventListener('load', () => {
    setTimeout(initFloatingElements, 500); // Wait for page to fully load
});

// Reinitialize on resize
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        const floatingElements = document.querySelectorAll('.floating-element');
        floatingElements.forEach(element => {
            // Keep elements within viewport on resize
            const currentX = parseFloat(element.style.left) || 0;
            const currentY = parseFloat(element.style.top) || 0;
            const x = Math.min(currentX, window.innerWidth - 60);
            const y = Math.min(currentY, window.innerHeight - 60);
            element.style.left = Math.max(0, x) + 'px';
            element.style.top = Math.max(0, y) + 'px';
        });
    }, 250);
});

