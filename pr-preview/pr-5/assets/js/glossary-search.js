// Glossary page — live filter across term + definition text, keeps the
// letter rail honest as groups empty out. Inert on every other page.
// No debounce: ~20 entries, filtering is instant.
(function () {
  'use strict';
  var input  = document.querySelector('.glossary-search input');
  var terms  = Array.prototype.slice.call(document.querySelectorAll('.glossary-term'));
  var groups = Array.prototype.slice.call(document.querySelectorAll('.glossary-group'));
  var count  = document.querySelector('.glossary-count');
  var empty  = document.querySelector('.glossary-empty');
  if (!input || !terms.length) return;

  function railKey(letter) {
    return document.querySelector('.glossary-rail [href="#letter-' + letter + '"]');
  }

  function apply() {
    var q = input.value.trim().toLowerCase();
    var shown = 0;

    terms.forEach(function (el) {
      var hit = !q
        || el.dataset.term.indexOf(q) !== -1
        || el.dataset.definition.indexOf(q) !== -1;
      el.classList.toggle('is-hidden', !hit);
      if (hit) shown++;
    });

    groups.forEach(function (g) {
      var any = g.querySelector('.glossary-term:not(.is-hidden)');
      g.classList.toggle('is-hidden', !any);
      var key = railKey(g.id.replace('letter-', ''));
      if (key) key.style.opacity = any ? '' : '0.35';
    });

    count.hidden = !q || shown === 0;
    count.textContent = shown + (shown === 1 ? ' term matches ' : ' terms match ') + '“' + input.value.trim() + '”';
    empty.hidden = shown !== 0;
    if (!empty.hidden) empty.querySelector('.glossary-empty-q').textContent = input.value.trim();
  }

  input.addEventListener('input', apply);
  apply();
}());
