const backend_url = 'https://'
const tg = window.Telegram.WebApp;
console.log(tg.initData)
const queryParams = new URLSearchParams(tg.initData);
const languageCode = queryParams.get('user') ? JSON.parse(decodeURIComponent(queryParams.get('user'))).language_code : 'en';
const supportedLanguages = ['en', 'ru', 'uz'];
const selectedLanguage = supportedLanguages.includes(languageCode) ? languageCode : 'en';
document.cookie = `lang=${selectedLanguage}; path=/;`;
const loadingContentDiv = document.getElementById('loading-content');
const loadingIndicatorDiv = document.getElementById('loading-indicator');
const errorDisplayDiv = document.getElementById('error-display');
const mainContentDiv = document.getElementById('main');

window.onload = async function () {

  function displayError(message) {
      loadingIndicatorDiv.style.display = 'none'; // Hide spinner and loading text
      errorDisplayDiv.textContent = message;
      errorDisplayDiv.classList.remove('hidden'); // Show the error div
      mainContentDiv.style.display = 'none'; // Ensure main content remains hidden
      tg.ready(); // Still call ready if possible, even on error, might help in some contexts
      tg.expand(); // Try to expand the web app size
  }

  loadingContentDiv.style.display = 'block';
  loadingIndicatorDiv.style.display = 'block'; 
  errorDisplayDiv.classList.add('hidden'); 
  mainContentDiv.style.display = 'none';
};

if (!tg.initData) {
  displayError('You should login via Telegram');
} else {
  console.log('Telegram initData is available:', tg.initData);
  (async () => {
    try {
      const response = await fetch(`${backend_url}/auth/web-app`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          initData: tg.initData
        })
      });

      if (response.status === 404) {
        window.location.href = "sign-up.html";
        return;
      }

      if (response.status === 401) {
        const data = await response.json();
        if (data && data.token) {
          document.cookie = `jwt=${data.token}; path=/;`;
          window.location.href = "home.html"; // Redirect to home page
        } else {
          displayError("Unauthorized access. Please try again.");
        }
        return;
      }

      if (!response.ok) {
        displayError("Failed to authenticate with the backend.");
        return;
      }

      const data = await response.json();

      if (data && data.status === "success") {
        console.log("Authentication successful. JWT Token:", data.token);
        document.cookie = `jwt=${data.token}; path=/;`;
        window.location.href = "main.html"; // Redirect to main page
      } else if (data && data.status === "sign-up-required") {
        window.location.href = "sign-up.html"; // Redirect to sign-up page
      } else {
        displayError("Authentication failed. Please try again.");
      }
    } catch (error) {
      displayError("An error occurred during authentication. Please try again later.");
      console.error(error);
    }
  })();
}



// if (tg.initData) {
//   await fetch(`${backend_url}/auth/web-app`, {
//     method: "POST",
//     headers: {
//         "Content-Type": "application/json"
//     },
//     body: JSON.stringify({
//         initData: tg.initData
//     })
//   }).then(response => {
//     if (!response.ok) {
//       displayError("Failed to authenticate with the backend.");
//       return null;
//     }
//     return response.json();
//   }).then(data => {
//     if (data && data.status === "success") {
//       console.log("Authentication successful. JWT Token:", data.token);
//     } else {
//       displayError("Authentication failed. Please try again.");
//     }
//   }).catch(error => {
//     displayError("An error occurred during authentication. Please try again later.");
//     console.error(error);
//   });
// } else {
//   displayError("Initialization data is missing. Please reload the page or contact support.");
// }
