/* =============================================
   CULINARY JOURNEY — region.js
   Shared script for yogyakarta.html,
   sumatera-selatan.html, nusa-tenggara-barat.html
   Fetches JSON data, renders dish cards, modal
   ============================================= */

'use strict';

let regionData = null;

async function loadRegionData() {
  // Determine which JSON to load from data-region attribute on body
  const region = document.body.dataset.region;
  
  // PERBAIKAN 1: Menghapus awalan '/' atau '../' agar path menjadi relatif
  const jsonMap = {
    'yogyakarta':         'data/yogyakarta.json',
    'sumatera-selatan': 'data/sumatera-selatan.json',
    'nusa-tenggara-barat': 'data/nusa-tenggara-barat.json',
  };
  
  const url = jsonMap[region];
  if (!url) return;

  const res  = await fetch(url);
  regionData = await res.json();
  renderDishGrid(regionData.hidangan);
  if (regionData.bahan_autentik) renderIngredients(regionData.bahan_autentik);
}

function flavorBarHTML(label, pct, isHot = false) {
  const cls = isHot ? 'flavor-bar__fill--hot' : '';
  return `
    <div class="flavor-bar">
      <span class="flavor-bar__label">${label}</span>
      <div class="flavor-bar__track">
        <div class="flavor-bar__fill ${cls}" style="width:0%" data-target="${pct}%"></div>
      </div>
    </div>`;
}

function cardHTML(dish, regionColor) {
  const f = dish.flavor;
  // Pick top 3 flavor bars for card preview
  const entries = Object.entries(f).sort((a, b) => b[1] - a[1]).slice(0, 3);
  const bars = entries.map(([key, val]) =>
    flavorBarHTML(key.charAt(0).toUpperCase() + key.slice(1), val, key === 'pedas')
  ).join('');

  return `
    <article class="dish-card reveal" data-kategori="${dish.kategori}"
             data-id="${dish.id}" tabindex="0" role="button"
             aria-label="Lihat detail ${dish.nama}">
      <div class="dish-card__img-wrap">
        <img src="${dish.img}" alt="${dish.nama}" loading="lazy" />
      </div>
      <div class="dish-card__body">
        <span class="dish-card__tag" style="color:${regionColor}; border-color:${regionColor};">
          ${dish.tags[0]}
        </span>
        <h3 class="dish-card__title">${dish.nama}</h3>
        <div class="dish-card__flavor-bars">${bars}</div>
      </div>
    </article>`;
}

function renderDishGrid(hidangan) {
  const grid = document.getElementById('dish-grid');
  if (!grid) return;
  const color = regionData.warna;
  grid.innerHTML = hidangan.map(d => cardHTML(d, color)).join('');

  // Animate flavor bars and cards after render
  requestAnimationFrame(() => {
    // Animasi bar rasa
    grid.querySelectorAll('.flavor-bar__fill').forEach(el => {
      setTimeout(() => { el.style.width = el.dataset.target; }, 300);
    });
    
    // PERBAIKAN 2: Paksa kartu untuk muncul perlahan secara berurutan
    grid.querySelectorAll('.dish-card').forEach((card, i) => {
      setTimeout(() => card.classList.add('visible'), i * 100);
    });
  });

  // Attach click handlers
  grid.querySelectorAll('.dish-card').forEach(card => {
    const openCard = () => {
      const id = card.dataset.id;
      const dish = hidangan.find(d => d.id === id);
      if (dish) openModal(dish, color);
    };
    card.addEventListener('click', openCard);
    card.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') openCard(); });
  });
}

function renderIngredients(bahanArray) {
  const container = document.getElementById('ingredients-grid');
  if (!container) return;

  container.innerHTML = bahanArray.map(b => `
    <div class="flip-card" role="button" tabindex="0" aria-label="Fakta mengenai ${b.nama}">
      <div class="flip-card-inner">
        <div class="flip-card-front">
          <img src="${b.img}" alt="${b.nama}" loading="lazy" />
          <div class="flip-card-front__body">
            <div style="display: flex; align-items: center; gap: 6px; color: #1a5c4a;">
              <span class="material-symbols-outlined" style="font-size: 1.25rem;">${b.icon}</span>
              <strong style="font-size: 1rem; font-family: 'Playfair Display', serif;">${b.nama}</strong>
            </div>
            <p style="font-size: 0.85rem; color: var(--color-on-surface-variant); line-height: 1.4; margin: 0;">
              ${b.deskripsi_singkat}
            </p>
          </div>
        </div>
        <div class="flip-card-back">
          <span class="material-symbols-outlined" style="font-size: 2.5rem; margin-bottom: 1rem;">${b.icon}</span>
          <h3 style="font-size: 1.15rem; font-family: 'Playfair Display', serif; margin: 0 0 0.75rem;">Anatomi & Karakter</h3>
          <p style="font-size: 0.85rem; line-height: 1.5; margin: 0;">${b.fakta_botani}</p>
        </div>
      </div>
    </div>
  `).join('');
}

/* ── Init ── */
document.addEventListener('DOMContentLoaded', loadRegionData);