/** @prettier */

import scrollTo from './scrollTo';

export default (hash, el) => {
  const dl = document.documentElement;
  const rect = el.getBoundingClientRect();
  const docH = dl.scrollHeight;
  const winH = window.innerHeight || dl.clientHeight;
  const from =
    window.pageYOffset || dl.scrollTop || document.body.scrollTop || 0;
  let to = from + rect.top;
  if (docH - winH < to) {
    to = docH - winH;
  }
  scrollTo(from, to);
};
