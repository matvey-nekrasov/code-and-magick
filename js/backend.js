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

  const xmlHttpRequestWrapper = function (method, data, onLoad, onError) {
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

    if (method === `GET`) {
      xhr.open(method, UrlList.URL_LOAD);
    } else if (method === `POST`) {
      xhr.open(method, UrlList.URL_SAVE);
    } else {
      onError(`Not implemented method: ${method}`);
    }
    xhr.send(data);
  };

  window.backend = {
    xmlHttpRequestWrapper
  };
})();
