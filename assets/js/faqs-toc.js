// FAQs page — sticky index scroll-spy + deep-link open behaviour.
// Inert on every other page (guarded by the .faqs-toc check below).
(function () {
  'use strict';

  var toc = document.querySelector('.faqs-toc');
  if (!toc) return;

  window.initScrollSpy('.faqs-toc a[href^="#"]', { offset: 96 });

  // Deep link to a specific question, e.g. /faqs/#faq-what-would-i-do
  var hash = window.location.hash.slice(1);
  if (hash && typeof window.openAccordionItemById === 'function') {
    var item = window.openAccordionItemById(hash);
    if (item) {
      window.requestAnimationFrame(function () {
        item.scrollIntoView({ block: 'start' });
      });
    }
  }

}());
