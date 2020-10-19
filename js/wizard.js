/* eslint-disable no-invalid-this */
'use strict';

(function () {
  let wizard = {
    onEyesChange(_color) { },
    onCoatChange(_color) { }
  };

  const wizardElement = document.querySelector(`.setup-wizard`);

  const wizardCoatElement = wizardElement.querySelector(`.wizard-coat`);
  wizardCoatElement.addEventListener(`click`, function () {
    const newColor = window.util.getRandomElementFromArray(window.WizardProperties.COAT_COLORS);
    this.style.fill = newColor;
    wizard.onCoatChange(newColor);
  });

  const wizardEyesElement = wizardElement.querySelector(`.wizard-eyes`);
  wizardEyesElement.addEventListener(`click`, function () {
    const newColor = window.util.getRandomElementFromArray(window.WizardProperties.EYES_COLORS);
    this.style.fill = newColor;
    wizard.onEyesChange(newColor);
  });

  window.wizard = {
    setCoatChangeHandler(cb) {
      wizard.onCoatChange = cb;
    },

    setEyesChangeHandler(cb) {
      wizard.onEyesChange = cb;
    }
  };
})();
