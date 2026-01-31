/**
 * ================================================================
 * BANJARA SAHITYA PARISHATTU - Main JavaScript
 * Handles all interactive functionality for the website
 * ================================================================
 */

/**
 * ==================== SITE CONFIGURATION ====================
 * Change these settings to control website behavior
 */
const SITE_CONFIG = {
    // Mobile View Toggle
    // Set to TRUE  → Show website on mobile devices
    // Set to FALSE → Hide website on mobile devices (shows "Desktop Only" message)
    MOBILE_VIEW_ENABLED: true
};

// Apply mobile view setting
function applyMobileOptimization() {
    const isMobile = window.innerWidth <= 768;
    
    if (SITE_CONFIG.MOBILE_VIEW_ENABLED) {
        document.body.classList.add('mobile-optimized');
        document.body.classList.remove('mobile-disabled');
        removeMobileBlocker();
    } else {
        document.body.classList.remove('mobile-optimized');
        if (isMobile) {
            document.body.classList.add('mobile-disabled');
            showMobileBlocker();
        }
    }
}

// Show blocker message on mobile when disabled
function showMobileBlocker() {
    if (document.getElementById('mobile-blocker')) return;
    
    const blocker = document.createElement('div');
    blocker.id = 'mobile-blocker';
    blocker.innerHTML = `
        <div class="mobile-blocker-content">
            <img src="images/HomePage/banjara-parishath-logo.jpg" alt="Logo" class="blocker-logo">
            <h2>ಕರ್ನಾಟಕ ಬಂಜಾರ ಸಾಹಿತ್ಯ ಪರಿಷತ್ತು (ರಿ)</h2>
            <p>Karnataka Banjara Sahitya Parishattu (R)</p>
            <div class="blocker-message">
                <i class="fas fa-desktop"></i>
                <span>Please visit this website on a desktop or laptop for the best experience.</span>
            </div>
            <p class="blocker-subtext">ದಯವಿಟ್ಟು ಉತ್ತಮ ಅನುಭವಕ್ಕಾಗಿ ಡೆಸ್ಕ್‌ಟಾಪ್ ಅಥವಾ ಲ್ಯಾಪ್‌ಟಾಪ್‌ನಲ್ಲಿ ಈ ವೆಬ್‌ಸೈಟ್ ಅನ್ನು ಭೇಟಿ ಮಾಡಿ.</p>
        </div>
    `;
    document.body.appendChild(blocker);
}

// Remove blocker when enabled
function removeMobileBlocker() {
    const blocker = document.getElementById('mobile-blocker');
    if (blocker) blocker.remove();
}

// Re-check on window resize
window.addEventListener('resize', function() {
    applyMobileOptimization();
});

// Wait for the DOM to be fully loaded before running scripts
document.addEventListener('DOMContentLoaded', function() {
    
    // Apply mobile optimization setting first
    applyMobileOptimization();
    
    // Initialize all components
    initLanguageSwitcher();  // Initialize language first
    initMobileNavigation();
    initStickyHeader();
    initBackToTop();
    initSmoothScroll();
    initDropdowns();
    initContactForm();
    initScrollAnimations();
    initCounterAnimation();
});

/**
 * ==================== LANGUAGE SWITCHER ====================
 * Handles switching between Kannada (primary) and English
 */
function initLanguageSwitcher() {
    const langButtons = document.querySelectorAll('.lang-btn');
    
    if (langButtons.length === 0) return;
    
    // Check for saved language preference, default to Kannada ('kn')
    const savedLang = localStorage.getItem('preferredLanguage') || 'kn';
    
    // Apply saved language on page load
    setLanguage(savedLang);
    
    // Update active button state
    langButtons.forEach(btn => {
        if (btn.dataset.lang === savedLang) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
    
    // Add click event listeners to language buttons
    langButtons.forEach(button => {
        button.addEventListener('click', function() {
            const selectedLang = this.dataset.lang;
            
            // Update active state
            langButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Switch language
            setLanguage(selectedLang);
            
            // Save preference
            localStorage.setItem('preferredLanguage', selectedLang);
            
            // Update HTML lang attribute
            document.documentElement.lang = selectedLang;
        });
    });
}

/**
 * Sets the page language by updating text content
 * @param {string} lang - The language code ('kn' for Kannada, 'en' for English)
 */
function setLanguage(lang) {
    // Find all elements with language data attributes
    const translatableElements = document.querySelectorAll('[data-lang-kn], [data-lang-en]');
    
    translatableElements.forEach(element => {
        const knText = element.getAttribute('data-lang-kn');
        const enText = element.getAttribute('data-lang-en');
        
        if (lang === 'kn' && knText) {
            // Check if element has child elements with icons (preserve icons)
            if (element.querySelector('i')) {
                // Element has icons, only update text nodes
                updateTextPreservingIcons(element, knText);
            } else {
                element.innerHTML = knText;
            }
        } else if (lang === 'en' && enText) {
            if (element.querySelector('i')) {
                updateTextPreservingIcons(element, enText);
            } else {
                element.innerHTML = enText;
            }
        }
    });
    
    // Update document title
    if (lang === 'kn') {
        document.title = 'ಕರ್ನಾಟಕ ಬಂಜಾರ ಸಾಹಿತ್ಯ ಪರಿಷತ್ತು | Karnataka Banjara Sahitya Parishattu';
    } else {
        document.title = 'Karnataka Banjara Sahitya Parishattu | ಕರ್ನಾಟಕ ಬಂಜಾರ ಸಾಹಿತ್ಯ ಪರಿಷತ್ತು';
    }
    
    // Update body font family preference for better Kannada rendering
    document.body.style.fontFamily = lang === 'kn' 
        ? "'Noto Sans Kannada', 'Source Sans Pro', sans-serif"
        : "'Source Sans Pro', 'Noto Sans Kannada', sans-serif";
}

/**
 * Updates text content while preserving icon elements
 * @param {HTMLElement} element - The element to update
 * @param {string} newText - The new text content
 */
function updateTextPreservingIcons(element, newText) {
    // Get all icon elements
    const icons = element.querySelectorAll('i');
    
    // If element contains only text and icons at the start/end
    const iconHTML = Array.from(icons).map(icon => icon.outerHTML).join('');
    
    // Check if icons are at the start or end
    const firstChild = element.firstChild;
    const lastChild = element.lastChild;
    
    if (firstChild && firstChild.nodeType === Node.ELEMENT_NODE && firstChild.tagName === 'I') {
        // Icon is at the start
        element.innerHTML = iconHTML + ' ' + newText;
    } else if (lastChild && lastChild.nodeType === Node.ELEMENT_NODE && lastChild.tagName === 'I') {
        // Icon is at the end
        element.innerHTML = newText + ' ' + iconHTML;
    } else {
        // Just update text, might have icons in the middle or complex structure
        element.innerHTML = newText;
    }
}

/**
 * ==================== MOBILE NAVIGATION ====================
 * Toggles the hamburger menu on mobile devices
 */
function initMobileNavigation() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (!hamburger || !navMenu) return;
    
    // Toggle menu when hamburger is clicked
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Prevent body scrolling when menu is open
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });
    
    // Close menu when a nav link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!hamburger.contains(event.target) && !navMenu.contains(event.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

/**
 * ==================== STICKY HEADER ====================
 * Adds shadow to header when scrolling and handles header appearance
 */
function initStickyHeader() {
    const header = document.getElementById('header');
    
    if (!header) return;
    
    let lastScrollY = window.scrollY;
    let ticking = false;
    
    function updateHeader() {
        const currentScrollY = window.scrollY;
        
        // Add shadow when scrolled
        if (currentScrollY > 50) {
            header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
        } else {
            header.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.08)';
        }
        
        lastScrollY = currentScrollY;
        ticking = false;
    }
    
    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(updateHeader);
            ticking = true;
        }
    });
}

/**
 * ==================== BACK TO TOP BUTTON ====================
 * Shows/hides and handles the back to top button functionality
 */
function initBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');
    
    if (!backToTopBtn) return;
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });
    
    // Scroll to top when button is clicked
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/**
 * ==================== SMOOTH SCROLL ====================
 * Enables smooth scrolling for anchor links
 */
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip if it's just "#" or empty
            if (href === '#' || href === '') return;
            
            const target = document.querySelector(href);
            
            if (target) {
                e.preventDefault();
                
                const headerHeight = document.getElementById('header').offsetHeight;
                
                // Apply extra offset to section links (except Home and Contact)
                let extraOffset = 0;
                if (href !== '#contact' && href !== '#home') {
                    extraOffset = 48; // Half inch = ~48px, scroll higher
                }
                
                const targetPosition = target.getBoundingClientRect().top + window.scrollY - headerHeight + extraOffset;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Update active nav link
                updateActiveNavLink(href);
            }
        });
    });
    
    // Update active link on scroll
    window.addEventListener('scroll', debounce(function() {
        const sections = document.querySelectorAll('section[id]');
        const headerHeight = document.getElementById('header').offsetHeight;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - headerHeight - 100;
            const sectionBottom = sectionTop + section.offsetHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionBottom) {
                updateActiveNavLink('#' + section.id);
            }
        });
    }, 100));
}

/**
 * Updates the active navigation link
 */
function updateActiveNavLink(href) {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === href) {
            link.classList.add('active');
        }
    });
}

/**
 * ==================== DROPDOWN MENUS ====================
 * Handles dropdown menu functionality for mobile
 */
function initDropdowns() {
    const dropdowns = document.querySelectorAll('.dropdown');
    
    dropdowns.forEach(dropdown => {
        const toggle = dropdown.querySelector('.dropdown-toggle');
        
        if (!toggle) return;
        
        toggle.addEventListener('click', function(e) {
            // Only handle on mobile
            if (window.innerWidth <= 768) {
                e.preventDefault();
                dropdown.classList.toggle('active');
            }
        });
    });
}

/**
 * ==================== CONTACT FORM ====================
 * Handles form validation and submission
 */
function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const subject = document.getElementById('subject').value.trim();
        const message = document.getElementById('message').value.trim();
        
        // Validation
        if (!name || !email || !subject || !message) {
            showNotification('Please fill in all required fields.', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showNotification('Please enter a valid email address.', 'error');
            return;
        }
        
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        // Create form data
        const formData = new FormData(form);
        
        // Submit to Formspree
        fetch('https://formspree.io/f/mykeqwlv', {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(function(response) {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            
            if (response.ok) {
                showNotification('Thank you! Your message has been sent successfully.', 'success');
                form.reset();
            } else {
                response.json().then(function(data) {
                    if (data.errors) {
                        showNotification('Error: ' + data.errors.map(e => e.message).join(', '), 'error');
                    } else {
                        showNotification('Oops! There was a problem sending your message.', 'error');
                    }
                });
            }
        })
        .catch(function(error) {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            showNotification('Network error. Please try again later.', 'error');
            console.error('Form submission error:', error);
        });
    });
}

/**
 * Validates email format
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Shows a notification message
 */
function showNotification(message, type = 'info') {
    // Remove any existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close" aria-label="Close notification">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    // Add styles dynamically
    notification.style.cssText = `
        position: fixed;
        top: 140px;
        right: 20px;
        max-width: 400px;
        padding: 16px 20px;
        background: ${type === 'success' ? '#10B981' : '#EF4444'};
        color: white;
        border-radius: 8px;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 16px;
        z-index: 10000;
        animation: slideIn 0.3s ease-out;
    `;
    
    // Add animation keyframes
    if (!document.getElementById('notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            @keyframes slideIn {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            @keyframes slideOut {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(100%);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(notification);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.style.cssText = `
        background: none;
        border: none;
        color: white;
        cursor: pointer;
        padding: 4px;
        opacity: 0.8;
        transition: opacity 0.2s;
    `;
    
    closeBtn.addEventListener('click', function() {
        removeNotification(notification);
    });
    
    // Auto-remove after 5 seconds
    setTimeout(function() {
        removeNotification(notification);
    }, 5000);
}

function removeNotification(notification) {
    if (notification && notification.parentNode) {
        notification.style.animation = 'slideOut 0.3s ease-out forwards';
        setTimeout(function() {
            notification.remove();
        }, 300);
    }
}

/**
 * ==================== SCROLL ANIMATIONS ====================
 * Animates elements when they come into view
 */
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll(
        '.section-header, .news-card, .event-card, .publication-card, ' +
        '.gallery-item, .contact-card, .about-content, .feature'
    );
    
    // Create intersection observer
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -50px 0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Set initial styles and observe elements
    animatedElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = `opacity 0.6s ease-out ${index % 4 * 0.1}s, transform 0.6s ease-out ${index % 4 * 0.1}s`;
        observer.observe(element);
    });
}

/**
 * ==================== COUNTER ANIMATION ====================
 * Animates the statistics numbers in the hero section
 */
function initCounterAnimation() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    if (statNumbers.length === 0) return;
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    statNumbers.forEach(stat => {
        observer.observe(stat);
    });
}

function animateCounter(element) {
    const targetText = element.textContent;
    const hasPlus = targetText.includes('+');
    const target = parseInt(targetText.replace(/\D/g, ''));
    
    if (isNaN(target)) return;
    
    const duration = 2000; // 2 seconds
    const frameRate = 60;
    const totalFrames = (duration / 1000) * frameRate;
    const increment = target / totalFrames;
    
    let current = 0;
    let frame = 0;
    
    const timer = setInterval(function() {
        frame++;
        current = Math.min(Math.round(increment * frame), target);
        
        element.textContent = current.toLocaleString() + (hasPlus ? '+' : '');
        
        if (frame >= totalFrames) {
            clearInterval(timer);
        }
    }, 1000 / frameRate);
}

/**
 * ==================== UTILITY FUNCTIONS ====================
 */

/**
 * Debounce function to limit how often a function is called
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = function() {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Throttle function to ensure a function is called at most once in a specified period
 */
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(function() {
                inThrottle = false;
            }, limit);
        }
    };
}

/**
 * ==================== LAZY LOADING IMAGES ====================
 * Implements lazy loading for images (native support fallback)
 */
if ('loading' in HTMLImageElement.prototype) {
    // Native lazy loading supported
    const images = document.querySelectorAll('img[data-src]');
    images.forEach(img => {
        img.src = img.dataset.src;
    });
} else {
    // Fallback for browsers that don't support native lazy loading
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    const lazyObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                lazyObserver.unobserve(img);
            }
        });
    });
    
    lazyImages.forEach(img => {
        lazyObserver.observe(img);
    });
}

/**
 * ==================== ACCESSIBILITY ENHANCEMENTS ====================
 */

// Handle keyboard navigation for dropdowns
document.addEventListener('keydown', function(e) {
    // Handle Escape key to close mobile menu
    if (e.key === 'Escape') {
        const hamburger = document.getElementById('hamburger');
        const navMenu = document.getElementById('nav-menu');
        
        if (hamburger && navMenu && navMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
});

// Focus trap for mobile menu
function trapFocus(element) {
    const focusableElements = element.querySelectorAll(
        'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select'
    );
    const firstFocusable = focusableElements[0];
    const lastFocusable = focusableElements[focusableElements.length - 1];
    
    element.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            if (e.shiftKey) {
                if (document.activeElement === firstFocusable) {
                    lastFocusable.focus();
                    e.preventDefault();
                }
            } else {
                if (document.activeElement === lastFocusable) {
                    firstFocusable.focus();
                    e.preventDefault();
                }
            }
        }
    });
}

/**
 * ==================== PRELOADER (Optional) ====================
 * Can be enabled by adding a preloader element to HTML
 */
window.addEventListener('load', function() {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        preloader.style.opacity = '0';
        setTimeout(function() {
            preloader.style.display = 'none';
        }, 500);
    }
});

// Log that the script has loaded successfully
console.log('🎉 Banjara Sahitya Parishattu website initialized successfully!');
