let currentStep = 1;
const totalSteps = 7;

const formData = {
    language: null,
    firstName: '',
    lastName: '',
    birthDate: '',
    gender: '',
    institution: '',
    otherInstitution: '',
    interests: [],
    aboutMe: ''
};

// DOM elements
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

// Institution select change handler
institutionSelect.addEventListener('change', function() {
    if (this.value === 'other') {
        otherInstitutionContainer.classList.remove('hidden');
    } else {
        otherInstitutionContainer.classList.add('hidden');
    }
});

// Navigation functions
function nextStep() {
    // Validate current step before proceeding
    if (!validateStep(currentStep)) {
        return;
    }
    
    // Update form data
    updateFormData();
    
    // Hide current step
    document.getElementById(`step${currentStep}`).classList.remove('active');
    document.getElementById(`step${currentStep}`).classList.add('previous');
    
    // Increment step
    currentStep++;
    
    // If we're going to the review step, update the review information
    if (currentStep === totalSteps) {
        updateReviewInfo();
    }
    
    // Show next step
    document.getElementById(`step${currentStep}`).classList.remove('hidden');
    document.getElementById(`step${currentStep}`).classList.add('active');
    
    // Update progress bar
    updateProgressBar();
}

function prevStep() {
    // Hide current step
    document.getElementById(`step${currentStep}`).classList.remove('active');
    document.getElementById(`step${currentStep}`).classList.add('hidden');
    
    // Decrement step
    currentStep--;
    
    // Show previous step
    document.getElementById(`step${currentStep}`).classList.remove('previous');
    document.getElementById(`step${currentStep}`).classList.add('active');
    
    // Update progress bar
    updateProgressBar();
}

function updateProgressBar() {
    const progressPercentage = (currentStep / totalSteps) * 100;
    progressBar.style.width = `${progressPercentage}%`;
}

function validateStep(step) {
    switch(step) {
        case 1:
            if (!formData.language) {
                alert('Please select a language');
                return false;
            }
            return true;
            
        case 2:
            const firstName = document.getElementById('firstName').value.trim();
            if (!firstName) {
                alert('Please enter your first name');
                return false;
            }
            return true;
            
        case 3:
            const birthDate = document.getElementById('birthDate').value;
            if (!birthDate) {
                alert('Please select your date of birth');
                return false;
            }
            if (!formData.gender) {
                alert('Please select your gender');
                return false;
            }
            return true;
            
        case 4:
            const institution = institutionSelect.value;
            if (!institution) {
                alert('Please select your institution');
                return false;
            }
            if (institution === 'other' && !otherInstitution.value.trim()) {
                alert('Please enter your institution name');
                return false;
            }
            return true;
            
        case 5:
            if (formData.interests.length === 0) {
                interestError.classList.remove('hidden');
                return false;
            }
            interestError.classList.add('hidden');
            return true;
            
        default:
            return true;
    }
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
            }
            break;
            
        case 5:
            // Interests are already set by toggleInterest()
            break;
            
        case 6:
            formData.aboutMe = document.getElementById('aboutMe').value.trim();
            break;
    }
}

function updateReviewInfo() {
    // Name
    reviewName.textContent = formData.firstName + (formData.lastName ? ' ' + formData.lastName : '');
    
    // Age and gender
    if (formData.birthDate) {
        const birthDate = new Date(formData.birthDate);
        const ageDiff = Date.now() - birthDate.getTime();
        const ageDate = new Date(ageDiff);
        const age = Math.abs(ageDate.getUTCFullYear() - 1970);
        
        reviewAgeGender.textContent = `${age} years • ${formatGender(formData.gender)}`;
    } else {
        reviewAgeGender.textContent = formatGender(formData.gender);
    }
    
    // Institution
    if (formData.institution === 'other') {
        reviewInstitution.textContent = formData.otherInstitution;
    } else {
        reviewInstitution.textContent = institutionSelect.options[institutionSelect.selectedIndex].text;
    }
    
    // Interests
    reviewInterests.textContent = formData.interests.map(interest => {
        // Convert the stored interest keys to display names
        const interestMap = {
            'photography': 'Photography',
            'startups': 'Startup Ideas',
            'languages': 'Language Exchange',
            'coding': 'Coding Projects',
            'books': 'Book Club',
            'philosophy': 'Philosophy',
            'travel': 'Travel',
            'music': 'Music'
        };
        return interestMap[interest] || interest;
    }).join(', ');
    
    // About me
    if (formData.aboutMe) {
        reviewAbout.textContent = formData.aboutMe;
        reviewAboutContainer.classList.remove('hidden');
    } else {
        reviewAboutContainer.classList.add('hidden');
    }
}

function formatGender(gender) {
    switch(gender) {
        case 'male': return 'Male';
        case 'female': return 'Female';
        case 'other': return 'Other';
        default: return '';
    }
}

// Form field interaction functions
function selectLanguage(language, element) {
    formData.language = language;
    
    // Remove selected class from all options
    document.querySelectorAll('.language-option').forEach(option => {
        option.classList.remove('selected');
        option.classList.remove('border-rose-500');
        option.classList.add('border-gray-200');
    });
    
    // Add selected class to clicked option
    element.classList.add('selected');
    element.classList.add('border-rose-500');
    element.classList.remove('border-gray-200');
}

function selectGender(gender, element) {
    formData.gender = gender;
    
    // Remove selected class from all options
    document.querySelectorAll('.gender-option').forEach(option => {
        option.classList.remove('selected');
        option.classList.remove('border-rose-500');
        option.classList.add('border-gray-200');
    });
    
    // Add selected class to clicked option
    element.classList.add('selected');
    element.classList.add('border-rose-500');
    element.classList.remove('border-gray-200');
}

function toggleInterest(element, interest) {
    element.classList.toggle('selected');
    element.classList.toggle('border-rose-500');
    element.classList.toggle('bg-rose-50');
    
    const index = formData.interests.indexOf(interest);
    if (index === -1) {
        formData.interests.push(interest);
    } else {
        formData.interests.splice(index, 1);
    }
}

function submitForm() {
    // In a real app, you would send the formData to your server here
    alert('Profile created successfully!');
    console.log('Form submitted:', formData);
    
    // Reset form for demo purposes
    // currentStep = 1;
    // updateProgressBar();
    // document.getElementById(`step${totalSteps}`).classList.remove('active');
    // document.getElementById(`step${totalSteps}`).classList.add('hidden');
    // document.getElementById(`step1`).classList.add('active');
    // document.getElementById(`step1`).classList.remove('hidden');
    // formData = {
    //     language: null,
    //     firstName: '',
    //     lastName: '',
    //     birthDate: '',
    //     gender: '',
    //     institution: '',
    //     otherInstitution: '',
    //     interests: [],
    //     aboutMe: ''
    // };
}