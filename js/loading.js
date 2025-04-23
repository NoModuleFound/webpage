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
  console.log(tg)
};
  
//   if (tg) {
//     const res = await fetch("https://your-backend.com/api/check-user", {
//       method: "POST",
//       headers: {
//           "Content-Type": "application/json"
//       },
//       body: JSON.stringify({
//           telegram_id: user.id
//       })
//   });
//   }
// };


