// Sticky nav — reusable on every page via _includes/nav.html.
// On subpages it's the fixed white bar. On the home page it starts as a
// transparent, absolutely-positioned bar that scrolls away with the hero
// (.site-nav--over-hero, set server-side in nav.html so there is no
// flash before this runs); once the hero has left the viewport it
// becomes the fixed white bar and drops in (.site-nav--stuck).
(function () {
  'use strict';

  var nav = document.getElementById('site-nav');
  if (!nav) return;

  var hero = document.querySelector('.hero');
  if (!hero) {
    nav.classList.remove('site-nav--over-hero');
  } else {
    var updateState = function () {
      var threshold = hero.offsetHeight - nav.offsetHeight;
      var overHero = window.scrollY < threshold;
      nav.classList.toggle('site-nav--over-hero', overHero);
      nav.classList.toggle('site-nav--stuck', !overHero);
    };
    window.addEventListener('scroll', updateState, { passive: true });
    window.addEventListener('resize', updateState);
    updateState();
  }

  // Mobile hamburger toggle — shows/hides .nav-panel below the 900px
  // breakpoint (see _responsive.scss). Closes on outside click, Escape,
  // link click, or resizing back past the breakpoint.
  var navToggle = nav.querySelector('.nav-toggle');
  var navPanel = nav.querySelector('.nav-panel');
  if (navToggle && navPanel) {
    var setMenuOpen = function (open) {
      nav.classList.toggle('site-nav--menu-open', open);
      navToggle.setAttribute('aria-expanded', String(open));
    };

    navToggle.addEventListener('click', function () {
      setMenuOpen(!nav.classList.contains('site-nav--menu-open'));
    });

    navPanel.addEventListener('click', function (event) {
      if (event.target.tagName === 'A') {
        setMenuOpen(false);
      }
    });

    document.addEventListener('click', function (event) {
      if (!nav.contains(event.target)) {
        setMenuOpen(false);
      }
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') {
        setMenuOpen(false);
      }
    });

    window.addEventListener('resize', function () {
      if (window.innerWidth > 900) {
        setMenuOpen(false);
      }
    });
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
