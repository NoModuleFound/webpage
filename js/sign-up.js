let currentStep = 1;
const totalSteps = 7;
let selectedLanguage = getCookie('lang') || 'en';
const backend_url = 'https://xz2-production.up.railway.app';
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
  return null;
}

const tg = window.Telegram.WebApp;

const formData = {
    language: selectedLanguage, // Set default language initially
    firstName: '',
    lastName: '',
    birthDate: '',
    gender: '',
    institution: '',
    otherInstitution: '',
    interests: [],
    aboutMe: ''
};

const translations = {
    en: {
        welcome_title: "Welcome to Daily Manfaat",
        welcome_subtitle: "Connecting passionate minds through shared interests",
        language_prompt: "Let's get started by selecting your preferred language",
        continue: "Continue",
        back: "Back",
        uzbek: "Uzbek",
        russian: "Russian",
        english: "English",
        identity_title: "Tell us about yourself",
        identity_subtitle: "This helps us personalize your experience",
        first_name: "First Name *",
        first_name_placeholder: "Your first name",
        last_name: "Last Name (Optional)",
        last_name_placeholder: "Your last name",
        demographics_title: "Basic information",
        demographics_subtitle: "This helps us find relevant communities for you",
        birth_date: "Date of Birth *",
        gender: "Gender *",
        male: "Male",
        female: "Female",
        other_gender: "Other / Prefer not to say",
        institution_title: "Your institution",
        institution_subtitle: "Connect with peers from your school or organization",
        institution: "Institution *",
        select_institution: "Select your institution",
        other: "Other",
        other_institution: "Enter your institution name",
        interests_title: "Your interests",
        interests_subtitle: "Select topics you're passionate about to connect with like-minded people",
        interest_error: "Please select at least one interest",
        personal_title: "Personal touch",
        personal_subtitle: "Tell others about yourself (optional)",
        about_me: "About Me (Optional)",
        about_me_placeholder: "Share something interesting about yourself...",
        max_chars: "Max 300 characters",
        complete_title: "You're all set!",
        complete_subtitle: "Review your information below before creating your profile",
        create_profile: "Create My Profile",
        edit_profile: "Back to Edit",
        // Review page specific translations
        years: "years", // Used in reviewAgeGender
         // Validation messages (consider adding these keys and translations)
         // requires_field: "is required"
         // invalid_age: "Please enter a valid date of birth."
    },
    uz: {
        welcome_title: "Daily Manfaatga xush kelibsiz",
        welcome_subtitle: "Qiziqishlarni baham ko'radigan insonlarni bog'laymiz",
        language_prompt: "Iltimos, tilni tanlang",
        continue: "Davom etish",
        back: "Orqaga",
        uzbek: "O'zbekcha",
        russian: "Ruscha",
        english: "Inglizcha",
        identity_title: "O'zingiz haqingizda ayting",
        identity_subtitle: "Bu bizga sizga mos tajriba yaratishga yordam beradi",
        first_name: "Ism *",
        first_name_placeholder: "Ismingizni kiriting",
        last_name: "Familiya (Ixtiyoriy)",
        last_name_placeholder: "Familiyangizni kiriting",
        demographics_title: "Asosiy ma'lumotlar",
        demographics_subtitle: "Bu bizga tegishli jamoalarni topishga yordam beradi",
        birth_date: "Tug'ilgan sana *",
        gender: "Jins *",
        male: "Erkak",
        female: "Ayol",
        other_gender: "Boshqa / Aytishni xohlamayman",
        institution_title: "Muassasangiz",
        institution_subtitle: "Maktab yoki tashkilotingizdagi hamkasblar bilan bog'laning",
        institution: "Muassasa *",
        select_institution: "Muassasangizni tanlang",
        other: "Boshqa",
        other_institution: "Muassasa nomini kiriting",
        interests_title: "Qiziqishlaringiz",
        interests_subtitle: "O'xshash fikrli odamlar bilan bog'lanish uchun qiziqishlaringizni tanlang",
        interest_error: "Iltimos, kamida bitta qiziqishni tanlang",
        personal_title: "Shaxsiy ma'lumot",
        personal_subtitle: "O'zingiz haqingizda boshqalarga ayting (ixtiyoriy)",
        about_me: "Men haqimda (Ixtiyoriy)",
        about_me_placeholder: "O'zingiz haqingizda qiziqarli narsalar yozing...",
        max_chars: "Maksimal 300 belgi",
        complete_title: "Hammasi tayyor!",
        complete_subtitle: "Profil yaratishdan oldin ma'lumotlaringizni ko'rib chiqing",
        create_profile: "Profil yaratish",
        edit_profile: "Tahrirlashga qaytish",
         // Review page specific translations
        years: "yosh"
    },
    ru: {
        welcome_title: "Добро пожаловать в Daily Manfaat",
        welcome_subtitle: "Объединяем людей с общими интересами",
        language_prompt: "Пожалуйста, выберите язык",
        continue: "Продолжить",
        back: "Назад",
        uzbek: "Узбекский",
        russian: "Русский",
        english: "Английский",
        identity_title: "Расскажите о себе",
        identity_subtitle: "Это поможет нам персонализировать ваш опыт",
        first_name: "Имя *",
        first_name_placeholder: "Ваше имя",
        last_name: "Фамилия (Необязательно)",
        last_name_placeholder: "Ваша фамилия",
        demographics_title: "Основная информация",
        demographics_subtitle: "Это поможет нам найти подходящие сообщества",
        birth_date: "Дата рождения *",
        gender: "Пол *",
        male: "Мужской",
        female: "Женский",
        other_gender: "Другой / Не указано",
        institution_title: "Ваше учреждение",
        institution_subtitle: "Свяжитесь с коллегами из вашей школы или организации",
        institution: "Учреждение *",
        select_institution: "Выберите учреждение",
        other: "Другое",
        other_institution: "Введите название учреждения",
        interests_title: "Ваши интересы",
        interests_subtitle: "Выберите темы, которые вам интересны",
        interest_error: "Пожалуйста, выберите хотя бы один интерес",
        personal_title: "Личная информация",
        personal_subtitle: "Расскажите о себе (необязательно)",
        about_me: "Обо мне (Необязательно)",
        about_me_placeholder: "Расскажите что-нибудь интересное о себе...",
        max_chars: "Максимум 300 символов",
        complete_title: "Все готово!",
        complete_subtitle: "Проверьте информацию перед созданием профиля",
        create_profile: "Создать профиль",
        edit_profile: "Вернуться к редактированию",
        // Review page specific translations
        years: "лет"
    }
};

// Updated and expanded list of interests WITH icons
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


// DOM elements
const formContainer = document.getElementById('formContainer');
const progressBar = document.getElementById('progressBar');
const interestError = document.getElementById('interestError');
const reviewName = document.getElementById('reviewName');
const reviewAgeGender = document.getElementById('reviewAgeGender');
const reviewInstitution = document.getElementById('reviewInstitution');
const reviewInterests = document.getElementById('reviewInterests');
const reviewAbout = document.getElementById('reviewAbout');
const reviewAboutContainer = document.getElementById('reviewAboutContainer');
const institutionSelect = document.getElementById('institution');
const otherInstitutionContainer = document.getElementById('otherInstitutionContainer');
const otherInstitution = document.getElementById('otherInstitution');
const interestsContainer = document.getElementById('interestsContainer'); // Get the container


// Language translation function
function applyTranslation() {
    document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.getAttribute('data-translate');
        if (translations[selectedLanguage] && translations[selectedLanguage][key]) {
            element.textContent = translations[selectedLanguage][key];
        }
    });
     document.querySelectorAll('[data-translate-placeholder]').forEach(element => {
        const key = element.getAttribute('data-translate-placeholder');
         if (translations[selectedLanguage] && translations[selectedLanguage][key]) {
            element.placeholder = translations[selectedLanguage][key];
        }
    });

    // Also re-render interests to apply language
    if (interestsContainer) {
         renderInterests(selectedLanguage);
    }
     // Update institution 'Other' option text explicitly as it's in a select
     const otherOption = institutionSelect.querySelector('option[value="other"]');
     if(otherOption) {
         otherOption.textContent = translations[selectedLanguage] ? translations[selectedLanguage]['other'] : 'Other';
     }
     const selectInstitutionOption = institutionSelect.querySelector('option[disabled][selected]');
     if(selectInstitutionOption) {
         selectInstitutionOption.textContent = translations[selectedLanguage] ? translations[selectedLanguage]['select_institution'] : 'Select your institution';
     }

     // Update gender options text
     document.querySelectorAll('.gender-option p').forEach(pElement => {
        const key = pElement.getAttribute('data-translate');
         if (key && translations[selectedLanguage] && translations[selectedLanguage][key]) {
            pElement.textContent = translations[selectedLanguage][key];
         }
     });
}

// Render interests function
function renderInterests(lang) {
    if (!interestsContainer) return; // Check if the container exists
    interestsContainer.innerHTML = ''; // Clear current interests

    Object.keys(interestData).forEach(key => {
        const interest = interestData[key];
        const translatedName = interest[lang] || interest.en; // Fallback to English
        const iconClass = interest.icon; // Get the icon class

        const isSelected = formData.interests.includes(key);

        const interestDiv = document.createElement('div');
        interestDiv.classList.add('interest-tag', 'p-3', 'border-2', 'rounded-xl', 'text-center', 'cursor-pointer', 'flex', 'flex-col', 'items-center', 'justify-center', 'space-y-1'); // Basic classes
         if (isSelected) { // Apply selected classes based on state
             interestDiv.classList.add('selected', 'border-rose-500', 'bg-rose-50');
         } else {
             interestDiv.classList.add('border-gray-200');
         }
        interestDiv.setAttribute('onclick', `toggleInterest(this, '${key}')`);
        interestDiv.setAttribute('data-interest-key', key); // Store key for easier lookup

        const iconElement = document.createElement('i');
        if (iconClass) { // Check if iconClass exists
            iconElement.classList.add('fas', iconClass, 'text-rose-500', 'text-xl');
        } else {
            // Fallback if no icon class is defined for an interest (shouldn't happen with current data)
            iconElement.classList.add('fas', 'fa-heart', 'text-rose-500', 'text-xl'); // Default icon
        }


        const textElement = document.createElement('p');
        textElement.classList.add('text-sm', 'font-medium');
        textElement.textContent = translatedName;

        interestDiv.appendChild(iconElement);
        interestDiv.appendChild(textElement);
        interestsContainer.appendChild(interestDiv);
    });
}


// Institution select change handler
institutionSelect.addEventListener('change', function() {
    if (this.value === 'other') {
        otherInstitutionContainer.classList.remove('hidden');
    } else {
        otherInstitutionContainer.classList.add('hidden');
        otherInstitution.value = ''; // Clear the other institution field
    }
});

// Navigation functions
function showStep(step) {
    const slides = document.querySelectorAll('.slide');
    slides.forEach(slide => {
        slide.classList.remove('active');
        slide.style.display = 'none'; // Hide all
    });
    const activeSlide = document.getElementById(`step${step}`);
    activeSlide.classList.add('active');
    activeSlide.style.display = 'block'; // Show active one
}

function nextStep() {
    // Validate current step before proceeding
    if (!validateStep(currentStep)) {
        return;
    }

    // Update form data
    updateFormData();

    // Increment step
    currentStep++;

    // If we're going to the review step, update the review information
    if (currentStep === totalSteps) {
        updateReviewInfo();
    }

    // Show next step
    showStep(currentStep);

    // Update progress bar
    updateProgressBar();
}

 function prevStep() {
    // Decrement step
    currentStep--;

    // Show previous step
    showStep(currentStep);

    // Update progress bar
    updateProgressBar();
}

function updateProgressBar() {
    const progressPercentage = (currentStep / totalSteps) * 100;
    progressBar.style.width = `${progressPercentage}%`;
}

function validateStep(step) {
    let isValid = true;
    let errorMessage = '';

    switch(step) {
        case 1:
            if (!formData.language) {
                 errorMessage = translations[selectedLanguage] ? translations[selectedLanguage]['language_prompt'] : 'Please select a language';
                isValid = false;
            }
            break;

        case 2:
            const firstName = document.getElementById('firstName').value.trim();
            if (!firstName) {
                 errorMessage = (translations[selectedLanguage] ? translations[selectedLanguage]['first_name'] : 'First Name') + ' ' + (translations[selectedLanguage].requires_field || 'is required'); // Use translated 'is required' if available
                isValid = false;
            }
            break;

        case 3:
            const birthDate = document.getElementById('birthDate').value;
            if (!birthDate) {
                 errorMessage = (translations[selectedLanguage] ? translations[selectedLanguage]['birth_date'] : 'Date of Birth') + ' ' + (translations[selectedLanguage].requires_field || 'is required'); // Use translated 'is required' if available
                isValid = false;
            } else {
                const age = calculateAge(birthDate);
                if (age === null || age < 10 || age > 100) { // Add basic age validation
                     errorMessage = translations[selectedLanguage].invalid_age || "Please enter a valid date of birth."; // Use translated message
                     isValid = false;
                }
            }
            if (isValid && !formData.gender) { // Check gender only if date is valid
                 errorMessage = (translations[selectedLanguage] ? translations[selectedLanguage]['gender'] : 'Gender') + ' ' + (translations[selectedLanguage].requires_field || 'is required'); // Use translated 'is required' if available
                isValid = false;
            }
            break;

        case 4:
            const institution = institutionSelect.value;
            if (!institution) {
                 errorMessage = (translations[selectedLanguage] ? translations[selectedLanguage]['institution'] : 'Institution') + ' ' + (translations[selectedLanguage].requires_field || 'is required'); // Use translated 'is required' if available
                isValid = false;
            } else if (institution === 'other' && !otherInstitution.value.trim()) {
                 errorMessage = (translations[selectedLanguage] ? translations[selectedLanguage]['other_institution'] : 'Enter your institution name') + ' ' + (translations[selectedLanguage].requires_field || 'is required'); // Use translated 'is required' if available
                isValid = false;
            }
            break;

        case 5:
            if (formData.interests.length === 0) {
                errorMessage = translations[selectedLanguage] ? translations[selectedLanguage]['interest_error'] : 'Please select at least one interest';
                interestError.classList.remove('hidden');
                isValid = false;
            } else {
               interestError.classList.add('hidden');
               isValid = true;
            }
            break;
         case 6:
             // Optional field, no validation needed to proceed
             isValid = true;
             break;

        default:
            isValid = true;
            break;
    }

    if (!isValid) {
         // Only show alert if there's an error message
         if (errorMessage) {
            alert(errorMessage);
         }
         return false;
    }
     return true;
}


function updateFormData() {
    switch(currentStep) {
        case 1:
            // Language is already set by selectLanguage()
            break;

        case 2:
            formData.firstName = document.getElementById('firstName').value.trim();
            formData.lastName = document.getElementById('lastName').value.trim();
            break;

        case 3:
            formData.birthDate = document.getElementById('birthDate').value;
            // Gender is already set by selectGender()
            break;

        case 4:
            formData.institution = institutionSelect.value;
            if (institutionSelect.value === 'other') {
                formData.otherInstitution = otherInstitution.value.trim();
            } else {
                formData.otherInstitution = ''; // Clear if not 'other'
            }
            break;

        case 5:
            // Interests are already managed by toggleInterest()
            break;

        case 6:
            formData.aboutMe = document.getElementById('aboutMe').value.trim().substring(0, 300); // Trim and limit chars
            document.getElementById('aboutMe').value = formData.aboutMe; // Update textarea in case it was trimmed
            break;
    }
}

 // Calculate age from birth date string (YYYY-MM-DD)
 function calculateAge(birthDateString) {
     if (!birthDateString) return null;
     try {
        const today = new Date();
        const birthDate = new Date(birthDateString);
         // Ensure birthDate is a valid date
        if (isNaN(birthDate.getTime())) {
            return null; // Handle invalid date strings
        }
        let age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
         // Prevent negative or unrealistically large ages
        if (age < 0 || age > 120) { // Basic sanity check for age
            return null;
        }
        return age;
     } catch (e) {
         console.error("Error calculating age:", e);
         return null; // Handle any potential errors during calculation
     }
 }


function updateReviewInfo() {
    // Name
    reviewName.textContent = formData.firstName + (formData.lastName ? ' ' + formData.lastName : '');

    // Age and gender
     const age = calculateAge(formData.birthDate);
     const translatedYears = translations[selectedLanguage] ? translations[selectedLanguage]['years'] : 'years';
     const ageString = age !== null ? `${age} ${translatedYears}` : '';
     const translatedGender = formData.gender ? (translations[selectedLanguage] && translations[selectedLanguage][formData.gender] ? translations[selectedLanguage][formData.gender] : formData.gender) : '';

    reviewAgeGender.textContent = [ageString, translatedGender].filter(Boolean).join(' • '); // Combine if both exist

    // Institution
    if (formData.institution === 'other') {
        reviewInstitution.textContent = formData.otherInstitution || (translations[selectedLanguage] ? translations[selectedLanguage]['other'] : 'Other');
    } else {
        const selectedOption = institutionSelect.querySelector(`option[value="${formData.institution}"]`);
         // Use the text content of the selected option
        reviewInstitution.textContent = selectedOption ? selectedOption.textContent : (translations[selectedLanguage] ? translations[selectedLanguage]['select_institution'] : 'Select your institution');
    }

    // Interests
    reviewInterests.textContent = formData.interests.map(interestKey => {
         const interest = interestData[interestKey];
         return interest ? (interest[selectedLanguage] || interest.en) : interestKey; // Use translated name, fallback to English or key
    }).join(', ');

    // About me
    if (formData.aboutMe) {
        reviewAbout.textContent = formData.aboutMe;
        reviewAboutContainer.classList.remove('hidden');
    } else {
        reviewAboutContainer.classList.add('hidden');
    }
}

// Form field interaction functions
function selectLanguage(lang, element) {
    formData.language = lang;
    selectedLanguage = lang; // Update global language variable

    // Remove selected class from all options
    document.querySelectorAll('.language-option').forEach(option => {
        option.classList.remove('selected', 'border-rose-500');
        option.classList.add('border-gray-200');
    });

    // Add selected class to clicked option
    if (element) { // Element might be null on initial load
        element.classList.add('selected', 'border-rose-500');
        element.classList.remove('border-gray-200');
    }

    applyTranslation(); // Apply translation immediately
}

function selectGender(gender, element) {
    formData.gender = gender;

    // Remove selected class from all options
    document.querySelectorAll('.gender-option').forEach(option => {
        option.classList.remove('selected', 'border-rose-500');
        option.classList.add('border-gray-200');
    });

    // Add selected class to clicked option
    element.classList.add('selected', 'border-rose-500');
    element.classList.remove('border-gray-200');
}

function toggleInterest(element, interestKey) {
    // Check if the interest key is valid (exists in interestData)
    if (!interestData[interestKey]) {
         console.warn(`Unknown interest key: ${interestKey}`);
         return;
    }

    const index = formData.interests.indexOf(interestKey);
    if (index === -1) {
        // Add interest
        formData.interests.push(interestKey);
         element.classList.add('selected', 'border-rose-500', 'bg-rose-50');
         element.classList.remove('border-gray-200');
    } else {
        // Remove interest
        formData.interests.splice(index, 1);
         element.classList.remove('selected', 'border-rose-500', 'bg-rose-50');
         element.classList.add('border-gray-200');
    }
     // console.log("Selected Interests:", formData.interests); // Debugging
}

async function submitForm() {
  // Prepare the data for API submission
  // Calculate age from birthDate
  const age = calculateAge(formData.birthDate);
  
  // Map gender to match GenderEnum values ('male' or 'female')
  const genderMapping = {
      'male': 'male',
      'female': 'female'
      // Add other mappings if your form has more gender options
  };
  
  // Get institution name
  const institutionName = formData.institution === 'other' ? 
      formData.otherInstitution : 
      institutionSelect.querySelector(`option[value="${formData.institution}"]`)?.textContent || formData.institution;
  
  // Format interests as comma-separated string if needed by API
  const interestsString = formData.interests.join(', ');
  
  // Create API-compatible user object
  const apiFormData = {
      first_name: formData.firstName,
      last_name: formData.lastName || null,
      age: age,
      gender: genderMapping[formData.gender] || formData.gender,
      interests: interestsString,
      institution: institutionName || null,
      init_data: tg.initData,
      lang: formData.language,
      bio: formData.aboutMe
  };
  
  try {
      const response = await fetch(`${backend_url}/auth/sign-up`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(apiFormData)
      });
      
      const data = await response.json();
      
      if (response.ok) {
          console.log('Form submitted:', apiFormData);
          document.cookie = `jwt=${data.token}; path=/;`;
          const successMessage = translations[selectedLanguage]?.profile_created || 'Profile created successfully!';
          alert(successMessage);

          window.location.href = 'home.html';
      } else {
          if (response.status === 409) {
              const conflictMessage = translations[selectedLanguage]?.user_exists || 'Error: User already exists';
              alert(conflictMessage);
          } else {
              const errorMessage = translations[selectedLanguage]?.submission_error || 'Error:';
              alert(`${errorMessage} ${data.message || 'Something went wrong'}`);
          }
      }
  } catch (error) {
      console.error('Error submitting form:', error);
      const failureMessage = translations[selectedLanguage]?.profile_creation_failed || 'Failed to create profile. Please try again.';
      alert(failureMessage);
  }
}

document.addEventListener('DOMContentLoaded', () => {
    showStep(1);

    const defaultLangElement = document.querySelector('.language-option[onclick*="selectLanguage(\'en\')"]');
     if (defaultLangElement) {
         selectLanguage('en', defaultLangElement);
     } else {
         selectedLanguage = 'en';
         formData.language = 'en';
         applyTranslation();
     }
    updateProgressBar();
});
