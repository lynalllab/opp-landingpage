// Info icon modals for the involvement_tasks cards in _includes/form.html.
// Each .form-task-info button sits inside a <label> wrapping the task's
// checkbox, so its click handler must preventDefault (else the label's
// default action toggles the checkbox) and stopPropagation before opening
// the matching .task-modal (see _sass/_task-modal.scss).
(function () {
  'use strict';

  var triggers = document.querySelectorAll('.form-task-info');
  if (!triggers.length) return;

  var openModal = null;
  var lastTrigger = null;

  function close() {
    if (!openModal) return;
    openModal.hidden = true;
    document.body.classList.remove('task-modal-open');
    if (lastTrigger) lastTrigger.focus();
    openModal = null;
    lastTrigger = null;
  }

  function open(modal, trigger) {
    if (openModal) close();
    openModal = modal;
    lastTrigger = trigger;
    modal.hidden = false;
    document.body.classList.add('task-modal-open');
    var closeBtn = modal.querySelector('.task-modal-close');
    if (closeBtn) closeBtn.focus();
  }

  triggers.forEach(function (trigger) {
    trigger.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      var modal = document.getElementById(trigger.getAttribute('data-modal-target'));
      if (modal) open(modal, trigger);
    });
  });

  document.querySelectorAll('.task-modal [data-modal-close]').forEach(function (el) {
    el.addEventListener('click', close);
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && openModal) close();
  });
}());
