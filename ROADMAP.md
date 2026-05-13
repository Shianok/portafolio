# ROADMAP — oarce_dev Portfolio

> Fases de desarrollo del portafolio terminal de Oscar Arce Ugalde.

---

## ✅ Fase 1 — Core de la Terminal y Parser de Comandos

**Estado:** Completado

- [x] Estructura base de Astro 6 con TypeScript strict
- [x] Integración de React Islands (`@astrojs/react`)
- [x] Layout base con SEO (Open Graph, Twitter Card, meta description)
- [x] TerminalHeader con sesión / status / location / reloj en vivo
- [x] BootSequence animada (`system --init`)
- [x] CommandParser con todos los comandos iniciales
- [x] Input con cursor parpadeante
- [x] Historial de comandos (↑/↓) y Tab completion
- [x] Overlay CRT scanlines y efecto flicker

---

## ✅ Fase 2 — Integración de Data del CV y Proyectos

**Estado:** Completado

- [x] `src/data/profile.ts` — Skills, idiomas, bio, intereses, contacto
- [x] `src/data/projects.ts` — Electric_axend (arquitectura completa) + otros
- [x] Comando `skills` con barras de progreso ASCII
- [x] Comando `project <id>` con vista detallada de arquitectura
- [x] Easter egg: `sudo hire oscar`

---

## 🔄 Fase 3 — Implementación de Backend y Webhooks

**Estado:** En progreso

- [x] API Route `/api/contact` con validación
- [x] Simulación SSH handshake en el formulario
- [ ] Conectar Supabase (pendiente de credenciales del usuario)
  - [ ] Crear tabla `messages` en Supabase
  - [ ] Añadir variables de entorno (`PUBLIC_SUPABASE_URL`, `PUBLIC_SUPABASE_ANON_KEY`)
  - [ ] Descomentar bloque de integración en `contact.ts`
- [ ] Webhook de notificación por email (Resend / SendGrid)
  - [ ] Instalar `@sendgrid/mail` o `resend`
  - [ ] Enviar email de notificación al recibir mensaje nuevo
- [ ] Rate limiting en la API de contacto

---

## 🎯 Fase 4 — Optimización de Performance (Lighthouse 100/100)

**Estado:** Pendiente

- [ ] Preload de la fuente JetBrains Mono
- [ ] Optimización de Web Vitals (LCP, CLS, FID)
- [ ] Sitemap.xml generado automáticamente (`@astrojs/sitemap`)
- [ ] `robots.txt`
- [ ] Lazy loading de módulos React no críticos
- [ ] Análisis de bundle con `vite-bundle-analyzer`
- [ ] Ejecutar Lighthouse CI en GitHub Actions
- [ ] Compresión de assets (Brotli/gzip)

---

## 🔮 Fase 5 — Extras (Futuro)

- [ ] Modo ámbar clásico (toggle `green-neon` ↔ `amber`)
- [ ] Comando `ls projects/` con navegación de archivos simulada
- [ ] Soporte para comandos encadenados con `&&`
- [ ] Modo `vi` para editar el perfil directamente en la terminal
- [ ] Integración con GitHub API para mostrar stats de repos en vivo
- [ ] Dominio personalizado (oarce.dev)
