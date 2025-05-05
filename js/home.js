const translations = {
  en: {
      // Nav
      "nav.home": "Home",
      "nav.chat": "Chat",
      "nav.profile": "Profile",

      // Home Screen
      "home.discoverTitle": "Discover",
      "home.discoverSubtitle": "Find like-minded people",
      "home.details.university": "University", // Assuming a label for this? No, it's data. Translate the *icon label* if needed. Or maybe just the section headers.
      "home.details.interestsSummary": "Interests", // Similar, assuming this is part of the structured data.
      "home.section.bio": "Bio", // Label for bio section
      "home.section.interests": "Interests", // Label for interests section
      "home.tag.photography": "Photography", // Translate tag text if static
      "home.tag.hiking": "Hiking",
      "home.tag.coffee": "Coffee",
      "home.tag.travel": "Travel",
      "home.tag.reading": "Reading",
      // Note: Sarah, 28, NY, bio text are placeholder *data*. Not typically translated like UI.

      // Chat Screen
      "chat.title": "Chat",
      "chat.comingSoon": "Coming Soon...",
      "chat.underDevelopment": "Our messaging feature is under development.",

      // Profile Screen
      "profile.title": "Profile Settings",
      "profile.editProfile": "✏️ Edit Profile", // Keep emoji? Or add to CSS? Let's keep in string for simplicity.
      "profile.nameLabel": "Name",
      "profile.bioLabel": "Bio",
      "profile.filterPreferences": "🔍 Filter Preferences", // Keep emoji?
      "profile.ageRangeLabel": "Age Range",
      "profile.rangeSeparator": "to",
      "profile.distanceLabel": "Distance (km)",
      "profile.languageLabel": "🌐 Language", // Keep emoji?
      // Language names themselves (shown in the options)
      "lang.en": "English",
      "lang.ru": "Русский",
      "lang.uz": "O'zbek"
  },
  ru: {
      // Nav
      "nav.home": "Главная",
      "nav.chat": "Чат",
      "nav.profile": "Профиль",

      // Home Screen
      "home.discoverTitle": "Найти",
      "home.discoverSubtitle": "Найдите близких по духу людей",
       "home.section.bio": "О себе",
      "home.section.interests": "Интересы",
      "home.tag.photography": "Фотография",
      "home.tag.hiking": "Походы",
      "home.tag.coffee": "Кофе",
      "home.tag.travel": "Путешествия",
      "home.tag.reading": "Чтение",


      // Chat Screen
      "chat.title": "Чат",
      "chat.comingSoon": "Скоро...",
      "chat.underDevelopment": "Наш мессенджер находится в разработке.",

      // Profile Screen
      "profile.title": "Настройки профиля",
      "profile.editProfile": "✏️ Редактировать профиль",
      "profile.nameLabel": "Имя",
      "profile.bioLabel": "О себе",
      "profile.filterPreferences": "🔍 Настройки фильтра",
      "profile.ageRangeLabel": "Возрастной диапазон",
      "profile.rangeSeparator": "до",
      "profile.distanceLabel": "Расстояние (км)",
      "profile.languageLabel": "🌐 Язык",
       "lang.en": "English",
      "lang.ru": "Русский",
      "lang.uz": "O'zbek"
  },
  uz: {
       // Nav
      "nav.home": "Bosh sahifa",
      "nav.chat": "Chat",
      "nav.profile": "Profil",

      // Home Screen
      "home.discoverTitle": "Kashf etish",
      "home.discoverSubtitle": "Fikrlar yaqin odamlarni toping",
       "home.section.bio": "Men haqimda",
      "home.section.interests": "Qiziqishlar",
      "home.tag.photography": "Fotografiya",
      "home.tag.hiking": "Piyoda sayr",
      "home.tag.coffee": "Kofe",
      "home.tag.travel": "Sayohat",
      "home.tag.reading": "Kitob o'qish",

      // Chat Screen
      "chat.title": "Chat",
      "chat.comingSoon": "Tez orada...",
      "chat.underDevelopment": "Bizning xabar almashish funksiyasi ishlab chiqilmoqda.",

      // Profile Screen
      "profile.title": "Profil sozlamalari",
      "profile.editProfile": "✏️ Profilni tahrirlash",
      "profile.nameLabel": "Ism",
      "profile.bioLabel": "Men haqimda",
      "profile.filterPreferences": "🔍 Filtrlash sozlamalari",
      "profile.ageRangeLabel": "Yosh oralig'i",
      "profile.rangeSeparator": "gacha",
      "profile.distanceLabel": "Masofa (km)",
      "profile.languageLabel": "🌐 Til",
       "lang.en": "English",
      "lang.ru": "Русский",
      "lang.uz": "O'zbek"
  }
};


document.addEventListener('DOMContentLoaded', function() {

  const navItems = document.querySelectorAll('.nav-item');
  const screens = document.querySelectorAll('.screen');

  navItems.forEach(item => {
      item.addEventListener('click', function() {
          const targetScreen = this.getAttribute('data-screen');
          
          // Update active nav item
          navItems.forEach(nav => nav.classList.remove('active'));
          this.classList.add('active');
          
          // Show target screen with animation
          screens.forEach(screen => {
              screen.classList.remove('active');
              screen.style.opacity = '0';
          });
          
          const activeScreen = document.getElementById(targetScreen);
          activeScreen.classList.add('active');
          
          // Fade in animation
          setTimeout(() => {
              activeScreen.style.opacity = '1';
              activeScreen.style.transition = 'opacity 0.3s ease';
          }, 50);
      });
  });

  // Profile tabs functionality
  const tabs = document.querySelectorAll('.tab');
  const tabContents = document.querySelectorAll('.tab-content');

  tabs.forEach(tab => {
      tab.addEventListener('click', function() {
          const targetTab = this.getAttribute('data-tab');
          
          // Update active tab
          tabs.forEach(t => t.classList.remove('active'));
          this.classList.add('active');
          
          // Show target tab content with animation
          tabContents.forEach(content => {
              content.classList.remove('active');
              content.style.opacity = '0';
          });
          
          const activeContent = document.getElementById(targetTab + 'Tab');
          activeContent.classList.add('active');
          
          // Fade in animation
          setTimeout(() => {
              activeContent.style.opacity = '1';
              activeContent.style.transition = 'opacity 0.3s ease';
          }, 50);
      });
  });

  // Like/Dislike button functionality
  const likeBtn = document.querySelector('.action-btn.like');
  const dislikeBtn = document.querySelector('.action-btn.dislike');
  const toast = document.getElementById('toast');
  const toastClose = document.querySelector('.toast-close');

  likeBtn.addEventListener('click', function() {
      showToast('Liked!', 'You liked this profile. We\'ll let you know if it\'s a match!', 'heart');
  });

  dislikeBtn.addEventListener('click', function() {
      showToast('Passed', 'Profile skipped. Finding your next potential match...', 'times');
  });

  toastClose.addEventListener('click', function() {
      toast.classList.remove('show');
  });

  function showToast(title, message, icon) {
      const toastTitle = document.querySelector('.toast-message h3');
      const toastMessage = document.querySelector('.toast-message p');
      const toastIcon = document.querySelector('.toast-icon');
      
      toastTitle.textContent = title;
      toastMessage.textContent = message;
      toastIcon.className = 'fas fa-' + icon + ' toast-icon';
      
      toast.classList.add('show');
      
      // Auto hide after 3 seconds
      setTimeout(() => {
          toast.classList.remove('show');
      }, 3000);
  }

  // Filter tag selection
  const filterTags = document.querySelectorAll('.filter-tag');
  
  filterTags.forEach(tag => {
      tag.addEventListener('click', function() {
          this.classList.toggle('selected');
      });
  });

  // Language option selection
  const languageOptions = document.querySelectorAll('.language-option');
  
  languageOptions.forEach(option => {
      option.addEventListener('click', function() {
          languageOptions.forEach(opt => opt.classList.remove('selected'));
          this.classList.add('selected');
      });
  });

  // Initialize screens with opacity for transitions
  screens.forEach(screen => {
      if (!screen.classList.contains('active')) {
          screen.style.opacity = '0';
      } else {
          screen.style.opacity = '1';
      }
      screen.style.transition = 'opacity 0.3s ease';
  });

  // Initialize tab contents with opacity for transitions
  tabContents.forEach(content => {
      if (!content.classList.contains('active')) {
          content.style.opacity = '0';
      } else {
          content.style.opacity = '1';
      }
      content.style.transition = 'opacity 0.3s ease';
  });
});