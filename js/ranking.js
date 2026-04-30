/* =============================================
   Like-Minded — Ranking (ranking.js)
   ============================================= */
'use strict';

const RANK_DATA = [
  { name: '🐼 Mr.Alex 🐼', seed: 'Alex', flag: '🇺🇿', minutes: 312, talks: 42, rating: 99 },
  { name: 'Maria', seed: 'Maria', flag: '🇬🇧', minutes: 289, talks: 38, rating: 98 },
  { name: 'Amin', seed: 'Amin', flag: '🇦🇿', minutes: 245, talks: 31, rating: 97 },
  { name: 'Lena', seed: 'Lena', flag: '🇩🇪', minutes: 198, talks: 27, rating: 95 },
  { name: 'Carlos', seed: 'Carlos', flag: '🇪🇸', minutes: 176, talks: 24, rating: 93 },
  { name: 'Dilshoda', seed: 'Dilshoda', flag: '🇺🇿', minutes: 152, talks: 21, rating: 96 },
  { name: 'James', seed: 'James', flag: '🇺🇸', minutes: 134, talks: 18, rating: 92 },
  { name: 'Aisha', seed: 'Aisha', flag: '🇺🇿', minutes: 121, talks: 16, rating: 94 },
];

function avatarUrl(seed) {
  const bgs = ['b6e3f4','ffd5dc','c0aede','ffdfbf','d1d4f9'];
  return `https://api.dicebear.com/7.x/adventurer/svg?seed=${seed}&backgroundColor=${bgs[seed.length % bgs.length]}`;
}

function renderPodium() {
  const podium = document.getElementById('podium');
  if (!podium || RANK_DATA.length < 3) return;
  const order = [1, 0, 2]; // silver, gold, bronze
  const medals = ['🥇', '🥈', '🥉'];
  const classes = ['gold', 'silver', 'bronze'];
  podium.innerHTML = '';

  order.forEach((idx, pos) => {
    const u = RANK_DATA[idx];
    const el = document.createElement('div');
    el.className = `podium-card ${classes[idx]}`;
    el.style.animationDelay = `${pos * 0.1}s`;
    el.innerHTML = `
      <div class="podium-medal">${medals[idx]}</div>
      <img src="${avatarUrl(u.seed)}" class="podium-avatar" alt="${u.name}" />
      <p class="podium-name">${u.name}</p>
      <p class="podium-score">${u.flag} ${u.minutes} min</p>
    `;
    podium.appendChild(el);
  });
}

function renderList() {
  const list = document.getElementById('rankingList');
  list.innerHTML = '';

  RANK_DATA.slice(3).forEach((u, i) => {
    const rank = i + 4;
    const el = document.createElement('div');
    el.className = 'rank-row';
    el.innerHTML = `
      <span class="rank-num">${rank}</span>
      <div class="rank-avatar-wrap">
        <img src="${avatarUrl(u.seed)}" class="rank-avatar" alt="${u.name}" />
      </div>
      <div class="rank-info">
        <p class="rank-name">${u.flag} ${u.name}</p>
        <p class="rank-meta">👍 ${u.rating}% · ${u.talks} talks</p>
      </div>
      <div class="rank-score">
        <p class="rank-score-num">${u.minutes}</p>
        <p class="rank-score-unit">min</p>
      </div>
    `;
    list.appendChild(el);
  });
}

// Period tabs
document.getElementById('periodTabs')?.addEventListener('click', (e) => {
  const btn = e.target.closest('.tab-btn');
  if (!btn) return;
  document.querySelectorAll('#periodTabs .tab-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  const idx = [...btn.parentElement.querySelectorAll('.tab-btn')].indexOf(btn);
  const indicator = document.getElementById('tabIndicator');
  indicator.style.left = `${idx * 25}%`;
});

// Scope toggle
document.querySelectorAll('.scope-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.scope-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  });
});

// Info tooltip
document.getElementById('rankInfoBtn')?.addEventListener('click', () => {
  showToast('Rating = positive reviews + time spent + completed calls − reports');
});

// Nav
document.querySelectorAll('.tab-item').forEach(item => {
  item.addEventListener('click', () => {
    const routes = { lobby:'home.html', groups:'groups.html', ranking:'ranking.html', contacts:'contacts.html', profile:'profile.html' };
    const tab = item.dataset.tab;
    if (tab !== 'ranking' && routes[tab]) window.location.href = routes[tab];
  });
});

function showToast(msg) {
  const existing = document.querySelector('.toast');
  if (existing) existing.remove();
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = msg;
  document.body.appendChild(toast);
  requestAnimationFrame(() => requestAnimationFrame(() => toast.classList.add('show')));
  setTimeout(() => { toast.classList.remove('show'); setTimeout(() => toast.remove(), 300); }, 3000);
}

renderPodium();
renderList();
