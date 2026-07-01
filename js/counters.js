/* counters.js — Contadores animados quando entram na viewport */
(function () {
  document.addEventListener('DOMContentLoaded', function () {
    const nums = Array.from(document.querySelectorAll('.stat-num'));
    if (!nums.length) return;

    function animate(el) {
      const target = parseInt(el.dataset.target, 10) || 0;
      const suffix = el.dataset.suffix || '';
      const dur = 1600;
      const start = performance.now();
      function tick(now) {
        const p = Math.min((now - start) / dur, 1);
        const eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
        el.textContent = Math.round(eased * target) + suffix;
        if (p < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
    }

    const io = new IntersectionObserver(function (entries, obs) {
      entries.forEach(entry => {
        if (entry.isIntersecting) { animate(entry.target); obs.unobserve(entry.target); }
      });
    }, { threshold: 0.6 });

    nums.forEach(n => io.observe(n));
  });
})();
