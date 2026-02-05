// --- CONFIGURACIÓN DE SUPABASE ---
const SUPABASE_URL = 'https://ofrvngsaxvliowsqmajv.supabase.co';
const SUPABASE_KEY = 'sb_publishable_6WoIMC_zjLKgXtbLsyMf2g_rEF4pDiJ'; 
const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

let obrasData = []; 
let currentIndex = 0;

// --- 1. LÓGICA DEL MENÚ ---
const menuOverlay = document.getElementById('menuOverlay');
document.getElementById('openMenu').addEventListener('click', () => {
    menuOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
});
document.getElementById('closeMenu').addEventListener('click', () => {
    menuOverlay.classList.remove('active');
    document.body.style.overflow = 'auto';
});

// --- 2. CARGA DE DATOS DESDE CHILE A LA NUBE ---
async function fetchGallery() {
    const grid = document.getElementById('photoGrid');
    grid.innerHTML = '<p style="color:gray; text-align:center; width:100%; padding: 20px;">Cargando galería...</p>';
    
    // Detectar categoría por el nombre del archivo
    const path = window.location.pathname;
    let categoriaFiltro = null;
    if (path.includes('oleo')) categoriaFiltro = 'oleo';
    if (path.includes('acuarela')) categoriaFiltro = 'acuarela';
    if (path.includes('dibujo')) categoriaFiltro = 'dibujo';

    let query = supabase.from('obras').select('*');
    if (categoriaFiltro) {
        query = query.eq('categoria', categoriaFiltro);
    }

    const { data, error } = await query.order('id', { ascending: true });

    if (error) {
        grid.innerHTML = '<p style="color:red;">Error al conectar con Supabase.</p>';
        return;
    }

    obrasData = data;
    renderGrid(data);
}

function renderGrid(obras) {
    const grid = document.getElementById('photoGrid');
    grid.innerHTML = '';
    
    obras.forEach((obra, index) => {
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('photo-item');
        
        const img = document.createElement('img');
        img.src = obra.url_img;
        img.alt = obra.titulo;
        img.loading = "lazy"; // Optimización para su Pentium
        
        itemDiv.appendChild(img);
        grid.appendChild(itemDiv);

        // Evento para abrir Lightbox
        itemDiv.addEventListener('click', () => openLightbox(index));
    });
}

// --- 3. LIGHTBOX DINÁMICO ---
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');

function openLightbox(index) {
    currentIndex = index;
    updateLightboxContent();
    lightbox.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function updateLightboxContent() {
    const obra = obrasData[currentIndex];
    if (!obra) return;

    lightboxImg.src = obra.url_img;
    document.getElementById('artwork-title').textContent = obra.titulo;
    document.getElementById('artwork-size').textContent = obra.medidas;
    document.getElementById('artwork-tech').textContent = obra.tecnica;
    document.getElementById('artwork-year').textContent = obra.anio;
}

// Botones de navegación
document.getElementById('closeLightbox').onclick = () => {
    lightbox.style.display = 'none';
    document.body.style.overflow = 'auto';
};

document.getElementById('nextBtn').onclick = (e) => {
    e.stopPropagation();
    currentIndex = (currentIndex + 1) % obrasData.length;
    updateLightboxContent();
};

document.getElementById('prevBtn').onclick = (e) => {
    e.stopPropagation();
    currentIndex = (currentIndex - 1 + obrasData.length) % obrasData.length;
    updateLightboxContent();
};

document.addEventListener('DOMContentLoaded', fetchGallery);
