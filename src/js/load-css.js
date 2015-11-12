'use strict';

function linkCSS() {

  var cssLinks = [
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.4.0/css/font-awesome.min.css',
    'https://fonts.googleapis.com/css?family=Raleway'
  ];

  cssLinks.forEach(function(src) {
    var el  = document.createElement('link');
    el.rel  = 'stylesheet';
    el.href = src;
    document.head.appendChild(el);
  });

}

module.exports = linkCSS;
