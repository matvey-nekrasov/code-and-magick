'use strict';

/**
 * Глобальные константы --------------------------------------------------------------------------------------
 */

const WIZARDS_COUNT = 4;

const Wizard = {
  NAMES: [`Иван`, `Хуан Себастьян`, `Мария`, `Кристоф`, `Виктор`, `Юлия`, `Люпита`, `Вашингтон`],
  SURNAMES: [`да Марья`, `Верон`, `Мирабелла`, `Вальц`, `Онопко`, `Топольницкая`, `Нионго`, `Ирвинг`],
  COAT_COLORS: [`rgb(101, 137, 164)`, `rgb(241, 43, 107)`, `rgb(146, 100, 161)`, `rgb(56, 159, 117)`, `rgb(215, 210, 55)`, `rgb(0, 0, 0)`],
  EYES_COLORS: [`black`, `red`, `blue`, `yellow`, `green`],
  FIREBALL_COLORS: [`#ee4830`, `#30a8ee`, `#5ce6c0`, `#e848d5`, `#e6e848`]
};


/**
 * Служебные функции ---------------------------------------------------
 */

/**
 * Получение случайного элемента массива
 * @param {Array} items произвольный массив
 * @return {*} случайный элемент массива
 */
const getRandomElementFromArray = (items) => {
  return items[Math.floor(Math.random() * items.length)];
};


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
const wizardsData = generateWizardsData(WIZARDS_COUNT);
const wizardsFragment = renderWizardsToFragment(wizardsData);
similarList.appendChild(wizardsFragment);

userDialog.classList.remove(`hidden`);
userDialog.querySelector(`.setup-similar`).classList.remove(`hidden`);


/**
 * Обработка событий -----------------------------------------------------
 */

const setupDiv = document.querySelector(`.setup`);
const setupOpenButton = document.querySelector(`.setup-open`);
const setupCloseButton = setupDiv.querySelector(`.setup-close`);
const setupUserNameTextBox = setupDiv.querySelector(`.setup-user-name`);

/**
 * Обработчик нажатия Esc - закрывает попап с настройками
 * @param {*} evt событие
 */
const onPopupEscPress = (evt) => {
  if (evt.key === `Escape`) {
    evt.preventDefault();
    closePopup();
  }
};

// Открытие окна с настройками
const openPopup = () => {
  setupDiv.classList.remove(`hidden`);
  document.addEventListener(`keydown`, onPopupEscPress);
};

// Скрытие окна с настройками
const closePopup = () => {
  setupDiv.classList.add(`hidden`);
  document.removeEventListener(`keydown`, onPopupEscPress);
};

// Запрет закрытия окна setup при фокусе на UserNameTextBox
setupUserNameTextBox.addEventListener(`focus`, () => {
  document.removeEventListener(`keydown`, onPopupEscPress);
});

// Добавление закрытия окна setup при уходе фокуса с UserNameTextBox
setupUserNameTextBox.addEventListener(`blur`, () => {
  document.addEventListener(`keydown`, onPopupEscPress);
});

// Открытие окна setup при нажатии на кнопку
setupOpenButton.addEventListener(`click`, () => {
  openPopup();
});

// Открытие окна setup при нажатии на Enter на кнопке
setupOpenButton.addEventListener(`keydown`, (evt) => {
  if (evt.key === `Enter`) {
    openPopup();
  }
});

// Закрытие окна setup при нажатии на кнопку
setupCloseButton.addEventListener(`click`, () => {
  closePopup();
});

// Закрытие окна setup при нажатии на Enter на кнопке
setupCloseButton.addEventListener(`keydown`, (evt) => {
  if (evt.key === `Enter`) {
    closePopup();
  }
});

/**
 * Устанавливает свойство [element].style.fill на случайное из массива [colorsArray]
 * @param {Element} element
 * @param {Array} colorsArray
 */
const setElementRandomFillColor = (element, colorsArray) => {
  element.style.fill = getRandomElementFromArray(colorsArray);
};

// Изменение цвета мантии персонажа при клику на неё
const wizardCoatElement = setupDiv.querySelector(`.setup-wizard .wizard-coat`);
wizardCoatElement.addEventListener(`click`, () => {
  setElementRandomFillColor(wizardCoatElement, Wizard.COAT_COLORS);
});

// Изменение цвета глаз персонажа при клику на них
const wizardEyesElement = setupDiv.querySelector(`.setup-wizard .wizard-eyes`);
wizardEyesElement.addEventListener(`click`, () => {
  setElementRandomFillColor(wizardEyesElement, Wizard.EYES_COLORS);
});

// Изменение цвета фаербола персонажа при клику на него
const fireballElement = setupDiv.querySelector(`.setup-fireball-wrap`);
fireballElement.addEventListener(`click`, () => {
  fireballElement.style.background = getRandomElementFromArray(Wizard.FIREBALL_COLORS);
});
