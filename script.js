// --- LÓGICA DEL MENÚ (CON ANIMACIÓN) ---
const openMenu = document.getElementById('openMenu');
const closeMenu = document.getElementById('closeMenu');
const menuOverlay = document.getElementById('menuOverlay');

openMenu.addEventListener('click', () => {
  menuOverlay.classList.add('active');
  document.body.style.overflow = 'hidden';
});

closeMenu.addEventListener('click', () => {
  menuOverlay.classList.remove('active');
  document.body.style.overflow = 'auto';
});

// --- LÓGICA DEL CARRUSEL (LIGHTBOX) ---
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const closeLightbox = document.getElementById('closeLightbox');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

const images = Array.from(document.querySelectorAll('.photo-item img'));
let currentIndex = 0;

function updateLightbox() {
  if (images[currentIndex]) {
    lightboxImg.src = images[currentIndex].src;
  }
}

images.forEach((img, index) => {
  img.parentElement.addEventListener('click', () => {
    currentIndex = index;
    updateLightbox();
    lightbox.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  });
});

nextBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  currentIndex = (currentIndex + 1) % images.length;
  updateLightbox();
});

prevBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  updateLightbox();
});

closeLightbox.addEventListener('click', () => {
  lightbox.style.display = 'none';
  document.body.style.overflow = 'auto';
});

lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) {
    lightbox.style.display = 'none';
    document.body.style.overflow = 'auto';
  }
});
document.querySelectorAll('.mobile-nav-link').forEach(link => {
  link.addEventListener('click', (e) => {
    const targetId = link.getAttribute('href');

    // Si el link NO tiene un #, es un link externo (como SHOP)
    if (!targetId.startsWith('#')) {
      document.getElementById('menuOverlay').classList.remove('active');
      document.body.style.overflow = 'auto';
      return; // Aquí termina, el navegador te lleva a tu tienda normal
    }

    // Si tiene #, hacemos el scroll elegante que te gustó
    e.preventDefault();
    document.getElementById('menuOverlay').classList.remove('active');
    document.body.style.overflow = 'auto';
    
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
      const startPosition = window.pageYOffset;
      const distance = targetPosition - startPosition;
      let startTime = null;

      function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = ease(timeElapsed, startPosition, distance, 1000); 
        window.scrollTo(0, run);
        if (timeElapsed < 1000) requestAnimationFrame(animation);
      }

      function ease(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
      }
      requestAnimationFrame(animation);
    }
  });
});
