/** @prettier */

import getHash from './getHash';
import scroll from './scroll';

export const smoothScroll = () => {
  const elAnchors = document.querySelectorAll('A,AREA');

  let isScrolling = false;

  Array.from(elAnchors, el => {
    const hash = getHash(el.href);
    if (hash) {
      el.addEventListener('click', e => {
        e.preventDefault();
        const elTarget = document.getElementById(hash);
        if (!isScrolling) {
          scroll(hash, elTarget);
        }
      });
    }
  });

  let timeoutID;

  window.addEventListener('scroll', () => {
    isScrolling = true;

    if (timeoutID) {
      clearTimeout(timeoutID);
    }

    timeoutID = setTimeout(() => {
      isScrolling = false;
    }, 500);
  });
};
