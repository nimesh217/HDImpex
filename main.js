// Main JavaScript functionality for H D IMPEX website

// Smooth scrolling for anchor links
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for all anchor links
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

    // Initialize all forms
    initializeForms();
    
    // Initialize interactive features
    initializeInteractiveFeatures();
});

// Form handling functionality
function initializeForms() {
    // Contact form handling
    const contactForm = document.querySelector('#contact form');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactForm);
    }

    // Inquiry modal form handling
    const inquiryForm = document.querySelector('#inquiryModal form');
    if (inquiryForm) {
        inquiryForm.addEventListener('submit', handleInquiryForm);
    }

    // Product modal inquiry form
    const productModalForm = document.querySelector('#productModal form');
    if (productModalForm) {
        productModalForm.addEventListener('submit', handleInquiryForm);
    }
}

// Handle contact form submission
function handleContactForm(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const data = {
        name: e.target.querySelector('input[placeholder="Your Name"]').value,
        email: e.target.querySelector('input[placeholder="Your Email"]').value,
        message: e.target.querySelector('textarea[placeholder="Your Message"]').value
    };

    // Validate form
    if (!validateContactForm(data)) {
        return;
    }

    // Show loading state
    const submitBtn = e.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;

    // Simulate form submission (replace with actual API call)
    setTimeout(() => {
        showNotification('Thank you! Your message has been sent successfully.', 'success');
        e.target.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }, 1500);
}

// Handle inquiry form submission
function handleInquiryForm(e) {
    e.preventDefault();
    
    const data = {
        name: e.target.querySelector('input[placeholder="Your Name"]').value,
        email: e.target.querySelector('input[placeholder="Your Email"]').value,
        phone: e.target.querySelector('input[placeholder="Phone Number"]')?.value || '',
        country: e.target.querySelector('select')?.value || '',
        requirements: e.target.querySelector('textarea')?.value || ''
    };

    // Validate form
    if (!validateInquiryForm(data)) {
        return;
    }

    // Show loading state
    const submitBtn = e.target.closest('.modal').querySelector('.btn-primary');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;

    // Simulate form submission (replace with actual API call)
    setTimeout(() => {
        showNotification('Thank you! Your inquiry has been sent successfully. We will contact you soon.', 'success');
        e.target.reset();
        
        // Close modal
        const modal = bootstrap.Modal.getInstance(e.target.closest('.modal'));
        if (modal) modal.hide();
        
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }, 1500);
}

// Form validation functions
function validateContactForm(data) {
    if (!data.name.trim()) {
        showNotification('Please enter your name.', 'error');
        return false;
    }
    
    if (!validateEmail(data.email)) {
        showNotification('Please enter a valid email address.', 'error');
        return false;
    }
    
    if (!data.message.trim()) {
        showNotification('Please enter your message.', 'error');
        return false;
    }
    
    return true;
}

function validateInquiryForm(data) {
    if (!data.name.trim()) {
        showNotification('Please enter your name.', 'error');
        return false;
    }
    
    if (!validateEmail(data.email)) {
        showNotification('Please enter a valid email address.', 'error');
        return false;
    }
    
    return true;
}

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.custom-notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `custom-notification alert alert-${type === 'error' ? 'danger' : type === 'success' ? 'success' : 'info'} alert-dismissible fade show`;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 9999;
        min-width: 300px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    `;
    
    notification.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);
}

// Interactive features
function initializeInteractiveFeatures() {
    // Add loading states to buttons
    document.querySelectorAll('.btn').forEach(btn => {
        if (btn.textContent.includes('Enquiry') || btn.textContent.includes('View Details')) {
            btn.addEventListener('click', function() {
                // Add subtle loading effect
                this.style.transform = 'scale(0.98)';
                setTimeout(() => {
                    this.style.transform = 'scale(1)';
                }, 150);
            });
        }
    });

    // Add hover effects to cards
    document.querySelectorAll('.card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
        });
    });

    // Initialize tooltips if Bootstrap tooltips are available
    if (typeof bootstrap !== 'undefined' && bootstrap.Tooltip) {
        const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
        tooltipTriggerList.map(function (tooltipTriggerEl) {
            return new bootstrap.Tooltip(tooltipTriggerEl);
        });
    }

    // Add scroll-to-top functionality
    addScrollToTop();
}

// Scroll to top functionality
function addScrollToTop() {
    // Create scroll to top button
    const scrollBtn = document.createElement('button');
    scrollBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollBtn.className = 'btn btn-primary scroll-to-top';
    scrollBtn.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        z-index: 1000;
        border-radius: 50%;
        width: 50px;
        height: 50px;
        display: none;
        box-shadow: 0 2px 10px rgba(0,0,0,0.3);
    `;
    
    document.body.appendChild(scrollBtn);
    
    // Show/hide scroll button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollBtn.style.display = 'block';
        } else {
            scrollBtn.style.display = 'none';
        }
    });
    
    // Scroll to top when clicked
    scrollBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// WhatsApp integration
function openWhatsApp(message = '') {
    const phoneNumber = '+91XXXXXXXXXX'; // Replace with actual number
    const defaultMessage = message || 'Hello! I found your website and am interested in your export/import services. Please share your product catalog and pricing.';
    const whatsappURL = `https://wa.me/${phoneNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(defaultMessage)}`;
    window.open(whatsappURL, '_blank');
}

// Add WhatsApp floating button
function addWhatsAppButton() {
    const whatsappBtn = document.createElement('button');
    whatsappBtn.innerHTML = '<i class="fab fa-whatsapp"></i>';
    whatsappBtn.className = 'btn btn-success whatsapp-float';
    whatsappBtn.style.cssText = `
        position: fixed;
        bottom: 80px;
        right: 20px;
        z-index: 1000;
        border-radius: 50%;
        width: 60px;
        height: 60px;
        font-size: 24px;
        box-shadow: 0 2px 10px rgba(0,0,0,0.3);
        animation: pulse 2s infinite;
    `;
    
    // Add CSS animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.1); }
            100% { transform: scale(1); }
        }
    `;
    document.head.appendChild(style);
    
    whatsappBtn.addEventListener('click', () => openWhatsApp());
    document.body.appendChild(whatsappBtn);
}

// Initialize WhatsApp button when page loads
document.addEventListener('DOMContentLoaded', function() {
    addWhatsAppButton();
});

// Search functionality for product pages
function initializeProductSearch() {
    const searchInput = document.querySelector('#productSearch');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const productCards = document.querySelectorAll('.product-item');
            
            productCards.forEach(card => {
                const title = card.querySelector('.card-title').textContent.toLowerCase();
                const description = card.querySelector('.card-text').textContent.toLowerCase();
                
                if (title.includes(searchTerm) || description.includes(searchTerm)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }
}

// Enhanced contact functionality
function initializeEnhancedContact() {
    // Add country code selector
    addCountryCodeSelector();
    
    // Initialize inquiry type detection
    initializeInquiryTypes();
    
    // Add quick contact buttons
    addQuickContactButtons();
    
    // Initialize contact form enhancements
    enhanceContactForms();
}

// Add country code selector for phone numbers
function addCountryCodeSelector() {
    const phoneInputs = document.querySelectorAll('input[type="tel"], input[placeholder*="Phone"]');
    
    phoneInputs.forEach(input => {
        if (input.closest('.country-phone-group')) return; // Already enhanced
        
        const wrapper = document.createElement('div');
        wrapper.className = 'input-group country-phone-group';
        
        const countrySelect = document.createElement('select');
        countrySelect.className = 'form-select country-code-select';
        countrySelect.style.maxWidth = '120px';
        
        const countries = [
            { code: '+91', name: 'IN', flag: '🇮🇳' },
            { code: '+1', name: 'US', flag: '🇺🇸' },
            { code: '+44', name: 'UK', flag: '🇬🇧' },
            { code: '+971', name: 'AE', flag: '🇦🇪' },
            { code: '+86', name: 'CN', flag: '🇨🇳' },
            { code: '+49', name: 'DE', flag: '🇩🇪' }
        ];
        
        countries.forEach(country => {
            const option = document.createElement('option');
            option.value = country.code;
            option.textContent = `${country.flag} ${country.code}`;
            countrySelect.appendChild(option);
        });
        
        input.parentNode.insertBefore(wrapper, input);
        wrapper.appendChild(countrySelect);
        wrapper.appendChild(input);
        
        input.placeholder = 'Phone number';
        input.classList.add('form-control');
    });
}

// Initialize inquiry type detection and auto-fill
function initializeInquiryTypes() {
    const inquiryButtons = document.querySelectorAll('[data-bs-toggle="modal"][data-bs-target="#inquiryModal"]');
    
    inquiryButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productCard = this.closest('.card');
            const productTitle = productCard ? productCard.querySelector('.card-title')?.textContent : '';
            const productCategory = productCard ? productCard.closest('[data-category]')?.getAttribute('data-category') : '';
            
            setTimeout(() => {
                const modal = document.getElementById('inquiryModal');
                const textarea = modal.querySelector('textarea');
                const categorySelect = modal.querySelector('select');
                
                if (textarea && productTitle) {
                    textarea.value = `I am interested in ${productTitle}. Please provide detailed information including pricing, minimum order quantity, and shipping details.`;
                }
                
                if (categorySelect && productCategory) {
                    const options = categorySelect.querySelectorAll('option');
                    options.forEach(option => {
                        if (option.textContent.toLowerCase().includes(productCategory)) {
                            option.selected = true;
                        }
                    });
                }
            }, 100);
        });
    });
}

// Add quick contact buttons to product cards
function addQuickContactButtons() {
    const productCards = document.querySelectorAll('.product-item .card');
    
    productCards.forEach(card => {
        const existingButtons = card.querySelector('.d-flex.justify-content-between');
        if (existingButtons && !existingButtons.querySelector('.quick-contact-btn')) {
            const quickContactBtn = document.createElement('button');
            quickContactBtn.className = 'btn btn-outline-success btn-sm quick-contact-btn';
            quickContactBtn.innerHTML = '<i class="fab fa-whatsapp"></i>';
            quickContactBtn.title = 'Quick WhatsApp';
            
            quickContactBtn.addEventListener('click', function() {
                const productTitle = card.querySelector('.card-title').textContent;
                const message = `Hi! I'm interested in ${productTitle}. Can you please share more details?`;
                openWhatsApp(message);
            });
            
            existingButtons.appendChild(quickContactBtn);
        }
    });
}

// Enhance contact forms with better validation and features
function enhanceContactForms() {
    // Add real-time validation
    const emailInputs = document.querySelectorAll('input[type="email"]');
    emailInputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (this.value && !validateEmail(this.value)) {
                this.classList.add('is-invalid');
                showFieldError(this, 'Please enter a valid email address');
            } else {
                this.classList.remove('is-invalid');
                removeFieldError(this);
            }
        });
    });
    
    // Add character counter for textarea
    const textareas = document.querySelectorAll('textarea');
    textareas.forEach(textarea => {
        const counter = document.createElement('small');
        counter.className = 'text-muted character-counter';
        textarea.parentNode.appendChild(counter);
        
        textarea.addEventListener('input', function() {
            const length = this.value.length;
            counter.textContent = `${length} characters`;
            
            if (length > 500) {
                counter.classList.add('text-warning');
            } else {
                counter.classList.remove('text-warning');
            }
        });
    });
    
    // Add form auto-save
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        const inputs = form.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('input', function() {
                saveFormData(form);
            });
        });
        
        // Restore form data on load
        restoreFormData(form);
    });
}

// Field validation helpers
function showFieldError(field, message) {
    removeFieldError(field);
    const errorDiv = document.createElement('div');
    errorDiv.className = 'invalid-feedback';
    errorDiv.textContent = message;
    field.parentNode.appendChild(errorDiv);
}

function removeFieldError(field) {
    const existingError = field.parentNode.querySelector('.invalid-feedback');
    if (existingError) {
        existingError.remove();
    }
}

// Form data persistence
function saveFormData(form) {
    const formData = new FormData(form);
    const data = {};
    
    form.querySelectorAll('input, textarea, select').forEach(field => {
        if (field.name || field.id) {
            data[field.name || field.id] = field.value;
        }
    });
    
    const formId = form.id || 'contact-form';
    localStorage.setItem(`hdimpex-${formId}`, JSON.stringify(data));
}

function restoreFormData(form) {
    const formId = form.id || 'contact-form';
    const savedData = localStorage.getItem(`hdimpex-${formId}`);
    
    if (savedData) {
        try {
            const data = JSON.parse(savedData);
            Object.keys(data).forEach(key => {
                const field = form.querySelector(`[name="${key}"], #${key}`);
                if (field && data[key]) {
                    field.value = data[key];
                }
            });
        } catch (e) {
            console.log('Could not restore form data');
        }
    }
}

// Enhanced WhatsApp integration with templates
function openWhatsAppWithTemplate(template = 'general') {
    const templates = {
        general: "Hello! I found your website and am interested in your export/import services. Please share your product catalog and pricing.",
        quote: "Hi! I need a quote for bulk export/import. Please contact me with your best rates and terms.",
        catalog: "Hello! Can you please share your complete product catalog with specifications and pricing?",
        urgent: "Hi! I have an urgent requirement. Please call me back as soon as possible."
    };
    
    const message = templates[template] || templates.general;
    openWhatsApp(message);
}

// Add floating contact widget
function addFloatingContactWidget() {
    const widget = document.createElement('div');
    widget.className = 'floating-contact-widget';
    widget.style.cssText = `
        position: fixed;
        bottom: 20px;
        left: 20px;
        z-index: 1000;
        background: white;
        border-radius: 10px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.15);
        padding: 15px;
        max-width: 250px;
        display: none;
    `;
    
    widget.innerHTML = `
        <div class="d-flex justify-content-between align-items-center mb-2">
            <strong class="text-primary">Quick Contact</strong>
            <button class="btn-close btn-sm" onclick="this.closest('.floating-contact-widget').style.display='none'"></button>
        </div>
        <div class="d-grid gap-2">
            <button class="btn btn-success btn-sm" onclick="openWhatsAppWithTemplate('general')">
                <i class="fab fa-whatsapp me-1"></i> WhatsApp
            </button>
            <button class="btn btn-primary btn-sm" onclick="window.location.href='contact.html'">
                <i class="fas fa-envelope me-1"></i> Contact Form
            </button>
            <button class="btn btn-warning btn-sm" onclick="openWhatsAppWithTemplate('quote')">
                <i class="fas fa-calculator me-1"></i> Get Quote
            </button>
        </div>
    `;
    
    document.body.appendChild(widget);
    
    // Show widget after 10 seconds
    setTimeout(() => {
        widget.style.display = 'block';
    }, 10000);
}

// Initialize enhanced contact features
document.addEventListener('DOMContentLoaded', function() {
    initializeEnhancedContact();
    addFloatingContactWidget();
});

// Export enhanced functions
window.HDImpexJS = {
    ...window.HDImpexJS,
    openWhatsAppWithTemplate,
    saveFormData,
    restoreFormData
};
