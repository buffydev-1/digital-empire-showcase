/**
 * MAYA CHEN PORTFOLIO ENGINE v3.0
 * Advanced interactions for high-end digital experiences.
 */

document.addEventListener('DOMContentLoaded', () => {
    initCustomCursor();
    initScrollReveal();
    initFAQ();
    initMagneticButtons();
    initNavbarScroll();
    initSmoothScroll();
});

/**
 * 1. CUSTOM CURSOR ENGINE
 * Creates a two-part cursor: a solid dot and a delayed follower.
 */
function initCustomCursor() {
    const follower = document.querySelector('.cursor-follower');
    const dot = document.querySelector('.cursor-dot');
    
    if (!follower || !dot) return;

    let posX = 0, posY = 0; // Current position
    let mouseX = 0, mouseY = 0; // Mouse position

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // Immediate movement for the tiny dot
        dot.style.transform = `translate(${mouseX - 2}px, ${mouseY - 2}px)`;
    });

    // Smooth movement for the large follower (Interpolation)
    function render() {
        posX += (mouseX - posX) * 0.15;
        posY += (mouseY - posY) * 0.15;
        
        follower.style.transform = `translate(${posX - 15}px, ${posY - 15}px)`;
        requestAnimationFrame(render);
    }
    render();

    // Hover effect on links and buttons
    const interactiveElements = document.querySelectorAll('a, button, .faq-item, .work-card');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            follower.style.transform += ' scale(2)';
            follower.style.backgroundColor = 'rgba(0, 242, 255, 0.3)';
        });
        el.addEventListener('mouseleave', () => {
            follower.style.transform = follower.style.transform.replace(' scale(2)', '');
            follower.style.backgroundColor = 'var(--accent)';
        });
    });
}

/**
 * 2. SCROLL REVEAL (Intersection Observer)
 * Animates elements into view as the user scrolls.
 */
function initScrollReveal() {
    const observerOptions = {
        root: null,
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Optional: Stop observing after reveal
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

/**
 * 3. FAQ ACCORDION
 * Handles the expand/collapse logic for the FAQ section.
 */
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        const icon = item.querySelector('i');

        question.addEventListener('click', () => {
            const isOpen = answer.style.display === 'block';
            
            // Close all other items first (Optional)
            document.querySelectorAll('.faq-answer').forEach(a => a.style.display = 'none');
            document.querySelectorAll('.faq-item i').forEach(i => i.style.className = 'fa-solid fa-plus');

            // Toggle current item
            if (!isOpen) {
                answer.style.display = 'block';
                icon.className = 'fa-solid fa-minus';
                item.style.borderColor = 'var(--accent)';
            } else {
                answer.style.display = 'none';
                icon.className = 'fa-solid fa-plus';
                item.style.borderColor = 'var(--glass-border)';
            }
        });
    });
}

/**
 * 4. MAGNETIC BUTTONS
 * Makes buttons "sticky" to the cursor for a premium feel.
 */
function initMagneticButtons() {
    const buttons = document.querySelectorAll('.btn-glow, .btn-primary-stream');
    
    buttons.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const position = btn.getBoundingClientRect();
            const x = e.pageX - position.left - position.width / 2;
            const y = e.pageY - position.top - position.height / 2;
            
            btn.style.transform = `translate(${x * 0.3}px, ${y * 0.5}px)`;
        });
        
        btn.addEventListener('mouseout', () => {
            btn.style.transform = 'translate(0px, 0px)';
        });
    });
}

/**
 * 5. NAVBAR SCROLL EFFECT
 * Adds a background blur/border only after scrolling down.
 */
function initNavbarScroll() {
    const nav = document.querySelector('.glass-nav');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.style.padding = '12px 40px';
            nav.style.background = 'rgba(0, 0, 0, 0.8)';
            nav.style.borderColor = 'rgba(255, 255, 255, 0.15)';
        } else {
            nav.style.padding = '18px 40px';
            nav.style.background = 'var(--glass)';
            nav.style.borderColor = 'var(--glass-border)';
        }
    });
}

/**
 * 6. SMOOTH INTERNAL LINK SCROLLING
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 100, // Offset for fixed nav
                    behavior: 'smooth'
                });
            }
        });
    });
}