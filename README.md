# Memory Game Project

## Dependencies

* Bootstrap - used for displaying modals.

* jQuery - required by Bootstrap.

* Popper - required by Bootstrap.

## Implementation Details

* The following global variables are used:
    - `cards` - the list of cards.
    - `open` - the current open card that waits to be matched.
    - `moves` - the number of moves performed by the player.
    - `timer` - seconds spent since the start of the game.
    - `remainingMoves` - number of remaining moves until the game is complete.

* Board initialization - the method `initBoard()` initializes the board. This is called upon page load, when the player clicks on the Reload button or when the "Play again" button is clicked after finishing a game. `initBoard()` does the following:
    - Clears the deck.
    - Shuffles the cards.
    - Populates the deck with cards.
    - Refreshes the stars.
    - Sets the timer back to 0.
    - Resets the moves counters.

* Card clicks - the method `clickCard(card)` is called when a card is clicked. It does the following:
    - Turns the card face up if the card wasn't turned already.
    - If there is another card open, then it comapres them, otherwise it marks the card as open.
    - If the cards match, they are marked as matched, otherwise they are turned face down.
    - Game stats are updated accordingly.
    - If all the cards have been matched, a success message is displayed in a modal along with the game stats.

* Stars - The game starts with 3 stars. 
    - If the player exceeds 24 moves, he is left with 2 stars. 
    - If the player exceeds 32 moves, he is left with 1 star.

* Timer - `window.setTimeout()` is used to update the timer every second.

* CSS Animations are used when 2 cards match / don't match.





