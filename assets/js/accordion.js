// Accordion — reusable on any page. Wires up every .findout-item's
// .findout-item-trigger button to toggle the .is-open class (animated
// via the .findout-item-panel grid-rows transition in _accordion.scss).
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

}());
