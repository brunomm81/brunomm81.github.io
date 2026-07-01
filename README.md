# Bruno Monteiro — Portfólio Pessoal

Website pessoal e portfólio de **Bruno Monteiro**, Desenvolvedor e Consultor ERP Protheus (Itajaí/SC).
Site estático em **HTML + CSS + JavaScript** modular, pronto para **GitHub Pages**.

## Estrutura

```
sitepessoal/
├── index.html            # Página única com todas as seções
├── assets/
│   └── img/
│       ├── foto.png       # Foto do hero
│       └── BONE.png       # Boné da marca VORNX
├── css/
│   ├── variables.css      # Cores, tipografia, tokens (temas claro/escuro)
│   ├── base.css           # Reset e tipografia base
│   ├── layout.css         # Navbar, hero, seções, grids, footer
│   ├── components.css      # Botões, cards, toggle, WhatsApp flutuante
│   ├── animations.css     # Keyframes e scroll reveal
│   └── responsive.css     # Breakpoints (mobile/tablet)
├── js/
│   ├── theme.js           # Tema claro/escuro (persistente)
│   ├── nav.js             # Navbar, menu mobile, barra de progresso, link ativo
│   ├── animations.js      # Scroll reveal com efeito stagger
│   ├── counters.js        # Contadores animados
│   ├── typing.js          # Efeito de digitação no hero
│   ├── projects.js        # Filtro de projetos
│   ├── hero-canvas.js     # Rede de partículas no fundo do hero
│   └── main.js            # Ano, parallax, tilt 3D da foto
└── README.md
```

## Publicar no GitHub Pages

1. Crie um repositório no GitHub. Para virar seu site pessoal principal
   (`https://SEU-USUARIO.github.io`), nomeie o repositório como **`SEU-USUARIO.github.io`**.
   Para um projeto comum, qualquer nome serve (o endereço fica `.github.io/nome-do-repo`).
2. Envie todos os arquivos desta pasta para o repositório:
   ```bash
   git init
   git add .
   git commit -m "Site pessoal Bruno Monteiro"
   git branch -M main
   git remote add origin https://github.com/SEU-USUARIO/SEU-REPO.git
   git push -u origin main
   ```
3. No GitHub: **Settings → Pages → Build and deployment → Source: Deploy from a branch**,
   escolha a branch `main` e a pasta `/ (root)`. Salve.
4. Aguarde alguns minutos. O site ficará disponível no endereço indicado nessa mesma página.

> Como é 100% estático, não há build. Basta subir os arquivos.

## Personalização rápida

- **Cores:** ajuste as variáveis em `css/variables.css` (o azul da marca é `--blue-500`).
- **Textos e seções:** edite diretamente o `index.html`.
- **Frases do efeito de digitação:** array `phrases` em `js/typing.js`.
- **Projetos:** duplique um `<article class="project-card">` no `index.html` e ajuste `data-cat`.

## Contato

- LinkedIn: https://www.linkedin.com/in/brunomm81/
- WhatsApp: +55 47 99175-7266
