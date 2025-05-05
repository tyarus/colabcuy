// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    // Handle menu toggle for mobile devices
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            menuToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }
    
    // Add active class to current page in navigation
    const currentLocation = window.location.pathname;
    const navItems = document.querySelectorAll('.nav-links a');
    
    navItems.forEach(item => {
        const itemPath = item.getAttribute('href');
        // Check if the current path includes the item path or if we're on index and checking home
        if (currentLocation.includes(itemPath) && itemPath !== 'index.html') {
            item.classList.add('active');
        } else if (currentLocation.endsWith('/') || currentLocation.endsWith('index.html')) {
            // If we're on the home page
            if (itemPath === 'index.html' || itemPath === './') {
                item.classList.add('active');
            }
        }
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (navLinks.classList.contains('active') && 
            !navLinks.contains(event.target) && 
            !menuToggle.contains(event.target)) {
            menuToggle.classList.remove('active');
            navLinks.classList.remove('active');
        }
    });
    
    // Close mobile menu when resizing to desktop view
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768 && navLinks.classList.contains('active')) {
            menuToggle.classList.remove('active');
            navLinks.classList.remove('active');
        }
    });
});