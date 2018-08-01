'use strict';

(function () {
  var field = document.querySelector('.field');
  var start = document.querySelector('.start');
  var endItem  = document.querySelector('.menu__item--end');
  var endButton = document.querySelector('.menu__end');
  var pointsItem  = document.querySelector('.menu__item--points');
  var pointsOutput  = document.querySelector('.menu__points');

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

  // Функция очищает поле, объекты с данными, скрывает основной экран, запускает игру
  var newGame = function (callback) {
    return function () {
      clearObject(cardDeck);
      clearObject(openCards);
      clearObject(guessedCards);
      points = 0;

      field.innerHTML = '';
      start.style.display = 'none';
      endItem.style.display = 'block';
      pointsItem.style.display = 'block';
      pointsOutput.textContent = 0;

      window.cards.make();

      // Переворачиваем все карты рубашкой вниз
      for (var key in cardDeck) {
        window.rotate(cardDeck[key].element, cardDeck[key]);
      }

      // Отключаем возможность клацать на карты и на кнопку 'end'
      document.removeEventListener('click', callback);
      endButton.removeEventListener('click', startDisplayInit);

      // Через заданное время возвращаем карты обратно рубашкой кверху и разрешаем клацать пользователю по ним и по кнопке 'end'
      setTimeout(function() {
        for (var key in cardDeck) {
          window.rotate(cardDeck[key].element, cardDeck[key]);
        }

        document.addEventListener('click', callback);
        endButton.addEventListener('click', startDisplayInit);
      }, window.constants.CARDS_DISPLAY_TIME);
    }
  };

  // Очищает поле, инициализирует главный экран
  var startDisplayInit = function () {
    field.innerHTML = '';
    start.style.display = 'flex';
    endItem.style.display = 'none';
    pointsItem.style.display = 'none';
    pointsOutput.textContent = 0;
    clearObject(checkCard);
  }

  // Функция подсчитывает очки
  var countPoints = function (isSuccessfully, funcGame, funcEndGame) {
    if (isSuccessfully) {
      for (var key in openCards) {
        guessedCards[key] = openCards[key];

        funcGame(cardDeck[key].element);

        delete cardDeck[key];

        if (!Object.keys(cardDeck).length) {
          funcEndGame(window.constants.SUCCESSFUL_MESSAGE, points);
        }
      }

      points += Object.keys(cardDeck).length * window.constants.POINT_COEFFICIENT;
      pointsOutput.textContent = points;
    } else {
      points -= Object.keys(guessedCards).length * window.constants.POINT_COEFFICIENT;
      pointsOutput.textContent = points;
    }
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
        countPoints(true, functions.delete, functions.popup);

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
    points: points,
    new: newGame,
    init: startDisplayInit
  }
})();
