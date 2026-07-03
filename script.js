document.addEventListener('DOMContentLoaded', () => {
  const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
  

  const savedTheme = localStorage.getItem('theme');
  const currentTheme = savedTheme || (prefersDarkScheme.matches ? 'dark' : 'light');
  
  document.documentElement.setAttribute('data-theme', currentTheme);
});

const themeToggle = document.getElementById('themeToggle');
if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  });
}

const navMenuButton = document.querySelector('.nav-menu-btn');
const navLinksMenu = document.querySelector('.nav-links');

if (navMenuButton && navLinksMenu) {
  const setMenuOpen = (isOpen) => {
    navMenuButton.classList.toggle('is-open', isOpen);
    navLinksMenu.classList.toggle('is-open', isOpen);
    navMenuButton.setAttribute('aria-expanded', String(isOpen));
    navMenuButton.setAttribute(
      'aria-label',
      isOpen ? 'Close navigation menu' : 'Open navigation menu'
    );
  };

  navMenuButton.addEventListener('click', () => {
    setMenuOpen(!navLinksMenu.classList.contains('is-open'));
  });

  navLinksMenu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => setMenuOpen(false));
  });
}

const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
prefersDarkScheme.addEventListener('change', (e) => {
  const newTheme = e.matches ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
});

document.addEventListener('DOMContentLoaded', () => {
  const navLinks = document.querySelectorAll('.nav-links a');
  const sections = Array.from(navLinks)
    .map((link) => document.querySelector(link.getAttribute('href')))
    .filter(Boolean);

  if (!sections.length) return;

  const setActive = (id) => {
    navLinks.forEach((link) => {
      link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
    });
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActive(entry.target.id);
      });
    },
    { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
  );

  sections.forEach((section) => observer.observe(section));

  const slideshows = [
    {
      id: 'gigpass',
      images: ['images/gigpass%201.png', 'images/gigpass%202.png', 'images/gigpass%203.png'],
    },
    {
      id: 'burgundy',
      images: ['images/Burgundy%201.png', 'images/Burgundy%202.png', 'images/Burgundy%203.png', 'images/Burgundy%204.png'],
    },
  ];

  slideshows.forEach(({ id, images }) => {
    const slideshow = document.querySelector(`.slideshow[data-slideshow-id="${id}"]`);
    if (!slideshow) return;

    const imgElement = slideshow.querySelector('img');

    let currentIndex = 0;
    let fadeTimer = null;
    const fadeDuration = 600;

    const updateSlide = () => {
      if (fadeTimer) {
        window.clearTimeout(fadeTimer);
      }
      imgElement.style.opacity = '0';
      fadeTimer = window.setTimeout(() => {
        imgElement.src = images[currentIndex];
        imgElement.style.opacity = '1';
      }, fadeDuration);
    };

    const autoplayDelay = 4000;
    let autoplayTimer = null;

    const startAutoplay = () => {
      autoplayTimer = window.setInterval(() => {
        currentIndex = (currentIndex + 1) % images.length;
        updateSlide();
      }, autoplayDelay);
    };

    const stopAutoplay = () => {
      if (autoplayTimer) {
        window.clearInterval(autoplayTimer);
        autoplayTimer = null;
      }
    };

    slideshow.addEventListener('mouseenter', stopAutoplay);
    slideshow.addEventListener('mouseleave', startAutoplay);

    updateSlide();
    startAutoplay();
  });
});
