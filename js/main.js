"use strict";!function(){var e=document.querySelector(".start__button"),t=document.querySelector(".menu__end"),n=document.querySelector(".menu__time-button"),a=function(e){if(!e.target.classList.contains(window.constants.CARD_CLASS_NAME)||e.target.dataset.number in window.game.openCards)e.target.dataset.number in window.game.openCards&&alert("Эта карта уже открыта");else{var t=e.target;window.rotate(t,window.game.cardDeck[t.dataset.number]),window.game.logic(t,d)}},d={rotate:window.rotate,callback:a,delete:window.field.deleteCard,popup:window.popup.create};e.addEventListener("click",window.game.new(a)),document.addEventListener("click",a),t.addEventListener("click",window.game.init),n.addEventListener("click",window.state.changeSelect)}();