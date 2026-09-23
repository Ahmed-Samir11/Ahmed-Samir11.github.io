// ===== THEME TOGGLE =====
const themeToggle = document.getElementById('themeToggle');
const htmlElement = document.documentElement;
const body = document.body;

// Check saved theme preference or default to dark
const savedTheme = localStorage.getItem('theme') || 'dark';
if (savedTheme === 'light') {
    body.classList.add('light-theme');
    themeToggle.textContent = '☀️';
}

themeToggle.addEventListener('click', () => {
    body.classList.toggle('light-theme');
    const isLight = body.classList.contains('light-theme');
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
    themeToggle.textContent = isLight ? '☀️' : '🌙';
});

// ===== MOBILE NAVIGATION TOGGLE =====
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Close menu when a link is clicked
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// ===== SCROLL TO TOP BUTTON =====
const scrollTop = document.getElementById('scrollTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollTop.classList.add('show');
    } else {
        scrollTop.classList.remove('show');
    }
});

scrollTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ===== SMOOTH SCROLL FOR NAVIGATION LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// ===== ANIMATION ON SCROLL =====
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -100px 0px'
};

const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-visible');
        }
    });
}, observerOptions);

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Observe all sections for fade-in animation
    document.querySelectorAll('section').forEach((section) => {
        section.classList.add('fade-in-element');
        fadeInObserver.observe(section);
    });

    // Observe timeline items for animation
    document.querySelectorAll('.timeline-item').forEach((item) => {
        item.classList.add('fade-in-element', 'slide-left');
        fadeInObserver.observe(item);
    });

    // Observe about stats
    document.querySelectorAll('.stat-card').forEach((card) => {
        card.classList.add('fade-in-element', 'scale-up');
        fadeInObserver.observe(card);
    });

    // Observe education cards
    document.querySelectorAll('.education-card').forEach((card) => {
        card.classList.add('fade-in-element', 'scale-up');
        fadeInObserver.observe(card);
    });

    // Observe achievement cards
    document.querySelectorAll('.achievement-card').forEach((card) => {
        card.classList.add('fade-in-element');
        fadeInObserver.observe(card);
    });

    // Observe skill categories
    document.querySelectorAll('.skill-category').forEach((category) => {
        category.classList.add('fade-in-element', 'slide-left');
        fadeInObserver.observe(category);
    });

    // Observe publication items
    document.querySelectorAll('.publication-item').forEach((item) => {
        item.classList.add('fade-in-element');
        fadeInObserver.observe(item);
    });

    // Observe contact links
    document.querySelectorAll('.contact-link').forEach((link) => {
        link.classList.add('fade-in-element', 'scale-up');
        fadeInObserver.observe(link);
    });
});

// ===== PARALLAX EFFECT =====
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    
    // Parallax on hero content
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
    
    // Parallax on section titles
    document.querySelectorAll('.section-title').forEach(title => {
        const rect = title.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            const offset = (window.innerHeight - rect.top) * 0.1;
            title.style.transform = `translateY(${offset}px)`;
        }
    });
});

// ===== MOUSE TRACKING EFFECT ON HERO IMAGE =====
const profileImage = document.querySelector('.profile-image');
const imageContainer = document.querySelector('.image-container');

if (imageContainer) {
    document.addEventListener('mousemove', (e) => {
        const rect = imageContainer.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        const angle = Math.atan2(y, x);
        const distance = Math.min(10, Math.sqrt(x * x + y * y) / 50);

        if (profileImage) {
            profileImage.style.transform = `perspective(1000px) rotateY(${Math.cos(angle) * distance}deg) rotateX(${-Math.sin(angle) * distance}deg)`;
        }
    });

    // Reset on mouse leave
    imageContainer.addEventListener('mouseleave', () => {
        if (profileImage) {
            profileImage.style.transform = 'perspective(1000px) rotateY(0) rotateX(0)';
        }
    });
}

// ===== ACTIVE NAVIGATION LINK =====
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.style.color = 'var(--primary-color)';
        } else {
            link.style.color = 'var(--light-text)';
        }
    });
});

// ===== SCROLL INDICATOR CLICK =====
document.querySelector('.scroll-indicator')?.addEventListener('click', () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
        aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
});

// ===== TYPING ANIMATION =====
function createTypingAnimation(element, text, speed = 50) {
    if (!element) return;
    
    let index = 0;
    element.textContent = '';

    function type() {
        if (index < text.length) {
            element.textContent += text.charAt(index);
            index++;
            setTimeout(type, speed);
        }
    }

    type();
}

// Apply typing animation to hero title on load
window.addEventListener('load', () => {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const titleText = heroTitle.textContent;
        heroTitle.textContent = '';
        createTypingAnimation(heroTitle, titleText, 30);
    }
});

// ===== FLOATING ANIMATION FOR STARS =====
function createStars() {
    const starsContainer = document.querySelector('.stars');
    if (!starsContainer) return;

    for (let i = 0; i < 50; i++) {
        const star = document.createElement('div');
        star.style.position = 'absolute';
        star.style.width = '1px';
        star.style.height = '1px';
        star.style.background = 'white';
        star.style.borderRadius = '50%';
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.opacity = Math.random() * 0.5 + 0.3;
        star.style.animation = `twinkle ${Math.random() * 3 + 2}s infinite`;
        star.style.boxShadow = `0 0 ${Math.random() * 2 + 1}px white`;
        starsContainer.appendChild(star);
    }
}

// Initialize stars on page load
window.addEventListener('load', createStars);

// ===== KEYBOARD NAVIGATION =====
document.addEventListener('keydown', (e) => {
    // Close mobile menu on Escape
    if (e.key === 'Escape') {
        navMenu.classList.remove('active');
    }

    // Scroll to top on Home key
    if (e.key === 'Home') {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
});

// ===== PAGE LOAD ANIMATIONS =====
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
    
    // Animate hero content on load
    const heroText = document.querySelector('.hero-text');
    const heroImage = document.querySelector('.hero-image');
    
    if (heroText) {
        heroText.style.animation = 'slideInLeft 0.8s ease-out';
    }
    if (heroImage) {
        heroImage.style.animation = 'slideInRight 0.8s ease-out';
    }
});

// ===== PERFORMANCE OPTIMIZATION =====
let ticking = false;

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            // Update scroll-dependent animations here
            ticking = false;
        });
        ticking = true;
    }
});

// ===== ACCESSIBILITY IMPROVEMENTS =====
// Add focus styles
document.querySelectorAll('a, button').forEach(element => {
    element.addEventListener('focus', () => {
        element.style.outline = `2px solid var(--primary-color)`;
        element.style.outlineOffset = '2px';
    });

    element.addEventListener('blur', () => {
        element.style.outline = 'none';
    });
});

// ===== PAGE TRANSITION ANIMATION =====
document.addEventListener('DOMContentLoaded', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.opacity = '1';
        document.body.style.transition = 'opacity 0.6s ease-out';
    }, 100);
});
