// Animated stat counters — reusable on any page. Counts up any
// .stat-number[data-target] element as it enters the viewport.
(function () {
  'use strict';

  var statEls = document.querySelectorAll('.stat-number[data-target]');
  if (!statEls.length || !('IntersectionObserver' in window)) return;

  var counterObs = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      var el       = entry.target;
      var target   = parseFloat(el.getAttribute('data-target'));
      var decimals = parseInt(el.getAttribute('data-decimal') || '0', 10);
      var duration = 1600;
      var startTime = null;

      function tick(ts) {
        if (!startTime) startTime = ts;
        var p       = Math.min((ts - startTime) / duration, 1);
        var eased   = 1 - Math.pow(1 - p, 3);
        var val     = eased * target;
        el.textContent = decimals ? val.toFixed(decimals) : Math.floor(val);
        if (p < 1) requestAnimationFrame(tick);
        else el.textContent = decimals ? target.toFixed(decimals) : target;
      }

      requestAnimationFrame(tick);
      counterObs.unobserve(el);
    });
  }, { threshold: 0.5 });

  statEls.forEach(function (el) { counterObs.observe(el); });

}());
