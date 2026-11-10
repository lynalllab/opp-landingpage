// Shared scroll-spy: highlights the link (from linkSelector) whose target
// section is the last one to have scrolled past `offset` from the top of
// the viewport. Used by nav-scrollspy.js, findout-toc.js, and faqs-toc.js —
// each just points it at its own link selector. No-ops if nothing matches.
window.initScrollSpy = function (linkSelector, options) {
  'use strict';
  var opts = options || {};
  var offset = opts.offset != null ? opts.offset : 120;
  var parent = opts.parentSelector ? document.querySelector(opts.parentSelector) : null;

  var links = document.querySelectorAll(linkSelector);
  if (!links.length) return;

  var entries = [];
  links.forEach(function (link) {
    var id = link.getAttribute('href').split('#')[1];
    var section = id && document.getElementById(id);
    if (section) entries.push({ id: id, link: link, section: section });
  });
  if (!entries.length) return;

  var current = null, ticking = false;

  function update() {
    ticking = false;
    var active = opts.fallbackFirst ? entries[0].id : null;
    entries.forEach(function (entry) {
      if (entry.section.getBoundingClientRect().top - offset <= 0) active = entry.id;
    });
    if (active === current) return;
    if (parent) parent.classList.toggle('is-active', !!active);
    entries.forEach(function (entry) {
      if (entry.id === current) {
        entry.link.classList.remove('is-active');
        entry.link.removeAttribute('aria-current');
      }
      if (entry.id === active) {
        entry.link.classList.add('is-active');
        entry.link.setAttribute('aria-current', 'true');
      }
    });
    current = active;
  }

  window.addEventListener('scroll', function () {
    if (!ticking) { ticking = true; requestAnimationFrame(update); }
  }, { passive: true });
  window.addEventListener('resize', update);
  update();
};
