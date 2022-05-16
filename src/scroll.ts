/** @prettier */

import scrollTo from './scrollTo';

const getScrollMarginTopRaw = (el: HTMLElement): number => {
  const top = parseInt(getComputedStyle(el).getPropertyValue('scroll-margin-top'), 10);
  if (isNaN(top)) {
    return 0;
  }
  return top;
};

export default (el: HTMLElement): void => {
  const dl = document.documentElement;
  const rect = el.getBoundingClientRect();
  const scrollMarginTop = getScrollMarginTopRaw(el);
  const docH = dl.scrollHeight;
  const winH = window.innerHeight || dl.clientHeight;
  const from = window.pageYOffset || dl.scrollTop || document.body.scrollTop || 0;
  let to = from + rect.top - scrollMarginTop;
  if (docH - winH < to) {
    to = docH - winH;
  }
  scrollTo(from, to);
};
