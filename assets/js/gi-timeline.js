// Get-involved page — one-shot entry animation for the task timeline.
// Every [data-anim] element inside #gi-tasks has a CSS animation that
// starts paused (see _get-involved.scss); this sets it running once the
// section scrolls into view. Inert on every other page.
//
// Two safety nets, both required:
//  - if the observer has not fired 4s after load, run anyway — never
//    leave the rows at opacity 0;
//  - no IntersectionObserver → run immediately (head.html also adds
//    html.no-io, which shows the elements plainly in CSS).
(function () {
  'use strict';

  var section = document.getElementById('gi-tasks');
  if (!section) return;
  var items = section.querySelectorAll('[data-anim]');
  if (!items.length) return;

  var done = false;
  function run() {
    if (done) return;
    done = true;
    items.forEach(function (el) { el.style.animationPlayState = 'running'; });
  }

  if ('IntersectionObserver' in window) {
    var obs = new IntersectionObserver(function (entries) {
      if (!entries.some(function (e) { return e.isIntersecting; })) return;
      run();
      obs.disconnect();
    }, { rootMargin: '0px 0px -18% 0px', threshold: 0 });
    obs.observe(section);
  } else {
    run();
  }

  window.setTimeout(run, 4000);
}());
