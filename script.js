const SUPABASE_URL = 'https://ehqzwwhowyuvrrnwszhr.supabase.co';
const SUPABASE_KEY = 'sb_publishable_6VrAfvNy2NhbJpWalFGqLw_I295HGsv'; 
const _supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

let obrasData = [];
let currentIndex = 0;

// 1. CARGA INICIAL (Soluciona Falla 1)
async function cargarGaleria(filtro = 'Todos') {
  const grid = document.getElementById('photoGrid');
  grid.innerHTML = ""; // Limpia fotos viejas inmediatamente

  let query = _supabase.from('obras').select('*');
  
  // 2. FILTRADO (Soluciona Falla 2)
  if (filtro !== 'Todos') {
    query = query.eq('categoria', filtro);
  }

  const { data, error } = await query;
  if (data) {
    obrasData = data;
    renderGrid();
  }
}

function renderGrid() {
  const grid = document.getElementById('photoGrid');
  grid.innerHTML = ""; 
  obrasData.forEach((obra, index) => {
    const item = document.createElement('div');
    item.className = 'photo-item';
    item.innerHTML = `<img src="${obra.url_img}" alt="${obra.titulo}">`;
    item.onclick = () => abrirLightbox(index);
    grid.appendChild(item);
  });
  grid.style.opacity = '1';
}

// 3. LIGHTBOX Y DATOS (Soluciona Falla 3 y 4)
function abrirLightbox(index) {
  currentIndex = index;
  const obra = obrasData[currentIndex];
  
  document.getElementById('lightboxImg').src = obra.url_img;
  document.getElementById('artwork-title').innerText = obra.titulo.toUpperCase();
  document.getElementById('artwork-size').innerText = obra.medidas;
  document.getElementById('artwork-tech').innerText = obra.tecnica;
  document.getElementById('artwork-year').innerText = obra.anio;
  
  document.getElementById('lightbox').style.display = 'flex';
}

function cambiarImagen(direccion) {
  currentIndex += direccion;
  if (currentIndex < 0) currentIndex = obrasData.length - 1;
  if (currentIndex >= obrasData.length) currentIndex = 0;
  abrirLightbox(currentIndex);
}

// EVENTOS DE NAVEGACIÓN
document.getElementById('nextBtn').onclick = () => cambiarImagen(1);
document.getElementById('prevBtn').onclick = () => cambiarImagen(-1);
document.getElementById('closeLightbox').onclick = () => document.getElementById('lightbox').style.display = 'none';

// LÓGICA DE MENÚ
const menuOverlay = document.getElementById('menuOverlay');
document.getElementById('openMenu').onclick = () => menuOverlay.classList.add('active');
document.getElementById('closeMenu').onclick = () => menuOverlay.classList.remove('active');

// ASIGNAR FILTROS A LOS LINKS DEL MENÚ
document.querySelectorAll('.mobile-nav-link').forEach(link => {
  link.onclick = (e) => {
    const textoBoton = e.target.innerText.trim();
    if (textoBoton === 'CONTACTO') {
      menuOverlay.classList.remove('active');
      return;
      }
    // Mapeo simple: si el link dice "DIBUJO", filtramos por "Dibujo"
    const filtroMapa = { 'DIBUJO': 'Dibujo', 'ÓLEO': 'Óleo', 'ACUARELA': 'Acuarela', 'INICIO': 'Todos' };
    cargarGaleria(filtroMapa[textoBoton] || 'Todos');
    menuOverlay.classList.remove('active');
  };
});

cargarGaleria();
