/* =============================================
   Like-Minded — Profile (profile.js)
   ============================================= */
'use strict';

// Theme toggle
const themeToggleBtn = document.getElementById('themeToggleBtn');
const settingsTheme = document.getElementById('settingsTheme');

function toggleTheme() {
  const html = document.documentElement;
  const isDark = html.getAttribute('data-theme') === 'dark';
  html.setAttribute('data-theme', isDark ? 'light' : 'dark');
  themeToggleBtn.innerHTML = isDark ? '<i class="fas fa-moon"></i>' : '<i class="fas fa-sun"></i>';
  const val = settingsTheme?.querySelector('.settings-value');
  if (val) val.innerHTML = isDark ? 'Light <i class="fas fa-chevron-right"></i>' : 'Dark <i class="fas fa-chevron-right"></i>';
  localStorage.setItem('lm-theme', isDark ? 'light' : 'dark');
}

// Load saved theme
const savedTheme = localStorage.getItem('lm-theme');
if (savedTheme === 'dark') {
  document.documentElement.setAttribute('data-theme', 'dark');
  themeToggleBtn.innerHTML = '<i class="fas fa-sun"></i>';
  const val = settingsTheme?.querySelector('.settings-value');
  if (val) val.innerHTML = 'Dark <i class="fas fa-chevron-right"></i>';
}

themeToggleBtn?.addEventListener('click', toggleTheme);
settingsTheme?.addEventListener('click', toggleTheme);

// Voice intro play/pause simulation
const voiceBtn = document.getElementById('voiceIntroBtn');
let isPlaying = false;

voiceBtn?.addEventListener('click', () => {
  isPlaying = !isPlaying;
  voiceBtn.classList.toggle('playing', isPlaying);
  const icon = voiceBtn.querySelector('.voice-intro-icon i');
  icon.className = isPlaying ? 'fas fa-pause' : 'fas fa-play';
  if (isPlaying) {
    setTimeout(() => {
      voiceBtn.classList.remove('playing');
      icon.className = 'fas fa-play';
      isPlaying = false;
    }, 12000);
  }
});

// Edit profile sheet
const editProfileOverlay = document.getElementById('editProfileOverlay');
const editProfileSheet = document.getElementById('editProfileSheet');

document.getElementById('editProfileBtn')?.addEventListener('click', () => {
  editProfileOverlay.classList.add('open');
  editProfileSheet.classList.add('open');
});

const closeEditProfile = () => {
  editProfileOverlay.classList.remove('open');
  editProfileSheet.classList.remove('open');
};

document.getElementById('closeEditProfileBtn')?.addEventListener('click', closeEditProfile);
editProfileOverlay?.addEventListener('click', closeEditProfile);
document.getElementById('saveProfileBtn')?.addEventListener('click', () => {
  showToast('Profile updated!');
  closeEditProfile();
});

// Matching preferences sheet
const matchingOverlay = document.getElementById('matchingOverlay');
const matchingSheet = document.getElementById('matchingSheet');

document.getElementById('settingsMatching')?.addEventListener('click', () => {
  matchingOverlay.classList.add('open');
  matchingSheet.classList.add('open');
});

const closeMatching = () => {
  matchingOverlay.classList.remove('open');
  matchingSheet.classList.remove('open');
};

document.getElementById('closeMatchingBtn')?.addEventListener('click', closeMatching);
matchingOverlay?.addEventListener('click', closeMatching);
document.getElementById('saveMatchingBtn')?.addEventListener('click', () => {
  showToast('Matching preferences saved!');
  closeMatching();
});

// Nav
document.querySelectorAll('.tab-item').forEach(item => {
  item.addEventListener('click', () => {
    const routes = { lobby:'home.html', groups:'groups.html', ranking:'ranking.html', contacts:'contacts.html', profile:'profile.html' };
    const tab = item.dataset.tab;
    if (tab !== 'profile' && routes[tab]) window.location.href = routes[tab];
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
  setTimeout(() => { toast.classList.remove('show'); setTimeout(() => toast.remove(), 300); }, 2200);
}
