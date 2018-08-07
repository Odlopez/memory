'use strict';

(function () {
  var field = document.querySelector('.field');
  var start = document.querySelector('.start');
  var endItem  = document.querySelector('.menu__item--end');
  var pointsItem  = document.querySelector('.menu__item--points');
  var pointsOutput  = document.querySelector('.menu__points');
  var timerButton = document.querySelector('.menu__time-button');
  var select = document.querySelector('.menu__select');
  var timerItem = document.querySelector('.menu__item--timer');
  var timer = document.querySelector('.menu__timer');

  // Начинаем игру, сбрасываем все стили для начала игры
  var initGame = function () {
    field.innerHTML = '';
    start.style.display = 'none';
    pointsItem.style.display = 'block';
    pointsOutput.textContent = 0;
    timerButton.style.display = 'none';
    select.style.display = 'none';

    if (timerButton.classList.contains('menu__time-button--on')) {
      timerItem.classList.add('menu__item--timer-on');
      timer.style.display = 'inline-block';
      timer.textContent = 60 * select.value;
    }
  };

  // Очищает поле, инициализирует главный экран
  var initStart = function () {
    field.innerHTML = '';
    start.style.display = 'flex';
    endItem.style.display = 'none';
    pointsItem.style.display = 'none';
    timer.style.display = 'none';
    timerButton.style.display = 'flex';
    pointsOutput.textContent = 0;
    select.style.width = 0;
    select.style.padding = 0;
    timerButton.classList.remove('menu__time-button--on');
    timerItem.classList.remove('menu__item--timer-on');
  };

  // Меняем состояние select'а при нажатии на кнопку 'TIME'
  var changeStateSelect = function () {
    if (!select.offsetWidth) {
      select.style.width = 'auto';
      select.style.padding = '5px 0 5px 7px';
      select.style.display = 'inline-block';
    } else {
      select.style.width = 0;
      select.style.padding = 0;
    }

    timerButton.classList.toggle('menu__time-button--on');
  }

  window.state = {
    initGame: initGame,
    initStart: initStart,
    changeSelect: changeStateSelect
  };
})();
