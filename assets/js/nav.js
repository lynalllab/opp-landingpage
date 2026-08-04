// Sticky nav — reusable on every page via _includes/nav.html.
// On the home page it reveals once you scroll past the hero; on pages
// with no .hero (subpages) it's shown immediately.
(function () {
  'use strict';

  var nav  = document.getElementById('site-nav');
  var hero = document.querySelector('.hero');
  if (!nav) return;

  if (hero) {
    window.addEventListener('scroll', function () {
      nav.classList.toggle('site-nav--visible', window.scrollY > hero.offsetHeight * 0.65);
    }, { passive: true });
  } else {
    nav.classList.add('site-nav--visible');
  }

}());
