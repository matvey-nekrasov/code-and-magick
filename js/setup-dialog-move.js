'use strict';

// Добавление возможности перемещения окна

(() => {
  const setupDiv = document.querySelector(`.setup`);
  window.setupDiv = setupDiv;
  const dialogHandle = setupDiv.querySelector(`.upload`);

  dialogHandle.addEventListener(`mousedown`, (evt) => {
    evt.preventDefault();

    const setupDivBoundaries = {
      minTop: 0,
      minLeft: setupDiv.offsetWidth / 2,
      maxTop: window.innerHeight - setupDiv.offsetHeight,
      maxLeft: window.innerWidth - setupDiv.offsetWidth / 2
    };

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

      setupDiv.style.top = `${Math.min(Math.max(setupDiv.offsetTop - shift.y, setupDivBoundaries.minTop),
          setupDivBoundaries.maxTop)}px`;
      setupDiv.style.left = `${Math.min(Math.max(setupDiv.offsetLeft - shift.x, setupDivBoundaries.minLeft),
          setupDivBoundaries.maxLeft)}px`;
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
