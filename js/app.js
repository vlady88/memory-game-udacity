/*
 * Create a list that holds all of your cards
 */
let cards = ['diamond', 'diamond', 'paper-plane-o', 'paper-plane-o', 'anchor', 'anchor', 
    'bolt', 'bolt', 'cube', 'cube', 'leaf', 'leaf', 'bicycle', 'bicycle', 'bomb', 'bomb'];

// the card waiting to be paired
let open = null;

// moves done by the player
let moves = 0;

// counts the seconds since the start of the game
let timer = 0;

// timeout function
let timeout = null;

// remaining moves until victory
let remainingMoves = 16;

/*
 * Initialize game's components
 */
function initBoard() {
    const deck = document.querySelector(".deck");
    const stars = document.querySelector(".stars");

    // clear cards and stars
    deck.innerHTML = "";
    stars.innerHTML = "";
    
    open = null;
    remainingMoves = 16;
    
    // setup the timer
    if(timeout != null) {
        window.clearTimeout(timeout)
    }
    setupTimer(0);
    
    updateMoves(0);
    $('.modal').modal('hide');
    cards = shuffle(cards);

    // populate the deck with cards
    for(const card of cards) {
        deck.innerHTML = deck.innerHTML + "<li class='card' onclick='clickCard(this)' data-type='" + 
            card + "'><i class='fa fa-" + card + "'></i></li>";
    }
    // add the stars
    for(let i = 0; i < 3; i++) {
        stars.innerHTML = stars.innerHTML + "<li><i class='fa fa-star'></i></li>";
    }
}

// init board upon page load
document.addEventListener('DOMContentLoaded', function () {
    initBoard();
});

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
function clickCard(card) {
    if(card.classList.contains("show")) {
        // card already shown
        return;
    }

    // turn the card and mark it as "open"
    card.classList.add("show", "open");
    updateMoves(moves + 1);

    if(open == null) {
        // there is no previous open card
        open = card;
    } else {
        // compare the card with the previous open card
        if(open.getAttribute("data-type") == card.getAttribute("data-type")) {
            // cards match
            cardsMatch(card, open);
            remainingMoves -= 2;
            open = null;
        } else {
            // cards don't match
            cardsNotMatch(card, open);
            open = null;
        }
    }

    // check whether the game has ended
    if(remainingMoves == 0) {
        // update the modal text and show the modal
        document.querySelector("#winMoves").textContent = moves;
        const stars  = document.querySelectorAll(".fa-star").length;
        document.querySelector("#winStars").textContent = stars;
        document.querySelector("#winTime").textContent = timer;
        $('.modal').modal();
    }
}

/*
 * apply styling for cards that match
 */
function cardsMatch(card1, card2) {
    card1.classList.toggle("match");
    card1.classList.toggle("open");
    card1.classList.toggle("shake");
    card2.classList.toggle("match");
    card2.classList.toggle("open");
    card2.classList.toggle("shake");

    setTimeout(function(){ 
        card1.classList.toggle("shake"); 
        card2.classList.toggle("shake"); 
    }, 500);
}

/*
 * apply styling for cards that don't match
 */
function cardsNotMatch(card1, card2) {
    card1.classList.toggle("no-match");
    card1.classList.toggle("open");
    card1.classList.toggle("shake");
    card2.classList.toggle("no-match");
    card2.classList.toggle("open");
    card2.classList.toggle("shake");

    setTimeout(function(){ 
        card1.classList.toggle("shake"); 
        card1.classList.toggle("no-match"); 
        card1.classList.toggle("show"); 
        card2.classList.toggle("shake"); 
        card2.classList.toggle("no-match"); 
        card2.classList.toggle("show"); 
    }, 500);
}

/*
 * update the number of moves
 */
function updateMoves(newVal) {
    moves = newVal;
    document.querySelector('.moves').textContent = moves;

    // remove one start when the player exceeds 24 or 32 moves
    if(moves == 24 || moves == 32) {
        const star = document.querySelector(".fa-star");
        const stars = document.querySelector(".stars");
        stars.removeChild(star.parentElement);
        stars.innerHTML = stars.innerHTML + "<li><i class='fa fa-star-o'></i></li>";
    }
}

/*
 * increment the timer every second
 */
function setupTimer(newVal) {
    timer = newVal;
    document.querySelector('.timer').textContent = timer;

    timeout = window.setTimeout(function() {
        setupTimer(timer + 1);
    }, 1000);
}
