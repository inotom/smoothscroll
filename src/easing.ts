/** @prettier */

/**
 * easeOutCubic.
 *
 * @param {number} progress (start:0 ~ end:1).
 * @returns {number}
 */
export const easeOutCubic = (progress: number): number => {
  return 1 - Math.pow(1 - progress, 3);
};
