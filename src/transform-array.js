const { NotImplementedError } = require('../extensions/index.js');

/**
 * Create transformed array based on the control sequences that original
 * array contains
 * 
 * @param {Array} arr initial array
 * @returns {Array} transformed array
 * 
 * @example
 * 
 * transform([1, 2, 3, '--double-next', 4, 5]) => [1, 2, 3, 4, 4, 5]
 * transform([1, 2, 3, '--discard-prev', 4, 5]) => [1, 2, 4, 5]
 * 
 */

function transform(arr) {
  if (!Array.isArray(arr)) throw new Error("'arr' parameter must be an instance of the Array!");

  const transformed = [];
  const controlSequences = ["--discard-next", "--discard-prev", "--double-next", "--double-prev"];

  for (let i = 0; i < arr.length; i++) {
    const current = arr[i];

    if (current === controlSequences[0]) {
      if (i < arr.length - 1) {
        i++;
      }
    } else if (current === controlSequences[1]) {
      if (i > 0 && arr[i - 2] !== controlSequences[0]) {
        transformed.pop();
      }
    } else if (current === controlSequences[2]) {
      if (i < arr.length - 1) {
        transformed.push(arr[i + 1]);
      }
    } else if (current === controlSequences[3]) {
      if (i > 0 && arr[i - 2] !== controlSequences[0]) {
        transformed.push(arr[i - 1]);
      }
    } else {
      transformed.push(current);
    }
  }

  return transformed;
}

module.exports = {
  transform
};
