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


// ── Translations ─────────────────────────────────
const translations = {
    en: {
        step1_title: "Hey! Let's get you started 🎉",
        step1_subtitle: "Takes 60 seconds. No spam, ever.",
        language_label: "Language",
        name_label: "Your name",
        name_placeholder: "What should we call you?",
        name_error: "What should we call you?",
        username_label: "Username",
        username_placeholder: "choose_a_username",
        username_error: "Pick a username — it's how people find you",
        trust_name: "Your real name is never shown publicly",
        cta_step1: "Find Your People",
        step2_title: "Who are you? 👤",
        step2_subtitle: "This helps us match you with the right people",
        gender_label: "Gender",
        male: "Male",
        female: "Female",
        gender_error: "Tap one to continue",
        age_label: "Your age",
        age_placeholder: "e.g. 19",
        age_error: "How old are you? We need this to keep things safe",
        avatar_label: "Pick your look",
        avatar_error: "Pick your look! You can always change it later",
        cta_step2: "Almost there!",
        step3_title: "What are you into? 🎯",
        step3_subtitle: "Pick 1–5 that excite you. This is how we find your people.",
        interest_error: "Pick at least 1 — this is how we find your people",
        cta_step3: "Show Me My Matches!",
        step4_title: "You're in! 🎊",
        match_count: "Finding people who share your interests...",
        cta_step4: "Enter the Lobby",
        complete_later: "You can complete your full profile anytime in Settings"
    },
    uz: {
        step1_title: "Keling, boshlaylik! 🎉",
        step1_subtitle: "60 soniya. Hech qanday spam yo'q.",
        language_label: "Til",
        name_label: "Ismingiz",
        name_placeholder: "Sizni qanday chaqiramiz?",
        name_error: "Sizni qanday chaqiramiz?",
        username_label: "Foydalanuvchi nomi",
        username_placeholder: "foydalanuvchi_nomi",
        username_error: "Foydalanuvchi nomini tanlang",
        trust_name: "Haqiqiy ismingiz hech qachon ko'rsatilmaydi",
        cta_step1: "Odamlaringizni toping",
        step2_title: "Siz kimsiz? 👤",
        step2_subtitle: "Bu sizga to'g'ri odamlarni topishga yordam beradi",
        gender_label: "Jins",
        male: "Erkak",
        female: "Ayol",
        gender_error: "Davom etish uchun birini tanlang",
        age_label: "Yoshingiz",
        age_placeholder: "masalan, 19",
        age_error: "Yoshingiz necha? Xavfsizlik uchun kerak",
        avatar_label: "Qiyofangizni tanlang",
        avatar_error: "Qiyofangizni tanlang! Keyinroq o'zgartirsangiz ham bo'ladi",
        cta_step2: "Deyarli tayyor!",
        step3_title: "Nima qiziq? 🎯",
        step3_subtitle: "1–5 ta tanlang. Shunga asoslanib odamlaringizni topamiz.",
        interest_error: "Kamida 1 ta tanlang",
        cta_step3: "Menga mos keladiganlarni ko'rsat!",
        step4_title: "Siz ichkaridasiz! 🎊",
        match_count: "Qiziqishlaringizga mos odamlar izlanmoqda...",
        cta_step4: "Lobbyga kirish",
        complete_later: "To'liq profilingizni istalgan vaqtda Sozlamalarda yakunlashingiz mumkin"
    },
    ru: {
        step1_title: "Привет! Давайте начнём 🎉",
        step1_subtitle: "60 секунд. Никакого спама.",
        language_label: "Язык",
        name_label: "Ваше имя",
        name_placeholder: "Как вас называть?",
        name_error: "Как вас называть?",
        username_label: "Имя пользователя",
        username_placeholder: "имя_пользователя",
        username_error: "Выберите имя — так вас найдут другие",
        trust_name: "Ваше настоящее имя никогда не показывается публично",
        cta_step1: "Найти своих людей",
        step2_title: "Кто вы? 👤",
        step2_subtitle: "Это поможет подобрать для вас нужных людей",
        gender_label: "Пол",
        male: "Мужской",
        female: "Женский",
        gender_error: "Нажмите, чтобы продолжить",
        age_label: "Ваш возраст",
        age_placeholder: "напр. 19",
        age_error: "Сколько вам лет? Это нужно для безопасности",
        avatar_label: "Выберите образ",
        avatar_error: "Выберите образ! Позже его можно изменить",
        cta_step2: "Почти готово!",
        step3_title: "Что вам интересно? 🎯",
        step3_subtitle: "Выберите 1–5. Так мы найдём ваших людей.",
        interest_error: "Выберите хотя бы 1 — так мы найдём ваших людей",
        cta_step3: "Покажите мои совпадения!",
        step4_title: "Вы в деле! 🎊",
        match_count: "Ищем людей с вашими интересами...",
        cta_step4: "Войти в лобби",
        complete_later: "Полный профиль можно заполнить позже в Настройках"
    }
};


// ── Interest Data (curated top 12) ───────────────
const interestData = {
    business_management:     { en: "Business",           uz: "Biznes",             ru: "Бизнес",              icon: "fa-briefcase" },
    data_science:            { en: "Data Science",       uz: "Ma'lumotlar fani",   ru: "Наука о данных",      icon: "fa-chart-pie" },
    psychology:              { en: "Psychology",         uz: "Psixologiya",        ru: "Психология",          icon: "fa-brain" },
    motion_design:           { en: "Motion Design",     uz: "Dizayn",             ru: "Моушн-дизайн",        icon: "fa-film" },
    marketing_and_promotion: { en: "Marketing",         uz: "Marketing",          ru: "Маркетинг",           icon: "fa-bullhorn" },
    medicine:                { en: "Medicine",           uz: "Tibbiyot",           ru: "Медицина",            icon: "fa-medkit" },
    engineering:             { en: "Engineering",        uz: "Muhandislik",        ru: "Инженерия",           icon: "fa-cogs" },
    international_relations: { en: "Intl Relations",     uz: "Xalqaro munosabat",  ru: "Межд. отношения",     icon: "fa-globe" },
    law_and_jurisprudence:   { en: "Law",               uz: "Huquq",              ru: "Право",               icon: "fa-gavel" },
    art_and_design:          { en: "Art & Design",      uz: "San'at va dizayn",   ru: "Искусство",           icon: "fa-palette" },
    sports_and_fitness:      { en: "Sports & Fitness",  uz: "Sport",              ru: "Спорт",               icon: "fa-dumbbell" },
    languages_and_philology: { en: "Languages",         uz: "Tillar",             ru: "Языки",               icon: "fa-language" }
};


// ── Avatar Seeds (6 per gender) ──────────────────
const maleSeeds   = ['Jack', 'Alex', 'Max', 'Felix', 'Leo', 'Sam'];
const femaleSeeds = ['Maria', 'Sarah', 'Lena', 'Mia', 'Zoe', 'Lily'];
const bgColors    = ['b6e3f4', 'c0aede', 'd1d4f9', 'ffd5dc', 'ffdfbf', 'd1f4d9'];


// ── DOM Refs ─────────────────────────────────────
const stepDotsContainer = document.getElementById('stepDotsContainer');
const headerStepLabel   = document.getElementById('headerStepLabel');
const interestsContainer = document.getElementById('interestsContainer');


// ── Translation Engine ───────────────────────────
function applyTranslation() {
    document.querySelectorAll('[data-translate]').forEach(el => {
        const key = el.getAttribute('data-translate');
        if (translations[selectedLanguage]?.[key]) {
            el.textContent = translations[selectedLanguage][key];
        }
    });
    document.querySelectorAll('[data-translate-placeholder]').forEach(el => {
        const key = el.getAttribute('data-translate-placeholder');
        if (translations[selectedLanguage]?.[key]) {
            el.placeholder = translations[selectedLanguage][key];
        }
    });
    renderInterests();
}


// ── Render Interests ─────────────────────────────
function renderInterests() {
    if (!interestsContainer) return;
    interestsContainer.innerHTML = '';

    Object.keys(interestData).forEach(key => {
        const interest = interestData[key];
        const name = interest[selectedLanguage] || interest.en;
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
function populateAvatars() {
    const container = document.getElementById('avatarContainer');
    if (!container) return;
    container.innerHTML = '';

    const seeds = formData.gender === 'female' ? femaleSeeds : maleSeeds;

    seeds.forEach((seed, i) => {
        const bg = bgColors[i % bgColors.length];
        const url = `https://api.dicebear.com/7.x/adventurer/svg?seed=${seed}&backgroundColor=${bg}`;

        const div = document.createElement('div');
        div.className = `avatar-option ${formData.avatarSeed === seed ? 'selected' : ''}`;
        div.innerHTML = `<img src="${url}" alt="${seed}" class="w-full h-full object-cover">`;
        div.onclick = () => selectAvatar(seed, bg, div);
        container.appendChild(div);
    });
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
    applyTranslation();
}

function selectGender(gender, element) {
    formData.gender = gender;

    document.querySelectorAll('.gender-btn').forEach(btn => btn.classList.remove('selected'));
    element.classList.add('selected');
    hideError('genderError');

    // Populate avatars based on gender
    populateAvatars();
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

    // Update label
    const stepLabels = { en: 'Step', uz: 'Qadam', ru: 'Шаг' };
    const ofLabels = { en: 'of', uz: '/', ru: 'из' };
    headerStepLabel.textContent = `${stepLabels[selectedLanguage] || 'Step'} ${step} ${ofLabels[selectedLanguage] || 'of'} ${totalSteps}`;
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
        img.src = `https://api.dicebear.com/7.x/adventurer/svg?seed=${formData.avatarSeed}&backgroundColor=${formData.avatarBg}`;
    }

    // Set name
    const nameEl = document.getElementById('celebrationName');
    if (nameEl) nameEl.textContent = `Welcome, ${formData.firstName}! 👋`;

    // Set interests
    const intEl = document.getElementById('celebrationInterests');
    if (intEl) {
        intEl.innerHTML = formData.interests.map(key => {
            const interest = interestData[key];
            const name = interest?.[selectedLanguage] || interest?.en || key;
            return `<span class="interest-pill selected text-xs">${name}</span>`;
        }).join('');
    }

    // Match count (mock)
    const matchEl = document.getElementById('celebrationMatch');
    if (matchEl) {
        const count = Math.floor(Math.random() * 40) + 15;
        setTimeout(() => {
            const msgs = {
                en: `${count} people share your interests!`,
                uz: `${count} kishi sizning qiziqishlaringizga mos!`,
                ru: `${count} человек разделяют ваши интересы!`
            };
            matchEl.textContent = msgs[selectedLanguage] || msgs.en;
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
    showStep(1);
    applyTranslation();

    // Auto-select English lang button
    const enBtn = document.querySelector('.lang-btn:last-child');
    if (enBtn) enBtn.classList.add('selected');

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
