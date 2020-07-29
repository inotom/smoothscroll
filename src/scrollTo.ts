/** @prettier */

import { easeOutCubic } from './easing';

const INTERVAL = 16;
const SPEED = 1000;

let intervalId: number;

export default (from: number, to: number): void => {
  const startTime = new Date().getTime();
  const distance = to - from;

  if (distance === 0) {
    return;
  }

  intervalId = window.setInterval(() => {
    const time = new Date().getTime() - startTime;
    let current = easeOutCubic(time, from, distance, SPEED);

    if (time > SPEED) {
      window.clearInterval(intervalId);
      current = from + distance;
    }

    window.scrollTo(0, current);
  }, INTERVAL);
};
