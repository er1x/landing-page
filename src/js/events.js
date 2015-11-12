'use strict';

function initializeEvents() {
  var header  = document.getElementsByClassName('header')[0];
  var btn     = document.getElementsByClassName('header-btn')[0];
  var navList = document.getElementsByClassName('header-navbar-list')[0];

  btn.addEventListener('click', function(e) {
    navList.classList.toggle('header-navbar-list--show');
  });

  window.addEventListener('scroll', function(e) {
    if(window.scrollY >= 200) {
      header.classList.add('header--light');
    } else {
      header.classList.remove('header--light');
    }
  });
}

module.exports = initializeEvents;
