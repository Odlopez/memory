'use strict';

(function () {
  // Генерирует и возвращает случайное число в пределах заданных параметров
  var getRandomNumber = function (to, from) {
    from = from || 0;

    return Math.round(Math.random() * (to - from) + from);
  };

  // Сортирует массив методом Фишера-Йетса
  var sortFisherYates = function (arr, isGetNewArray) {
    var j;
    var x;

    if (isGetNewArray) {
      arr = arr.slice(0);
    }

    for (var i = arr.length - 1; i > 0; i--) {
      j = getRandomNumber(arr.length - 1);
      x = arr[j];
      arr[j] = arr[i];
      arr[i] = x;
    }

    return arr;
  };

  // Удваивает все элементы в массиве и перемешивает их
  var doublesArray = function (arr) {
    var newArray = [];

    arr.forEach(function (it) {
      newArray.push(it);
      newArray.push(it);
    });

    arr = sortFisherYates(newArray);

    return arr;
  };

  window.utilites = {
    randomNumber: getRandomNumber,
    sort: sortFisherYates,
    doubles: doublesArray
  };
})();
