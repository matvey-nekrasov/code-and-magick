'use strict';

const WIZARDS_COUNT = 4;

/**
 * Получение случайного элемента массива
 * @param {Array} items произвольный массив
 * @return {*} случайный элемент массива
 */
const getRandomElementFromArray = (items) => {
  return items[Math.floor(Math.random() * items.length)];
};

/**
 * Генерация данных о волшебниках
 * @param {number} count количество объектов для генерации
 * @return {Array} массив объектов волшебников
 */
const generateWizards = (count) => {
  const Wizard = {
    NAMES: [`Иван`, `Хуан Себастьян`, `Мария`, `Кристоф`, `Виктор`, `Юлия`, `Люпита`, `Вашингтон`],
    SURNAMES: [`да Марья`, `Верон`, `Мирабелла`, `Вальц`, `Онопко`, `Топольницкая`, `Нионго`, `Ирвинг`],
    COAT_COLORS: [`rgb(101, 137, 164)`, `rgb(241, 43, 107)`, `rgb(146, 100, 161)`, `rgb(56, 159, 117)`, `rgb(215, 210, 55)`, `rgb(0, 0, 0)`],
    EYES_COLORS: [`black`, `red`, `blue`, `yellow`, `green`]
  };

  const wizards = [];
  for (let i = 0; i < count; i++) {
    wizards.push({
      name: `${getRandomElementFromArray(Wizard.NAMES)} ${getRandomElementFromArray(Wizard.SURNAMES)}`,
      coatColor: getRandomElementFromArray(Wizard.COAT_COLORS),
      eyesColor: getRandomElementFromArray(Wizard.EYES_COLORS)
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
const wizards = generateWizards(WIZARDS_COUNT);
const fragment = renderWizardsToFragment(wizards);
similarList.appendChild(fragment);

userDialog.classList.remove(`hidden`);
userDialog.querySelector(`.setup-similar`).classList.remove(`hidden`);
