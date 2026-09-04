// Accordion — reusable on any page. Wires up every .findout-item's
// .findout-item-trigger button to toggle the .is-open class (animated
// via the .findout-item-panel max-height transition in _accordion.scss).
//
// Initial state comes from the markup (some pages, e.g. the
// accessibility statement, render items open by default) — this
// script only syncs aria-expanded to match on load, it never forces
// items closed.
//
// Also exposes window.openAccordionItemById(id) so other scripts
// (e.g. faqs-toc.js) can open a specific item for a deep link without
// duplicating the toggle logic.
(function () {
  'use strict';

  var items = document.querySelectorAll('.findout-item');
  items.forEach(function (item) {
    var trigger = item.querySelector('.findout-item-trigger');
    if (!trigger) return;
    trigger.setAttribute('aria-expanded', item.classList.contains('is-open'));
    trigger.addEventListener('click', function () {
      var isOpen = item.classList.toggle('is-open');
      trigger.setAttribute('aria-expanded', isOpen);
    });
  });

  window.openAccordionItemById = function (id) {
    var trigger = document.getElementById(id);
    if (!trigger) return null;
    var item = trigger.closest('.findout-item');
    if (!item) return null;
    item.classList.add('is-open');
    trigger.setAttribute('aria-expanded', 'true');
    return item;
  };

  // Expand-all / collapse-all — opt-in per accordion via a
  // .a11y-toggle-all button that immediately precedes a
  // [data-expand-label]/[data-collapse-label] .findout-accordion.
  // Hidden in the markup so nothing is inert without JS.
  document.querySelectorAll('.a11y-toggle-all').forEach(function (button) {
    var accordion = button.closest('.a11y-detail-head') ?
      button.closest('.a11y-detail-head').nextElementSibling :
      button.nextElementSibling;
    if (!accordion || !accordion.classList.contains('findout-accordion')) return;

    var accordionItems = accordion.querySelectorAll('.findout-item');
    var expandLabel = accordion.getAttribute('data-expand-label');
    var collapseLabel = accordion.getAttribute('data-collapse-label');

    button.hidden = false;

    button.addEventListener('click', function () {
      var allOpen = Array.prototype.every.call(accordionItems, function (item) {
        return item.classList.contains('is-open');
      });
      var nextState = !allOpen;

      accordionItems.forEach(function (item) {
        item.classList.toggle('is-open', nextState);
        var trigger = item.querySelector('.findout-item-trigger');
        if (trigger) trigger.setAttribute('aria-expanded', nextState);
      });

      button.textContent = nextState ? collapseLabel : expandLabel;
    });
  });

}());
