'use strict';

(function () {
  // Обработчик события клика на попап
  var onPopupClick = function () {
    deletePopup();
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
    var popup = document.createElement('div');
    var text = document.createElement('p');
    var points = document.createElement('span');

    popup.classList.add('popup');
    text.classList.add('popup__text');
    points.classList.add('popup__points');

    text.textContent = message;
    points.textContent = pointsValue;

    popup.appendChild(text);
    popup.appendChild(points);

    popup.addEventListener('click', onPopupClick);
    document.addEventListener('keydown', onDocumentKeydown);

    document.body.insertAdjacentElement('afterbegin', popup);

    setTimeout(function () {
      deletePopup();
    }, window.constants.CARDS_DISPLAY_TIME);
  };

  // Функция удаляет попап
  var deletePopup = function () {
    var popup = document.querySelector('.popup');

    if (popup) {
      popup.removeEventListener('click', onPopupClick);
      document.removeEventListener('keydown', onDocumentKeydown);

      document.body.removeChild(popup);

      window.game.init();
    }
  };

  window.popup = {
    create: createPopup
  };
})();
