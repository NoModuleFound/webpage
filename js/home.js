// --- Cookie Functions ---


const tg = window.Telegram.WebApp;
console.log(tg.initData)
function setCookie(name, value, days) {
  let expires = "";
  if (days) {
      const date = new Date();
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
      expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

function getCookie(name) {
  const nameEQ = name + "=";
  const ca = document.cookie.split(';');
  for(let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

const translations = {
  en: {
      "app.title": "Daily Manfaat",
      "nav.home": "Home",
      "nav.chat": "Notifications",
      "nav.profile": "Profile",
      "home.discoverTitle": "Discover",
      "home.discoverSubtitle": "Find like-minded people",
      "home.section.bio": "Bio",
      "home.section.interests": "Interests",
      "home.tag.photography": "Photography",
      "home.tag.hiking": "Hiking",
      "home.tag.coffee": "Coffee",
      "home.tag.travel": "Travel",
      "home.tag.reading": "Reading",
      "chat.title": "Chat",
      "chat.comingSoon": "Coming Soon...",
      "chat.underDevelopment": "Our messaging feature is under development.",
      "profile.title": "Profile Settings",
      "profile.editProfile": "✏️ Edit Profile",
      "profile.nameLabel": "Name",
      "profile.bioLabel": "Bio",
      "profile.filterPreferences": "🔍 Filter Preferences",
      "profile.gender.preference": "Choose gender preference", // Added this translation key
      "profile.gender.male": "Male", // Added this translation key
      "profile.gender.female": "Female", // Added this translation key
      "profile.gender.both": "Both", // Added this translation key
      "choice.yes": "Yes", // Added this translation key
      "choice.no": "No", // Added this translation key
      "profile.filterInterests": "🔍 Filter By Interests", // Added this translation key
      "profile.ageRangeLabel": "Age Range",
      "profile.rangeSeparator": "to",
      "profile.distanceLabel": "Distance (km)",
      "profile.languageLabel": "🌐 Language",
      "profile.language.choose": "Choose your language", // Added this translation key
       // Language names displayed in options (in their own language)
      "lang.en": "English",
      "lang.ru": "Русский",
      "lang.uz": "O'zbek",
      "notifications.title": "Notifications",
      "notifications.subtitle": "People who liked your profile",
      "notifications.empty.title": "No Notifications Yet",
      "notifications.empty.message": "When someone likes your profile, you'll see them here.",
      "edit.profile.title": "Edit Profile", // Added for modal
      "first_name": "First Name *", // Added for modal
      "last_name": "Last Name", // Added for modal
      "birth_date": "Date of Birth *", // Added for modal
      "gender": "Gender *", // Added for modal
      "male": "Male", // Added for modal gender options
      "female": "Female", // Added for modal gender options
      "other_gender": "Other / Prefer not to say", // Added for modal gender options
      "institution": "Institution *", // Added for modal
      "select_institution": "Select your institution", // Added for modal
      "other": "Other", // Added for modal institution
      "other_institution": "Enter your institution name", // Added for modal
      "interests_title": "Interests", // Added for modal
      "about_me": "About Me", // Added for modal
      "cancel": "Cancel", // Added for modal
      "save": "Save Changes" // Added for modal
  },
  ru: {
       "app.title": "Приложение для знакомств",
      "nav.home": "Главная",
      "nav.chat": "Уведомления",
      "nav.profile": "Профиль",
      "home.discoverTitle": "Найти",
      "home.discoverSubtitle": "Найдите единомышленников",
      "home.section.bio": "О себе",
      "home.section.interests": "Интересы",
      "home.tag.photography": "Фотография",
      "home.tag.hiking": "Походы",
      "home.tag.coffee": "Кофе",
      "home.tag.travel": "Путешествия",
      "home.tag.reading": "Чтение",
      "chat.title": "Чат",
      "chat.comingSoon": "Скоро...",
      "chat.underDevelopment": "Наш мессенджер находится в разработке.",
      "profile.title": "Настройки профиля",
      "profile.editProfile": "✏️ Редактировать профиль",
      "profile.nameLabel": "Имя",
      "profile.bioLabel": "О себе",
      "profile.filterPreferences": "🔍 Настройки фильтра",
      "profile.gender.preference": "Выберите предпочтительный пол",
      "profile.gender.male": "Мужской",
      "profile.gender.female": "Женский",
      "profile.gender.both": "Оба",
      "choice.yes": "Да",
      "choice.no": "Нет",
      "profile.filterInterests": "🔍 Фильтровать по интересам",
      "profile.ageRangeLabel": "Возрастной диапазон",
      "profile.rangeSeparator": "до",
      "profile.distanceLabel": "Расстояние (км)",
      "profile.languageLabel": "🌐 Язык",
       "profile.language.choose": "Выберите ваш язык",
       "lang.en": "English",
      "lang.ru": "Русский",
      "lang.uz": "Узбекский",
      "notifications.title": "Уведомления",
      "notifications.subtitle": "Люди, которым понравился ваш профиль",
      "notifications.empty.title": "Пока нет уведомлений",
      "notifications.empty.message": "Когда кому-то понравится ваш профиль, вы увидите их здесь.",
      "edit.profile.title": "Редактировать профиль",
      "first_name": "Имя *",
      "last_name": "Фамилия",
      "birth_date": "Дата рождения *",
      "gender": "Пол *",
      "male": "Мужской",
      "female": "Женский",
      "other_gender": "Другой / Не указано",
      "institution": "Учреждение *",
      "select_institution": "Выберите учреждение",
      "other": "Другое",
      "other_institution": "Введите название учреждения",
      "interests_title": "Интересы",
      "about_me": "О себе",
      "cancel": "Отмена",
      "save": "Сохранить изменения"
  },
  uz: {
       "app.title": "Tanishuv ilovasi",
      "nav.home": "Bosh sahifa",
      "nav.chat": "Bildirishnomalar",
      "nav.profile": "Profil",
      "home.discoverTitle": "Kashf etish",
      "home.discoverSubtitle": "Fikrlar yaqin odamlarni toping",
      "home.section.bio": "Men haqimda",
      "home.section.interests": "Qiziqishlar",
      "home.tag.photography": "Fotografiya",
      "home.tag.hiking": "Sayohat",
      "home.tag.coffee": "Qahva",
      "home.tag.travel": "Sayohat",
      "home.tag.reading": "O'qish",
      "chat.title": "Chat",
      "chat.comingSoon": "Tez orada...",
      "chat.underDevelopment": "Bizning xabar almashish funksiyasi ishlab chiqilmoqda.",
      "profile.title": "Profil sozlamalari",
      "profile.editProfile": "✏️ Profilni tahrirlash",
      "profile.nameLabel": "Ism",
      "profile.bioLabel": "Men haqimda",
      "profile.filterPreferences": "🔍 Filtrlash sozlamalari",
      "profile.gender.preference": "Jinsni tanlang",
      "profile.gender.male": "Erkak",
      "profile.gender.female": "Ayol",
      "profile.gender.both": "Ikkalasi",
      "choice.yes": "Ha",
      "choice.no": "Yo'q",
      "profile.filterInterests": "🔍 Qiziqishlar bo'yicha filtrlash",
      "profile.ageRangeLabel": "Yosh oralig'i",
      "profile.rangeSeparator": "gacha",
      "profile.distanceLabel": "Masofa (km)",
      "profile.languageLabel": "🌐 Til",
       "profile.language.choose": "Tilni tanlang",
       "lang.en": "English",
      "lang.ru": "Ruscha",
      "lang.uz": "O'zbekcha",
      "notifications.title": "Bildirishnomalar",
      "notifications.subtitle": "Sizning profilingizga yoqqan odamlar",
      "notifications.empty.title": "Hozircha bildirishnoma yo'q",
      "notifications.empty.message": "Kimdir sizning profilingizga yoqsa, siz ularni bu yerda ko'rasiz.",
      "edit.profile.title": "Profilni tahrirlash",
      "first_name": "Ism *",
      "last_name": "Familiya",
      "birth_date": "Tug'ilgan sana *",
      "gender": "Jins *",
      "male": "Erkak",
      "female": "Ayol",
      "other_gender": "Boshqa / Aytishni xohlamayman",
      "institution": "Muassasa *",
      "select_institution": "Muassasangizni tanlang",
      "other": "Boshqa",
      "other_institution": "Muassasa nomini kiriting",
      "interests_title": "Qiziqishlar",
      "about_me": "Men haqimda",
      "cancel": "Bekor qilish",
      "save": "Saqlash"
  }
};



const interestData = {
  business_management: {
      en: "Business Management",
      uz: "Biznes boshqaruvi",
      ru: "Управление бизнесом",
      icon: "fa-briefcase"
  },
  finance_and_accounting: {
      en: "Finance & Accounting",
      uz: "Moliya va buxgalteriya",
      ru: "Финансы и бухгалтерский учёт",
      icon: "fa-coins"
  },
  tourism_and_hospitality: {
      en: "Tourism & Hospitality",
      uz: "Turizm va mehmonxona ishi",
      ru: "Туризм и гостиничное дело",
      icon: "fa-plane"
  },
  data_science: {
      en: "Data Science & Analytics",
      uz: "Ma'lumotlar fanlari va analitikasi",
      ru: "Наука о данных и аналитика",
      icon: "fa-chart-pie"
  },
   cybersecurity: {
      en: "Cybersecurity",
      uz: "Kiberxavfsizlik",
      ru: "Кибербезопасность",
      icon: "fa-lock"
  },
  motion_design: {
      en: "Motion Design",
      uz: "Harakat dizayni",
      ru: "Моушн‑дизайн",
      icon: "fa-film"
  },
  three_d_modeling: {
      en: "3D Modeling",
      uz: "3D modellashtirish",
      ru: "3D‑моделирование",
      icon: "fa-cube"
  },
  animation_and_visualization: {
      en: "Animation & Visualization",
      uz: "Animatsiya va vizualizatsiya",
      ru: "Анимация и визуализация",
      icon: "fa-paint-brush"
  },
  marketing_and_promotion: {
      en: "Marketing & Promotion",
      uz: "Marketing va targ‘ibot",
      ru: "Маркетинг и продвижение",
      icon: "fa-bullhorn"
  },
  human_resources_and_project_management: {
      en: "Human Resources & Project Management",
      uz: "Inson resurslari va loyiha boshqaruvi",
      ru: "Управление персоналом и проектами",
      icon: "fa-users"
  },
  economics_and_banking: {
      en: "Economics & Banking",
      uz: "Iqtisodiyot va bank ishlari",
      ru: "Экономика и банковское дело",
      icon: "fa-chart-line"
  },
  international_relations: {
      en: "International Relations",
      uz: "Xalqaro munosabatlar",
      ru: "Международные отношения",
      icon: "fa-globe"
  },
  psychology: {
      en: "Psychology",
      uz: "Psixologiya",
      ru: "Психология",
      icon: "fa-brain"
  },
  law_and_jurisprudence: {
      en: "Law / Jurisprudence",
      uz: "Huquqshunoslik",
      ru: "Право / Юриспруденция",
      icon: "fa-gavel"
  },
   education: {
      en: "Education / Pedagogy",
      uz: "Ta'lim / Pedagogika",
      ru: "Образование / Педагогика",
      icon: "fa-chalkboard-teacher"
  },
  journalism_and_mass_comm: {
      en: "Journalism & Mass Communication",
      uz: "Jurnalistika va ommaviy kommunikatsiya",
      ru: "Журналистика и массовые коммуникации",
      icon: "fa-newspaper"
  },
  architecture: {
      en: "Architecture",
      uz: "Arxitektura",
      ru: "Архитектура",
      icon: "fa-building"
  },
  construction: {
      en: "Construction",
      uz: "Qurilish",
      ru: "Строительство",
      icon: "fa-hard-hat"
  },
  engineering: {
      en: "Engineering",
      uz: "Muhandislik",
      ru: "Инженерия",
      icon: "fa-cogs"
  },
  languages_and_philology: {
      en: "Languages & Philology",
      uz: "Tillashunoslik va filologiya",
      ru: "Языки и филология",
      icon: "fa-language"
  },
  transportation_and_logistics: {
      en: "Transportation & Logistics",
      uz: "Transport va logistika",
      ru: "Транспорт и логистика",
      icon: "fa-truck"
  },
  medicine: {
      en: "Medicine / Healthcare",
      uz: "Tibbiyot / Sog'liqni saqlash",
      ru: "Медицина / Здравоохранение",
      icon: "fa-medkit"
  },
   pharmacy: {
      en: "Pharmacy",
      uz: "Farmatsevtika",
      ru: "Фармацевтика",
      icon: "fa-pills"
   },
   dentistry: {
      en: "Dentistry",
      uz: "Stomatologiya",
      ru: "Стоматология",
      icon: "fa-tooth"
   },
   pediatrics: {
      en: "Pediatrics",
      uz: "Pediatriya",
      ru: "Педиатрия",
      icon: "fa-child"
   },
   sports_and_fitness: {
      en: "Sports & Fitness",
      uz: "Sport va fitnes",
      ru: "Спорт и фитнес",
      icon: "fa-dumbbell"
   },
   art_and_design: {
      en: "Art & Design",
      uz: "San'at va dizayn",
      ru: "Искусство и дизайн",
      icon: "fa-palette"
   }
};

function translatePage(lang) {
  document.querySelectorAll('[data-translate]').forEach(element => {
      const key = element.getAttribute('data-translate');
      if (translations[lang] && translations[lang][key]) {
           // Handle specific cases if needed (e.g., input placeholders)
           if (element.tagName === 'INPUT' && element.type === 'text') {
               // Not typically translating value attribute in this method,
               // but if needed, you could set element.placeholder or similar
           } else {
               element.textContent = translations[lang][key];
           }
      }
  });

  // Update language options text (display language name in target language)
   document.querySelectorAll('.choice-btn[data-lang]').forEach(option => {
      const langCode = option.getAttribute('data-lang');
       if (translations[lang] && translations[lang]['lang.' + langCode]) {
           option.textContent = translations[lang]['lang.' + langCode];
       } else {
           // Fallback to English name if translation is missing for the language option text itself
            option.textContent = translations['en']['lang.' + langCode];
       }
  });

  // Update the html lang attribute
  document.documentElement.lang = lang;
  // Update the document title separately as it's often not inside the body
   if (translations[lang] && translations[lang]['app.title']) {
       document.title = translations[lang]['app.title'];
   } else {
        document.title = translations['en']['app.title']; // Fallback
   }

}

// --- Sample User Data ---
const userProfiles = [
  {
      name: "Alisher Navoi",
      institution: "Central Asia University",
      age: 25,
      gender: "Male",
      bio: "Passionate about technology, literature, and hiking. Always looking to learn and connect with interesting people.",
      interests: ["Technology", "Reading", "Hiking", "Coffee"]
  },
  {
      name: "Zulfiya Isroilova",
      institution: "Webster University",
      age: 22,
      gender: "Female",
      bio: "Creative soul, loves photography and exploring new places. Coffee is a must!",
      interests: ["Photography", "Travel", "Coffee", "Art & Design"]
  },
  {
      name: "Bobur Mirzo",
      institution: "Westminster International University",
      age: 28,
      gender: "Male",
      bio: "Entrepreneur and history enthusiast. Enjoy discussions on economics and international relations.",
      interests: ["Business Management", "Economics & Banking", "International Relations"]
  }
];

let currentProfileIndex = 0; // Keep track of the currently displayed profile

// --- Display Profile Function ---
function displayProfile(profile) {
  const userNameElement = document.getElementById('userName');
  const userInstitutionElement = document.getElementById('userInstitution');
  const userAgeElement = document.getElementById('userAge');
  const userGenderElement = document.getElementById('userGender');
  const userBioElement = document.getElementById('userBio');
  const userInterestsContainer = document.getElementById('userInterestsContainer');
  const profileCard = document.querySelector('.profile-card');

  // Clear previous interests
  userInterestsContainer.innerHTML = '';

  // Populate elements with profile data
  userNameElement.textContent = profile.name;
  userInstitutionElement.textContent = profile.institution;
  userAgeElement.textContent = profile.age + ' years old'; // Add 'years old' for clarity
  userGenderElement.textContent = profile.gender;
  userBioElement.textContent = profile.bio;

  // Add interests
  profile.interests.forEach(interest => {
      const tagSpan = document.createElement('span');
      tagSpan.classList.add('tag');
      // Basic tag content - could be enhanced with icons based on interest type
      tagSpan.innerHTML = `<i class="fas fa-heart"></i> <span>${interest}</span>`; // Using a generic heart icon for now
      userInterestsContainer.appendChild(tagSpan);
  });

   // Add fade-in animation to the new card
   profileCard.classList.add('is-in');
   profileCard.addEventListener('animationend', () => {
       profileCard.classList.remove('is-in');
   }, { once: true });
}

// --- Handle Like/Dislike and Profile Cycling ---
function handleLike() {
  const profileCard = document.querySelector('.profile-card');
  // Disable buttons temporarily during animation to prevent rapid clicks
  document.querySelector('.like-btn').disabled = true;
  document.querySelector('.dislike-btn').disabled = true;

  profileCard.classList.add('is-out-right'); // Add animation class for like

  profileCard.addEventListener('animationend', () => {
      // Animation finished, now update profile data and remove animation class
      profileCard.classList.remove('is-out-right');
      currentProfileIndex++;
      if (currentProfileIndex >= userProfiles.length) {
          currentProfileIndex = 0; // Cycle back to the beginning
      }
      displayProfile(userProfiles[currentProfileIndex]);

      // Re-enable buttons after the new profile is displayed
      document.querySelector('.like-btn').disabled = false;
      document.querySelector('.dislike-btn').disabled = false;

  }, { once: true }); // Use { once: true } to remove the listener after it runs
}

function handleDislike() {
  const profileCard = document.querySelector('.profile-card');
   // Disable buttons temporarily during animation to prevent rapid clicks
  document.querySelector('.like-btn').disabled = true;
  document.querySelector('.dislike-btn').disabled = true;

  profileCard.classList.add('is-out-left'); // Add animation class for dislike

  profileCard.addEventListener('animationend', () => {
      // Animation finished, now update profile data and remove animation class
      profileCard.classList.remove('is-out-left');
      currentProfileIndex++;
      if (currentProfileIndex >= userProfiles.length) {
          currentProfileIndex = 0; // Cycle back to the beginning
      }
      displayProfile(userProfiles[currentProfileIndex]);

      // Re-enable buttons after the new profile is displayed
      document.querySelector('.like-btn').disabled = false;
      document.querySelector('.dislike-btn').disabled = false;

  }, { once: true }); // Use { once: true } to remove the listener after it runs
}


// --- Initial Load & Event Listeners ---
document.addEventListener('DOMContentLoaded', () => {
  // Get saved preferences from cookies
  const savedLang = getCookie('lang') || 'en';
  const savedGender = getCookie('gender_preference') || 'both';
  const savedInterestFilter = getCookie('filter_by_interests') || 'no';


  // Initialize language, gender, and interest filter buttons with saved preferences
  document.querySelectorAll('.choice-btn[data-lang]').forEach(btn => {
       if (btn.getAttribute('data-lang') === savedLang) {
           btn.classList.add('active');
       } else {
           btn.classList.remove('active');
       }
   });

   document.querySelectorAll('.choice-btn[data-gender]').forEach(btn => {
      if (btn.getAttribute('data-gender') === savedGender) {
          btn.classList.add('active');
      } else {
          btn.classList.remove('active');
      }
  });

   document.querySelectorAll('.choice-btn[data-choice]').forEach(btn => {
       if (btn.getAttribute('data-choice') === savedInterestFilter) {
           btn.classList.add('active');
       } else {
           btn.classList.remove('active');
       }
   });


  // Initial display of the first profile
  if (userProfiles.length > 0) {
      displayProfile(userProfiles[currentProfileIndex]);
  }

  // Rest of your initialization code
  translatePage(savedLang); // Ensure page is translated based on initial active language

  // Navigation listener
  document.querySelectorAll('.nav-item').forEach(item => {
      item.addEventListener('click', function() {
          // Remove active class from all screens and nav items
          document.querySelectorAll('.screen').forEach(screen => {
              screen.classList.remove('active');
          });
          document.querySelectorAll('.nav-item').forEach(navItem => {
              navItem.classList.remove('active');
          });

          // Add active class to clicked nav item
          this.classList.add('active');

          // Show corresponding screen
          const screenId = this.getAttribute('data-screen');
          const targetScreen = document.getElementById(screenId);
          if (targetScreen) {
              targetScreen.classList.add('active');
          } else {
              // Handle case where screenId is invalid (like the old 'explore')
              console.warn(`Screen with ID "${screenId}" not found.`);
               // Optionally, navigate back to home or show an error screen
               document.getElementById('home-screen').classList.add('active');
               document.querySelector('.nav-item[data-screen="home-screen"]').classList.add('active');
          }
      });
  });

  // Language preference selection listener in Profile screen
   document.querySelectorAll('.choice-btn[data-lang]').forEach(btn => {
       btn.addEventListener('click', function() {
           // Remove active class from all language buttons
           document.querySelectorAll('.choice-btn[data-lang]').forEach(b => b.classList.remove('active'));
           // Add active class to clicked button
           this.classList.add('active');

           const selectedLang = this.getAttribute('data-lang');
           translatePage(selectedLang); // Translate immediately
           setCookie('lang', selectedLang, 30); // Save preference for 30 days
       });
   });

  // Gender preference selection listener in Profile screen
   document.querySelectorAll('.choice-btn[data-gender]').forEach(btn => {
       btn.addEventListener('click', function() {
           // Remove active class from all gender buttons
           document.querySelectorAll('.choice-btn[data-gender]').forEach(b => b.classList.remove('active'));
           // Add active class to clicked button
           this.classList.add('active');
           const selectedGender = this.getAttribute('data-gender');
           setCookie('gender_preference', selectedGender, 30);
           // TODO: Implement filtering logic here to update displayed profiles based on gender preference
       });
   });

   // Interest filter preference selection listener in Profile screen
    document.querySelectorAll('.choice-btn[data-choice]').forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all interest filter buttons
            document.querySelectorAll('.choice-btn[data-choice]').forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            const filterByInterests = this.getAttribute('data-choice');
            setCookie('filter_by_interests', filterByInterests, 30);
            // TODO: Implement filtering logic here to update displayed profiles based on interest filter preference
        });
    });


  // Add event listeners for Like and Dislike buttons
  document.querySelector('.like-btn').addEventListener('click', handleLike);
  document.querySelector('.dislike-btn').addEventListener('click', handleDislike);

  // TODO: Add event listener for Edit Profile button to open modal
  // TODO: Implement Edit Profile modal functionality (populate, save, close)
  // TODO: Implement color theme styling based on user preference (if available from sign-up data)
});