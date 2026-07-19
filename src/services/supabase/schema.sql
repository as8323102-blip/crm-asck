-- Esquema de base de datos PostgreSQL para Supabase

-- Deshabilitar RLS temporalmente para creaciones seguras
-- 1. Tabla de Integrantes
CREATE TABLE public.integrantes (
  id VARCHAR(100) PRIMARY KEY, -- Soporta UUID o códigos legibles del CRM
  nombre VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  rol VARCHAR(100) NOT NULL,
  cargo VARCHAR(100) NOT NULL,
  responsabilidades TEXT,
  especialidad VARCHAR(150),
  horas_disponibles INTEGER DEFAULT 0 NOT NULL,
  avatar_url TEXT,
  activo BOOLEAN DEFAULT TRUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 2. Tabla de Clientes
CREATE TABLE public.clientes (
  id VARCHAR(100) PRIMARY KEY,
  nombre VARCHAR(255) NOT NULL,
  empresa VARCHAR(255) NOT NULL,
  telefono VARCHAR(50),
  correo VARCHAR(150),
  estado VARCHAR(50) DEFAULT 'Prospecto' NOT NULL,
  responsable_id VARCHAR(100) REFERENCES public.integrantes(id) ON DELETE SET NULL,
  valor_estimado DECIMAL(12, 2) DEFAULT 0.00 NOT NULL,
  prioridad VARCHAR(50) DEFAULT 'Media' NOT NULL,
  fecha_seguimiento DATE,
  proxima_accion TEXT,
  campos_personalizados JSONB DEFAULT '[]'::jsonb NOT NULL,
  ultimo_contacto TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  CONSTRAINT chk_estado CHECK (estado IN ('Prospecto', 'Contactado', 'Negociación', 'Cerrado', 'Perdido / pausado')),
  CONSTRAINT chk_prioridad CHECK (prioridad IN ('Baja', 'Media', 'Alta'))
);

-- 3. Tabla de Sprints
CREATE TABLE public.sprints (
  id VARCHAR(100) PRIMARY KEY,
  nombre VARCHAR(150) NOT NULL,
  fecha_inicio DATE NOT NULL,
  fecha_fin DATE NOT NULL,
  objetivo TEXT,
  responsable_id VARCHAR(100) REFERENCES public.integrantes(id) ON DELETE SET NULL,
  estado VARCHAR(50) DEFAULT 'Planeado' NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  CONSTRAINT chk_sprint_estado CHECK (estado IN ('Planeado', 'Activo', 'Terminado', 'Pausado'))
);

-- 4. Tabla de Tareas
CREATE TABLE public.tareas (
  id VARCHAR(100) PRIMARY KEY,
  sprint_id VARCHAR(100) REFERENCES public.sprints(id) ON DELETE SET NULL,
  cliente_id VARCHAR(100) REFERENCES public.clientes(id) ON DELETE CASCADE,
  asignado_a VARCHAR(100) REFERENCES public.integrantes(id) ON DELETE CASCADE,
  titulo VARCHAR(255) NOT NULL,
  completada BOOLEAN DEFAULT FALSE NOT NULL,
  estado VARCHAR(50) DEFAULT 'Pendiente' NOT NULL,
  prioridad VARCHAR(50) DEFAULT 'Media' NOT NULL,
  fecha_limite DATE,
  hora_limite VARCHAR(10) DEFAULT '12:00' NOT NULL,
  duracion_estimada VARCHAR(50),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  completed_at TIMESTAMP WITH TIME ZONE,
  CONSTRAINT chk_tarea_estado CHECK (estado IN ('Pendiente', 'En progreso', 'Completada')),
  CONSTRAINT chk_tarea_prioridad CHECK (prioridad IN ('Baja', 'Media', 'Alta'))
);

-- 5. Tabla de Agenda
CREATE TABLE public.agenda_eventos (
  id VARCHAR(100) PRIMARY KEY,
  titulo VARCHAR(255) NOT NULL,
  tipo VARCHAR(50) DEFAULT 'Reunión' NOT NULL,
  cliente_id VARCHAR(100) REFERENCES public.clientes(id) ON DELETE SET NULL,
  responsable_id VARCHAR(100) REFERENCES public.integrantes(id) ON DELETE CASCADE,
  fecha DATE NOT NULL,
  hora_inicio VARCHAR(10) NOT NULL,
  hora_fin VARCHAR(10),
  prioridad VARCHAR(50) DEFAULT 'Media' NOT NULL,
  estado VARCHAR(50) DEFAULT 'Pendiente' NOT NULL,
  notas TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  CONSTRAINT chk_evento_tipo CHECK (tipo IN ('Tarea', 'Seguimiento', 'Cierre esperado', 'Reunión')),
  CONSTRAINT chk_evento_prioridad CHECK (prioridad IN ('Baja', 'Media', 'Alta')),
  CONSTRAINT chk_evento_estado CHECK (estado IN ('Pendiente', 'Completada'))
);

-- 6. Tabla de Notas
CREATE TABLE public.notas_clientes (
  id VARCHAR(100) PRIMARY KEY,
  cliente_id VARCHAR(100) REFERENCES public.clientes(id) ON DELETE CASCADE,
  autor_id VARCHAR(100) REFERENCES public.integrantes(id) ON DELETE CASCADE,
  contenido TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 7. Tabla de Actividades
CREATE TABLE public.actividades (
  id VARCHAR(100) PRIMARY KEY,
  autor_id VARCHAR(100) REFERENCES public.integrantes(id) ON DELETE SET NULL,
  cliente_id VARCHAR(100) REFERENCES public.clientes(id) ON DELETE SET NULL,
  accion TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 8. Tabla de Importaciones
CREATE TABLE public.importaciones (
  id VARCHAR(100) PRIMARY KEY,
  filename VARCHAR(255) NOT NULL,
  total_filas INTEGER NOT NULL,
  nuevos_creados INTEGER NOT NULL,
  actualizados INTEGER NOT NULL,
  duplicados_omitidos INTEGER NOT NULL,
  errores INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Habilitar Row Level Security (RLS) en todas las tablas
ALTER TABLE public.integrantes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.clientes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sprints ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tareas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.agenda_eventos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notas_clientes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.actividades ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.importaciones ENABLE ROW LEVEL SECURITY;

-- Políticas de Seguridad RLS básicas (Permitir lectura/escritura a usuarios autenticados)
CREATE POLICY "Permitir todo a autenticados en integrantes" ON public.integrantes FOR ALL TO authenticated USING (true);
CREATE POLICY "Permitir todo a autenticados en clientes" ON public.clientes FOR ALL TO authenticated USING (true);
CREATE POLICY "Permitir todo a autenticados en sprints" ON public.sprints FOR ALL TO authenticated USING (true);
CREATE POLICY "Permitir todo a autenticados en tareas" ON public.tareas FOR ALL TO authenticated USING (true);
CREATE POLICY "Permitir todo a autenticados en agenda_eventos" ON public.agenda_eventos FOR ALL TO authenticated USING (true);
CREATE POLICY "Permitir todo a autenticados en notas_clientes" ON public.notas_clientes FOR ALL TO authenticated USING (true);
CREATE POLICY "Permitir todo a autenticados en actividades" ON public.actividades FOR ALL TO authenticated USING (true);
CREATE POLICY "Permitir todo a autenticados en importaciones" ON public.importaciones FOR ALL TO authenticated USING (true);

-- Índices para optimización de consultas recurrentes
CREATE INDEX idx_clientes_estado ON public.clientes(estado);
CREATE INDEX idx_clientes_prioridad ON public.clientes(prioridad);
CREATE INDEX idx_clientes_responsable ON public.clientes(responsable_id);
CREATE INDEX idx_tareas_completada ON public.tareas(completada);
CREATE INDEX idx_tareas_sprint ON public.tareas(sprint_id);
CREATE INDEX idx_agenda_fecha ON public.agenda_eventos(fecha);

-- Trigger de updated_at para la tabla clientes
CREATE OR REPLACE FUNCTION update_modified_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_clientes_changetimestamp BEFORE UPDATE ON public.clientes FOR EACH ROW EXECUTE PROCEDURE update_modified_column();
