# CRM ASCK — Activación de producción (Supabase Auth real)

Este documento son los pasos que le tocan a Kevin. El código ya está listo y
en fail-closed (sin Supabase configurado, nadie entra). Nada de esto se hace
por chat: credenciales y claves solo se pegan en Supabase Dashboard / Coolify,
nunca aquí ni en ningún mensaje.

## 0. Qué cambió (resumen de una línea)

El login ya no es un mock que ignora la contraseña. Ahora usa Supabase Auth de
verdad. Sin activar esto, el CRM se queda bloqueado en la pantalla de login
para siempre (eso es intencional).

## 1. Crear o rotar el proyecto de Supabase

1. Entra a [supabase.com](https://supabase.com) → tu organización → **New project**
   (o reutiliza el proyecto existente si ya hay uno para este CRM).
2. Anota la región más cercana (ej. `us-east-1`) y guarda la contraseña de la
   base de datos que te pida en un gestor de contraseñas — no la vas a
   necesitar para la app (la app usa la `anon key`, no la contraseña de DB
   directa), pero sí para acceso administrativo puntual.
3. Si el proyecto YA EXISTE y sospechas que sus credenciales estuvieron
   expuestas (ver `AUDITORIA.md`, sección de secretos en `scratch/`): **rota
   la contraseña de la base de datos** desde Project Settings → Database, y
   considera regenerar la `anon key` desde Project Settings → API si el
   proyecto es nuevo (en proyectos ya usados en producción, regenerar la
   `anon key` puede requerir coordinarlo porque invalida clientes existentes).

## 2. Correr el esquema SQL

1. Abre **SQL Editor** en el dashboard del proyecto → **New query**.
2. Copia y pega el contenido completo de `supabase/schema.sql` de este repo.
   Ejecuta (**Run**). Debe terminar sin errores.
3. Repite el mismo proceso con `supabase/seed.sql` (catálogo de pipeline +
   datos demo no privados). También debe terminar sin errores.
4. Verifica en **Table Editor** que existan las tablas: `integrantes`,
   `estados_pipeline`, `clientes`, `notas_clientes`, `sprints`, `tareas`,
   `agenda_eventos`, `actividades`, `importaciones` — y que cada una tenga el
   candado de **RLS** activado (ícono de escudo/candado verde en la lista de
   tablas).

## 3. Habilitar autenticación por Email

1. **Authentication → Providers → Email**: confirma que está habilitado
   (viene habilitado por defecto en proyectos nuevos).
2. Si quieres evitar que cualquiera se autorregistre desde una pantalla que
   hoy no existe en la UI pero podría existir en el futuro: en
   **Authentication → Providers → Email**, puedes desactivar "Allow new
   users to sign up" y dar de alta usuarios solo tú, manualmente (ver paso 5).
   Para un CRM interno de 4 personas, esto es lo recomendado.
3. **Authentication → URL Configuration**:
   - Site URL: `https://crm.asck.tech`
   - Redirect URLs: `https://crm.asck.tech/**`

## 4. Crear el usuario administrador (y el resto del equipo)

1. **Authentication → Users → Add user → Create new user**.
2. Ingresa el correo real (ej. `kevin@asck.software`) y una contraseña fuerte
   generada por un gestor de contraseñas. Marca "Auto Confirm User" para no
   depender de un correo de confirmación en el primer arranque.
3. Al crear el usuario, el trigger de `schema.sql` crea automáticamente su
   fila en `integrantes` con `rol = 'Sin asignar'`.
4. Ve a **Table Editor → integrantes**, busca la fila por su `id`/`email`, y
   edita manualmente los campos `nombre`, `rol` (ej. `Admin`, `Ventas`,
   `Dirección`), `cargo`, `avatar_url` como corresponda. Esto se hace SIEMPRE
   desde el dashboard — la app no tiene (ni debe tener) un botón para que un
   usuario se auto-asigne un rol.
5. Repite para cada integrante real del equipo (Sebas, Alberto, Centeno...).

## 5. Configurar las variables de entorno en Coolify

En la app `crm-asck` dentro de Coolify, sección **Environment Variables**:

| Variable | Valor |
|---|---|
| `VITE_DATA_PROVIDER` | `supabase` |
| `VITE_SUPABASE_URL` | La URL del proyecto (Project Settings → API → Project URL) |
| `VITE_SUPABASE_ANON_KEY` | La `anon` / `public` key (Project Settings → API → Project API keys → `anon public`) — **nunca** la `service_role` |

Guarda y dispara **Redeploy** de la app (las variables `VITE_*` se inyectan en
build time, así que un simple restart sin rebuild no las aplica).

## 6. Pruebas manuales post-activación

Hazlas directamente en `https://crm.asck.tech` después del redeploy:

- [ ] **Login válido**: entra con el correo/contraseña de un usuario creado en
      el paso 4. Debe entrar al CRM y mostrar su nombre/rol reales en la
      barra lateral (no un usuario mock).
- [ ] **Password inválido**: mismo correo, contraseña incorrecta. Debe
      rechazar con un mensaje genérico (no debe decir si el correo existe o
      no).
- [ ] **Usuario inexistente**: un correo que no está registrado. Debe mostrar
      el mismo mensaje genérico que el caso anterior (no debe filtrar si el
      usuario existe).
- [ ] **Sesión persiste**: recarga la página (F5) estando logueado. Debe
      seguir dentro del CRM sin pedir login de nuevo.
- [ ] **Logout**: usa "Cerrar sesión" en la barra lateral. Debe regresar a la
      pantalla de login.
- [ ] **Acceso sin sesión bloqueado**: después de cerrar sesión, intenta
      recargar o navegar directo a `https://crm.asck.tech`. Debe mostrar la
      pantalla de login, nunca el CRM.
- [ ] **Sin variables de Supabase (opcional, solo si quieres confirmarlo en un
      entorno de prueba aparte)**: si `VITE_SUPABASE_URL`/`VITE_SUPABASE_ANON_KEY`
      no están configuradas, cualquier intento de login debe fallar con
      "El sistema de autenticación no está configurado..." y jamás debe dar
      acceso al CRM.

## 7. Pendientes conocidos (no bloquean la activación, pero léelos)

- El panel **Configuración → Migración de datos** (`DataMigrationPanel`)
  sigue existiendo en el código pero quedó parcialmente incompatible con el
  esquema nuevo: intenta migrar los 4 integrantes de `mockData.js` con IDs de
  texto (`m-kevin-04`, etc.), y la tabla `integrantes` ahora exige que `id`
  sea el UUID real de `auth.users`. Ese paso específico de la migración va a
  fallar (los demás — clientes, tareas, etc. — si tienen `responsable_id`
  apuntando a esos mismos IDs de texto, también van a fallar por la relación
  con `integrantes`). No se tocó esa herramienta porque es de uso puntual y
  arreglarla es un cambio aparte, mayor al alcance de esta tarea.
- Los selectores de "responsable"/"asignado a" en varios componentes (kanban,
  tareas, modal de nuevo cliente, etc.) siguen leyendo la lista fija de
  `mockData.INTEGRANTES`, no la tabla `integrantes` real. Funcionan para
  mostrar nombres, pero los IDs que asignan no van a coincidir con los UUID
  de los usuarios reales de Supabase Auth. Migrar esos selectores a leer
  `integrantes` de verdad es trabajo aparte (no estaba en el alcance de este
  encargo, que era cerrar el hueco de autenticación).
- `src/services/cloudSyncService.js` sigue activo y sincroniza el estado local
  (clientes, tareas, notas, etc.) contra un bin público de JSONBin usando una
  clave (`SYNC_SALT`) fija en el código del cliente — esto es independiente
  de Supabase y **no** queda protegido por el login ni por RLS. Ya estaba
  documentado como riesgo pendiente en `AUDITORIA.md` (2026-07-12); segundo
  aviso porque hoy vuelve a ser relevante: cerrar el login de Supabase no
  cierra este canal. Requiere una decisión tuya (desactivarlo, o rediseñarlo
  detrás de un endpoint propio).
