// Homepage JavaScript

// Mobile Menu Toggle Functionality
function menuBtnFunction(menuBtn) {
    menuBtn.classList.toggle("active");
    const mobileMenu = document.getElementById("mobileMenu");
    if (mobileMenu) {
        mobileMenu.classList.toggle("active");
    }
}

// Smooth scroll for anchor links
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

// Close mobile menu when clicking on a menu item
document.querySelectorAll('.site-navbar__item').forEach(item => {
    item.addEventListener('click', function() {
        const mobileMenu = document.getElementById("mobileMenu");
        const hamburger = document.querySelector('.site-navbar__hamberug-icon');
        if (mobileMenu && hamburger) {
            mobileMenu.classList.remove("active");
            hamburger.classList.remove("active");
        }
    });
});

// Add scroll animation on range cards
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe range cards for animation
document.querySelectorAll('.range-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// Handle window resize to close mobile menu on desktop
window.addEventListener('resize', function() {
    if (window.innerWidth > 600) {
        const mobileMenu = document.getElementById("mobileMenu");
        const hamburger = document.querySelector('.site-navbar__hamberug-icon');
        if (mobileMenu && hamburger) {
            mobileMenu.classList.remove("active");
            hamburger.classList.remove("active");
        }
    }
});

// Product Selector Functionality
(function() {
    const productSelector = {
        selectedIntensity: null,
        selectedDuration: null,
        
        init: function() {
            const buttons = document.querySelectorAll('.product-selector__button');
            if (buttons.length === 0) return; // Exit if section doesn't exist
            
            buttons.forEach(button => {
                button.addEventListener('click', (e) => {
                    this.handleButtonClick(e.currentTarget);
                });
            });
        },
        
        handleButtonClick: function(button) {
            const type = button.getAttribute('data-type');
            const value = button.getAttribute('data-value');
            
            // Remove active class from all buttons of the same type
            const sameTypeButtons = document.querySelectorAll(`.product-selector__button[data-type="${type}"]`);
            sameTypeButtons.forEach(btn => btn.classList.remove('active'));
            
            // Toggle active state
            if (this[`selected${type.charAt(0).toUpperCase() + type.slice(1)}`] === value) {
                // Deselect if clicking the same button
                this[`selected${type.charAt(0).toUpperCase() + type.slice(1)}`] = null;
            } else {
                // Select the button
                button.classList.add('active');
                this[`selected${type.charAt(0).toUpperCase() + type.slice(1)}`] = value;
            }
            
            // Update product visibility
            this.updateProductVisibility();
        },
        
        updateProductVisibility: function() {
            const products = document.querySelectorAll('.product-selector__product-card');
            
            products.forEach(product => {
                const productType = product.getAttribute('data-product');
                let shouldShow = false;
                
                // FitWater: Low-Intensity + (Short OR Long Duration)
                if (productType === 'fitwater') {
                    if (this.selectedIntensity === 'low' && this.selectedDuration) {
                        shouldShow = true;
                    } else if (this.selectedIntensity === 'low' && !this.selectedDuration) {
                        shouldShow = true;
                    } else if (!this.selectedIntensity && this.selectedDuration) {
                        shouldShow = true;
                    }
                }
                
                // Body Fuel: High-Intensity + (Short OR Long Duration)
                if (productType === 'bodyfuel') {
                    if (this.selectedIntensity === 'high' && this.selectedDuration) {
                        shouldShow = true;
                    } else if (this.selectedIntensity === 'high' && !this.selectedDuration) {
                        shouldShow = true;
                    } else if (!this.selectedIntensity && this.selectedDuration) {
                        shouldShow = true;
                    }
                }
                
                // Energy Gel: High-Intensity + Long Duration
                if (productType === 'energygel') {
                    if (this.selectedIntensity === 'high' && this.selectedDuration === 'long') {
                        shouldShow = true;
                    } else if (this.selectedIntensity === 'high' && !this.selectedDuration) {
                        shouldShow = true;
                    } else if (!this.selectedIntensity && this.selectedDuration === 'long') {
                        shouldShow = true;
                    }
                }
                
                // Show or hide the product
                product.style.display = shouldShow ? 'block' : 'none';
            });
        }
    };
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => productSelector.init());
    } else {
        productSelector.init();
    }
})();
