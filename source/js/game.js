'use strict';

(function () {
  var endItem  = document.querySelector('.menu__item--end');
  var pointsOutput  = document.querySelector('.menu__points');
  var timer = document.querySelector('.menu__timer');
  var timerButton = document.querySelector('.menu__time-button');
  var select = document.querySelector('.menu__select');

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

  // Запускаем финальный отчет.
  var finalCountdown = function () {
    // Переводим выбранное время в секунды
    var time = select.value * 60;

    // Создаем нашу функцию-интервал, которая уменьшает на 1 каждую секунду оставшееся время.
    var timerId =  setInterval(function() {
      timer.textContent = --time;

      // Если время равно нулю, сбрасываем наш интервал
      if (time === 0) {
        window.popup.create(window.constants.TIMEOUT_MESSAGE, points);
        clearInterval(timerId);
      }

      // Если пользователь нажал клавишу 'END', сбрасываем наш интервал
      if (endItem.style.display == 'none') {
        clearInterval(timerId);
      }
    }, 1000);
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

      window.state.initGame();
      window.cards.make();

      // Переворачиваем все карты рубашкой вниз
      for (var key in cardDeck) {
        window.rotate(cardDeck[key].element, cardDeck[key]);
      }

      // Отключаем возможность клацать на карты и на кнопку 'end'
      document.removeEventListener('click', callback);

      // Через заданное время возвращаем карты обратно рубашкой кверху и разрешаем клацать пользователю по ним и по кнопке 'end'
      setTimeout(function() {
        for (var key in cardDeck) {
          window.rotate(cardDeck[key].element, cardDeck[key]);
        }

        document.addEventListener('click', callback);
        endItem.style.display = 'block';

        if (timerButton.classList.contains('menu__time-button--on')) {
          finalCountdown();
        }

      }, window.constants.CARDS_DISPLAY_TIME);
    }
  };

  // Очищает поле, инициализирует главный экран
  var startDisplayInit = function () {
    window.state.initStart();
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
