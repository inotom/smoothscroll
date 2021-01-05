/** @prettier */

import getHash from './getHash';
import scroll from './scroll';
import _scrollTo from './scrollTo';

export const scrollTo = _scrollTo;

export const smoothScroll = (): void => {
  const elAnchors: NodeListOf<HTMLAnchorElement | HTMLAreaElement> = document.querySelectorAll(
    'A,AREA'
  );

  Array.from(elAnchors, (el): void => {
    const hash = getHash(el.href);
    if (hash) {
      el.addEventListener('click', (e: Event) => {
        e.preventDefault();
        const elTarget = document.getElementById(hash);
        if (elTarget) {
          scroll(hash, elTarget);
        }
      });
    }
  });
};
