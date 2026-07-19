const fs = require('fs');
const path = require('path');
const XLSX = require('xlsx');
const CryptoJS = require('crypto-js');

// Configuración de la Sala de Sincronización
const SYNC_SALT = 'ASCK_CRM_SALT_2026_!';
const ROOM_ID = 'ASCK-MASTER-SYNC';
const JSONBIN_ZETA_URL = 'https://jsonbin-zeta.vercel.app/api/bins';

function getSyncConfig(roomId) {
  const cleanId = roomId.trim();
  const encryptionKey = cleanId + SYNC_SALT;
  const binId = cleanId === 'ASCK-MASTER-SYNC' ? 'H4SKQ8Y_x5' : cleanId;
  return { binId, encryptionKey };
}

// Normalizaciones de nombres y mapeos de ID
const INTEGRANTES_MAP = {
  'kevin': { id: 'm-kevin-04', nombre: 'Kevin' },
  'alberto': { id: 'm-alberto-01', nombre: 'Alberto' },
  'sebas': { id: 'm-sebas-03', nombre: 'Sebas' },
  'centeno': { id: 'm-centeno-02', nombre: 'Centeno' }
};

function mapNameToId(name) {
  if (!name) return null;
  const normalized = name.toLowerCase().trim();
  return INTEGRANTES_MAP[normalized]?.id || null;
}

function normalizeState(state) {
  if (!state) return 'Pendiente';
  const s = state.toLowerCase().trim();
  if (s === 'completado' || s === 'terminado' || s === 'hecho' || s === 'listo') return 'Hecho';
  if (s === 'en proceso' || s === 'en progreso' || s === 'proceso' || s === 'prog') return 'En progreso';
  if (s === 'atorado' || s === 'bloqueado' || s === 'bloqueo') return 'Bloqueado';
  if (s === 'pausado' || s === 'espera') return 'Pausado';
  if (s === 'no aplica' || s === 'cancelado' || s === 'baja') return 'Cancelado';
  return 'Pendiente';
}

function normalizePriority(priority) {
  if (!priority) return 'P2';
  const p = priority.toUpperCase().trim();
  if (p === 'P0' || p === 'ALTA' || p === 'URGENTE') return 'P0';
  if (p === 'P1' || p === 'MEDIA' || p === 'IMPORTANTE') return 'P1';
  if (p === 'P2' || p === 'BAJA' || p === 'SOPORTE') return 'P2';
  return 'P2';
}

function correctJustification(title, responsible, currentJust) {
  const techKeywords = ['backend', 'bug', 'api', 'ia', 'modelo', 'integracion', 'instalacion', 'revision', 'tecnic', 'sistema', 'dental', 'printal'];
  const trackingKeywords = ['organizacion', 'seguimiento', 'orden', 'limpieza', 'documentacion', 'checklist', 'confirmar', 'revisar', 'centro de mando', 'coordinar', 'bloqueo', 'avances', 'bitacora'];
  
  const justLower = (currentJust || '').toLowerCase();
  
  if (responsible === 'Alberto') {
    if (justLower.includes('centeno') || trackingKeywords.some(kw => justLower.includes(kw) && !techKeywords.some(tk => justLower.includes(tk)))) {
      return `Soporte técnico y desarrollo de backend/arquitectura del sistema por Alberto (Técnico).`;
    }
  } else if (responsible === 'Centeno') {
    if (justLower.includes('alberto') || techKeywords.some(kw => justLower.includes(kw) && !trackingKeywords.some(tk => justLower.includes(tk)))) {
      return `Organización, seguimiento y documentación visual de la entrega a cargo de Centeno (Seguimiento).`;
    }
  }
  return currentJust || 'Planificación operativa de actividades de equipo.';
}

function normalizeTitle(t) {
  return String(t || '').toLowerCase().replace(/[^a-z0-9]/g, '');
}

async function run() {
  console.log("=== INICIANDO IMPORTACIÓN DE TAREAS ASCK DESDE EXCEL ===");
  
  // 1. Ubicar el archivo Excel en Descargas
  const downloadsDir = path.join(process.env.USERPROFILE, 'Downloads');
  const files = fs.readdirSync(downloadsDir)
    .filter(f => f.startsWith('ASCK_Delegacion_Pendientes_AUTO') && f.endsWith('.xlsx'))
    .map(f => {
      const filePath = path.join(downloadsDir, f);
      const stats = fs.statSync(filePath);
      return { name: f, path: filePath, mtime: stats.mtime };
    })
    .sort((a, b) => b.mtime - a.mtime);

  if (files.length === 0) {
    console.error("❌ Error: No se encontró el archivo ASCK_Delegacion_Pendientes_AUTO.xlsx en la carpeta de Descargas.");
    process.exit(1);
  }

  const targetFile = files[0];
  console.log(`📂 Archivo detectado: ${targetFile.name} (Modificado el: ${targetFile.mtime})`);

  // 2. Leer Excel
  const workbook = XLSX.readFile(targetFile.path);
  const sheetName = 'Tareas ASCK';
  if (!workbook.SheetNames.includes(sheetName)) {
    console.error(`❌ Error: La pestaña '${sheetName}' no existe en el archivo Excel.`);
    process.exit(1);
  }

  const sheet = workbook.Sheets[sheetName];
  const jsonRows = XLSX.utils.sheet_to_json(sheet, { header: 1 });
  
  if (jsonRows.length === 0) {
    console.error("❌ Error: La hoja de tareas está vacía.");
    process.exit(1);
  }

  // Buscar fila de cabeceras
  let headerIdx = -1;
  for (let i = 0; i < jsonRows.length; i++) {
    if (jsonRows[i] && jsonRows[i].filter(c => c !== null && c !== '').length >= 3) {
      headerIdx = i;
      break;
    }
  }

  if (headerIdx === -1) {
    console.error("❌ Error: No se pudo identificar la fila de cabeceras en el Excel.");
    process.exit(1);
  }

  const headers = jsonRows[headerIdx].map(h => String(h || '').trim());
  const dataRows = jsonRows.slice(headerIdx + 1);

  // Mapear posiciones de columnas
  const getColIdx = (names) => {
    return headers.findIndex(h => names.some(n => h.toLowerCase().includes(n.toLowerCase())));
  };

  const colIdx = {
    id: getColIdx(['id', 'clave']),
    macroarea: getColIdx(['macroarea', 'área', 'macroárea']),
    pendiente: getColIdx(['pendiente', 'tarea', 'nombre', 'actividad']),
    responsable: getColIdx(['responsable', 'asignado', 'quien']),
    apoyo: getColIdx(['apoyo', 'ayuda', 'colaborador']),
    prioridad: getColIdx(['prioridad', 'importancia']),
    estado: getColIdx(['estado', 'etapa', 'status']),
    fechaInicio: getColIdx(['fecha inicio', 'inicio']),
    fechaLimite: getColIdx(['fecha limite', 'fecha límite', 'límite', 'limite']),
    entregable: getColIdx(['entregable claro', 'entregable']),
    justificacion: getColIdx(['justificación por rol', 'justificación', 'justificacion']),
    bloqueo: getColIdx(['bloqueo/riesgo', 'bloqueo', 'riesgo']),
    proximaAccion: getColIdx(['próxima acción', 'proxima accion', 'próxima', 'proxima'])
  };

  console.log("📊 Mapeo de columnas detectado:", Object.entries(colIdx).map(([k, v]) => `${k} (col: ${v !== -1 ? headers[v] : 'No encontrada'})`).join(', '));

  // 3. Descargar y descifrar el payload actual de la nube
  const { binId, encryptionKey } = getSyncConfig(ROOM_ID);
  const syncUrl = `${JSONBIN_ZETA_URL}/${binId}`;
  
  let cloudPayload = {
    clients: [],
    tasks: [],
    notes: [],
    activities: [],
    agendaEvents: [],
    sprints: [],
    updatedAt: new Date(0).toISOString()
  };

  console.log(`🌐 Conectando a la Sala Maestra de ASCK (${ROOM_ID})...`);
  try {
    const res = await fetch(syncUrl);
    if (res.status !== 404) {
      if (!res.ok) throw new Error(`HTTP error: ${res.status}`);
      const resultJson = await res.json();
      const ciphertext = resultJson.data;
      if (ciphertext) {
        if (typeof ciphertext === 'string') {
          const bytes = CryptoJS.AES.decrypt(ciphertext, encryptionKey);
          const decryptedStr = bytes.toString(CryptoJS.enc.Utf8);
          if (decryptedStr) {
            cloudPayload = JSON.parse(decryptedStr);
            console.log("✅ Datos de la nube descargados e integrados correctamente.");
          }
        } else {
          cloudPayload = ciphertext;
          console.log("✅ Datos de la nube descargados (sin cifrar) correctamente.");
        }
      }
    } else {
      console.log("ℹ️ Sala maestra vacía o nueva. Se inicializarán los datos.");
    }
  } catch (err) {
    console.warn("⚠️ Advertencia: No se pudo conectar a la sala en la nube. Se usará el estado local por defecto.", err.message);
  }

  // 4. Procesar y resolver tareas del Excel
  const currentTasks = cloudPayload.tasks || [];
  let readCount = 0;
  let createCount = 0;
  let updateCount = 0;
  let omitCount = 0;
  let errorCount = 0;

  const resolvedTasks = [...currentTasks];

  for (let i = 0; i < dataRows.length; i++) {
    const row = dataRows[i];
    if (!row || row.length === 0) continue;

    const getRowVal = (colIndex) => {
      if (colIndex === -1 || colIndex >= row.length) return '';
      return String(row[colIndex] || '').trim();
    };

    const title = getRowVal(colIdx.pendiente);
    if (!title) {
      omitCount++;
      continue; // Fila vacía de tarea
    }

    readCount++;

    try {
      const rawId = getRowVal(colIdx.id);
      const idVal = rawId ? `t-excel-${rawId}` : `t-excel-gen-${Date.now()}-${i}`;
      
      const macroarea = getRowVal(colIdx.macroarea) || 'General';
      const responsible = getRowVal(colIdx.responsable);
      
      if (!responsible) {
        console.log(`⚠️ Fila ${i + 1}: Tarea "${title}" no tiene responsable asignado.`);
      }

      const support = getRowVal(colIdx.apoyo);
      const priority = normalizePriority(getRowVal(colIdx.prioridad));
      const state = normalizeState(getRowVal(colIdx.estado));
      const fechaInicio = getRowVal(colIdx.fechaInicio) || new Date().toISOString().split('T')[0];
      const fechaLimite = getRowVal(colIdx.fechaLimite) || new Date().toISOString().split('T')[0];
      const entregable = getRowVal(colIdx.entregable);
      const rawJust = getRowVal(colIdx.justificacion);
      const correctedJust = correctJustification(title, responsible, rawJust);
      const bloqueo = getRowVal(colIdx.bloqueo);
      const proximaAccion = getRowVal(colIdx.proximaAccion) || 'Definir siguientes pasos';

      // Estructura de la tarea para el CRM
      const taskData = {
        id: idVal,
        titulo: title,
        macroarea: macroarea,
        asignadoA: mapNameToId(responsible) || null, // Guardar ID de integrante
        responsableNombre: responsible || 'Sin asignar', // Guardar nombre legible
        apoyo: support || '',
        prioridad: priority,
        estado: state,
        completada: state === 'Hecho',
        fechaInicio: fechaInicio,
        fechaLimite: fechaLimite,
        entregable: entregable,
        justificacion: correctedJust,
        bloqueo: bloqueo,
        proximaAccion: proximaAccion,
        updatedAt: new Date().toISOString()
      };

      // Validar responsable oficial
      const validResponsibles = ['Kevin', 'Sebas', 'Alberto', 'Centeno'];
      if (responsible && !validResponsibles.includes(responsible)) {
        console.warn(`⚠️ Fila ${i + 1}: Responsable '${responsible}' no es válido. Asignado como 'Sin asignar'.`);
        taskData.asignadoA = null;
        taskData.responsableNombre = 'Sin asignar';
      }

      // Buscar si ya existe
      let matchIdx = -1;
      if (rawId) {
        matchIdx = resolvedTasks.findIndex(t => t.id === idVal);
      }
      
      if (matchIdx === -1) {
        // Buscar por nombre normalizado
        const normTitle = normalizeTitle(title);
        matchIdx = resolvedTasks.findIndex(t => normalizeTitle(t.titulo) === normTitle);
      }

      if (matchIdx !== -1) {
        // Actualizar
        resolvedTasks[matchIdx] = {
          ...resolvedTasks[matchIdx],
          ...taskData,
          id: resolvedTasks[matchIdx].id // Mantener ID original
        };
        updateCount++;
      } else {
        // Crear
        resolvedTasks.push({
          ...taskData,
          createdAt: new Date().toISOString()
        });
        createCount++;
      }

    } catch (err) {
      console.error(`❌ Error procesando fila ${i + 1}:`, err);
      errorCount++;
    }
  }

  // Imprimir resumen en consola requerido
  console.log("\n=================================");
  console.log(`📋 Tareas leídas del Excel: ${readCount}`);
  console.log(`🆕 Tareas a crear: ${createCount}`);
  console.log(`🔄 Tareas a actualizar: ${updateCount}`);
  console.log(`🚫 Tareas omitidas: ${omitCount}`);
  console.log(`❌ Tareas con errores: ${errorCount}`);
  console.log("=================================\n");

  // 5. Guardar de nuevo en el Payload
  cloudPayload.tasks = resolvedTasks;
  cloudPayload.updatedAt = new Date().toISOString();

  // Cifrar
  const jsonStr = JSON.stringify(cloudPayload);
  const ciphertext = CryptoJS.AES.encrypt(jsonStr, encryptionKey).toString();

  // Subir a la nube
  console.log("📡 Subiendo base de datos actualizada con las tareas a la nube...");
  try {
    const uploadRes = await fetch(syncUrl, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ data: ciphertext })
    });
    if (!uploadRes.ok) throw new Error(`HTTP error: ${uploadRes.status}`);
    console.log("🚀 ¡Sincronización en la nube completada con éxito!");
  } catch (err) {
    console.error("❌ Error al subir a la nube:", err.message);
  }

  // 6. Guardar localmente en el repositorio como respaldo estático
  const backupDir = path.join(__dirname, '..', 'src', 'data');
  if (!fs.existsSync(backupDir)) {
    fs.mkdirSync(backupDir, { recursive: true });
  }
  const backupPath = path.join(backupDir, 'imported_tasks.json');
  fs.writeFileSync(backupPath, JSON.stringify(resolvedTasks, null, 2), 'utf8');
  console.log(`💾 Respaldo local guardado en: ${backupPath}`);
}

run().catch(console.error);
