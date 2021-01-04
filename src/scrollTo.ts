/** @prettier */

import { easeOutCubic } from './easing';
import inProgress from './inProgress';

export default (from: number, to: number): void => {
  let position = 0;
  let progress = 0;

  const move = (): void => {
    progress++;
    position = (to - from) * easeOutCubic(progress / 100) + from;
    window.scrollTo(0, position);

    if (inProgress(from, to, position)) {
      requestAnimationFrame(move);
    }
  };

  requestAnimationFrame(move);
};
