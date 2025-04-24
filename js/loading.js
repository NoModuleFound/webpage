import { backend_url } from './url.js';


window.onload = async function () {
  const tg = window.Telegram.WebApp;
  const loadingContentDiv = document.getElementById('loading-content');
  const loadingIndicatorDiv = document.getElementById('loading-indicator');
  const errorDisplayDiv = document.getElementById('error-display');
  const mainContentDiv = document.getElementById('main');


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
  console.log(tg.initData)
};

if (tg.initData) {
  await fetch(`${backend_url}/auth/web-app`, {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        initData: tg.initData
    })
  }).then(response => {
    if (!response.ok) {
      displayError("Failed to authenticate with the backend.");
      return null;
    }
    return response.json();
  }).then(data => {
    if (data && data.status === "success") {
      console.log("Authentication successful. JWT Token:", data.token);
      // You can now use the token for further requests
    } else {
      displayError("Authentication failed. Please try again.");
    }
  }).catch(error => {
    displayError("An error occurred during authentication. Please try again later.");
    console.error(error);
  });
} else {
  displayError("Initialization data is missing. Please reload the page or contact support.");
}
