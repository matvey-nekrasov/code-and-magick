'use strict';

const WIZARD_NAMES = [`Иван`, `Хуан Себастьян`, `Мария`, `Кристоф`, `Виктор`, `Юлия`, `Люпита`, `Вашингтон`];
const WIZARD_SURNAMES = [`да Марья`, `Верон`, `Мирабелла`, `Вальц`, `Онопко`, `Топольницкая`, `Нионго`, `Ирвинг`];
const WIZARD_COAT_COLORS = [`rgb(101, 137, 164)`, `rgb(241, 43, 107)`, `rgb(146, 100, 161)`, `rgb(56, 159, 117)`, `rgb(215, 210, 55)`, `rgb(0, 0, 0)`];
const WIZARD_EYES_COLORS = [`black`, `red`, `blue`, `yellow`, `green`];
const WIZARDS_COUNT = 4;

const generateWizards = () => {
  const randomElement = (array) => {
    return array[Math.floor(Math.random() * array.length)];
  };

  const wizards = [];
  for (let i = 0; i < WIZARDS_COUNT; i++) {
    wizards.push({
      name: `${randomElement(WIZARD_NAMES)} ${randomElement(WIZARD_SURNAMES)}`,
      coatColor: randomElement(WIZARD_COAT_COLORS),
      eyesColor: randomElement(WIZARD_EYES_COLORS)
    });
  }
  return wizards;
};

const wizards = generateWizards();
const userDialog = document.querySelector(`.setup`);
userDialog.classList.remove(`hidden`);
const similarListElement = userDialog.querySelector(`.setup-similar-list`);
const similarWizardTemplate = document.querySelector(`#similar-wizard-template`)
  .content
  .querySelector(`.setup-similar-item`);

const renderWizard = (wizard) => {
  const wizardElement = similarWizardTemplate.cloneNode(true);
  wizardElement.querySelector(`.setup-similar-label`).textContent = wizard.name;
  wizardElement.querySelector(`.wizard-coat`).style.fill = wizard.coatColor;
  wizardElement.querySelector(`.wizard-eyes`).style.fill = wizard.eyesColor;
  return wizardElement;
};

const setupSimilar = (wizardsArray) => {
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < wizardsArray.length; i++) {
    fragment.appendChild(renderWizard(wizardsArray[i]));
  }
  return fragment;
};

similarListElement.appendChild(setupSimilar(wizards));
userDialog.querySelector(`.setup-similar`).classList.remove(`hidden`);
