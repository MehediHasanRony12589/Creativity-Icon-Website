// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 1000,
    easing: 'ease-in-out',
    once: true,
    mirror: false
});

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initNavigation();
    initHeroAnimations();
    initProductCarousel();
    initProductModals();
    initContactForm();
    initScrollEffects();
    initCounterAnimations();
});

// Navigation functionality
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Mobile menu toggle
    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Active link highlighting
    window.addEventListener('scroll', function() {
        let current = '';
        const sections = document.querySelectorAll('section[id]');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
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
}

// Hero section animations
function initHeroAnimations() {
    // Parallax effect for hero background
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const heroBackground = document.querySelector('.hero-background');
        if (heroBackground) {
            heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });

    // Smooth scroll for hero scroll indicator
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', function(e) {
            e.preventDefault();
            const targetSection = document.querySelector('#about');
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    }
}

// Product carousel initialization
function initProductCarousel() {
    const productsSwiper = new Swiper('.products-swiper', {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        breakpoints: {
            768: {
                slidesPerView: 2,
                spaceBetween: 30,
            },
            1024: {
                slidesPerView: 3,
                spaceBetween: 30,
            }
        },
        effect: 'slide',
        speed: 800,
        on: {
            slideChange: function() {
                // Add custom animations on slide change
                const activeSlide = this.slides[this.activeIndex];
                if (activeSlide) {
                    const card = activeSlide.querySelector('.product-card');
                    if (card) {
                        card.style.transform = 'scale(1.02)';
                        setTimeout(() => {
                            card.style.transform = 'scale(1)';
                        }, 300);
                    }
                }
            }
        }
    });

    // Pause autoplay on hover
    const swiperContainer = document.querySelector('.products-swiper');
    if (swiperContainer) {
        swiperContainer.addEventListener('mouseenter', () => {
            productsSwiper.autoplay.stop();
        });
        
        swiperContainer.addEventListener('mouseleave', () => {
            productsSwiper.autoplay.start();
        });
    }
}

// Product modal functionality
function initProductModals() {
    const modal = document.getElementById('productModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalContent = document.getElementById('modalContent');
    const closeBtn = document.querySelector('.modal-close');
    const learnMoreBtns = document.querySelectorAll('.btn-learn-more');
    const actionBtns = document.querySelectorAll('.action-btn');

    // Product data
    const productData = {
        aha: {
            title: 'AHA - Advance Home Automation',
            content: `
                <div class="modal-product-details">
                    <img src="assets/images/aha-product.png" alt="AHA Product" class="modal-product-image">
                    <div class="modal-product-info">
                        <h3>Advance Home Automation System</h3>
                        <p class="product-category-modal">Smart Home Technology</p>
                        
                        <div class="product-description-modal">
                            <p>The AHA (Advance Home Automation) system is a comprehensive IoT-based solution that transforms traditional homes into intelligent, connected environments. Our system provides seamless control over lighting, climate, security, and entertainment systems through intuitive interfaces.</p>
                        </div>
                        
                        <div class="product-features-modal">
                            <h4>Key Features:</h4>
                            <ul>
                                <li><i class="fas fa-check"></i> Smart lighting control with scheduling and dimming</li>
                                <li><i class="fas fa-check"></i> Climate monitoring and automated HVAC control</li>
                                <li><i class="fas fa-check"></i> Integrated security system with real-time alerts</li>
                                <li><i class="fas fa-check"></i> Mobile app for remote access and control</li>
                                <li><i class="fas fa-check"></i> Voice command integration (Alexa, Google Assistant)</li>
                                <li><i class="fas fa-check"></i> Energy efficiency optimization and reporting</li>
                                <li><i class="fas fa-check"></i> Real-time monitoring dashboard</li>
                            </ul>
                        </div>
                        
                        <div class="product-specs-modal">
                            <h4>Technical Specifications:</h4>
                            <div class="specs-grid">
                                <div class="spec-item">
                                    <span class="spec-label">Connectivity:</span>
                                    <span class="spec-value">Wi-Fi, Bluetooth, Zigbee</span>
                                </div>
                                <div class="spec-item">
                                    <span class="spec-label">Compatibility:</span>
                                    <span class="spec-value">iOS, Android, Web</span>
                                </div>
                                <div class="spec-item">
                                    <span class="spec-label">Power:</span>
                                    <span class="spec-value">12V DC, Battery Backup</span>
                                </div>
                                <div class="spec-item">
                                    <span class="spec-label">Range:</span>
                                    <span class="spec-value">Up to 100m indoor</span>
                                </div>
                            </div>
                        </div>
                        
                        <div class="product-applications-modal">
                            <h4>Applications:</h4>
                            <p>Ideal for residential homes, smart apartments, office buildings, and educational institutions looking to implement modern automation solutions.</p>
                        </div>
                    </div>
                </div>
            `
        },
        ama: {
            title: 'AMA - Advance Machine Assembly',
            content: `
                <div class="modal-product-details">
                    <img src="assets/images/ama-product.png" alt="AMA Product" class="modal-product-image">
                    <div class="modal-product-info">
                        <h3>Advance Machine Assembly System</h3>
                        <p class="product-category-modal">Industrial Automation</p>
                        
                        <div class="product-description-modal">
                            <p>The AMA (Advance Machine Assembly) system represents the cutting edge of industrial automation technology. Designed for precision manufacturing and automated production lines, our system integrates advanced robotics with intelligent control systems.</p>
                        </div>
                        
                        <div class="product-features-modal">
                            <h4>Key Features:</h4>
                            <ul>
                                <li><i class="fas fa-check"></i> High-precision robotic assembly Visualization</li>
                                <li><i class="fas fa-check"></i> Integrated quality control sensors</li>
                                <li><i class="fas fa-check"></i> Programmable Logic Controller (PLC) integration</li>
                                <li><i class="fas fa-check"></i> Real-time production monitoring</li>
                                <li><i class="fas fa-check"></i> Flexible production line configuration</li>
                                <li><i class="fas fa-check"></i> Advanced safety systems and protocols</li>
                                <li><i class="fas fa-check"></i> Data analytics and performance reporting</li>
                            </ul>
                        </div>
                        
                        <div class="product-specs-modal">
                            <h4>Technical Specifications:</h4>
                            <div class="specs-grid">
                                <div class="spec-item">
                                    <span class="spec-label">Precision:</span>
                                    <span class="spec-value">±0.1mm repeatability</span>
                                </div>
                                <div class="spec-item">
                                    <span class="spec-label">Speed:</span>
                                    <span class="spec-value">Up to 120 cycles/min</span>
                                </div>
                                <div class="spec-item">
                                    <span class="spec-label">Payload:</span>
                                    <span class="spec-value">5-50kg capacity</span>
                                </div>
                                <div class="spec-item">
                                    <span class="spec-label">Control:</span>
                                    <span class="spec-value">Siemens/Allen-Bradley PLC</span>
                                </div>
                            </div>
                        </div>
                        
                        <div class="product-applications-modal">
                            <h4>Applications:</h4>
                            <p>Perfect for automotive manufacturing, electronics assembly, pharmaceutical production, and research institutions focusing on advanced manufacturing technologies.</p>
                        </div>
                    </div>
                </div>
            `
        },
        gafs: {
            title: 'GAFS ULTRA - Gas And Fire Shield',
            content: `
                <div class="modal-product-details">
                    <img src="assets/images/gafs-ultra-product.png" alt="GAFS ULTRA Product" class="modal-product-image">
                    <div class="modal-product-info">
                        <h3>Gas And Fire Shield Ultra System</h3>
                        <p class="product-category-modal">Safety & Security Technology</p>
                        
                        <div class="product-description-modal">
                            <p>The GAFS ULTRA (Gas And Fire Shield Ultra) system is an advanced safety monitoring solution designed for industrial and commercial environments. It provides comprehensive gas detection, fire safety monitoring, and automated emergency response capabilities.</p>
                        </div>
                        
                        <div class="product-features-modal">
                            <h4>Key Features:</h4>
                            <ul>
                                <li><i class="fas fa-check"></i> Multi-gas detection (CO, CO2, CH4, H2S, etc.)</li>
                                <li><i class="fas fa-check"></i> Advanced fire and smoke detection</li>
                                <li><i class="fas fa-check"></i> Real-time alert and notification systems</li>
                                <li><i class="fas fa-check"></i> Automated emergency response protocols</li>
                                <li><i class="fas fa-check"></i> Remote monitoring dashboard</li>
                                <li><i class="fas fa-check"></i> Data logging and compliance reporting</li>
                                <li><i class="fas fa-check"></i> Integration with building management systems</li>
                            </ul>
                        </div>
                        
                        <div class="product-specs-modal">
                            <h4>Technical Specifications:</h4>
                            <div class="specs-grid">
                                <div class="spec-item">
                                    <span class="spec-label">Detection Range:</span>
                                    <span class="spec-value">0-100% LEL</span>
                                </div>
                                <div class="spec-item">
                                    <span class="spec-label">Response Time:</span>
                                    <span class="spec-value">&lt; 30 seconds</span>
                                </div>
                                <div class="spec-item">
                                    <span class="spec-label">Operating Temp:</span>
                                    <span class="spec-value">-40°C to +70°C</span>
                                </div>
                                <div class="spec-item">
                                    <span class="spec-label">Certification:</span>
                                    <span class="spec-value">ATEX, IECEx, UL</span>
                                </div>
                            </div>
                        </div>
                        
                        <div class="product-applications-modal">
                            <h4>Applications:</h4>
                            <p>Essential for industrial facilities, chemical plants, laboratories, commercial buildings, and educational institutions requiring comprehensive safety monitoring systems.</p>
                        </div>
                    </div>
                </div>
            `
        }
    };

    // Open modal function
    function openModal(productKey) {
        const product = productData[productKey];
        if (product) {
            modalTitle.textContent = product.title;
            modalContent.innerHTML = product.content;
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        }
    }

    // Close modal function
    function closeModal() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    // Event listeners for learn more buttons
    learnMoreBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const productKey = this.getAttribute('data-product');
            openModal(productKey);
        });
    });

    // Event listeners for action buttons
    actionBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const productKey = this.getAttribute('data-product');
            if (productKey) {
                openModal(productKey);
            }
        });
    });

    // Close modal events
    closeBtn.addEventListener('click', closeModal);
    
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            closeModal();
        }
    });
}

// Contact form functionality
function initContactForm() {
    const form = document.querySelector('.form');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(form);
            const formObject = {};
            formData.forEach((value, key) => {
                formObject[key] = value;
            });
            
            // Show loading state
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<div class="loading"></div> Sending...';
            submitBtn.disabled = true;
            
            // Simulate form submission (replace with actual form handling)
            setTimeout(() => {
                // Reset form
                form.reset();
                
                // Show success message
                submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
                submitBtn.style.background = 'var(--success-color)';
                
                // Reset button after 3 seconds
                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                    submitBtn.style.background = '';
                }, 3000);
                
                // Show success notification
                showNotification('Message sent successfully! We\'ll get back to you soon.', 'success');
            }, 2000);
        });
    }
}

// Scroll effects
function initScrollEffects() {
    // Fade in animation for elements
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe elements with fade-in class
    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });
}

// Counter animations
function initCounterAnimations() {
    const counters = document.querySelectorAll('.stat-number[data-count]');
    
    const counterObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-count'));
                const duration = 2000; // 2 seconds
                const increment = target / (duration / 16); // 60fps
                let current = 0;
                
                counter.classList.add('counting');
                
                const updateCounter = () => {
                    current += increment;
                    if (current < target) {
                        counter.textContent = Math.floor(current);
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target;
                        if (target === 100) {
                            counter.textContent = target + '%';
                        }
                    }
                };
                
                updateCounter();
                counterObserver.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

// Utility function to show notifications
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? 'var(--success-color)' : 'var(--primary-color)'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: var(--radius-md);
        box-shadow: var(--shadow-lg);
        z-index: 3000;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
        max-width: 400px;
        animation: slideInRight 0.3s ease-out;
    `;
    
    // Add to DOM
    document.body.appendChild(notification);
    
    // Close functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.animation = 'slideOutRight 0.3s ease-in';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (document.body.contains(notification)) {
            notification.style.animation = 'slideOutRight 0.3s ease-in';
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }
    }, 5000);
}

// Add notification animations to CSS
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        cursor: pointer;
        padding: 0.25rem;
        border-radius: 50%;
        transition: background-color 0.2s;
    }
    
    .notification-close:hover {
        background-color: rgba(255, 255, 255, 0.2);
    }
    
    .modal-product-details {
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
    }
    
    .modal-product-image {
        width: 100%;
        height: 200px;
        object-fit: cover;
        border-radius: var(--radius-md);
    }
    
    .product-category-modal {
        color: var(--secondary-color);
        font-weight: 600;
        text-transform: uppercase;
        font-size: 0.875rem;
        margin-bottom: 1rem;
    }
    
    .product-features-modal ul {
        list-style: none;
        padding: 0;
    }
    
    .product-features-modal li {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        margin-bottom: 0.5rem;
        color: var(--text-light);
    }
    
    .product-features-modal i {
        color: var(--success-color);
        font-size: 0.875rem;
    }
    
    .specs-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 1rem;
        margin-top: 1rem;
    }
    
    .spec-item {
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
    }
    
    .spec-label {
        font-weight: 600;
        color: var(--text-dark);
        font-size: 0.875rem;
    }
    
    .spec-value {
        color: var(--text-light);
        font-size: 0.875rem;
    }
    
    @media (max-width: 768px) {
        .specs-grid {
            grid-template-columns: 1fr;
        }
        
        .modal-content {
            margin: 10% auto;
            width: 95%;
        }
    }
`;
document.head.appendChild(notificationStyles);

// Performance optimization: Lazy loading for images
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading when DOM is ready
document.addEventListener('DOMContentLoaded', initLazyLoading);

// Smooth scrolling polyfill for older browsers
if (!('scrollBehavior' in document.documentElement.style)) {
    const smoothScrollPolyfill = document.createElement('script');
    smoothScrollPolyfill.src = 'https://cdn.jsdelivr.net/gh/iamdustan/smoothscroll@master/src/smoothscroll.js';
    document.head.appendChild(smoothScrollPolyfill);
}

// services section learn more button info 





const openSafetyModalBtn = document.getElementById('openSafetyModal');
const safetyModal = document.getElementById('safetyModal');
const closeBtn = safetyModal.querySelector('.close');

function openModal() {
  safetyModal.style.display = 'flex';
  safetyModal.setAttribute('aria-hidden', 'false');
  safetyModal.querySelector('.detail-toggle').focus();
}

function closeModal() {
  safetyModal.style.display = 'none';
  safetyModal.setAttribute('aria-hidden', 'true');
  openSafetyModalBtn.focus();
}

// Open modal on button click
openSafetyModalBtn.addEventListener('click', openModal);

// Close modal on close button click
closeBtn.addEventListener('click', closeModal);

// Close modal on clicking outside content
safetyModal.addEventListener('click', e => {
  if (e.target === safetyModal) {
    closeModal();
  }
});

// Expand/collapse details
safetyModal.querySelectorAll('.detail-toggle').forEach(btn => {
  btn.addEventListener('click', () => {
    const expanded = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', !expanded);
    const content = btn.nextElementSibling;
    content.hidden = expanded;
  });
});





const modal = document.getElementById("infoModal");
const btn = document.getElementById("learnMoreBtn");
const span = document.querySelector(".close");

btn.onclick = function() {
    modal.style.display = "block";
}

span.onclick = function() {
    modal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

document.querySelectorAll('.detail-toggle').forEach(button => {
    button.addEventListener('click', () => {
      const expanded = button.getAttribute('aria-expanded') === 'true';
      button.setAttribute('aria-expanded', !expanded);
      const content = button.nextElementSibling;
      if (!expanded) {
        content.hidden = false;
      } else {
        content.hidden = true;
      }
    });
  });


  

  // Close modal on ESC key
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && safetyModal.style.display === 'flex') {
    closeModal();
  }
});


  document.addEventListener('DOMContentLoaded', () => {
    const openSecurityModalBtn = document.getElementById('openSecurityModal');
    const securityModal = document.getElementById('securityModal');
    const closeBtn = securityModal.querySelector('.close');

    function openModal() {
      securityModal.style.display = 'flex';
      securityModal.setAttribute('aria-hidden', 'false');
      // Focus first toggle or close button for accessibility
      const firstToggle = securityModal.querySelector('.detail-toggle');
      (firstToggle || closeBtn).focus();
    }

    function closeModal() {
      securityModal.style.display = 'none';
      securityModal.setAttribute('aria-hidden', 'true');
      openSecurityModalBtn.focus();
    }

    openSecurityModalBtn.addEventListener('click', openModal);

    closeBtn.addEventListener('click', closeModal);

    // Close modal when clicking outside modal content
    securityModal.addEventListener('click', e => {
      if (e.target === securityModal) {
        closeModal();
      }
    });

    // Close modal on ESC key
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && securityModal.style.display === 'flex') {
        closeModal();
      }
    });

    // Toggle detail sections inside modal
    securityModal.querySelectorAll('.detail-toggle').forEach(btn => {
      btn.addEventListener('click', () => {
        const expanded = btn.getAttribute('aria-expanded') === 'true';
        btn.setAttribute('aria-expanded', !expanded);
        const content = btn.nextElementSibling;
        content.hidden = expanded;
      });
    });
  });


  // Startup sollutions //

  document.addEventListener('DOMContentLoaded', () => {
  const openStartupModalBtn = document.getElementById('openStartupModal');
  const startupModal = document.getElementById('startupModal');
  const closeBtn = startupModal.querySelector('.close');

  function openModal() {
    startupModal.style.display = 'flex';
    startupModal.setAttribute('aria-hidden', 'false');
    // Focus first toggle or close button for accessibility
    const firstToggle = startupModal.querySelector('.detail-toggle');
    (firstToggle || closeBtn).focus();
  }

  function closeModal() {
    startupModal.style.display = 'none';
    startupModal.setAttribute('aria-hidden', 'true');
    openStartupModalBtn.focus();
  }

  openStartupModalBtn.addEventListener('click', openModal);
  closeBtn.addEventListener('click', closeModal);

  startupModal.addEventListener('click', e => {
    if (e.target === startupModal) {
      closeModal();
    }
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && startupModal.style.display === 'flex') {
      closeModal();
    }
  });

  startupModal.querySelectorAll('.detail-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', !expanded);
      const content = btn.nextElementSibling;
      content.hidden = expanded;
    });
  });
});


// for automation section //

document.addEventListener('DOMContentLoaded', () => {
  const openAutomationModalBtn = document.getElementById('openAutomationModal');
  const automationModal = document.getElementById('automationModal');
  const closeBtn = automationModal.querySelector('.close');

  function openModal() {
    automationModal.style.display = 'flex';
    automationModal.setAttribute('aria-hidden', 'false');
    const firstToggle = automationModal.querySelector('.detail-toggle');
    (firstToggle || closeBtn).focus();
  }

  function closeModal() {
    automationModal.style.display = 'none';
    automationModal.setAttribute('aria-hidden', 'true');
    openAutomationModalBtn.focus();
  }

  openAutomationModalBtn.addEventListener('click', openModal);
  closeBtn.addEventListener('click', closeModal);

  automationModal.addEventListener('click', e => {
    if (e.target === automationModal) {
      closeModal();
    }
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && automationModal.style.display === 'flex') {
      closeModal();
    }
  });

  automationModal.querySelectorAll('.detail-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', !expanded);
      const content = btn.nextElementSibling;
      content.hidden = expanded;
    });
  });
});

// IOT button design //

document.addEventListener('DOMContentLoaded', () => {
  const openIotModalBtn = document.getElementById('openIotModal');
  const iotModal = document.getElementById('iotModal');
  const closeBtn = iotModal.querySelector('.close');

  function openModal() {
    iotModal.style.display = 'flex';
    iotModal.setAttribute('aria-hidden', 'false');
    const firstToggle = iotModal.querySelector('.detail-toggle');
    (firstToggle || closeBtn).focus();
  }

  function closeModal() {
    iotModal.style.display = 'none';
    iotModal.setAttribute('aria-hidden', 'true');
    openIotModalBtn.focus();
  }

  openIotModalBtn.addEventListener('click', openModal);
  closeBtn.addEventListener('click', closeModal);

  iotModal.addEventListener('click', e => {
    if (e.target === iotModal) {
      closeModal();
    }
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && iotModal.style.display === 'flex') {
      closeModal();
    }
  });

  iotModal.querySelectorAll('.detail-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', !expanded);
      const content = btn.nextElementSibling;
      content.hidden = expanded;
    });
  });
});


document.addEventListener('DOMContentLoaded', function() {
            const mediaData = [
                {
                    logo: "https://upload.wikimedia.org/wikipedia/en/thumb/c/c4/SOMOY_TV_Logo.svg/1200px-SOMOY_TV_Logo.svg.png",
                    quote: "Coverage of our groundbreaking achievements in technology innovation.",
                    source: "Somoy TV",
                    date: "December 29, 2024",
                    link: "https://www.somoynews.tv/news/2024-12-29/Q0ItLZvR"
                },
                {
                    logo: "https://yt3.googleusercontent.com/Cfj-6Znbc06bUTI0LtnL1JswKF1MBgMEGD4xxh3s6W0o1QBDHi7_v_CVcsXiPWbwjfwUqQ91Rw=s900-c-k-c0x00ffffff-no-rj",
                    quote: "Featured in Bangladesh Times for our community development initiatives.",
                    source: "Bangladesh Times",
                    date: "November 15, 2024",
                    link: "https://www.facebook.com/bangladeshtimes71/videos/585052190931606/?rdid=IdhMQCv0bpiLCVJ8#"
                },
                {
                    logo: "https://static.wikia.nocookie.net/etv-gspn-bangla/images/4/4d/ATN_News_HD.png/revision/latest?cb=20240806225614",
                    quote: "ATN News highlighted our award-winning project in their prime time segment.",
                    source: "ATN News",
                    date: "October 5, 2024",
                    link: "https://www.facebook.com/atnnewsbd/videos/28307828622164527"
                },
                {
                    logo: "https://upload.wikimedia.org/wikipedia/en/thumb/e/ef/NTV_%28Bangladesh%29_logo.svg/1200px-NTV_%28Bangladesh%29_logo.svg.png",
                    quote: "NTV featured our Quality Assurance-Tasfi's interview about future technology trends.",
                    source: "NTV",
                    date: "September 18, 2024",
                    link: "https://www.ntvbd.com/bangladesh/news-1495213"
                },
                {
                    logo: "https://i.ytimg.com/vi/3dvjzZCfv-E/maxresdefault.jpg",
                    quote: "Our successful participation in AIUB CS Fest 2024 was widely covered.",
                    source: "AIUB CS Fest",
                    date: "August 22, 2024",
                    link: "https://www.aiub.edu/aiub-cs-fest-2024-successfully-held"
                }
            ];

            const mediaTrack = document.getElementById('mediaTrack');
            const prevBtn = document.getElementById('prevBtn');
            const nextBtn = document.getElementById('nextBtn');
            const dotsContainer = document.getElementById('mediaDots');
            
            let currentIndex = 0;
            let autoScrollInterval;
            let isAutoScrolling = true;
            let itemsToShow = updateItemsToShow(); // Initialize with correct value
            
            // Create dots for navigation
            function createDots() {
                dotsContainer.innerHTML = '';
                mediaData.forEach((_, index) => {
                    const dot = document.createElement('div');
                    dot.className = 'media-dot';
                    if (index === 0) dot.classList.add('active');
                    dot.addEventListener('click', () => goToSlide(index));
                    dotsContainer.appendChild(dot);
                });
            }
            
            // Create media items
            function createMediaItems() {
                mediaTrack.innerHTML = '';
                mediaData.forEach(item => {
                    const mediaItem = document.createElement('div');
                    mediaItem.className = 'media-item';
                    mediaItem.innerHTML = `
                        <div class="media-card">
                            <div class="media-logo-container">
                                <img src="${item.logo}" alt="${item.source}" class="media-logo" />
                            </div>
                            <p class="media-quote">${item.quote}</p>
                            <span class="media-source">${item.source}</span>
                            <span class="media-date">${item.date}</span>
                            <a href="${item.link}" target="_blank" rel="noopener" class="media-link-overlay" aria-label="Read more on ${item.source}"></a>
                        </div>
                    `;
                    mediaTrack.appendChild(mediaItem);
                });
            }
            
            // Update the carousel position
            function updateCarousel() {
                const itemWidth = 100 / itemsToShow;
                const offset = -currentIndex * itemWidth;
                mediaTrack.style.transform = `translateX(${offset}%)`;
                
                // Update active dot
                document.querySelectorAll('.media-dot').forEach((dot, index) => {
                    dot.classList.toggle('active', index === currentIndex);
                });
                
                if (isAutoScrolling) {
                    nextBtn.classList.add('auto-scroll-active');
                } else {
                    nextBtn.classList.remove('auto-scroll-active');
                }
            }
            
            // Go to specific slide
            function goToSlide(index) {
                currentIndex = index;
                updateCarousel();
                resetAutoScroll();
            }
            
            // Next slide
            function nextSlide() {
                currentIndex = (currentIndex + 1) % mediaData.length;
                updateCarousel();
                resetAutoScroll();
            }
            
            // Previous slide
            function prevSlide() {
                currentIndex = (currentIndex - 1 + mediaData.length) % mediaData.length;
                updateCarousel();
                resetAutoScroll();
            }
            
            let autoScrollTimeout;

function startAutoScroll() {
    clearInterval(autoScrollInterval);
    autoScrollInterval = setInterval(nextSlide, 4000);
    isAutoScrolling = true;
    nextBtn.classList.add('auto-scroll-active');
}

function stopAutoScroll() {
    clearInterval(autoScrollInterval);
    clearTimeout(autoScrollTimeout);
    isAutoScrolling = false;
    nextBtn.classList.remove('auto-scroll-active');
}

function resetAutoScroll() {
    stopAutoScroll();
    autoScrollTimeout = setTimeout(() => {
        startAutoScroll();
    }, 10000);
}

            
            // Responsive items to show
            function updateItemsToShow() {
                const width = window.innerWidth;
                if (width < 600) return 1;
                if (width < 900) return 2;
                if (width < 1200) return 3;
                return 4;
            }
            
            // Initialize
            function init() {
                createMediaItems();
                createDots();
                updateCarousel();
                startAutoScroll();
                
                prevBtn.addEventListener('click', prevSlide);
                nextBtn.addEventListener('click', nextSlide);
                
                mediaTrack.addEventListener('mouseenter', () => {
                    isAutoScrolling = false;
                    clearInterval(autoScrollInterval);
                    nextBtn.classList.remove('auto-scroll-active');
                });
                
                mediaTrack.addEventListener('mouseleave', startAutoScroll);
                
                window.addEventListener('resize', () => {
                    const newItemsToShow = updateItemsToShow();
                    if (newItemsToShow !== itemsToShow) {
                        itemsToShow = newItemsToShow;
                        updateCarousel();
                    }
                });
            }
            
            init();
        });

        