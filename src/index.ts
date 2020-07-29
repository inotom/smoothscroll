/** @prettier */

import getHash from './getHash';
import scroll from './scroll';

export const smoothScroll = (): void => {
  const elAnchors: NodeListOf<HTMLAnchorElement | HTMLAreaElement> = document.querySelectorAll(
    'A,AREA'
  );

  let isScrolling = false;

  Array.prototype.slice.call(elAnchors, 0).forEach((el) => {
    const hash = getHash(el.href);
    if (hash) {
      el.addEventListener('click', (e: MouseEvent) => {
        e.preventDefault();
        const elTarget = document.getElementById(hash);
        if (!isScrolling && elTarget) {
          scroll(hash, elTarget);
        }
      });
    }
  });

  let timeoutID: number;

  window.addEventListener('scroll', () => {
    isScrolling = true;

    if (timeoutID) {
      window.clearTimeout(timeoutID);
    }

    timeoutID = window.setTimeout(() => {
      isScrolling = false;
    }, 500);
  });
};
