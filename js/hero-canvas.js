/* hero-canvas.js — Rede de partículas com estrelas cadentes e efeito glow */
(function () {
  document.addEventListener('DOMContentLoaded', function () {
    const canvas = document.getElementById('heroCanvas');
    if (!canvas) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = canvas.getContext('2d');
    const hero = canvas.parentElement;
    let w, h, dpr, particles;
    let shootingStars = [], rings = [];
    let mouse = { x: -999, y: -999, active: false };
    let shootTimer = 0;

    function getAccentRgb() {
      const hex = (getComputedStyle(document.documentElement).getPropertyValue('--accent').trim() || '#4a80bf').replace('#', '');
      const r = parseInt(hex.slice(0, 2), 16);
      const g = parseInt(hex.slice(2, 4), 16);
      const b = parseInt(hex.slice(4, 6), 16);
      return { r, g, b };
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
      const count = Math.min(Math.floor((w * h) / 9000), 100);
      particles = [];
      for (let i = 0; i < count; i++) {
        particles.push(makeParticle());
      }
    }

    function makeParticle(x, y) {
      return {
        x: x != null ? x : Math.random() * w,
        y: y != null ? y : Math.random() * h,
        vx: (Math.random() - .5) * .55,
        vy: (Math.random() - .5) * .55,
        r: Math.random() * 2.2 + .5,
        op: Math.random() * .5 + .15,
        opDir: Math.random() > .5 ? 1 : -1,
        opSpeed: Math.random() * .007 + .002,
        hue: Math.random() > .8 ? 1 : 0,
      };
    }

    function spawnStar() {
      shootingStars.push({
        x: Math.random() * w * .6,
        y: Math.random() * h * .4,
        vx: 7 + Math.random() * 8,
        vy: 1.5 + Math.random() * 3.5,
        life: 1.0,
        decay: .022 + Math.random() * .018,
        len: 90 + Math.random() * 130,
      });
    }

    function spawnRing(x, y) {
      rings.push({ x, y, r: 0, maxR: 130 + Math.random() * 90, life: 1.0, decay: .022 });
    }

    function step() {
      ctx.clearRect(0, 0, w, h);
      const { r, g, b } = getAccentRgb();
      const base = `${r},${g},${b}`;

      /* --- Shooting stars --- */
      shootTimer++;
      if (shootTimer > 220 && Math.random() < .018) { spawnStar(); shootTimer = 0; }

      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const s = shootingStars[i];
        s.x += s.vx; s.y += s.vy; s.life -= s.decay;
        if (s.life <= 0) { shootingStars.splice(i, 1); continue; }

        const tailLen = s.len;
        const tx = s.x - (s.vx / Math.hypot(s.vx, s.vy)) * tailLen;
        const ty = s.y - (s.vy / Math.hypot(s.vx, s.vy)) * tailLen;
        const grad = ctx.createLinearGradient(tx, ty, s.x, s.y);
        grad.addColorStop(0, `rgba(${base},0)`);
        grad.addColorStop(.6, `rgba(${base},${s.life * .5})`);
        grad.addColorStop(1, `rgba(255,255,255,${s.life * .9})`);

        ctx.save();
        ctx.shadowBlur = 12; ctx.shadowColor = `rgba(${base},0.9)`;
        ctx.strokeStyle = grad; ctx.lineWidth = 1.8;
        ctx.beginPath(); ctx.moveTo(tx, ty); ctx.lineTo(s.x, s.y); ctx.stroke();

        /* tip glow dot */
        ctx.globalAlpha = s.life;
        ctx.fillStyle = '#fff';
        ctx.beginPath(); ctx.arc(s.x, s.y, 1.5, 0, Math.PI * 2); ctx.fill();
        ctx.restore();
      }

      /* --- Rings (mouse click) --- */
      for (let i = rings.length - 1; i >= 0; i--) {
        const ring = rings[i];
        ring.r += (ring.maxR - ring.r) * .07;
        ring.life -= ring.decay;
        if (ring.life <= 0) { rings.splice(i, 1); continue; }

        ctx.save();
        ctx.globalAlpha = ring.life * .22;
        ctx.strokeStyle = `rgba(${base},1)`;
        ctx.lineWidth = 1.2;
        ctx.beginPath(); ctx.arc(ring.x, ring.y, ring.r, 0, Math.PI * 2); ctx.stroke();
        ctx.globalAlpha = ring.life * .08;
        ctx.beginPath(); ctx.arc(ring.x, ring.y, ring.r * .6, 0, Math.PI * 2); ctx.stroke();
        ctx.restore();
      }

      /* --- Particles --- */
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        /* mouse repulsion */
        if (mouse.active) {
          const mdx = p.x - mouse.x, mdy = p.y - mouse.y;
          const md = Math.hypot(mdx, mdy);
          if (md < 200 && md > 0) {
            const force = ((200 - md) / 200) * .7;
            p.vx += (mdx / md) * force * .055;
            p.vy += (mdy / md) * force * .055;
          }
        }

        /* speed cap + damping */
        const spd = Math.hypot(p.vx, p.vy);
        if (spd > 1.8) { p.vx *= .94; p.vy *= .94; }

        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;

        /* opacity pulse */
        p.op += p.opDir * p.opSpeed;
        if (p.op > .72 || p.op < .1) p.opDir *= -1;

        /* connections between nearby particles */
        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j];
          const dx = p.x - q.x, dy = p.y - q.y;
          const d = Math.hypot(dx, dy);
          if (d < 145) {
            ctx.save();
            ctx.globalAlpha = (1 - d / 145) * .14 * p.op;
            ctx.strokeStyle = `rgba(${base},1)`;
            ctx.lineWidth = .75;
            ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); ctx.stroke();
            ctx.restore();
          }
        }

        /* connection to mouse */
        if (mouse.active) {
          const mdx = p.x - mouse.x, mdy = p.y - mouse.y;
          const md = Math.hypot(mdx, mdy);
          if (md < 170) {
            ctx.save();
            ctx.globalAlpha = (1 - md / 170) * .38;
            ctx.strokeStyle = `rgba(${base},1)`;
            ctx.lineWidth = .9;
            ctx.shadowBlur = 4; ctx.shadowColor = `rgba(${base},0.6)`;
            ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(mouse.x, mouse.y); ctx.stroke();
            ctx.restore();
          }
        }

        /* draw particle with glow */
        ctx.save();
        ctx.globalAlpha = p.op;
        ctx.shadowBlur = p.r > 1.5 ? 14 : 5;
        ctx.shadowColor = `rgba(${base},0.8)`;
        ctx.fillStyle = p.hue ? `rgba(255,255,255,0.9)` : `rgba(${base},1)`;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
        ctx.restore();
      }

      ctx.globalAlpha = 1;
      requestAnimationFrame(step);
    }

    hero.addEventListener('mousemove', function (e) {
      const rect = hero.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;
    });
    hero.addEventListener('mouseleave', function () { mouse.active = false; });
    hero.addEventListener('click', function (e) {
      const rect = hero.getBoundingClientRect();
      spawnRing(e.clientX - rect.left, e.clientY - rect.top);
      for (let i = 0; i < 5; i++) {
        const angle = (Math.PI * 2 / 5) * i;
        const p = makeParticle(e.clientX - rect.left, e.clientY - rect.top);
        p.vx = Math.cos(angle) * (1 + Math.random());
        p.vy = Math.sin(angle) * (1 + Math.random());
        particles.push(p);
        if (particles.length > 120) particles.shift();
      }
    });

    window.addEventListener('resize', resize);
    resize();

    /* initial ambient rings */
    setTimeout(function () { spawnRing(w * .72, h * .28); }, 900);
    setTimeout(function () { spawnRing(w * .18, h * .65); }, 2600);
    setTimeout(function () { spawnStar(); }, 1800);

    step();
  });
})();
