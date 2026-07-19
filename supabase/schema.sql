-- ============================================================================
-- CRM ASCK — Esquema de producción para Supabase (Postgres + Auth + RLS)
-- ============================================================================
-- Ejecutar completo en: Supabase Dashboard → SQL Editor → New query → Run.
-- Es idempotente en su mayoría (CREATE TABLE IF NOT EXISTS / OR REPLACE),
-- pero está pensado para correr UNA vez sobre un proyecto nuevo/limpio.
--
-- Nombres y columnas verificados contra el código real (no inventados):
--   src/services/supabase/*Service.js + src/services/supabase/mappers.js
--
-- Nota de diseño: la tabla `integrantes` cumple el rol de "profiles". Se llama
-- `integrantes` (no `profiles`) porque así la referencian ya los servicios
-- existentes (supabaseUserService.js) y sus políticas RLS. Es funcionalmente
-- un profiles: id = auth.users.id, se llena por trigger, RLS activo, el rol
-- del usuario se lee de aquí y NUNCA se confía en el cliente.
-- ============================================================================

-- Extensión para gen_random_uuid() (normalmente ya está habilitada en Supabase)
create extension if not exists pgcrypto;

-- ----------------------------------------------------------------------------
-- 1. INTEGRANTES (= profiles). id referencia auth.users(id).
-- ----------------------------------------------------------------------------
create table if not exists public.integrantes (
  id uuid primary key references auth.users(id) on delete cascade,
  nombre text not null,
  email text unique,
  rol text not null default 'Sin asignar',
  cargo text,
  responsabilidades text,
  especialidad text,
  horas_disponibles integer default 0,
  avatar_url text,
  activo boolean not null default true,
  created_at timestamptz not null default now()
);

comment on table public.integrantes is
  'Perfiles de equipo (rol de "profiles"). id = auth.users.id. El rol (columna rol) es la única fuente de verdad de permisos; nunca se confía en el valor que mande el cliente.';

-- ----------------------------------------------------------------------------
-- 2. ESTADOS_PIPELINE (catálogo de etapas del pipeline comercial)
-- ----------------------------------------------------------------------------
create table if not exists public.estados_pipeline (
  nombre text primary key,
  orden integer not null default 0,
  created_at timestamptz not null default now()
);

-- ----------------------------------------------------------------------------
-- 3. CLIENTES (prospectos/clientes del CRM)
-- ----------------------------------------------------------------------------
create table if not exists public.clientes (
  id text primary key,
  nombre text not null,
  empresa text,
  telefono text,
  correo text,
  estado text not null references public.estados_pipeline(nombre) on update cascade,
  responsable_id uuid references public.integrantes(id) on delete set null,
  ultimo_contacto timestamptz,
  created_at timestamptz not null default now(),
  valor_estimado numeric(12,2) not null default 0,
  prioridad text not null default 'Media',
  fecha_seguimiento date,
  proxima_accion text,
  campos_personalizados jsonb not null default '[]'::jsonb
);

create index if not exists idx_clientes_estado on public.clientes(estado);
create index if not exists idx_clientes_responsable on public.clientes(responsable_id);

-- ----------------------------------------------------------------------------
-- 4. NOTAS_CLIENTES
-- ----------------------------------------------------------------------------
create table if not exists public.notas_clientes (
  id text primary key,
  cliente_id text references public.clientes(id) on delete cascade,
  autor_id uuid references public.integrantes(id) on delete set null,
  contenido text not null,
  created_at timestamptz not null default now()
);

create index if not exists idx_notas_cliente on public.notas_clientes(cliente_id);

-- ----------------------------------------------------------------------------
-- 5. SPRINTS
-- ----------------------------------------------------------------------------
create table if not exists public.sprints (
  id text primary key,
  nombre text not null,
  fecha_inicio date,
  fecha_fin date,
  objetivo text,
  responsable_id uuid references public.integrantes(id) on delete set null,
  estado text not null default 'Planeado',
  created_at timestamptz not null default now()
);

-- ----------------------------------------------------------------------------
-- 6. TAREAS
-- ----------------------------------------------------------------------------
create table if not exists public.tareas (
  id text primary key,
  sprint_id text references public.sprints(id) on delete set null,
  cliente_id text references public.clientes(id) on delete cascade,
  asignado_a uuid references public.integrantes(id) on delete set null,
  titulo text not null,
  completada boolean not null default false,
  estado text not null default 'Pendiente',
  prioridad text not null default 'Media',
  fecha_limite date,
  hora_limite text default '12:00',
  duracion_estimada text,
  created_at timestamptz not null default now(),
  completed_at timestamptz
);

create index if not exists idx_tareas_sprint on public.tareas(sprint_id);
create index if not exists idx_tareas_cliente on public.tareas(cliente_id);
create index if not exists idx_tareas_asignado on public.tareas(asignado_a);

-- ----------------------------------------------------------------------------
-- 7. AGENDA_EVENTOS
-- ----------------------------------------------------------------------------
create table if not exists public.agenda_eventos (
  id text primary key,
  titulo text not null,
  tipo text not null default 'Reunión',
  cliente_id text references public.clientes(id) on delete set null,
  responsable_id uuid references public.integrantes(id) on delete set null,
  fecha date not null,
  hora_inicio text,
  hora_fin text,
  prioridad text not null default 'Media',
  estado text not null default 'Pendiente',
  notas text,
  created_at timestamptz not null default now()
);

create index if not exists idx_agenda_fecha on public.agenda_eventos(fecha);

-- ----------------------------------------------------------------------------
-- 8. ACTIVIDADES (feed/histórico del equipo)
-- ----------------------------------------------------------------------------
create table if not exists public.actividades (
  id text primary key,
  autor_id uuid references public.integrantes(id) on delete set null,
  cliente_id text references public.clientes(id) on delete set null,
  accion text not null,
  created_at timestamptz not null default now()
);

create index if not exists idx_actividades_created on public.actividades(created_at desc);

-- ----------------------------------------------------------------------------
-- 9. IMPORTACIONES (historial de importación/exportación Excel)
-- ----------------------------------------------------------------------------
create table if not exists public.importaciones (
  id text primary key,
  filename text,
  total_filas integer not null default 0,
  nuevos_creados integer not null default 0,
  actualizados integer not null default 0,
  duplicados_omitidos integer not null default 0,
  errores integer not null default 0,
  created_at timestamptz not null default now()
);

-- ============================================================================
-- TRIGGER: crear fila en integrantes cuando se registra un usuario en auth.users
-- ============================================================================
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.integrantes (id, nombre, email, rol, avatar_url)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'nombre', split_part(new.email, '@', 1)),
    new.email,
    'Sin asignar',
    'https://api.dicebear.com/7.x/bottts/svg?seed=' || new.id
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ============================================================================
-- ROW LEVEL SECURITY
-- ============================================================================
-- Regla general (equipo pequeño, sin jerarquía de datos por dueño): cualquier
-- usuario AUTENTICADO tiene acceso completo de lectura/escritura al CRM. Los
-- servicios de la app (src/services/supabase/*Service.js) no filtran por
-- owner en ninguna tabla operativa, así que no se emula ownership ahí.
--
-- Excepción: `integrantes`. Esa tabla es la fuente de verdad del ROL de cada
-- usuario. Si se le diera INSERT/UPDATE libre a "authenticated", cualquier
-- integrante podría auto-asignarse rol = 'Admin' desde el navegador (llamando
-- directamente a la REST API con la anon key). Por eso esa tabla solo permite
-- SELECT a usuarios autenticados; la fila se crea por el trigger de arriba
-- (que corre con privilegios de definer, sin pasar por RLS) y los cambios de
-- rol/datos de perfil se hacen desde el Dashboard de Supabase (Table Editor),
-- nunca desde el cliente. `supabaseUserService.updateProfile()` existe en el
-- código pero no se usa desde ningún componente hoy — si en el futuro se
-- activa un formulario de "editar mi perfil", agregar una policy de UPDATE
-- acotada a auth.uid() = id y a columnas no sensibles (nombre/avatar_url),
-- nunca a rol.

alter table public.integrantes enable row level security;
alter table public.estados_pipeline enable row level security;
alter table public.clientes enable row level security;
alter table public.notas_clientes enable row level security;
alter table public.sprints enable row level security;
alter table public.tareas enable row level security;
alter table public.agenda_eventos enable row level security;
alter table public.actividades enable row level security;
alter table public.importaciones enable row level security;

-- integrantes: solo lectura de equipo. Sin insert/update/delete para "authenticated".
drop policy if exists "integrantes_select_team" on public.integrantes;
create policy "integrantes_select_team"
  on public.integrantes for select
  to authenticated
  using (true);

-- estados_pipeline: catálogo de solo lectura para el equipo. Se administra
-- desde el SQL Editor / Dashboard (no se escribe desde el cliente).
drop policy if exists "estados_pipeline_select_team" on public.estados_pipeline;
create policy "estados_pipeline_select_team"
  on public.estados_pipeline for select
  to authenticated
  using (true);

-- Tablas operativas: acceso de equipo (CRUD completo) para cualquier usuario
-- autenticado, sin distinción de "dueño" del registro.
drop policy if exists "clientes_team_all" on public.clientes;
create policy "clientes_team_all"
  on public.clientes for all
  to authenticated
  using (true)
  with check (true);

drop policy if exists "notas_clientes_team_all" on public.notas_clientes;
create policy "notas_clientes_team_all"
  on public.notas_clientes for all
  to authenticated
  using (true)
  with check (true);

drop policy if exists "sprints_team_all" on public.sprints;
create policy "sprints_team_all"
  on public.sprints for all
  to authenticated
  using (true)
  with check (true);

drop policy if exists "tareas_team_all" on public.tareas;
create policy "tareas_team_all"
  on public.tareas for all
  to authenticated
  using (true)
  with check (true);

drop policy if exists "agenda_eventos_team_all" on public.agenda_eventos;
create policy "agenda_eventos_team_all"
  on public.agenda_eventos for all
  to authenticated
  using (true)
  with check (true);

drop policy if exists "actividades_team_all" on public.actividades;
create policy "actividades_team_all"
  on public.actividades for all
  to authenticated
  using (true)
  with check (true);

drop policy if exists "importaciones_team_all" on public.importaciones;
create policy "importaciones_team_all"
  on public.importaciones for all
  to authenticated
  using (true)
  with check (true);

-- Ningún rol "anon" tiene policy en ninguna tabla: sin sesión, cero acceso.
-- ============================================================================
-- FIN schema.sql
-- ============================================================================
