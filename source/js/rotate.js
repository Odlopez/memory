'use strict';

(function () {
  // Функция, фналогичная  CSS-свойству transition-timing-function. В данном случае, соотвествует linear
  var linearTimig = function (timeFraction) {
    return timeFraction;
  };

  // Функция вызывающая вращение элемента
  var rotate = function (elem, proportion) {
    var angle = 180 * proportion;

    // Если карта лежит рубашкой кверху, крутим в одну сторону, если рубашкой вниз - в другую.
    if (elem.dataset.shirt === 'false') {
      elem.style.transform = 'rotate3d(0, 1, 0, ' + angle + 'deg)';
    } else {
      elem.style.transform = 'rotate3d(0, 1, 0, ' + (180 - angle) + 'deg)';
    }
  };

  // Функция задает параметры background, в зависимости от того, рубашкой к верху лежит карта, или нет.
  var changeBackground = function (elem, options, isShirt) {
    if (isShirt === 'true') {
      elem.style.backgroundImage = options.SHIRT.IMAGE;
      elem.style.backgroundSize = options.SHIRT.SIZE;
      elem.style.border = options.SHIRT.BORDER;
    } else {
      elem.style.backgroundImage = 'url(' +  options.URL + ')';
      elem.style.backgroundSize = options.FACE.SIZE;
      elem.style.border = options.FACE.BORDER;
    }
  };

  // Функция анимации карты
  var animateRotate = function (elem, duration, timing, funcFirst, funcSecond, options) {
    // Засекаем время старта
    var start = performance.now();

    // Определяем в каком положении сейчас карта (рубашкой вверх или вниз) и записываем это положение в data-атрибут
    elem.dataset.shirt = (elem.dataset.shirt === 'false') ? true : false

    // Зацикливаем нашу анимацию
    requestAnimationFrame(function animate (time) {
      // Определяем сколько времени прошло с начала анимации
      var timeFraction = (time - start) / duration;

      // С помощью временной функции высчитываем "прогресс" анимации
      timeFraction = timing(timeFraction);

      // Если вдруг прогресс анимации перевалил за 1 (то есть анимация длится больше запланированного времени), считаем, что анимация окончена и timeFraction === 1
      if (timeFraction > 1) timeFraction = 1;

      /*
        Запускаем первую функцию, которая передается у нас в качестве аргумента.
        В данном конкретном случае это будет функция вращения карты.
      */
      funcFirst(elem, timeFraction);

      // Если анимация проигралась уже наполовину, запускаем вторую
      /*
        Если анимация проигралась уже наполовину, запускаем вторую функцию, переданную в качестве аргумента.
        В данном случае это будет смена фона карты.
      */
      if (timeFraction > 0.5) {
        funcSecond(elem, options, elem.dataset.shirt);
      }

      // Если анимация еще не закочена, повторяем все по циклу
      if (timeFraction < 1) {
        requestAnimationFrame(animate);
      }
    });
  };

  // Обработчик события клика по карте.
  window.rotate = function (targetElement, options) {
    // Запускаем анимацию вращения
    animateRotate(targetElement, 800, linearTimig, rotate, changeBackground, options);
  }
})();
