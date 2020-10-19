/* eslint-disable prefer-spread */
/* eslint-disable prefer-rest-params */
// Файл debounce.js
'use strict';
(function () {
  const DEBOUNCE_INTERVAL = 300; // ms

  window.debounce = function (cb) {
    let lastTimeout = null;

    return function () {
      const parameters = arguments;
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(function () {
        cb.apply(null, parameters);
      }, DEBOUNCE_INTERVAL);
    };
  };
})();
