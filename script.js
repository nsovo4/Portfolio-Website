// Initialize theme when page loads
document.addEventListener('DOMContentLoaded', () => {
  const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
  
  // Check for saved theme preference or default to user's system preference
  const savedTheme = localStorage.getItem('theme');
  const currentTheme = savedTheme || (prefersDarkScheme.matches ? 'dark' : 'light');
  
  // Apply theme to HTML element
  document.documentElement.setAttribute('data-theme', currentTheme);
});

// Profile flip functionality (only on home page)
const profileContainer = document.querySelector('.profile-container');
if (profileContainer) {
  profileContainer.addEventListener('click', function(event) {
    this.classList.toggle('flipped');
    document.body.classList.toggle('overlay-active');
    event.stopPropagation(); // Prevent the event from bubbling up to the document
  });

  // Hide profile card when clicking outside of it
  document.addEventListener('click', function(event) {
    if (!profileContainer.contains(event.target)) {
      profileContainer.classList.remove('flipped');
      document.body.classList.remove('overlay-active');
    }
  });
}

// Theme toggle functionality
const themeToggle = document.getElementById('themeToggle');
if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  });
}

// Update theme when system preference changes
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
prefersDarkScheme.addEventListener('change', (e) => {
  const newTheme = e.matches ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
});
