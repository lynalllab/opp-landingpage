// Register-interest modal. Triggers (.js-register-open) are real
// <a href="qualtrics-url" target="_blank"> links in the markup — the
// no-JS baseline is a plain outbound link. This script intercepts the
// click (preventDefault) and opens the modal instead; see
// _includes/register-modal.html for the "No-JS" note.
(function () {
  'use strict';
  var modal = document.querySelector('.register-modal');
  if (!modal) return;
  var panel  = modal.querySelector('.register-modal-panel');
  var frame  = modal.querySelector('iframe');
  var load   = modal.querySelector('.register-modal-loading');
  var closer = modal.querySelector('.register-modal-close');
  var opener = null;
  var SRC    = frame.getAttribute('data-src');

  function focusables() {
    return Array.prototype.slice.call(panel.querySelectorAll('button, a[href], iframe'))
      .filter(function (el) { return el.offsetParent !== null || el.tagName === 'IFRAME'; });
  }

  function focusIn() {
    if (panel.contains(document.activeElement)) return;
    var items = focusables();
    (items[0] || panel).focus({ preventScroll: true });
  }

  function open(from) {
    opener = from;
    modal.hidden = false;
    document.body.style.overflow = 'hidden';
    if (!frame.src) frame.src = SRC;              // once only
    requestAnimationFrame(focusIn);
  }

  function close() {
    modal.hidden = true;
    document.body.style.overflow = '';
    if (opener && opener.focus) opener.focus({ preventScroll: true });
  }

  document.querySelectorAll('.js-register-open').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      open(btn);
    });
  });
  closer.addEventListener('click', close);
  modal.addEventListener('click', function (e) { if (e.target === modal) close(); });
  frame.addEventListener('load', function () {
    load.hidden = true;
    focusIn();                                     // see note below
  });

  document.addEventListener('keydown', function (e) {
    if (modal.hidden) return;
    if (e.key === 'Escape') { close(); return; }
    if (e.key !== 'Tab') return;
    var items = focusables();
    if (!items.length) return;
    if (!panel.contains(document.activeElement)) { e.preventDefault(); items[0].focus(); return; }
    var first = items[0], last = items[items.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  });
}());
