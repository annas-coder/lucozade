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

