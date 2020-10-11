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
  const getRandomElementFromArray = (items) => {
    return items[Math.floor(Math.random() * items.length)];
  };

  /**
   * Получение случайного целого числа из интервала [min, max]
   * @param {number} min
   * @param {number} max
   * @return {number}
   */
  const getRandomIntFromInterval = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  window.util = {
    getRandomElementFromArray,
    getRandomIntFromInterval
  };
})();
