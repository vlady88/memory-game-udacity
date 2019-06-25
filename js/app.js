/*
 * Create a list that holds all of your cards
 */
let cards = ['diamond', 'diamond', 'paper-plane-o', 'paper-plane-o', 'anchor', 'anchor', 
    'bolt', 'bolt', 'cube', 'cube', 'leaf', 'leaf', 'bicycle', 'bicycle', 'bomb', 'bomb'];

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

 cards = shuffle(cards);
 let deck = document.getElementsByClassName("deck")[0];
 let openCard = null;
 console.log(cards);

 for(const card of cards) {
    deck.innerHTML = deck.innerHTML + "<li class='card' onclick='clickCard(this)' data-type='" + card + "'><i class='fa fa-" + card + "'></i></li>";
 }

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
    // console.log(card.classList);

    if(card.classList.contains("show")) {
        console.log("already shown");
        return;
    }

    card.classList.add("show");

    if(openCard == null) {
        openCard = card;
    } else {
        if(openCard.getAttribute("data-type") == card.getAttribute("data-type")) {
            openCard = null;
        } else {
            console.log("wrong match " + openCard);
            openCard.classList.toggle("show");
            card.classList.toggle("show");
            openCard = null;
        }
    }
}
