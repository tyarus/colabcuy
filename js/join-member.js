document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const membershipForm = document.querySelector('.membership-form');
    const tiers = document.querySelectorAll('.tier');
    const submitBtn = document.querySelector('.submit-btn');
    
    // Add event listeners to membership tiers
    tiers.forEach(tier => {
        tier.addEventListener('click', function() {
            // Remove selected class from all tiers
            tiers.forEach(t => t.classList.remove('selected'));
            // Add selected class to clicked tier
            this.classList.add('selected');
            
            // Update submit button text with selected tier
            const tierName = this.querySelector('h3').textContent;
            const tierPrice = this.querySelector('.price').textContent;
            submitBtn.textContent = `Join ${tierName} Membership - ${tierPrice}`;
        });
    });
    
    // Enhance the membership tiers with features list
    enhanceTiers();
    
    // Set the first tier as selected by default
    if (tiers.length > 0) {
        tiers[0].click();
    }
    
    // Form validation
    membershipForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form inputs
        const fullname = document.getElementById('fullname');
        const email = document.getElementById('email');
        const message = document.getElementById('message');
        
        // Validate inputs
        let isValid = true;
        
        // Validate name
        if (!fullname.value.trim()) {
            showError(fullname, 'Please enter your full name');
            isValid = false;
        } else {
            removeError(fullname);
        }
        
        // Validate email
        if (!email.value.trim()) {
            showError(email, 'Please enter your email address');
            isValid = false;
        } else if (!isValidEmail(email.value)) {
            showError(email, 'Please enter a valid email address');
            isValid = false;
        } else {
            removeError(email);
        }
        
        // Check if a tier is selected
        if (!document.querySelector('.tier.selected')) {
            alert('Please select a membership tier');
            isValid = false;
        }
        
        // If form is valid, submit
        if (isValid) {
            // Show loading state
            submitBtn.disabled = true;
            submitBtn.textContent = 'Processing...';
            
            // Simulate form submission (replace with actual ajax call)
            setTimeout(() => {
                // Hide form and show success message
                showSuccessMessage();
                
                // Reset form
                membershipForm.reset();
                tiers.forEach(t => t.classList.remove('selected'));
                tiers[0].classList.add('selected');
                submitBtn.disabled = false;
                submitBtn.textContent = 'Join Now';
            }, 1500);
        }
    });
    
    // Function to show error message
    function showError(input, message) {
        const formGroup = input.parentElement;
        input.classList.add('error');
        
        // Check if error message exists, if not create it
        let errorMessage = formGroup.querySelector('.error-message');
        if (!errorMessage) {
            errorMessage = document.createElement('div');
            errorMessage.className = 'error-message';
            formGroup.appendChild(errorMessage);
        }
        
        errorMessage.textContent = message;
        errorMessage.classList.add('visible');
    }
    
    // Function to remove error message
    function removeError(input) {
        const formGroup = input.parentElement;
        input.classList.remove('error');
        
        const errorMessage = formGroup.querySelector('.error-message');
        if (errorMessage) {
            errorMessage.textContent = '';
            errorMessage.classList.remove('visible');
        }
    }
    
    // Function to validate email format
    function isValidEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
    
    // Function to enhance membership tiers with features
    function enhanceTiers() {
        // Define features for each tier
        const tierFeatures = {
            basic: [
                'Access to standard card collection',
                'Monthly newsletter',
                'Early access to new releases',
                'Member-only discounts (5%)'
            ],
            premium: [
                'Access to premium card collection',
                'Exclusive member events',
                'Quarterly special edition cards',
                'Member-only discounts (15%)',
                'Free shipping on all orders'
            ],
            ultimate: [
                'Access to all card collections',
                'Limited edition exclusive cards',
                'VIP tournament invitations',
                'Member-only discounts (25%)',
                'Free shipping & priority handling',
                'Personal card consultant'
            ]
        };
        
        // Add features to each tier
        tiers.forEach(tier => {
            const tierType = tier.getAttribute('data-tier');
            const features = tierFeatures[tierType];
            
            if (features) {
                const featuresList = document.createElement('ul');
                featuresList.className = 'tier-features';
                
                features.forEach(feature => {
                    const li = document.createElement('li');
                    li.textContent = feature;
                    featuresList.appendChild(li);
                });
                
                tier.appendChild(featuresList);
            }
        });
    }
    
    // Function to show success message
    function showSuccessMessage() {
        // Create success message container
        const successMessage = document.createElement('div');
        successMessage.className = 'success-message';
        
        // Get selected tier name
        const selectedTier = document.querySelector('.tier.selected');
        const tierName = selectedTier ? selectedTier.querySelector('h3').textContent : 'Premium';
        
        // Create success message content
        successMessage.innerHTML = `
            <div class="success-icon">✓</div>
            <h2>Congratulations!</h2>
            <p>You have successfully joined our ${tierName} Membership. We're excited to have you as part of the Royal Cards community!</p>
            <p>A confirmation email has been sent to your inbox with details about your membership benefits and how to access your account.</p>
            <button class="btn" onclick="window.location.href='../index.html'">Return to Home</button>
        `;
        
        // Replace form with success message
        membershipForm.style.display = 'none';
        membershipForm.parentElement.appendChild(successMessage);
        successMessage.style.display = 'block';
        
        // Scroll to success message
        successMessage.scrollIntoView({ behavior: 'smooth' });
    }
    
    // Add input event listeners for real-time validation
    const inputs = membershipForm.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('input', function() {
            if (this.classList.contains('error')) {
                removeError(this);
            }
        });
    });
    
});