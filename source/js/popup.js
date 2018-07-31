'use strict';

(function () {
  var template = document.querySelector('.template');

  // Обработчик события клика на попап
  var onPopupClick = function () {
    deletePopup();

    e.target = removeEventListener('click', onPopupClick);
  };

  // Обработчик события нажатия клавиши esc на документе
  var onDocumentKeydown = function (e) {
    if (e.keyCode === window.constants.KEY_CODE.ESC) {
      e.preventDefault();

      onPopupClick();
    }
  }

  // Функция создает попап
  var createPopup = function (message, pointsValue) {
    var popup = template.querySelector('.popup').cloneNode(true);
    var text = popup.querySelector('.popup__text');
    var points = popup.querySelector('.popup__points');

    text.textContent = message;
    points.textContent = pointsValue;

    popup.addEventListener('click', onPopupClick);
    document.addEventListener('keydown', onDocumentKeydown);

    document.body.insertAdjacentElement('afterbegin', popup);
  };

  // Функция удаляет попап
  var deletePopup = function () {
    var popup = document.querySelector('.popup');

    popup.removeEventListener('click', onPopupClick);
    document.removeEventListener('keydown', onDocumentKeydown);

    document.body.removeChild(popup);

    window.game.init();
  };

  window.popup = {
    create: createPopup
  };
})();
