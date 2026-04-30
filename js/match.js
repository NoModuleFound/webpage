/* =============================================
   Like-Minded — Match/Discovery (match.js)
   ============================================= */
'use strict';

const PROFILES = [
  { id:1, name:'Elena', age:22, language:'Russian', location:'Moscow', hobbies:['Photography','Travel','Music'], shared:['Travel','Music'], bio:'Looking for a language exchange partner to practice English.', seed:'Elena', bg:'ffd5dc', match:0.8 },
  { id:2, name:'James', age:24, language:'English', location:'New York', hobbies:['Coding','Startups','Gaming'], shared:['Coding'], bio:'Building the next big thing. Always down for a quick chat.', seed:'James', bg:'b6e3f4', match:0.3 },
  { id:3, name:'Aisha', age:21, language:'Uzbek', location:'Tashkent', hobbies:['Reading','Coffee','Psychology'], shared:['Reading','Psychology'], bio:'Med student trying to survive. Let\'s study together!', seed:'Aisha', bg:'c0aede', match:0.9 },
  { id:4, name:'Bek', age:25, language:'Uzbek', location:'Seoul', hobbies:['Football','Gaming','Music'], shared:['Gaming'], bio:'Casual gamer. Learning English through conversations.', seed:'Bek', bg:'ffdfbf', match:0.2 },
  { id:5, name:'Sarah', age:23, language:'English', location:'London', hobbies:['Art','Design','Travel'], shared:['Art','Travel'], bio:'UX Designer loving minimal aesthetics and good conversations.', seed:'Sarah', bg:'d1d4f9', match:0.7 },
];

const container = document.getElementById('cardsContainer');
let cards = [];

function avatarUrl(seed, bg) {
  return `https://api.dicebear.com/7.x/adventurer/svg?seed=${seed}&backgroundColor=${bg}`;
}

function createCard(user, index) {
  const el = document.createElement('div');
  el.className = 'swipe-card';
  const z = PROFILES.length - index;
  const scale = 1 - (index * 0.04);
  const ty = index * 10;
  el.style.zIndex = z;
  el.style.transform = `scale(${scale}) translateY(${ty}px)`;
  el.dataset.id = user.id;
  el.dataset.name = user.name;
  el.dataset.seed = user.seed;
  el.dataset.bg = user.bg;
  el.dataset.match = user.match;

  el.innerHTML = `
    <div class="card-avatar-area">
      <img src="${avatarUrl(user.seed, user.bg)}" class="card-avatar-bg" alt="${user.name}" />
      <div class="card-avatar-gradient"></div>
      <div class="card-avatar-info">
        <h2 class="card-avatar-name">${user.name}, ${user.age}</h2>
        <p class="card-avatar-sub"><i class="fas fa-map-marker-alt"></i> ${user.location}</p>
      </div>
      <div class="card-level-badge">${user.language}</div>
      <button class="card-voice-btn" aria-label="Play voice intro"><i class="fas fa-play"></i></button>
    </div>
    <div class="card-body">
      <p class="card-bio-label">Shared Interests</p>
      <div class="card-interests">
        ${user.hobbies.map(h => `<span class="chip chip-sm${user.shared.includes(h) ? ' card-interest-shared' : ''}">${h}</span>`).join('')}
      </div>
      <p class="card-bio-label" style="margin-top:auto">About</p>
      <p class="card-bio">${user.bio}</p>
    </div>
  `;
  return el;
}

function initCards() {
  PROFILES.forEach((user, i) => {
    const card = createCard(user, i);
    container.appendChild(card);
    cards.push(card);
  });
}

function updateStack() {
  cards.forEach((card, i) => {
    card.style.transform = `scale(${1 - i * 0.04}) translateY(${i * 10}px)`;
    card.style.zIndex = cards.length - i;
  });
}

function handleSwipe(direction) {
  if (!cards.length) return;
  const card = cards.shift();
  card.classList.add(direction === 'right' ? 'swipe-right' : 'swipe-left');

  if (direction === 'right') {
    const chance = parseFloat(card.dataset.match);
    if (Math.random() < chance) {
      setTimeout(() => {
        document.getElementById('matchText').innerHTML = `You and <b>${card.dataset.name}</b> share similar interests!`;
        document.getElementById('matchCelAvatar').src = avatarUrl(card.dataset.seed, card.dataset.bg);
        document.getElementById('matchOverlay').classList.add('active');
      }, 350);
    } else {
      showToast(`💜 Liked ${card.dataset.name}`);
    }
  }

  setTimeout(() => {
    card.remove();
    updateStack();
    if (!cards.length) {
      container.innerHTML = '<div class="empty-state" style="width:100%"><div class="empty-icon"><i class="fas fa-search"></i></div><p class="empty-title">No more profiles</p><p class="empty-sub">Check back later for new people!</p></div>';
    }
  }, 350);
}

document.getElementById('btnPass').addEventListener('click', () => handleSwipe('left'));
document.getElementById('btnLike').addEventListener('click', () => handleSwipe('right'));
document.getElementById('btnSuper')?.addEventListener('click', () => {
  showToast('⭐ Super Like sent!');
  handleSwipe('right');
});

document.getElementById('btnKeepSwiping').addEventListener('click', () => {
  document.getElementById('matchOverlay').classList.remove('active');
});
document.getElementById('matchCallBtn')?.addEventListener('click', () => {
  window.location.href = 'call.html';
});
document.getElementById('matchInboxBtn')?.addEventListener('click', () => {
  showToast('Matches inbox coming soon!');
});

function showToast(msg) {
  const existing = document.querySelector('.toast');
  if (existing) existing.remove();
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = msg;
  document.body.appendChild(toast);
  requestAnimationFrame(() => requestAnimationFrame(() => toast.classList.add('show')));
  setTimeout(() => { toast.classList.remove('show'); setTimeout(() => toast.remove(), 300); }, 2200);
}

initCards();
