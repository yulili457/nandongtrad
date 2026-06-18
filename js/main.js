/**
 * ========================================
 * Guangzhou Nandong Trading Co., Ltd.
 * Global Business Website JavaScript
 * ========================================
 */

(function() {
    'use strict';

    // ========================================
    // DOM Elements
    // ========================================
    const header = document.querySelector('.header');
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const backToTop = document.querySelector('.back-to-top');
    const loading = document.querySelector('.loading');
    const animatedElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .scale-in');
    const counters = document.querySelectorAll('.stat-number, .about-stat-number');
    const contactForm = document.querySelector('.contact-form');

    // ========================================
    // Loading Animation
    // ========================================
    function hideLoading() {
        if (loading) {
            loading.classList.add('hidden');
            document.body.style.overflow = 'auto';
        }
    }

    window.addEventListener('load', function() {
        setTimeout(hideLoading, 500);
    });

    // ========================================
    // Header Scroll Effect
    // ========================================
    function handleScroll() {
        const scrollY = window.scrollY;

        // Header background on scroll
        if (scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Back to top button
        if (scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }

        // Animate elements on scroll
        animateOnScroll();
    }

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    // ========================================
    // Mobile Menu Toggle
    // ========================================
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            menuToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : 'auto';
        });

        // Close menu on link click
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function() {
                menuToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = 'auto';
            });
        });
    }

    // ========================================
    // Back to Top
    // ========================================
    if (backToTop) {
        backToTop.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ========================================
    // Scroll Animations
    // ========================================
    function animateOnScroll() {
        const windowHeight = window.innerHeight;
        
        animatedElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 100;
            
            if (elementTop < windowHeight - elementVisible) {
                element.classList.add('visible');
            }
        });
    }

    // Initial animation check
    animateOnScroll();

    // ========================================
    // Counter Animation
    // ========================================
    function animateCounters() {
        counters.forEach(counter => {
            if (counter.dataset.animated) return;
            
            const rect = counter.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
            
            if (isVisible) {
                counter.dataset.animated = 'true';
                const target = parseInt(counter.getAttribute('data-target')) || parseInt(counter.textContent);
                const duration = 2000;
                const increment = target / (duration / 16);
                let current = 0;
                
                const updateCounter = () => {
                    current += increment;
                    if (current < target) {
                        counter.textContent = Math.floor(current);
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target;
                    }
                };
                
                updateCounter();
            }
        });
    }

    window.addEventListener('scroll', animateCounters);
    animateCounters();

    // ========================================
    // Smooth Scroll for Anchor Links
    // ========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
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

    // ========================================
    // Active Navigation Link
    // ========================================
    function setActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-menu a');
        
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', setActiveNavLink);

    // ========================================
    // Parallax Effect for Hero
    // ========================================
    function parallaxEffect() {
        const scrolled = window.scrollY;
        const heroShapes = document.querySelectorAll('.hero-bg-shapes .shape');
        
        heroShapes.forEach((shape, index) => {
            const speed = (index + 1) * 0.1;
            shape.style.transform = `translateY(${scrolled * speed}px)`;
        });
    }

    window.addEventListener('scroll', parallaxEffect);

    // ========================================
    // Form Validation and Submission
    // ========================================
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simple validation
            const inputs = contactForm.querySelectorAll('input[required], textarea[required]');
            let isValid = true;
            
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    input.style.borderColor = '#ff4444';
                } else {
                    input.style.borderColor = '#e0e0e0';
                }
            });
            
            // Email validation
            const emailInput = contactForm.querySelector('input[type="email"]');
            if (emailInput && emailInput.value) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(emailInput.value)) {
                    isValid = false;
                    emailInput.style.borderColor = '#ff4444';
                }
            }
            
            if (isValid) {
                // Show success message
                const btn = contactForm.querySelector('button[type="submit"]');
                const originalText = btn.textContent;
                btn.textContent = 'Message Sent!';
                btn.style.background = '#28a745';
                
                setTimeout(() => {
                    btn.textContent = originalText;
                    btn.style.background = '';
                    contactForm.reset();
                }, 3000);
            }
        });
        
        // Remove error styling on input
        contactForm.querySelectorAll('input, textarea').forEach(input => {
            input.addEventListener('input', function() {
                this.style.borderColor = '#e0e0e0';
            });
        });
    }

    // ========================================
    // Newsletter Form
    // ========================================
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            const btn = this.querySelector('button');
            
            if (emailInput && emailInput.value) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (emailRegex.test(emailInput.value)) {
                    const originalText = btn.textContent;
                    btn.textContent = 'Subscribed!';
                    btn.style.background = '#28a745';
                    emailInput.value = '';
                    
                    setTimeout(() => {
                        btn.textContent = originalText;
                        btn.style.background = '';
                    }, 3000);
                }
            }
        });
    }

    // ========================================
    // Card Hover Effects
    // ========================================
    document.querySelectorAll('.service-card, .product-card, .news-card, .team-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });

    // ========================================
    // Intersection Observer for Animations
    // ========================================
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    animatedElements.forEach(element => {
        observer.observe(element);
    });

    // ========================================
    // Keyboard Navigation
    // ========================================
    document.addEventListener('keydown', function(e) {
        // Escape key to close mobile menu
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            menuToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
        
        // Tab key accessibility
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-nav');
        }
    });

    document.addEventListener('mousedown', function() {
        document.body.classList.remove('keyboard-nav');
    });

    // ========================================
    // Lazy Loading Images
    // ========================================
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                    }
                    imageObserver.unobserve(img);
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }

    // ========================================
    // Preload Critical Resources
    // ========================================
    function preloadImages() {
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            if (img.dataset.src) {
                const link = document.createElement('link');
                link.rel = 'preload';
                link.as = 'image';
                link.href = img.dataset.src;
                document.head.appendChild(link);
            }
        });
    }

    // ========================================
    // Service Worker Registration (PWA Ready)
    // ========================================
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            // Service worker registration would go here
            // navigator.serviceWorker.register('/sw.js');
        });
    }

    // ========================================
    // Performance Monitoring
    // ========================================
    if (window.performance) {
        window.addEventListener('load', () => {
            const timing = window.performance.timing;
            const loadTime = timing.loadEventEnd - timing.navigationStart;
            console.log('Page load time:', loadTime + 'ms');
        });
    }

    // ========================================
    // Print Mode Handler
    // ========================================
    window.addEventListener('beforeprint', () => {
        document.body.classList.add('printing');
    });

    window.addEventListener('afterprint', () => {
        document.body.classList.remove('printing');
    });

    // ========================================
    // Touch Support for Mobile
    // ========================================
    let touchStartX = 0;
    let touchEndX = 0;

    document.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, false);

    document.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, false);

    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;

        // Swipe right to open menu
        if (diff > swipeThreshold && touchStartX < 50 && !navMenu.classList.contains('active')) {
            menuToggle.classList.add('active');
            navMenu.classList.add('active');
            document.body.style.overflow = 'hidden';
        }

        // Swipe left to close menu
        if (diff < -swipeThreshold && navMenu.classList.contains('active')) {
            menuToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    }

    // ========================================
    // Reduce Motion for Accessibility
    // ========================================
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    if (prefersReducedMotion.matches) {
        document.documentElement.style.setProperty('--transition-fast', '0.01ms');
        document.documentElement.style.setProperty('--transition-normal', '0.01ms');
        document.documentElement.style.setProperty('--transition-slow', '0.01ms');
    }

    // ========================================
    // Console Branding
    // ========================================
    console.log('%c Guangzhou Nandong Trading Co., Ltd. ', 
        'background: #0066cc; color: white; font-size: 14px; padding: 10px;');
    console.log('%c Global Business Partner ', 
        'background: #ff6b35; color: white; font-size: 12px; padding: 5px;');

})();
