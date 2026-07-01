/* theme.js — Alternância de tema claro/escuro (respeita preferência do sistema) */
(function () {
  const root = document.documentElement;
  const KEY = 'bm-theme';

  function apply(theme) {
    root.setAttribute('data-theme', theme);
  }

  // Estado inicial: salvo > preferência do sistema
  const saved = (function () {
    try { return localStorage.getItem(KEY); } catch (e) { return null; }
  })();
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  apply(saved || (prefersDark ? 'dark' : 'light'));

  document.addEventListener('DOMContentLoaded', function () {
    const btn = document.getElementById('themeToggle');
    if (!btn) return;
    btn.addEventListener('click', function () {
      const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      apply(next);
      try { localStorage.setItem(KEY, next); } catch (e) {}
    });
  });
})();
