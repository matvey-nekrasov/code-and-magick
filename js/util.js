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

  const onError = (errorMessage) => {
    const node = document.createElement(`div`);
    node.style = `z-index: 100; margin: 0 auto; text-align: center; background-color: red;`;
    node.style.position = `absolute`;
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = `30px`;

    node.textContent = errorMessage;
    document.body.insertAdjacentElement(`afterbegin`, node);
  };

  window.util = {
    getRandomElementFromArray,
    getRandomIntFromInterval,
    onError
  };
})();
