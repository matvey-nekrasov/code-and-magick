'use strict';

/**
 * Генерация похожих персонажей ---------------------------------------------------
 */

(() => {
  const MAX_SIMILAR_WIZARDS_COUNT = 4;
  const userDialog = document.querySelector(`.setup`);

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
    wizardElement.querySelector(`.wizard-coat`).style.fill = wizard.colorCoat;
    wizardElement.querySelector(`.wizard-eyes`).style.fill = wizard.colorEyes;
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

  const renderWizardsToDom = (wizardsData) => {
    const takeNumber = wizardsData.length > MAX_SIMILAR_WIZARDS_COUNT
      ? MAX_SIMILAR_WIZARDS_COUNT
      : wizardsData.length;
    const wizardsDataToRender = wizardsData.slice(0, takeNumber);
    const wizardsFragment = renderWizardsToFragment(wizardsDataToRender);
    const similarList = userDialog.querySelector(`.setup-similar-list`);
    similarList.innerHTML = ``;
    similarList.appendChild(wizardsFragment);
    userDialog.classList.remove(`hidden`);
    userDialog.querySelector(`.setup-similar`).classList.remove(`hidden`);
  };

  window.render = renderWizardsToDom;
})();
