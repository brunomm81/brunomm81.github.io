/* typing.js — Efeito de digitação rotativa nos papéis profissionais */
(function () {
  document.addEventListener('DOMContentLoaded', function () {
    const el = document.getElementById('typeTarget');
    if (!el) return;

    const phrases = [
      'Desenvolvedor ERP Protheus',
      'Consultor TOTVS Protheus',
      'Especialista em Integrações REST & SOAP',
      'Arquiteto de Automações ADVPL'
    ];

    let pi = 0, ci = 0, deleting = false;

    function loop() {
      const current = phrases[pi];
      if (!deleting) {
        ci++;
        el.textContent = current.slice(0, ci);
        if (ci === current.length) { deleting = true; return setTimeout(loop, 1900); }
        setTimeout(loop, 62);
      } else {
        ci--;
        el.textContent = current.slice(0, ci);
        if (ci === 0) { deleting = false; pi = (pi + 1) % phrases.length; return setTimeout(loop, 260); }
        setTimeout(loop, 32);
      }
    }
    loop();
  });
})();
