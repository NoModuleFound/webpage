'use strict';

// ══════════════════════════════════════════════════
// i18n — i18next Configuration & Resources
// ══════════════════════════════════════════════════

const i18nResources = {
    en: {
        translation: {
            // Step 1
            step1_title: "Hey! Let's get you started 🎉",
            step1_subtitle: "Takes 60 seconds only.",
            language_label: "Language",
            name_label: "Your name",
            name_placeholder: "What should we call you?",
            name_error: "What should we call you?",
            username_label: "Username",
            username_placeholder: "choose_a_username",
            username_error: "Pick a username — it's how people find you",
            trust_name: "Your real name is never shown publicly",
            cta_step1: "Find Your People",

            // Step 2
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

            // Step 3
            step3_title: "What are you into? 🎯",
            step3_subtitle: "Pick 1–5 that excite you. This is how we find your people.",
            interest_error: "Pick at least 1 — this is how we find your people",
            cta_step3: "Show Me My Matches!",

            // Step 4
            step4_title: "You're in! 🎊",
            match_count: "Finding people who share your interests...",
            cta_step4: "Enter the Lobby",
            complete_later: "You can complete your full profile anytime in Settings",

            // Dynamic (interpolation)
            step_label: "Step {{current}} of {{total}}",
            welcome_name: "Welcome, {{name}}! 👋",
            match_result: "{{count}} people share your interests!",

            // Interests
            interest_business_management: "Business",
            interest_data_science: "Data Science",
            interest_psychology: "Psychology",
            interest_motion_design: "Motion Design",
            interest_marketing_and_promotion: "Marketing",
            interest_medicine: "Medicine",
            interest_engineering: "Engineering",
            interest_international_relations: "Intl Relations",
            interest_law_and_jurisprudence: "Law",
            interest_art_and_design: "Art & Design",
            interest_sports_and_fitness: "Sports & Fitness",
            interest_languages_and_philology: "Languages"
        }
    },
    uz: {
        translation: {
            step1_title: "Keling, ro'yxatdan o'taylik! 🎉",
            step1_subtitle: "Atigi 60 soniya.",
            language_label: "Til",
            name_label: "Ismingiz",
            name_placeholder: "Sizni ismingiz qanday?",
            name_error: "O'zingizni ismingiz kiritmasangiz ham mayli!",
            username_label: "Foydalanuvchi nomi",
            username_placeholder: "foydalanuvchi_nomi",
            username_error: "Foydalanuvchi nomini kiriting",
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

            step4_title: "Tabriklaymiz siz ro'yxatdan o'tingiz! ",
            match_count: "Qiziqishlaringizga mos odamlar izlanmoqda...",
            cta_step4: "Lobbyga kirish",
            complete_later: "To'liq profilingizni istalgan vaqtda Sozlamalarda yakunlashingiz mumkin",

            step_label: "Qadam {{current}} / {{total}}",
            welcome_name: "Xush kelibsiz, {{name}}! 👋",
            match_result: "{{count}} kishi sizning qiziqishlaringizga mos!",

            interest_business_management: "Biznes",
            interest_data_science: "Ma'lumotlar fani",
            interest_psychology: "Psixologiya",
            interest_motion_design: "Dizayn",
            interest_marketing_and_promotion: "Marketing",
            interest_medicine: "Tibbiyot",
            interest_engineering: "Muhandislik",
            interest_international_relations: "Xalqaro munosabat",
            interest_law_and_jurisprudence: "Huquq",
            interest_art_and_design: "San'at va dizayn",
            interest_sports_and_fitness: "Sport",
            interest_languages_and_philology: "Tillar"
        }
    },
    ru: {
        translation: {
            step1_title: "Привет! Давайте начнём 🎉",
            step1_subtitle: "Всего лишь 60 секунд",
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
            complete_later: "Полный профиль можно заполнить позже в Настройках",

            step_label: "Шаг {{current}} из {{total}}",
            welcome_name: "Добро пожаловать, {{name}}! 👋",
            match_result: "{{count}} человек разделяют ваши интересы!",

            interest_business_management: "Бизнес",
            interest_data_science: "Наука о данных",
            interest_psychology: "Психология",
            interest_motion_design: "Моушн-дизайн",
            interest_marketing_and_promotion: "Маркетинг",
            interest_medicine: "Медицина",
            interest_engineering: "Инженерия",
            interest_international_relations: "Межд. отношения",
            interest_law_and_jurisprudence: "Право",
            interest_art_and_design: "Искусство",
            interest_sports_and_fitness: "Спорт",
            interest_languages_and_philology: "Языки"
        }
    }
};


// ── Initialize i18next ───────────────────────────
function initI18n(lang, callback) {
    i18next.init({
        lng: lang || 'en',
        fallbackLng: 'en',
        debug: false,
        resources: i18nResources,
        interpolation: {
            escapeValue: false
        }
    }, function (err, t) {
        if (err) console.error('i18next init error:', err);
        if (callback) callback(t);
    });
}


// ── Apply translations to all DOM elements ───────
function applyI18nToDOM() {
    // Translate text content
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        const translated = i18next.t(key);
        if (translated && translated !== key) {
            el.textContent = translated;
        }
    });

    // Translate placeholders
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        const translated = i18next.t(key);
        if (translated && translated !== key) {
            el.placeholder = translated;
        }
    });
}


// ── Change language at runtime ───────────────────
function changeI18nLanguage(lang, callback) {
    i18next.changeLanguage(lang, function (err) {
        if (err) console.error('Language change error:', err);
        applyI18nToDOM();
        if (callback) callback();
    });
}


// ── Shorthand for i18next.t() ────────────────────
function t(key, opts) {
    return i18next.t(key, opts);
}
