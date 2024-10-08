// Define Medusa's deck with card images
const medusaDeck = [
    
    { 
        NAME: 'GAZE OF STONE', 
        IMAGE_URL: 'https://i.imgur.com/uFtmOgr.png' 
    },
    { 
        NAME: 'HISS AND SLITHER', 
        IMAGE_URL: 'https://i.imgur.com/OnKZjOm.png' 
    },
    // Add more cards with NAME and IMAGE_URL...
];

let playerHand = [];
let discardPile = [];
let deckLocked = true;  // Deck is locked at the start

// Function to draw cards from the Medusa deck
function drawCards() {
    if (!deckLocked) {
        alert('Please start the game first!');
        return;
    }

    // Draw one random card
    const randomIndex = Math.floor(Math.random() * medusaDeck.length);
    const drawnCard = medusaDeck[randomIndex];
    playerHand.push(drawnCard);  // Add drawn card to hand
    displayHand();
}

// Function to display the player's hand
function displayHand() {
    const handDiv = document.getElementById('cards');
    handDiv.innerHTML = '';

    playerHand.forEach((card, index) => {
        const cardDiv = document.createElement('div');

        // Create an image element for the card
        const cardImage = document.createElement('img');
        cardImage.src = card.IMAGE_URL;  // Set the source to the card's image
        cardImage.alt = card.NAME;  // Set an alt text for the image

        // Button to discard the card
        const discardButton = document.createElement('button');
        discardButton.textContent = 'Discard';
        discardButton.addEventListener('click', () => discardCard(index));

        cardDiv.appendChild(cardImage);
        cardDiv.appendChild(discardButton);
        handDiv.appendChild(cardDiv);
    });
}

// Function to discard a card from hand
function discardCard(index) {
    const discardedCard = playerHand.splice(index, 1)[0];
    discardPile.push({ ...discardedCard, addedToHand: false });
    displayHand();
    displayDiscardPile();
}

// Function to display the discard pile and add "Add to Hand" feature
function displayDiscardPile() {
    const discardDiv = document.getElementById('discard-pile');
    discardDiv.innerHTML = '';

    discardPile.forEach((card, index) => {
        const cardDiv = document.createElement('div');

        // Create an image element for the card
        const cardImage = document.createElement('img');
        cardImage.src = card.IMAGE_URL;
        cardImage.alt = card.NAME;

        // If the card has been added to hand, display an asterisk (*)
        const cardLabel = document.createElement('p');
        cardLabel.textContent = card.NAME + (card.addedToHand ? ' *' : '');

        // Button to add the card back to the hand
        const addToHandButton = document.createElement('button');
        addToHandButton.textContent = 'Add to Hand';
        addToHandButton.disabled = card.addedToHand;  // Disable if already added
        addToHandButton.addEventListener('click', () => addToHand(index));

        cardDiv.appendChild(cardImage);
        cardDiv.appendChild(cardLabel);
        cardDiv.appendChild(addToHandButton);
        discardDiv.appendChild(cardDiv);
    });
}

// Function to add a card from the discard pile to the hand
function addToHand(index) {
    const card = discardPile[index];
    if (!card.addedToHand) {
        playerHand.push(card);  // Add card to hand
        card.addedToHand = true;  // Mark it as added to the hand
        displayHand();
        displayDiscardPile();
    }
}

