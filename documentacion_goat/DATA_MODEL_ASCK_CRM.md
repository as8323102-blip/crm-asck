# Modelo de Datos Recomendado (PostgreSQL / JSON) — ASCK CRM

Este documento define la estructura técnica de las entidades de la base de datos para la versión **v1.8+** de la aplicación, adaptada para ser compatible tanto con la base local actual como con la estructura relacional de **PostgreSQL** (Supabase).

---

## 1. INTEGRANTES / USERS

Representa al equipo interno de ASCK Software que opera el CRM.

### Definición SQL (PostgreSQL)
```sql
CREATE TABLE integrantes (
  id VARCHAR(100) PRIMARY KEY, -- Ej: 'm-kevin-04' (UUID en producción)
  nombre VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  rol VARCHAR(100) NOT NULL,          -- Ej: 'Líder comercial y de cierres / QA'
  cargo VARCHAR(100) NOT NULL,        -- Ej: 'Director Comercial'
  responsabilidades TEXT,             -- Detalle operativo del integrante
  especialidad VARCHAR(150),          -- Área técnica o comercial fuerte
  horas_disponibles INTEGER DEFAULT 0,
  avatar_url TEXT,
  activo BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);
```

### Estructura JSON (Frontend)
```json
{
  "id": "m-kevin-04",
  "nombre": "Kevin",
  "email": "kevin@asck.software",
  "rol": "Líder comercial y de cierres / QA",
  "cargo": "Director Comercial",
  "responsabilidades": "Lidera cierres, validación final y decisiones comerciales",
  "especialidad": "Negociación & Cierres",
  "horasDisponibles": 52,
  "avatarUrl": "https://api.dicebear.com/7.x/bottts/svg?seed=Kevin",
  "activo": true
}
```

---

## 2. CLIENTES / PROSPECTOS

Entidad central que registra los leads comerciales de ASCK Software.

### Definición SQL (PostgreSQL)
```sql
CREATE TABLE clientes (
  id VARCHAR(100) PRIMARY KEY, -- Ej: 'P-001' (UUID en producción)
  nombre VARCHAR(255) NOT NULL,        -- Nombre comercial o persona física
  empresa VARCHAR(255) NOT NULL,       -- Giro / Nicho comercial
  telefono VARCHAR(50),
  correo VARCHAR(150),
  estado VARCHAR(50) DEFAULT 'Prospecto' NOT NULL, -- 'Prospecto', 'Contactado', 'Negociación', 'Cerrado', 'Perdido / pausado'
  responsable_id VARCHAR(100) REFERENCES integrantes(id) ON DELETE SET NULL,
  valor_estimado DECIMAL(12, 2) DEFAULT 0.00,
  prioridad VARCHAR(50) DEFAULT 'Media' NOT NULL, -- 'Baja', 'Media', 'Alta'
  fecha_seguimiento DATE,
  proxima_accion TEXT,
  campos_personalizados JSONB DEFAULT '[]'::jsonb, -- Estructura flexible para giros y dolores
  ultimo_contacto TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);
```

---

## 3. TAREAS (TÚDU)

Gestiona la lista de actividades del plan operativo de ASCK.

### Definición SQL (PostgreSQL)
```sql
CREATE TABLE tareas (
  id VARCHAR(100) PRIMARY KEY,
  sprint_id VARCHAR(100), -- Clave foránea lógica o física a Sprints
  cliente_id VARCHAR(100) REFERENCES clientes(id) ON DELETE SET NULL,
  asignado_a VARCHAR(100) REFERENCES integrantes(id) ON DELETE CASCADE,
  titulo VARCHAR(255) NOT NULL,
  completada BOOLEAN DEFAULT FALSE NOT NULL,
  estado VARCHAR(50) DEFAULT 'Pendiente' NOT NULL, -- 'Pendiente', 'En progreso', 'Completada'
  prioridad VARCHAR(50) DEFAULT 'Media' NOT NULL, -- 'Baja', 'Media', 'Alta'
  fecha_limite DATE,
  hora_limite VARCHAR(10) DEFAULT '12:00',
  duracion_estimada VARCHAR(50),                 -- Ej: '6 horas'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  completed_at TIMESTAMP WITH TIME ZONE
);
```

---

## 4. SPRINTS

Metas semanales del equipo de desarrollo y comercial.

### Definición SQL (PostgreSQL)
```sql
CREATE TABLE sprints (
  id VARCHAR(100) PRIMARY KEY,
  nombre VARCHAR(150) NOT NULL,
  fecha_inicio DATE NOT NULL,
  fecha_fin DATE NOT NULL,
  objetivo TEXT,
  responsable_id VARCHAR(100) REFERENCES integrantes(id) ON DELETE SET NULL,
  estado VARCHAR(50) DEFAULT 'Planeado' NOT NULL, -- 'Planeado', 'Activo', 'Terminado'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);
```

---

## 5. CALENDAR_EVENTS (AGENDA)

Eventos puros de la agenda horaria del equipo.

### Definición SQL (PostgreSQL)
```sql
CREATE TABLE agenda_eventos (
  id VARCHAR(100) PRIMARY KEY,
  titulo VARCHAR(255) NOT NULL,
  tipo VARCHAR(50) DEFAULT 'Reunión' NOT NULL, -- 'Tarea', 'Seguimiento', 'Cierre esperado', 'Reunión'
  cliente_id VARCHAR(100) REFERENCES clientes(id) ON DELETE SET NULL,
  responsable_id VARCHAR(100) REFERENCES integrantes(id) ON DELETE CASCADE,
  fecha DATE NOT NULL,
  hora_inicio VARCHAR(10) NOT NULL,           -- Ej: '09:00'
  hora_fin VARCHAR(10),                       -- Ej: '10:00'
  prioridad VARCHAR(50) DEFAULT 'Media',
  estado VARCHAR(50) DEFAULT 'Pendiente',
  notas TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);
```

---

## 6. NOTAS COMERCIALES

Notas de seguimiento de prospectos añadidas por los integrantes.

### Definición SQL (PostgreSQL)
```sql
CREATE TABLE notas_clientes (
  id VARCHAR(100) PRIMARY KEY,
  cliente_id VARCHAR(100) REFERENCES clientes(id) ON DELETE CASCADE,
  autor_id VARCHAR(100) REFERENCES integrantes(id) ON DELETE CASCADE,
  contenido TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);
```

---

## 7. ACTIVIDADES / LOGS

Registro lineal de auditoría y de actividad del equipo para el Dashboard.

### Definición SQL (PostgreSQL)
```sql
CREATE TABLE actividades (
  id VARCHAR(100) PRIMARY KEY,
  autor_id VARCHAR(100) REFERENCES integrantes(id) ON DELETE SET NULL,
  cliente_id VARCHAR(100) REFERENCES clientes(id) ON DELETE SET NULL,
  accion TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);
```
