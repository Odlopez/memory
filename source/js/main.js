'use strict';

(function () {
  var button = document.querySelector('.start__button');
  var endButton = document.querySelector('.menu__end');
  var timerButton = document.querySelector('.menu__time-button');

  // Обработчик события клика на документ
  var onDocumentClick = function (e) {
    // Проверяем, кликнул ли пользователь по карте и закрыта ли эта карта, если да, запускаем код
    if (e.target.classList.contains(window.constants.CARD_CLASS_NAME) && !(e.target.dataset.number in window.game.openCards)) {
      // Записываем в переменную выбранную карту
      var targetCard = e.target;

      // Запускаем функцию анимации вращения
      window.rotate(targetCard, window.game.cardDeck[targetCard.dataset.number]);

      // Помечаем перевернутую карту
      window.game.logic(targetCard, functions);
    } else if (e.target.dataset.number in window.game.openCards) {
      alert('Эта карта уже открыта');
    }
  };

  // Набор функций, который мы передаем как аргумент в функцию подсчета очков
  var functions = {
    rotate: window.rotate,
    callback: onDocumentClick,
    delete: window.field.deleteCard,
    popup: window.popup.create
  };

  button.addEventListener('click', window.game.new(onDocumentClick));
  document.addEventListener('click', onDocumentClick);
  endButton.addEventListener('click', window.game.init);
  timerButton.addEventListener('click', window.state.changeSelect);
})();
