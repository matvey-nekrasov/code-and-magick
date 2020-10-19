'use strict';

(() => {
  const userDialog = document.querySelector(`.setup`);
  const form = userDialog.querySelector(`.setup-wizard-form`);

  let coatColor = `rgb(101, 137, 164)`;
  let eyesColor = `black`;
  let wizardsDataLocal = [];

  const getRank = function (wizard) {
    let rank = 0;

    if (wizard.colorCoat === coatColor) {
      rank += 2;
    }
    if (wizard.colorEyes === eyesColor) {
      rank += 1;
    }
    return rank;
  };

  const namesComparator = function (left, right) {
    if (left > right) {
      return 1;
    } else if (left < right) {
      return -1;
    } else {
      return 0;
    }
  };

  const updateWizards = function () {
    window.render(wizardsDataLocal.sort(function (left, right) {
      let rankDiff = getRank(right) - getRank(left);
      if (rankDiff === 0) {
        rankDiff = namesComparator(left.name, right.name);
      }
      return rankDiff;
    }));
  };

  window.wizard.setEyesChangeHandler(window.debounce(function (color) {
    eyesColor = color;
    updateWizards();
  }));

  window.wizard.setCoatChangeHandler(window.debounce(function (color) {
    coatColor = color;
    updateWizards();
  }));

  const onLoadSimilarWizards = (wizardsData) => {
    wizardsDataLocal = wizardsData;
    updateWizards();
  };

  const onSubmitSetupData = () => {
    userDialog.classList.add(`hidden`);
  };

  // Загрузка данных о волшебниках при старте
  window.backend.xmlHttpRequestWrapper(`GET`, null, onLoadSimilarWizards, window.util.onError);

  // Обработчик при отправке формы
  const submitHandler = (evt) => {
    window.backend.xmlHttpRequestWrapper(`POST`, new FormData(form), onSubmitSetupData, window.util.onError);
    evt.preventDefault();
  };
  form.addEventListener(`submit`, submitHandler);
})();
