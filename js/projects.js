/* projects.js — Filtro de projetos por categoria */
(function () {
  document.addEventListener('DOMContentLoaded', function () {
    const filters = document.getElementById('projectFilters');
    const grid = document.getElementById('projectsGrid');
    if (!filters || !grid) return;

    const cards = Array.from(grid.querySelectorAll('.project-card'));
    const buttons = Array.from(filters.querySelectorAll('.filter'));

    filters.addEventListener('click', function (e) {
      const btn = e.target.closest('.filter');
      if (!btn) return;
      const f = btn.dataset.filter;

      buttons.forEach(b => b.classList.toggle('active', b === btn));

      cards.forEach(card => {
        const cats = (card.dataset.cat || '').split(/\s+/);
        const show = f === 'all' || cats.includes(f);
        if (show) {
          card.classList.remove('hide');
          card.style.animation = 'none';
          // reflow para reiniciar animação
          void card.offsetWidth;
          card.style.animation = 'fadeInUp .5s ease both';
        } else {
          card.classList.add('hide');
        }
      });
    });

    // keyframe injetado (evita depender do CSS para o filtro)
    const style = document.createElement('style');
    style.textContent = '@keyframes fadeInUp{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:none}}';
    document.head.appendChild(style);
  });
})();
