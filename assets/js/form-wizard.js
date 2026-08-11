// Progressive enhancement for the Register Interest form: turns the four
// .form-step fieldsets in _includes/form.html into a stepped wizard with a
// progress rail, an optional "show all at once" view, and a localStorage
// draft so a refresh or mis-click doesn't lose typed answers.
// No-JS baseline: all four fieldsets stay visible/stacked and native
// `required` validates on submit — see the comment atop form.html.
(function () {
  'use strict';
  var form = document.querySelector('.contact-form');
  if (!form) return;
  var steps = Array.prototype.slice.call(form.querySelectorAll('.form-step'));
  if (steps.length < 2) return;                     // nothing to enhance

  var shell   = document.querySelector('.form-shell');
  var rail    = shell.querySelectorAll('.form-progress li');
  var preview = document.querySelectorAll('.register-preview li');
  var count   = shell.querySelector('.form-progress-count');
  var back    = form.querySelector('.form-back');
  var next    = form.querySelector('.btn--continue');
  var submit  = form.querySelector('.btn--submit');
  var saved   = form.querySelector('.form-save-note');
  var toggle  = document.querySelector('.form-view-toggle');
  var KEY      = 'opp-register-draft';
  var VIEW_KEY = 'opp-register-view';
  var current = 0, furthest = 0;

  function focusFirst(step) {
    var field = step.querySelector('input, select, textarea, button');
    if (field) field.focus({ preventScroll: true });
  }

  function show(i) {
    current = i;
    furthest = Math.max(furthest, i);
    steps.forEach(function (s, n) { s.hidden = n !== i; });
    rail.forEach(function (li, n) {
      li.classList.toggle('is-current', n === i);
      li.classList.toggle('is-done', n < furthest);
      li.querySelector('button').disabled = n > furthest;
    });
    preview.forEach(function (li, n) {
      li.classList.toggle('is-current', n === i);
      li.classList.toggle('is-done', n < i);
    });
    count.textContent = 'Step ' + (i + 1) + ' of ' + steps.length;
    back.hidden   = i === 0;
    next.hidden   = i === steps.length - 1;
    submit.hidden = i !== steps.length - 1;
    focusFirst(steps[i]);
  }

  // ---- draft persistence --------------------------------------------
  function save() {
    var data = {};
    new FormData(form).forEach(function (v, k) {
      if (data[k]) { data[k] = [].concat(data[k], v); } else { data[k] = v; }
    });
    try { localStorage.setItem(KEY, JSON.stringify(data)); } catch (e) {}
    saved.textContent = 'Your answers are saved as you go';
  }

  function restore() {
    var raw;
    try { raw = localStorage.getItem(KEY); } catch (e) { return; }
    if (!raw) return;
    var data;
    try { data = JSON.parse(raw); } catch (e) { return; }
    Object.keys(data).forEach(function (k) {
      var vals = [].concat(data[k]);
      form.querySelectorAll('[name="' + k + '"]').forEach(function (el) {
        if (el.type === 'checkbox' || el.type === 'radio') {
          el.checked = vals.indexOf(el.value) !== -1;
        } else {
          el.value = vals[0];
        }
      });
    });
  }

  form.addEventListener('input', save);
  form.addEventListener('change', save);
  form.addEventListener('submit', function () {
    try { localStorage.removeItem(KEY); } catch (e) {}
  });

  // Lets form-validation.js jump to whichever step holds a field that
  // failed validation on submit (native submit revalidates every step,
  // not just the one currently shown).
  window.OPPGoToStep = function (field) {
    var step = field.closest('.form-step');
    var i = steps.indexOf(step);
    if (i === -1) return;
    if (shell.classList.contains('is-expanded')) return;   // already all visible
    show(i);
  };

  next.addEventListener('click', function () {
    if (window.OPPValidateStep && !window.OPPValidateStep(steps[current])) return;
    show(current + 1);
  });
  back.addEventListener('click', function () { show(current - 1); });
  rail.forEach(function (li, n) {
    li.querySelector('button').addEventListener('click', function () {
      if (n <= furthest) show(n);
    });
  });

  // ---- "show all questions at once" ----------------------------------
  var TOGGLE_TEXT = {
    collapsed: 'Prefer one long page? <span class="form-view-toggle-label">Show all questions at once</span> — the same form, nothing hidden.',
    expanded: '<span class="form-view-toggle-label">Back to step-by-step</span> — one section at a time.'
  };

  function setExpanded(on) {
    shell.classList.toggle('is-expanded', on);
    toggle.setAttribute('aria-expanded', String(on));
    toggle.innerHTML = on ? TOGGLE_TEXT.expanded : TOGGLE_TEXT.collapsed;
    if (on) {
      furthest = steps.length - 1;             // they have now seen everything
    } else {
      show(current);                            // resume the step they were on
    }
    try { localStorage.setItem(VIEW_KEY, on ? 'all' : 'steps'); } catch (e) {}
  }

  if (toggle) {
    toggle.hidden = false;
    toggle.addEventListener('click', function () {
      setExpanded(!shell.classList.contains('is-expanded'));
    });
  }

  restore();
  show(0);
  if (toggle) {
    var storedView;
    try { storedView = localStorage.getItem(VIEW_KEY); } catch (e) {}
    setExpanded(storedView === 'all');
  }
}());
