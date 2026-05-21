const carousels = document.querySelectorAll('[data-carousel]');

function initCarousel() {
  carousels.forEach((carousel) => {
    const items = Array.from(carousel.querySelectorAll('.carousel-item'));
    let currentIndex = items.findIndex((item) => item.classList.contains('active'));
    if (currentIndex < 0) currentIndex = 0;

    const targetId = carousel.dataset.carousel;
    const prevButton = document.querySelector(`.carousel-btn.prev[data-target="${targetId}"]`);
    const nextButton = document.querySelector(`.carousel-btn.next[data-target="${targetId}"]`);

    function updateItems(index) {
      items.forEach((item, idx) => {
        item.classList.toggle('active', idx === index);
      });
    }

    prevButton?.addEventListener('click', () => {
      currentIndex = (currentIndex - 1 + items.length) % items.length;
      updateItems(currentIndex);
    });

    nextButton?.addEventListener('click', () => {
      currentIndex = (currentIndex + 1) % items.length;
      updateItems(currentIndex);
    });
  });
}

initCarousel();

const themeToggle = document.querySelector('.theme-toggle');
const currentTheme = localStorage.getItem('theme') || 'dark';
const rootBody = document.body;

function setTheme(theme) {
  rootBody.dataset.theme = theme;
  themeToggle.textContent = theme === 'dark' ? '☀' : '☾';
}

if (themeToggle) {
  setTheme(currentTheme);
  themeToggle.addEventListener('click', () => {
    const nextTheme = rootBody.dataset.theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    localStorage.setItem('theme', nextTheme);
  });
}
