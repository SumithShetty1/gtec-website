// G-TEC Website Scripts - Enhanced Version with All Features Merged

console.log("G-TEC Computer Education Website Loaded");

// DOM Ready Function
document.addEventListener("DOMContentLoaded", function() {
    
    // ========== MOBILE MENU TOGGLE (Enhanced from all files) ==========
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('nav');
    
    if (mobileMenuBtn && nav) {
        mobileMenuBtn.addEventListener('click', function() {
            nav.classList.toggle('active');
            nav.classList.toggle('show'); // Keep compatibility with script.js
            this.innerHTML = nav.classList.contains('active') 
                ? '<i class="fas fa-times"></i>' 
                : '<i class="fas fa-bars"></i>';
        });
        
        // Close menu when clicking outside (from index.js & courses.js)
        document.addEventListener('click', function(event) {
            if (!nav.contains(event.target) && !mobileMenuBtn.contains(event.target)) {
                nav.classList.remove('active', 'show');
                mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });
    }
    
    // ========== CONTACT FORM HANDLING (from script.js) ==========
    const contactForm = document.getElementById('contactForm');
    const formMsg = document.getElementById('formMsg');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                course: document.getElementById('course').value,
                message: document.getElementById('message').value
            };
            
            // Simple validation
            if (!formData.name || !formData.email || !formData.phone) {
                showMessage('Please fill in all required fields', 'error');
                return;
            }
            
            // Show success message
            showMessage('Thank you! Your enquiry has been submitted. We will contact you within 24 hours.', 'success');
            
            // In a real application, you would send the data to a server here
            // Example: sendFormData(formData);
            
            // Reset form
            contactForm.reset();
            
            // Log to console (for demo)
            console.log('Form submitted:', formData);
        });
    }
    
    // Function to show form messages
    function showMessage(text, type) {
        if (!formMsg) return;
        
        formMsg.textContent = text;
        formMsg.className = 'form-message ' + type;
        
        // Remove message after 5 seconds
        setTimeout(() => {
            formMsg.textContent = '';
            formMsg.className = 'form-message';
        }, 5000);
    }
    
    // ========== SCROLL ANIMATIONS (Enhanced from all files) ==========
    function initScrollAnimations() {
        const animateElements = document.querySelectorAll('.animate-fade, .animate-left, .animate-right');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0) translateX(0)';
                    entry.target.classList.add('animated'); // Add class for CSS animations
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        });
        
        animateElements.forEach(el => {
            el.style.opacity = '0';
            
            // Apply initial transforms based on animation class (from courses.js)
            if (el.classList.contains('animate-left')) {
                el.style.transform = 'translateX(-50px)';
            } else if (el.classList.contains('animate-right')) {
                el.style.transform = 'translateX(50px)';
            } else {
                el.style.transform = 'translateY(30px)';
            }
            
            el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            observer.observe(el);
        });
        
        // Stagger animations for course cards (from courses.js)
        const courseCards = document.querySelectorAll('.category-card');
        courseCards.forEach((card, index) => {
            card.style.animationDelay = `${index * 0.1}s`;
        });
    }
    
    // Initialize animations
    initScrollAnimations();
    
    // ========== PREMIUM CAROUSEL (from index.js & courses.js) ==========
    const carouselSlides = document.querySelectorAll('.carousel-slide');
    const carouselDots = document.querySelectorAll('.carousel-dot');
    const prevBtn = document.querySelector('.carousel-arrow.prev');
    const nextBtn = document.querySelector('.carousel-arrow.next');
    
    if (carouselSlides.length > 0) {
        let currentSlide = 0;
        let slideInterval;
        const slideDuration = 5000; // 5 seconds per slide
        
        // Initialize carousel
        function initCarousel() {
            updateCarousel();
            startAutoSlide();
            
            // Event listeners for dots
            carouselDots.forEach(dot => {
                dot.addEventListener('click', function() {
                    const slideIndex = parseInt(this.getAttribute('data-slide'));
                    goToSlide(slideIndex);
                });
            });
            
            // Event listeners for arrows
            if (prevBtn) prevBtn.addEventListener('click', prevSlide);
            if (nextBtn) nextBtn.addEventListener('click', nextSlide);
            
            // Pause on hover
            const carouselContainer = document.querySelector('.carousel-container');
            if (carouselContainer) {
                carouselContainer.addEventListener('mouseenter', pauseAutoSlide);
                carouselContainer.addEventListener('mouseleave', startAutoSlide);
            }
            
            // Keyboard navigation
            document.addEventListener('keydown', function(e) {
                if (e.key === 'ArrowLeft') prevSlide();
                if (e.key === 'ArrowRight') nextSlide();
                if (e.key === ' ') {
                    e.preventDefault();
                    pauseAutoSlide();
                    setTimeout(startAutoSlide, 3000);
                }
            });
            
            // Touch/swipe support
            let touchStartX = 0;
            let touchEndX = 0;
            
            const carouselHero = document.querySelector('.carousel-hero');
            if (carouselHero) {
                carouselHero.addEventListener('touchstart', function(e) {
                    touchStartX = e.changedTouches[0].screenX;
                    pauseAutoSlide();
                });
                
                carouselHero.addEventListener('touchend', function(e) {
                    touchEndX = e.changedTouches[0].screenX;
                    handleSwipe();
                    startAutoSlide();
                });
            }
        }
        
        // Update carousel display
        function updateCarousel() {
            carouselSlides.forEach((slide, index) => {
                slide.classList.remove('active');
                if (index === currentSlide) {
                    slide.classList.add('active');
                }
            });
            
            carouselDots.forEach((dot, index) => {
                dot.classList.remove('active');
                if (index === currentSlide) {
                    dot.classList.add('active');
                }
            });
        }
        
        // Navigate to specific slide
        function goToSlide(index) {
            currentSlide = index;
            updateCarousel();
            resetAutoSlide();
        }
        
        // Next slide
        function nextSlide() {
            currentSlide = (currentSlide + 1) % carouselSlides.length;
            updateCarousel();
            resetAutoSlide();
        }
        
        // Previous slide
        function prevSlide() {
            currentSlide = (currentSlide - 1 + carouselSlides.length) % carouselSlides.length;
            updateCarousel();
            resetAutoSlide();
        }
        
        // Auto-slide functions
        function startAutoSlide() {
            slideInterval = setInterval(nextSlide, slideDuration);
        }
        
        function pauseAutoSlide() {
            clearInterval(slideInterval);
        }
        
        function resetAutoSlide() {
            pauseAutoSlide();
            startAutoSlide();
        }
        
        // Handle swipe gestures
        function handleSwipe() {
            const swipeThreshold = 50;
            if (touchEndX < touchStartX - swipeThreshold) nextSlide();
            if (touchEndX > touchStartX + swipeThreshold) prevSlide();
        }
        
        // Initialize the carousel
        initCarousel();
    }
    
    // ========== COURSES PAGE SPECIFIC FUNCTIONALITY (from courses.js) ==========
    
    // Smooth scroll for category navigation
    const categoryLinks = document.querySelectorAll('.category-nav-btn');
    categoryLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add active class to category navigation on scroll
    const courseSections = document.querySelectorAll('.course-section');
    if (courseSections.length > 0) {
        const observerOptions = {
            threshold: 0.3,
            rootMargin: '-100px 0px -100px 0px'
        };
        
        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute('id');
                    categoryLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${id}`) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        }, observerOptions);
        
        courseSections.forEach(section => {
            sectionObserver.observe(section);
        });
    }
    
    // ========== TESTIMONIAL SLIDER (from script.js) ==========
    function initTestimonialSlider() {
        const testimonialCards = document.querySelectorAll('.testimonial-card');
        if (testimonialCards.length <= 1) return;
        
        let currentIndex = 0;
        
        function showTestimonial(index) {
            testimonialCards.forEach(card => {
                card.style.display = 'none';
            });
            
            testimonialCards[index].style.display = 'block';
            
            // Add fade animation
            testimonialCards[index].style.animation = 'fadeIn 0.8s ease-out';
        }
        
        // Show first testimonial
        showTestimonial(currentIndex);
        
        // Auto rotate testimonials every 5 seconds
        setInterval(() => {
            currentIndex = (currentIndex + 1) % testimonialCards.length;
            showTestimonial(currentIndex);
        }, 5000);
    }
    
    // Initialize testimonial slider if exists
    if (document.querySelector('.testimonial-slider')) {
        initTestimonialSlider();
    }
    
    // ========== SET ACTIVE NAV LINK (from script.js) ==========
    function setActiveNavLink() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const navLinks = document.querySelectorAll('nav a');
        
        navLinks.forEach(link => {
            const linkHref = link.getAttribute('href');
            if (linkHref === currentPage || (currentPage === '' && linkHref === 'index.html')) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }
    
    setActiveNavLink();
    
    // ========== SMOOTH SCROLL FOR ANCHOR LINKS (from script.js) ==========
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href === '#') return;
            
            const targetElement = document.querySelector(href);
            if (targetElement) {
                e.preventDefault();
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ========== ADD CURRENT YEAR TO FOOTER (from script.js) ==========
    const yearElement = document.querySelector('.current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
});

// ========== UTILITY FUNCTIONS ==========

// Utility function to send form data (for future implementation)
async function sendFormData(formData) {
    try {
        // This is where you would send data to your backend
        // const response = await fetch('/api/contact', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify(formData)
        // });
        
        // const result = await response.json();
        // return result;
        
        // For now, simulate a successful submission
        return { success: true, message: 'Form submitted successfully' };
    } catch (error) {
        console.error('Error submitting form:', error);
        return { success: false, message: 'Error submitting form' };
    }
}

// ========== DYNAMIC CSS (from script.js) ==========
const style = document.createElement('style');
style.textContent = `
    .form-message {
        padding: 10px;
        margin-top: 15px;
        border-radius: 4px;
        text-align: center;
        font-weight: 600;
        transition: all 0.3s ease;
    }
    
    .form-message.success {
        background-color: #d4edda;
        color: #155724;
        border: 1px solid #c3e6cb;
    }
    
    .form-message.error {
        background-color: #f8d7da;
        color: #721c24;
        border: 1px solid #f5c6cb;
    }
    
    .social-icons {
        display: flex;
        gap: 15px;
        margin-top: 20px;
    }
    
    .social-icon {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 40px;
        height: 40px;
        background: rgba(255, 255, 255, 0.1);
        color: white;
        border-radius: 50%;
        text-decoration: none;
        transition: all 0.3s ease;
    }
    
    .social-icon:hover {
        background: var(--accent-gold);
        transform: translateY(-3px);
    }
    
    @media (max-width: 768px) {
        nav.show, nav.active {
            display: flex !important;
            flex-direction: column;
            position: absolute;
            top: 100%;
            left: 0;
            width: 100%;
            background: var(--primary-blue);
            padding: 1rem;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
            z-index: 1000;
        }
        
        nav:not(.show):not(.active) {
            display: none;
        }
    }
    
    /* Animation classes for scroll animations */
    .animate-left {
        transform: translateX(-50px);
    }
    
    .animate-right {
        transform: translateX(50px);
    }
    
    .animate-fade {
        transform: translateY(20px);
    }
    
    /* Stagger animations for course cards */
    .category-card {
        animation-delay: var(--animation-delay, 0s);
    }
`;

document.head.appendChild(style);
