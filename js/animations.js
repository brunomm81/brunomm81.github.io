/* animations.js — Scroll reveal com stagger via IntersectionObserver */
(function () {
  document.addEventListener('DOMContentLoaded', function () {
    const items = Array.from(document.querySelectorAll('.reveal'));
    if (!('IntersectionObserver' in window) || !items.length) {
      items.forEach(el => el.classList.add('visible'));
      return;
    }

    const io = new IntersectionObserver(function (entries, obs) {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        // stagger: irmãos revelam em sequência
        const siblings = Array.from(el.parentElement.children).filter(c => c.classList.contains('reveal'));
        const idx = siblings.indexOf(el);
        el.style.transitionDelay = Math.min(idx * 90, 450) + 'ms';
        el.classList.add('visible');
        obs.unobserve(el);
      });
    }, { threshold: 0.14, rootMargin: '0px 0px -8% 0px' });

    items.forEach(el => io.observe(el));
  });
})();
