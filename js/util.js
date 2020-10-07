'use strict';

/**
 * Служебные функции ---------------------------------------------------
 */

(() => {
  window.util = {
    /**
     * Получение случайного элемента массива
     * @param {Array} items произвольный массив
     * @return {*} случайный элемент массива
     */
    getRandomElementFromArray: (items) => {
      return items[Math.floor(Math.random() * items.length)];
    }
  };
})();
