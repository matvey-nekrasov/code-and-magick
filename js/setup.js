'use strict';

const WIZARDS_COUNT = 4;

const generateWizards = (count) => {
  const WIZARD_NAMES = [`Иван`, `Хуан Себастьян`, `Мария`, `Кристоф`, `Виктор`, `Юлия`, `Люпита`, `Вашингтон`];
  const WIZARD_SURNAMES = [`да Марья`, `Верон`, `Мирабелла`, `Вальц`, `Онопко`, `Топольницкая`, `Нионго`, `Ирвинг`];
  const WIZARD_COAT_COLORS = [`rgb(101, 137, 164)`, `rgb(241, 43, 107)`, `rgb(146, 100, 161)`, `rgb(56, 159, 117)`, `rgb(215, 210, 55)`, `rgb(0, 0, 0)`];
  const WIZARD_EYES_COLORS = [`black`, `red`, `blue`, `yellow`, `green`];

  const getRandomItem = (items) =>
    items[Math.floor(Math.random() * items.length)];

  const wizards = [];
  for (let i = 0; i < count; i++) {
    wizards.push({
      name: `${getRandomItem(WIZARD_NAMES)} ${getRandomItem(WIZARD_SURNAMES)}`,
      coatColor: getRandomItem(WIZARD_COAT_COLORS),
      eyesColor: getRandomItem(WIZARD_EYES_COLORS)
    });
  }
  return wizards;
};

const renderWizards = (wizards) => {
  const renderWizardTemplate = (wizard) => {
    const similarWizardTemplate = document.querySelector(`#similar-wizard-template`)
      .content.querySelector(`.setup-similar-item`);
    const wizardElement = similarWizardTemplate.cloneNode(true);
    wizardElement.querySelector(`.setup-similar-label`).textContent = wizard.name;
    wizardElement.querySelector(`.wizard-coat`).style.fill = wizard.coatColor;
    wizardElement.querySelector(`.wizard-eyes`).style.fill = wizard.eyesColor;
    return wizardElement;
  };

  const fragment = document.createDocumentFragment();
  for (let i = 0; i < wizards.length; i++) {
    const wizardElement = renderWizardTemplate(wizards[i]);
    fragment.appendChild(wizardElement);
  }

  const userDialog = document.querySelector(`.setup`);
  const similarList = userDialog.querySelector(`.setup-similar-list`);
  similarList.appendChild(fragment);

  userDialog.classList.remove(`hidden`);
  userDialog.querySelector(`.setup-similar`).classList.remove(`hidden`);
};

const wizards = generateWizards(WIZARDS_COUNT);
renderWizards(wizards);
