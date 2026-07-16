-- ASCK CRM: Migración para habilitar Réplica Realtime, RLS deshabilitado y columnas extra de Tareas

-- 1. Agregar columnas adicionales para las tareas de delegación si no existen
ALTER TABLE public.tareas ADD COLUMN IF NOT EXISTS macroarea VARCHAR(100);
ALTER TABLE public.tareas ADD COLUMN IF NOT EXISTS apoyo VARCHAR(255);
ALTER TABLE public.tareas ADD COLUMN IF NOT EXISTS entregable TEXT;
ALTER TABLE public.tareas ADD COLUMN IF NOT EXISTS justificacion TEXT;
ALTER TABLE public.tareas ADD COLUMN IF NOT EXISTS bloqueo TEXT;
ALTER TABLE public.tareas ADD COLUMN IF NOT EXISTS proxima_accion TEXT;
ALTER TABLE public.tareas ADD COLUMN IF NOT EXISTS fecha_inicio DATE;
ALTER TABLE public.tareas ADD COLUMN IF NOT EXISTS responsable_nombre VARCHAR(100);

-- 2. Modificar o eliminar restricciones de check de tareas para permitir nuevos estados y prioridades
ALTER TABLE public.tareas DROP CONSTRAINT IF EXISTS chk_tarea_estado;
ALTER TABLE public.tareas ADD CONSTRAINT chk_tarea_estado CHECK (estado IN ('Pendiente', 'En progreso', 'Completada', 'Hecho', 'Bloqueado', 'Pausado', 'Cancelado'));

ALTER TABLE public.tareas DROP CONSTRAINT IF EXISTS chk_tarea_prioridad;
ALTER TABLE public.tareas ADD CONSTRAINT chk_tarea_prioridad CHECK (prioridad IN ('Alta', 'Media', 'Baja', 'P0', 'P1', 'P2'));

-- 3. Deshabilitar RLS (Row Level Security) para simplificar acceso de lectura/escritura anónimo
ALTER TABLE public.clientes DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.tareas DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.sprints DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.agenda_eventos DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.notas_clientes DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.actividades DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.integrantes DISABLE ROW LEVEL SECURITY;

-- 4. Asegurarse de que las tablas estén incluidas en la publicación de Supabase Realtime
ALTER PUBLICATION supabase_realtime ADD TABLE public.clientes;
ALTER PUBLICATION supabase_realtime ADD TABLE public.tareas;
ALTER PUBLICATION supabase_realtime ADD TABLE public.sprints;
ALTER PUBLICATION supabase_realtime ADD TABLE public.agenda_eventos;
ALTER PUBLICATION supabase_realtime ADD TABLE public.notas_clientes;
ALTER PUBLICATION supabase_realtime ADD TABLE public.actividades;
ALTER PUBLICATION supabase_realtime ADD TABLE public.integrantes;
