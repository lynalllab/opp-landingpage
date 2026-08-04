// Accordion — reusable on any page. Wires up every .findout-item's
// .findout-item-trigger button to toggle the .is-open class (animated
// via the .findout-item-panel grid-rows transition in _accordion.scss).
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

}());
