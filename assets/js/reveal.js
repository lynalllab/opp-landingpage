// Scroll reveal — reusable on any page. Fades/slides in any element
// carrying the .reveal class as it enters the viewport.
(function () {
  'use strict';

  var reveals = document.querySelectorAll('.reveal');
  if (!reveals.length) return;

  if ('IntersectionObserver' in window) {
    var revealObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          revealObs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

    reveals.forEach(function (el) { revealObs.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('revealed'); });
  }

}());

// Timeline section — one-shot entry animation, separate from .reveal
// (drives a paused CSS animation rather than toggling a class; see
// _sass/_timeline.scss for why).
(function () {
  'use strict';
  var section = document.querySelector('.timeline');
  if (!section || !('IntersectionObserver' in window)) return;

  var obs = new IntersectionObserver(function (entries) {
    if (!entries.some(function (e) { return e.isIntersecting; })) return;
    section.querySelectorAll('[data-anim]').forEach(function (el) {
      el.style.animationPlayState = 'running';
    });
    obs.disconnect();
  }, { rootMargin: '0px 0px -18% 0px', threshold: 0 });

  obs.observe(section);
}());
