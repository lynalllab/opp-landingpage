// Sticky nav — reusable on every page via _includes/nav.html.
// On the home page it reveals once you scroll past the hero; on pages
// with no .hero (subpages) it's shown immediately.
(function () {
  'use strict';

  var nav = document.getElementById('site-nav');
  if (!nav) return;

  var hero = document.querySelector('.hero');
  if (!hero) {
    nav.classList.add('site-nav--visible');
  } else {
    var threshold = hero.offsetHeight * 0.65;
    var updateVisibility = function () {
      nav.classList.toggle('site-nav--visible', window.scrollY > threshold);
    };
    window.addEventListener('scroll', updateVisibility, { passive: true });
    updateVisibility();
  }

  // "About the project" dropdown menu. Opens on hover or click; the
  // click-outside listener is bound to the document, so a click
  // anywhere on the page outside the menu closes it.
  var menuItem = nav.querySelector('.has-menu');
  if (!menuItem) return;

  var trigger = menuItem.querySelector('.nav-menu-trigger');

  var setOpen = function (open) {
    menuItem.classList.toggle('is-open', open);
    trigger.setAttribute('aria-expanded', String(open));
  };

  // The dropdown sits a bit below the trigger (see the gap in the .nav-menu
  // top offset in _nav.scss), so the pointer briefly leaves menuItem while
  // crossing that gap. Closing on a delay — instead of immediately on
  // mouseleave — gives it time to land back inside before we close.
  var closeTimer = null;
  var cancelClose = function () {
    if (closeTimer) {
      clearTimeout(closeTimer);
      closeTimer = null;
    }
  };

  menuItem.addEventListener('mouseenter', function () {
    cancelClose();
    setOpen(true);
  });

  menuItem.addEventListener('mouseleave', function () {
    cancelClose();
    closeTimer = setTimeout(function () { setOpen(false); }, 200);
  });

  trigger.addEventListener('click', function () {
    cancelClose();
    setOpen(!menuItem.classList.contains('is-open'));
  });

  document.addEventListener('click', function (event) {
    if (!menuItem.contains(event.target)) {
      cancelClose();
      setOpen(false);
    }
  });

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
      cancelClose();
      setOpen(false);
    }
  });
}());
