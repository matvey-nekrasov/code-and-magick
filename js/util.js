'use strict';

/**
 * Служебные функции ---------------------------------------------------
 */

(() => {
  /**
   * Получение случайного элемента массива
   * @param {Array} items произвольный массив
   * @return {*} случайный элемент массива
   */
  const getRandomElementFromArrayFunc = (items) => {
    return items[Math.floor(Math.random() * items.length)];
  };

  window.util = {
    getRandomElementFromArray: getRandomElementFromArrayFunc
  };
})();
