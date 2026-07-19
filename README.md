# CRM Interno — ASCK Software (v1.8+)

Bienvenido al repositorio oficial del CRM interno de **ASCK Software**, diseñado para la gestión comercial de prospectos, planeación operativa por sprints, tareas del día y agenda unificada del equipo.

---

## 🚀 Características Principales

* **Panel General (Dashboard):** Métricas de ventas en tiempo real, pipeline estimado en pesos mexicanos (MXN) y rendimiento por integrante.
* **Conversor de Divisas:** Calculadora integrada en tiempo real de MXN a USD (y viceversa) con tasa editable.
* **Tablero de Ventas Kanban:** Gestión visual de prospectos comerciales (Notion-style).
* **Tablero de Tareas TÚDU + Sprints:** Control visual de las actividades asociadas a sprints semanales de trabajo con avance reactivo por usuario.
* **Agenda tipo Google Calendar:** Cuadrícula horaria responsiva que consolida reuniones, llamadas y seguimientos comerciales automáticos.
* **Módulo de Excel (SheetJS):** Importador inteligente de prospectos con mapeo interactivo de columnas y control estricto de duplicados.
* **Configuración del Sistema:** Respaldos lógicos en formato JSON, vaciado seguro de datos y selector dinámico de persistencia.

---

## 🛠️ Stack Tecnológico

* **Frontend:** React 19 (JavaScript), Vite 8, Tailwind CSS v3.
* **Backend Opcional:** Supabase (Auth, PostgreSQL y Realtime).
* **Persistencia Local:** `localStorage` con emulación asíncrona de base de datos.
* **Empaquetado Móvil:** Capacitor v6 (Android / iOS).
* **PWA:** Service Worker con estrategia *Network-First* para evitar actualizaciones bloqueadas de caché y *manifest.json* standalone.

---

## 💻 Instalación y Desarrollo Local

1. Instala las dependencias del proyecto:
   ```bash
   npm install
   ```
2. Inicia el servidor de desarrollo local:
   ```bash
   npm run dev
   ```
3. Genera la compilación optimizada de producción:
   ```bash
   npm run build
   ```

---

## 🔌 Configuración de Base de Datos y Supabase

El CRM puede operar en dos modos mediante la variable `VITE_DATA_PROVIDER` en tu archivo `.env`:

### 1. Modo Local (localStorage)
* **`VITE_DATA_PROVIDER=local`**
* Los datos se guardan en el almacenamiento local de tu navegador. Ideal para pruebas rápidas y desarrollo rápido sin conexión.

### 2. Modo Nube (Supabase)
* **`VITE_DATA_PROVIDER=supabase`**
* Permite que Kevin, Sebas, Centeno y Alberto compartan la misma información en tiempo real entre su computadora y celular.
* Configura tus claves de acceso en el archivo `.env`:
  ```text
  VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
  VITE_SUPABASE_ANON_KEY=tu-anon-key-de-supabase
  ```
* Ejecuta el script de base de datos en Supabase:
  👉 [schema.sql](src/services/supabase/schema.sql)

---

## 📱 Compilación Móvil (Android / iOS)

El proyecto viene empaquetado para Capacitor. Para generar la APK móvil de Android:
1. Compila y sincroniza:
   ```bash
   npm run cap:sync
   ```
2. Abre el entorno en Android Studio:
   ```bash
   npm run cap:android
   ```
3. Genera tu APK desde Android Studio en **Build > Build Bundle(s) / APK(s) > Build APK(s)**.

Para más detalles, consulta la guía de compilación móvil:
👉 [MOBILE_BUILD_GUIDE.md](documentacion_goat/MOBILE_BUILD_GUIDE.md)
