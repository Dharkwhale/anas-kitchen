'use strict';

const CFG = window.siteConfig;
const WA  = CFG.business.whatsapp;

function waLink(msg) {
  return 'https://wa.me/' + WA + '?text=' + encodeURIComponent(msg);
}

function stars(n) {
  return '★'.repeat(n) + '☆'.repeat(5 - n);
}

/* ── Nav ─────────────────────────────────────────────── */
function renderNav() {
  const orderLink = waLink("Hi Ana's Kitchen, I'd like to place an order");
  return `
<nav class="nav" id="nav">
  <div class="nav__inner">
    <a class="nav__logo" href="#">
      <img src="assets/images/logo.png" alt="Ana's Kitchen logo" />
      ${CFG.business.name}
    </a>
    <ul class="nav__links">
      <li><a href="#menu">Menu</a></li>
      <li><a href="#about">About</a></li>
      <li><a href="#reviews">Reviews</a></li>
      <li><a class="btn btn-gold nav__cta" href="${orderLink}" target="_blank" rel="noopener">Order Now</a></li>
    </ul>
    <button class="nav__hamburger" id="hamburger" aria-label="Open menu" aria-expanded="false">
      <span></span><span></span><span></span>
    </button>
  </div>
  <div class="nav__drawer" id="nav-drawer" aria-hidden="true">
    <a href="#menu"    class="drawer-link">Menu</a>
    <a href="#about"   class="drawer-link">About</a>
    <a href="#reviews" class="drawer-link">Reviews</a>
    <a class="btn btn-gold" href="${orderLink}" target="_blank" rel="noopener">📲 Order on WhatsApp</a>
  </div>
</nav>`;
}

/* ── Nav interactivity ──────────────────────────────── */
function initNav() {
  const hamburger = document.getElementById('hamburger');
  const drawer    = document.getElementById('nav-drawer');
  const nav       = document.getElementById('nav');

  hamburger.addEventListener('click', () => {
    const open = document.body.classList.toggle('nav-open');
    hamburger.setAttribute('aria-expanded', String(open));
    drawer.setAttribute('aria-hidden', String(!open));
  });

  // Close drawer on link click
  document.querySelectorAll('.drawer-link').forEach(link => {
    link.addEventListener('click', () => {
      document.body.classList.remove('nav-open');
      hamburger.setAttribute('aria-expanded', 'false');
      drawer.setAttribute('aria-hidden', 'true');
    });
  });

  // Close on outside click
  document.addEventListener('click', e => {
    if (document.body.classList.contains('nav-open') &&
        !nav.contains(e.target)) {
      document.body.classList.remove('nav-open');
      hamburger.setAttribute('aria-expanded', 'false');
      drawer.setAttribute('aria-hidden', 'true');
    }
  });

  // Scroll shadow
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 50);
  }, { passive: true });
}

/* ── Render all + init ───────────────────────────────── */
function render() {
  document.getElementById('app').innerHTML = renderNav();
  initNav();
}

document.addEventListener('DOMContentLoaded', render);
