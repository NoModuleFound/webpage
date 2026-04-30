/* =============================================
   Like-Minded — Groups (groups.js)
   ============================================= */
'use strict';

const GROUPS = [
    { title: 'English Practice', topic: 'Language Learning', count: 8, lang: '🇬🇧', avatars: ['Alex', 'Maria', 'James', 'Lena'], host: 'Alex' },
    { title: 'Startup Ideas Brainstorm', topic: 'Business & Startups', count: 5, lang: '🌍', avatars: ['Carlos', 'Aisha', 'Bek'], host: 'Carlos' },
    { title: 'Lo-fi Beats & Chill Talk', topic: 'Music & Instruments', count: 12, lang: '🌍', avatars: ['Elena', 'Sarah', 'Dilshoda', 'James'], host: 'Elena' },
    { title: 'Philosophy Deep Dive', topic: 'Philosophy & Psychology', count: 3, lang: '🇬🇧', avatars: ['Amin', 'Lena'], host: 'Amin' },
    { title: 'Travel Stories Tonight', topic: 'Travel & Outdoors', count: 7, lang: '🌍', avatars: ['Maria', 'Carlos', 'Aisha', 'Bek'], host: 'Maria' },
    { title: 'Learn Arabic Together', topic: 'Language Learning', count: 4, lang: '🇸🇦', avatars: ['Amin', 'Dilshoda'], host: 'Amin' },
];

const groupList = document.getElementById('groupList');
const createOverlay = document.getElementById('createOverlay');
const createSheet = document.getElementById('createSheet');

function avatarUrl(seed) {
    const bgs = ['b6e3f4', 'ffd5dc', 'c0aede', 'ffdfbf', 'd1d4f9'];
    return `https://api.dicebear.com/7.x/adventurer/svg?seed=${seed}&backgroundColor=${bgs[seed.length % bgs.length]}`;
}

function renderGroups(filter) {
    groupList.innerHTML = '';
    const filtered = filter ? GROUPS.filter(g => g.topic.toLowerCase().includes(filter)) : GROUPS;

    if (filtered.length === 0) {
        groupList.innerHTML = '<div class="empty-state"><div class="empty-icon"><i class="fas fa-headphones"></i></div><p class="empty-title">No rooms found</p><p class="empty-sub">Try a different topic or start your own room!</p></div>';
        return;
    }

    filtered.forEach(g => {
        const el = document.createElement('div');
        el.className = 'group-card';
        el.innerHTML = `
      <div class="group-card-top">
        <div>
          <span class="badge badge-live">LIVE</span>
          <h3 class="group-title">${g.title}</h3>
          <p class="group-topic">${g.lang} ${g.topic}</p>
        </div>
        <div class="group-count"><i class="fas fa-user"></i> ${g.count}</div>
      </div>
      <div class="group-card-bottom">
        <div class="avatar-stack">
          ${g.avatars.map(a => `<img src="${avatarUrl(a)}" alt="${a}" />`).join('')}
        </div>
        <button class="join-btn">Join Room</button>
      </div>
    `;
        el.querySelector('.join-btn').addEventListener('click', (e) => {
            e.stopPropagation();
            window.location.href = `call.html?mode=group&room=${encodeURIComponent(g.title)}`;
        });
        groupList.appendChild(el);
    });
}

// Category chips
document.getElementById('trendingChips')?.addEventListener('click', (e) => {
    const chip = e.target.closest('.chip');
    if (!chip) return;
    document.querySelectorAll('#trendingChips .chip').forEach(c => c.classList.remove('chip-selected'));
    chip.classList.add('chip-selected');
    const cat = chip.dataset.cat;
    renderGroups(cat || null);
});

// Search
document.getElementById('groupSearch')?.addEventListener('input', (e) => {
    const q = e.target.value.toLowerCase();
    renderGroups(q || null);
});

// Create group
document.getElementById('createGroupBtn')?.addEventListener('click', () => {
    createOverlay.classList.add('open');
    createSheet.classList.add('open');
});
createOverlay?.addEventListener('click', () => {
    createOverlay.classList.remove('open');
    createSheet.classList.remove('open');
});
document.getElementById('goLiveBtn')?.addEventListener('click', () => {
    window.location.href = 'call.html?mode=group&role=admin&room=My+Room';
});

// Nav
document.querySelectorAll('.tab-item').forEach(item => {
    item.addEventListener('click', () => {
        const routes = { lobby: 'home.html', groups: 'groups.html', ranking: 'ranking.html', contacts: 'contacts.html', profile: 'profile.html' };
        const tab = item.dataset.tab;
        if (tab !== 'groups' && routes[tab]) window.location.href = routes[tab];
    });
});

renderGroups();
