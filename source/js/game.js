'use strict';

(function () {
  var field = document.querySelector('.field');
  var cardDeck = {};
  var openCards = {};
  var guessedCards = {};
  var points = 0;

  // Очищает переданный в качестве аргумента в функцию объект
  var clearObject = function (obj) {
    Object.keys(obj).forEach(function (prop) {
      delete obj[prop];
    });
  };

  // Добавляем карту к 'открытым', если она была закрыта, и удаляем из 'открытых', если она была открыта
  var changeStatus = function (card) {
    if (card.element.dataset.shirt === 'false') {
      openCards[card.number] = (cardDeck[card.number]);
    } else {
      delete openCards[card.number]
    }
  };

  // Находим выбранную карту в колоде и запускаем функцию изменения статуса на 'открытую карту'
  var checkCard = function (targetCard) {
    for (var key in cardDeck) {
      if (cardDeck[key].element === targetCard) {
        changeStatus(cardDeck[key]);
        return;
      }
    }
  };

  var countPoints = function (isSuccessfully, func) {
    if (isSuccessfully) {
      for (var key in openCards) {
        guessedCards[key] = openCards[key];

        func(cardDeck[key].element);

        delete cardDeck[key];
      }

      points += Object.keys(cardDeck).length * window.constants.POINT_COEFFICIENT;
    } else {
      points -= Object.keys(guessedCards).length * window.constants.POINT_COEFFICIENT;
    }

    console.log(points)
  };

  /**
    Запускаем функцию подсчета очков.
   */
  var performLogic = function (targetElement, functions) {
    // Здесь мы запускаем функцию, которая изменит статус выбранной карты на 'открыта'
    checkCard(targetElement);

    // Чтобы было проще работать с объектом 'открытых карт', записываем его ключи в массив
    var keys = Object.keys(openCards);

    // Проверяем, если длинна массива с ключами, а соответственно, и длина объекта с открытыми картами равна двум, подсчитываем очки
    if (keys.length === 2) {
      if (openCards[keys[0]].URL === openCards[keys[1]].URL) {
        // Подсчитываем очки
        countPoints(true, functions.delete);

        // И очищаем объект с данными 'открытых карт'
        clearObject(openCards);
      } else {
        // Отключаем возможность переворачивать другие карты
        document.removeEventListener('click', functions.callback);

        // На некоторое время показываем карты.
        setTimeout(function () {
          // Потом переворачиваем их обратно
          functions.rotate(openCards[keys[0]].element, openCards[keys[0]]);
          functions.rotate(openCards[keys[1]].element, openCards[keys[1]]);

          // Подсчитываем очки
          countPoints(false);

          // И очищаем объект с данными 'открытых карт'
          clearObject(openCards);

          // Возвращаем обработчик события клика на документ, чтобы снова можно было переворачивать карты
          document.addEventListener('click', functions.callback);
        }, window.constants.HANG_TIME);
      }
    }
  };

  window.game = {
    logic: performLogic,
    cardDeck: cardDeck,
    openCards: openCards,
    guessedCards: guessedCards,
    points: points
  }
})();
