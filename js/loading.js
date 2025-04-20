window.onload = async function () {
  const tg = window.Telegram.WebApp;
  const loadingContentDiv = document.getElementById('loading-content');
  const loadingIndicatorDiv = document.getElementById('loading-indicator');
  const errorDisplayDiv = document.getElementById('error-display');
  const mainContentDiv = document.getElementById('main');

  // Function to display an error message on the loading screen
  function displayError(message) {
      loadingIndicatorDiv.style.display = 'none'; // Hide spinner and loading text
      errorDisplayDiv.textContent = message;
      errorDisplayDiv.classList.remove('hidden'); // Show the error div
      mainContentDiv.style.display = 'none'; // Ensure main content remains hidden
      tg.ready(); // Still call ready if possible, even on error, might help in some contexts
      tg.expand(); // Try to expand the web app size
  }

  // Ensure loading content is visible initially, hide main content
  loadingContentDiv.style.display = 'block';
  loadingIndicatorDiv.style.display = 'block'; // Ensure spinner is visible
  errorDisplayDiv.classList.add('hidden'); // Ensure error is hidden
  mainContentDiv.style.display = 'none';


  // Basic check for Telegram Web App context
  if (!tg) {
       console.error("Telegram Web App object not found. Are you running in a Telegram Web App?");
       displayError("Error: Please open this page within the Telegram app.");
       return; // Stop execution
  }

  tg.ready(); // Initialize Telegram Web App
  tg.expand(); // Automatically expand the web app

   // Check if user data is available (needed for user.id)
  if (!tg.initDataUnsafe || !tg.initDataUnsafe.user) {
      console.error("Telegram user data not available.");
      displayError("Error: Could not retrieve Telegram user data.");
      return; // Stop execution
  }

  const user = tg.initDataUnsafe.user;

  try {
      const res = await fetch("https://your-backend.com/api/check-user", { // *** IMPORTANT: Replace with your actual backend endpoint ***
          method: "POST",
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify({
              telegram_id: user.id
          })
      });

       if (!res.ok) {
           // Handle HTTP errors (e.g., 404, 500)
           throw new Error(`HTTP error! Status: ${res.status}`);
       }

      const data = await res.json();

      // Hide loading indicator once response is received
      loadingIndicatorDiv.style.display = "none";

      if (!data.exists) {
          console.log("User not found, redirecting to registration.");
          // Redirect to registration page
          // NOTE: Redirecting changes the page, so loading content will disappear
          window.location.href = "/sign-up.html";
      } else {
          console.log("User found, showing main content.");
          // User exists, hide loading content div and show the main content div
          loadingContentDiv.style.display = "none";
          mainContentDiv.style.display = "block";
          // If your main app requires complex setup, you might
          // initialize it here after showing the div.
      }
  } catch (err) {
      console.error("Error checking user:", err);
      // Display the error message within the loading content area
      displayError(`Failed to load profile: ${err.message}`);
  }
};