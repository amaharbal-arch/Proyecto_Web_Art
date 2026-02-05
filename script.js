// CONFIGURACIÓN DE SUPABASE
const SUPABASE_URL = 'https://ehqzwwhowyuvrrnwszhr.supabase.co';
const SUPABASE_KEY = 'sb_publishable_6VrAfvNy2NhbJpWalFGqLw_I295HGsv'; // Tu nueva clave
const _supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// ESTADO DE LA GALERÍA
let obrasData = [];
let currentIndex = 0;

// --- LÓGICA DEL MENÚ (RESTAURADA Y EXPLICADA) ---
const openMenu = document.getElementById('openMenu');
const closeMenu = document.getElementById('closeMenu');
const menuOverlay = document.getElementById('menuOverlay');

// Si el menú no se despliega, asegúrate de que 'active' en CSS tenga z-index alto y visibilidad
openMenu.addEventListener('click', () => {
  menuOverlay.classList.add('active');
  document.body.style.overflow = 'hidden';
});

closeMenu.addEventListener('click', () => {
  menuOverlay.classList.remove('active');
  document.body.style.overflow = 'auto';
});

// --- CARGA DINÁMICA DE SUPABASE ---
async function fetchObras() {
  const path = window.location.pathname;
  let filtro = "";
  
  // Detectamos categoría por URL sin cambiar tus enlaces
  if (path.includes("oleo")) filtro = "Óleo";
  else if (path.includes("acuarela")) filtro = "Acuarela";
  else if (path.includes("dibujo")) filtro = "Dibujo";

  let query = _supabase.from('obras').select('*');
  if (filtro) query = query.eq('categoria', filtro);

  const { data, error } = await query;
  if (!error) {
    obrasData = data;
    renderGrid();
  }
}

function renderGrid() {
  const grid = document.getElementById('photoGrid');
  if (!grid) return;
  
  grid.innerHTML = ""; // Limpiamos los placeholders estáticos
  
  obrasData.forEach((obra, index) => {
    const div = document.createElement('div');
    div.className = 'photo-item';
    div.innerHTML = `<img src="${obra.url_img}" alt="${obra.titulo}">`;
    
    div.addEventListener('click', () => {
      currentIndex = index;
      openLightbox();
    });
    grid.appendChild(div);
  });
}

// --- LÓGICA DEL LIGHTBOX (CON TUS DATOS DE TABLA) ---
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const infoTitle = document.getElementById('artwork-title');
const infoSize = document.getElementById('artwork-size');
const infoTech = document.getElementById('artwork-tech');
const infoYear = document.getElementById('artwork-year');

function openLightbox() {
  const obra = obrasData[currentIndex];
  if (!obra) return;

  lightboxImg.src = obra.url_img;
  infoTitle.innerText = obra.titulo.toUpperCase();
  infoSize.innerText = obra.medidas;
  infoTech.innerText = obra.tecnica;
  infoYear.innerText = obra.anio;

  lightbox.style.display = 'flex';
  document.body.style.overflow = 'hidden';
}

// Navegación del Lightbox
document.getElementById('nextBtn').addEventListener('click', (e) => {
  e.stopPropagation();
  currentIndex = (currentIndex + 1) % obrasData.length;
  openLightbox();
});

document.getElementById('prevBtn').addEventListener('click', (e) => {
  e.stopPropagation();
  currentIndex = (currentIndex - 1 + obrasData.length) % obrasData.length;
  openLightbox();
});

document.getElementById('closeLightbox').addEventListener('click', () => {
  lightbox.style.display = 'none';
  document.body.style.overflow = 'auto';
});

// --- LÓGICA DE NAVEGACIÓN Y SCROLL (TU CÓDIGO ORIGINAL) ---
document.querySelectorAll('.mobile-nav-link').forEach(link => {
  link.addEventListener('click', (e) => {
    const targetId = link.getAttribute('href');

    if (targetId.endsWith('.html') || !targetId.startsWith('#')) {
      menuOverlay.classList.remove('active');
      document.body.style.overflow = 'auto';
      return; 
    }

    e.preventDefault();
    menuOverlay.classList.remove('active');
    document.body.style.overflow = 'auto';
    
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop,
        behavior: 'smooth'
      });
    }
  });
});

// Arrancar proceso
fetchObras();
