document.addEventListener('DOMContentLoaded', function() {
    // Get all cards
    const cards = document.querySelectorAll('.card-demo');
    let activeCard = null;
    
    // Function to update card positions based on screen size
    function updateCardPositions() {
        const isMobile = window.innerWidth <= 600;
        const cardsContainer = document.querySelector('.cards-container');
        
        if (isMobile) {
            cardsContainer.style.height = '440px';
        } else if (window.innerWidth <= 768) {
            cardsContainer.style.height = '320px';
        } else if (window.innerWidth <= 900) {
            cardsContainer.style.height = '350px';
        } else {
            cardsContainer.style.height = '400px';
        }
    }
    
    // Call it once on load
    updateCardPositions();
    
    // Listen for window resize events
    window.addEventListener('resize', updateCardPositions);
    
    // Function to set active card
    function setActiveCard(card) {
        // If this card is already active, do nothing
        if (activeCard === card) return;
        
        // Remove active class from all cards and add inactive class
        cards.forEach(c => {
            c.classList.remove('active');
            c.classList.add('inactive');
        });
        
        // Add active class to the clicked card and remove inactive
        card.classList.add('active');
        card.classList.remove('inactive');
        activeCard = card;
    }
    
    // Add click event to each card
    cards.forEach(card => {
        // Single click to select/highlight the card
        card.addEventListener('click', function(e) {
            // If it's a double click, don't handle it here
            if (e.detail > 1) return;
            
            setActiveCard(this);
        });
        
        // Double click to flip the card
        card.addEventListener('dblclick', function() {
            this.classList.toggle('flipped');
        });
    });
    
    // Touch swipe handling for mobile devices
    let touchStartX = 0;
    let touchStartY = 0;
    let isSwiping = false;
    
    cards.forEach(card => {
        card.addEventListener('touchstart', function(e) {
            touchStartX = e.changedTouches[0].screenX;
            touchStartY = e.changedTouches[0].screenY;
            isSwiping = false;
        }, { passive: true });
        
        card.addEventListener('touchmove', function(e) {
            const currentX = e.changedTouches[0].screenX;
            const currentY = e.changedTouches[0].screenY;
            const diffX = Math.abs(currentX - touchStartX);
            const diffY = Math.abs(currentY - touchStartY);
            
            if (diffX > 10 && diffX > diffY) {
                isSwiping = true;
            }
        }, { passive: true });
        
        card.addEventListener('touchend', function(e) {
            const touchEndX = e.changedTouches[0].screenX;
            const touchEndY = e.changedTouches[0].screenY;
            
            const horizontalDistance = touchEndX - touchStartX;
            const verticalDistance = touchEndY - touchStartY;
            
            if (isSwiping && Math.abs(horizontalDistance) > 30) {
                if (horizontalDistance < 0) {
                    // Swipe left - flip the card
                    this.classList.add('flipped');
                } else {
                    // Swipe right - flip the card back
                    this.classList.remove('flipped');
                }
            } else if (!isSwiping && Math.abs(horizontalDistance) < 10 && Math.abs(verticalDistance) < 10) {
                // It's a tap, not a swipe
                setActiveCard(this);
            }
        }, { passive: true });
    });
    
    // Function to reset all cards
    function resetCards() {
        cards.forEach(card => {
            card.classList.remove('active', 'inactive');
        });
        activeCard = null;
    }
    
    // Set the middle card (card3) as active by default
    const defaultCard = document.getElementById('card3');
    setActiveCard(defaultCard);
    
    // Add click listener to the document to reset cards when clicking outside
    document.addEventListener('click', function(e) {
        // Check if the click was outside any card
        let clickedOutside = true;
        cards.forEach(card => {
            if (card.contains(e.target)) {
                clickedOutside = false;
            }
        });
        
        // If clicked outside cards and inside the cards container, reset
        const cardsContainer = document.querySelector('.cards-container');
        if (clickedOutside && cardsContainer.contains(e.target)) {
            resetCards();
        }
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (!activeCard) {
            // If no active card and arrow key is pressed, activate the middle card
            if (['ArrowLeft', 'ArrowRight'].includes(e.key)) {
                setActiveCard(document.getElementById('card3'));
                return;
            }
            return;
        }
        
        const currentId = activeCard.id;
        const currentNumber = parseInt(currentId.replace('card', ''));
        
        // Handle different keys
        switch(e.key) {
            case 'ArrowLeft':
                if (currentNumber > 1) {
                    const prevCard = document.getElementById(`card${currentNumber - 1}`);
                    setActiveCard(prevCard);
                }
                break;
                
            case 'ArrowRight':
                if (currentNumber < 5) {
                    const nextCard = document.getElementById(`card${currentNumber + 1}`);
                    setActiveCard(nextCard);
                }
                break;
                
            case ' ': // Space
            case 'Enter':
                activeCard.classList.toggle('flipped');
                break;
                
            case 'Escape':
                resetCards();
                break;
        }
        
        // Prevent page scrolling when using arrow keys or space
        if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' '].includes(e.key)) {
            e.preventDefault();
        }
    });
});