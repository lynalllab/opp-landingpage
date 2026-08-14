// Progressive-enhancement validation for the Register Interest form.
// Baseline: native `required` / `type="email"` constraints work with no JS at all
// (checkbox groups fall back to every box being individually optional, and word
// caps aren't enforced, but the form still submits to Formspree).
// Enhancement: once this runs, we take over the UI (novalidate) and render
// validation results as inline, accessible messages for three kinds of rules:
//   1. Native constraints (required / type) via the Constraint Validation API.
//   2. "Select at least one" checkbox groups (<fieldset data-require-one>),
//      which HTML has no native support for.
//   3. 200-word caps on free-text fields (<textarea data-max-words>), enforced
//      via setCustomValidity so they flow through the same messageFor() path.
(function () {
  var form = document.querySelector('.contact-form');
  if (!form) return;

  form.setAttribute('novalidate', 'novalidate');

  var submitError = form.querySelector('.form-submit-error');

  function fieldWrapper(field) {
    return field.closest('.form-field') || field.closest('fieldset');
  }

  function errorElFor(id) {
    return document.getElementById(id + '-error');
  }

  function messageFor(field) {
    var validity = field.validity;
    if (validity.valid) return '';
    if (validity.customError) return field.validationMessage;
    if (validity.valueMissing) {
      return field.type === 'checkbox' ? 'Please check this box to continue.' : 'This field is required.';
    }
    if (validity.typeMismatch) {
      return field.type === 'email' ? 'Please enter a valid email address.' : 'Please enter a valid value.';
    }
    return field.validationMessage;
  }

  function validateField(field) {
    var message = messageFor(field);
    var errorEl = errorElFor(field.id);
    if (errorEl) errorEl.textContent = message;
    field.setAttribute('aria-invalid', message ? 'true' : 'false');
    var wrapper = fieldWrapper(field);
    if (wrapper) wrapper.classList.toggle('has-error', Boolean(message));
    return !message;
  }

  // ---- 200-word caps on free-text fields ----
  var wordLimitFields = Array.prototype.slice.call(form.querySelectorAll('[data-max-words]'));

  function wordCount(value) {
    var trimmed = value.trim();
    return trimmed ? trimmed.split(/\s+/).length : 0;
  }

  function checkWordLimit(field) {
    var max = parseInt(field.getAttribute('data-max-words'), 10);
    var count = wordCount(field.value);
    var counterEl = document.getElementById(field.id + '-count');
    var isOver = count > max;
    if (counterEl) {
      counterEl.textContent = count + ' / ' + max + ' words';
      counterEl.classList.toggle('is-over', isOver);
    }
    field.setCustomValidity(isOver ? 'Please keep this under ' + max + ' words (currently ' + count + ').' : '');
  }

  wordLimitFields.forEach(function (field) {
    checkWordLimit(field);
    field.addEventListener('input', function () {
      checkWordLimit(field);
      if (fieldWrapper(field) && fieldWrapper(field).classList.contains('has-error')) {
        validateField(field);
      }
    });
  });

  // ---- Native required fields (text / email / select / textarea / radio) ----
  var requiredFields = Array.prototype.slice.call(form.querySelectorAll('[required]'));
  // Fields with a word cap but no `required` attribute still need blur/submit checks.
  var validatableFields = requiredFields.concat(wordLimitFields.filter(function (field) {
    return requiredFields.indexOf(field) === -1;
  }));

  validatableFields.forEach(function (field) {
    field.addEventListener('blur', function () {
      validateField(field);
    });
    field.addEventListener('input', function () {
      if (fieldWrapper(field) && fieldWrapper(field).classList.contains('has-error')) {
        validateField(field);
      }
    });
    field.addEventListener('change', function () {
      if (fieldWrapper(field) && fieldWrapper(field).classList.contains('has-error')) {
        validateField(field);
      }
    });
  });

  // ---- "Select at least one" groups (checkbox groups + required radio groups) ----
  // Radio groups can't reuse the native `required` attribute here because these
  // radios have no `id`, which validateField()/errorElFor() rely on to find and
  // render an error message. A shared [data-require-one] contract on the
  // <fieldset> covers both input types with one code path instead.
  var requireOneGroups = Array.prototype.slice.call(form.querySelectorAll('fieldset[data-require-one]'));

  function validateRequireOneGroup(fieldset) {
    var inputs = Array.prototype.slice.call(fieldset.querySelectorAll('input[type="checkbox"], input[type="radio"]'));
    var anyChecked = inputs.some(function (input) { return input.checked; });
    var message = anyChecked ? '' : 'Please select at least one option.';
    var errorEl = errorElFor(fieldset.id);
    if (errorEl) errorEl.textContent = message;
    fieldset.classList.toggle('has-error', Boolean(message));
    return !message;
  }

  requireOneGroups.forEach(function (fieldset) {
    var inputs = fieldset.querySelectorAll('input[type="checkbox"], input[type="radio"]');
    Array.prototype.forEach.call(inputs, function (input) {
      input.addEventListener('change', function () {
        if (fieldset.classList.contains('has-error')) validateRequireOneGroup(fieldset);
      });
    });
  });

  // ---- per-step validation, used by form-wizard.js's Continue button ----
  window.OPPValidateStep = function (step) {
    var ok = true;
    Array.prototype.forEach.call(step.querySelectorAll('input, select, textarea'), function (field) {
      if (validatableFields.indexOf(field) === -1) return;
      if (!validateField(field)) ok = false;
    });
    Array.prototype.forEach.call(step.querySelectorAll('fieldset[data-require-one]'), function (fieldset) {
      if (!validateRequireOneGroup(fieldset)) ok = false;
    });
    if (!ok) {
      var firstError = step.querySelector('.form-error:not(:empty)');
      var control = firstError && (firstError.closest('.form-field, fieldset').querySelector('input, select, textarea'));
      if (control) control.focus({ preventScroll: true });
    }
    return ok;
  };

  // Silent counterpart to OPPValidateStep: same rules, but reads validity
  // without writing error messages/aria-invalid/has-error. Lets
  // form-wizard.js ask "is this step still valid right now?" on every
  // keystroke to keep the step rail's "done" state honest, without
  // flashing error UI on steps the user isn't actively working in.
  window.OPPStepIsValid = function (step) {
    var ok = true;
    Array.prototype.forEach.call(step.querySelectorAll('input, select, textarea'), function (field) {
      if (validatableFields.indexOf(field) === -1) return;
      if (!field.checkValidity()) ok = false;
    });
    Array.prototype.forEach.call(step.querySelectorAll('fieldset[data-require-one]'), function (fieldset) {
      var inputs = fieldset.querySelectorAll('input[type="checkbox"], input[type="radio"]');
      var anyChecked = Array.prototype.some.call(inputs, function (input) { return input.checked; });
      if (!anyChecked) ok = false;
    });
    return ok;
  };

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    var firstInvalid = null;
    var allValid = true;

    validatableFields.forEach(function (field) {
      var valid = validateField(field);
      if (!valid) {
        allValid = false;
        if (!firstInvalid) firstInvalid = field;
      }
    });

    requireOneGroups.forEach(function (fieldset) {
      var valid = validateRequireOneGroup(fieldset);
      if (!valid) {
        allValid = false;
        if (!firstInvalid) firstInvalid = fieldset.querySelector('input[type="checkbox"], input[type="radio"]');
      }
    });

    if (!allValid) {
      if (submitError) submitError.textContent = 'Please fix the highlighted fields below.';
      if (firstInvalid) {
        if (window.OPPGoToStep) window.OPPGoToStep(firstInvalid);
        firstInvalid.focus();
      }
      return;
    }

    if (submitError) submitError.textContent = '';
    form.submit();
  });
})();
