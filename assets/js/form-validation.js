// Progressive-enhancement validation for the Register Interest form.
// Baseline: native `required` / `type="email"` constraints work with no JS at all.
// Enhancement: once this runs, we take over the UI (novalidate) and render the
// same native Constraint Validation API results as inline, accessible messages
// instead of the browser's default validation bubbles.
(function () {
  var form = document.querySelector('.contact-form');
  if (!form) return;

  form.setAttribute('novalidate', 'novalidate');

  var submitError = form.querySelector('.form-submit-error');
  var requiredFields = Array.prototype.slice.call(form.querySelectorAll('[required]'));

  function messageFor(field) {
    var validity = field.validity;
    if (validity.valid) return '';
    if (validity.valueMissing) {
      return field.type === 'checkbox' ? 'Please check this box to continue.' : 'This field is required.';
    }
    if (validity.typeMismatch) {
      return field.type === 'email' ? 'Please enter a valid email address.' : 'Please enter a valid value.';
    }
    return field.validationMessage;
  }

  function fieldWrapper(field) {
    return field.closest('.form-field');
  }

  function errorElFor(field) {
    return document.getElementById(field.id + '-error');
  }

  function validateField(field) {
    var message = messageFor(field);
    var errorEl = errorElFor(field);
    if (errorEl) errorEl.textContent = message;
    field.setAttribute('aria-invalid', message ? 'true' : 'false');
    var wrapper = fieldWrapper(field);
    if (wrapper) wrapper.classList.toggle('has-error', Boolean(message));
    return !message;
  }

  requiredFields.forEach(function (field) {
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

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    var firstInvalid = null;
    var allValid = true;
    requiredFields.forEach(function (field) {
      var valid = validateField(field);
      if (!valid) {
        allValid = false;
        if (!firstInvalid) firstInvalid = field;
      }
    });

    if (!allValid) {
      if (submitError) submitError.textContent = 'Please fix the highlighted fields below.';
      if (firstInvalid) firstInvalid.focus();
      return;
    }

    if (submitError) submitError.textContent = '';
    form.submit();
  });
})();
