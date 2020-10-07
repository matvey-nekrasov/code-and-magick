'use strict';

(() => {
  const CLOUD_WIDTH = 420;
  const CLOUD_HEIGHT = 270;
  const CLOUD_X = 100;
  const CLOUD_Y = 10;
  const CLOUD_SHADOW_GAP = 10;
  const MESSAGE_X = 20;
  const MESSAGE_Y = 30;
  const MESSAGE_LINE_HEIGHT = 20;
  const BARS_X = 40;
  const BARS_Y = 90;
  const BAR_WIDTH = 40;
  const BAR_MAX_HEIGHT = CLOUD_HEIGHT - BARS_Y - 40;
  const COLUMN_GAP = 50;
  const LEGEND_TOP_GAP = 10;
  const LEGEND_BOTTOM_GAP = 20;


  const renderCloud = function (ctx, x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
  };

  const renderMultilineText = function (ctx, x, y, text) {
    const textArray = text.split(`\n`);
    for (let i = 0; i < textArray.length; i++) {
      ctx.fillText(
          textArray[i],
          x,
          y + MESSAGE_LINE_HEIGHT * i
      );
    }
  };

  const getMaxElement = function (arr) {
    let maxElement = arr[0];

    for (let i = 1; i < arr.length; i++) {
      if (arr[i] > maxElement) {
        maxElement = arr[i];
      }
    }

    return maxElement;
  };

  window.renderStatistics = function (ctx, names, times) {
    renderCloud(
        ctx,
        CLOUD_X + CLOUD_SHADOW_GAP,
        CLOUD_Y + CLOUD_SHADOW_GAP,
        `rgba(0, 0, 0, 0.7)`
    );
    renderCloud(
        ctx,
        CLOUD_X,
        CLOUD_Y,
        `#fff`
    );

    ctx.fillStyle = `#000`;
    ctx.font = `16px PT Mono`;

    renderMultilineText(
        ctx,
        CLOUD_X + MESSAGE_X,
        CLOUD_Y + MESSAGE_Y,
        `Ура вы победили! \nСписок результатов:`
    );

    let maxTime = getMaxElement(times);

    for (let i = 0; i < names.length; i++) {
      ctx.fillStyle = names[i] === `Вы` ? `rgba(255, 0, 0, 1)` : `hsl(235, ${Math.random() * 100}%, 50%)`;
      const barHeight = (BAR_MAX_HEIGHT * times[i]) / maxTime;
      ctx.fillRect(
          CLOUD_X + BARS_X + (BAR_WIDTH + COLUMN_GAP) * i,
          CLOUD_Y + BARS_Y + BAR_MAX_HEIGHT - barHeight,
          BAR_WIDTH,
          barHeight
      );

      ctx.fillStyle = `#000`;
      ctx.fillText(
          Math.round(times[i]),
          CLOUD_X + BARS_X + (BAR_WIDTH + COLUMN_GAP) * i,
          CLOUD_Y + BARS_Y + BAR_MAX_HEIGHT - barHeight - LEGEND_TOP_GAP
      );

      ctx.fillText(
          names[i],
          CLOUD_X + BARS_X + (BAR_WIDTH + COLUMN_GAP) * i,
          CLOUD_Y + BARS_Y + BAR_MAX_HEIGHT + LEGEND_BOTTOM_GAP
      );
    }
  };
})();
