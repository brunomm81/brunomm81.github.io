/* hero-canvas.js — Rede de partículas sutil no fundo do hero (canvas) */
(function () {
  document.addEventListener('DOMContentLoaded', function () {
    const canvas = document.getElementById('heroCanvas');
    if (!canvas) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = canvas.getContext('2d');
    const hero = canvas.parentElement;
    let w, h, dpr, particles, mouse = { x: -999, y: -999 };

    function color() {
      // usa o azul da marca; adapta opacidade
      return getComputedStyle(document.documentElement).getPropertyValue('--accent').trim() || '#4a80bf';
    }

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = hero.clientWidth; h = hero.clientHeight;
      canvas.width = w * dpr; canvas.height = h * dpr;
      canvas.style.width = w + 'px'; canvas.style.height = h + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      initParticles();
    }

    function initParticles() {
      const count = Math.min(Math.floor((w * h) / 16000), 70);
      particles = [];
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * w, y: Math.random() * h,
          vx: (Math.random() - .5) * .35, vy: (Math.random() - .5) * .35,
          r: Math.random() * 1.6 + .6
        });
      }
    }

    function step() {
      ctx.clearRect(0, 0, w, h);
      const c = color();
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;

        // conexões
        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j];
          const dx = p.x - q.x, dy = p.y - q.y;
          const d = Math.hypot(dx, dy);
          if (d < 120) {
            ctx.globalAlpha = (1 - d / 120) * .18;
            ctx.strokeStyle = c; ctx.lineWidth = 1;
            ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); ctx.stroke();
          }
        }
        // interação com o mouse
        const mdx = p.x - mouse.x, mdy = p.y - mouse.y;
        const md = Math.hypot(mdx, mdy);
        if (md < 140) {
          ctx.globalAlpha = (1 - md / 140) * .35;
          ctx.strokeStyle = c; ctx.lineWidth = 1;
          ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(mouse.x, mouse.y); ctx.stroke();
        }

        ctx.globalAlpha = .5;
        ctx.fillStyle = c;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
      }
      ctx.globalAlpha = 1;
      requestAnimationFrame(step);
    }

    hero.addEventListener('mousemove', e => {
      const rect = hero.getBoundingClientRect();
      mouse.x = e.clientX - rect.left; mouse.y = e.clientY - rect.top;
    });
    hero.addEventListener('mouseleave', () => { mouse.x = -999; mouse.y = -999; });

    window.addEventListener('resize', resize);
    resize();
    step();
  });
})();
