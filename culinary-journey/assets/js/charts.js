/* =============================================
   CULINARY JOURNEY — charts.js
   Insight Page: Bar Chart (kalori) + Heatmap
   Depends on: Chart.js CDN
   ============================================= */

'use strict';

/* ── Calorie Bar Chart ── */
async function renderCalorieChart() {
  const res  = await fetch('data/insight.json');
  const data = await res.json();
  const items = data.kalori_comparison.sort((a, b) => b.kalori - a.kalori);
  const container = document.getElementById('calorie-chart');
  if (!container) return;

  const maxKal = items[0].kalori;
  container.innerHTML = items.map(item => `
    <div class="bar-chart-row reveal">
      <div class="bar-chart-row__label">${item.nama}</div>
      <div class="bar-chart-row__track">
        <div class="bar-chart-row__track-bg"></div>
        <div class="bar-chart-row__fill"
             style="width:0%; background-color:${item.warna};"
             data-target="${(item.kalori / maxKal) * 100}">
        </div>
        <span class="bar-chart-row__value">${item.kalori} kcal</span>
      </div>
    </div>
  `).join('') + `
    <div style="display:flex;align-items:center;gap:12px;margin-top:12px;">
      <div style="width:160px;"></div>
      <div style="flex:1;border-top:1px solid var(--color-outline-variant);padding-top:8px;display:flex;justify-content:space-between;">
        <span class="text-chart text-outline">0 kcal</span>
        <span class="text-chart text-outline">${maxKal} kcal</span>
      </div>
    </div>
  `;

  // Animate bars in after paint
  requestAnimationFrame(() => {
    container.querySelectorAll('.bar-chart-row__fill').forEach(bar => {
      setTimeout(() => { bar.style.width = bar.dataset.target + '%'; }, 200);
    });
    
    // --- PERBAIKAN: Paksa baris grafik untuk memudar masuk (fade-in) secara berurutan ---
    container.querySelectorAll('.bar-chart-row').forEach((row, i) => {
      setTimeout(() => row.classList.add('visible'), i * 80);
    });
  });
}

/* ── Flavor Heatmap ── */
async function renderHeatmap() {
  // PERBAIKAN: Path JSON disesuaikan
  const res  = await fetch('data/insight.json');
  const data = await res.json();
  const rows = data.flavor_heatmap;
  const container = document.getElementById('heatmap-table');
  if (!container) return;

  const dims = ['manis', 'pedas', 'gurih', 'asam', 'pahit'];
  const labels = { manis:'Manis', pedas:'Pedas', gurih:'Gurih', asam:'Asam', pahit:'Pahit' };

  // Compute intensity → background color (monochromatic tonal)
  function heatColor(regionColor, score) {
    const alpha = 0.1 + (score / 100) * 0.8;
    return `${regionColor}${Math.round(alpha * 255).toString(16).padStart(2,'0')}`;
  }

  const headerCells = dims.map(d => `<th>${labels[d]}</th>`).join('');
  const bodyRows = rows.map(r => {
    const cells = dims.map(d => {
      const score = r.scores[d];
      const intensity = score > 70 ? 'High' : score > 40 ? 'Med' : 'Low';
      return `<td style="background-color:${heatColor(r.warna_region, score)}; color:var(--color-on-surface);">
        ${intensity} <span style="opacity:0.6;font-size:0.6rem;">(${score})</span>
      </td>`;
    }).join('');
    return `<tr>
      <td style="text-align:left; color:var(--color-on-surface);">${r.region}</td>
      ${cells}
    </tr>`;
  }).join('');

  container.innerHTML = `
    <thead>
      <tr><th>Region</th>${headerCells}</tr>
    </thead>
    <tbody>${bodyRows}</tbody>
  `;
}

/* ── Fun Facts ── */
async function renderFunFacts() {
  const res  = await fetch('data/insight.json');
  const data = await res.json();
  const container = document.getElementById('fun-facts');
  if (!container) return;

  container.innerHTML = data.fun_facts.map((f, i) => `
    <div class="reveal reveal--delay-${i % 3}" style="display:flex; gap:1rem; align-items:flex-start; padding:1.5rem; border:1px solid var(--color-outline-variant); background-color:var(--color-surface-container-lowest);">
      <span class="material-symbols-outlined" style="color:var(--color-primary); font-size:1.5rem; flex-shrink:0; margin-top:2px;">${f.icon}</span>
      <p style="font-size:1rem; line-height:1.6; color:var(--color-on-surface-variant);">${f.text}</p>
    </div>
  `).join('');

  // --- PERBAIKAN: Paksa kotak fun facts muncul ke layar ---
  requestAnimationFrame(() => {
    container.querySelectorAll('.reveal').forEach((el, i) => {
      setTimeout(() => el.classList.add('visible'), i * 150);
    });
  });
}

/* ── Radar Overlay Chart (3 daerah) ── */
async function renderRadarOverlay() {
  const canvas = document.getElementById('radar-overlay');
  if (!canvas || !window.Chart) return;
  // PERBAIKAN: Path JSON disesuaikan
  const res  = await fetch('data/insight.json');
  const data = await res.json();
  const rows = data.flavor_heatmap;
  const dims = ['manis', 'pedas', 'gurih', 'asam', 'pahit'];
  const labels = ['Manis', 'Pedas', 'Gurih', 'Asam', 'Pahit'];

  const datasets = rows.map(r => ({
    label: r.region,
    data: dims.map(d => r.scores[d] / 10),
    borderColor: r.warna_region,
    backgroundColor: `${r.warna_region}22`,
    borderWidth: 2,
    pointBackgroundColor: r.warna_region,
    pointRadius: 4,
  }));

  new Chart(canvas, {
    type: 'radar',
    data: { labels, datasets },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'bottom',
          labels: { color: '#d4c4b0', font: { family: 'Inter', size: 12 }, padding: 20 }
        }
      },
      scales: {
        r: {
          min: 0, max: 10,
          grid: { color: 'rgba(157,143,124,0.15)' },
          angleLines: { color: 'rgba(157,143,124,0.15)' },
          ticks: { display: false },
          pointLabels: {
            color: '#d4c4b0',
            font: { family: 'Inter', size: 12, weight: '600' }
          }
        }
      }
    }
  });
}

/* ── Scatter Plot Kuadran ── */
async function renderScatterKuadran() {
  const canvas = document.getElementById('scatter-kuadran');
  if (!canvas || !window.Chart) return;

  const res  = await fetch('data/insight.json');
  const data = await res.json();
  const rawData = data.kuadran_data;

  // Mengelompokkan titik koordinat berdasarkan daerah (Region)
  const regions = [...new Set(rawData.map(d => d.region))];
  const datasets = regions.map(region => {
    const regionItems = rawData.filter(d => d.region === region);
    return {
      label: region,
      data: regionItems.map(d => ({ x: d.x_pedas, y: d.y_kalori, nama: d.nama })),
      backgroundColor: regionItems[0].warna,
      pointRadius: 8,
      pointHoverRadius: 11,
    };
  });

  new Chart(canvas, {
    type: 'scatter',
    data: { datasets },
    options: {
      responsive: true,
      plugins: {
        legend: { position: 'bottom', labels: { color: '#d4c4b0', font: { family: 'Inter', size: 12 }, padding: 20 } },
        tooltip: {
          callbacks: {
            label: function(ctx) {
              const pt = ctx.raw;
              return `${pt.nama} (${pt.x} Pedas, ${pt.y} kcal)`;
            }
          }
        }
      },
      scales: {
        x: {
          title: { display: true, text: '← Tidak Pedas | Tingkat Kepedasan | Sangat Pedas →', color: '#9d8f7c', font: {family: 'Inter'} },
          min: -5, max: 105,
          grid: { color: 'rgba(157,143,124,0.15)' },
          ticks: { color: '#d4c4b0' }
        },
        y: {
          title: { display: true, text: 'Kepadatan Kalori (kcal / 100g)', color: '#9d8f7c', font: {family: 'Inter'} },
          min: 0, max: 350,
          grid: { color: 'rgba(157,143,124,0.15)' },
          ticks: { color: '#d4c4b0' }
        }
      }
    }
  });
}

/* ── Init ── */
document.addEventListener('DOMContentLoaded', () => {
  renderCalorieChart();
  renderHeatmap();
  renderFunFacts();
  renderRadarOverlay();
  renderScatterKuadran();
});