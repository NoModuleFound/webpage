/* =============================================
   Like-Minded — Contacts (contacts.js)
   ============================================= */
'use strict';

const HISTORY = [
  { name:'🐼 Mr.Alex 🐼', seed:'Alex', time:'Today, 18:22', dur:4, type:'1-on-1' },
  { name:'Maria', seed:'Maria', time:'Today, 16:05', dur:12, type:'1-on-1' },
  { name:'English Practice', seed:'Group', time:'Today, 14:30', dur:28, type:'Group' },
  { name:'Amin', seed:'Amin', time:'Yesterday, 21:10', dur:7, type:'1-on-1' },
  { name:'Lena', seed:'Lena', time:'Yesterday, 19:45', dur:15, type:'1-on-1' },
  { name:'Carlos', seed:'Carlos', time:'Apr 28, 11:00', dur:9, type:'1-on-1' },
];

const FRIENDS = [
  { name:'Maria', seed:'Maria', online:true, lastSeen:'Online now' },
  { name:'Amin', seed:'Amin', online:true, lastSeen:'Online now' },
  { name:'Lena', seed:'Lena', online:false, lastSeen:'2h ago' },
  { name:'Carlos', seed:'Carlos', online:false, lastSeen:'Yesterday' },
  { name:'James', seed:'James', online:false, lastSeen:'3 days ago' },
];

const BLOCKED = [
  { name:'ToxicUser123', seed:'Toxic', reason:'Blocked Apr 25' },
];

function avatarUrl(seed) {
  const bgs = ['b6e3f4','ffd5dc','c0aede','ffdfbf','d1d4f9'];
  return `https://api.dicebear.com/7.x/adventurer/svg?seed=${seed}&backgroundColor=${bgs[seed.length % bgs.length]}`;
}

let currentTab = 'history';

function renderPane() {
  const pane = document.getElementById('contactPane');
  const empty = document.getElementById('emptyState');
  pane.innerHTML = '';

  if (currentTab === 'history') {
    if (!HISTORY.length) { empty.style.display = ''; return; }
    empty.style.display = 'none';
    const wrap = document.createElement('div');
    wrap.className = 'contact-list-group';
    HISTORY.forEach(h => {
      const el = document.createElement('div');
      el.className = 'contact-row';
      el.innerHTML = `
        <div class="contact-avatar-wrap">
          <img src="${avatarUrl(h.seed)}" class="contact-avatar" alt="${h.name}" />
        </div>
        <div class="contact-info">
          <p class="contact-name">${h.name}</p>
          <p class="contact-meta">${h.type} · ${h.time}</p>
        </div>
        <div class="contact-duration">
          <p class="contact-dur-num">${h.dur}</p>
          <p class="contact-dur-unit">min</p>
        </div>
      `;
      wrap.appendChild(el);
    });
    pane.appendChild(wrap);

  } else if (currentTab === 'friends') {
    if (!FRIENDS.length) { empty.style.display = ''; return; }
    empty.style.display = 'none';
    const wrap = document.createElement('div');
    wrap.className = 'contact-list-group';
    FRIENDS.forEach(f => {
      const el = document.createElement('div');
      el.className = 'contact-row';
      el.innerHTML = `
        <div class="contact-avatar-wrap">
          <img src="${avatarUrl(f.seed)}" class="contact-avatar" alt="${f.name}" />
          <span class="contact-online-dot${f.online ? ' online' : ''}"></span>
        </div>
        <div class="contact-info">
          <p class="contact-name">${f.name}</p>
          <p class="contact-meta">${f.lastSeen}</p>
        </div>
        <div class="contact-action">
          <button class="contact-call-btn" aria-label="Call"><i class="fas fa-phone"></i></button>
        </div>
      `;
      el.querySelector('.contact-call-btn')?.addEventListener('click', (e) => {
        e.stopPropagation();
        window.location.href = 'call.html';
      });
      wrap.appendChild(el);
    });
    pane.appendChild(wrap);

  } else if (currentTab === 'blocked') {
    if (!BLOCKED.length) { empty.style.display = ''; empty.querySelector('.empty-title').textContent = 'No blocked users'; return; }
    empty.style.display = 'none';
    const wrap = document.createElement('div');
    wrap.className = 'contact-list-group';
    BLOCKED.forEach(b => {
      const el = document.createElement('div');
      el.className = 'contact-row';
      el.innerHTML = `
        <div class="contact-avatar-wrap">
          <img src="${avatarUrl(b.seed)}" class="contact-avatar blocked" alt="${b.name}" />
          <span class="contact-block-badge"><i class="fas fa-ban"></i></span>
        </div>
        <div class="contact-info">
          <p class="contact-name">${b.name}</p>
          <p class="contact-meta">${b.reason}</p>
        </div>
        <div class="contact-action">
          <button class="contact-unblock-btn">Unblock</button>
        </div>
      `;
      wrap.appendChild(el);
    });
    pane.appendChild(wrap);
  }
}

// Tab switching
document.getElementById('contactTabs')?.addEventListener('click', (e) => {
  const btn = e.target.closest('.tab-btn');
  if (!btn) return;
  document.querySelectorAll('#contactTabs .tab-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  currentTab = btn.dataset.tab;
  const idx = [...btn.parentElement.querySelectorAll('.tab-btn')].indexOf(btn);
  document.getElementById('tabIndicator').style.left = `${idx * 33.33}%`;
  renderPane();
});

// Nav
document.querySelectorAll('.tab-item').forEach(item => {
  item.addEventListener('click', () => {
    const routes = { lobby:'home.html', groups:'groups.html', ranking:'ranking.html', contacts:'contacts.html', profile:'profile.html' };
    const tab = item.dataset.tab;
    if (tab !== 'contacts' && routes[tab]) window.location.href = routes[tab];
  });
});

renderPane();