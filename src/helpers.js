import _ from 'lodash';

export function calcAreaHeight(rectangles, height) {
  // 80  is the value comes from css, this is padding to make form visible
  const windowHeihgt = window.innerHeight - 80;
  let fitWindowInnerHeight = true;
  let currentHeight = height === 'auto' ? windowHeihgt : height;
  let lowestRectanglePosition;

  Object.keys(rectangles).forEach((key, index) => {
    if (index === 0) {
      lowestRectanglePosition = rectangles[key].height + rectangles[key].top;
    }

    if ((rectangles[key].height + rectangles[key].top) > lowestRectanglePosition) {
      lowestRectanglePosition = rectangles[key].height + rectangles[key].top;
    }

    if (lowestRectanglePosition > currentHeight) {
      currentHeight = lowestRectanglePosition;
      fitWindowInnerHeight = false;
    }
  });

  if (fitWindowInnerHeight) {
    currentHeight = lowestRectanglePosition > windowHeihgt ? lowestRectanglePosition : windowHeihgt
  }

  return currentHeight;
};


// The sum of rectangles widths cannot be larger than the viewport width
export function validWidthSum(rectangles, newRectangleConfig, selectedId) {
  const viewPortWidth = window.innerWidth;
  let rectanglesWidthSum = 0;

  Object.keys(rectangles).forEach((key, index) => {
    if ((key !== selectedId) || !selectedId) {
      rectanglesWidthSum += rectangles[key].width;
    }
  });

  if (newRectangleConfig) {
    rectanglesWidthSum += newRectangleConfig.width;
  }

  if ((rectanglesWidthSum > viewPortWidth) && newRectangleConfig) {
    alert('The sum of rectangles widths cannot be larger than the viewport width');
  }

  return !(rectanglesWidthSum > viewPortWidth);
};

// makes rectangle X position always inside viewport
export function correctXposition(newRectangle) {
  const viewPortWidth = window.innerWidth;
  let leftPosition = newRectangle.left;

  if ((leftPosition + newRectangle.width) > viewPortWidth) {
    // mutates newRectangle config object
    newRectangle.left = (viewPortWidth - newRectangle.width) >= 0 ? viewPortWidth - newRectangle.width : 0;
  }
}

export function updatePlayGroundOnResize(rectangles, height) {
  const areaHeight = calcAreaHeight(rectangles, height);
  const rectanglesCopy = _.cloneDeep(rectangles);

  Object.keys(rectanglesCopy).forEach(key => {
    correctXposition(rectanglesCopy[key]);
  });

  return {
    areaHeight,
    rectanglesCopy
  }
}

export default {
  calcAreaHeight,
  validWidthSum,
  correctXposition,
  updatePlayGroundOnResize
};
