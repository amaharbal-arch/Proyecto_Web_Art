const SUPABASE_URL = 'https://ehqzwwhowyuvrrnwszhr.supabase.co';
const SUPABASE_KEY = 'sb_publishable_6VrAfvNy2NhbJpWalFGqLw_I295HGsv'; 
const _supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

let obrasData = [];

async function cargarGaleria() {
  const { data, error } = await _supabase.from('obras').select('*');
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
}

function abrirLightbox(index) {
  const obra = obrasData[index];
  document.getElementById('lightboxImg').src = obra.url_img;
  document.getElementById('artwork-title').innerText = obra.titulo.toUpperCase();
  document.getElementById('artwork-size').innerText = obra.medidas;
  document.getElementById('artwork-tech').innerText = obra.tecnica;
  document.getElementById('artwork-year').innerText = obra.anio;
  document.getElementById('lightbox').style.display = 'flex';
}

// Lógica de Menú
const menuOverlay = document.getElementById('menuOverlay');
document.getElementById('openMenu').onclick = () => menuOverlay.classList.add('active');
document.getElementById('closeMenu').onclick = () => menuOverlay.classList.remove('active');
document.getElementById('closeLightbox').onclick = () => document.getElementById('lightbox').style.display = 'none';

cargarGaleria();

