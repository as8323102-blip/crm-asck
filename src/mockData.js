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
    "id": "P-master-100",
    "nombre": "Clínica Dental Advance",
    "empresa": "Dental / Clínica",
    "telefono": "+52 55 8284 2288",
    "correo": "",
    "estado": "Prospecto",
    "responsableId": "m-sebas-03",
    "ultimoContacto": "2026-07-16T05:38:06.056Z",
    "createdAt": "2026-07-16T05:38:06.056Z",
    "valorEstimado": 23250,
    "prioridad": "Alta",
    "fechaSeguimiento": "2026-07-16",
    "proximaAccion": "CONTACTAR YA",
    "camposPersonalizados": [
      {
        "clave": "Dirección",
        "valor": "San Melchor, Huixquilucan Centro"
      },
      {
        "clave": "Redes / Fuentes",
        "valor": "Sin web; FB DentalAdvanceMX, IG @dentaladvancemx, Doctoralia, BuscoDentista"
      },
      {
        "clave": "Dolor real",
        "valor": "Depende de Facebook y llamadas; sin agenda propia; captación y confianza"
      },
      {
        "clave": "Criterio ROI",
        "valor": "VERIFICADO 2026-07-13 en vivo: Maps abierto, 4.6 (44 reseñas), tel Maps=Excel. Sin web propia; FB activo, IG existe (fechas tras login). Sin Doctoralia localizable para ESTA sucursal. OJO reputación: 2 reseñas mencionan \"negligencia\"; queja en FB de respuesta tardía en inbox (\"me contestó muy tarde, ya fui a San Bartolo\"). WhatsApp 229-134-2083 en post FB de 2021 = dato viejo, no conflicto."
      },
      {
        "clave": "Fuente original",
        "valor": "CRM limpio (ASCK_CRM_PROSPECTOS_LIMPIO_NUEVO.xlsx) P-001 + Auditoría 54 negocios (Auditoria_ASCK_54_negocios.xlsx) #1 + Clasificatoria (9_CLASIFICATORIA_PROSPECTOS.xlsx) S-03 + Indexados verificación (prospectos_asck_indexados_3_nuevos.csv)"
      },
      {
        "clave": "Veredicto",
        "valor": "CONTACTAR YA"
      }
    ]
  },
  {
    "id": "P-master-101",
    "nombre": "Dr. Enrique Caxnajoy",
    "empresa": "Dental / Doctor individual",
    "telefono": "+52 55 6069 4296",
    "correo": "",
    "estado": "Prospecto",
    "responsableId": "m-sebas-03",
    "ultimoContacto": "2026-07-16T05:38:06.056Z",
    "createdAt": "2026-07-16T05:38:06.056Z",
    "valorEstimado": 17000,
    "prioridad": "Alta",
    "fechaSeguimiento": "2026-07-16",
    "proximaAccion": "CONTACTAR YA",
    "camposPersonalizados": [
      {
        "clave": "Dirección",
        "valor": "San Juan Bautista, Huixquilucan"
      },
      {
        "clave": "Redes / Fuentes",
        "valor": "Sin web; IG @cd.enriquecaxnajoyt, FB, Doctoralia"
      },
      {
        "clave": "Dolor real",
        "valor": "Agenda 100% telefónica manual; marca personal sin landing; rating 4.9 real"
      },
      {
        "clave": "Criterio ROI",
        "valor": "VERIFICADO 2026-07-13 en vivo: Maps operando (horario partido, cierra 7pm), 4.9 (186 reseñas) REAL, tel Maps=Excel. Sin web (Maps pide \"añadir sitio web\"). Doctoralia existe (céd. 3865123) pero reserva online INACTIVA: \"no ofrece reserva online\" → agenda telefónica confirmada."
      },
      {
        "clave": "Fuente original",
        "valor": "CRM limpio (ASCK_CRM_PROSPECTOS_LIMPIO_NUEVO.xlsx) P-003 + Auditoría 54 negocios (Auditoria_ASCK_54_negocios.xlsx) #3 + Clasificatoria (9_CLASIFICATORIA_PROSPECTOS.xlsx) S-05 + Indexados verificación (prospectos_asck_indexados_3_nuevos.csv)"
      },
      {
        "clave": "Veredicto",
        "valor": "CONTACTAR YA"
      }
    ]
  },
  {
    "id": "P-master-102",
    "nombre": "Leal Dental / Dra. Leticia Campa",
    "empresa": "Dental / Clínica-reputación",
    "telefono": "+52 55 7891 4561",
    "correo": "",
    "estado": "Prospecto",
    "responsableId": "m-sebas-03",
    "ultimoContacto": "2026-07-16T05:38:06.056Z",
    "createdAt": "2026-07-16T05:38:06.056Z",
    "valorEstimado": 20500,
    "prioridad": "Alta",
    "fechaSeguimiento": "2026-07-16",
    "proximaAccion": "CONTACTAR YA",
    "camposPersonalizados": [
      {
        "clave": "Dirección",
        "valor": "Palo Solo, Huixquilucan (CRM) vs La Herradura (Aud.54)"
      },
      {
        "clave": "Redes / Fuentes",
        "valor": "Sin web; IG @lealdentalletycampa, FB, BuscoDentista"
      },
      {
        "clave": "Dolor real",
        "valor": "Marca personal solo en redes; reputación y tratamientos de alto valor sin captación"
      },
      {
        "clave": "Criterio ROI",
        "valor": "VERIFICADO 2026-07-13 en vivo: Maps abierto, 5.0 (86 reseñas), tel Maps=Excel. ZONA RESUELTA: Av. Palo Solo, Federal Burocrática (gana CRM; \"La Herradura\" de Aud.54 era incorrecto). \"Sitio web\" de Maps = perfil PERSONAL de Facebook, no página de negocio. IG @lealdentalletycampa casi vacío (8 posts, 42 seguidores). | [AUD 2026-07-13] Aclarar relación entre las dos \"Leal Dental\" antes del pitch"
      },
      {
        "clave": "Fuente original",
        "valor": "CRM limpio (ASCK_CRM_PROSPECTOS_LIMPIO_NUEVO.xlsx) P-002 + Auditoría 54 negocios (Auditoria_ASCK_54_negocios.xlsx) #45 + Clasificatoria (9_CLASIFICATORIA_PROSPECTOS.xlsx) S-04 + Indexados verificación (prospectos_asck_indexados_3_nuevos.csv)"
      },
      {
        "clave": "Veredicto",
        "valor": "CONTACTAR YA"
      }
    ]
  },
  {
    "id": "P-master-103",
    "nombre": "OneFeet (tenis y gorras, vía Val)",
    "empresa": "Retail / Tenis y gorras",
    "telefono": "Vía Val (por llenar)",
    "correo": "",
    "estado": "Prospecto",
    "responsableId": "m-sebas-03",
    "ultimoContacto": "2026-07-16T05:38:06.056Z",
    "createdAt": "2026-07-16T05:38:06.056Z",
    "valorEstimado": 0,
    "prioridad": "Alta",
    "fechaSeguimiento": "2026-07-16",
    "proximaAccion": "REVISAR KEVIN",
    "camposPersonalizados": [
      {
        "clave": "Dirección",
        "valor": "Huixquilucan"
      },
      {
        "clave": "Redes / Fuentes",
        "valor": "Por validar"
      },
      {
        "clave": "Dolor real",
        "valor": "Sin catálogo digital ni pedidos ordenados por WhatsApp; demo catálogo LISTA"
      },
      {
        "clave": "Criterio ROI",
        "valor": "Visita planeada 12-jul según clasificatoria | [AUD 2026-07-13] Preguntar a Val el estatus real antes de invertir en demo"
      },
      {
        "clave": "Fuente original",
        "valor": "Clasificatoria (9_CLASIFICATORIA_PROSPECTOS.xlsx) S-01"
      },
      {
        "clave": "Veredicto",
        "valor": "REVISAR KEVIN"
      }
    ]
  },
  {
    "id": "P-master-104",
    "nombre": "César (odontólogo) — cliente actual",
    "empresa": "Dental",
    "telefono": "Kevin lo tiene",
    "correo": "",
    "estado": "Prospecto",
    "responsableId": "m-sebas-03",
    "ultimoContacto": "2026-07-16T05:38:06.056Z",
    "createdAt": "2026-07-16T05:38:06.056Z",
    "valorEstimado": 24000,
    "prioridad": "Alta",
    "fechaSeguimiento": "2026-07-16",
    "proximaAccion": "CONTACTAR YA",
    "camposPersonalizados": [
      {
        "clave": "Dirección",
        "valor": "Por confirmar"
      },
      {
        "clave": "Redes / Fuentes",
        "valor": "—"
      },
      {
        "clave": "Dolor real",
        "valor": "Cliente actual: upsell Clínica Pro + mantenimiento + testimonio/referidos"
      },
      {
        "clave": "Criterio ROI",
        "valor": "No es prospecto frío; es upsell | [AUD 2026-07-13] Cliente actual, no se auditó (no aplica)"
      },
      {
        "clave": "Fuente original",
        "valor": "Clasificatoria (9_CLASIFICATORIA_PROSPECTOS.xlsx) S-02 + Tier list (4_TIER_LIST_PROSPECTOS.md)"
      },
      {
        "clave": "Veredicto",
        "valor": "CONTACTAR YA"
      }
    ]
  },
  {
    "id": "P-master-105",
    "nombre": "Taller Mecánico Automotriz García",
    "empresa": "Taller mecánico familiar",
    "telefono": "+52 55 5068 3714",
    "correo": "",
    "estado": "Prospecto",
    "responsableId": "m-sebas-03",
    "ultimoContacto": "2026-07-16T05:38:06.056Z",
    "createdAt": "2026-07-16T05:38:06.056Z",
    "valorEstimado": 14000,
    "prioridad": "Alta",
    "fechaSeguimiento": "2026-07-16",
    "proximaAccion": "LOTE 2",
    "camposPersonalizados": [
      {
        "clave": "Dirección",
        "valor": "Palo Solo"
      },
      {
        "clave": "Redes / Fuentes",
        "valor": "Sin web; directorios mecánicos"
      },
      {
        "clave": "Dolor real",
        "valor": "Cotizaciones desordenadas; buena reputación técnica sin respaldo digital"
      },
      {
        "clave": "Criterio ROI",
        "valor": ""
      },
      {
        "clave": "Fuente original",
        "valor": "CRM limpio (ASCK_CRM_PROSPECTOS_LIMPIO_NUEVO.xlsx) P-004 + Auditoría 54 negocios (Auditoria_ASCK_54_negocios.xlsx) #26 + Clasificatoria (9_CLASIFICATORIA_PROSPECTOS.xlsx) A-11 + Indexados verificación (prospectos_asck_indexados_3_nuevos.csv) (tel: Sí)"
      },
      {
        "clave": "Veredicto",
        "valor": "LOTE 2"
      }
    ]
  },
  {
    "id": "P-master-106",
    "nombre": "La Tradición",
    "empresa": "Panadería / Cafetería",
    "telefono": "+52 55 8284 1488 (según captura)",
    "correo": "",
    "estado": "Prospecto",
    "responsableId": "m-sebas-03",
    "ultimoContacto": "2026-07-16T05:38:06.056Z",
    "createdAt": "2026-07-16T05:38:06.056Z",
    "valorEstimado": 0,
    "prioridad": "Alta",
    "fechaSeguimiento": "2026-07-16",
    "proximaAccion": "CONTACTAR YA",
    "camposPersonalizados": [
      {
        "clave": "Dirección",
        "valor": "Lic. Primo de Verdad 21, San Martín, Huixquilucan"
      },
      {
        "clave": "Redes / Fuentes",
        "valor": "Sin web; IG/FB @panalatradicion"
      },
      {
        "clave": "Dolor real",
        "valor": "Menú no visible, pedidos por WhatsApp, QR en local; demo QR en curso"
      },
      {
        "clave": "Criterio ROI",
        "valor": "VERIFICAR teléfono al marcar (fuente: captura) | [AUD 2026-07-13] Demo catálogo/carta + pedidos WhatsApp"
      },
      {
        "clave": "Fuente original",
        "valor": "CRM limpio (ASCK_CRM_PROSPECTOS_LIMPIO_NUEVO.xlsx) P-005 + Clasificatoria (9_CLASIFICATORIA_PROSPECTOS.xlsx) A-12 + Indexados verificación (prospectos_asck_indexados_3_nuevos.csv)"
      },
      {
        "clave": "Veredicto",
        "valor": "CONTACTAR YA"
      }
    ]
  },
  {
    "id": "P-master-107",
    "nombre": "Cle@n Pro",
    "empresa": "Estética automotriz premium",
    "telefono": "+52 55 4965 7817",
    "correo": "",
    "estado": "Prospecto",
    "responsableId": "m-sebas-03",
    "ultimoContacto": "2026-07-16T05:38:06.056Z",
    "createdAt": "2026-07-16T05:38:06.056Z",
    "valorEstimado": 0,
    "prioridad": "Alta",
    "fechaSeguimiento": "2026-07-16",
    "proximaAccion": "MADURAR",
    "camposPersonalizados": [
      {
        "clave": "Dirección",
        "valor": "Lomas Country Club, Interlomas"
      },
      {
        "clave": "Redes / Fuentes",
        "valor": "Sin web; redes débiles"
      },
      {
        "clave": "Dolor real",
        "valor": "Sin web ni sistema de citas; ticket alto, flujo alto"
      },
      {
        "clave": "Criterio ROI",
        "valor": "Tier list 07-11 lo bajó a B; clasificatoria 07-12 lo subió a A (decisión más reciente)"
      },
      {
        "clave": "Fuente original",
        "valor": "PDF investigación automotriz Gemini (Downloads) #1 + Ranking scoring (table(2).csv) #1 (score 8.7 S) + Clasificatoria (9_CLASIFICATORIA_PROSPECTOS.xlsx) A-01"
      },
      {
        "clave": "Veredicto",
        "valor": "MADURAR"
      }
    ]
  },
  {
    "id": "P-master-108",
    "nombre": "Auto Garage Inter Wrap",
    "empresa": "Wrap, PPF y personalización",
    "telefono": "+52 55 3175 6034",
    "correo": "",
    "estado": "Prospecto",
    "responsableId": "m-sebas-03",
    "ultimoContacto": "2026-07-16T05:38:06.056Z",
    "createdAt": "2026-07-16T05:38:06.056Z",
    "valorEstimado": 0,
    "prioridad": "Alta",
    "fechaSeguimiento": "2026-07-16",
    "proximaAccion": "LOTE 2",
    "camposPersonalizados": [
      {
        "clave": "Dirección",
        "valor": "Palo Solo, Interlomas"
      },
      {
        "clave": "Redes / Fuentes",
        "valor": "Sin web"
      },
      {
        "clave": "Dolor real",
        "valor": "Sin web, galería ni cotizador; top de campaña automotriz"
      },
      {
        "clave": "Criterio ROI",
        "valor": ""
      },
      {
        "clave": "Fuente original",
        "valor": "PDF investigación automotriz Gemini (Downloads) #2 + Ranking scoring (table(2).csv) #2 + Clasificatoria (9_CLASIFICATORIA_PROSPECTOS.xlsx) A-02 + Tier list (4_TIER_LIST_PROSPECTOS.md)"
      },
      {
        "clave": "Veredicto",
        "valor": "LOTE 2"
      }
    ]
  },
  {
    "id": "P-master-109",
    "nombre": "Silver Auto Detail",
    "empresa": "Detallado e higienización",
    "telefono": "+52 55 3185 3157",
    "correo": "",
    "estado": "Prospecto",
    "responsableId": "m-sebas-03",
    "ultimoContacto": "2026-07-16T05:38:06.056Z",
    "createdAt": "2026-07-16T05:38:06.056Z",
    "valorEstimado": 0,
    "prioridad": "Alta",
    "fechaSeguimiento": "2026-07-16",
    "proximaAccion": "LOTE 2",
    "camposPersonalizados": [
      {
        "clave": "Dirección",
        "valor": "Cd. Satélite"
      },
      {
        "clave": "Redes / Fuentes",
        "valor": "Sin web"
      },
      {
        "clave": "Dolor real",
        "valor": "Sin web ni WhatsApp automatizado; estética premium paga por imagen"
      },
      {
        "clave": "Criterio ROI",
        "valor": ""
      },
      {
        "clave": "Fuente original",
        "valor": "PDF investigación automotriz Gemini (Downloads) #3 + Ranking scoring (table(2).csv) #3 + Clasificatoria (9_CLASIFICATORIA_PROSPECTOS.xlsx) A-03"
      },
      {
        "clave": "Veredicto",
        "valor": "LOTE 2"
      }
    ]
  },
  {
    "id": "P-master-110",
    "nombre": "ROYAL DETAIL",
    "empresa": "Estética automotriz + corrección de pintura",
    "telefono": "+52 55 6337 1276",
    "correo": "",
    "estado": "Prospecto",
    "responsableId": "m-sebas-03",
    "ultimoContacto": "2026-07-16T05:38:06.056Z",
    "createdAt": "2026-07-16T05:38:06.056Z",
    "valorEstimado": 0,
    "prioridad": "Alta",
    "fechaSeguimiento": "2026-07-16",
    "proximaAccion": "MADURAR",
    "camposPersonalizados": [
      {
        "clave": "Dirección",
        "valor": "Vía A. López Mateos, Satélite"
      },
      {
        "clave": "Redes / Fuentes",
        "valor": "Sin web"
      },
      {
        "clave": "Dolor real",
        "valor": "Sin web ni cotizador por WhatsApp"
      },
      {
        "clave": "Criterio ROI",
        "valor": "[AUD 2026-07-13] Dirección real: Vista Bella, TLALNEPANTLA (no Satélite)"
      },
      {
        "clave": "Fuente original",
        "valor": "PDF investigación automotriz Gemini (Downloads) #5 + Ranking scoring (table(2).csv) #4 + Clasificatoria (9_CLASIFICATORIA_PROSPECTOS.xlsx) A-04"
      },
      {
        "clave": "Veredicto",
        "valor": "MADURAR"
      }
    ]
  },
  {
    "id": "P-master-111",
    "nombre": "Taller Automundo Interlomas",
    "empresa": "Taller mecánico general",
    "telefono": "+52 55 2452 5550",
    "correo": "",
    "estado": "Prospecto",
    "responsableId": "m-sebas-03",
    "ultimoContacto": "2026-07-16T05:38:06.056Z",
    "createdAt": "2026-07-16T05:38:06.056Z",
    "valorEstimado": 0,
    "prioridad": "Alta",
    "fechaSeguimiento": "2026-07-16",
    "proximaAccion": "LOTE 2",
    "camposPersonalizados": [
      {
        "clave": "Dirección",
        "valor": "Av. Jesús del Monte"
      },
      {
        "clave": "Redes / Fuentes",
        "valor": "Sin web"
      },
      {
        "clave": "Dolor real",
        "valor": "Sin landing ni formulario de diagnóstico; zona de alto ticket"
      },
      {
        "clave": "Criterio ROI",
        "valor": ""
      },
      {
        "clave": "Fuente original",
        "valor": "PDF investigación automotriz Gemini (Downloads) #4 + Clasificatoria (9_CLASIFICATORIA_PROSPECTOS.xlsx) A-05"
      },
      {
        "clave": "Veredicto",
        "valor": "LOTE 2"
      }
    ]
  },
  {
    "id": "P-master-112",
    "nombre": "Dra. Naime Reyes — Medicina Estética",
    "empresa": "Medicina estética",
    "telefono": "+52 55 2438 9420",
    "correo": "",
    "estado": "Prospecto",
    "responsableId": "m-sebas-03",
    "ultimoContacto": "2026-07-16T05:38:06.056Z",
    "createdAt": "2026-07-16T05:38:06.056Z",
    "valorEstimado": 12500,
    "prioridad": "Alta",
    "fechaSeguimiento": "2026-07-16",
    "proximaAccion": "CONTACTAR YA",
    "camposPersonalizados": [
      {
        "clave": "Dirección",
        "valor": "MedHouse Interlomas"
      },
      {
        "clave": "Redes / Fuentes",
        "valor": "Redes activas sin web"
      },
      {
        "clave": "Dolor real",
        "valor": "Sin landing médica ni agenda; ticket 10/10"
      },
      {
        "clave": "Criterio ROI",
        "valor": ""
      },
      {
        "clave": "Fuente original",
        "valor": "PDF investigación premium Interlomas Gemini (Downloads) #1 + Ranking scoring (table(2).csv) #5 + Clasificatoria (9_CLASIFICATORIA_PROSPECTOS.xlsx) A-06"
      },
      {
        "clave": "Veredicto",
        "valor": "CONTACTAR YA"
      }
    ]
  },
  {
    "id": "P-master-113",
    "nombre": "Shanti Spa",
    "empresa": "Spa & belleza premium",
    "telefono": "+52 55 3036 0211",
    "correo": "",
    "estado": "Prospecto",
    "responsableId": "m-sebas-03",
    "ultimoContacto": "2026-07-16T05:38:06.056Z",
    "createdAt": "2026-07-16T05:38:06.056Z",
    "valorEstimado": 12500,
    "prioridad": "Alta",
    "fechaSeguimiento": "2026-07-16",
    "proximaAccion": "CONTACTAR YA",
    "camposPersonalizados": [
      {
        "clave": "Dirección",
        "valor": "CC Interlomas"
      },
      {
        "clave": "Redes / Fuentes",
        "valor": "Sin web"
      },
      {
        "clave": "Dolor real",
        "valor": "Sin catálogo ni sistema de reservas; zona premium"
      },
      {
        "clave": "Criterio ROI",
        "valor": "VERIFICADO 2026-07-13 en vivo: Maps abierto (cierra 7pm), 5.0 (8 reseñas), tel Maps=Excel (también en su reel de IG). Solo IG @shantispa574 (18 posts, 145 seg). Sin web, sin Fresha/Booksy (el \"Shanti Spa Care&Beauty\" de Fresha es OTRO negocio en Viaducto Piedad). Reservan por tel/DM."
      },
      {
        "clave": "Fuente original",
        "valor": "PDF investigación premium Interlomas Gemini (Downloads) #2 + Ranking scoring (table(2).csv) #7 + Clasificatoria (9_CLASIFICATORIA_PROSPECTOS.xlsx) A-07"
      },
      {
        "clave": "Veredicto",
        "valor": "CONTACTAR YA"
      }
    ]
  },
  {
    "id": "P-master-114",
    "nombre": "Dra. Fabiola González Hermosillo",
    "empresa": "Medicina estética",
    "telefono": "+52 55 2858 4282",
    "correo": "",
    "estado": "Prospecto",
    "responsableId": "m-sebas-03",
    "ultimoContacto": "2026-07-16T05:38:06.056Z",
    "createdAt": "2026-07-16T05:38:06.056Z",
    "valorEstimado": 12500,
    "prioridad": "Alta",
    "fechaSeguimiento": "2026-07-16",
    "proximaAccion": "CONTACTAR YA",
    "camposPersonalizados": [
      {
        "clave": "Dirección",
        "valor": "MedHaus Interlomas"
      },
      {
        "clave": "Redes / Fuentes",
        "valor": "Redes sin web"
      },
      {
        "clave": "Dolor real",
        "valor": "Sin web corporativa, citas ni CRM"
      },
      {
        "clave": "Criterio ROI",
        "valor": "[AUD 2026-07-13] Ya intentó resolver catálogo con curita: compradora ideal"
      },
      {
        "clave": "Fuente original",
        "valor": "PDF investigación premium Interlomas Gemini (Downloads) #3 + Ranking scoring (table(2).csv) #6 + Clasificatoria (9_CLASIFICATORIA_PROSPECTOS.xlsx) A-08"
      },
      {
        "clave": "Veredicto",
        "valor": "CONTACTAR YA"
      }
    ]
  },
  {
    "id": "P-master-115",
    "nombre": "Interlomas Dental Group (Dr. Elizalde)",
    "empresa": "Dental alta especialidad",
    "telefono": "+52 55 5049 3112",
    "correo": "",
    "estado": "Prospecto",
    "responsableId": "m-sebas-03",
    "ultimoContacto": "2026-07-16T05:38:06.056Z",
    "createdAt": "2026-07-16T05:38:06.056Z",
    "valorEstimado": 20000,
    "prioridad": "Alta",
    "fechaSeguimiento": "2026-07-16",
    "proximaAccion": "CONTACTAR YA",
    "camposPersonalizados": [
      {
        "clave": "Dirección",
        "valor": "San Fernando / La Herradura"
      },
      {
        "clave": "Redes / Fuentes",
        "valor": "Web vieja en HTTP (insegura)"
      },
      {
        "clave": "Dolor real",
        "valor": "Web vieja HTTP; ángulo de venta: renovación + agenda"
      },
      {
        "clave": "Criterio ROI",
        "valor": "VERIFICADO 2026-07-13 en vivo: Maps operando (cerrado lunes, abre mar 9am), 5.0 (8 reseñas), tel Maps=Excel. Web interlomasdentalgroup.mx SÍ carga y hoy va por HTTPS (ajustar guion: ya no es \"HTTP inseguro\") PERO es Wix vieja: menú CONTACTO roto (/contacto=404), fotos stock, sin botón de agendar. | [AUD 2026-07-13] Ya carga por HTTPS: ajustar guion, no decir \"HTTP inseguro\". Cerrado lunes"
      },
      {
        "clave": "Fuente original",
        "valor": "PDF investigación premium Interlomas Gemini (Downloads) #5 + Ranking scoring (table(2).csv) #9 + Clasificatoria (9_CLASIFICATORIA_PROSPECTOS.xlsx) A-09"
      },
      {
        "clave": "Veredicto",
        "valor": "CONTACTAR YA"
      }
    ]
  },
  {
    "id": "P-master-116",
    "nombre": "Hub Mind Training Center",
    "empresa": "Fitness boutique",
    "telefono": "+52 55 2434 8591",
    "correo": "",
    "estado": "Prospecto",
    "responsableId": "m-sebas-03",
    "ultimoContacto": "2026-07-16T05:38:06.056Z",
    "createdAt": "2026-07-16T05:38:06.056Z",
    "valorEstimado": 0,
    "prioridad": "Alta",
    "fechaSeguimiento": "2026-07-16",
    "proximaAccion": "CONTACTAR YA",
    "camposPersonalizados": [
      {
        "clave": "Dirección",
        "valor": "Blvd. Palmas Hills"
      },
      {
        "clave": "Redes / Fuentes",
        "valor": "Redes activas"
      },
      {
        "clave": "Dolor real",
        "valor": "Sin landing ni cotizador de planes"
      },
      {
        "clave": "Criterio ROI",
        "valor": ""
      },
      {
        "clave": "Fuente original",
        "valor": "PDF investigación premium Interlomas Gemini (Downloads) #4 + Ranking scoring (table(2).csv) #8 + Clasificatoria (9_CLASIFICATORIA_PROSPECTOS.xlsx) A-10"
      },
      {
        "clave": "Veredicto",
        "valor": "CONTACTAR YA"
      }
    ]
  },
  {
    "id": "P-master-117",
    "nombre": "Clínica Dental Dr. Alonso Ríos",
    "empresa": "Dental / Clínica",
    "telefono": "+52 56 1047 7908",
    "correo": "",
    "estado": "Prospecto",
    "responsableId": "m-sebas-03",
    "ultimoContacto": "2026-07-16T05:38:06.056Z",
    "createdAt": "2026-07-16T05:38:06.056Z",
    "valorEstimado": 0,
    "prioridad": "Alta",
    "fechaSeguimiento": "2026-07-16",
    "proximaAccion": "LOTE 2",
    "camposPersonalizados": [
      {
        "clave": "Dirección",
        "valor": "Huixquilucan Centro"
      },
      {
        "clave": "Redes / Fuentes",
        "valor": "Sin web ni redes"
      },
      {
        "clave": "Dolor real",
        "valor": "Invisible digitalmente; 5.0 con solo 5 reseñas"
      },
      {
        "clave": "Criterio ROI",
        "valor": "Precio de entrada sugerido por Gemini ($11K) considerado alto en auditoría"
      },
      {
        "clave": "Fuente original",
        "valor": "Auditoría 54 negocios (Auditoria_ASCK_54_negocios.xlsx) #4"
      },
      {
        "clave": "Veredicto",
        "valor": "LOTE 2"
      }
    ]
  },
  {
    "id": "P-master-118",
    "nombre": "Desmo-Lab Meccanica",
    "empresa": "Taller de motos especializado",
    "telefono": "+52 55 9013 2214",
    "correo": "",
    "estado": "Prospecto",
    "responsableId": "m-sebas-03",
    "ultimoContacto": "2026-07-16T05:38:06.056Z",
    "createdAt": "2026-07-16T05:38:06.056Z",
    "valorEstimado": 0,
    "prioridad": "Alta",
    "fechaSeguimiento": "2026-07-16",
    "proximaAccion": "REVISAR KEVIN",
    "camposPersonalizados": [
      {
        "clave": "Dirección",
        "valor": "Palo Solo"
      },
      {
        "clave": "Redes / Fuentes",
        "valor": "Sin web"
      },
      {
        "clave": "Dolor real",
        "valor": "Sin presencia digital pese a clientela premium (motos de alta cilindrada)"
      },
      {
        "clave": "Criterio ROI",
        "valor": "[AUD 2026-07-13] Rating 4.1 en caída, quejas de confianza: evaluar si es buen cliente"
      },
      {
        "clave": "Fuente original",
        "valor": "Auditoría 54 negocios (Auditoria_ASCK_54_negocios.xlsx) #24"
      },
      {
        "clave": "Veredicto",
        "valor": "REVISAR KEVIN"
      }
    ]
  },
  {
    "id": "P-master-119",
    "nombre": "Dentista en la Herradura",
    "empresa": "Consultorio odontológico",
    "telefono": "+52 55 5404 8851",
    "correo": "",
    "estado": "Prospecto",
    "responsableId": "m-sebas-03",
    "ultimoContacto": "2026-07-16T05:38:06.056Z",
    "createdAt": "2026-07-16T05:38:06.056Z",
    "valorEstimado": 0,
    "prioridad": "Alta",
    "fechaSeguimiento": "2026-07-16",
    "proximaAccion": "LOTE 2",
    "camposPersonalizados": [
      {
        "clave": "Dirección",
        "valor": "La Herradura"
      },
      {
        "clave": "Redes / Fuentes",
        "valor": "Sin web"
      },
      {
        "clave": "Dolor real",
        "valor": "Invisibilidad digital total, solo 5 reseñas"
      },
      {
        "clave": "Criterio ROI",
        "valor": ""
      },
      {
        "clave": "Fuente original",
        "valor": "Auditoría 54 negocios (Auditoria_ASCK_54_negocios.xlsx) #43"
      },
      {
        "clave": "Veredicto",
        "valor": "LOTE 2"
      }
    ]
  },
  {
    "id": "P-master-120",
    "nombre": "Neodentis Interlomas",
    "empresa": "Dental / Clínica",
    "telefono": "+52 55 5290 8682",
    "correo": "",
    "estado": "Prospecto",
    "responsableId": "m-sebas-03",
    "ultimoContacto": "2026-07-16T05:38:06.056Z",
    "createdAt": "2026-07-16T05:38:06.056Z",
    "valorEstimado": 0,
    "prioridad": "Alta",
    "fechaSeguimiento": "2026-07-16",
    "proximaAccion": "LOTE 2",
    "camposPersonalizados": [
      {
        "clave": "Dirección",
        "valor": "La Herradura / Granada"
      },
      {
        "clave": "Redes / Fuentes",
        "valor": "Sin web"
      },
      {
        "clave": "Dolor real",
        "valor": "Fuga de pacientes jóvenes por falta de UX móvil; zona de alto nivel"
      },
      {
        "clave": "Criterio ROI",
        "valor": ""
      },
      {
        "clave": "Fuente original",
        "valor": "Auditoría 54 negocios (Auditoria_ASCK_54_negocios.xlsx) #46"
      },
      {
        "clave": "Veredicto",
        "valor": "LOTE 2"
      }
    ]
  },
  {
    "id": "P-master-121",
    "nombre": "Altavet Interlomas (24h)",
    "empresa": "Veterinaria de emergencias 24h",
    "telefono": "+52 777 600 5822",
    "correo": "",
    "estado": "Prospecto",
    "responsableId": "m-sebas-03",
    "ultimoContacto": "2026-07-16T05:38:06.056Z",
    "createdAt": "2026-07-16T05:38:06.056Z",
    "valorEstimado": 0,
    "prioridad": "Media",
    "fechaSeguimiento": "2026-07-16",
    "proximaAccion": "LOTE 2",
    "camposPersonalizados": [
      {
        "clave": "Dirección",
        "valor": "Plaza Florencia, Jesús del Monte / Interlomas"
      },
      {
        "clave": "Redes / Fuentes",
        "valor": "Sin web"
      },
      {
        "clave": "Dolor real",
        "valor": "Urgencias dependen de Maps y llamadas; sin landing 24h"
      },
      {
        "clave": "Criterio ROI",
        "valor": "VERIFICAR teléfono: lada 777 es de Morelos, no de Interlomas | [AUD 2026-07-13] Tel lada 777 CONFIRMADO en Maps: es su número real"
      },
      {
        "clave": "Fuente original",
        "valor": "Auditoría 54 negocios (Auditoria_ASCK_54_negocios.xlsx) #9 + PDF investigación premium Interlomas Gemini (Downloads) #6 + Clasificatoria (9_CLASIFICATORIA_PROSPECTOS.xlsx) B-01"
      },
      {
        "clave": "Veredicto",
        "valor": "LOTE 2"
      }
    ]
  },
  {
    "id": "P-master-122",
    "nombre": "Veter — Veterinaria Interlomas",
    "empresa": "Clínica veterinaria",
    "telefono": "+52 55 1796 7886",
    "correo": "",
    "estado": "Prospecto",
    "responsableId": "m-sebas-03",
    "ultimoContacto": "2026-07-16T05:38:06.056Z",
    "createdAt": "2026-07-16T05:38:06.056Z",
    "valorEstimado": 0,
    "prioridad": "Media",
    "fechaSeguimiento": "2026-07-16",
    "proximaAccion": "MADURAR",
    "camposPersonalizados": [
      {
        "clave": "Dirección",
        "valor": "Hacienda de las Palmas, Interlomas"
      },
      {
        "clave": "Redes / Fuentes",
        "valor": "Sí: veter.mx (activo, informativo)"
      },
      {
        "clave": "Dolor real",
        "valor": "Web vieja sin módulos interactivos; venta = mejora, ciclo más largo"
      },
      {
        "clave": "Criterio ROI",
        "valor": "[AUD 2026-07-13] Venta = mejora (agenda real sobre web existente)"
      },
      {
        "clave": "Fuente original",
        "valor": "Auditoría 54 negocios (Auditoria_ASCK_54_negocios.xlsx) #6 + PDF investigación premium Interlomas Gemini (Downloads) #8 + Clasificatoria (9_CLASIFICATORIA_PROSPECTOS.xlsx) B-02"
      },
      {
        "clave": "Veredicto",
        "valor": "MADURAR"
      }
    ]
  },
  {
    "id": "P-master-123",
    "nombre": "Clínica Dental Interlomas (Dr. Franco)",
    "empresa": "Odontología privada",
    "telefono": "+52 55 5206 3043",
    "correo": "",
    "estado": "Prospecto",
    "responsableId": "m-sebas-03",
    "ultimoContacto": "2026-07-16T05:38:06.056Z",
    "createdAt": "2026-07-16T05:38:06.056Z",
    "valorEstimado": 0,
    "prioridad": "Media",
    "fechaSeguimiento": "2026-07-16",
    "proximaAccion": "MADURAR",
    "camposPersonalizados": [
      {
        "clave": "Dirección",
        "valor": "Blvd. Magnocentro"
      },
      {
        "clave": "Redes / Fuentes",
        "valor": "Web básica vieja"
      },
      {
        "clave": "Dolor real",
        "valor": "Web básica anticuada; ángulo: renovación + agenda"
      },
      {
        "clave": "Criterio ROI",
        "valor": "[AUD 2026-07-13] Web detectada en Maps (5.0/9, tel ✓). Agenda no verificada"
      },
      {
        "clave": "Fuente original",
        "valor": "PDF investigación premium Interlomas Gemini (Downloads) #7 + Ranking scoring (table(2).csv) #12 + Clasificatoria (9_CLASIFICATORIA_PROSPECTOS.xlsx) B-03"
      },
      {
        "clave": "Veredicto",
        "valor": "MADURAR"
      }
    ]
  },
  {
    "id": "P-master-124",
    "nombre": "CBI Medical Spa Interlomas",
    "empresa": "Medical spa",
    "telefono": "+52 55 5290 3645",
    "correo": "",
    "estado": "Prospecto",
    "responsableId": "m-sebas-03",
    "ultimoContacto": "2026-07-16T05:38:06.056Z",
    "createdAt": "2026-07-16T05:38:06.056Z",
    "valorEstimado": 0,
    "prioridad": "Media",
    "fechaSeguimiento": "2026-07-16",
    "proximaAccion": "MADURAR",
    "camposPersonalizados": [
      {
        "clave": "Dirección",
        "valor": "Plaza Granada"
      },
      {
        "clave": "Redes / Fuentes",
        "valor": "Web débil (score 4/10)"
      },
      {
        "clave": "Dolor real",
        "valor": "Landing spa pobre; segunda ola estética"
      },
      {
        "clave": "Criterio ROI",
        "valor": "[AUD 2026-07-13] IG daba otro tel (5540308732); el del Excel coincide con Maps"
      },
      {
        "clave": "Fuente original",
        "valor": "PDF investigación premium Interlomas Gemini (Downloads) #9 + Ranking scoring (table(2).csv) #20 + Clasificatoria (9_CLASIFICATORIA_PROSPECTOS.xlsx) B-04"
      },
      {
        "clave": "Veredicto",
        "valor": "MADURAR"
      }
    ]
  },
  {
    "id": "P-master-125",
    "nombre": "Servicio Automotriz Villavicencio",
    "empresa": "Taller mecánico y eléctrico",
    "telefono": "+52 55 5815 1776",
    "correo": "",
    "estado": "Prospecto",
    "responsableId": "m-sebas-03",
    "ultimoContacto": "2026-07-16T05:38:06.056Z",
    "createdAt": "2026-07-16T05:38:06.056Z",
    "valorEstimado": 0,
    "prioridad": "Media",
    "fechaSeguimiento": "2026-07-16",
    "proximaAccion": "MADURAR",
    "camposPersonalizados": [
      {
        "clave": "Dirección",
        "valor": "San Fernando, Naucalpan"
      },
      {
        "clave": "Redes / Fuentes",
        "valor": "Sin web"
      },
      {
        "clave": "Dolor real",
        "valor": "Sin landing de captación"
      },
      {
        "clave": "Criterio ROI",
        "valor": ""
      },
      {
        "clave": "Fuente original",
        "valor": "PDF investigación automotriz Gemini (Downloads) #6 + Ranking scoring (table(2).csv) #14 + Clasificatoria (9_CLASIFICATORIA_PROSPECTOS.xlsx) B-05"
      },
      {
        "clave": "Veredicto",
        "valor": "MADURAR"
      }
    ]
  },
  {
    "id": "P-master-126",
    "nombre": "SAE Servicio Automotriz Especializado",
    "empresa": "Diagnóstico y mantenimiento",
    "telefono": "+52 55 5373 7678",
    "correo": "",
    "estado": "Prospecto",
    "responsableId": "m-sebas-03",
    "ultimoContacto": "2026-07-16T05:38:06.056Z",
    "createdAt": "2026-07-16T05:38:06.056Z",
    "valorEstimado": 0,
    "prioridad": "Media",
    "fechaSeguimiento": "2026-07-16",
    "proximaAccion": "LOTE 2",
    "camposPersonalizados": [
      {
        "clave": "Dirección",
        "valor": "Jardines de San Mateo"
      },
      {
        "clave": "Redes / Fuentes",
        "valor": "Sin web"
      },
      {
        "clave": "Dolor real",
        "valor": "Sin web ni citas de diagnóstico"
      },
      {
        "clave": "Criterio ROI",
        "valor": ""
      },
      {
        "clave": "Fuente original",
        "valor": "PDF investigación automotriz Gemini (Downloads) #7 + Ranking scoring (table(2).csv) #15 + Clasificatoria (9_CLASIFICATORIA_PROSPECTOS.xlsx) B-06"
      },
      {
        "clave": "Veredicto",
        "valor": "LOTE 2"
      }
    ]
  },
  {
    "id": "P-master-127",
    "nombre": "S.A.E (San Rafael Chamapa)",
    "empresa": "Mecánica de precisión",
    "telefono": "+52 55 5302 3774",
    "correo": "",
    "estado": "Prospecto",
    "responsableId": "m-sebas-03",
    "ultimoContacto": "2026-07-16T05:38:06.056Z",
    "createdAt": "2026-07-16T05:38:06.056Z",
    "valorEstimado": 0,
    "prioridad": "Media",
    "fechaSeguimiento": "2026-07-16",
    "proximaAccion": "MADURAR",
    "camposPersonalizados": [
      {
        "clave": "Dirección",
        "valor": "San Rafael Chamapa, Naucalpan"
      },
      {
        "clave": "Redes / Fuentes",
        "valor": "Sin web"
      },
      {
        "clave": "Dolor real",
        "valor": "Sin landing"
      },
      {
        "clave": "Criterio ROI",
        "valor": ""
      },
      {
        "clave": "Fuente original",
        "valor": "PDF investigación automotriz Gemini (Downloads) #8 + Ranking scoring (table(2).csv) #16 + Clasificatoria (9_CLASIFICATORIA_PROSPECTOS.xlsx) B-07"
      },
      {
        "clave": "Veredicto",
        "valor": "MADURAR"
      }
    ]
  },
  {
    "id": "P-master-128",
    "nombre": "Interlomas Car Wash SA de CV",
    "empresa": "Autolavado + estética",
    "telefono": "+52 55 5291 8869",
    "correo": "",
    "estado": "Prospecto",
    "responsableId": "m-sebas-03",
    "ultimoContacto": "2026-07-16T05:38:06.056Z",
    "createdAt": "2026-07-16T05:38:06.056Z",
    "valorEstimado": 0,
    "prioridad": "Media",
    "fechaSeguimiento": "2026-07-16",
    "proximaAccion": "CONTACTAR YA",
    "camposPersonalizados": [
      {
        "clave": "Dirección",
        "valor": "Paseo de la Herradura"
      },
      {
        "clave": "Redes / Fuentes",
        "valor": "Sin web"
      },
      {
        "clave": "Dolor real",
        "valor": "Sin landing ni membresías digitales"
      },
      {
        "clave": "Criterio ROI",
        "valor": "[AUD 2026-07-13] El negocio con más clientela probada de toda la lista"
      },
      {
        "clave": "Fuente original",
        "valor": "PDF investigación automotriz Gemini (Downloads) #9 + Ranking scoring (table(2).csv) #17 + Clasificatoria (9_CLASIFICATORIA_PROSPECTOS.xlsx) B-08"
      },
      {
        "clave": "Veredicto",
        "valor": "CONTACTAR YA"
      }
    ]
  },
  {
    "id": "P-master-129",
    "nombre": "Skin Store",
    "empresa": "Retail / Skincare y cosmética",
    "telefono": "Por validar",
    "correo": "",
    "estado": "Prospecto",
    "responsableId": "m-sebas-03",
    "ultimoContacto": "2026-07-16T05:38:06.056Z",
    "createdAt": "2026-07-16T05:38:06.056Z",
    "valorEstimado": 0,
    "prioridad": "Media",
    "fechaSeguimiento": "2026-07-16",
    "proximaAccion": "DESCARTADO",
    "camposPersonalizados": [
      {
        "clave": "Dirección",
        "valor": "Por validar"
      },
      {
        "clave": "Redes / Fuentes",
        "valor": "IG/FB por validar"
      },
      {
        "clave": "Dolor real",
        "valor": "Catálogo, existencias y pedidos por WhatsApp desordenados"
      },
      {
        "clave": "Criterio ROI",
        "valor": "Validar inventario y redes antes de invertir demo | [AUD 2026-07-13] No localizable; Excel ya decía \"por validar\""
      },
      {
        "clave": "Fuente original",
        "valor": "CRM limpio (ASCK_CRM_PROSPECTOS_LIMPIO_NUEVO.xlsx) P-006 + Clasificatoria (9_CLASIFICATORIA_PROSPECTOS.xlsx) B-09"
      },
      {
        "clave": "Veredicto",
        "valor": "DESCARTADO"
      }
    ]
  },
  {
    "id": "P-master-130",
    "nombre": "K Centro Estético Integral & Spa",
    "empresa": "Centro estético / Spa",
    "telefono": "Por validar",
    "correo": "",
    "estado": "Prospecto",
    "responsableId": "m-sebas-03",
    "ultimoContacto": "2026-07-16T05:38:06.056Z",
    "createdAt": "2026-07-16T05:38:06.056Z",
    "valorEstimado": 0,
    "prioridad": "Media",
    "fechaSeguimiento": "2026-07-16",
    "proximaAccion": "MADURAR",
    "camposPersonalizados": [
      {
        "clave": "Dirección",
        "valor": "Acueducto Lerma, San Bartolomé Coatepec"
      },
      {
        "clave": "Redes / Fuentes",
        "valor": "IG @k_centroesteticoyspa, FB kcentroestetico, Cybo"
      },
      {
        "clave": "Dolor real",
        "valor": "Servicios múltiples sin agenda digital; validar ticket de tratamientos"
      },
      {
        "clave": "Criterio ROI",
        "valor": "[AUD 2026-07-13] TEL NUEVO capturado de Maps: 56 1855 6004 (Excel: \"por validar\")"
      },
      {
        "clave": "Fuente original",
        "valor": "CRM limpio (ASCK_CRM_PROSPECTOS_LIMPIO_NUEVO.xlsx) P-008 + Clasificatoria (9_CLASIFICATORIA_PROSPECTOS.xlsx) B-10"
      },
      {
        "clave": "Veredicto",
        "valor": "MADURAR"
      }
    ]
  },
  {
    "id": "P-master-131",
    "nombre": "Studio By Diane",
    "empresa": "Estudio de belleza / Uñas",
    "telefono": "+52 55 6942 9096",
    "correo": "",
    "estado": "Prospecto",
    "responsableId": "m-sebas-03",
    "ultimoContacto": "2026-07-16T05:38:06.056Z",
    "createdAt": "2026-07-16T05:38:06.056Z",
    "valorEstimado": 0,
    "prioridad": "Media",
    "fechaSeguimiento": "2026-07-16",
    "proximaAccion": "LOTE 2",
    "camposPersonalizados": [
      {
        "clave": "Dirección",
        "valor": "Jesús del Monte / Huixquilucan"
      },
      {
        "clave": "Redes / Fuentes",
        "valor": "Sin web; IG @studio.bydiane, FB Diane In Nails"
      },
      {
        "clave": "Dolor real",
        "valor": "Clientas piden fotos y precios por chat todo el día; demo Antigravity lista"
      },
      {
        "clave": "Criterio ROI",
        "valor": "Aud.54 decía 'contactar hoy'; CRM lo dejó en observación (ticket por validar)"
      },
      {
        "clave": "Fuente original",
        "valor": "CRM limpio (ASCK_CRM_PROSPECTOS_LIMPIO_NUEVO.xlsx) P-010 + Auditoría 54 negocios (Auditoria_ASCK_54_negocios.xlsx) #31 + Clasificatoria (9_CLASIFICATORIA_PROSPECTOS.xlsx) B-11 + Indexados verificación (prospectos_asck_indexados_3_nuevos.csv)"
      },
      {
        "clave": "Veredicto",
        "valor": "LOTE 2"
      }
    ]
  },
  {
    "id": "P-master-132",
    "nombre": "Universidad (IEM Finanzas)",
    "empresa": "Educación",
    "telefono": "—",
    "correo": "",
    "estado": "Prospecto",
    "responsableId": "m-sebas-03",
    "ultimoContacto": "2026-07-16T05:38:06.056Z",
    "createdAt": "2026-07-16T05:38:06.056Z",
    "valorEstimado": 0,
    "prioridad": "Media",
    "fechaSeguimiento": "2026-07-16",
    "proximaAccion": "REVISAR KEVIN",
    "camposPersonalizados": [
      {
        "clave": "Dirección",
        "valor": "Universidad de Kevin"
      },
      {
        "clave": "Redes / Fuentes",
        "valor": "—"
      },
      {
        "clave": "Dolor real",
        "valor": "Gestión financiera escolar; ciclo de venta largo, demo IEM Finanzas"
      },
      {
        "clave": "Criterio ROI",
        "valor": "Trabajar en paralelo, no como foco | [AUD 2026-07-13] Universidad de Kevin: no es prospecto comercial estándar"
      },
      {
        "clave": "Fuente original",
        "valor": "Clasificatoria (9_CLASIFICATORIA_PROSPECTOS.xlsx) B-12 + Tier list (4_TIER_LIST_PROSPECTOS.md)"
      },
      {
        "clave": "Veredicto",
        "valor": "REVISAR KEVIN"
      }
    ]
  },
  {
    "id": "P-master-133",
    "nombre": "La Marquesa / Valle de Rancho Viejo",
    "empresa": "Turismo",
    "telefono": "Kevin lo tiene",
    "correo": "",
    "estado": "Prospecto",
    "responsableId": "m-sebas-03",
    "ultimoContacto": "2026-07-16T05:38:06.056Z",
    "createdAt": "2026-07-16T05:38:06.056Z",
    "valorEstimado": 0,
    "prioridad": "Media",
    "fechaSeguimiento": "2026-07-16",
    "proximaAccion": "REVISAR KEVIN",
    "camposPersonalizados": [
      {
        "clave": "Dirección",
        "valor": "La Marquesa"
      },
      {
        "clave": "Redes / Fuentes",
        "valor": "—"
      },
      {
        "clave": "Dolor real",
        "valor": "Cliente actual: web turística en curso; terminar y cobrar etapa"
      },
      {
        "clave": "Criterio ROI",
        "valor": "Cliente en curso, no prospecto frío | [AUD 2026-07-13] Dato personal de Kevin; no auditable como negocio"
      },
      {
        "clave": "Fuente original",
        "valor": "Clasificatoria (9_CLASIFICATORIA_PROSPECTOS.xlsx) B-13"
      },
      {
        "clave": "Veredicto",
        "valor": "REVISAR KEVIN"
      }
    ]
  },
  {
    "id": "P-master-134",
    "nombre": "Clínica Dental Velázquez",
    "empresa": "Dental / Clínica",
    "telefono": "+52 722 935 8875",
    "correo": "",
    "estado": "Prospecto",
    "responsableId": "m-sebas-03",
    "ultimoContacto": "2026-07-16T05:38:06.056Z",
    "createdAt": "2026-07-16T05:38:06.056Z",
    "valorEstimado": 0,
    "prioridad": "Media",
    "fechaSeguimiento": "2026-07-16",
    "proximaAccion": "MADURAR",
    "camposPersonalizados": [
      {
        "clave": "Dirección",
        "valor": "Huixquilucan Centro"
      },
      {
        "clave": "Redes / Fuentes",
        "valor": "Sin web"
      },
      {
        "clave": "Dolor real",
        "valor": "Rating bajo (3.7) y sin presencia digital; venta delicada"
      },
      {
        "clave": "Criterio ROI",
        "valor": "VERIFICAR teléfono: lada 722 es de Toluca | [AUD 2026-07-13] Tel lada 722 coincide con Maps"
      },
      {
        "clave": "Fuente original",
        "valor": "Auditoría 54 negocios (Auditoria_ASCK_54_negocios.xlsx) #2"
      },
      {
        "clave": "Veredicto",
        "valor": "MADURAR"
      }
    ]
  },
  {
    "id": "P-master-135",
    "nombre": "Clínica Animal Del Puente",
    "empresa": "Veterinaria de barrio",
    "telefono": "+52 55 5247 2904",
    "correo": "",
    "estado": "Prospecto",
    "responsableId": "m-sebas-03",
    "ultimoContacto": "2026-07-16T05:38:06.056Z",
    "createdAt": "2026-07-16T05:38:06.056Z",
    "valorEstimado": 0,
    "prioridad": "Media",
    "fechaSeguimiento": "2026-07-16",
    "proximaAccion": "LOTE 2",
    "camposPersonalizados": [
      {
        "clave": "Dirección",
        "valor": "Jesús del Monte"
      },
      {
        "clave": "Redes / Fuentes",
        "valor": "Sin web"
      },
      {
        "clave": "Dolor real",
        "valor": "Operación analógica; dueños tradicionales, ticket probablemente bajo"
      },
      {
        "clave": "Criterio ROI",
        "valor": "Se sugiere visita física, no WhatsApp frío | [AUD 2026-07-13] OJO: DOS fichas en Maps (4.1/75 y 4.3/538): pedir que unifiquen"
      },
      {
        "clave": "Fuente original",
        "valor": "Auditoría 54 negocios (Auditoria_ASCK_54_negocios.xlsx) #10"
      },
      {
        "clave": "Veredicto",
        "valor": "LOTE 2"
      }
    ]
  },
  {
    "id": "P-master-136",
    "nombre": "GYM Old School — Santa Fe",
    "empresa": "Gimnasio",
    "telefono": "+52 56 2843 5638",
    "correo": "",
    "estado": "Prospecto",
    "responsableId": "m-sebas-03",
    "ultimoContacto": "2026-07-16T05:38:06.056Z",
    "createdAt": "2026-07-16T05:38:06.056Z",
    "valorEstimado": 0,
    "prioridad": "Media",
    "fechaSeguimiento": "2026-07-16",
    "proximaAccion": "LOTE 2",
    "camposPersonalizados": [
      {
        "clave": "Dirección",
        "valor": "Santa Fe"
      },
      {
        "clave": "Redes / Fuentes",
        "valor": "Sin web"
      },
      {
        "clave": "Dolor real",
        "valor": "Cobros y accesos manuales; solo 10 reseñas (negocio joven)"
      },
      {
        "clave": "Criterio ROI",
        "valor": "Gimnasios independientes resisten gasto en software; visita presencial"
      },
      {
        "clave": "Fuente original",
        "valor": "Auditoría 54 negocios (Auditoria_ASCK_54_negocios.xlsx) #22"
      },
      {
        "clave": "Veredicto",
        "valor": "LOTE 2"
      }
    ]
  },
  {
    "id": "P-master-137",
    "nombre": "Servicio Automotriz Valverde",
    "empresa": "Taller mecánico",
    "telefono": "+52 55 5291 9374",
    "correo": "",
    "estado": "Prospecto",
    "responsableId": "m-sebas-03",
    "ultimoContacto": "2026-07-16T05:38:06.056Z",
    "createdAt": "2026-07-16T05:38:06.056Z",
    "valorEstimado": 0,
    "prioridad": "Media",
    "fechaSeguimiento": "2026-07-16",
    "proximaAccion": "MADURAR",
    "camposPersonalizados": [
      {
        "clave": "Dirección",
        "valor": "Palo Solo"
      },
      {
        "clave": "Redes / Fuentes",
        "valor": "Sin web"
      },
      {
        "clave": "Dolor real",
        "valor": "Rating bajo (3.6): reputación dañada; venta emocionalmente delicada"
      },
      {
        "clave": "Criterio ROI",
        "valor": "No mencionar reseñas negativas en el primer mensaje"
      },
      {
        "clave": "Fuente original",
        "valor": "Auditoría 54 negocios (Auditoria_ASCK_54_negocios.xlsx) #27"
      },
      {
        "clave": "Veredicto",
        "valor": "MADURAR"
      }
    ]
  },
  {
    "id": "P-master-138",
    "nombre": "Centro de Belleza y Estilo",
    "empresa": "Estética",
    "telefono": "+52 55 5815 4188",
    "correo": "",
    "estado": "Prospecto",
    "responsableId": "m-sebas-03",
    "ultimoContacto": "2026-07-16T05:38:06.056Z",
    "createdAt": "2026-07-16T05:38:06.056Z",
    "valorEstimado": 0,
    "prioridad": "Media",
    "fechaSeguimiento": "2026-07-16",
    "proximaAccion": "MADURAR",
    "camposPersonalizados": [
      {
        "clave": "Dirección",
        "valor": "Jesús del Monte"
      },
      {
        "clave": "Redes / Fuentes",
        "valor": "Sin web"
      },
      {
        "clave": "Dolor real",
        "valor": "Línea telefónica saturada en horas pico; solo 5 reseñas"
      },
      {
        "clave": "Criterio ROI",
        "valor": ""
      },
      {
        "clave": "Fuente original",
        "valor": "Auditoría 54 negocios (Auditoria_ASCK_54_negocios.xlsx) #28"
      },
      {
        "clave": "Veredicto",
        "valor": "MADURAR"
      }
    ]
  },
  {
    "id": "P-master-139",
    "nombre": "Ely Berry Studio",
    "empresa": "Salón de uñas",
    "telefono": "+52 55 9131 5225",
    "correo": "",
    "estado": "Prospecto",
    "responsableId": "m-sebas-03",
    "ultimoContacto": "2026-07-16T05:38:06.056Z",
    "createdAt": "2026-07-16T05:38:06.056Z",
    "valorEstimado": 0,
    "prioridad": "Media",
    "fechaSeguimiento": "2026-07-16",
    "proximaAccion": "CONTACTAR YA",
    "camposPersonalizados": [
      {
        "clave": "Dirección",
        "valor": "Plaza Interlomas, Jesús del Monte"
      },
      {
        "clave": "Redes / Fuentes",
        "valor": "Sin web"
      },
      {
        "clave": "Dolor real",
        "valor": "Chat saturado por consultas de precio/diseño; ubicación premium"
      },
      {
        "clave": "Criterio ROI",
        "valor": "[AUD 2026-07-13] Mucho más grande de lo que decía el Excel: candidata estrella"
      },
      {
        "clave": "Fuente original",
        "valor": "Auditoría 54 negocios (Auditoria_ASCK_54_negocios.xlsx) #29"
      },
      {
        "clave": "Veredicto",
        "valor": "CONTACTAR YA"
      }
    ]
  },
  {
    "id": "P-master-140",
    "nombre": "Nature Sense",
    "empresa": "Estética / Spa",
    "telefono": "+52 55 3735 7285",
    "correo": "",
    "estado": "Prospecto",
    "responsableId": "m-sebas-03",
    "ultimoContacto": "2026-07-16T05:38:06.056Z",
    "createdAt": "2026-07-16T05:38:06.056Z",
    "valorEstimado": 0,
    "prioridad": "Media",
    "fechaSeguimiento": "2026-07-16",
    "proximaAccion": "MADURAR",
    "camposPersonalizados": [
      {
        "clave": "Dirección",
        "valor": "Jesús del Monte"
      },
      {
        "clave": "Redes / Fuentes",
        "valor": "Sin web"
      },
      {
        "clave": "Dolor real",
        "valor": "Rating muy bajo (3.4): reputación dañada"
      },
      {
        "clave": "Criterio ROI",
        "valor": "Venta de reputación en frío es difícil"
      },
      {
        "clave": "Fuente original",
        "valor": "Auditoría 54 negocios (Auditoria_ASCK_54_negocios.xlsx) #30"
      },
      {
        "clave": "Veredicto",
        "valor": "MADURAR"
      }
    ]
  },
  {
    "id": "P-master-141",
    "nombre": "Cuco & Guille",
    "empresa": "Estética tradicional",
    "telefono": "+52 55 5247 3764",
    "correo": "",
    "estado": "Prospecto",
    "responsableId": "m-sebas-03",
    "ultimoContacto": "2026-07-16T05:38:06.056Z",
    "createdAt": "2026-07-16T05:38:06.056Z",
    "valorEstimado": 0,
    "prioridad": "Media",
    "fechaSeguimiento": "2026-07-16",
    "proximaAccion": "MADURAR",
    "camposPersonalizados": [
      {
        "clave": "Dirección",
        "valor": "Jesús del Monte"
      },
      {
        "clave": "Redes / Fuentes",
        "valor": "Sin web"
      },
      {
        "clave": "Dolor real",
        "valor": "Operación tradicional con alto volumen (>60 reseñas); resistencia al cambio"
      },
      {
        "clave": "Criterio ROI",
        "valor": "Mensaje de 'complementar', no 'reemplazar' | [AUD 2026-07-13] Tel del Excel no visible en listado de Maps"
      },
      {
        "clave": "Fuente original",
        "valor": "Auditoría 54 negocios (Auditoria_ASCK_54_negocios.xlsx) #32"
      },
      {
        "clave": "Veredicto",
        "valor": "MADURAR"
      }
    ]
  },
  {
    "id": "P-master-142",
    "nombre": "Café Toscano",
    "empresa": "Cafetería / Restaurante",
    "telefono": "+52 55 6732 5374",
    "correo": "",
    "estado": "Prospecto",
    "responsableId": "m-sebas-03",
    "ultimoContacto": "2026-07-16T05:38:06.056Z",
    "createdAt": "2026-07-16T05:38:06.056Z",
    "valorEstimado": 0,
    "prioridad": "Media",
    "fechaSeguimiento": "2026-07-16",
    "proximaAccion": "DESCARTADO",
    "camposPersonalizados": [
      {
        "clave": "Dirección",
        "valor": "Polanco"
      },
      {
        "clave": "Redes / Fuentes",
        "valor": "Sin web"
      },
      {
        "clave": "Dolor real",
        "valor": "Menú en PDF/QR lento; >100 reseñas = gerencia formal, decisión lenta"
      },
      {
        "clave": "Criterio ROI",
        "valor": "[AUD 2026-07-13] Ya reservan online (OpenTable): pitch de reservas muerto"
      },
      {
        "clave": "Fuente original",
        "valor": "Auditoría 54 negocios (Auditoria_ASCK_54_negocios.xlsx) #33"
      },
      {
        "clave": "Veredicto",
        "valor": "DESCARTADO"
      }
    ]
  },
  {
    "id": "P-master-143",
    "nombre": "Conejo Blanco Café",
    "empresa": "Cafetería de especialidad",
    "telefono": "+52 55 2272 1904",
    "correo": "",
    "estado": "Prospecto",
    "responsableId": "m-sebas-03",
    "ultimoContacto": "2026-07-16T05:38:06.056Z",
    "createdAt": "2026-07-16T05:38:06.056Z",
    "valorEstimado": 0,
    "prioridad": "Media",
    "fechaSeguimiento": "2026-07-16",
    "proximaAccion": "DESCARTADO",
    "camposPersonalizados": [
      {
        "clave": "Dirección",
        "valor": "Polanco"
      },
      {
        "clave": "Redes / Fuentes",
        "valor": "Sin web"
      },
      {
        "clave": "Dolor real",
        "valor": "Filas en barra por las mañanas; pre-pedido completo es proyecto grande"
      },
      {
        "clave": "Criterio ROI",
        "valor": "Ofrecer versión simplificada (menú + WhatsApp) primero | [AUD 2026-07-13] \"Pedir en línea\" activo en Maps"
      },
      {
        "clave": "Fuente original",
        "valor": "Auditoría 54 negocios (Auditoria_ASCK_54_negocios.xlsx) #35"
      },
      {
        "clave": "Veredicto",
        "valor": "DESCARTADO"
      }
    ]
  },
  {
    "id": "P-master-144",
    "nombre": "Tacos Atarantados Palmas",
    "empresa": "Taquería de especialidad",
    "telefono": "+52 55 2120 7201",
    "correo": "",
    "estado": "Prospecto",
    "responsableId": "m-sebas-03",
    "ultimoContacto": "2026-07-16T05:38:06.056Z",
    "createdAt": "2026-07-16T05:38:06.056Z",
    "valorEstimado": 0,
    "prioridad": "Media",
    "fechaSeguimiento": "2026-07-16",
    "proximaAccion": "DESCARTADO",
    "camposPersonalizados": [
      {
        "clave": "Dirección",
        "valor": "Lomas de Chapultepec"
      },
      {
        "clave": "Redes / Fuentes",
        "valor": "Sin web"
      },
      {
        "clave": "Dolor real",
        "valor": "Sucursal nueva sin menú digital; decisión puede depender de la central"
      },
      {
        "clave": "Criterio ROI",
        "valor": "[AUD 2026-07-13] Negocio de moda con máxima concurrencia; sin dolor"
      },
      {
        "clave": "Fuente original",
        "valor": "Auditoría 54 negocios (Auditoria_ASCK_54_negocios.xlsx) #39"
      },
      {
        "clave": "Veredicto",
        "valor": "DESCARTADO"
      }
    ]
  },
  {
    "id": "P-master-145",
    "nombre": "Bravus Gym El Bosque",
    "empresa": "Gimnasio residencial premium",
    "telefono": "+52 55 9316 2858",
    "correo": "",
    "estado": "Prospecto",
    "responsableId": "m-sebas-03",
    "ultimoContacto": "2026-07-16T05:38:06.056Z",
    "createdAt": "2026-07-16T05:38:06.056Z",
    "valorEstimado": 0,
    "prioridad": "Media",
    "fechaSeguimiento": "2026-07-16",
    "proximaAccion": "LOTE 2",
    "camposPersonalizados": [
      {
        "clave": "Dirección",
        "valor": "Bosque Real"
      },
      {
        "clave": "Redes / Fuentes",
        "valor": "Sin web"
      },
      {
        "clave": "Dolor real",
        "valor": "Gestión manual de cuotas; venta implica comité del residencial (ciclo largo)"
      },
      {
        "clave": "Criterio ROI",
        "valor": ""
      },
      {
        "clave": "Fuente original",
        "valor": "Auditoría 54 negocios (Auditoria_ASCK_54_negocios.xlsx) #42"
      },
      {
        "clave": "Veredicto",
        "valor": "LOTE 2"
      }
    ]
  },
  {
    "id": "P-master-146",
    "nombre": "Productos de Belleza El Olivo",
    "empresa": "Distribuidor B2B",
    "telefono": "+52 55 5253 2590",
    "correo": "",
    "estado": "Prospecto",
    "responsableId": "m-sebas-03",
    "ultimoContacto": "2026-07-16T05:38:06.056Z",
    "createdAt": "2026-07-16T05:38:06.056Z",
    "valorEstimado": 0,
    "prioridad": "Media",
    "fechaSeguimiento": "2026-07-16",
    "proximaAccion": "MADURAR",
    "camposPersonalizados": [
      {
        "clave": "Dirección",
        "valor": "El Olivo"
      },
      {
        "clave": "Redes / Fuentes",
        "valor": "Sin web"
      },
      {
        "clave": "Dolor real",
        "valor": "Cotizaciones B2B manuales por WhatsApp saturan la línea"
      },
      {
        "clave": "Criterio ROI",
        "valor": ""
      },
      {
        "clave": "Fuente original",
        "valor": "Auditoría 54 negocios (Auditoria_ASCK_54_negocios.xlsx) #47"
      },
      {
        "clave": "Veredicto",
        "valor": "MADURAR"
      }
    ]
  },
  {
    "id": "P-master-147",
    "nombre": "Katrina Nails Spa",
    "empresa": "Salón de uñas",
    "telefono": "+52 55 3195 6697",
    "correo": "",
    "estado": "Prospecto",
    "responsableId": "m-sebas-03",
    "ultimoContacto": "2026-07-16T05:38:06.056Z",
    "createdAt": "2026-07-16T05:38:06.056Z",
    "valorEstimado": 0,
    "prioridad": "Media",
    "fechaSeguimiento": "2026-07-16",
    "proximaAccion": "MADURAR",
    "camposPersonalizados": [
      {
        "clave": "Dirección",
        "valor": "El Olivo"
      },
      {
        "clave": "Redes / Fuentes",
        "valor": "Sin web; cuenta de redes privada"
      },
      {
        "clave": "Dolor real",
        "valor": "Portafolio oculto en cuenta privada"
      },
      {
        "clave": "Criterio ROI",
        "valor": ""
      },
      {
        "clave": "Fuente original",
        "valor": "Auditoría 54 negocios (Auditoria_ASCK_54_negocios.xlsx) #49"
      },
      {
        "clave": "Veredicto",
        "valor": "MADURAR"
      }
    ]
  },
  {
    "id": "P-master-148",
    "nombre": "Servicio Palo Solo",
    "empresa": "Servicio local / Taller (giro por confirmar)",
    "telefono": "+52 55 5290 3543",
    "correo": "",
    "estado": "Prospecto",
    "responsableId": "m-sebas-03",
    "ultimoContacto": "2026-07-16T05:38:06.056Z",
    "createdAt": "2026-07-16T05:38:06.056Z",
    "valorEstimado": 0,
    "prioridad": "Baja",
    "fechaSeguimiento": "2026-07-16",
    "proximaAccion": "LOTE 2",
    "camposPersonalizados": [
      {
        "clave": "Dirección",
        "valor": "Palo Solo, Huixquilucan"
      },
      {
        "clave": "Redes / Fuentes",
        "valor": "Sin web; FB + directorios"
      },
      {
        "clave": "Dolor real",
        "valor": "Consultas repetitivas de presupuesto por teléfono"
      },
      {
        "clave": "Criterio ROI",
        "valor": "CONFLICTO: Aud.54 lo trata como taller 'contactar hoy'; CRM exige confirmar giro exacto antes de demo"
      },
      {
        "clave": "Fuente original",
        "valor": "CRM limpio (ASCK_CRM_PROSPECTOS_LIMPIO_NUEVO.xlsx) P-007 + Auditoría 54 negocios (Auditoria_ASCK_54_negocios.xlsx) #25 + Clasificatoria (9_CLASIFICATORIA_PROSPECTOS.xlsx) C-01 + Indexados verificación (prospectos_asck_indexados_3_nuevos.csv)"
      },
      {
        "clave": "Veredicto",
        "valor": "LOTE 2"
      }
    ]
  },
  {
    "id": "P-master-149",
    "nombre": "Hub Gaming / posible HuixquiGames",
    "empresa": "Gaming hub / Entretenimiento",
    "telefono": "No encontrado público",
    "correo": "",
    "estado": "Prospecto",
    "responsableId": "m-sebas-03",
    "ultimoContacto": "2026-07-16T05:38:06.056Z",
    "createdAt": "2026-07-16T05:38:06.056Z",
    "valorEstimado": 0,
    "prioridad": "Baja",
    "fechaSeguimiento": "2026-07-16",
    "proximaAccion": "DESCARTADO",
    "camposPersonalizados": [
      {
        "clave": "Dirección",
        "valor": "Huixquilucan Centro"
      },
      {
        "clave": "Redes / Fuentes",
        "valor": "FB posible: Original Game Play HuixquiGames (no confirmado)"
      },
      {
        "clave": "Dolor real",
        "valor": "Reservas, torneos, membresías sin sistema; identidad del local sin confirmar"
      },
      {
        "clave": "Criterio ROI",
        "valor": "Confirmar nombre exacto y actividad antes de demo | [AUD 2026-07-13] No localizable públicamente (Excel ya lo dudaba)"
      },
      {
        "clave": "Fuente original",
        "valor": "CRM limpio (ASCK_CRM_PROSPECTOS_LIMPIO_NUEVO.xlsx) P-009 + Clasificatoria (9_CLASIFICATORIA_PROSPECTOS.xlsx) C-02 + Indexados verificación (prospectos_asck_indexados_3_nuevos.csv)"
      },
      {
        "clave": "Veredicto",
        "valor": "DESCARTADO"
      }
    ]
  },
  {
    "id": "P-master-150",
    "nombre": "Estética Antony",
    "empresa": "Estética local",
    "telefono": "+52 55 8379 7603",
    "correo": "",
    "estado": "Prospecto",
    "responsableId": "m-sebas-03",
    "ultimoContacto": "2026-07-16T05:38:06.056Z",
    "createdAt": "2026-07-16T05:38:06.056Z",
    "valorEstimado": 0,
    "prioridad": "Baja",
    "fechaSeguimiento": "2026-07-16",
    "proximaAccion": "MADURAR",
    "camposPersonalizados": [
      {
        "clave": "Dirección",
        "valor": "El Olivo"
      },
      {
        "clave": "Redes / Fuentes",
        "valor": "Sin web; huella digital casi nula"
      },
      {
        "clave": "Dolor real",
        "valor": "Presencia básica; riesgo de desplazamiento frente a cadenas"
      },
      {
        "clave": "Criterio ROI",
        "valor": "CONFLICTO: Aud.54 'contactar hoy' vs CRM 'condicional débil'; indexados pide verificar teléfono primero"
      },
      {
        "clave": "Fuente original",
        "valor": "CRM limpio (ASCK_CRM_PROSPECTOS_LIMPIO_NUEVO.xlsx) P-011 + Auditoría 54 negocios (Auditoria_ASCK_54_negocios.xlsx) #51 + Clasificatoria (9_CLASIFICATORIA_PROSPECTOS.xlsx) C-03 + Indexados verificación (prospectos_asck_indexados_3_nuevos.csv)"
      },
      {
        "clave": "Veredicto",
        "valor": "MADURAR"
      }
    ]
  },
  {
    "id": "P-master-151",
    "nombre": "The Barber's Spa",
    "empresa": "Barbería / Spa premium",
    "telefono": "+52 55 4590 4645",
    "correo": "",
    "estado": "Prospecto",
    "responsableId": "m-sebas-03",
    "ultimoContacto": "2026-07-16T05:38:06.056Z",
    "createdAt": "2026-07-16T05:38:06.056Z",
    "valorEstimado": 0,
    "prioridad": "Baja",
    "fechaSeguimiento": "2026-07-16",
    "proximaAccion": "DESCARTADO",
    "camposPersonalizados": [
      {
        "clave": "Dirección",
        "valor": "Tecamachalco"
      },
      {
        "clave": "Redes / Fuentes",
        "valor": "Sin web; solo Facebook"
      },
      {
        "clave": "Dolor real",
        "valor": "Depende de Facebook; público ejecutivo de alto poder adquisitivo"
      },
      {
        "clave": "Criterio ROI",
        "valor": "Regla ASCK veta barberías, pero es formato premium: validar excepción | [AUD 2026-07-13] Cadena The Barber´s Spa multi-sucursal: no es PyME objetivo"
      },
      {
        "clave": "Fuente original",
        "valor": "Auditoría 54 negocios (Auditoria_ASCK_54_negocios.xlsx) #12"
      },
      {
        "clave": "Veredicto",
        "valor": "DESCARTADO"
      }
    ]
  },
  {
    "id": "P-master-152",
    "nombre": "La Bonvi",
    "empresa": "Taquería / Antojería gourmet",
    "telefono": "Sin teléfono (solo IG DM)",
    "correo": "",
    "estado": "Prospecto",
    "responsableId": "m-sebas-03",
    "ultimoContacto": "2026-07-16T05:38:06.056Z",
    "createdAt": "2026-07-16T05:38:06.056Z",
    "valorEstimado": 0,
    "prioridad": "Baja",
    "fechaSeguimiento": "2026-07-16",
    "proximaAccion": "MADURAR",
    "camposPersonalizados": [
      {
        "clave": "Dirección",
        "valor": "Lomas de Chapultepec"
      },
      {
        "clave": "Redes / Fuentes",
        "valor": "Sin web; IG DM"
      },
      {
        "clave": "Dolor real",
        "valor": "Sin canal de contacto directo verificable"
      },
      {
        "clave": "Criterio ROI",
        "valor": "Buscar teléfono real antes de invertir tiempo | [AUD 2026-07-13] 4.9/3,303: no tienen dolor de captación; sin tel para contactar"
      },
      {
        "clave": "Fuente original",
        "valor": "Auditoría 54 negocios (Auditoria_ASCK_54_negocios.xlsx) #37"
      },
      {
        "clave": "Veredicto",
        "valor": "MADURAR"
      }
    ]
  },
  {
    "id": "P-master-153",
    "nombre": "Montielle Beauty Salon",
    "empresa": "Salón de belleza",
    "telefono": "No visible",
    "correo": "",
    "estado": "Prospecto",
    "responsableId": "m-sebas-03",
    "ultimoContacto": "2026-07-16T05:38:06.056Z",
    "createdAt": "2026-07-16T05:38:06.056Z",
    "valorEstimado": 0,
    "prioridad": "Baja",
    "fechaSeguimiento": "2026-07-16",
    "proximaAccion": "MADURAR",
    "camposPersonalizados": [
      {
        "clave": "Dirección",
        "valor": "El Olivo"
      },
      {
        "clave": "Redes / Fuentes",
        "valor": "Sin web ni teléfono"
      },
      {
        "clave": "Dolor real",
        "valor": "Aislamiento digital total"
      },
      {
        "clave": "Criterio ROI",
        "valor": "Visita física para obtener teléfono; sin canal no hay probabilidad calculable"
      },
      {
        "clave": "Fuente original",
        "valor": "Auditoría 54 negocios (Auditoria_ASCK_54_negocios.xlsx) #50"
      },
      {
        "clave": "Veredicto",
        "valor": "MADURAR"
      }
    ]
  },
  {
    "id": "P-master-154",
    "nombre": "Mezcla Concept Store",
    "empresa": "Boutique de ropa premium",
    "telefono": "+52 624 212 0214",
    "correo": "",
    "estado": "Prospecto",
    "responsableId": "m-sebas-03",
    "ultimoContacto": "2026-07-16T05:38:06.056Z",
    "createdAt": "2026-07-16T05:38:06.056Z",
    "valorEstimado": 0,
    "prioridad": "Baja",
    "fechaSeguimiento": "2026-07-16",
    "proximaAccion": "CONTACTAR YA",
    "camposPersonalizados": [
      {
        "clave": "Dirección",
        "valor": "Interlomas"
      },
      {
        "clave": "Redes / Fuentes",
        "valor": "Sin web"
      },
      {
        "clave": "Dolor real",
        "valor": "Prendas premium ocultas fuera de internet"
      },
      {
        "clave": "Criterio ROI",
        "valor": "VERIFICAR teléfono: lada 624 es de La Paz, BCS | [AUD 2026-07-13] Tel lada 624 (Los Cabos) coincide Maps=Excel; dueño extranjero"
      },
      {
        "clave": "Fuente original",
        "valor": "Auditoría 54 negocios (Auditoria_ASCK_54_negocios.xlsx) #52"
      },
      {
        "clave": "Veredicto",
        "valor": "CONTACTAR YA"
      }
    ]
  },
  {
    "id": "P-master-155",
    "nombre": "Carwash GO! Autolavado",
    "empresa": "Autolavado / Detallado",
    "telefono": "+52 55 6165 9209",
    "correo": "",
    "estado": "Prospecto",
    "responsableId": "m-sebas-03",
    "ultimoContacto": "2026-07-16T05:38:06.056Z",
    "createdAt": "2026-07-16T05:38:06.056Z",
    "valorEstimado": 0,
    "prioridad": "Baja",
    "fechaSeguimiento": "2026-07-16",
    "proximaAccion": "LOTE 2",
    "camposPersonalizados": [
      {
        "clave": "Dirección",
        "valor": "Huixquilucan Centro"
      },
      {
        "clave": "Redes / Fuentes",
        "valor": "Sin web"
      },
      {
        "clave": "Dolor real",
        "valor": "Sin datos de reputación verificables (rating no visible)"
      },
      {
        "clave": "Criterio ROI",
        "valor": "Inconsistencia interna de Gemini (100/100 sin datos); verificar ficha Maps"
      },
      {
        "clave": "Fuente original",
        "valor": "Auditoría 54 negocios (Auditoria_ASCK_54_negocios.xlsx) #53"
      },
      {
        "clave": "Veredicto",
        "valor": "LOTE 2"
      }
    ]
  },
  {
    "id": "P-master-156",
    "nombre": "Animalitos Hospital Veterinario",
    "empresa": "Hospital veterinario 24h",
    "telefono": "+52 55 9025 2000",
    "correo": "",
    "estado": "Prospecto",
    "responsableId": "m-sebas-03",
    "ultimoContacto": "2026-07-16T05:38:06.056Z",
    "createdAt": "2026-07-16T05:38:06.056Z",
    "valorEstimado": 0,
    "prioridad": "Baja",
    "fechaSeguimiento": "2026-07-16",
    "proximaAccion": "MADURAR",
    "camposPersonalizados": [
      {
        "clave": "Dirección",
        "valor": "Interlomas"
      },
      {
        "clave": "Redes / Fuentes",
        "valor": "Sí: animalitosmexico.com (anticuado)"
      },
      {
        "clave": "Dolor real",
        "valor": "UX móvil deficiente, pero >100 reseñas: probablemente ya tiene proveedor TI"
      },
      {
        "clave": "Criterio ROI",
        "valor": "Confirmar si administran web interna o vía agencia | [AUD 2026-07-13] Corporativo multi-sede (6 sucursales); web moderna, no \"anticuada\""
      },
      {
        "clave": "Fuente original",
        "valor": "Auditoría 54 negocios (Auditoria_ASCK_54_negocios.xlsx) #8"
      },
      {
        "clave": "Veredicto",
        "valor": "MADURAR"
      }
    ]
  },
  {
    "id": "P-master-157",
    "nombre": "MR76 BarberShop",
    "empresa": "Barbería",
    "telefono": "+52 55 3382 9092",
    "correo": "",
    "estado": "Prospecto",
    "responsableId": "m-sebas-03",
    "ultimoContacto": "2026-07-16T05:38:06.056Z",
    "createdAt": "2026-07-16T05:38:06.056Z",
    "valorEstimado": 0,
    "prioridad": "Baja",
    "fechaSeguimiento": "2026-07-16",
    "proximaAccion": "DESCARTADO",
    "camposPersonalizados": [
      {
        "clave": "Dirección",
        "valor": "Naucalpan"
      },
      {
        "clave": "Redes / Fuentes",
        "valor": "Usa AgendaPro (rentado)"
      },
      {
        "clave": "Dolor real",
        "valor": "Paga renta a un tercero pero el sistema funciona; venta de reemplazo difícil"
      },
      {
        "clave": "Criterio ROI",
        "valor": "VERIFICAR teléfono: idéntico al de Masaje Tecamachalco (#15), probable error de captura. Regla ASCK: barberías fuera por defecto | [AUD 2026-07-13] Cita online ya: pitch muerto (confirma Excel)"
      },
      {
        "clave": "Fuente original",
        "valor": "Auditoría 54 negocios (Auditoria_ASCK_54_negocios.xlsx) #16"
      },
      {
        "clave": "Veredicto",
        "valor": "DESCARTADO"
      }
    ]
  },
  {
    "id": "P-master-158",
    "nombre": "Speed Service (Naucalpan)",
    "empresa": "Taller mecánico (franquicia)",
    "telefono": "—",
    "correo": "",
    "estado": "Prospecto",
    "responsableId": "m-sebas-03",
    "ultimoContacto": "2026-07-16T05:38:06.056Z",
    "createdAt": "2026-07-16T05:38:06.056Z",
    "valorEstimado": 0,
    "prioridad": "Baja",
    "fechaSeguimiento": "2026-07-16",
    "proximaAccion": "DESCARTADO",
    "camposPersonalizados": [
      {
        "clave": "Dirección",
        "valor": "Naucalpan"
      },
      {
        "clave": "Redes / Fuentes",
        "valor": "Sí (score web 7/10)"
      },
      {
        "clave": "Dolor real",
        "valor": "Franquicia con web; poco margen"
      },
      {
        "clave": "Criterio ROI",
        "valor": "[AUD 2026-07-13] Franquicia multi-ficha (Toreo/Circuito) con web y agenda"
      },
      {
        "clave": "Fuente original",
        "valor": "Ranking scoring (table(2).csv) #18 + Tier list (4_TIER_LIST_PROSPECTOS.md)"
      },
      {
        "clave": "Veredicto",
        "valor": "DESCARTADO"
      }
    ]
  },
  {
    "id": "P-master-159",
    "nombre": "Speed Pro Taller Mecánico",
    "empresa": "Taller mecánico general",
    "telefono": "—",
    "correo": "",
    "estado": "Prospecto",
    "responsableId": "m-sebas-03",
    "ultimoContacto": "2026-07-16T05:38:06.056Z",
    "createdAt": "2026-07-16T05:38:06.056Z",
    "valorEstimado": 0,
    "prioridad": "Baja",
    "fechaSeguimiento": "2026-07-16",
    "proximaAccion": "REVISAR KEVIN",
    "camposPersonalizados": [
      {
        "clave": "Dirección",
        "valor": "Por confirmar"
      },
      {
        "clave": "Redes / Fuentes",
        "valor": "Débil (score web 3/10)"
      },
      {
        "clave": "Dolor real",
        "valor": "Pocas señales de flujo/ticket; score total 4.8"
      },
      {
        "clave": "Criterio ROI",
        "valor": "[AUD 2026-07-13] Aclarar cuál es el prospecto antes de cualquier acción"
      },
      {
        "clave": "Fuente original",
        "valor": "Ranking scoring (table(2).csv) #19 + Tier list (4_TIER_LIST_PROSPECTOS.md)"
      },
      {
        "clave": "Veredicto",
        "valor": "REVISAR KEVIN"
      }
    ]
  },
  {
    "id": "P-master-160",
    "nombre": "Barbería El Olivo",
    "empresa": "Barbería tradicional",
    "telefono": "+52 55 8753 8543",
    "correo": "",
    "estado": "Prospecto",
    "responsableId": "m-sebas-03",
    "ultimoContacto": "2026-07-16T05:38:06.056Z",
    "createdAt": "2026-07-16T05:38:06.056Z",
    "valorEstimado": 0,
    "prioridad": "Baja",
    "fechaSeguimiento": "2026-07-16",
    "proximaAccion": "MADURAR",
    "camposPersonalizados": [
      {
        "clave": "Dirección",
        "valor": "El Olivo"
      },
      {
        "clave": "Redes / Fuentes",
        "valor": "Sin web; Fresha + directorios"
      },
      {
        "clave": "Dolor real",
        "valor": "Desorden de turnos en fin de semana"
      },
      {
        "clave": "Criterio ROI",
        "valor": "CONFLICTO: Aud.54 lo puso como mejor lead; regla ASCK posterior descarta barberías por defecto"
      },
      {
        "clave": "Fuente original",
        "valor": "CRM limpio (ASCK_CRM_PROSPECTOS_LIMPIO_NUEVO.xlsx) D-002 + Auditoría 54 negocios (Auditoria_ASCK_54_negocios.xlsx) #48 + Indexados verificación (prospectos_asck_indexados_3_nuevos.csv)"
      },
      {
        "clave": "Veredicto",
        "valor": "MADURAR"
      }
    ]
  },
  {
    "id": "P-master-161",
    "nombre": "The Arthur Barber Shop",
    "empresa": "Barbería",
    "telefono": "+52 55 5373 7789",
    "correo": "",
    "estado": "Prospecto",
    "responsableId": "m-sebas-03",
    "ultimoContacto": "2026-07-16T05:38:06.056Z",
    "createdAt": "2026-07-16T05:38:06.056Z",
    "valorEstimado": 0,
    "prioridad": "Baja",
    "fechaSeguimiento": "2026-07-16",
    "proximaAccion": "MADURAR",
    "camposPersonalizados": [
      {
        "clave": "Dirección",
        "valor": "Naucalpan"
      },
      {
        "clave": "Redes / Fuentes",
        "valor": "Sin web; Fresha + AgendaPro"
      },
      {
        "clave": "Dolor real",
        "valor": "Coordinación 100% telefónica, +40 reseñas"
      },
      {
        "clave": "Criterio ROI",
        "valor": "CONFLICTO: ídem — regla barberías descarta pese a 'contactar hoy' de Aud.54"
      },
      {
        "clave": "Fuente original",
        "valor": "CRM limpio (ASCK_CRM_PROSPECTOS_LIMPIO_NUEVO.xlsx) D-003 + Auditoría 54 negocios (Auditoria_ASCK_54_negocios.xlsx) #17 + Indexados verificación (prospectos_asck_indexados_3_nuevos.csv)"
      },
      {
        "clave": "Veredicto",
        "valor": "MADURAR"
      }
    ]
  },
  {
    "id": "P-master-162",
    "nombre": "Barber IK / Barber LK",
    "empresa": "Barbería / Hair studio",
    "telefono": "+52 56 4000 1122",
    "correo": "",
    "estado": "Prospecto",
    "responsableId": "m-sebas-03",
    "ultimoContacto": "2026-07-16T05:38:06.056Z",
    "createdAt": "2026-07-16T05:38:06.056Z",
    "valorEstimado": 0,
    "prioridad": "Baja",
    "fechaSeguimiento": "2026-07-16",
    "proximaAccion": "LOTE 2",
    "camposPersonalizados": [
      {
        "clave": "Dirección",
        "valor": "Naucalpan"
      },
      {
        "clave": "Redes / Fuentes",
        "valor": "Sin web; IG muy activo, FB Salon & Barber LK"
      },
      {
        "clave": "Dolor real",
        "valor": "Depende de Instagram DM, sin base de datos"
      },
      {
        "clave": "Criterio ROI",
        "valor": "CONFLICTO: ídem — regla barberías"
      },
      {
        "clave": "Fuente original",
        "valor": "CRM limpio (ASCK_CRM_PROSPECTOS_LIMPIO_NUEVO.xlsx) D-004 + Auditoría 54 negocios (Auditoria_ASCK_54_negocios.xlsx) #18 + Indexados verificación (prospectos_asck_indexados_3_nuevos.csv)"
      },
      {
        "clave": "Veredicto",
        "valor": "LOTE 2"
      }
    ]
  },
  {
    "id": "P-master-163",
    "nombre": "The Barber's House",
    "empresa": "Barbería",
    "telefono": "+52 55 5373 5421",
    "correo": "",
    "estado": "Prospecto",
    "responsableId": "m-sebas-03",
    "ultimoContacto": "2026-07-16T05:38:06.056Z",
    "createdAt": "2026-07-16T05:38:06.056Z",
    "valorEstimado": 0,
    "prioridad": "Baja",
    "fechaSeguimiento": "2026-07-16",
    "proximaAccion": "LOTE 2",
    "camposPersonalizados": [
      {
        "clave": "Dirección",
        "valor": "Naucalpan"
      },
      {
        "clave": "Redes / Fuentes",
        "valor": "Sin web; IG activo"
      },
      {
        "clave": "Dolor real",
        "valor": "Todo manual por DM; solo 5 reseñas"
      },
      {
        "clave": "Criterio ROI",
        "valor": "Regla ASCK: barberías fuera por defecto"
      },
      {
        "clave": "Fuente original",
        "valor": "Auditoría 54 negocios (Auditoria_ASCK_54_negocios.xlsx) #20"
      },
      {
        "clave": "Veredicto",
        "valor": "LOTE 2"
      }
    ]
  },
  {
    "id": "P-master-164",
    "nombre": "Costuras Perronas",
    "empresa": "Costuras / Composturas",
    "telefono": "No encontrado público",
    "correo": "",
    "estado": "Prospecto",
    "responsableId": "m-sebas-03",
    "ultimoContacto": "2026-07-16T05:38:06.056Z",
    "createdAt": "2026-07-16T05:38:06.056Z",
    "valorEstimado": 0,
    "prioridad": "Baja",
    "fechaSeguimiento": "2026-07-16",
    "proximaAccion": "DESCARTADO",
    "camposPersonalizados": [
      {
        "clave": "Dirección",
        "valor": "Huixquilucan Centro"
      },
      {
        "clave": "Redes / Fuentes",
        "valor": "Sin presencia inequívoca"
      },
      {
        "clave": "Dolor real",
        "valor": "Ticket bajo y flujo incierto"
      },
      {
        "clave": "Criterio ROI",
        "valor": "Regla ASCK: costuras fuera por defecto; solo reconsiderar si volumen alto | [AUD 2026-07-13] No localizable públicamente"
      },
      {
        "clave": "Fuente original",
        "valor": "CRM limpio (ASCK_CRM_PROSPECTOS_LIMPIO_NUEVO.xlsx) D-001 + Indexados verificación (prospectos_asck_indexados_3_nuevos.csv)"
      },
      {
        "clave": "Veredicto",
        "valor": "DESCARTADO"
      }
    ]
  },
  {
    "id": "P-master-165",
    "nombre": "Clínica Dental iCero",
    "empresa": "Dental / Clínica",
    "telefono": "+52 55 5401 9029",
    "correo": "",
    "estado": "Prospecto",
    "responsableId": "m-sebas-03",
    "ultimoContacto": "2026-07-16T05:38:06.056Z",
    "createdAt": "2026-07-16T05:38:06.056Z",
    "valorEstimado": 0,
    "prioridad": "Baja",
    "fechaSeguimiento": "2026-07-16",
    "proximaAccion": "LOTE 2",
    "camposPersonalizados": [
      {
        "clave": "Dirección",
        "valor": "Huixquilucan Centro"
      },
      {
        "clave": "Redes / Fuentes",
        "valor": "Sí: icerodent.com (verificado activo)"
      },
      {
        "clave": "Dolor real",
        "valor": "Ya tiene sitio funcional"
      },
      {
        "clave": "Criterio ROI",
        "valor": "Descartado: monitorear trimestralmente | [AUD 2026-07-13] Pitch: upgrade de Google Sites a web real + agenda"
      },
      {
        "clave": "Fuente original",
        "valor": "Auditoría 54 negocios (Auditoria_ASCK_54_negocios.xlsx) #5"
      },
      {
        "clave": "Veredicto",
        "valor": "LOTE 2"
      }
    ]
  },
  {
    "id": "P-master-166",
    "nombre": "Vetalia Interlomas",
    "empresa": "Veterinaria",
    "telefono": "+52 55 9419 6449",
    "correo": "",
    "estado": "Prospecto",
    "responsableId": "m-sebas-03",
    "ultimoContacto": "2026-07-16T05:38:06.056Z",
    "createdAt": "2026-07-16T05:38:06.056Z",
    "valorEstimado": 0,
    "prioridad": "Baja",
    "fechaSeguimiento": "2026-07-16",
    "proximaAccion": "DESCARTADO",
    "camposPersonalizados": [
      {
        "clave": "Dirección",
        "valor": "Interlomas"
      },
      {
        "clave": "Redes / Fuentes",
        "valor": "Sí: vetalia.vet (robusto, 24h, pagos)"
      },
      {
        "clave": "Dolor real",
        "valor": "Sin dolor: infraestructura corporativa sólida"
      },
      {
        "clave": "Criterio ROI",
        "valor": "[AUD 2026-07-13] Corporativo; sin dolor (confirma Excel)"
      },
      {
        "clave": "Fuente original",
        "valor": "Auditoría 54 negocios (Auditoria_ASCK_54_negocios.xlsx) #7"
      },
      {
        "clave": "Veredicto",
        "valor": "DESCARTADO"
      }
    ]
  },
  {
    "id": "P-master-167",
    "nombre": "Get Spa Tecamachalco",
    "empresa": "Spa",
    "telefono": "+52 55 4947 4872",
    "correo": "",
    "estado": "Prospecto",
    "responsableId": "m-sebas-03",
    "ultimoContacto": "2026-07-16T05:38:06.056Z",
    "createdAt": "2026-07-16T05:38:06.056Z",
    "valorEstimado": 0,
    "prioridad": "Baja",
    "fechaSeguimiento": "2026-07-16",
    "proximaAccion": "MADURAR",
    "camposPersonalizados": [
      {
        "clave": "Dirección",
        "valor": "Tecamachalco"
      },
      {
        "clave": "Redes / Fuentes",
        "valor": "Sí: gettspa.com (con pagos)"
      },
      {
        "clave": "Dolor real",
        "valor": "Ecosistema digital resuelto"
      },
      {
        "clave": "Criterio ROI",
        "valor": "[AUD 2026-07-13] Cadena/franquicia 7+ sucursales"
      },
      {
        "clave": "Fuente original",
        "valor": "Auditoría 54 negocios (Auditoria_ASCK_54_negocios.xlsx) #11"
      },
      {
        "clave": "Veredicto",
        "valor": "MADURAR"
      }
    ]
  },
  {
    "id": "P-master-168",
    "nombre": "Ananda Spa",
    "empresa": "Spa",
    "telefono": "+52 55 4856 5657",
    "correo": "",
    "estado": "Prospecto",
    "responsableId": "m-sebas-03",
    "ultimoContacto": "2026-07-16T05:38:06.056Z",
    "createdAt": "2026-07-16T05:38:06.056Z",
    "valorEstimado": 0,
    "prioridad": "Baja",
    "fechaSeguimiento": "2026-07-16",
    "proximaAccion": "DESCARTADO",
    "camposPersonalizados": [
      {
        "clave": "Dirección",
        "valor": "Tecamachalco"
      },
      {
        "clave": "Redes / Fuentes",
        "valor": "Sí: spaananda.com (robusto, 5.0)"
      },
      {
        "clave": "Dolor real",
        "valor": "Ecosistema resuelto"
      },
      {
        "clave": "Criterio ROI",
        "valor": "[AUD 2026-07-13] Ya venden/reservan online"
      },
      {
        "clave": "Fuente original",
        "valor": "Auditoría 54 negocios (Auditoria_ASCK_54_negocios.xlsx) #13"
      },
      {
        "clave": "Veredicto",
        "valor": "DESCARTADO"
      }
    ]
  },
  {
    "id": "P-master-169",
    "nombre": "Ohana Masajes",
    "empresa": "Centro de masajes",
    "telefono": "+52 55 1116 5805",
    "correo": "",
    "estado": "Prospecto",
    "responsableId": "m-sebas-03",
    "ultimoContacto": "2026-07-16T05:38:06.056Z",
    "createdAt": "2026-07-16T05:38:06.056Z",
    "valorEstimado": 0,
    "prioridad": "Baja",
    "fechaSeguimiento": "2026-07-16",
    "proximaAccion": "DESCARTADO",
    "camposPersonalizados": [
      {
        "clave": "Dirección",
        "valor": "Tecamachalco"
      },
      {
        "clave": "Redes / Fuentes",
        "valor": "Sí: ohanaholistico.com (verificado)"
      },
      {
        "clave": "Dolor real",
        "valor": "Sin dolor digital"
      },
      {
        "clave": "Criterio ROI",
        "valor": "[AUD 2026-07-13] ohanaholistico.com con booking por especialista/día/hora"
      },
      {
        "clave": "Fuente original",
        "valor": "Auditoría 54 negocios (Auditoria_ASCK_54_negocios.xlsx) #14"
      },
      {
        "clave": "Veredicto",
        "valor": "DESCARTADO"
      }
    ]
  },
  {
    "id": "P-master-170",
    "nombre": "Masaje Tecamachalco (+Guapo México)",
    "empresa": "Centro de masajes (cadena)",
    "telefono": "+52 55 3382 9092",
    "correo": "",
    "estado": "Prospecto",
    "responsableId": "m-sebas-03",
    "ultimoContacto": "2026-07-16T05:38:06.056Z",
    "createdAt": "2026-07-16T05:38:06.056Z",
    "valorEstimado": 0,
    "prioridad": "Baja",
    "fechaSeguimiento": "2026-07-16",
    "proximaAccion": "REVISAR KEVIN",
    "camposPersonalizados": [
      {
        "clave": "Dirección",
        "valor": "Tecamachalco"
      },
      {
        "clave": "Redes / Fuentes",
        "valor": "Sí: masguapo.mx (multi-sede)"
      },
      {
        "clave": "Dolor real",
        "valor": "Cadena regional centralizada"
      },
      {
        "clave": "Criterio ROI",
        "valor": "Su teléfono aparece duplicado en MR76 BarberShop | [AUD 2026-07-13] CONFLICTO TEL: Maps 984 593 3447 vs Excel 55 3382 9092 (¡ese tel es el de MR76!)"
      },
      {
        "clave": "Fuente original",
        "valor": "Auditoría 54 negocios (Auditoria_ASCK_54_negocios.xlsx) #15"
      },
      {
        "clave": "Veredicto",
        "valor": "REVISAR KEVIN"
      }
    ]
  },
  {
    "id": "P-master-171",
    "nombre": "Fade Masters",
    "empresa": "Barbería de franquicia",
    "telefono": "+52 55 2296 1131",
    "correo": "",
    "estado": "Prospecto",
    "responsableId": "m-sebas-03",
    "ultimoContacto": "2026-07-16T05:38:06.056Z",
    "createdAt": "2026-07-16T05:38:06.056Z",
    "valorEstimado": 0,
    "prioridad": "Baja",
    "fechaSeguimiento": "2026-07-16",
    "proximaAccion": "DESCARTADO",
    "camposPersonalizados": [
      {
        "clave": "Dirección",
        "valor": "Naucalpan"
      },
      {
        "clave": "Redes / Fuentes",
        "valor": "Sí: thefademasters.com (multi-sede)"
      },
      {
        "clave": "Dolor real",
        "valor": "Blindaje corporativo"
      },
      {
        "clave": "Criterio ROI",
        "valor": "[AUD 2026-07-13] Franquicia con reservas online"
      },
      {
        "clave": "Fuente original",
        "valor": "Auditoría 54 negocios (Auditoria_ASCK_54_negocios.xlsx) #19"
      },
      {
        "clave": "Veredicto",
        "valor": "DESCARTADO"
      }
    ]
  },
  {
    "id": "P-master-172",
    "nombre": "Terraza Brazza",
    "empresa": "Restaurante",
    "telefono": "+52 55 7430 0047",
    "correo": "",
    "estado": "Prospecto",
    "responsableId": "m-sebas-03",
    "ultimoContacto": "2026-07-16T05:38:06.056Z",
    "createdAt": "2026-07-16T05:38:06.056Z",
    "valorEstimado": 0,
    "prioridad": "Baja",
    "fechaSeguimiento": "2026-07-16",
    "proximaAccion": "DESCARTADO",
    "camposPersonalizados": [
      {
        "clave": "Dirección",
        "valor": "Cuajimalpa"
      },
      {
        "clave": "Redes / Fuentes",
        "valor": "Sí: terrazabrazza.mx (>100 reseñas)"
      },
      {
        "clave": "Dolor real",
        "valor": "Web ya funcional"
      },
      {
        "clave": "Criterio ROI",
        "valor": ""
      },
      {
        "clave": "Fuente original",
        "valor": "Auditoría 54 negocios (Auditoria_ASCK_54_negocios.xlsx) #21"
      },
      {
        "clave": "Veredicto",
        "valor": "DESCARTADO"
      }
    ]
  },
  {
    "id": "P-master-173",
    "nombre": "El T3mplo Santa Fe",
    "empresa": "Gimnasio studio",
    "telefono": "+52 55 4028 9924",
    "correo": "",
    "estado": "Prospecto",
    "responsableId": "m-sebas-03",
    "ultimoContacto": "2026-07-16T05:38:06.056Z",
    "createdAt": "2026-07-16T05:38:06.056Z",
    "valorEstimado": 0,
    "prioridad": "Baja",
    "fechaSeguimiento": "2026-07-16",
    "proximaAccion": "DESCARTADO",
    "camposPersonalizados": [
      {
        "clave": "Dirección",
        "valor": "Santa Fe"
      },
      {
        "clave": "Redes / Fuentes",
        "valor": "Sí: elt3mplo.com (con pagos)"
      },
      {
        "clave": "Dolor real",
        "valor": "Empresa consolidada"
      },
      {
        "clave": "Criterio ROI",
        "valor": ""
      },
      {
        "clave": "Fuente original",
        "valor": "Auditoría 54 negocios (Auditoria_ASCK_54_negocios.xlsx) #23"
      },
      {
        "clave": "Veredicto",
        "valor": "DESCARTADO"
      }
    ]
  },
  {
    "id": "P-master-174",
    "nombre": "Café del Parque",
    "empresa": "Cafetería",
    "telefono": "+52 55 2624 1160",
    "correo": "",
    "estado": "Prospecto",
    "responsableId": "m-sebas-03",
    "ultimoContacto": "2026-07-16T05:38:06.056Z",
    "createdAt": "2026-07-16T05:38:06.056Z",
    "valorEstimado": 0,
    "prioridad": "Baja",
    "fechaSeguimiento": "2026-07-16",
    "proximaAccion": "DESCARTADO",
    "camposPersonalizados": [
      {
        "clave": "Dirección",
        "valor": "Polanco"
      },
      {
        "clave": "Redes / Fuentes",
        "valor": "Sí: cafedelparque.com"
      },
      {
        "clave": "Dolor real",
        "valor": "Web activa"
      },
      {
        "clave": "Criterio ROI",
        "valor": ""
      },
      {
        "clave": "Fuente original",
        "valor": "Auditoría 54 negocios (Auditoria_ASCK_54_negocios.xlsx) #34"
      },
      {
        "clave": "Veredicto",
        "valor": "DESCARTADO"
      }
    ]
  },
  {
    "id": "P-master-175",
    "nombre": "La Once Mil — Lomas",
    "empresa": "Taquería premium",
    "telefono": "No visible",
    "correo": "",
    "estado": "Prospecto",
    "responsableId": "m-sebas-03",
    "ultimoContacto": "2026-07-16T05:38:06.056Z",
    "createdAt": "2026-07-16T05:38:06.056Z",
    "valorEstimado": 0,
    "prioridad": "Baja",
    "fechaSeguimiento": "2026-07-16",
    "proximaAccion": "DESCARTADO",
    "camposPersonalizados": [
      {
        "clave": "Dirección",
        "valor": "Lomas de Chapultepec"
      },
      {
        "clave": "Redes / Fuentes",
        "valor": "Sí: laoncemiltaqueria.shop (e-commerce)"
      },
      {
        "clave": "Dolor real",
        "valor": "E-commerce resuelto"
      },
      {
        "clave": "Criterio ROI",
        "valor": "[AUD 2026-07-13] Sin tel público (confirmado)"
      },
      {
        "clave": "Fuente original",
        "valor": "Auditoría 54 negocios (Auditoria_ASCK_54_negocios.xlsx) #36"
      },
      {
        "clave": "Veredicto",
        "valor": "DESCARTADO"
      }
    ]
  },
  {
    "id": "P-master-176",
    "nombre": "Taquería La Onda",
    "empresa": "Taquería",
    "telefono": "+52 55 5520 9146",
    "correo": "",
    "estado": "Prospecto",
    "responsableId": "m-sebas-03",
    "ultimoContacto": "2026-07-16T05:38:06.056Z",
    "createdAt": "2026-07-16T05:38:06.056Z",
    "valorEstimado": 0,
    "prioridad": "Baja",
    "fechaSeguimiento": "2026-07-16",
    "proximaAccion": "DESCARTADO",
    "camposPersonalizados": [
      {
        "clave": "Dirección",
        "valor": "Lomas de Chapultepec"
      },
      {
        "clave": "Redes / Fuentes",
        "valor": "Sí: laonda.com.mx (cadena, >200 reseñas)"
      },
      {
        "clave": "Dolor real",
        "valor": "Cadena con proveedor propio"
      },
      {
        "clave": "Criterio ROI",
        "valor": ""
      },
      {
        "clave": "Fuente original",
        "valor": "Auditoría 54 negocios (Auditoria_ASCK_54_negocios.xlsx) #38"
      },
      {
        "clave": "Veredicto",
        "valor": "DESCARTADO"
      }
    ]
  },
  {
    "id": "P-master-177",
    "nombre": "Cycology",
    "empresa": "Indoor cycling studio",
    "telefono": "+52 55 3920 3264",
    "correo": "",
    "estado": "Prospecto",
    "responsableId": "m-sebas-03",
    "ultimoContacto": "2026-07-16T05:38:06.056Z",
    "createdAt": "2026-07-16T05:38:06.056Z",
    "valorEstimado": 0,
    "prioridad": "Baja",
    "fechaSeguimiento": "2026-07-16",
    "proximaAccion": "DESCARTADO",
    "camposPersonalizados": [
      {
        "clave": "Dirección",
        "valor": "Bosque Real"
      },
      {
        "clave": "Redes / Fuentes",
        "valor": "Sí: cycology.mx (premium, de agencia)"
      },
      {
        "clave": "Dolor real",
        "valor": "Ecosistema premium resuelto"
      },
      {
        "clave": "Criterio ROI",
        "valor": ""
      },
      {
        "clave": "Fuente original",
        "valor": "Auditoría 54 negocios (Auditoria_ASCK_54_negocios.xlsx) #40"
      },
      {
        "clave": "Veredicto",
        "valor": "DESCARTADO"
      }
    ]
  },
  {
    "id": "P-master-178",
    "nombre": "Zentro Community Fitness",
    "empresa": "Centro fitness",
    "telefono": "+52 55 8541 8713",
    "correo": "",
    "estado": "Prospecto",
    "responsableId": "m-sebas-03",
    "ultimoContacto": "2026-07-16T05:38:06.056Z",
    "createdAt": "2026-07-16T05:38:06.056Z",
    "valorEstimado": 0,
    "prioridad": "Baja",
    "fechaSeguimiento": "2026-07-16",
    "proximaAccion": "DESCARTADO",
    "camposPersonalizados": [
      {
        "clave": "Dirección",
        "valor": "Bosque Real"
      },
      {
        "clave": "Redes / Fuentes",
        "valor": "Sí: zentrocf.com"
      },
      {
        "clave": "Dolor real",
        "valor": "Infraestructura resuelta"
      },
      {
        "clave": "Criterio ROI",
        "valor": "[AUD 2026-07-13] Reseña confirma cargos automáticos = sistema propio"
      },
      {
        "clave": "Fuente original",
        "valor": "Auditoría 54 negocios (Auditoria_ASCK_54_negocios.xlsx) #41"
      },
      {
        "clave": "Veredicto",
        "valor": "DESCARTADO"
      }
    ]
  },
  {
    "id": "P-master-179",
    "nombre": "Kava Odontología Integral",
    "empresa": "Dental / Clínica",
    "telefono": "No visible",
    "correo": "",
    "estado": "Prospecto",
    "responsableId": "m-sebas-03",
    "ultimoContacto": "2026-07-16T05:38:06.056Z",
    "createdAt": "2026-07-16T05:38:06.056Z",
    "valorEstimado": 0,
    "prioridad": "Baja",
    "fechaSeguimiento": "2026-07-16",
    "proximaAccion": "MADURAR",
    "camposPersonalizados": [
      {
        "clave": "Dirección",
        "valor": "La Herradura"
      },
      {
        "clave": "Redes / Fuentes",
        "valor": "Sí: kavadental.com"
      },
      {
        "clave": "Dolor real",
        "valor": "Solución digital ya contratada"
      },
      {
        "clave": "Criterio ROI",
        "valor": "[AUD 2026-07-13] Web recién hecha: mal momento para vender web; posible add-on agenda"
      },
      {
        "clave": "Fuente original",
        "valor": "Auditoría 54 negocios (Auditoria_ASCK_54_negocios.xlsx) #44"
      },
      {
        "clave": "Veredicto",
        "valor": "MADURAR"
      }
    ]
  },
  {
    "id": "P-master-180",
    "nombre": "Zafir Medical Center",
    "empresa": "Centro médico de especialidades",
    "telefono": "+52 55 5018 0503",
    "correo": "",
    "estado": "Prospecto",
    "responsableId": "m-sebas-03",
    "ultimoContacto": "2026-07-16T05:38:06.056Z",
    "createdAt": "2026-07-16T05:38:06.056Z",
    "valorEstimado": 0,
    "prioridad": "Baja",
    "fechaSeguimiento": "2026-07-16",
    "proximaAccion": "DESCARTADO",
    "camposPersonalizados": [
      {
        "clave": "Dirección",
        "valor": "Magnocentro / Interlomas"
      },
      {
        "clave": "Redes / Fuentes",
        "valor": "Sí: zafir.mx"
      },
      {
        "clave": "Dolor real",
        "valor": "Estructura corporativa robusta"
      },
      {
        "clave": "Criterio ROI",
        "valor": "[AUD 2026-07-13] Corporativo con quirófanos certificados y tienda online"
      },
      {
        "clave": "Fuente original",
        "valor": "Auditoría 54 negocios (Auditoria_ASCK_54_negocios.xlsx) #54"
      },
      {
        "clave": "Veredicto",
        "valor": "DESCARTADO"
      }
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
