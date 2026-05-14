# Oscar Arce — Web & Software Developer Portfolio

> Professional portfolio of **Oscar Arce Ugalde** — Web & Software Developer, Costa Rica.
> Built with: **Astro · React · Tailwind CSS v4 · TypeScript**

[![Deploy to GitHub Pages](https://github.com/Shianok/portafolio/actions/workflows/deploy.yml/badge.svg)](https://github.com/Shianok/portafolio/actions/workflows/deploy.yml)

## 🌟 Overview

A modern, fast, and fully responsive portfolio designed to showcase projects, skills, and professional experience. The aesthetic focuses on a clean dark-navy layout with vibrant accents, providing a premium user experience.

---

## 🏗️ System Architecture

```text
portafolio/
├── src/
│   ├── components/
│   │   ├── Hero.astro            # Main hero section
│   │   ├── Expertise.astro       # Skills and expertise grid
│   │   ├── ProjectCard.astro     # Individual project display component
│   │   └── Footer.astro          # Site footer with social links
│   ├── data/
│   │   └── projects.ts           # Project data and configurations
│   ├── layouts/
│   │   └── Layout.astro          # Base HTML layout and SEO meta tags
│   ├── pages/
│   │   └── index.astro           # Main landing page
│   └── styles/
│       └── global.css            # Global Tailwind CSS and variables
├── .github/
│   └── workflows/
│       └── deploy.yml            # CI/CD pipeline for GitHub Pages
├── astro.config.mjs
└── README.md
```

---

## 🚀 Local Setup

### Requirements
- Node.js 18+
- npm 9+

```bash
# 1. Clone the repository
git clone https://github.com/Shianok/portafolio.git
cd portafolio

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev

# Open: http://localhost:4321/portafolio
```

---

## ➕ Adding a New Project

Edit `src/data/projects.ts` and add a new object to the `projects` array:

```typescript
{
  id: 'my_project_id',
  name: 'Project Name',
  tagline: 'Short description or subtitle',
  description: [
    'Detailed description line 1',
    'Detailed description line 2...',
  ],
  tech: ['React', '.NET 8', 'SQL Server'],
  status: 'active', // 'active' | 'completed' | 'WIP'
  featured: true,
  repo: 'https://github.com/Shianok/my_project', // optional
  demo: 'https://demo.example.com',              // optional
}
```

The new project will automatically render in the "Projects" section of the site.

---

## 📦 Deployment to GitHub Pages

Deployment is **automated** via GitHub Actions:

```text
push to main → build → deploy → https://shianok.github.io/portafolio/
```

### Manual Deployment via Git
```bash
git add .
git commit -m "feat: your description"
git push origin main
```

---

## 📄 License

MIT © Oscar Arce Ugalde
