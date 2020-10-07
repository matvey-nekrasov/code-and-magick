'use strict';

(() => {
  const setupDiv = document.querySelector(`.setup`);

  /**
   * Устанавливает свойство [element].style.fill на случайное из массива [colorsArray]
   * @param {Element} element
   * @param {Array} colorsArray
   */
  const addElementRandomFillColorEvent = (element, colorsArray) => {
    element.addEventListener(`click`, () => {
      const color = window.util.getRandomElementFromArray(colorsArray);
      if (element.tagName.toLowerCase() === `div`) {
        element.style.backgroundColor = color;
      } else {
        element.style.fill = color;
      }
    });
  };

  // Изменение цвета мантии персонажа при клике на неё
  const wizardCoatElement = setupDiv.querySelector(`.setup-wizard .wizard-coat`);
  addElementRandomFillColorEvent(wizardCoatElement, window.WizardProperties.COAT_COLORS);

  // Изменение цвета глаз персонажа при клике на них
  const wizardEyesElement = setupDiv.querySelector(`.setup-wizard .wizard-eyes`);
  addElementRandomFillColorEvent(wizardEyesElement, window.WizardProperties.EYES_COLORS);

  // Изменение цвета фаербола персонажа при клике на него
  const fireballElement = setupDiv.querySelector(`.setup-fireball-wrap`);
  addElementRandomFillColorEvent(fireballElement, window.WizardProperties.FIREBALL_COLORS);
})();
