'use strict';
(function(window, document) {

  function init () {
    require('./load-css')();
    require('./events')();
  }

  window.onload = init();
})(window, document);
