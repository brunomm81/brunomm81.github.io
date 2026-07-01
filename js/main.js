/* main.js — Inicializações gerais e pequenos utilitários */
(function () {
  document.addEventListener('DOMContentLoaded', function () {
    // Ano dinâmico no footer
    const year = document.getElementById('year');
    if (year) year.textContent = new Date().getFullYear();

    // Parallax leve no glow do hero
    const glow = document.querySelector('.hero-glow');
    if (glow && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      window.addEventListener('scroll', function () {
        const y = window.scrollY;
        if (y < window.innerHeight) glow.style.transform = 'translateY(' + y * 0.25 + 'px)';
      }, { passive: true });
    }

    // Tilt 3D suave na foto do hero
    const frame = document.querySelector('.photo-frame');
    const photoWrap = document.querySelector('.hero-photo');
    if (frame && photoWrap && window.matchMedia('(hover: hover)').matches) {
      photoWrap.addEventListener('mousemove', function (e) {
        const r = frame.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - .5;
        const py = (e.clientY - r.top) / r.height - .5;
        frame.style.transform = 'perspective(800px) rotateY(' + (px * 8) + 'deg) rotateX(' + (-py * 8) + 'deg)';
      });
      photoWrap.addEventListener('mouseleave', function () {
        frame.style.transform = '';
      });
    }
  });
})();
