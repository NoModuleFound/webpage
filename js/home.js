/* =============================================
   Like-Minded — Lobby (home.js)
   State Machine: idle → searching → match_found → post_call → idle
   ============================================= */

'use strict';

// ══════════════════════════════════════════════════
// DATA
// ══════════════════════════════════════════════════

const INTERESTS_DATA = [
  { id: 'languages', name: 'Languages', icon: 'fa-globe', cat: 'lang' },
  { id: 'music', name: 'Music', icon: 'fa-music', cat: 'music' },
  { id: 'movies', name: 'Movies & TV', icon: 'fa-film', cat: 'movies' },
  { id: 'gaming', name: 'Gaming', icon: 'fa-gamepad', cat: 'gaming' },
  { id: 'tech', name: 'Tech', icon: 'fa-laptop-code', cat: 'tech' },
  { id: 'travel', name: 'Travel', icon: 'fa-plane', cat: 'travel' },
  { id: 'sports', name: 'Sports', icon: 'fa-futbol', cat: 'sports' },
  { id: 'cooking', name: 'Cooking', icon: 'fa-utensils', cat: 'food' },
  { id: 'art', name: 'Art & Design', icon: 'fa-palette', cat: 'art' },
  { id: 'books', name: 'Books', icon: 'fa-book', cat: 'books' },
  { id: 'psychology', name: 'Psychology', icon: 'fa-brain', cat: 'mind' },
  { id: 'science', name: 'Science', icon: 'fa-flask', cat: 'science' },
];

const READY_USERS = [
  { name: 'Dilshoda', seed: 'Dilshoda', bg: 'b6e3f4', flag: '🇺🇿', rating: 99, gender: 'Female', online: true },
  { name: 'Lawyer ⚖️', seed: 'Lawyer', bg: 'e0e0e0', flag: '', rating: 99, gender: 'Male', online: true, noAvatar: true },
  { name: 'Maria', seed: 'Maria', bg: 'ffd5dc', flag: '🇬🇧', rating: 98, gender: 'Female', online: true },
  { name: 'James', seed: 'James', bg: 'c0aede', flag: '🇺🇸', rating: 96, gender: 'Male', online: true },
];

const INVITE_USERS = [
  { name: 'Amin', seed: 'Amin', bg: 'b6e3f4', flag: '🇦🇿', rating: 97, gender: 'Male', language: 'English', talks: 855 },
  { name: 'Lena', seed: 'Lena', bg: 'ffd5dc', flag: '🇩🇪', rating: 95, gender: 'Female', language: 'German', talks: 412 },
  { name: 'Carlos', seed: 'Carlos', bg: 'c0aede', flag: '🇪🇸', rating: 93, gender: 'Male', language: 'Spanish', talks: 230 },
];

const MATCH_CANDIDATES = [
  { name: 'Maria', age: 24, seed: 'Maria', bg: 'ffd5dc', flag: '🇬🇧', rating: 98, interests: ['Music', 'Travel', 'Art'], shared: ['Music', 'Travel'] },
  { name: 'Aisha', age: 21, seed: 'Aisha', bg: 'c0aede', flag: '🇺🇿', rating: 95, interests: ['Books', 'Psychology', 'Science'], shared: ['Books'] },
  { name: 'James', age: 25, seed: 'James', bg: 'b6e3f4', flag: '🇺🇸', rating: 92, interests: ['Gaming', 'Tech', 'Sports'], shared: ['Tech', 'Gaming'] },
  { name: 'Elena', age: 22, seed: 'Elena', bg: 'ffd5dc', flag: '🇷🇺', rating: 97, interests: ['Languages', 'Travel', 'Cooking'], shared: ['Languages'] },
];

const DISCOVERY_PROFILES = [
  { name: 'Maria', age: 24, seed: 'Maria', bg: 'ffd5dc', flag: '🇬🇧', rating: 98, language: 'English', bio: 'Language enthusiast who loves art galleries and live concerts 🎶', interests: ['Music', 'Travel', 'Art', 'Languages'] },
  { name: 'Aisha', age: 21, seed: 'Aisha', bg: 'c0aede', flag: '🇺🇿', rating: 95, language: 'Uzbek', bio: 'Psychology student exploring the world through books 📚', interests: ['Books', 'Psychology', 'Science'] },
  { name: 'James', age: 25, seed: 'James', bg: 'b6e3f4', flag: '🇺🇸', rating: 92, language: 'English', bio: 'Tech nerd by day, gamer by night. Let\'s talk code!', interests: ['Gaming', 'Tech', 'Sports'] },
  { name: 'Elena', age: 22, seed: 'Elena', bg: 'ffd5dc', flag: '🇷🇺', rating: 97, language: 'Russian', bio: 'Cooking lover who dreams of traveling the world 🌍', interests: ['Languages', 'Travel', 'Cooking'] },
  { name: 'Carlos', age: 27, seed: 'Carlos', bg: 'c0aede', flag: '🇪🇸', rating: 93, language: 'Spanish', bio: 'Musician and philosopher. Deep talks welcome 🎸', interests: ['Music', 'Philosophy', 'Art'] },
  { name: 'Lena', age: 23, seed: 'Lena', bg: 'ffdfbf', flag: '🇩🇪', rating: 96, language: 'German', bio: 'Engineering student who loves hiking and cooking', interests: ['Tech', 'Cooking', 'Travel', 'Sports'] },
  { name: 'Dilshoda', age: 20, seed: 'Dilshoda', bg: 'b6e3f4', flag: '🇺🇿', rating: 99, language: 'Uzbek', bio: 'Dreamer ✨ Learning English to see the world!', interests: ['Languages', 'Movies', 'Music'] },
  { name: 'Amin', age: 26, seed: 'Amin', bg: 'b6e3f4', flag: '🇦🇿', rating: 97, language: 'English', bio: 'Software dev. Love discussing tech, AI, and startups 🚀', interests: ['Tech', 'Science', 'Books', 'Gaming'] },
];

// ══════════════════════════════════════════════════
// DOM REFS
// ══════════════════════════════════════════════════

const findPartnerBtn   = document.getElementById('findPartnerBtn');
const searchingOverlay = document.getElementById('searchingOverlay');
const cancelSearchBtn  = document.getElementById('cancelSearchBtn');
const matchFoundOverlay= document.getElementById('matchFoundOverlay');
const acceptCallBtn    = document.getElementById('acceptCallBtn');
const skipMatchBtn     = document.getElementById('skipMatchBtn');
const refreshBtn       = document.getElementById('refreshBtn');
const refreshIcon      = document.getElementById('refreshIcon');
const filterTopBtn     = document.getElementById('filterTopBtn');
const filterOverlay    = document.getElementById('filterOverlay');
const filterSheet      = document.getElementById('filterSheet');
const closeFilterBtn   = document.getElementById('closeFilterBtn');
const applyFilterBtn   = document.getElementById('applyFilterBtn');
const readyCardsEl     = document.getElementById('readyCards');
const inviteListEl     = document.getElementById('inviteList');
const rateCard         = document.getElementById('rateCard');
const genderToggle     = document.getElementById('genderToggle');
const filterInterests  = document.getElementById('filterInterests');
const countdownCircle  = document.getElementById('countdownCircle');
const countdownNum     = document.getElementById('countdownNum');
const radarAvatars     = document.getElementById('radarAvatars');
const previewOverlay   = document.getElementById('previewOverlay');
const previewSheet     = document.getElementById('previewSheet');
const closePreviewBtn  = document.getElementById('closePreviewBtn');

const discoveryOverlay = document.getElementById('discoveryOverlay');
const discoveryDeck    = document.getElementById('discoveryDeck');
const closeDiscoveryBtn= document.getElementById('closeDiscoveryBtn');
const discSkipBtn      = document.getElementById('discSkipBtn');
const discLikeBtn      = document.getElementById('discLikeBtn');
const discSuperBtn     = document.getElementById('discSuperBtn');

let activeFilters = [];
let matchIndex = 0;
let discProfileIndex = 0;
let countdownInterval = null;

// ══════════════════════════════════════════════════
// RENDER
// ══════════════════════════════════════════════════

function avatarUrl(seed, bg) {
  return `https://api.dicebear.com/7.x/adventurer/svg?seed=${encodeURIComponent(seed)}&backgroundColor=${bg}`;
}

function renderReadyCards() {
  readyCardsEl.innerHTML = '';
  READY_USERS.forEach(u => {
    const el = document.createElement('div');
    el.className = 'partner-card';
    el.innerHTML = `
      <div class="avatar-wrap" style="width:64px;height:64px;margin:0 auto var(--space-3)">
        ${u.noAvatar
          ? `<div style="width:64px;height:64px;border-radius:50%;background:var(--color-surface-raised);display:flex;align-items:center;justify-content:center"><i class="fas fa-user" style="font-size:24px;color:var(--color-text-muted)"></i></div>`
          : `<img src="${avatarUrl(u.seed, u.bg)}" class="avatar" style="width:64px;height:64px" alt="${u.name}" />`
        }
        ${u.flag ? `<span class="flag-dot">${u.flag}</span>` : ''}
        <span class="online-dot"></span>
      </div>
      <p class="partner-card-name">${u.name}</p>
      <p class="partner-card-meta">👍 ${u.rating}% · ${u.gender}</p>
      <button class="talk-btn">Talk now</button>
    `;
    el.querySelector('.talk-btn').addEventListener('click', (e) => {
      e.stopPropagation();
      showToast('Connecting…');
      setTimeout(() => window.location.href = 'call.html', 800);
    });
    el.addEventListener('click', () => openPreview(u));
    readyCardsEl.appendChild(el);
  });
}

function renderInviteList() {
  inviteListEl.innerHTML = '';
  INVITE_USERS.forEach(u => {
    const el = document.createElement('div');
    el.className = 'invite-row';
    el.innerHTML = `
      <div class="avatar-wrap" style="width:48px;height:48px">
        <img src="${avatarUrl(u.seed, u.bg)}" class="avatar" style="width:48px;height:48px" alt="${u.name}" />
        <span class="invite-flag">${u.flag}</span>
      </div>
      <div class="invite-info">
        <p class="invite-name">${u.name}</p>
        <p class="invite-meta">👍 ${u.rating}% · ${u.gender} · ${u.language} · ${u.talks} talks</p>
      </div>
      <button class="invite-call-btn" aria-label="Call ${u.name}">
        <i class="fas fa-phone"></i>
      </button>
    `;
    el.querySelector('.invite-call-btn').addEventListener('click', (e) => {
      e.stopPropagation();
      showToast(`Calling ${u.name}…`);
      setTimeout(() => window.location.href = 'call.html', 800);
    });
    el.addEventListener('click', () => openPreview(u));
    inviteListEl.appendChild(el);
  });
}

function renderFilterInterests() {
  if (!filterInterests) return;
  filterInterests.innerHTML = '';
  INTERESTS_DATA.forEach(int => {
    const isSelected = activeFilters.includes(int.id);
    const el = document.createElement('button');
    el.className = `chip chip-cat-${int.cat}${isSelected ? ' chip-selected' : ''}`;
    el.innerHTML = `<i class="fas ${int.icon} chip-icon"></i> ${int.name}`;
    el.addEventListener('click', () => {
      if (activeFilters.includes(int.id)) {
        activeFilters = activeFilters.filter(id => id !== int.id);
      } else {
        activeFilters.push(int.id);
      }
      renderFilterInterests();
    });
    filterInterests.appendChild(el);
  });
}

function renderRadarAvatars() {
  radarAvatars.innerHTML = '';
  const positions = [
    { top: '8%', left: '50%' }, { top: '25%', right: '5%' },
    { bottom: '25%', right: '8%' }, { bottom: '5%', left: '45%' },
    { bottom: '20%', left: '5%' }, { top: '20%', left: '8%' },
  ];
  MATCH_CANDIDATES.concat(READY_USERS.slice(0, 2)).forEach((u, i) => {
    if (i >= positions.length) return;
    const img = document.createElement('img');
    img.src = avatarUrl(u.seed, u.bg || 'c0aede');
    img.className = 'radar-avatar';
    img.alt = '';
    Object.assign(img.style, positions[i]);
    img.style.animationDelay = `${i * 0.5}s`;
    radarAvatars.appendChild(img);
  });
}

// ══════════════════════════════════════════════════
// STATE MACHINE
// ══════════════════════════════════════════════════

function startSearching() {
  renderRadarAvatars();
  searchingOverlay.classList.add('active');
  // Simulate finding a match after 2-4 seconds
  const delay = 2000 + Math.random() * 2000;
  setTimeout(() => {
    if (!searchingOverlay.classList.contains('active')) return;
    searchingOverlay.classList.remove('active');
    showMatchFound();
  }, delay);
}

function cancelSearching() {
  searchingOverlay.classList.remove('active');
}

function showMatchFound() {
  const match = MATCH_CANDIDATES[matchIndex % MATCH_CANDIDATES.length];
  matchIndex++;

  document.getElementById('matchAvatar').src = avatarUrl(match.seed, match.bg);
  document.getElementById('matchName').textContent = `${match.name}, ${match.age}`;
  document.getElementById('matchFlag').textContent = match.flag;
  document.getElementById('matchRating').innerHTML = `<i class="fas fa-thumbs-up"></i> ${match.rating}%`;

  const interestsEl = document.getElementById('matchInterests');
  interestsEl.innerHTML = '';
  match.interests.forEach(int => {
    const chip = document.createElement('span');
    const isShared = match.shared.includes(int);
    chip.className = `chip chip-sm${isShared ? ' match-interest-shared' : ''}`;
    chip.textContent = int;
    interestsEl.appendChild(chip);
  });

  matchFoundOverlay.classList.add('active');
  startCountdown(8);
}

function startCountdown(seconds) {
  let remaining = seconds;
  const circumference = 2 * Math.PI * 46; // r=46
  countdownCircle.style.strokeDasharray = circumference;
  countdownCircle.style.strokeDashoffset = '0';
  countdownNum.textContent = remaining;

  clearInterval(countdownInterval);
  countdownInterval = setInterval(() => {
    remaining--;
    countdownNum.textContent = remaining;
    const progress = ((seconds - remaining) / seconds) * circumference;
    countdownCircle.style.strokeDashoffset = progress;

    if (remaining <= 0) {
      clearInterval(countdownInterval);
      skipMatch();
    }
  }, 1000);
}

function skipMatch() {
  clearInterval(countdownInterval);
  matchFoundOverlay.classList.remove('active');
  setTimeout(() => startSearching(), 300);
}

function acceptCall() {
  clearInterval(countdownInterval);
  matchFoundOverlay.classList.remove('active');
  window.location.href = 'call.html';
}

function showPostCall() {
  rateCard.style.display = '';
  rateCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// ══════════════════════════════════════════════════
// FILTER SHEET
// ══════════════════════════════════════════════════

function openFilter() {
  filterOverlay.classList.add('open');
  filterSheet.classList.add('open');
  renderFilterInterests();
}

function closeFilter() {
  filterOverlay.classList.remove('open');
  filterSheet.classList.remove('open');
}

// ══════════════════════════════════════════════════
// PREVIEW SHEET
// ══════════════════════════════════════════════════

function openPreview(user) {
  document.getElementById('previewAvatar').src = avatarUrl(user.seed, user.bg || 'c0aede');
  document.getElementById('previewName').textContent = user.name;
  document.getElementById('previewAge').textContent = user.age ? `, ${user.age}` : '';
  document.getElementById('previewUsername').textContent = `@${user.seed?.toLowerCase() || user.name.toLowerCase()}`;
  document.getElementById('previewLanguage').textContent = user.language || 'English';
  document.getElementById('previewLocation').textContent = user.flag || '🌍';
  document.getElementById('previewBio').textContent = user.bio || 'Loves good conversations and meeting new people.';

  const interestsEl = document.getElementById('previewInterests');
  interestsEl.innerHTML = '';
  (user.interests || ['Languages', 'Travel']).forEach(int => {
    const chip = document.createElement('span');
    chip.className = 'chip chip-sm';
    chip.textContent = int;
    interestsEl.appendChild(chip);
  });

  previewOverlay.classList.add('open');
  previewSheet.classList.add('open');
}

function closePreview() {
  previewOverlay.classList.remove('open');
  previewSheet.classList.remove('open');
}

// ══════════════════════════════════════════════════
// RATE CARD
// ══════════════════════════════════════════════════

let rateChosen = 0;
let rateTags = [];

document.getElementById('rateStars')?.addEventListener('click', (e) => {
  const btn = e.target.closest('.star-btn');
  if (!btn) return;
  rateChosen = parseInt(btn.dataset.star);
  document.querySelectorAll('.star-btn').forEach((s, i) => {
    s.classList.toggle('active', i < rateChosen);
  });
});

document.getElementById('rateTags')?.addEventListener('click', (e) => {
  const chip = e.target.closest('.chip');
  if (!chip) return;
  chip.classList.toggle('chip-selected');
});

document.getElementById('rateSubmitBtn')?.addEventListener('click', () => {
  rateCard.style.display = 'none';
  showToast(rateChosen > 0 ? `Rated ${rateChosen}⭐ — Thanks!` : 'Thanks for the feedback!');
  setTimeout(() => startSearching(), 500);
});

document.getElementById('rateSkipBtn')?.addEventListener('click', () => {
  rateCard.style.display = 'none';
});

// ══════════════════════════════════════════════════
// GENDER TOGGLE
// ══════════════════════════════════════════════════

genderToggle?.addEventListener('click', (e) => {
  const btn = e.target.closest('.gender-btn');
  if (!btn) return;
  genderToggle.querySelectorAll('.gender-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
});

// ══════════════════════════════════════════════════
// NAVIGATION
// ══════════════════════════════════════════════════

const NAV_ROUTES = {
  lobby: 'home.html',
  groups: 'groups.html',
  ranking: 'ranking.html',
  contacts: 'contacts.html',
  profile: 'profile.html',
};

document.querySelectorAll('.tab-item').forEach(item => {
  item.addEventListener('click', () => {
    const tab = item.dataset.tab;
    if (tab !== 'lobby' && NAV_ROUTES[tab]) {
      window.location.href = NAV_ROUTES[tab];
    }
  });
});

// ══════════════════════════════════════════════════
// EVENT LISTENERS
// ══════════════════════════════════════════════════

findPartnerBtn.addEventListener('click', startSearching);
const discoverBtn = document.getElementById('discoverBtn');
discoverBtn?.addEventListener('click', openDiscovery);
cancelSearchBtn.addEventListener('click', cancelSearching);
acceptCallBtn.addEventListener('click', acceptCall);
skipMatchBtn.addEventListener('click', skipMatch);
document.getElementById('reportMatchBtn')?.addEventListener('click', () => {
  showToast('User reported. Thank you.');
  skipMatch();
});

filterTopBtn.addEventListener('click', openFilter);
filterOverlay.addEventListener('click', closeFilter);
closeFilterBtn.addEventListener('click', closeFilter);
applyFilterBtn.addEventListener('click', () => {
  closeFilter();
  showToast('Filters applied ✓');
});

closePreviewBtn?.addEventListener('click', closePreview);
previewOverlay?.addEventListener('click', closePreview);

document.getElementById('previewFollowBtn')?.addEventListener('click', function() {
  const icon = this.querySelector('i');
  const text = this.querySelector('span');
  if (this.classList.contains('followed')) {
    this.classList.remove('followed');
    icon.className = 'fas fa-user-plus';
    text.textContent = 'Add Friend';
    showToast('Removed from friends');
  } else {
    this.classList.add('followed');
    icon.className = 'fas fa-user-check';
    text.textContent = 'Friends';
    showToast('Friend request sent!');
  }
});

refreshBtn.addEventListener('click', () => {
  refreshIcon.classList.add('animate-spin');
  setTimeout(() => {
    refreshIcon.classList.remove('animate-spin');
    showToast('Partners refreshed!');
  }, 700);
});

// ══════════════════════════════════════════════════
// TOAST
// ══════════════════════════════════════════════════

function showToast(msg) {
  const existing = document.querySelector('.toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = msg;
  document.body.appendChild(toast);

  requestAnimationFrame(() => {
    requestAnimationFrame(() => toast.classList.add('show'));
  });

  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  }, 2200);
}

// ══════════════════════════════════════════════════
// INIT
// ══════════════════════════════════════════════════

renderReadyCards();
renderInviteList();


// ══════════════════════════════════════════════════
// DISCOVERY DECK (Tinder-like swiping)
// ══════════════════════════════════════════════════

function openDiscovery() {
  discProfileIndex = 0;
  renderDiscoveryCards();
  discoveryOverlay.classList.add('active');
}

function closeDiscovery() {
  discoveryOverlay.classList.remove('active');
}

closeDiscoveryBtn?.addEventListener('click', closeDiscovery);
document.getElementById('discoveryFilterBtn')?.addEventListener('click', () => {
  closeDiscovery();
  setTimeout(openFilter, 200);
});

function renderDiscoveryCards() {
  discoveryDeck.innerHTML = '';

  const remaining = DISCOVERY_PROFILES.slice(discProfileIndex);
  if (remaining.length === 0) {
    discoveryDeck.innerHTML = `
      <div class="disc-empty">
        <i class="fas fa-heart-crack"></i>
        <p>No more profiles</p>
        <button class="btn btn-primary btn-sm" id="discResetBtn">Start Over</button>
      </div>`;
    document.getElementById('discResetBtn')?.addEventListener('click', () => {
      discProfileIndex = 0;
      renderDiscoveryCards();
    });
    return;
  }

  // Render up to 3 stacked cards (top card first in DOM)
  const visible = remaining.slice(0, 3);
  visible.forEach((profile, i) => {
    const card = createDiscCard(profile, i);
    discoveryDeck.appendChild(card);
  });

  // Attach swipe gestures to the top card
  attachSwipeGesture(discoveryDeck.firstElementChild);
}

function createDiscCard(profile, stackIndex) {
  const card = document.createElement('div');
  card.className = 'disc-card';

  card.innerHTML = `
    <div class="disc-card-cover">
      <img src="${avatarUrl(profile.seed, profile.bg)}" class="disc-card-img" alt="${profile.name}" />
      <div class="disc-card-gradient"></div>
      <div class="disc-stamp disc-stamp-like">LIKE</div>
      <div class="disc-stamp disc-stamp-nope">NOPE</div>
      <div class="disc-card-info">
        <h3 class="disc-card-name">${profile.name}, ${profile.age} ${profile.flag}</h3>
        <div class="disc-card-meta">
          <span class="badge">👍 ${profile.rating}%</span>
          <span class="badge">${profile.language}</span>
        </div>
        <p class="disc-card-bio">${profile.bio}</p>
        <div class="disc-card-tags">
          ${profile.interests.map(i => `<span class="chip">${i}</span>`).join('')}
        </div>
      </div>
    </div>
  `;

  return card;
}

// ── Swipe Gesture Engine ──────────────────────────
function attachSwipeGesture(card) {
  if (!card) return;

  let startX = 0, startY = 0, currentX = 0, currentY = 0;
  let isDragging = false;
  const likeStamp = card.querySelector('.disc-stamp-like');
  const nopeStamp = card.querySelector('.disc-stamp-nope');

  function onStart(e) {
    isDragging = true;
    const point = e.touches ? e.touches[0] : e;
    startX = point.clientX;
    startY = point.clientY;
    card.style.transition = 'none';
  }

  function onMove(e) {
    if (!isDragging) return;
    const point = e.touches ? e.touches[0] : e;
    currentX = point.clientX - startX;
    currentY = point.clientY - startY;

    const rotate = currentX * 0.08;
    card.style.transform = `translate(${currentX}px, ${currentY}px) rotate(${rotate}deg)`;

    // Show like/nope stamps based on direction
    const progress = Math.min(Math.abs(currentX) / 120, 1);
    if (currentX > 0) {
      likeStamp.style.opacity = progress;
      nopeStamp.style.opacity = 0;
    } else {
      nopeStamp.style.opacity = progress;
      likeStamp.style.opacity = 0;
    }
  }

  function onEnd() {
    if (!isDragging) return;
    isDragging = false;
    card.style.transition = '';

    const threshold = 100;
    if (currentX > threshold) {
      swipeCard('right');
    } else if (currentX < -threshold) {
      swipeCard('left');
    } else {
      // Snap back
      card.style.transform = '';
      likeStamp.style.opacity = 0;
      nopeStamp.style.opacity = 0;
    }
    currentX = 0;
    currentY = 0;
  }

  card.addEventListener('pointerdown', onStart);
  card.addEventListener('pointermove', onMove);
  card.addEventListener('pointerup', onEnd);
  card.addEventListener('pointerleave', onEnd);
}

function swipeCard(direction) {
  const topCard = discoveryDeck.firstElementChild;
  if (!topCard || topCard.classList.contains('disc-empty')) return;

  const className = direction === 'right' ? 'swipe-right'
                  : direction === 'up' ? 'swipe-up'
                  : 'swipe-left';

  topCard.classList.add(className);

  const label = direction === 'right' ? '❤️ Liked!'
              : direction === 'up' ? '⭐ Super Liked!'
              : 'Skipped';
  showToast(label);

  setTimeout(() => {
    discProfileIndex++;
    renderDiscoveryCards();
  }, 400);
}

// ── Discovery Action Buttons ─────────────────────
discSkipBtn?.addEventListener('click', () => swipeCard('left'));
discLikeBtn?.addEventListener('click', () => swipeCard('right'));
discSuperBtn?.addEventListener('click', () => swipeCard('up'));
