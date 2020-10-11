'use strict';

// Добавление возможности перемещения окна

(() => {
  const setupDiv = document.querySelector(`.setup`);
  window.setupDiv = setupDiv;
  const dialogHandle = setupDiv.querySelector(`.upload`);

  const SetupDivBoundaries = {
    MIN_TOP: 0,
    MIN_LEFT: setupDiv.offsetWidth / 2,
    MAX_TOP: window.innerHeight - setupDiv.offsetHeight,
    MAX_LEFT: window.innerWidth - setupDiv.offsetWidth / 2
  };

  dialogHandle.addEventListener(`mousedown`, (evt) => {
    evt.preventDefault();

    let startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    let dragged = false;

    const onMouseMove = (moveEvt) => {
      moveEvt.preventDefault();

      dragged = true;

      const shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      setupDiv.style.top = Math.min(Math.max(setupDiv.offsetTop - shift.y, SetupDivBoundaries.MIN_TOP),
          SetupDivBoundaries.MAX_TOP) + `px`;
      setupDiv.style.left = Math.min(Math.max(setupDiv.offsetLeft - shift.x, SetupDivBoundaries.MIN_LEFT),
          SetupDivBoundaries.MAX_LEFT) + `px`;
    };

    const onMouseUp = (upEvt) => {
      upEvt.preventDefault();

      document.removeEventListener(`mousemove`, onMouseMove);
      document.removeEventListener(`mouseup`, onMouseUp);

      if (dragged) {
        const onClickPreventDefault = (clickEvt) => {
          clickEvt.preventDefault();
          dialogHandle.removeEventListener(`click`, onClickPreventDefault);
        };
        dialogHandle.addEventListener(`click`, onClickPreventDefault);
      }
    };

    document.addEventListener(`mousemove`, onMouseMove);
    document.addEventListener(`mouseup`, onMouseUp);
  });
})();
