-- Esquema de base de datos MySQL / MariaDB para XAMPP
USE crm_asck;

-- Desactivar llaves foráneas para poder hacer drop seguro
SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS tareas;
DROP TABLE IF EXISTS notas_seguimiento;
DROP TABLE IF EXISTS clientes;
DROP TABLE IF EXISTS integrantes;
SET FOREIGN_KEY_CHECKS = 1;

-- 1. Tabla de Integrantes
CREATE TABLE integrantes (
  id VARCHAR(36) PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  rol VARCHAR(50) NOT NULL, -- 'Desarrollador', 'Ventas', 'Admin', etc.
  avatar_url TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insertar los 4 integrantes iniciales de ASCK Software (usamos los mismos IDs de la app)
INSERT INTO integrantes (id, nombre, email, rol, avatar_url) VALUES
  ('m-alan-01', 'Alan', 'alan@asck.software', 'Director / Dev', 'https://api.dicebear.com/7.x/bottts/svg?seed=Alan'),
  ('m-santy-02', 'Santy', 'santy@asck.software', 'Full Stack Dev', 'https://api.dicebear.com/7.x/bottts/svg?seed=Santy'),
  ('m-camilo-03', 'Camilo', 'camilo@asck.software', 'Frontend Dev', 'https://api.dicebear.com/7.x/bottts/svg?seed=Camilo'),
  ('m-kevin-04', 'Kevin', 'kevin@asck.software', 'Product Owner / QA', 'https://api.dicebear.com/7.x/bottts/svg?seed=Kevin');

-- 2. Tabla de Clientes
CREATE TABLE clientes (
  id VARCHAR(36) PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  empresa VARCHAR(100) NOT NULL,
  telefono VARCHAR(20),
  correo VARCHAR(100),
  estado ENUM('Prospecto', 'Contactado', 'Negociación', 'Cerrado', 'Perdido / pausado') NOT NULL,
  responsable_id VARCHAR(36),
  valor_estimado DECIMAL(10,2) DEFAULT 0.00,
  ultimo_contacto TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (responsable_id) REFERENCES integrantes(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insertar clientes semilla
INSERT INTO clientes (id, nombre, empresa, telefono, correo, estado, responsable_id, valor_estimado, ultimo_contacto, created_at) VALUES
  ('c-01', 'Carlos Mendoza', 'Apex Solutions', '+52 55 1234 5678', 'carlos.m@apexsolutions.com', 'Negociación', 'm-alan-01', 4500.00, '2026-06-30 10:00:00', '2026-06-15 08:30:00'),
  ('c-02', 'Laura Gómez', 'Studio Creativo', '+52 55 8765 4321', 'laura@studiocreativo.mx', 'Cerrado', 'm-camilo-03', 2800.00, '2026-07-01 15:30:00', '2026-06-10 11:20:00'),
  ('c-03', 'Roberto Sánchez', 'Ferreterías del Centro', '+52 33 9988 7766', 'roberto.s@ferrecentro.com', 'Prospecto', 'm-santy-02', 8500.00, '2026-06-25 09:15:00', '2026-06-25 09:00:00'),
  ('c-04', 'Ana Lucía Ortiz', 'Salud Global', '+52 81 4455 6677', 'ana.ortiz@saludglobal.org', 'Contactado', 'm-kevin-04', 12000.00, '2026-06-29 11:40:00', '2026-06-20 14:10:00'),
  ('c-05', 'Eduardo Peña', 'Logística Express', '+52 55 5566 7788', 'epena@logexpress.com.mx', 'Perdido / pausado', 'm-santy-02', 3500.00, '2026-06-18 16:00:00', '2026-06-01 10:00:00');

-- 3. Tabla de Notas de Seguimiento
CREATE TABLE notas_seguimiento (
  id VARCHAR(36) PRIMARY KEY,
  cliente_id VARCHAR(36) NOT NULL,
  autor_id VARCHAR(36) NOT NULL,
  contenido TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (cliente_id) REFERENCES clientes(id) ON DELETE CASCADE,
  FOREIGN KEY (autor_id) REFERENCES integrantes(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insertar notas semilla
INSERT INTO notas_seguimiento (id, cliente_id, autor_id, contenido, created_at) VALUES
  ('n-01', 'c-01', 'm-alan-01', 'Se presentó la propuesta de cotizador interno v2. Les gustó el enfoque en la nube y los tiempos de entrega. Quedaron de revisar internamente el presupuesto.', '2026-06-28 16:45:00'),
  ('n-02', 'c-01', 'm-alan-01', 'Llamada de seguimiento. Nos solicitan un ajuste en la integración de pasarela de pagos. Se enviará adendum de propuesta mañana.', '2026-06-30 10:00:00'),
  ('n-03', 'c-02', 'm-camilo-03', '¡Contrato firmado! El proyecto de rediseño de marca y web corporativa inicia operaciones la siguiente semana. El anticipo del 50% ya fue recibido.', '2026-07-01 15:30:00'),
  ('n-04', 'c-03', 'm-santy-02', 'Formulario web recibido. Interesados en una plataforma de facturación e inventarios. Se les asignó seguimiento prioritario.', '2026-06-25 09:15:00'),
  ('n-05', 'c-04', 'm-kevin-04', 'Primer contacto por correo electrónico. Se les envió información comercial y un enlace de Calendly para agendar llamada introductoria.', '2026-06-29 11:40:00');

-- 4. Tabla de Tareas y Recordatorios
CREATE TABLE tareas (
  id VARCHAR(36) PRIMARY KEY,
  cliente_id VARCHAR(36),
  asignado_a VARCHAR(36) NOT NULL,
  titulo VARCHAR(255) NOT NULL,
  completada TINYINT(1) DEFAULT 0 NOT NULL,
  fecha_limite DATE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (cliente_id) REFERENCES clientes(id) ON DELETE CASCADE,
  FOREIGN KEY (asignado_a) REFERENCES integrantes(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insertar tareas semilla
INSERT INTO tareas (id, cliente_id, asignado_a, titulo, completada, fecha_limite, created_at) VALUES
  ('t-01', 'c-01', 'm-alan-01', 'Enviar ajuste de presupuesto con módulo de pagos', 0, '2026-07-03', '2026-07-01 10:00:00'),
  ('t-02', 'c-03', 'm-santy-02', 'Llamar para agendar demo de inventarios', 0, '2026-07-04', '2026-07-01 10:00:00'),
  ('t-03', 'c-02', 'm-camilo-03', 'Crear canal de Slack con cliente y equipo', 1, '2026-07-01', '2026-07-01 10:00:00'),
  ('t-04', 'c-04', 'm-kevin-04', 'Enviar recordatorio para agendar llamada', 0, '2026-07-05', '2026-07-01 10:00:00');
