# 🎧 Sonido Ignacio - Landing Page

Landing page profesional para servicios de Mixing & Mastering con cotizador instantáneo e integración WhatsApp.

![Preview](https://via.placeholder.com/800x400/0a0a0f/00ff88?text=Sonido+Ignacio)

## ✨ Features

- 🎨 **Diseño premium** - Dark theme con acentos neón
- 📱 **100% Responsive** - Optimizado para móvil
- 🧮 **Cotizador instantáneo** - Cálculo de precios en tiempo real
- 💬 **Integración WhatsApp** - Envío directo de cotizaciones
- ⚡ **Ultra rápido** - React + Vite
- 🔍 **SEO optimizado** - Meta tags y Open Graph

## 🚀 Deployment Rápido

### Vercel (Recomendado)
1. Fork este repositorio
2. Conecta con [Vercel](https://vercel.com)
3. Deploy automático ✓

### Local Development
```bash
npm install
npm run dev
```

### Build Production
```bash
npm run build
```

## ⚙️ Configuración

### WhatsApp
En `src/App.jsx`, línea ~95:
```javascript
const phoneNumber = '573001234567'; // Tu número con código de país
```

### Email
Busca y reemplaza `ignacio@sonidoignacio.com` con tu email real.

### Precios
Modifica el objeto `PRICING` en `src/App.jsx` para ajustar tus tarifas.

## 📁 Estructura

```
├── index.html          # HTML principal + SEO
├── package.json        # Dependencias
├── vite.config.js      # Config de Vite
├── tailwind.config.js  # Config de Tailwind
├── postcss.config.js   # PostCSS
├── public/
│   └── favicon.svg     # Favicon
└── src/
    ├── main.jsx        # Entry point
    ├── App.jsx         # Componente principal
    └── index.css       # Estilos globales
```

## 🛠️ Tech Stack

- React 18
- Vite 5
- Tailwind CSS 3
- Google Fonts (Space Grotesk, Syne)

## 📄 Licencia

MIT

---

Hecho con 🎧 desde Medellín, Colombia
