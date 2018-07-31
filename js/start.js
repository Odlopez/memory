'use strict';

(function () {
  var newGame = function () {
    field.innerHTML = '';
    clearObject(cardDeck);
    clearObject(openCards);
    clearObject(guessedCards);

    window.cards.make();

    for (var key in cardDeck) {
      window.rotate(cardDeck[key].element, cardDeck[key]);
    }

    setTimeout(function() {
      for (var key in cardDeck) {
        window.rotate(cardDeck[key].element, cardDeck[key]);
      }
    }, window.constants.CARDS_DISPLAY_TIME);
  };
})();
