const logger = require('./logger');

const arrayHelper = {
  zipArrays(...arrays) {
    if (!Array.isArray(arrays)) {
      logger.error('error zipping Arrays: Invalid argument/s', arrays);
      return [];
    }

    const firstArray = arrays[0];
    const zippedArrayLength = firstArray.length;
    if (!firstArray || !arrays.every(arr => arr.length === zippedArrayLength)) {
      logger.error('error zipping Arrays: All arrays should be of same length');
      return [];
    }

    const zippedArray = [];
    for (let i = 0; i < zippedArrayLength; i++) {
      const zippedElement = arrays.reduce((element, arr) => {
        element.push(arr[i]);
        return element;
      }, []);
      zippedArray.push(zippedElement);
    }
    return zippedArray;
  },
};

module.exports = arrayHelper;
