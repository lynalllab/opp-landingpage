// FAQs page — sticky index scroll-spy + deep-link open behaviour.
// Inert on every other page (guarded by the .faqs-toc check below).
(function () {
  'use strict';

  var toc = document.querySelector('.faqs-toc');
  if (!toc) return;

  var groups = document.querySelectorAll('.faqs-group[id]');
  var links = toc.querySelectorAll('a[href^="#"]');

  function setActive(id) {
    links.forEach(function (link) {
      var isMatch = link.getAttribute('href') === '#' + id;
      link.classList.toggle('is-active', isMatch);
    });
  }

  if (groups.length && links.length && 'IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) setActive(entry.target.id);
      });
    }, { rootMargin: '-6rem 0px -65% 0px' });

    groups.forEach(function (group) { observer.observe(group); });
  }

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
