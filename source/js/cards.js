'use strict';

(function () {
  var utilites = window.utilites;
  var IMAGES = window.constants.IMAGES;

  // Конструктор объекта для карты
  var CreateCard = function (url) {
    this.URL = url;
  };

  CreateCard.prototype.SHIRT = window.constants.SHIRT;
  CreateCard.prototype.FACE = window.constants.FACE;

  // Создает и отрисовывает карты на поле.
  var makeCards = function () {

    var cards = utilites.sort(IMAGES);
    cards.length = window.constants.CARDS_ON_FIELD;

    cards = utilites.doubles(cards);

    cards.forEach(function (it, i) {
      var newCard = window.createCard();

      var options = new CreateCard(it);

      options.element = newCard;
      options.number = i;
      window.game.cardDeck[i] = options;

      window.rotate(newCard, options);
    });
  };

  makeCards();

  window.cards = {
    make: makeCards,
  };
})();
