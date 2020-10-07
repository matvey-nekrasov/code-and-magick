'use strict';

(() => {
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
    // Сбрасывание координат окна после перемещения
    setupDiv.style.top = ``;
    setupDiv.style.left = ``;

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
})();
