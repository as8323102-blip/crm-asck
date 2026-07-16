import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import XLSX from 'xlsx';
import { createClient } from '@supabase/supabase-js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Supabase Credentials
const SUPABASE_URL = "https://sjhmoyamcnfzugnqnpxv.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_o-FHT-AvmXs4Gsa254VSeA_4mlUBPlY";

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

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

async function run() {
  console.log("=== INICIANDO CARGA DE TAREAS OPERATIVAS A SUPABASE ===");

  const excelPath = "c:\\Users\\as832\\Documents\\CRM ASCK\\ASCK_Delegacion_Pendientes_AUTO.xlsx";
  if (!fs.existsSync(excelPath)) {
    console.error(`❌ Error: No se encontró el archivo en ${excelPath}`);
    process.exit(1);
  }

  // 1. Leer Excel
  const workbook = XLSX.readFile(excelPath);
  const sheetName = 'Tareas ASCK';
  if (!workbook.SheetNames.includes(sheetName)) {
    console.error(`❌ Error: La pestaña '${sheetName}' no existe.`);
    process.exit(1);
  }

  const sheet = workbook.Sheets[sheetName];
  const jsonRows = XLSX.utils.sheet_to_json(sheet, { header: 1 });

  if (jsonRows.length === 0) {
    console.error("❌ Error: La hoja está vacía.");
    process.exit(1);
  }

  // Buscar cabeceras
  let headerIdx = -1;
  for (let i = 0; i < jsonRows.length; i++) {
    if (jsonRows[i] && jsonRows[i].filter(c => c !== null && c !== '').length >= 3) {
      headerIdx = i;
      break;
    }
  }

  if (headerIdx === -1) {
    console.error("❌ Error: No se pudo identificar la fila de cabeceras.");
    process.exit(1);
  }

  const headers = jsonRows[headerIdx].map(h => String(h || '').trim());
  const dataRows = jsonRows.slice(headerIdx + 1);

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

  console.log(" Mapeando y procesando tareas...");

  const parsedTasks = [];

  for (let i = 0; i < dataRows.length; i++) {
    const row = dataRows[i];
    if (!row || row.length === 0) continue;

    const getRowVal = (colIndex) => {
      if (colIndex === -1 || colIndex >= row.length) return '';
      return String(row[colIndex] || '').trim();
    };

    const title = getRowVal(colIdx.pendiente);
    if (!title) continue;

    const rawId = getRowVal(colIdx.id);
    const idVal = rawId ? `t-excel-${rawId}` : `t-excel-gen-${Date.now()}-${i}`;
    
    const macroarea = getRowVal(colIdx.macroarea) || 'General';
    const responsible = getRowVal(colIdx.responsable);
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

    // Mapear al formato snake_case de la base de datos
    const dbTask = {
      id: idVal,
      titulo: title,
      macroarea: macroarea,
      asignado_a: mapNameToId(responsible) || null,
      responsable_nombre: responsible || 'Sin asignar',
      apoyo: support || null,
      prioridad: priority,
      estado: state,
      completada: state === 'Hecho',
      fecha_inicio: fechaInicio,
      fecha_limite: fechaLimite,
      entregable: entregable || null,
      justificacion: correctedJust || null,
      bloqueo: bloqueo || null,
      proxima_accion: proximaAccion || null,
      created_at: new Date().toISOString()
    };

    parsedTasks.push(dbTask);
  }

  console.log(`✅ Mapeadas exitosamente ${parsedTasks.length} tareas operativas.`);

  // 2. Conectar y vaciar la tabla de tareas previas del Excel
  console.log("📡 Conectando a Supabase para actualizar integrantes y tareas...");
  try {
    // A. Upsert de Integrantes para evitar errores de clave foránea
    const dbIntegrantes = [
      { id: "m-kevin-04", nombre: "Kevin", email: "kevin@asck.software", rol: "Líder comercial y de cierres / QA", horas_disponibles: 52, avatar_url: "https://api.dicebear.com/7.x/bottts/svg?seed=Kevin" },
      { id: "m-alberto-01", nombre: "Alberto", email: "alberto@asck.software", rol: "Sostiene CRM web, automatización, pruebas y guías técnicas", horas_disponibles: 36, avatar_url: "https://api.dicebear.com/7.x/bottts/svg?seed=Alberto" },
      { id: "m-sebas-03", nombre: "Sebas", email: "sebas@asck.software", rol: "Alimenta el CRM, consigue datos, da seguimiento y agenda", horas_disponibles: 36, avatar_url: "https://api.dicebear.com/7.x/bottts/svg?seed=Sebas" },
      { id: "m-centeno-02", nombre: "Centeno", email: "centeno@asck.software", rol: "Rescata y ordena demos", horas_disponibles: 52, avatar_url: "https://api.dicebear.com/7.x/bottts/svg?seed=Centeno" }
    ];

    console.log("👥 Asegurando integrantes en la base de datos...");
    const { error: memberError } = await supabase
      .from('integrantes')
      .upsert(dbIntegrantes);

    if (memberError) {
      console.error("❌ Error al insertar integrantes:", memberError.message);
      throw memberError;
    }
    console.log("✅ Integrantes listos.");

    console.log("🗑️ Limpiando tareas previas de Excel de Supabase...");
    
    // Solo borramos las tareas operativas (las que empiezan por t-excel o tienen macroarea)
    const { error: deleteError } = await supabase
      .from('tareas')
      .delete()
      .like('id', 't-excel%');

    if (deleteError) {
      console.warn("⚠️ Advertencia al limpiar tareas de Supabase:", deleteError.message);
    } else {
      console.log("✅ Tareas operativas de Excel limpiadas en la nube.");
    }

    // 3. Insertar en lotes
    const batchSize = 25;
    for (let i = 0; i < parsedTasks.length; i += batchSize) {
      const batch = parsedTasks.slice(i, i + batchSize);
      console.log(`📤 Subiendo lote ${Math.floor(i / batchSize) + 1} (${batch.length} tareas)...`);
      
      const { error: insertError } = await supabase
        .from('tareas')
        .insert(batch);

      if (insertError) {
        console.error(`❌ Error insertando lote de tareas:`, insertError.message);
        throw insertError;
      }
    }

    console.log("🚀 ¡Todas las tareas operativas del Excel se han subido con éxito a Supabase!");

    // 4. Guardar copia local en data para soporte sin conexión
    const localTasks = parsedTasks.map(t => ({
      id: t.id,
      titulo: t.titulo,
      macroarea: t.macroarea,
      asignadoA: t.asignado_a,
      responsableNombre: t.responsable_nombre,
      apoyo: t.apoyo || '',
      prioridad: t.prioridad,
      estado: t.estado,
      completada: t.completada,
      fechaInicio: t.fecha_inicio,
      fechaLimite: t.fecha_limite,
      entregable: t.entregable || '',
      justificacion: t.justificacion || '',
      bloqueo: t.bloqueo || '',
      proximaAccion: t.proxima_accion || '',
      createdAt: t.created_at
    }));

    const backupPath = path.join(__dirname, '..', 'src', 'data', 'imported_tasks.json');
    fs.writeFileSync(backupPath, JSON.stringify(localTasks, null, 2), 'utf8');
    console.log(`💾 Respaldo local de tareas guardado en: ${backupPath}`);

  } catch (err) {
    console.error("❌ Error al interactuar con Supabase:", err.message);
  }
}

run().catch(console.error);
