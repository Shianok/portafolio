# 🖥️ oarce_dev — Portfolio Terminal

> Portafolio profesional de **Oscar Arce Ugalde** — Full Stack Developer & Analista de Sistemas, Costa Rica.
> Diseño: **Cyber-Minimalism Terminal** | Stack: Astro 6 · React · Tailwind CSS v4 · Framer Motion · TypeScript

[![Deploy to GitHub Pages](https://github.com/Shianok/portafolio/actions/workflows/deploy.yml/badge.svg)](https://github.com/Shianok/portafolio/actions/workflows/deploy.yml)

---

## 🏗️ Arquitectura del Sistema

```
portafolio/
├── src/
│   ├── components/
│   │   ├── Terminal.tsx          # Shell principal (React Island, client:load)
│   │   ├── TerminalHeader.astro  # Barra de sesión fija (SSR puro)
│   │   ├── BootSequence.tsx      # Secuencia de arranque animada
│   │   ├── ContactForm.tsx       # Formulario SSH-style con Framer Motion
│   │   └── CommandParser.ts      # Lógica de comandos (pure TypeScript)
│   ├── data/
│   │   ├── profile.ts            # Datos del CV de Oscar
│   │   └── projects.ts           # Proyectos: Electric_axend, etc.
│   ├── layouts/
│   │   └── Layout.astro          # HTML base con SEO
│   ├── pages/
│   │   ├── index.astro           # Página principal
│   │   └── api/
│   │       └── contact.ts        # API Route para contacto (SSR)
│   └── styles/
│       └── global.css            # Tailwind v4 + variables cyber
├── .github/
│   └── workflows/
│       └── deploy.yml            # CI/CD → GitHub Pages
├── astro.config.mjs
├── ROADMAP.md
└── README.md
```

### Patrón de Islas (Astro Islands)

- **Header & Layout**: Renderizado estático (0 JS)
- **Terminal**: React Island (`client:load`) — interactivo
- **BootSequence**: React Island — animación de carga
- **ContactForm**: React Island — formulario con fetch

---

## 🚀 Setup Local

### Requisitos
- Node.js 18+
- npm 9+

```bash
# 1. Clonar el repositorio
git clone https://github.com/Shianok/portafolio.git
cd portafolio

# 2. Instalar dependencias
npm install --legacy-peer-deps

# 3. Iniciar servidor de desarrollo
npm run dev

# Abrir: http://localhost:4321
```

---

## ➕ Añadir un Nuevo Proyecto

Edita `src/data/projects.ts` y añade un objeto al array `projects`:

```typescript
{
  id: 'mi_proyecto',          // identificador único (sin espacios)
  name: 'Mi_Proyecto',        // nombre que muestra la terminal
  tagline: 'Descripción corta del proyecto',
  description: [
    'Línea 1 de descripción larga',
    'Línea 2...',
  ],
  architecture: [             // opcional
    'Tecnología / patrón 1',
    'Tecnología / patrón 2',
  ],
  tech: ['React', 'Node.js'], // lista de tecnologías
  status: 'active',           // 'active' | 'completed' | 'wip'
  featured: false,
  repo: 'https://github.com/Shianok/mi_proyecto',   // opcional
  demo: 'https://demo.example.com',                  // opcional
}
```

El proyecto aparecerá automáticamente al ejecutar `projects` en la terminal.

---

## 🔌 Configurar Supabase (Contacto)

1. Crea un proyecto en [supabase.com](https://supabase.com)
2. Ejecuta este SQL en el editor de Supabase:
   ```sql
   CREATE TABLE messages (
     id         UUID DEFAULT gen_random_uuid() PRIMARY KEY,
     name       TEXT NOT NULL,
     email      TEXT NOT NULL,
     message    TEXT NOT NULL,
     created_at TIMESTAMPTZ DEFAULT NOW()
   );
   ```
3. Crea el archivo `.env` en la raíz:
   ```env
   PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
   PUBLIC_SUPABASE_ANON_KEY=tu-anon-key-aqui
   ```
4. En `src/pages/api/contact.ts`, descomenta el bloque de Supabase.

---

## 📦 Deploy en GitHub Pages

El deploy es **automático** vía GitHub Actions:

```
push to main → build → deploy → https://shianok.github.io/portafolio
```

### Activar GitHub Pages (primera vez)
1. Ve a **Settings → Pages** en tu repositorio
2. En **Source**, selecciona `GitHub Actions`
3. Haz un push al branch `main` → el workflow se ejecuta solo

### Deploy manual
```bash
git add .
git commit -m "feat: descripción del cambio"
git push origin main
```

---

## 🎮 Comandos de la Terminal

| Comando | Descripción |
|---|---|
| `help` | Lista de comandos |
| `whoami` | Perfil del desarrollador |
| `skills` | Tecnologías y nivel de dominio |
| `projects` | Lista de proyectos |
| `project <id>` | Detalles de un proyecto |
| `contact` | Formulario de contacto SSH |
| `langs` | Idiomas |
| `interests` | Intereses personales |
| `clear` | Limpiar pantalla |
| `sudo hire oscar` | 🎉 Easter egg |

**Atajos de teclado:**
- `↑ / ↓` — Navegar historial de comandos
- `Tab` — Autocompletar comandos

---

## 📄 Licencia

MIT © Oscar Arce Ugalde
