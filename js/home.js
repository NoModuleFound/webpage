document.addEventListener('DOMContentLoaded', function() {
  // Navigation functionality
  const navItems = document.querySelectorAll('.nav-item');
  const screens = document.querySelectorAll('.screen');

  navItems.forEach(item => {
      item.addEventListener('click', function() {
          const targetScreen = this.getAttribute('data-screen');
          
          // Update active nav item
          navItems.forEach(nav => nav.classList.remove('active'));
          this.classList.add('active');
          
          // Show target screen
          screens.forEach(screen => screen.classList.remove('active'));
          document.getElementById(targetScreen).classList.add('active');
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
          
          // Show target tab content
          tabContents.forEach(content => content.classList.remove('active'));
          document.getElementById(targetTab + 'Tab').classList.add('active');
      });
  });

  // Like/Dislike button functionality
  const likeBtn = document.querySelector('.action-btn.like');
  const dislikeBtn = document.querySelector('.action-btn.dislike');
  const toast = document.getElementById('toast');

  likeBtn.addEventListener('click', function() {
      showToast('Liked!', 'You liked this profile. We\'ll let you know if it\'s a match!', 'heart');
  });

  dislikeBtn.addEventListener('click', function() {
      showToast('Passed', 'Profile skipped. Finding your next potential match...', 'times');
  });

  function showToast(title, message, icon) {
      const toastTitle = document.querySelector('.toast-message h3');
      const toastMessage = document.querySelector('.toast-message p');
      const toastIcon = document.querySelector('.toast-icon');
      
      toastTitle.textContent = title;
      toastMessage.textContent = message;
      toastIcon.className = 'fas fa-' + icon + ' toast-icon';
      
      toast.classList.add('show');
      
      setTimeout(() => {
          toast.classList.remove('show');
      }, 3000);
  }
});