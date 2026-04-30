/* =============================================
   Like-Minded — Call (call.js)
   Supports ?mode=group for group grid view
   and default 1-on-1 view.
   ============================================= */

'use strict';

const urlParams = new URLSearchParams(window.location.search);
const callMode = urlParams.get('mode') || 'oneone'; // 'oneone' | 'group'
const isAdmin = urlParams.get('role') === 'admin';
const roomName = urlParams.get('room') || '';

// ── Group participants data ────────────────────────
const GROUP_PARTICIPANTS = [
    { id: '1', name: 'You', role: isAdmin ? 'Host' : 'Listener', seed: 'You', bg: 'c0aede', isMuted: false, isSpeaking: false, isHost: isAdmin },
    { id: '2', name: '🐼 Mr.Alex 🐼', role: 'Speaker', seed: 'Alex', bg: 'ffd5dc', isMuted: false, isSpeaking: true, isHost: !isAdmin },
    { id: '3', name: 'Maria 🇬🇧', role: 'Speaker', seed: 'Maria', bg: 'b6e3f4', isMuted: false, isSpeaking: false },
    { id: '4', name: 'James', role: 'Listener', seed: 'James', bg: 'd1d4f9', isMuted: true, isSpeaking: false },
    { id: '5', name: 'Lena', role: 'Listener', seed: 'Lena', bg: 'ffdfbf', isMuted: true, isSpeaking: false },
    { id: '6', name: 'Carlos', role: 'Listener', seed: 'Carlos', bg: 'c0aede', isMuted: true, isSpeaking: false },
];

// ── DOM refs ───────────────────────────────────────
let callSeconds = 0;
let isLocalMuted = false;
let isSpeakerOn = true;

const timerEl = document.getElementById('callTimer');
const micBtn = document.getElementById('micBtn');
const speakerBtn = document.getElementById('speakerBtn');
const endCallBtn = document.getElementById('endCallBtn');
const likeBtn = document.getElementById('likeBtn');
const addFriendBtn = document.getElementById('addFriendBtn');
const giftBtn = document.getElementById('giftBtn');
const yourMicBadge = document.getElementById('yourMicBadge');
const yourSpeakRing = document.getElementById('yourSpeakRing');
const partnerSpeakRing = document.getElementById('partnerSpeakRing');
const waveBars = document.querySelectorAll('.wave-bar');

const oneoneView = document.getElementById('oneoneView');
const groupView = document.getElementById('groupView');
const groupGrid = document.getElementById('groupGrid');
const memberCount = document.getElementById('memberCount');
const memberNum = document.getElementById('memberNum');
const roomTitle = document.getElementById('roomTitle');

// Mod sheet refs
const modOverlay = document.getElementById('modOverlay');
const modSheet = document.getElementById('modSheet');
let activeTargetId = null;

function avatarUrl(seed, bg) {
    return `https://api.dicebear.com/7.x/adventurer/svg?seed=${encodeURIComponent(seed)}&backgroundColor=${bg}`;
}


// ═══════════════════════════════════════════════════
// INIT — Switch between 1-on-1 and Group mode
// ═══════════════════════════════════════════════════

if (callMode === 'group') {
    // Group mode
    oneoneView.style.display = 'none';
    groupView.style.display = '';
    document.getElementById('callSocial').style.display = 'none';
    memberCount.style.display = '';
    memberNum.textContent = GROUP_PARTICIPANTS.length;
    roomTitle.textContent = roomName || 'Voice Room';
    renderGroupGrid();
} else {
    // 1-on-1 mode (default)
    oneoneView.style.display = '';
    groupView.style.display = 'none';
    memberCount.style.display = 'none';
    roomTitle.textContent = '1-on-1 Call';
}


// ═══════════════════════════════════════════════════
// GROUP GRID RENDERING
// ═══════════════════════════════════════════════════

/**
 * renderGroupGrid() — Full DOM build. Call ONCE on init,
 * or when participants are added/removed/muted.
 */
function renderGroupGrid() {
    groupGrid.innerHTML = '';
    memberNum.textContent = GROUP_PARTICIPANTS.length;

    GROUP_PARTICIPANTS.forEach(p => {
        const tile = document.createElement('div');
        tile.className = `group-tile${p.isSpeaking && !p.isMuted ? ' is-speaking' : ''}`;
        tile.dataset.id = p.id;

        tile.innerHTML = `
      ${p.isHost ? '<span class="tile-crown"><i class="fas fa-crown"></i></span>' : ''}
      <div class="tile-avatar-wrap">
        <div class="tile-speak-ring"></div>
        <img src="${avatarUrl(p.seed, p.bg)}" class="tile-avatar" alt="${p.name}" />
        <div class="tile-mic${p.isMuted ? ' muted' : ''}">
          <i class="fas fa-${p.isMuted ? 'microphone-slash' : 'microphone'}"></i>
        </div>
      </div>
      <p class="tile-name">${p.name}</p>
      <p class="tile-role ${p.isHost ? 'tile-role-host' : ''}">${p.isHost ? 'Host' : p.role}</p>
    `;

        // Tap tile to open mod sheet (except for yourself)
        tile.addEventListener('click', () => {
            if (p.id !== '1') openModSheet(p);
        });

        groupGrid.appendChild(tile);
    });
}

/**
 * updateGroupStates() — Lightweight update that only toggles
 * CSS classes on existing tiles. No DOM rebuild, no image reload,
 * no re-triggered entrance animations. Call this for status changes
 * like speaking/listening toggling.
 */
function updateGroupStates() {
    GROUP_PARTICIPANTS.forEach(p => {
        const tile = groupGrid.querySelector(`[data-id="${p.id}"]`);
        if (!tile) return;

        // Toggle speaking state via CSS class (border glow + ring)
        const shouldSpeak = p.isSpeaking && !p.isMuted;
        tile.classList.toggle('is-speaking', shouldSpeak);

        // Update mute badge if it changed
        const micEl = tile.querySelector('.tile-mic');
        if (micEl) {
            micEl.classList.toggle('muted', p.isMuted);
            const icon = micEl.querySelector('i');
            if (icon) {
                icon.className = p.isMuted
                    ? 'fas fa-microphone-slash'
                    : 'fas fa-microphone';
            }
        }
    });
}


// ═══════════════════════════════════════════════════
// MOD SHEET (group mode)
// ═══════════════════════════════════════════════════

function openModSheet(user) {
    activeTargetId = user.id;
    document.getElementById('modAvatar').src = avatarUrl(user.seed, user.bg);
    document.getElementById('modName').textContent = user.name;
    document.getElementById('modMeta').textContent = `${user.role} · Tap to interact`;

    // Show admin actions only if current user is admin/host
    const forceMute = document.getElementById('actionForceMute');
    const kick = document.getElementById('actionKick');
    if (isAdmin) {
        forceMute.style.display = '';
        kick.style.display = '';
        forceMute.innerHTML = user.isMuted
            ? '<i class="fas fa-microphone"></i> Unmute'
            : '<i class="fas fa-microphone-slash"></i> Force Mute';
    } else {
        forceMute.style.display = 'none';
        kick.style.display = 'none';
    }

    modOverlay.classList.add('open');
    modSheet.classList.add('open');
}

function closeModSheet() {
    modOverlay.classList.remove('open');
    modSheet.classList.remove('open');
    activeTargetId = null;
}

modOverlay?.addEventListener('click', closeModSheet);

document.getElementById('actionForceMute')?.addEventListener('click', () => {
    const user = GROUP_PARTICIPANTS.find(p => p.id === activeTargetId);
    if (user) {
        user.isMuted = !user.isMuted;
        if (user.isMuted) user.isSpeaking = false;
        updateGroupStates();
        showToast(user.isMuted ? `${user.name} was muted.` : `${user.name} was unmuted.`);
    }
    closeModSheet();
});

document.getElementById('actionKick')?.addEventListener('click', () => {
    const idx = GROUP_PARTICIPANTS.findIndex(p => p.id === activeTargetId);
    if (idx > -1) {
        const name = GROUP_PARTICIPANTS[idx].name;
        GROUP_PARTICIPANTS.splice(idx, 1);
        // Participant removed — need full rebuild for this case
        renderGroupGrid();
        showToast(`${name} was removed from the room.`);
    }
    closeModSheet();
});

document.getElementById('actionLocalMute')?.addEventListener('click', () => {
    showToast('User muted for you.');
    closeModSheet();
});

document.getElementById('actionViewProfile')?.addEventListener('click', () => {
    showToast('Profile coming soon.');
    closeModSheet();
});

document.getElementById('actionAddFriend')?.addEventListener('click', () => {
    showToast('Friend request sent!');
    closeModSheet();
});

document.getElementById('actionLike')?.addEventListener('click', () => {
    showToast('❤️ Liked!');
    closeModSheet();
});

document.getElementById('actionGift')?.addEventListener('click', () => {
    showToast('🎁 Gifts coming soon!');
    closeModSheet();
});

document.getElementById('actionBlock')?.addEventListener('click', () => {
    showToast('User blocked.');
    closeModSheet();
});


// ═══════════════════════════════════════════════════
// CALL TIMER
// ═══════════════════════════════════════════════════

setInterval(() => {
    callSeconds++;
    const m = Math.floor(callSeconds / 60).toString().padStart(2, '0');
    const s = (callSeconds % 60).toString().padStart(2, '0');
    timerEl.textContent = `${m}:${s}`;
}, 1000);


// ═══════════════════════════════════════════════════
// SPEAKING SIMULATION
// ═══════════════════════════════════════════════════

setInterval(() => {
    if (callMode === 'group') {
        // Group: randomly toggle speaking among unmuted non-you participants
        const unmuted = GROUP_PARTICIPANTS.filter(p => !p.isMuted && p.id !== '1');
        GROUP_PARTICIPANTS.forEach(p => { if (p.id !== '1') p.isSpeaking = false; });
        if (unmuted.length > 0) {
            const speaker = unmuted[Math.floor(Math.random() * unmuted.length)];
            speaker.isSpeaking = Math.random() > 0.3;
        }
        // Only toggle classes — no DOM rebuild
        updateGroupStates();
    } else {
        // 1-on-1: toggle partner speaking
        const partnerSpeaking = Math.random() > 0.35;
        partnerSpeakRing.classList.toggle('active', partnerSpeaking);
        waveBars.forEach(bar => {
            bar.style.animationPlayState = partnerSpeaking ? 'running' : 'paused';
        });
        if (!isLocalMuted) {
            const youSpeaking = !partnerSpeaking && Math.random() > 0.4;
            yourSpeakRing?.classList.toggle('active', youSpeaking);
        }
    }
}, 2500);


// ═══════════════════════════════════════════════════
// CONTROLS
// ═══════════════════════════════════════════════════

micBtn.addEventListener('click', () => {
    isLocalMuted = !isLocalMuted;
    if (isLocalMuted) {
        micBtn.classList.add('active');
        micBtn.innerHTML = '<i class="fas fa-microphone-slash"></i>';
        if (yourMicBadge) {
            yourMicBadge.classList.add('muted');
            yourMicBadge.innerHTML = '<i class="fas fa-microphone-slash"></i>';
        }
        yourSpeakRing?.classList.remove('active');
        // Update group data too
        const me = GROUP_PARTICIPANTS.find(p => p.id === '1');
        if (me) { me.isMuted = true; me.isSpeaking = false; }
        if (callMode === 'group') updateGroupStates();
    } else {
        micBtn.classList.remove('active');
        micBtn.innerHTML = '<i class="fas fa-microphone"></i>';
        if (yourMicBadge) {
            yourMicBadge.classList.remove('muted');
            yourMicBadge.innerHTML = '<i class="fas fa-microphone"></i>';
        }
        const me = GROUP_PARTICIPANTS.find(p => p.id === '1');
        if (me) me.isMuted = false;
        if (callMode === 'group') updateGroupStates();
    }
});

speakerBtn.addEventListener('click', () => {
    isSpeakerOn = !isSpeakerOn;
    if (!isSpeakerOn) {
        speakerBtn.classList.add('active');
        speakerBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
        showToast('Speaker muted');
    } else {
        speakerBtn.classList.remove('active');
        speakerBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
        showToast('Speaker on');
    }
});

endCallBtn.addEventListener('click', () => {
    // Group → back to groups, 1-on-1 → back to lobby
    window.location.href = callMode === 'group' ? 'groups.html' : 'home.html';
});


// ═══════════════════════════════════════════════════
// SOCIAL ACTIONS
// ═══════════════════════════════════════════════════

likeBtn.addEventListener('click', () => {
    likeBtn.classList.toggle('liked');
    likeBtn.classList.toggle('active');
    showToast(likeBtn.classList.contains('liked') ? '❤️ Liked!' : 'Like removed');
});

addFriendBtn.addEventListener('click', () => {
    addFriendBtn.classList.toggle('active');
    showToast(addFriendBtn.classList.contains('active') ? 'Friend request sent!' : 'Request cancelled');
});

giftBtn.addEventListener('click', () => {
    showToast('🎁 Gifts coming soon!');
});

document.getElementById('reportCallBtn')?.addEventListener('click', () => {
    showToast('User reported. Thank you.');
});


// ═══════════════════════════════════════════════════
// TOAST
// ═══════════════════════════════════════════════════

function showToast(msg) {
    const existing = document.querySelector('.toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = msg;
    Object.assign(toast.style, {
        position: 'fixed', bottom: '140px', left: '50%',
        transform: 'translateX(-50%)', background: 'rgba(255,255,255,0.95)',
        color: '#0F0E1A', padding: '12px 24px', borderRadius: '50px',
        fontSize: '14px', fontWeight: '700', zIndex: '200',
        boxShadow: '0 10px 25px rgba(0,0,0,0.3)', whiteSpace: 'nowrap',
        opacity: '0', transition: 'opacity 0.25s, transform 0.25s'
    });
    document.body.appendChild(toast);
    requestAnimationFrame(() => { toast.style.opacity = '1'; });
    setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => toast.remove(), 300);
    }, 2000);
}
