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

    // Сортируем массив с нашими картинками, точнее с их src'шками
    var cards = utilites.sort(IMAGES, true);

    // Обрезаем лишнее в отсортированном массиве src'шек, оставляем только заданное количество картинок
    cards.length = window.constants.CARDS_ON_FIELD;

    // Задваиваем каждую картинку, то есть увеличиваем наш массив с выбранными картами в два раза
    cards = utilites.doubles(cards);

    // Проходимся по всему массиву отобранных для игры карт
    cards.forEach(function (it, i) {
      // Создаем новую карточку, помещаем ее в DOM
      var newCard = window.field.createCard();

      // Создаем объект с необходимыми данными для карты: стили для анимации, src картинки
      var options = new CreateCard(it);

      // Добавляем в этот объект ссылку на node-элемент карты и ее порядковый номер
      options.element = newCard;
      options.number = i;

      // Также порядковый номер записываем в data-атрибут нашей карты (div.card)
      newCard.dataset.number = i;

      // Наполняем глобальный массив с данными выбранных для игры карт информацией по текущей созданной карте
      window.game.cardDeck[i] = options;
    });
  };

  window.cards = {
    make: makeCards,
  };
})();
