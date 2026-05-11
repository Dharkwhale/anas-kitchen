'use strict';

const CFG = window.siteConfig;
const WA  = CFG.business.whatsapp;

function waLink(msg) {
  return 'https://wa.me/' + WA + '?text=' + encodeURIComponent(msg);
}

function stars(n) {
  return '★'.repeat(n) + '☆'.repeat(5 - n);
}

/* ── Hero ────────────────────────────────────────────── */
function renderHero() {
  const orderLink = waLink("Hi Ana's Kitchen, I'd like to place an order");
  return `
<section class="hero" id="hero">
  <div class="hero__inner">
    <div class="hero__content reveal">
      <span class="hero__badge">🌶 ${CFG.hero.badge}</span>
      <h1>${CFG.hero.headline}</h1>
      <p class="hero__sub">${CFG.hero.subheadline}</p>
      <a class="btn btn-gold" href="${orderLink}" target="_blank" rel="noopener">
        📲 Order on WhatsApp
      </a>
    </div>
    <div class="hero__media reveal">
      <img class="hero__img" src="${CFG.hero.image}" alt="Ana's Kitchen Ewa Agoyin" />
    </div>
  </div>
</section>`;
}

/* ── Spotlight ───────────────────────────────────────── */
function renderSpotlight() {
  const orderLink = waLink("Hi, I'd like to order Ewa Agoyin please");
  return `
<section class="spotlight">
  <div class="spotlight__inner">
    <div class="reveal">
      <img class="spotlight__img" src="${CFG.spotlight.image}" alt="Ewa Agoyin and Agege Bread" />
    </div>
    <div class="spotlight__text reveal">
      <span class="section-label">⭐ Signature Dish</span>
      <h2>${CFG.spotlight.headline}</h2>
      <p>${CFG.spotlight.description}</p>
      <a class="btn btn-green" href="${orderLink}" target="_blank" rel="noopener">
        Order Ewa Agoyin &rarr;
      </a>
    </div>
  </div>
</section>`;
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
  document.getElementById('app').innerHTML =
    renderNav() + renderHero() + renderSpotlight();
  initNav();
}

document.addEventListener('DOMContentLoaded', render);
