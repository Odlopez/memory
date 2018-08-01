'use strict';

(function () {
  var field = document.querySelector('.field');

  // Создает, отрисовывает на странице (в секции 'field') и возвращает node-element карты
  var createCard = function () {
    var card = document.createElement('div');
    card.classList.add(window.constants.CARD_CLASS_NAME);

    field.appendChild(card);

    return card;
  }

  // Удаляет выбранную карту и ставит на ее место 'пустую' заглушку
  var deleteCard = function (card) {
    // Создаем заглушку
    var emptyCard = document.createElement('div');
    emptyCard.classList.add(window.constants.EMPTY_CARD_CLASS_NAME);

    // Через время задержки удаляем выбранные карты и заменяем их заглушкой
    setTimeout(function() {
      card.insertAdjacentElement('afterend', emptyCard);
      field.removeChild(card);
    }, window.constants.HANG_TIME);
  }

  window.field = {
    createCard: createCard,
    deleteCard: deleteCard
  };
})();
