/* jshint strict: true */

/**********************************************************************************
  smoothscroll.js

  file created in 2013/02/18 14:24:23.

  MIT License

  Copyright (c) 2013 iNo (http://www.serendip.ws/)

  Permission is hereby granted, free of charge, to any person obtaining
  a copy of this software and associated documentation files (the
  "Software"), to deal in the Software without restriction, including
  without limitation the rights to use, copy, modify, merge, publish,
  distribute, sublicense, and/or sell copies of the Software, and to
  permit persons to whom the Software is furnished to do so, subject to
  the following conditions:

  The above copyright notice and this permission notice shall be included
  in all copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
  OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
  MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
  IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
  CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
  TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
  SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *********************************************************************************/

var SERENDIP = SERENDIP || {};

SERENDIP.namespace = SERENDIP.namespace || function(ns_string) {
  'use strict';
  var parts = ns_string.split('.'),
      parent = SERENDIP;

  if (parts[0] === 'SERENDIP') {
    parts = parts.slice(1);
  }

  for (var i = 0; i < parts.length; i++) {
    if (typeof parent[parts[i]] === 'undefined') {
      parent[parts[i]] = {};
    }
    parent = parent[parts[i]];
  }
  return parent;
};

SERENDIP.namespace('SERENDIP.smoothscroll.opts');

SERENDIP.smoothscroll = (function() {
  'use strict';
  // easing function
  var easing = function(t, b, c, d) {
    return c * ((t = t / d - 1) * t * t + 1) + b; // easeOutCubic
  };
  // scroll speed
  var speed = 1000; // milli second

  var setEasing = function(fn) {
    if (typeof fn !== 'function') {
      throw '[Error] Argument must be a function.';
    }
    if (fn.length !== easing.length) {
      throw '[Error] easing function arguments must be ' + easing.length + '.';
    }
    easing = fn;
  };
  var setSpeed = function(s) {
    if (typeof s === 'number') {
      speed = s;
    } else {
      throw '[Error] Argument must be a number.';
    }
  };

  var getHash = function(uri) {
    var HASH_URI_RE = /\#([^#]+)$/;
    if (uri.match(HASH_URI_RE)) {
      var hash = RegExp.$1;
      if (hash.length > 0 && location.href.replace(HASH_URI_RE, '') === uri.replace(HASH_URI_RE, '')) {
        return document.getElementById(hash) ? hash : null;
      }
    }
    return null;
  };

  var scrollTo = function(from, to) {
    var INTERVAL = 16;
    var startTime = (new Date());
    var distance = to - from;

    var intervalId = setInterval(function() {
      var time = (new Date()) - startTime;
      var current = easing(time, from, distance, speed);

      if (time > speed) {
        clearInterval(intervalId);
        current = from + distance;
      }

      window.scrollTo(0, current);
    }, INTERVAL);
  };

  var scroll = function(anc, hash) {
    var to = document.getElementById(hash).offsetTop;
    var docH = document.documentElement.scrollHeight;
    var winH = window.innerHeight || document.documentElement.clientHeight;
    if (docH - winH < to) {
      to = docH - winH;
    }
    var from = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;

    scrollTo(from, to);
  };

  var addEvent = (function() {
    if (typeof window.addEventListener === 'function') { // modern browser
      return function(el, type, fn) {
        el.addEventListener(type, fn, false);
      };
    } else if (document.attachEvent) { // IE (not using typeof, because IE8 return 'object')
      return function(el, type, fn) {
        el.attachEvent('on' + type, function() {
          fn.apply(el, arguments);
        });
      };
    } else { // other
      return function(el, type, fn) {
        el['on' + type] = fn;
      };
    }
  })();

  var preventEvt = function(e) {
    if (!e) {
      return;
    }
    if (e.preventDefault) {
      e.preventDefault();
    } else {
      e.returnValue = false;
    }
  };

  var addAnchorEvent = function(ancs) {
    var fn = function(a, h) {
      return function(e) {
        preventEvt(e);
        scroll(a, h);
      };
    };
    for (var i = 0, len = ancs.length; i < len; i++) {
      var anc = ancs[i];
      var hash = getHash(anc.href);
      if (hash) {
        addEvent(anc, 'click', fn(anc, hash));
      }
    }
  };

  // initialize (set event listener)
  addEvent(window, 'load', function() {
    var ancs = document.getElementsByTagName('A');
    var mapAncs = document.getElementsByTagName('AREA');
    addAnchorEvent(ancs);
    addAnchorEvent(mapAncs);
  });

  // return public functions
  return {
    setEasing: setEasing,
    setSpeed:  setSpeed
  };
})();
