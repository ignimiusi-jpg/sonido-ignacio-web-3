# 🚀 GUÍA DE DEPLOYMENT - Sin Código

## Tiempo estimado: 10 minutos
## Dificultad: Principiante absoluto

---

## OPCIÓN A: Vercel (RECOMENDADO) ⭐

### Por qué Vercel:
- Gratis para siempre (tier hobby)
- Dominio SSL automático
- Deploys instantáneos
- Cero configuración

### Pasos:

#### 1. Crear cuenta en GitHub
1. Ve a [github.com](https://github.com)
2. Click "Sign up"
3. Completa el registro con tu email

#### 2. Subir el código a GitHub
1. Ya logueado, click el botón **"+"** arriba a la derecha
2. Selecciona **"New repository"**
3. Nombre: `sonido-ignacio-web`
4. Descripción: "Landing page Sonido Ignacio"
5. Marca **"Public"**
6. ✅ Check "Add a README file"
7. Click **"Create repository"**

#### 3. Subir archivos
1. En tu nuevo repo, click **"Add file"** > **"Upload files"**
2. Arrastra estos archivos:
   - `App.jsx`
   - `index.html` (lo creo abajo)
   - `package.json` (lo creo abajo)
3. Click **"Commit changes"**

#### 4. Conectar con Vercel
1. Ve a [vercel.com](https://vercel.com)
2. Click **"Sign Up"**
3. Selecciona **"Continue with GitHub"**
4. Autoriza la conexión
5. Click **"Import Project"**
6. Selecciona tu repo `sonido-ignacio-web`
7. Vercel detectará que es React automáticamente
8. Click **"Deploy"**
9. **¡LISTO!** En 60 segundos tienes tu URL

#### 5. Dominio personalizado (opcional)
1. En el dashboard de Vercel, ve a tu proyecto
2. Click **"Settings"** > **"Domains"**
3. Añade tu dominio (ej: sonidoignacio.com)
4. Vercel te dará los DNS records
5. Configúralos en tu proveedor de dominio

---

## ARCHIVOS ADICIONALES NECESARIOS

### `index.html`
```html
<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Sonido Ignacio | Mixing & Mastering Profesional</title>
    <meta name="description" content="Mixing y Mastering profesional desde Medellín. Especialista en Lo-Fi, Latin Soul y Chill Hop." />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

### `package.json`
```json
{
  "name": "sonido-ignacio-web",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.0.0",
    "vite": "^5.0.0",
    "autoprefixer": "^10.4.14",
    "postcss": "^8.4.24",
    "tailwindcss": "^3.3.2"
  }
}
```

### `vite.config.js`
```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
})
```

### `tailwind.config.js`
```javascript
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

### `postcss.config.js`
```javascript
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

### Estructura de carpetas:
```
sonido-ignacio-web/
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── src/
    ├── main.jsx
    └── App.jsx
```

### `src/main.jsx`
```javascript
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
```

### `src/index.css`
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

---

## OPCIÓN B: Netlify (Alternativa)

1. Ve a [netlify.com](https://netlify.com)
2. "Sign up" con GitHub
3. Click "Add new site" > "Import an existing project"
4. Conecta tu repo de GitHub
5. Build command: `npm run build`
6. Publish directory: `dist`
7. Click "Deploy site"

---

## 🔧 PERSONALIZACIÓN IMPORTANTE

### Cambiar número de WhatsApp:
En `App.jsx`, busca esta línea (~línea 95):
```javascript
const phoneNumber = '573001234567';
```
Cámbiala por tu número real con código de país:
- Colombia: 57 + número (ej: 573001234567)
- México: 52 + número
- España: 34 + número

### Cambiar email:
Busca `ignacio@sonidoignacio.com` y reemplázalo por tu email real.

### Cambiar redes sociales:
En la sección footer, actualiza los enlaces `href="#"` con tus URLs reales.

---

## ❓ SOLUCIÓN DE PROBLEMAS

### "Build failed"
- Asegúrate que todos los archivos están en la estructura correcta
- Verifica que `package.json` no tiene errores de sintaxis

### "Page not found después de deploy"
- En Vercel: Settings > General > Framework Preset = Vite
- Rebuild el proyecto

### "WhatsApp no abre"
- Verifica que el número tiene el formato correcto (código país + número, sin + ni espacios)

---

## 📊 ANALYTICS (Opcional pero recomendado)

### Google Analytics:
1. Ve a [analytics.google.com](https://analytics.google.com)
2. Crea una propiedad
3. Copia tu Measurement ID (G-XXXXXXXXXX)
4. Añade esto al `<head>` de `index.html`:

```html
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

---

## ✅ CHECKLIST PRE-LANZAMIENTO

- [ ] Número de WhatsApp actualizado
- [ ] Email actualizado
- [ ] Redes sociales enlazadas
- [ ] Dominio configurado (si aplica)
- [ ] Analytics instalado
- [ ] Prueba el flujo completo en móvil
- [ ] Prueba el botón de WhatsApp

---

**¿Problemas?** Escríbeme y te ayudo. 🎧
