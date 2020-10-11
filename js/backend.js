'use strict';

(function () {
  const UrlList = {
    URL_LOAD: `https://21.javascript.pages.academy/code-and-magick/data`,
    URL_SAVE: `https://21.javascript.pages.academy/code-and-magick`,
  };
  const StatusCode = {
    OK: 200
  };
  const TIMEOUT_IN_MS = 1000;

  const load = function (onLoad, onError) {
    const xhr = new XMLHttpRequest();
    xhr.responseType = `json`;

    xhr.addEventListener(`load`, function () {
      if (xhr.status === StatusCode.OK) {
        onLoad(xhr.response);
      } else {
        onError(`Статус ответа: ${xhr.status} ${xhr.statusText}`);
      }
    });
    xhr.addEventListener(`error`, function () {
      onError(`Произошла ошибка соединения`);
    });
    xhr.addEventListener(`timeout`, function () {
      onError(`Запрос не успел выполниться за ${xhr.timeout} мс`);
    });

    xhr.timeout = TIMEOUT_IN_MS;

    xhr.open(`GET`, UrlList.URL_LOAD);
    xhr.send();
  };

  const save = (data, onLoad, onError) => {
    const xhr = new XMLHttpRequest();
    xhr.responseType = `json`;

    xhr.addEventListener(`load`, function () {
      if (xhr.status === StatusCode.OK) {
        onLoad(xhr.response);
      } else {
        onError(`Статус ответа: ${xhr.status} ${xhr.statusText}`);
      }
    });
    xhr.addEventListener(`error`, function () {
      onError(`Произошла ошибка соединения`);
    });
    xhr.addEventListener(`timeout`, function () {
      onError(`Запрос не успел выполниться за ${xhr.timeout} мс`);
    });

    xhr.timeout = TIMEOUT_IN_MS;

    xhr.open(`POST`, UrlList.URL_SAVE);
    xhr.send(data);
  };

  window.backend = {
    load,
    save
  };
})();
