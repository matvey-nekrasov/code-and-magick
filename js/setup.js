'use strict';

const WIZARDS_COUNT = 4;

/**
 * Генерация похожих персонажей ---------------------------------------------------
 */

/**
 * Генерация данных о волшебниках
 * @param {number} count количество объектов для генерации
 * @return {Array} массив объектов волшебников
 */
const generateWizardsData = (count) => {

  const wizards = [];
  for (let i = 0; i < count; i++) {
    wizards.push({
      name: `${window.util.getRandomElementFromArray(window.WizardProperties.NAMES)} ${window.util.getRandomElementFromArray(window.WizardProperties.SURNAMES)}`,
      coatColor: window.util.getRandomElementFromArray(window.WizardProperties.COAT_COLORS),
      eyesColor: window.util.getRandomElementFromArray(window.WizardProperties.EYES_COLORS)
    });
  }
  return wizards;
};

/**
 * Заполнение шаблона #similar-wizard-template данными
 * @param {Object} wizard
 * @return {Object} клонированный шаблон, заполненный данными
 */
const renderWizardTemplate = (wizard) => {
  const similarWizardTemplate = document.querySelector(`#similar-wizard-template`)
    .content.querySelector(`.setup-similar-item`);
  const wizardElement = similarWizardTemplate.cloneNode(true);
  wizardElement.querySelector(`.setup-similar-label`).textContent = wizard.name;
  wizardElement.querySelector(`.wizard-coat`).style.fill = wizard.coatColor;
  wizardElement.querySelector(`.wizard-eyes`).style.fill = wizard.eyesColor;
  return wizardElement;
};

/**
 * Добавление волшебников в DocumentFragment
 * @param {Array} wizards массив объектов волшебников
 * @return {*} DocumentFragment с волшебниками
 */
const renderWizardsToFragment = (wizards) => {
  const fragment = document.createDocumentFragment();
  wizards.forEach((wizard) => {
    const wizardElement = renderWizardTemplate(wizard);
    fragment.appendChild(wizardElement);
  });
  return fragment;
};

const userDialog = document.querySelector(`.setup`);
const similarList = userDialog.querySelector(`.setup-similar-list`);
const wizardsData = generateWizardsData(WIZARDS_COUNT);
const wizardsFragment = renderWizardsToFragment(wizardsData);
similarList.appendChild(wizardsFragment);

userDialog.classList.remove(`hidden`);
userDialog.querySelector(`.setup-similar`).classList.remove(`hidden`);
