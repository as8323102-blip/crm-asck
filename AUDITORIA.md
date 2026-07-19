# Auditoría técnica — CRM interno ASCK

- **Fecha:** 2026-07-12
- **Rama:** `auditoria/2026-07-12` (creada desde `main`, que estaba al día con `origin/main`)
- **Alcance:** auditoría de código + saneo de git + correcciones no decisionales (ver protocolo del encargo)

## 1. Stack real (detectado leyendo el código, no por suposición)

- **Bundler/framework:** Vite 8 + React 19 (SPA, sin SSR). `index.html` monta `src/main.jsx` directo.
- **Persistencia:** dual-provider vía `src/services/provider.js` + `config.js`:
  - `VITE_DATA_PROVIDER=local` → `localStorage` (default sano si Supabase no está configurado).
  - `VITE_DATA_PROVIDER=supabase` → Supabase (Auth + Postgres + Realtime) como BaaS, sin servidor propio.
- **Móvil:** Capacitor 6 (proyectos `android/` y `ios/` generados, `capacitor.config.json` sin overrides de servidor).
- **Lint:** `oxlint`. No hay script de tests (`package.json` no define `"test"`).
- **Dependencia llamativa:** `pg` (cliente Postgres directo) en `dependencies` — no se usa en `src/` (solo la usaban los scripts de `scratch/`, ver §4). Candidato a mover a `devDependencies` o eliminar; no se tocó (posible uso futuro, decisión de Kevin).

**Categoría: (d) app cliente con `localStorage`, con opción (c) backend+DB vía Supabase (BaaS)** — no es (a) estático puro (hay lógica dinámica real) ni (b) SSR-Node (no hay servidor propio, todo corre en el navegador/WebView).

## 2. ¿Compila y corre?

| Comando | Exit code (antes de Fase B) | Exit code (después de Fase B) |
|---|---|---|
| `npm run lint` (oxlint) | 0 (3 warnings `react-hooks/exhaustive-deps` en `src/App.jsx:173,193,277`) | 0 (mismos 3 warnings, no tocados) |
| `npm run build` (vite build) | 0 | 0 |

Build genera un solo chunk JS de **944 KB (275 KB gzip)** — Vite avisa "chunks larger than 500 kB". No rompe nada, pero es deuda de rendimiento (falta code-splitting / `dynamic import()`).

## 3. `npm audit`

3 vulnerabilidades **altas**, 0 medias, 0 bajas. `npm audit fix` (sin `--force`) se ejecutó y **no resolvió ninguna** (0 cambios en `package-lock.json`):

| Paquete | Severidad | Detalle | Fix disponible |
|---|---|---|---|
| `tar` (vía `@capacitor/cli`) | Alta | Path traversal / hardlink / symlink (7 CVEs GHSA) | Solo con `--force`, y actualiza `@capacitor/cli` a 8.4.1 = **breaking change** |
| `xlsx` (SheetJS) | Alta | Prototype Pollution + ReDoS | **Sin fix disponible en npm** (SheetJS no publica el parche en el registro público) |

No se aplicó `--force` (instrucción explícita). Ambas quedan **pendientes → REQUIERE CONFIRMACIÓN DE KEVIN**.

## 4. Hallazgos con severidad

| Sev | Área | Hallazgo | Evidencia | Acción |
|---|---|---|---|---|
| **Alta** | Secretos en git | 8 scripts en `scratch/` (ya commiteados en `96c1bde`, 2026-07-02, y presentes en `origin/main`) tenían **hardcodeadas**: contraseña de Postgres/Supabase, un token personal de GitHub (`ghp_...`) y una clave `publishable` de Supabase + URL del proyecto. Valores **no reproducidos** en este documento. | `scratch/test_connection.js`, `test_connection2.js`, `test_port_5432.js`, `test_ipv6.js`, `execute_sql.js`, `get_github_user.js`, `create_github_repo.js`, `check_project.js` | **Hecho:** `git rm --cached` de los 8 archivos + `scratch/` agregado a `.gitignore` (siguen en disco local). **REQUIERE ROTACIÓN:** contraseña de la DB de Supabase y el token de GitHub (revocar/regenerar ya — el repo remoto es privado pero el historial de git no se reescribió, los valores siguen en commits antiguos de `origin/main`). La `publishable key` de Supabase es de exposición pública por diseño (menor prioridad), pero conviene rotarla igual dado el contexto. |
| **Alta** | Secreto client-side | `src/services/cloudSyncService.js` (activo, usado por `App.jsx` para "sync entre integrantes") hardcodea `SYNC_SALT` usada para derivar una clave AES que "cifra" los datos subidos a un bin público (`jsonbin-zeta.vercel.app`). El mismo patrón está duplicado en `scripts/import_asck_tasks_from_excel.cjs` (ya commiteado, fuera del alcance de los 17 cambios). | `src/services/cloudSyncService.js:7,44-47` | **No modificado.** Mover `SYNC_SALT` a `VITE_...` **no soluciona el problema real**: cualquier variable `VITE_` se inyecta en el bundle público en build time, así que seguiría siendo extraíble desde el JS servido. El "cifrado" actual es solo ofuscación. **REQUIERE CONFIRMACIÓN DE KEVIN** sobre el diseño (¿aceptar el riesgo por ser herramienta interna de 4 personas, o mover el cifrado/autenticación a un endpoint propio?). |
| **Media** | Config hardcodeada | `src/services/xampp.js` tenía `http://localhost/crm-api/index.php` fijo. Este servicio (`XAMPPService`) **no tiene ninguna referencia/import en el resto de `src/`** — es código muerto (integración legado pre-Supabase). | `src/services/xampp.js:1` (antes del fix) | **Hecho:** parametrizado a `import.meta.env.VITE_XAMPP_API_URL` con el mismo default, documentado en `.env.example`. No se borró el archivo (posible decisión de negocio si se retoma XAMPP) → si no se va a usar, **REQUIERE CONFIRMACIÓN DE KEVIN** para eliminarlo. |
| **Media** | Código muerto / duplicado | `src/services/supabase.js` (raíz) duplica a `src/services/supabase/supabaseClient.js` con lógica ligeramente distinta (el de raíz crea el cliente igual aunque falten credenciales; el usado realmente por los servicios en `src/services/supabase/*Service.js` es el segundo). El primero **no se importa en ningún lado**. | `src/services/supabase.js` vs `src/services/supabase/supabaseClient.js` | No modificado/borrado (podría generar confusión a futuro pero no afecta runtime). **REQUIERE CONFIRMACIÓN DE KEVIN** para eliminar `src/services/supabase.js`. |
| **Media** | Recurso roto (documentación) | `README.md` enlazaba a rutas locales absolutas de otra máquina/usuario (`file:///c:/Users/as832/...`, incluyendo una ruta fuera del repo en `.gemini/antigravity/brain/...`) — rotas para cualquier otro developer, incluida esta máquina. | `README.md` (enlaces a `schema.sql` y `MOBILE_BUILD_GUIDE.md`) | **Hecho:** reemplazados por rutas relativas al repo (`src/services/supabase/schema.sql`, `documentacion_goat/MOBILE_BUILD_GUIDE.md`). |
| **Baja** | Datos de negocio en repo de código | `ASCK_CRM_PROSPECTOS_LIMPIO_NUEVO.xlsx`, `PLAN_OPERATIVO_ASCK_HASTA_LUNES.txt`, `asck_sprint_lunes_operativo.html` viven en la raíz del repo (no se abrió el `.xlsx`; el nombre sugiere datos de prospectos/clientes). | raíz del repo | No modificado (contenido de negocio, no de código). Recomendación: sacar del repo de código a un almacenamiento de datos aparte. **REQUIERE CONFIRMACIÓN DE KEVIN.** |
| **Baja** | Assets huérfanos | `src/assets/hero.png`, `react.svg`, `vite.svg` no se referencian en ningún componente. Sin impacto en el build (Vite no los empaqueta si no se importan), solo ruido en el repo. | `src/assets/` | No modificado (limpieza cosmética, bajo valor/riesgo de borrar sin confirmar). |
| **Baja** | Rendimiento | Bundle único de 944 KB / 275 KB gzip, sin code-splitting. | salida de `npm run build` | No modificado (requiere decidir límites de rutas para `dynamic import()`, fuera del alcance "no rotas/no roto"). |
| **Info** | Accesibilidad | Los 8 `<img>` encontrados en `src/` **sí** tienen `alt`. No se detectaron imágenes rotas (todas las rutas en `public/`/`index.html`/`manifest.json` resuelven a archivos existentes). | grep en `src/` | Sin acción — no hay hallazgo. |

## 5. Puertos y arranque

- Dev: `npm run dev` → Vite, puerto por defecto **5173** (sin override en `vite.config.js`).
- Build: `npm run build` → `dist/`.
- Preview: `npm run preview`.
- Móvil: `npm run cap:sync` / `cap:android` / `cap:ios` (build + Capacitor).
- No hay `.env` real commiteado (`git status --ignored` confirma que el `.env` local existe pero está correctamente ignorado). `.env.example` ya traía placeholders correctos, sin secretos reales.

## 6. Resumen de acción de git

- Los 17 cambios pendientes (16 modificados + `scripts/import_asck_tasks_from_excel.js` nuevo) eran fixes de lint/robustez ya verificados (try/catch en `JSON.parse`, limpieza de imports/props no usados, `crypto-js` agregado a `package.json`). Se revisaron por muestreo (incl. `useAuth.js`/`AuthGuard.jsx` por ser código de auth) y no se encontró nada riesgoso.
- `scratch/` completo desrastreado (`git rm --cached`, archivos siguen en disco) + agregado a `.gitignore` por contener secretos reales (§4).

## 7. Pendiente — REQUIERE CONFIRMACIÓN DE KEVIN (resumen)

1. Rotar contraseña de Postgres/Supabase y regenerar el token de GitHub que estaban en `scratch/` (ya expuestos en historial de `origin/main`).
2. Decidir si se reescribe el historial de git para purgar esos secretos (operación destructiva, no se hizo aquí — requiere coordinación con el equipo por el force-push).
3. Rediseñar o aceptar el riesgo del "cifrado" en `cloudSyncService.js` (salt público en el bundle cliente).
4. `npm audit`: aceptar breaking change de `@capacitor/cli` (vía `--force`) y decidir alternativa a `xlsx` (sin fix disponible) o aceptar el riesgo.
5. Eliminar o conservar código muerto: `src/services/xampp.js`, `src/services/supabase.js`, assets huérfanos.
6. Sacar archivos de negocio (`.xlsx`, planes operativos) del repo de código.
