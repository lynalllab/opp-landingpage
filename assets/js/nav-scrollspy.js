// Nav "Jump to a section" scroll-spy — highlights the About dropdown's
// section link (Overview / How it works / Partners) while its section is in
// view. Only the home page has these section ids, so this is inert elsewhere.
(function () {
  'use strict';
  window.initScrollSpy('.nav-menu ul[aria-labelledby="mh-jump"] a', {
    offset: 120,
    parentSelector: '.nav-menu-trigger'
  });
}());
