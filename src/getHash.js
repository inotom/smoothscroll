/** @prettier */

const HASH_URI_RE = /#([^#]+)$/;

export default uri => {
  if (uri.match(HASH_URI_RE)) {
    const hash = window.RegExp.$1;
    if (
      hash.length > 0 &&
      location.href.replace(HASH_URI_RE, '') === uri.replace(HASH_URI_RE, '')
    ) {
      return document.getElementById(hash) ? hash : null;
    }
  }
  return null;
};
