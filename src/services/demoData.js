// Dataset FICTICIO para el modo demo del CRM. Ningun dato real de prospectos.
// Se siembra en el localStorage namespaceado (demo__asck_crm_clients) al entrar.
export const DEMO_CLIENTS = [
  {
    id: 'demo-c1', nombre: 'María Fernández', empresa: 'Panadería La Espiga', cargo: 'Dueña',
    email: 'maria@laespiga.example', telefono: '55 1000 0001', estado: 'nuevo', prioridad: 'alta',
    ultimoContacto: '2026-07-18', proximaAccion: 'Enviar cotización de página web', notas: 'Interesada en catálogo en línea.',
  },
  {
    id: 'demo-c2', nombre: 'Jorge Ramírez', empresa: 'Taller Mecánico RapidCar', cargo: 'Gerente',
    email: 'jorge@rapidcar.example', telefono: '55 1000 0002', estado: 'contactado', prioridad: 'media',
    ultimoContacto: '2026-07-15', proximaAccion: 'Agendar demo del sistema de citas', notas: 'Quiere agendar citas y recordatorios por WhatsApp.',
  },
  {
    id: 'demo-c3', nombre: 'Laura Gómez', empresa: 'Boutique Aurora', cargo: 'Fundadora',
    email: 'laura@aurora.example', telefono: '55 1000 0003', estado: 'propuesta', prioridad: 'alta',
    ultimoContacto: '2026-07-19', proximaAccion: 'Dar seguimiento a la propuesta enviada', notas: 'Propuesta de tienda en línea enviada, evaluando.',
  },
  {
    id: 'demo-c4', nombre: 'Carlos Núñez', empresa: 'Consultorio Dental Sonríe', cargo: 'Odontólogo',
    email: 'carlos@sonrie.example', telefono: '55 1000 0004', estado: 'negociacion', prioridad: 'alta',
    ultimoContacto: '2026-07-20', proximaAccion: 'Cerrar contrato de sistema de pacientes', notas: 'Listo para firmar, definir fecha de inicio.',
  },
  {
    id: 'demo-c5', nombre: 'Ana Torres', empresa: 'Cafetería El Grano', cargo: 'Propietaria',
    email: 'ana@elgrano.example', telefono: '55 1000 0005', estado: 'ganado', prioridad: 'media',
    ultimoContacto: '2026-07-10', proximaAccion: 'Onboarding y capacitación', notas: 'Cliente cerrado: menú digital + pedidos.',
  },
  {
    id: 'demo-c6', nombre: 'Diego Herrera', empresa: 'Gimnasio FuerzaTotal', cargo: 'Director',
    email: 'diego@fuerzatotal.example', telefono: '55 1000 0006', estado: 'contactado', prioridad: 'baja',
    ultimoContacto: '2026-07-12', proximaAccion: 'Reunión para levantar requerimientos', notas: 'Quiere control de membresías y accesos.',
  },
];
