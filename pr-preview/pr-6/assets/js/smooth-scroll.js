// Smooth scroll polyfill — reusable on any page for browsers without
// native CSS `scroll-behavior: smooth` support.
(function () {
  'use strict';

  if ('scrollBehavior' in document.documentElement.style) return;

  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var target = document.querySelector(this.getAttribute('href'));
      if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth' }); }
    });
  });

}());
