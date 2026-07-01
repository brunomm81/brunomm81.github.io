/* nav.js — Navbar: scroll state, menu mobile, link ativo, barra de progresso */
(function () {
  document.addEventListener('DOMContentLoaded', function () {
    const navbar = document.getElementById('navbar');
    const links = document.getElementById('navLinks');
    const burger = document.getElementById('hamburger');
    const progress = document.getElementById('scrollProgress');
    const anchors = links ? Array.from(links.querySelectorAll('a')) : [];

    // --- Scroll: navbar solidificada + barra de progresso ---
    function onScroll() {
      const y = window.scrollY;
      navbar.classList.toggle('scrolled', y > 40);
      const h = document.documentElement.scrollHeight - window.innerHeight;
      if (progress) progress.style.width = (h > 0 ? (y / h) * 100 : 0) + '%';
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    // --- Menu mobile ---
    function closeMenu() {
      links.classList.remove('open');
      burger.classList.remove('open');
      burger.setAttribute('aria-expanded', 'false');
    }
    if (burger) {
      burger.addEventListener('click', function () {
        const open = links.classList.toggle('open');
        burger.classList.toggle('open', open);
        burger.setAttribute('aria-expanded', String(open));
      });
    }
    anchors.forEach(a => a.addEventListener('click', closeMenu));
    document.addEventListener('click', function (e) {
      if (links.classList.contains('open') && !links.contains(e.target) && !burger.contains(e.target)) closeMenu();
    });

    // --- Link ativo via IntersectionObserver ---
    const sections = anchors
      .map(a => document.querySelector(a.getAttribute('href')))
      .filter(Boolean);
    const spy = new IntersectionObserver(function (entries) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = '#' + entry.target.id;
          anchors.forEach(a => a.classList.toggle('active', a.getAttribute('href') === id));
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    sections.forEach(s => spy.observe(s));
  });
})();
