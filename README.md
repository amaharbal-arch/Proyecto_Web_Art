# Galería Web de Arte (v1.0)
> "Simple para el usuario, compleja para el desarrollador."

Núcleo robusto de alto rendimiento, cero dependencias pesadas y arquitectura minimalista para la exhibición de obras de arte en alta fidelidad.

---

## 🛠️ Arquitectura y Tecnologías
* **Frontend:** HTML5, CSS3 ergonómico puro, JavaScript Vanilla (ES6+).
* **Backend & Database:** Supabase (PostgreSQL) para la gestión e hidratación de datos.
* **Hosting & CDN:** Vercel para despliegue continuo de baja latencia.
* **Tipografías:** `Jost` para la estructura y `Cormorant Garamond` para declaraciones de autor.

## 🧠 Ingeniería de Invisibilidad
* **Elegancia como Función:** Interfaz limpia sin ruido visual. Carga asíncrona optimizada para proteger la resolución original de óleos y acuarelas.
* **Resiliencia de Infraestructura:** Control de opacidad asíncrono en el renderizado de la grilla para evitar parpadeos de píxeles (FOUC).
* **Mapeo de Datos Robusto:** Diccionarios estrictos para el filtrado de categorías (`Óleo`, `Acuarela`, `Dibujo`) tolerantes a la codificación UTF-8 del navegador.

## 📋 Estado del Proyecto (Sprint Actual)
* [x] Conexión e hidratación asíncrona desde Supabase (PostgreSQL).
* [x] Grilla adaptativa (Responsive Grid) para móviles y escritorio.
* [x] Lightbox cinemático integrado con navegación cíclica bidireccional.
* [x] Sistema de filtrado por taxonomía artística en el menú lateral.
* [ ] Implementación de Logo e Identidad Vectorial Pura (SVG).
* [ ] Automatización de persistencia (UptimeRobot) para evitar pausas en la base de datos.

## 🔧 Configuración del Núcleo
El software requiere las variables globales configuradas en el script de persistencia:
```javascript
const SUPABASE_URL = '[https://ehqzwwhowyuvrrnwszhr.supabase.co](https://ehqzwwhowyuvrrnwszhr.supabase.co)';
const SUPABASE_KEY = 'sb_publishable_...';
