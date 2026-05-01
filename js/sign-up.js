'use strict';

// ── Config ───────────────────────────────────────
let currentStep = 1;
const totalSteps = 4;
let selectedLanguage = getCookie('lang') || 'en';
const backend_url = 'https://xz2-production.up.railway.app/api';

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
}

const tg = window.Telegram.WebApp;

const formData = {
    language: selectedLanguage,
    firstName: '',
    username: '',
    age: null,
    gender: '',
    avatarSeed: '',
    avatarBg: '',
    interests: []
};


// ── Interest Data (icons only — labels come from i18next) ──
const interestData = {
    business_management: { icon: "fa-briefcase" },
    data_science: { icon: "fa-chart-pie" },
    psychology: { icon: "fa-brain" },
    motion_design: { icon: "fa-film" },
    marketing_and_promotion: { icon: "fa-bullhorn" },
    medicine: { icon: "fa-medkit" },
    engineering: { icon: "fa-cogs" },
    international_relations: { icon: "fa-globe" },
    law_and_jurisprudence: { icon: "fa-gavel" },
    art_and_design: { icon: "fa-palette" },
    sports_and_fitness: { icon: "fa-dumbbell" },
    languages_and_philology: { icon: "fa-language" }
};


// ── Avatar Config ─────────────────────────────────
const AVATAR_COUNT = 11;
const bgColors = ['b6e3f4', 'c0aede', 'd1d4f9', 'ffd5dc', 'ffdfbf', 'd1f4d9'];
let currentAvatarSeeds = [];

function generateRandomSeed() {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let seed = '';
    for (let i = 0; i < 8; i++) seed += chars[Math.floor(Math.random() * chars.length)];
    return seed;
}

function generateAvatarSeeds() {
    currentAvatarSeeds = [];
    for (let i = 0; i < AVATAR_COUNT; i++) {
        currentAvatarSeeds.push(generateRandomSeed());
    }
    return currentAvatarSeeds;
}

function getAvatarUrl(seed, bg) {
    return `https://api.dicebear.com/9.x/adventurer/svg?seed=${seed}&skinColor=9e5622,ecad80,f2d3b1&backgroundColor=${bg}`;
}


// ── DOM Refs ─────────────────────────────────────
const stepDotsContainer = document.getElementById('stepDotsContainer');
const headerStepLabel = document.getElementById('headerStepLabel');
const interestsContainer = document.getElementById('interestsContainer');


// ── Translation Engine (powered by i18next) ──────
function applyTranslation() {
    applyI18nToDOM();
    renderInterests();
}


// ── Render Interests ─────────────────────────────
function renderInterests() {
    if (!interestsContainer) return;
    interestsContainer.innerHTML = '';

    Object.keys(interestData).forEach(key => {
        const interest = interestData[key];
        const name = t(`interest_${key}`);
        const isSelected = formData.interests.includes(key);

        const pill = document.createElement('button');
        pill.type = 'button';
        pill.className = `interest-pill ${isSelected ? 'selected' : ''}`;
        pill.setAttribute('data-key', key);
        pill.innerHTML = `<i class="fas ${interest.icon} pill-icon"></i> ${name}`;
        pill.onclick = () => toggleInterest(key, pill);
        interestsContainer.appendChild(pill);
    });
}

function toggleInterest(key, pill) {
    const idx = formData.interests.indexOf(key);
    if (idx === -1) {
        if (formData.interests.length >= 5) return; // max 5
        formData.interests.push(key);
        pill.classList.add('selected');
    } else {
        formData.interests.splice(idx, 1);
        pill.classList.remove('selected');
    }
    hideError('interestError');
}


// ── Populate Avatars ─────────────────────────────
function populateAvatars(regenerate = true) {
    const container = document.getElementById('avatarContainer');
    if (!container) return;
    container.innerHTML = '';

    if (regenerate || currentAvatarSeeds.length === 0) {
        generateAvatarSeeds();
        // Clear selection when regenerating
        formData.avatarSeed = '';
        formData.avatarBg = '';
    }

    currentAvatarSeeds.forEach((seed, i) => {
        const bg = bgColors[i % bgColors.length];
        const url = getAvatarUrl(seed, bg);

        const div = document.createElement('div');
        div.className = `avatar-option ${formData.avatarSeed === seed ? 'selected' : ''}`;
        div.innerHTML = `<img src="${url}" alt="avatar" class="w-full h-full object-cover">`;
        div.onclick = () => selectAvatar(seed, bg, div);
        container.appendChild(div);
    });

    // 12th cell: Randomize button
    const randBtn = document.createElement('div');
    randBtn.className = 'avatar-randomize-btn';
    randBtn.innerHTML = `<i class="fas fa-dice"></i>`;
    randBtn.title = 'Randomize avatars';
    randBtn.onclick = () => {
        randBtn.classList.add('spinning');
        setTimeout(() => randBtn.classList.remove('spinning'), 500);
        populateAvatars(true);
    };
    container.appendChild(randBtn);
}

function selectAvatar(seed, bg, element) {
    formData.avatarSeed = seed;
    formData.avatarBg = bg;

    document.querySelectorAll('.avatar-option').forEach(el => el.classList.remove('selected'));
    element.classList.add('selected');
    hideError('avatarError');
}


// ── Language & Gender Selection ───────────────────
function selectLanguage(lang, element) {
    formData.language = lang;
    selectedLanguage = lang;

    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('selected');
        btn.className = btn.className.replace(/border-\[#6C47FF\]/g, 'border-[#EBEBF0]').replace(/bg-\[#EDE8FF\]/g, '').replace(/text-\[#6C47FF\]/g, 'text-[#1A1A2E]');
    });

    element.classList.add('selected');

    // Change i18next language and re-apply DOM translations
    changeI18nLanguage(lang, () => {
        renderInterests();
    });
}

function selectGender(gender, element) {
    formData.gender = gender;

    document.querySelectorAll('.gender-btn').forEach(btn => btn.classList.remove('selected'));
    element.classList.add('selected');
    hideError('genderError');

    // Populate avatars if not already populated
    if (currentAvatarSeeds.length === 0) {
        populateAvatars(true);
    }
}


// ── Navigation ───────────────────────────────────
function showStep(step) {
    document.querySelectorAll('.slide').forEach(s => {
        s.classList.remove('active');
    });
    const target = document.getElementById(`step${step}`);
    if (target) target.classList.add('active');

    // Update step dots
    document.querySelectorAll('.step-dot').forEach((dot, i) => {
        dot.classList.remove('active', 'done');
        if (i + 1 === step) dot.classList.add('active');
        else if (i + 1 < step) dot.classList.add('done');
    });

    // Update label using i18next interpolation
    headerStepLabel.textContent = t('step_label', { current: step, total: totalSteps });
}

function nextStep() {
    if (!validateStep(currentStep)) return;
    updateFormData();
    currentStep++;

    if (currentStep === totalSteps) {
        // Auto-submit and show celebration
        showStep(currentStep);
        triggerCelebration();
        submitForm();
    } else {
        showStep(currentStep);
    }
}

function prevStep() {
    if (currentStep <= 1) return;
    currentStep--;
    showStep(currentStep);
}


// ── Inline Validation ────────────────────────────
function showError(id, inputId) {
    const err = document.getElementById(id);
    if (err) err.classList.remove('hidden');
    if (inputId) {
        const input = document.getElementById(inputId);
        if (input) input.classList.add('input-error');
    }
}

function hideError(id, inputId) {
    const err = document.getElementById(id);
    if (err) err.classList.add('hidden');
    if (inputId) {
        const input = document.getElementById(inputId);
        if (input) input.classList.remove('input-error');
    }
}

function validateStep(step) {
    let valid = true;

    if (step === 1) {
        const name = document.getElementById('firstName').value.trim();
        const uname = document.getElementById('username').value.trim();

        if (!name) {
            showError('nameError', 'firstName');
            valid = false;
        } else {
            hideError('nameError', 'firstName');
        }

        if (!uname) {
            showError('usernameError', 'username');
            valid = false;
        } else {
            hideError('usernameError', 'username');
        }
    }

    if (step === 2) {
        if (!formData.gender) {
            showError('genderError');
            valid = false;
        }

        const ageVal = parseInt(document.getElementById('userAge').value, 10);
        if (!ageVal || ageVal < 10 || ageVal > 100) {
            showError('ageError', 'userAge');
            valid = false;
        } else {
            hideError('ageError', 'userAge');
        }

        if (!formData.avatarSeed) {
            showError('avatarError');
            valid = false;
        }
    }

    if (step === 3) {
        if (formData.interests.length === 0) {
            showError('interestError');
            valid = false;
        }
    }

    return valid;
}


// ── Update Form Data ─────────────────────────────
function updateFormData() {
    if (currentStep === 1) {
        formData.firstName = document.getElementById('firstName').value.trim();
        formData.username = document.getElementById('username').value.trim();
    }
    if (currentStep === 2) {
        formData.age = parseInt(document.getElementById('userAge').value, 10);
    }
    // Step 3: interests are already tracked via toggleInterest
}


// ── Celebration ──────────────────────────────────
function triggerCelebration() {
    // Set avatar
    const img = document.getElementById('celebrationAvatar');
    if (img && formData.avatarSeed) {
        img.src = getAvatarUrl(formData.avatarSeed, formData.avatarBg);
    }

    // Set name (translated)
    const nameEl = document.getElementById('celebrationName');
    if (nameEl) nameEl.textContent = t('welcome_name', { name: formData.firstName });

    // Set interests
    const intEl = document.getElementById('celebrationInterests');
    if (intEl) {
        intEl.innerHTML = formData.interests.map(key => {
            const name = t(`interest_${key}`);
            return `<span class="interest-pill selected text-xs">${name}</span>`;
        }).join('');
    }

    // Match count (mock, translated)
    const matchEl = document.getElementById('celebrationMatch');
    if (matchEl) {
        const count = Math.floor(Math.random() * 40) + 15;
        setTimeout(() => {
            matchEl.textContent = t('match_result', { count });
        }, 1200);
    }

    // Confetti
    spawnConfetti();
}

function spawnConfetti() {
    const wrapper = document.getElementById('confettiWrapper');
    if (!wrapper) return;
    wrapper.innerHTML = '';

    const colors = ['#6C47FF', '#9747FF', '#FFD93D', '#00C97A', '#FF5C5C', '#b6e3f4'];
    for (let i = 0; i < 40; i++) {
        const p = document.createElement('div');
        p.className = 'confetti-particle';
        p.style.left = `${Math.random() * 100}%`;
        p.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        p.style.animationDelay = `${Math.random() * 1.5}s`;
        p.style.animationDuration = `${1.5 + Math.random() * 1.5}s`;
        p.style.width = `${5 + Math.random() * 6}px`;
        p.style.height = `${5 + Math.random() * 6}px`;
        wrapper.appendChild(p);
    }
}


// ── Submit ───────────────────────────────────────
async function submitForm() {
    const genderMapping = { male: 'male', female: 'female' };
    const interestsString = formData.interests.join(', ');

    const apiFormData = {
        first_name: formData.firstName,
        last_name: null,
        username: formData.username,
        avatar: formData.avatarSeed + ',' + formData.avatarBg,
        age: formData.age,
        gender: genderMapping[formData.gender] || formData.gender,
        interests: interestsString,
        institution: null,
        initdata: tg.initData,
        lang: formData.language,
        bio: null
    };

    // Static mode: simulate success
    document.cookie = `jwt=dummy_token; path=/;`;

    // Wire up the lobby button
    const lobbyBtn = document.getElementById('enterLobbyBtn');
    if (lobbyBtn) {
        lobbyBtn.onclick = () => { window.location.href = 'home.html'; };
    }
}


// ── Real-time Inline Validation (blur) ───────────
document.addEventListener('DOMContentLoaded', () => {
    // Initialize i18next, then boot UI
    initI18n(selectedLanguage, () => {
        showStep(1);
        applyTranslation();

        // Pre-populate avatars (gender-independent)
        populateAvatars(true);

        // Auto-select English lang button
        const enBtn = document.querySelector('.lang-btn:last-child');
        if (enBtn) enBtn.classList.add('selected');
    });

    // Blur validation for name
    const nameInput = document.getElementById('firstName');
    if (nameInput) {
        nameInput.addEventListener('blur', () => {
            if (!nameInput.value.trim()) showError('nameError', 'firstName');
            else hideError('nameError', 'firstName');
        });
        nameInput.addEventListener('input', () => hideError('nameError', 'firstName'));
    }

    // Blur validation for username
    const unameInput = document.getElementById('username');
    if (unameInput) {
        unameInput.addEventListener('blur', () => {
            if (!unameInput.value.trim()) showError('usernameError', 'username');
            else hideError('usernameError', 'username');
        });
        unameInput.addEventListener('input', () => hideError('usernameError', 'username'));
    }

    // Blur validation for age
    const ageInput = document.getElementById('userAge');
    if (ageInput) {
        ageInput.addEventListener('blur', () => {
            const v = parseInt(ageInput.value, 10);
            if (!v || v < 10 || v > 100) showError('ageError', 'userAge');
            else hideError('ageError', 'userAge');
        });
        ageInput.addEventListener('input', () => hideError('ageError', 'userAge'));
    }
});
