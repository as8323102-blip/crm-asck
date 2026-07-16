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

-- 2. Deshabilitar RLS (Row Level Security) para simplificar acceso de lectura/escritura anónimo
ALTER TABLE public.clientes DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.tareas DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.sprints DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.agenda_eventos DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.notas_clientes DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.actividades DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.integrantes DISABLE ROW LEVEL SECURITY;

-- 3. Asegurarse de que las tablas estén incluidas en la publicación de Supabase Realtime
-- Nota: Si da error diciendo que ya existen en la publicación, se puede ignorar.
ALTER PUBLICATION supabase_realtime ADD TABLE public.clientes;
ALTER PUBLICATION supabase_realtime ADD TABLE public.tareas;
ALTER PUBLICATION supabase_realtime ADD TABLE public.sprints;
ALTER PUBLICATION supabase_realtime ADD TABLE public.agenda_eventos;
ALTER PUBLICATION supabase_realtime ADD TABLE public.notas_clientes;
ALTER PUBLICATION supabase_realtime ADD TABLE public.actividades;
ALTER PUBLICATION supabase_realtime ADD TABLE public.integrantes;
