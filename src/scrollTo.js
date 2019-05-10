/** @prettier */

import { easeOutCubic } from './easing';

const INTERVAL = 16;
const SPEED = 1000;

let intervalId;

export default (from, to) => {
  const startTime = new Date();
  const distance = to - from;

  if (distance === 0) {
    return;
  }

  intervalId = setInterval(() => {
    const time = new Date() - startTime;
    let current = easeOutCubic(time, from, distance, SPEED);

    if (time > SPEED) {
      clearInterval(intervalId);
      current = from + distance;
    }

    window.scrollTo(0, current);
  }, INTERVAL);
};
