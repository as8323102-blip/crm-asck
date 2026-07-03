// Datos Reales de ASCK Software v1.8 (Cargados desde Plan Operativo y Excel de Prospectos)

export const INTEGRANTES = [
  {
    id: "m-kevin-04",
    nombre: "Kevin",
    email: "kevin@asck.software",
    rol: "Líder comercial y de cierres / QA",
    cargo: "Director Comercial",
    responsabilidades: "Lidera cierres, validación final y decisiones comerciales",
    especialidad: "Negociación & Cierres",
    horasDisponibles: 52,
    avatarUrl: "https://api.dicebear.com/7.x/bottts/svg?seed=Kevin"
  },
  {
    id: "m-alberto-01",
    nombre: "Alberto",
    email: "alberto@asck.software",
    rol: "Sostiene CRM web, automatización, pruebas y guías técnicas",
    cargo: "Lead Software Architect",
    responsabilidades: "Soporte técnico del CRM web, automatizaciones, pruebas y guías técnicas",
    especialidad: "Backend & Systems Architecture",
    horasDisponibles: 36,
    avatarUrl: "https://api.dicebear.com/7.x/bottts/svg?seed=Alberto"
  },
  {
    id: "m-sebas-03",
    nombre: "Sebas",
    email: "sebas@asck.software",
    rol: "Alimenta el CRM, consigue datos, da seguimiento y agenda",
    cargo: "Operaciones Comerciales",
    responsabilidades: "Búsqueda de datos de prospectos, primer contacto por WhatsApp/IG/Maps, seguimiento y agendación",
    especialidad: "Data Collection & Sales Outreach",
    horasDisponibles: 36,
    avatarUrl: "https://api.dicebear.com/7.x/bottts/svg?seed=Sebas"
  },
  {
    id: "m-centeno-02",
    nombre: "Centeno",
    email: "centeno@asck.software",
    rol: "Rescata y ordena demos: Dental Printal, Finanzas, documentación y WhatsApp",
    cargo: "UI/UX & Frontend Developer",
    responsabilidades: "Preparación y limpieza de demos (Dental Printal, Finanzas, WhatsApp) y documentación visual de venta",
    especialidad: "Frontend & Demo Building",
    horasDisponibles: 52,
    avatarUrl: "https://api.dicebear.com/7.x/bottts/svg?seed=Centeno"
  }
];

export const ESTADOS_PIPELINE = [
  "Prospecto",
  "Contactado",
  "Negociación",
  "Cerrado",
  "Perdido / pausado"
];

// Prospectos Reales del archivo Excel (Filtrados por la pestaña CRM_Cargar)
export const CLIENTES_INICIALES = [
  {
    id: "P-001",
    nombre: "Clínica Dental Advance",
    empresa: "Dental / Clínica",
    telefono: "",
    correo: "",
    estado: "Prospecto",
    responsableId: "m-kevin-04",
    ultimoContacto: "2026-07-01T09:00:00.000Z",
    createdAt: "2026-07-01T08:30:00.000Z",
    valorEstimado: 23250,
    prioridad: "Alta",
    fechaSeguimiento: "2026-07-02",
    proximaAccion: "Revisar Maps/fachada/redes y validar WhatsApp; preparar demo con Clínica Dental Advance como preset",
    camposPersonalizados: [
      { clave: "Dirección", valor: "José María Morelos 1, Segundo Piso, San Melchor, 52760 Huixquilucan de Degollado, Méx." },
      { clave: "Redes / Fuentes", valor: "Instagram, Facebook, Doctoralia, BuscoDentista, Google Maps" },
      { clave: "Dolor real", valor: "Confianza, captación de pacientes, agenda y seguimiento" },
      { clave: "Oferta sugerida", valor: "Landing dental + formulario de valoración + WhatsApp dinámico + pipeline + agenda" },
      { clave: "Paquete objetivo", valor: "Dental Clínica Pro" },
      { clave: "Mantenimiento sugerido", valor: "$2,000–$3,000/mes" },
      { clave: "Criterio ROI", valor: "Clínica con ticket alto y capacidad de pago; el sistema sí resuelve captación y recepción" },
      { clave: "Links", valor: "https://www.instagram.com/dentaladvancemx/\nhttps://www.facebook.com/DentalAdvanceMX/\nhttps://www.doctoralia.com.mx/clinicas/clinica-dental-advanced\nhttps://buscodentista.com.mx/estado-de-mexico/huixquilucan/clinica-dental-advance/" }
    ]
  },
  {
    id: "P-002",
    nombre: "Leal Dental / Dra. Leticia Campa",
    empresa: "Dental / Clínica-reputación",
    telefono: "",
    correo: "",
    estado: "Prospecto",
    responsableId: "m-kevin-04",
    ultimoContacto: "2026-07-01T09:00:00.000Z",
    createdAt: "2026-07-01T08:30:00.000Z",
    valorEstimado: 20500,
    prioridad: "Alta",
    fechaSeguimiento: "2026-07-02",
    proximaAccion: "Revisar zona Palo Solo, fachada, flujo y actividad de Instagram; validar teléfono",
    camposPersonalizados: [
      { clave: "Dirección", valor: "Av. Palo Solo Manzana 018, Federal Burocrática, 52777 Huixquilucan, Méx. · por validar" },
      { clave: "Redes / Fuentes", valor: "Instagram, BuscoDentista, Google Maps" },
      { clave: "Dolor real", valor: "Reputación, tratamientos de alto valor, valoración y seguimiento" },
      { clave: "Oferta sugerida", valor: "Landing premium + reputación + valoración + WhatsApp + CRM ligero" },
      { clave: "Paquete objetivo", valor: "Dental Captación + Agenda" },
      { clave: "Mantenimiento sugerido", valor: "$1,500–$2,500/mes" },
      { clave: "Criterio ROI", valor: "Dental con reputación y tratamientos de ticket alto; puede recuperar inversión con pocos pacientes" },
      { clave: "Links", valor: "https://www.instagram.com/lealdentalletycampa/\nhttps://buscodentista.com.mx/estado-de-mexico/huixquilucan/leal-dental-dra-leticia-campa-mendoza/" }
    ]
  },
  {
    id: "P-003",
    nombre: "Dr. Enrique Caxnajoy",
    empresa: "Dental / Doctor individual",
    telefono: "",
    correo: "",
    estado: "Prospecto",
    responsableId: "m-kevin-04",
    ultimoContacto: "2026-07-01T09:00:00.000Z",
    createdAt: "2026-07-01T08:30:00.000Z",
    valorEstimado: 17000,
    prioridad: "Alta",
    fechaSeguimiento: "2026-07-02",
    proximaAccion: "Revisar Maps/fachada/consultorio, validar WhatsApp y servicios más rentables",
    camposPersonalizados: [
      { clave: "Dirección", valor: "José María Morelos #26, San Juan Bautista, 52760 Huixquilucan de Degollado, Méx. · por validar" },
      { clave: "Redes / Fuentes", valor: "Instagram, Facebook, Doctoralia, BuscoDentista, Google Maps" },
      { clave: "Dolor real", valor: "Marca personal, confianza, explicación de servicios y citas" },
      { clave: "Oferta sugerida", valor: "Marca personal dental + landing + valoración + WhatsApp + seguimiento" },
      { clave: "Paquete objetivo", valor: "Dental Captación + Agenda" },
      { clave: "Mantenimiento sugerido", valor: "$1,500/mes" },
      { clave: "Criterio ROI", valor: "Doctor individual con ticket alto; la demo puede convertir dudas en valoración" },
      { clave: "Links", valor: "https://www.instagram.com/cd.enriquecaxnajoyt/\nhttps://www.facebook.com/EnriqueCirujanoDentista/\nhttps://www.doctoralia.com.mx/enrique-caxnajoy/dentista-odontologo/huixquilucan\nhttps://buscodentista.com.mx/estado-de-mexico/huixquilucan/cirujano-dentista-dr-enrique-caxnajoy/" }
    ]
  },
  {
    id: "P-004",
    nombre: "Taller Mecánico Automotriz García",
    empresa: "Taller mecánico / Servicio técnico",
    telefono: "",
    correo: "",
    estado: "Prospecto",
    responsableId: "m-sebas-03",
    ultimoContacto: "2026-07-01T09:00:00.000Z",
    createdAt: "2026-07-01T08:30:00.000Z",
    valorEstimado: 16000,
    prioridad: "Alta",
    fechaSeguimiento: "2026-07-02",
    proximaAccion: "Buscar ficha exacta en Maps, revisar reseñas, flujo de autos, zona e instalaciones",
    camposPersonalizados: [
      { clave: "Dirección", valor: "Dirección por buscar en Google Maps" },
      { clave: "Redes / Fuentes", valor: "Google Maps, Facebook, WhatsApp, fotos de fachada, reseñas" },
      { clave: "Dolor real", valor: "Cotizaciones desordenadas, diagnóstico, fotos de falla, solicitudes por WhatsApp" },
      { clave: "Oferta sugerida", valor: "Formulario de diagnóstico + cotizador por WhatsApp + servicios + ubicación + seguimiento" },
      { clave: "Paquete objetivo", valor: "Cotizador + WhatsApp" },
      { clave: "Mantenimiento sugerido", valor: "$1,500–$2,000/mes" },
      { clave: "Criterio ROI", valor: "Giro con dolor operativo real y ticket potencialmente alto; mejor que barbería/costuras" }
    ]
  },
  {
    id: "P-005",
    nombre: "La Tradición",
    empresa: "Panadería / Cafetería",
    telefono: "",
    correo: "",
    estado: "Prospecto",
    responsableId: "m-centeno-02",
    ultimoContacto: "2026-07-01T09:00:00.000Z",
    createdAt: "2026-07-01T08:30:00.000Z",
    valorEstimado: 10500,
    prioridad: "Media",
    fechaSeguimiento: "2026-07-02",
    proximaAccion: "Validar teléfono, productos más vendidos, si reciben pedidos y fotos reales",
    camposPersonalizados: [
      { clave: "Dirección", valor: "Lic. Primo de Verdad 21, San Martín, 52760 Huixquilucan de Degollado, Méx." },
      { clave: "Redes / Fuentes", valor: "Google Maps, Instagram @panalatradicion, Facebook" },
      { clave: "Dolor real", valor: "Menú visible, pedidos por WhatsApp, productos del día, QR en local" },
      { clave: "Oferta sugerida", valor: "Menú digital QR + productos + promociones + WhatsApp + ubicación" },
      { clave: "Paquete objetivo", valor: "Menú QR + WhatsApp" },
      { clave: "Mantenimiento sugerido", valor: "$1,000–$1,500/mes" },
      { clave: "Criterio ROI", valor: "Funciona si se vende como menú QR útil dentro del local, no como web genérica" },
      { clave: "Links", valor: "https://www.instagram.com/panalatradicion/\nhttps://www.facebook.com/panalatradicion/" }
    ]
  },
  {
    id: "P-006",
    nombre: "Skin Store",
    empresa: "Tienda de skincare / cosmética",
    telefono: "",
    correo: "",
    estado: "Prospecto",
    responsableId: "m-sebas-03",
    ultimoContacto: "2026-07-01T09:00:00.000Z",
    createdAt: "2026-07-01T08:30:00.000Z",
    valorEstimado: 11500,
    prioridad: "Media",
    fechaSeguimiento: "2026-07-02",
    proximaAccion: "Buscar redes, revisar catálogo real, nivel de inventario y frecuencia de publicaciones",
    camposPersonalizados: [
      { clave: "Dirección", valor: "Dirección por validar" },
      { clave: "Redes / Fuentes", valor: "Instagram, Facebook, Google Maps, catálogo actual si existe" },
      { clave: "Dolor real", valor: "Catálogo, existencias, combos, pedidos por WhatsApp, preguntas frecuentes" },
      { clave: "Oferta sugerida", valor: "Catálogo visual + pedidos por WhatsApp + promociones + filtros por necesidad" },
      { clave: "Paquete objetivo", valor: "Catálogo + WhatsApp" },
      { clave: "Mantenimiento sugerido", valor: "$1,000–$1,500/mes" },
      { clave: "Criterio ROI", valor: "Puede servir si vende varios productos y tiene flujo/pedidos; si es pequeño se pausa" }
    ]
  },
  {
    id: "P-007",
    nombre: "Servicio Palo Solo",
    empresa: "Servicio local / Giro por validar",
    telefono: "",
    correo: "",
    estado: "Prospecto",
    responsableId: "m-sebas-03",
    ultimoContacto: "2026-07-01T09:00:00.000Z",
    createdAt: "2026-07-01T08:30:00.000Z",
    valorEstimado: 12500,
    prioridad: "Baja",
    fechaSeguimiento: "2026-07-02",
    proximaAccion: "Confirmar qué servicio es, ticket promedio, zona y flujo de clientes",
    camposPersonalizados: [
      { clave: "Dirección", valor: "Palo Solo, Huixquilucan · dirección exacta por validar" },
      { clave: "Redes / Fuentes", valor: "Google Maps, Facebook, reseñas, fotos de fachada" },
      { clave: "Dolor real", valor: "Depende del giro: cotización, servicio técnico, solicitudes, ubicación" },
      { clave: "Oferta sugerida", valor: "Por definir según giro: captación + WhatsApp + cotización" },
      { clave: "Paquete objetivo", valor: "Por definir" },
      { clave: "Mantenimiento sugerido", valor: "Por definir" },
      { clave: "Criterio ROI", valor: "No se puede calificar sin giro exacto; mantener solo si resuelve cotizaciones/servicios" }
    ]
  },
  {
    id: "P-008",
    nombre: "K Centro Estético Integral & Spa",
    empresa: "Centro estético / Spa",
    telefono: "",
    correo: "",
    estado: "Prospecto",
    responsableId: "m-kevin-04",
    ultimoContacto: "2026-07-01T09:00:00.000Z",
    createdAt: "2026-07-01T08:30:00.000Z",
    valorEstimado: 12500,
    prioridad: "Media",
    fechaSeguimiento: "2026-07-02",
    proximaAccion: "Validar si maneja tratamientos caros, flujo de citas, WhatsApp activo y redes",
    camposPersonalizados: [
      { clave: "Dirección", valor: "Acueducto Lerma 2-mz 002, MZ 002, 52793 San Bartolomé Coatepec, Méx." },
      { clave: "Redes / Fuentes", valor: "Google Maps, Facebook, Instagram @k_centroesteticoyspa, Cybo" },
      { clave: "Dolor real", valor: "Servicios múltiples, agenda, promociones, confianza, tratamientos" },
      { clave: "Oferta sugerida", valor: "Landing spa + catálogo de tratamientos + agenda WhatsApp + promociones" },
      { clave: "Paquete objetivo", valor: "Dental/Estética Captación + Agenda" },
      { clave: "Mantenimiento sugerido", valor: "$1,000–$2,000/mes" },
      { clave: "Criterio ROI", valor: "Solo vale si hay servicios de ticket alto o muchos tratamientos; si solo estética básica se pausa" },
      { clave: "Links", valor: "https://www.instagram.com/k_centroesteticoyspa/\nhttps://www.facebook.com/kcentroestetico/" }
    ]
  },
  {
    id: "P-009",
    nombre: "Hub Gaming / posible HuixquiGames",
    empresa: "Gaming hub / entretenimiento",
    telefono: "",
    correo: "",
    estado: "Prospecto",
    responsableId: "m-alberto-01",
    ultimoContacto: "2026-07-01T09:00:00.000Z",
    createdAt: "2026-07-01T08:30:00.000Z",
    valorEstimado: 12500,
    prioridad: "Media",
    fechaSeguimiento: "2026-07-02",
    proximaAccion: "Validar nombre exacto, máquinas, torneos, membresías, flujo de jóvenes y ubicación",
    camposPersonalizados: [
      { clave: "Dirección", valor: "Huixquilucan Centro · local por validar" },
      { clave: "Redes / Fuentes", valor: "Google Maps, Facebook, Instagram, TikTok, comunidad/eventos" },
      { clave: "Dolor real", valor: "Reservas, torneos, membresías, calendario, comunidad" },
      { clave: "Oferta sugerida", valor: "Landing + reservas + torneos + membresías + WhatsApp" },
      { clave: "Paquete objetivo", valor: "Sistema de Reservas Ligero" },
      { clave: "Mantenimiento sugerido", valor: "$1,000–$2,000/mes" },
      { clave: "Criterio ROI", valor: "Puede servir si hay comunidad/eventos; si solo renta pequeña, no priorizar" }
    ]
  },
  {
    id: "P-010",
    nombre: "Studio By Diane",
    empresa: "Estudio de belleza / uñas",
    telefono: "",
    correo: "",
    estado: "Prospecto",
    responsableId: "m-kevin-04",
    ultimoContacto: "2026-07-01T09:00:00.000Z",
    createdAt: "2026-07-01T08:30:00.000Z",
    valorEstimado: 11500,
    prioridad: "Media",
    fechaSeguimiento: "2026-07-02",
    proximaAccion: "Validar contacto, capacidad de pago, flujo, ticket de servicios y fotos reales",
    camposPersonalizados: [
      { clave: "Dirección", valor: "Huixquilucan, Estado de México · ubicación exacta por confirmar" },
      { clave: "Redes / Fuentes", valor: "Redes por validar, demo Antigravity lista" },
      { clave: "Dolor real", valor: "Agenda, presentación premium, servicios, WhatsApp, galería" },
      { clave: "Oferta sugerida", valor: "Landing premium + agenda WhatsApp + catálogo de servicios" },
      { clave: "Paquete objetivo", valor: "Captación + Agenda" },
      { clave: "Mantenimiento sugerido", valor: "$1,000–$1,500/mes" },
      { clave: "Criterio ROI", valor: "Sirve como demo de portafolio; no priorizar si el flujo/ticket no justifica" }
    ]
  },
  {
    id: "P-011",
    nombre: "Estética Antony",
    empresa: "Estética / belleza",
    telefono: "",
    correo: "",
    estado: "Prospecto",
    responsableId: "m-sebas-03",
    ultimoContacto: "2026-07-01T09:00:00.000Z",
    createdAt: "2026-07-01T08:30:00.000Z",
    valorEstimado: 9500,
    prioridad: "Baja",
    fechaSeguimiento: "2026-07-02",
    proximaAccion: "Validar si realmente tiene flujo, servicios caros o presencia débil con demanda",
    camposPersonalizados: [
      { clave: "Dirección", valor: "Dirección por validar" },
      { clave: "Redes / Fuentes", valor: "Google Maps, Facebook, Instagram, WhatsApp" },
      { clave: "Dolor real", valor: "Agenda y servicios solo si tiene flujo o tratamientos caros" },
      { clave: "Oferta sugerida", valor: "Landing + agenda WhatsApp solo si califica" },
      { clave: "Paquete objetivo", valor: "Por definir" },
      { clave: "Criterio ROI", valor: "No priorizar; estética común puede no ver ROI" }
    ]
  }
];

export const NOTAS_INICIALES = [
  {
    id: "n-01",
    clienteId: "P-001",
    autorId: "m-kevin-04",
    contenido: "Clínica Dental Advance identificada como Prospecto Prioritario A. Se revisó Doctoralia y Google Maps; no cuentan con un sitio web moderno que facilite agendación directa.",
    createdAt: "2026-07-01T09:00:00.000Z"
  },
  {
    id: "n-02",
    clienteId: "P-002",
    autorId: "m-sebas-03",
    contenido: "Revisando redes de Leal Dental. Dra. Leticia Campa tiene presencia activa en Instagram, pero las citas se gestionan de forma totalmente manual. Ideal para proponer Dental Captación + Agenda.",
    createdAt: "2026-07-01T10:15:00.000Z"
  }
];

// Sprint Operativo Real
export const SPRINTS_INICIALES = [
  {
    id: "spr-01",
    nombre: "Sprint 1: Cierre Comercial ASCK",
    fechaInicio: "2026-07-01",
    fechaFin: "2026-07-06",
    objetivo: "Registrar y priorizar 14 prospectos, contactar el top 5, construir demos funcionales de Dental y Finanzas, y concretar de 3 a 4 cierres económicos.",
    responsableId: "m-kevin-04",
    estado: "Activo",
    createdAt: "2026-07-01T08:00:00.000Z"
  }
];

// Tareas Operativas del Plan Operativo (Día 1 a Día 6)
export const TAREAS_INICIALES = [
  // Miércoles (Día 1)
  {
    id: "k1",
    sprintId: "spr-01",
    clienteId: null,
    asignadoA: "m-kevin-04",
    titulo: "Clasificar 14 prospectos A/B/C y elegir top 5",
    completada: false,
    estado: "Pendiente",
    prioridad: "Alta",
    fechaLimite: "2026-07-01",
    horaLimite: "12:00",
    duracionEstimada: "6 horas"
  },
  {
    id: "a1",
    sprintId: "spr-01",
    clienteId: null,
    asignadoA: "m-alberto-01",
    titulo: "Estructura técnica del CRM web (rutas, modelo base)",
    completada: false,
    estado: "Pendiente",
    prioridad: "Media",
    fechaLimite: "2026-07-01",
    horaLimite: "15:00",
    duracionEstimada: "5 horas"
  },
  {
    id: "s1",
    sprintId: "spr-01",
    clienteId: null,
    asignadoA: "m-sebas-03",
    titulo: "Registrar 14 prospectos iniciales en CRM",
    completada: false,
    estado: "Pendiente",
    prioridad: "Media",
    fechaLimite: "2026-07-01",
    horaLimite: "14:00",
    duracionEstimada: "5 horas"
  },
  {
    id: "c1",
    sprintId: "spr-01",
    clienteId: null,
    asignadoA: "m-centeno-02",
    titulo: "Rescatar Dental Printal y Finanzas (carpetas ubicadas)",
    completada: false,
    estado: "Pendiente",
    prioridad: "Media",
    fechaLimite: "2026-07-01",
    horaLimite: "17:00",
    duracionEstimada: "7 horas"
  },
  
  // Jueves (Día 2)
  {
    id: "k2",
    sprintId: "spr-01",
    clienteId: null,
    asignadoA: "m-kevin-04",
    titulo: "Contactar directamente al top 5 priorizado",
    completada: false,
    estado: "Pendiente",
    prioridad: "Alta",
    fechaLimite: "2026-07-02",
    horaLimite: "13:00",
    duracionEstimada: "9 horas"
  },
  {
    id: "a2",
    sprintId: "spr-01",
    clienteId: null,
    asignadoA: "m-alberto-01",
    titulo: "CRM web simple: paneles funcionales, tareas y estados",
    completada: false,
    estado: "Pendiente",
    prioridad: "Media",
    fechaLimite: "2026-07-02",
    horaLimite: "18:00",
    duracionEstimada: "8 horas"
  },
  {
    id: "s2",
    sprintId: "spr-01",
    clienteId: null,
    asignadoA: "m-sebas-03",
    titulo: "Buscar datos de contacto y mandar primer WhatsApp/IG",
    completada: false,
    estado: "Pendiente",
    prioridad: "Media",
    fechaLimite: "2026-07-02",
    horaLimite: "12:00",
    duracionEstimada: "7 horas"
  },
  {
    id: "c2",
    sprintId: "spr-01",
    clienteId: "P-001",
    asignadoA: "m-centeno-02",
    titulo: "Diseño de página genérica Dental Printal (demo limpia)",
    completada: false,
    estado: "Pendiente",
    prioridad: "Alta",
    fechaLimite: "2026-07-02",
    horaLimite: "16:00",
    duracionEstimada: "10 horas"
  },

  // Viernes (Día 3)
  {
    id: "k3",
    sprintId: "spr-01",
    clienteId: null,
    asignadoA: "m-kevin-04",
    titulo: "Llamadas de demostración de software y cotizaciones",
    completada: false,
    estado: "Pendiente",
    prioridad: "Alta",
    fechaLimite: "2026-07-03",
    horaLimite: "14:00",
    duracionEstimada: "10 horas"
  },
  {
    id: "a3",
    sprintId: "spr-01",
    clienteId: null,
    asignadoA: "m-alberto-01",
    titulo: "Guía técnica Telegram + AGY + Codex + BotFather",
    completada: false,
    estado: "Pendiente",
    prioridad: "Media",
    fechaLimite: "2026-07-03",
    horaLimite: "17:00",
    duracionEstimada: "8 horas"
  },
  {
    id: "s3",
    sprintId: "spr-01",
    clienteId: null,
    asignadoA: "m-sebas-03",
    titulo: "Seguimiento y calificación de leads (frío/tibio/caliente)",
    completada: false,
    estado: "Pendiente",
    prioridad: "Media",
    fechaLimite: "2026-07-03",
    horaLimite: "13:00",
    duracionEstimada: "8 horas"
  },
  {
    id: "c3",
    sprintId: "spr-01",
    clienteId: null,
    asignadoA: "m-centeno-02",
    titulo: "Rediseño de página de Finanzas (adaptable/responsive)",
    completada: false,
    estado: "Pendiente",
    prioridad: "Alta",
    fechaLimite: "2026-07-03",
    horaLimite: "16:00",
    duracionEstimada: "10 horas"
  },

  // Sábado (Día 4)
  {
    id: "k4",
    sprintId: "spr-01",
    clienteId: null,
    asignadoA: "m-kevin-04",
    titulo: "Negociación de cierres de venta, anticipos y objeciones",
    completada: false,
    estado: "Pendiente",
    prioridad: "Alta",
    fechaLimite: "2026-07-04",
    horaLimite: "15:00",
    duracionEstimada: "10 horas"
  },
  {
    id: "a4",
    sprintId: "spr-01",
    clienteId: null,
    asignadoA: "m-alberto-01",
    titulo: "Pruebas integrales del CRM, depuración y deploy local",
    completada: false,
    estado: "Pendiente",
    prioridad: "Media",
    fechaLimite: "2026-07-04",
    horaLimite: "17:00",
    duracionEstimada: "7 horas"
  },
  {
    id: "s4",
    sprintId: "spr-01",
    clienteId: null,
    asignadoA: "m-sebas-03",
    titulo: "Agendar llamadas de interesados confirmados con Kevin",
    completada: false,
    estado: "Pendiente",
    prioridad: "Media",
    fechaLimite: "2026-07-04",
    horaLimite: "13:00",
    duracionEstimada: "7 horas"
  },
  {
    id: "c4",
    sprintId: "spr-01",
    clienteId: null,
    asignadoA: "m-centeno-02",
    titulo: "HTML/landing de ventas y documentación visual comercial",
    completada: false,
    estado: "Pendiente",
    prioridad: "Alta",
    fechaLimite: "2026-07-04",
    horaLimite: "16:00",
    duracionEstimada: "10 horas"
  },

  // Domingo (Día 5)
  {
    id: "k5",
    sprintId: "spr-01",
    clienteId: null,
    asignadoA: "m-kevin-04",
    titulo: "Revisión final y toma de decisiones comerciales clave",
    completada: false,
    estado: "Pendiente",
    prioridad: "Media",
    fechaLimite: "2026-07-05",
    horaLimite: "14:00",
    duracionEstimada: "8 hours"
  },
  {
    id: "a5",
    sprintId: "spr-01",
    clienteId: null,
    asignadoA: "m-alberto-01",
    titulo: "Filtrar y recopilar cursos útiles de negocios gratis",
    completada: false,
    estado: "Pendiente",
    prioridad: "Baja",
    fechaLimite: "2026-07-05",
    horaLimite: "16:00",
    duracionEstimada: "5 horas"
  },
  {
    id: "s5",
    sprintId: "spr-01",
    clienteId: null,
    asignadoA: "m-sebas-03",
    titulo: "Escribir bitácora de evidencias y objeciones en CRM",
    completada: false,
    estado: "Pendiente",
    prioridad: "Baja",
    fechaLimite: "2026-07-05",
    horaLimite: "13:00",
    duracionEstimada: "5 horas"
  },
  {
    id: "c5",
    sprintId: "spr-01",
    clienteId: null,
    asignadoA: "m-centeno-02",
    titulo: "Separar WhatsApp pendientes y ordenar documentación",
    completada: false,
    estado: "Pendiente",
    prioridad: "Media",
    fechaLimite: "2026-07-05",
    horaLimite: "17:00",
    duracionEstimada: "8 horas"
  },

  // Lunes (Cierre)
  {
    id: "k6",
    sprintId: "spr-01",
    clienteId: null,
    asignadoA: "m-kevin-04",
    titulo: "Cierre comercial final y planeación de siguientes pasos",
    completada: false,
    estado: "Pendiente",
    prioridad: "Alta",
    fechaLimite: "2026-07-06",
    horaLimite: "16:00",
    duracionEstimada: "9 horas"
  },
  {
    id: "a6",
    sprintId: "spr-01",
    clienteId: null,
    asignadoA: "m-alberto-01",
    titulo: "Soporte final técnico y resolución de bugs rápidos",
    completada: false,
    estado: "Pendiente",
    prioridad: "Alta",
    fechaLimite: "2026-07-06",
    horaLimite: "14:00",
    duracionEstimada: "3 horas"
  },
  {
    id: "s6",
    sprintId: "spr-01",
    clienteId: null,
    asignadoA: "m-sebas-03",
    titulo: "Elaborar reporte final de prospectos y calificación",
    completada: false,
    estado: "Pendiente",
    prioridad: "Media",
    fechaLimite: "2026-07-06",
    horaLimite: "13:00",
    duracionEstimada: "4 horas"
  },
  {
    id: "c6",
    sprintId: "spr-01",
    clienteId: null,
    asignadoA: "m-centeno-02",
    titulo: "Pulido visual final de demos y capturas para venta",
    completada: false,
    estado: "Pendiente",
    prioridad: "Media",
    fechaLimite: "2026-07-06",
    horaLimite: "17:00",
    duracionEstimada: "7 horas"
  }
];

export const ACTIVIDADES_INICIALES = [
  {
    id: "act-01",
    autorId: "m-sebas-03",
    clienteId: "P-001",
    accion: "Registró 11 prospectos reales de la hoja de cálculo comercial",
    createdAt: "2026-07-01T08:30:00.000Z"
  },
  {
    id: "act-02",
    autorId: "m-kevin-04",
    clienteId: "P-001",
    accion: "Agregó nota de análisis comercial prioritario para",
    createdAt: "2026-07-01T09:00:00.000Z"
  },
  {
    id: "act-03",
    autorId: "m-alberto-01",
    clienteId: null,
    accion: "Inicializó la base de datos v1.8 con el plan operativo",
    createdAt: "2026-07-01T09:10:00.000Z"
  }
];

// Rejilla de eventos de la agenda (Día 1 a Día 6)
export const AGENDA_INICIAL = [
  // Miércoles (Día 1)
  {
    id: "ag-k1",
    titulo: "Kevin: Clasificación de prospectos A/B/C",
    tipo: "Reunión",
    clienteId: null,
    responsableId: "m-kevin-04",
    fecha: "2026-07-01",
    horaInicio: "09:00",
    horaFin: "12:00",
    prioridad: "Alta",
    estado: "Pendiente",
    notas: "Elegir top 5 prospectos principales y definir oferta base"
  },
  {
    id: "ag-s1",
    titulo: "Sebas: Registro de prospectos en CRM",
    tipo: "Tarea",
    clienteId: null,
    responsableId: "m-sebas-03",
    fecha: "2026-07-01",
    horaInicio: "10:00",
    horaFin: "13:00",
    prioridad: "Media",
    estado: "Pendiente",
    notas: "Cargar Nombre, Giro, Prioridad y Acción inmediata"
  },
  {
    id: "ag-a1",
    titulo: "Alberto: Estructura técnica del CRM web",
    tipo: "Tarea",
    clienteId: null,
    responsableId: "m-alberto-01",
    fecha: "2026-07-01",
    horaInicio: "12:00",
    horaFin: "15:00",
    prioridad: "Media",
    estado: "Pendiente",
    notes: "Estructurar rutas, modelo base y campos de base local"
  },
  
  // Jueves (Día 2)
  {
    id: "ag-k2",
    titulo: "Kevin: Mensajes directos al top 5",
    tipo: "Seguimiento",
    clienteId: null,
    responsableId: "m-kevin-04",
    fecha: "2026-07-02",
    horaInicio: "11:00",
    horaFin: "14:00",
    prioridad: "Alta",
    estado: "Pendiente",
    notas: "Intentar concretar citas rápidas para demos"
  },
  {
    id: "ag-c2",
    titulo: "Centeno: Preparar demo Dental Printal genérica",
    tipo: "Tarea",
    clienteId: "P-001",
    responsableId: "m-centeno-02",
    fecha: "2026-07-02",
    horaInicio: "14:00",
    horaFin: "17:00",
    prioridad: "Alta",
    estado: "Pendiente",
    notas: "Demo limpia de marca para clínicas dentales"
  }
];
