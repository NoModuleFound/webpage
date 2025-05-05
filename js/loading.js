document.addEventListener('DOMContentLoaded', function() {
  const backend_url = 'https://xz2-production.up.railway.app/api';
  const tg = window.Telegram.WebApp;

  const loadingIndicatorDiv = document.getElementById('loading-indicator');
  const errorDisplayDiv = document.getElementById('error-display');
  const mainContentDiv = document.getElementById('main');

  function displayError(message) {
    if (loadingIndicatorDiv) loadingIndicatorDiv.style.display = 'none';

    if (errorDisplayDiv) {
      errorDisplayDiv.textContent = message;
      errorDisplayDiv.classList.remove('hidden'); 
      errorDisplayDiv.classList.add('text-red-500', 'font-semibold', 'text-lg', 'mt-4');
    }

    if (mainContentDiv) mainContentDiv.style.display = 'none';

    tg.ready(); 
    tg.expand();
  }

  tg.ready();
  tg.expand();

  if (!tg.initData || tg.initData === "") {
    displayError('You need to login via Telegram');
    console.log('InitData is invalid or missing');
    return;
  }

  console.log('InitData:', tg.initData);
  
  // Set language preference from Telegram user data
  try {
    // Handle language setting from user data
    // Note: initData isn't a URL query string, but we'll try both approaches
    let userData = null;
    
    // First try to extract user from initData directly
    try {
      const initDataParams = new URLSearchParams(tg.initData);
      const userParam = initDataParams.get('user');
      if (userParam) {
        userData = JSON.parse(decodeURIComponent(userParam));
      }
    } catch (e) {
      console.log('Could not parse initData as URLSearchParams, trying alternative method');
    }
    
    // If the above fails, try with WebApp user data
    if (!userData && tg.initDataUnsafe && tg.initDataUnsafe.user) {
      userData = tg.initDataUnsafe.user;
    }
    
    // Set language cookie if user data was found
    if (userData) {
      const supportedLanguages = ['en', 'ru', 'uz'];
      const languageCode = userData.language_code || 'en';
      const selectedLanguage = supportedLanguages.includes(languageCode) ? languageCode : 'en';
      document.cookie = `lang=${selectedLanguage}; path=/;`;
      console.log(`Language set to: ${selectedLanguage}`);
    }
  } catch (error) {
    console.error('Error processing language settings:', error);
    // Continue with authentication even if language processing fails
  }

  // Authenticate with the backend
  fetch(`${backend_url}/auth/web-app-login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      initdata: tg.initData
    })
  })
  .then(response => {
    console.log('Auth response status:', response.status);
    
    if (response.status === 404) {
      console.log('User not found, redirecting to signup');
      window.location.href = "sign-up.html";
      return null;
    }
    
    if (!response.ok) {
      throw new Error(`Authentication failed with status: ${response.status}`);
    }

    return response.json();
  })
  .then(data => {
    if (!data) return; // Handle the 404 redirect case
    
    if (data && data.access_token && data.refresh_token) {
      const bearerToken = JSON.stringify({
        access_token: data.access_token
      });
      const refreshToken = data.refresh_token;

      document.cookie = `bearer=${encodeURIComponent(bearerToken)}; path=/; Secure; HttpOnly;`;
      document.cookie = `refresh_token=${encodeURIComponent(refreshToken)}; path=/; Secure; HttpOnly;`;
      console.log('Authentication successful, redirecting to home');
      // window.location.href = "home.html";
    } else {
      displayError("Authentication failed. Invalid token received.");
    }
  })
  .catch(error => {
    console.error('Authentication error:', error);
    displayError("Authentication failed. Please try again later.");
  });
});