# Plan de Acción y Arquitectura — GOAT IMPLEMENTATION PLAN

Este documento establece el plan técnico detallado para modularizar, sincronizar y empaquetar en móvil el CRM interno de ASCK Software de manera progresiva.

---

## 1. Estado Actual Confirmado

* **Frontend:** React 19, Vite 8, Tailwind CSS v3.
* **Componente Central:** `src/App.jsx` centraliza la gestión del estado (casi 600 líneas).
* **Persistencia:** `localStorage` local sincrónico.
* **PWA:** Manifest básico e interceptación agresiva de caché en `sw.js`.
* **Base de Datos:** Archivo `schema.sql` orientado a MySQL/XAMPP en lugar de PostgreSQL.

---

## 2. Riesgos Detectados y Mitigación

1. **Desincronización de Datos (Concurrencia):** Si varios usuarios editan localmente, se sobreescribirán los datos.
   * *Mitigación:* Se implementará Supabase Realtime con suscripción reactiva.
2. **Actualizaciones Bloqueadas por PWA:** El Service Worker original almacena `/index.html` indefinidamente.
   * *Mitigación:* Se implementará una estrategia de caché *Network-First* para archivos de navegación HTML y un banner visual avisando cuando haya actualizaciones disponibles.
3. **Pérdida de Datos en Migración:** Riesgo de borrar el avance local al activar el servidor de base de datos de producción.
   * *Mitigación:* Se construirá un panel de migración segura con opción obligatoria de exportación en JSON del respaldo de `localStorage` antes de escribir en Supabase.
