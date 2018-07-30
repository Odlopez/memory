'use strict';

(function () {
  var field = document.querySelector('.field');
  var cardDeck = {};
  var openCards = {};

  // Добавляем карту к 'открытым', если она была закрыта, и удаляем из 'открытых', если она была открыта
  var changeStatus = function (card) {
    if (card.element.dataset.shirt === 'false') {
      openCards[card.number] = (cardDeck[card.number]);
    } else {
      delete openCards[card.number]
    }
  };

  // Выбираем карту и переворачиваем ее, удаляя или добавляя к групее 'открытых карт'
  var checkCard = function (targetCard) {
    for (var i = 0; i < field.children.length; i++) {
      if (cardDeck[i].element === targetCard) {
        changeStatus(cardDeck[i]);
        return;
      }
    }
  }

  /**
    Запускаем функцию выбора и переворачивания карты, и если карт становится две - подсчитываем очки.
   */
  var countPoints = function (targetElement) {
    // Здесь мы запускаем функцию выбора и переворачивания карты.
    checkCard(targetElement);

    // Чтобы было проще работать с объектом 'открытых карт', записываем его ключи в массив
    var keys = Object.keys(openCards);

    // Проверяем, если длинна массива с ключами, а соответственно, и длина объекта с открытыми картами равна двум, подсчитываем очки
    if (keys.length === 2) {
      if (openCards[keys[0]].URL === openCards[keys[1]].URL) {
        console.log('Урааа!');
      }
    }
  };

  window.game = {
    count: countPoints,
    cardDeck: cardDeck,
    openCards: openCards
  }
})();
