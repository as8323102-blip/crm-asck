-- ============================================================================
-- CRM ASCK — Seed de producción (Supabase / Postgres)
-- ============================================================================
-- Ejecutar DESPUÉS de supabase/schema.sql, en el SQL Editor de Supabase.
--
-- Contiene:
--   1. Catálogo `estados_pipeline` (obligatorio: `clientes.estado` tiene un
--      FOREIGN KEY hacia esta tabla — sin esto no se puede crear ningún
--      cliente).
--   2. Datos DEMO claramente marcados (prefijo "DEMO —"), SIN correos ni
--      teléfonos reales, SIN vincular a ningún integrante real (responsable_id
--      queda NULL a propósito: los usuarios reales solo existen después de
--      registrarse por Supabase Auth, sus IDs son UUID y no se pueden inventar
--      aquí).
--
-- NO se sembraron los prospectos reales de src/mockData.js (Clínica Dental
-- Advance, Leal Dental, etc.) porque son datos de negocio/prospección real,
-- no datos de demostración. Si se quieren migrar, usar el panel de la app
-- (Configuración → Migración) una vez que haya integrantes reales dados de
-- alta, o adaptar ese lote manualmente con IDs de responsable válidos.
-- ============================================================================

-- 1. Catálogo de etapas del pipeline (coincide con mockData.ESTADOS_PIPELINE)
insert into public.estados_pipeline (nombre, orden) values
  ('Prospecto', 1),
  ('Contactado', 2),
  ('Negociación', 3),
  ('Cerrado', 4),
  ('Perdido / pausado', 5)
on conflict (nombre) do nothing;

-- 2. Datos demo no privados (opcional — cómodo para probar el CRM recién
--    activado sin exponer prospectos reales). Bórralos en cualquier momento
--    con el bloque "Limpieza" al final de este archivo.
insert into public.clientes (
  id, nombre, empresa, telefono, correo, estado, responsable_id,
  valor_estimado, prioridad, proxima_accion, campos_personalizados
) values (
  'demo-001',
  'DEMO — Cliente de ejemplo',
  'Empresa de ejemplo S.A.',
  '',
  '',
  'Prospecto',
  null,
  5000,
  'Media',
  'Este registro es de ejemplo. Asigna un responsable real y edítalo o bórralo.',
  '[]'::jsonb
)
on conflict (id) do nothing;

insert into public.sprints (id, nombre, fecha_inicio, fecha_fin, objetivo, responsable_id, estado) values (
  'demo-sprint-001',
  'DEMO — Sprint de ejemplo',
  current_date,
  current_date + interval '5 days',
  'Sprint de demostración: bórralo o edítalo una vez que el equipo esté dado de alta.',
  null,
  'Planeado'
)
on conflict (id) do nothing;

-- ============================================================================
-- Limpieza del seed demo (ejecutar cuando ya no se necesite la demo):
--
--   delete from public.tareas where cliente_id = 'demo-001' or sprint_id = 'demo-sprint-001';
--   delete from public.notas_clientes where cliente_id = 'demo-001';
--   delete from public.clientes where id = 'demo-001';
--   delete from public.sprints where id = 'demo-sprint-001';
--
-- El catálogo `estados_pipeline` NO se debe borrar: es requerido por la
-- restricción FOREIGN KEY de `clientes.estado` para que la app funcione.
-- ============================================================================
