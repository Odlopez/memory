'use strict';

(function () {
  var field = document.querySelector('.field');

  // Создает, отрисовывает на странице (в секции 'field') и возвращает node-element карты
  window.createCard = function () {
    var card = this.document.createElement('div');
    card.classList.add(window.constants.CARD_CLASS_NAME);

    field.appendChild(card);

    return card;
  }
})();
