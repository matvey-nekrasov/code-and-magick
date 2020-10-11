'use strict';

(() => {
  const MAX_SIMILAR_WIZARDS_COUNT = 4;

  /**
   * Генерация похожих персонажей ---------------------------------------------------
   */

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

  const backendLoadOnLoad = (wizardsData) => {
    const sliceIndexStart = window.util.getRandomIntFromInterval(0, wizardsData.length - MAX_SIMILAR_WIZARDS_COUNT);
    const sliceIndexEnd = sliceIndexStart + MAX_SIMILAR_WIZARDS_COUNT;
    const wizardsDataToRender = wizardsData.slice(sliceIndexStart, sliceIndexEnd);
    const wizardsFragment = renderWizardsToFragment(wizardsDataToRender);
    const similarList = userDialog.querySelector(`.setup-similar-list`);
    similarList.appendChild(wizardsFragment);
    userDialog.classList.remove(`hidden`);
    userDialog.querySelector(`.setup-similar`).classList.remove(`hidden`);
  };

  const backendSaveOnLoad = () => {
    userDialog.classList.add(`hidden`);
  };

  const backendOnError = (errorMessage) => {
    const node = document.createElement(`div`);
    node.style = `z-index: 100; margin: 0 auto; text-align: center; background-color: red;`;
    node.style.position = `absolute`;
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = `30px`;

    node.textContent = errorMessage;
    document.body.insertAdjacentElement(`afterbegin`, node);
  };

  const userDialog = document.querySelector(`.setup`);
  // Загрузка данных о волшебниках при старте
  window.backend.load(backendLoadOnLoad, backendOnError);

  // Обработчик при отправке формы
  const form = userDialog.querySelector(`.setup-wizard-form`);
  const submitHandler = (evt) => {
    window.backend.save(new FormData(form), backendSaveOnLoad, backendOnError);
    evt.preventDefault();
  };
  form.addEventListener(`submit`, submitHandler);
})();
