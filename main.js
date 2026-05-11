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
  const orderLink = waLink("Hi Ana's Kitchen, I'd like to order Ewa Agoyin please");
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

/* ── Menu ────────────────────────────────────────────── */
function renderMenuCard(item) {
  const msg   = `Hi Ana's Kitchen, I'd like to order ${item.name} (${item.price})`;
  const badge = item.badge ? `<span class="menu-card__badge">${item.badge}</span>` : '';
  return `
<div class="menu-card reveal">
  ${badge}
  <img class="menu-card__img" src="${item.image}" alt="${item.name}" />
  <div>
    <div class="menu-card__name">${item.name}</div>
    <div class="menu-card__desc">${item.description}</div>
  </div>
  <div class="menu-card__right">
    <span class="menu-card__price">${item.price}</span>
    <a class="menu-card__order" href="${waLink(msg)}" target="_blank" rel="noopener">Order</a>
  </div>
</div>`;
}

function renderMenu() {
  const tabs = CFG.menuCategories.map((cat, i) => `
    <button class="menu__tab${i === 0 ? ' active' : ''}"
            data-tab="${cat.id}">${cat.label}</button>`).join('');

  const panels = CFG.menuCategories.map((cat, i) => `
    <div class="menu__panel${i === 0 ? ' active' : ''}" id="panel-${cat.id}">
      ${cat.items.map(renderMenuCard).join('')}
    </div>`).join('');

  return `
<section class="menu" id="menu">
  <div class="menu__header reveal">
    <span class="section-label">Our Menu</span>
    <h2>What Are You Craving?</h2>
    <div class="menu__tabs" id="menu-tabs">${tabs}</div>
  </div>
  <div class="menu__panels">${panels}</div>
</section>`;
}

/* ── About ───────────────────────────────────────────── */
function renderAbout() {
  const orderLink = waLink("Hi Ana's Kitchen, I'd like to come and taste your food");
  return `
<section class="about" id="about">
  <div class="about__inner">
    <div class="about__text reveal">
      <span class="section-label">Our Story</span>
      <h2>${CFG.about.headline}</h2>
      <p>${CFG.about.story}</p>
      <a class="btn btn-gold" href="${orderLink}" target="_blank" rel="noopener">
        Come taste for yourself &rarr;
      </a>
    </div>
    <div class="reveal">
      <img class="about__img" src="${CFG.about.image}" alt="Ana's Kitchen food" />
    </div>
  </div>
</section>`;
}

/* ── Reviews ─────────────────────────────────────────── */
function renderReviews() {
  const cards = CFG.testimonials.map(t => `
    <div class="review-card reveal">
      <div class="review-card__stars">${stars(t.rating)}</div>
      <p class="review-card__quote">&ldquo;${t.quote}&rdquo;</p>
      <div class="review-card__name">&mdash; ${t.name}</div>
    </div>`).join('');

  return `
<section class="reviews" id="reviews">
  <div class="reviews__header reveal">
    <span class="section-label">What People Are Saying</span>
    <h2>Real Reviews, Real Nigerians</h2>
  </div>
  <div class="reviews__grid">${cards}</div>
</section>`;
}

/* ── Footer ──────────────────────────────────────────── */
function renderFooter() {
  const { name, tagline, location, hours, whatsapp, instagram } = CFG.business;
  const waHref = waLink("Hi Ana's Kitchen, I'd like to place an order");
  const waDisplay = '+' + whatsapp.replace(/(\d{3})(\d{3})(\d{3})(\d{4})/, '$1 $2 $3 $4');
  return `
<footer class="footer">
  <div class="footer__inner">
    <div>
      <div class="footer__logo">${name}</div>
      <div class="footer__tagline">${tagline}</div>
      <div class="footer__info">
        <p>📍 ${location}</p>
        <p>🕐 ${hours}</p>
        <p>📱 ${waDisplay}</p>
      </div>
      <div class="footer__socials">
        <a class="footer__social-btn" href="${instagram}" target="_blank" rel="noopener">📸 Instagram</a>
        <a class="footer__social-btn" href="${waHref}" target="_blank" rel="noopener">💬 WhatsApp</a>
      </div>
    </div>
    <div class="footer__right">
      <div class="footer__logo" style="font-size:1rem;margin-bottom:16px;">Quick Order</div>
      <div class="footer__info">
        ${CFG.menuCategories.map(cat =>
          `<p><a href="#menu" data-tab="${cat.id}" class="footer__quick-link" style="color:#6B8F7A;">${cat.label}</a></p>`
        ).join('')}
      </div>
    </div>
    <div class="footer__copy">&copy; 2026 ${name}. All rights reserved.</div>
  </div>
</footer>`;
}

/* ── Floating WA ─────────────────────────────────────── */
function renderFloatingWA() {
  const href = waLink("Hi Ana's Kitchen, I'd like to place an order");
  return `
<a class="wa-float" href="${href}" target="_blank" rel="noopener" aria-label="Order on WhatsApp">
  💬 Order Now
</a>`;
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

function initTabs() {
  const tabBtns = document.querySelectorAll('.menu__tab');
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.tab;

      // Update tabs
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Update panels
      document.querySelectorAll('.menu__panel').forEach(p => p.classList.remove('active'));
      document.getElementById('panel-' + target).classList.add('active');
    });
  });
}

function initScrollReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

/* ── Render all + init ───────────────────────────────── */
function render() {
  document.getElementById('app').innerHTML =
    renderNav() +
    renderHero() +
    renderSpotlight() +
    renderMenu() +
    renderAbout() +
    renderReviews() +
    renderFooter() +
    renderFloatingWA();
  initNav();
  initTabs();
  initScrollReveal();
}

document.addEventListener('DOMContentLoaded', render);
