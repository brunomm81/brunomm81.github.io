/* main.js — Inicializações gerais e utilitários */
(function () {
  document.addEventListener('DOMContentLoaded', function () {

    /* Ano dinâmico no footer */
    const year = document.getElementById('year');
    if (year) year.textContent = new Date().getFullYear();

    /* Parallax leve no glow do hero */
    const glow = document.querySelector('.hero-glow');
    const glow2 = document.querySelector('.hero-glow-2');
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      window.addEventListener('scroll', function () {
        const y = window.scrollY;
        if (y < window.innerHeight) {
          if (glow)  glow.style.transform  = 'translateY(' + (y * 0.22) + 'px)';
          if (glow2) glow2.style.transform = 'translateY(' + (y * -0.15) + 'px)';
        }
      }, { passive: true });
    }

    /* Auto-flip da foto — alterna a cada 4 s; clique inverte manualmente */
    const flipCard = document.getElementById('photoFlip');
    if (flipCard) {
      let flipped = false;

      function doFlip(to) {
        flipped = to;
        flipCard.classList.toggle('flipped', flipped);
      }

      const timer = setInterval(function () { doFlip(!flipped); }, 4000);

      flipCard.addEventListener('click', function () {
        clearInterval(timer); /* para o auto após interação manual */
        doFlip(!flipped);
      });
    }

  });
})();
