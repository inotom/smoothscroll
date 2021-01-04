/** @prettier */

/**
 * Check if it is in the middle of the target position.
 *
 * @param {number} from Starting position.
 * @param {number} to Target posision.
 * @param {number} position Current position.
 * @returns {boolean}
 */
export default (from: number, to: number, position: number): boolean => {
  // Scrolling to up.
  if (to - from < 0) {
    return to < position;
  }

  // Scrolling to down.
  return to > position;
};
