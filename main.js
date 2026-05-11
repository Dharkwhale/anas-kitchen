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

/* ── Render all + init ───────────────────────────────── */
function render() {
  document.getElementById('app').innerHTML = renderNav();
}

document.addEventListener('DOMContentLoaded', render);
