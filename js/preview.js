'use strict';

const previewOverlay = document.getElementById('previewOverlay');
const previewSheet = document.getElementById('previewSheet');
const closePreviewBtn = document.getElementById('closePreviewBtn');
const previewFollowBtn = document.getElementById('previewFollowBtn');

let currentPreviewUser = null;
let followedUsers = new Set(); // Mock database for following status

// Function exposed globally to open the preview modal
window.openUserPreview = function(user) {
    if(!previewOverlay || !previewSheet) return;
    
    currentPreviewUser = user;
    
    // Populate text data
    document.getElementById('previewName').textContent = user.name || 'Unknown';
    document.getElementById('previewAge').textContent = user.age ? `, ${user.age}` : '';
    document.getElementById('previewUsername').textContent = `@${(user.seed || 'user').toLowerCase()}_user`;
    
    // Avatar
    const bg = user.bg || 'b6e3f4';
    const seed = user.seed || 'User';
    document.getElementById('previewAvatar').src = `https://api.dicebear.com/7.x/adventurer/svg?seed=${seed}&backgroundColor=${bg}`;
    
    // Details
    document.getElementById('previewInstitution').textContent = user.institution || 'TalkMate User';
    document.getElementById('previewLevel').textContent = user.level || 'A1';
    document.getElementById('previewBio').textContent = user.bio || "This user hasn't written a bio yet. Follow them to start a conversation!";
    
    // Interests
    const interestsContainer = document.getElementById('previewInterests');
    interestsContainer.innerHTML = '';
    const hobbies = user.hobbies || ['Chatting', 'Language Exchange'];
    hobbies.forEach(hobby => {
        const span = document.createElement('span');
        span.className = 'bg-purple-50 text-purple-700 px-3 py-1 rounded-lg text-xs font-bold border border-purple-100';
        span.textContent = hobby;
        interestsContainer.appendChild(span);
    });
    
    // Follow Status update
    updateFollowBtnUI();
    
    // Show UI
    previewOverlay.classList.remove('opacity-0', 'pointer-events-none');
    previewSheet.classList.remove('translate-y-full');
};

function closeUserPreview() {
    if(!previewOverlay || !previewSheet) return;
    previewOverlay.classList.add('opacity-0', 'pointer-events-none');
    previewSheet.classList.add('translate-y-full');
    setTimeout(() => { currentPreviewUser = null; }, 300);
}

function updateFollowBtnUI() {
    if (!currentPreviewUser || !previewFollowBtn) return;
    const isFollowing = followedUsers.has(currentPreviewUser.seed);
    
    if (isFollowing) {
        previewFollowBtn.classList.replace('from-purple-600', 'from-gray-400');
        previewFollowBtn.classList.replace('to-indigo-600', 'to-gray-500');
        previewFollowBtn.classList.remove('shadow-purple-500/30');
        previewFollowBtn.innerHTML = '<i class="fas fa-user-check"></i> <span>Following</span>';
    } else {
        previewFollowBtn.classList.replace('from-gray-400', 'from-purple-600');
        previewFollowBtn.classList.replace('to-gray-500', 'to-indigo-600');
        previewFollowBtn.classList.add('shadow-purple-500/30');
        previewFollowBtn.innerHTML = '<i class="fas fa-user-plus"></i> <span>Follow</span>';
    }
}

if (closePreviewBtn) closePreviewBtn.addEventListener('click', closeUserPreview);
if (previewOverlay) previewOverlay.addEventListener('click', closeUserPreview);

if (previewFollowBtn) {
    previewFollowBtn.addEventListener('click', () => {
        if (!currentPreviewUser) return;
        const seed = currentPreviewUser.seed;
        
        if (followedUsers.has(seed)) {
            followedUsers.delete(seed);
        } else {
            followedUsers.add(seed);
            if (typeof showToast === 'function') {
                showToast(`You followed ${currentPreviewUser.name.split(' ')[0]}`);
            }
        }
        updateFollowBtnUI();
    });
}
