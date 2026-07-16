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

function cleanAmount(val) {
  if (typeof val === 'number') return val;
  if (!val) return 0;
  const clean = String(val).replace(/[^0-9]/g, '');
  return parseInt(clean, 10) || 0;
}

function getPriority(tier) {
  const t = String(tier || '').toUpperCase().trim();
  if (t === 'S' || t === 'A' || t === 'ALTA') return 'Alta';
  if (t === 'B' || t === 'MEDIA') return 'Media';
  return 'Baja';
}

async function run() {
  console.log("=== INICIANDO MIGRACIÓN DE PROSPECTOS DESDE PROSPECTOS_MASTER.xlsx ===");

  const excelPath = "c:\\Users\\as832\\Documents\\CRM ASCK\\PROSPECTOS_MASTER.xlsx";
  if (!fs.existsSync(excelPath)) {
    console.error(`❌ Error: No se encontró el archivo en ${excelPath}`);
    process.exit(1);
  }

  // 1. Leer Excel
  const workbook = XLSX.readFile(excelPath);
  const sheetName = 'Prospectos';
  if (!workbook.SheetNames.includes(sheetName)) {
    console.error(`❌ Error: La hoja '${sheetName}' no existe.`);
    process.exit(1);
  }

  const sheet = workbook.Sheets[sheetName];
  const rows = XLSX.utils.sheet_to_json(sheet);
  console.log(`📋 Total de filas leídas del Excel: ${rows.length}`);

  const parsedClients = rows.map((r, index) => {
    const id = `P-master-${100 + index}`;
    const name = r["Negocio"] || `Prospecto sin nombre ${index}`;
    const giro = r["Giro"] || "Giro sin definir";
    const telefono = r["Teléfono"] || "";
    const tier = r["Tier"] || "B";
    const valor = cleanAmount(r["Ticket ajustado"]);
    
    // Mapear campos personalizados
    const camposPersonalizados = [
      { clave: "Dirección", valor: r["Zona"] || "" },
      { clave: "Redes / Fuentes", valor: r["Web/Redes"] || "" },
      { clave: "Dolor real", valor: r["Dolor detectado"] || "" },
      { clave: "Criterio ROI", valor: r["Conflicto/Nota"] || "" },
      { clave: "Fuente original", valor: r["Fuente"] || "" },
      { clave: "Veredicto", valor: r["Veredicto"] || "" }
    ];

    return {
      id,
      nombre: name,
      empresa: giro,
      telefono,
      correo: "",
      estado: "Prospecto",
      responsableId: "m-sebas-03", // Sebas (Operaciones Comerciales)
      ultimoContacto: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      valorEstimado: valor,
      prioridad: getPriority(tier),
      fechaSeguimiento: new Date().toISOString().split('T')[0],
      proximaAccion: r["Veredicto"] || "Contactar hoy",
      camposPersonalizados
    };
  });

  console.log(`✅ Mapeados exitosamente ${parsedClients.length} prospectos.`);

  // 2. Sobrescribir mockData.js (CLIENTES_INICIALES)
  const mockDataPath = path.join(__dirname, '..', 'src', 'mockData.js');
  if (fs.existsSync(mockDataPath)) {
    console.log(`💾 Actualizando archivo mockData.js...`);
    let fileContent = fs.readFileSync(mockDataPath, 'utf8');

    // Reemplazar la constante CLIENTES_INICIALES
    const startToken = 'export const CLIENTES_INICIALES = [';
    const endToken = '];';

    const startIndex = fileContent.indexOf(startToken);
    if (startIndex !== -1) {
      // Encontrar el corchete de cierre correspondiente
      let openBrackets = 1;
      let endIndex = -1;
      for (let i = startIndex + startToken.length; i < fileContent.length; i++) {
        if (fileContent[i] === '[') openBrackets++;
        if (fileContent[i] === ']') openBrackets--;
        if (openBrackets === 0) {
          endIndex = i;
          break;
        }
      }

      if (endIndex !== -1) {
        const replacement = `export const CLIENTES_INICIALES = ${JSON.stringify(parsedClients, null, 2)}`;
        fileContent = fileContent.substring(0, startIndex) + replacement + fileContent.substring(endIndex + 1);
        fs.writeFileSync(mockDataPath, fileContent, 'utf8');
        console.log("✅ ¡mockData.js actualizado exitosamente con 81 prospectos!");
      } else {
        console.error("❌ Error: No se pudo delimitar la sección CLIENTES_INICIALES en mockData.js");
      }
    } else {
      console.error("❌ Error: No se encontró la constante CLIENTES_INICIALES en mockData.js");
    }
  }

  // 3. Insertar en Supabase
  console.log("📡 Conectando a Supabase para actualizar integrantes y clientes...");
  try {
    // A. Upsert de Integrantes para evitar errores de clave foránea
    const dbIntegrantes = [
      { 
        id: "m-kevin-04", 
        nombre: "Kevin", 
        email: "kevin@asck.software", 
        rol: "Líder comercial y de cierres / QA", 
        cargo: "Director Comercial",
        responsabilidades: "Lidera cierres, validación final y decisiones comerciales",
        especialidad: "Negociación & Cierres",
        horas_disponibles: 52, 
        avatar_url: "https://api.dicebear.com/7.x/bottts/svg?seed=Kevin" 
      },
      { 
        id: "m-alberto-01", 
        nombre: "Alberto", 
        email: "alberto@asck.software", 
        rol: "Sostiene CRM web, automatización, pruebas y guías técnicas", 
        cargo: "Lead Software Architect",
        responsabilidades: "Soporte técnico del CRM web, automatizaciones, pruebas y guías técnicas",
        especialidad: "Backend & Systems Architecture",
        horas_disponibles: 36, 
        avatar_url: "https://api.dicebear.com/7.x/bottts/svg?seed=Alberto" 
      },
      { 
        id: "m-sebas-03", 
        nombre: "Sebas", 
        email: "sebas@asck.software", 
        rol: "Alimenta el CRM, consigue datos, da seguimiento y agenda", 
        cargo: "Operaciones Comerciales",
        responsabilidades: "Búsqueda de datos de prospectos, primer contacto por WhatsApp/IG/Maps, seguimiento y agendación",
        especialidad: "Data Collection & Sales Outreach",
        horas_disponibles: 36, 
        avatar_url: "https://api.dicebear.com/7.x/bottts/svg?seed=Sebas" 
      },
      { 
        id: "m-centeno-02", 
        nombre: "Centeno", 
        email: "centeno@asck.software", 
        rol: "Rescata y ordena demos", 
        cargo: "UI/UX & Frontend Developer",
        responsabilidades: "Preparación y limpieza de demos (Dental Printal, Finanzas, WhatsApp) y documentación visual de venta",
        especialidad: "Frontend & Demo Building",
        horas_disponibles: 52, 
        avatar_url: "https://api.dicebear.com/7.x/bottts/svg?seed=Centeno" 
      }
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

    // B. Primero eliminar los clientes anteriores
    console.log("🗑️ Borrando clientes anteriores de Supabase...");
    const { error: deleteError } = await supabase
      .from('clientes')
      .delete()
      .neq('id', 'dummy-prevent-empty-delete');

    if (deleteError) {
      console.warn("⚠️ Advertencia al limpiar clientes de Supabase:", deleteError.message);
    } else {
      console.log("✅ Tabla 'clientes' limpiada en la nube.");
    }

    // Traducir los prospectos al formato de la base de datos (snake_case)
    const dbClients = parsedClients.map(c => ({
      id: c.id,
      nombre: c.nombre,
      empresa: c.empresa,
      telefono: c.telefono || null,
      correo: null,
      estado: c.estado,
      responsable_id: c.responsableId,
      ultimo_contacto: c.ultimoContacto,
      created_at: c.createdAt,
      valor_estimado: c.valorEstimado,
      prioridad: c.prioridad,
      fecha_seguimiento: c.fechaSeguimiento,
      proxima_accion: c.proximaAccion,
      campos_personalizados: c.camposPersonalizados
    }));

    // Insertar en lotes para evitar límites de payload
    const batchSize = 25;
    for (let i = 0; i < dbClients.length; i += batchSize) {
      const batch = dbClients.slice(i, i + batchSize);
      console.log(`📤 Subiendo lote ${Math.floor(i / batchSize) + 1} (${batch.length} prospectos)...`);
      
      const { error: insertError } = await supabase
        .from('clientes')
        .insert(batch);

      if (insertError) {
        console.error(`❌ Error insertando lote:`, insertError.message);
        throw insertError;
      }
    }

    console.log("🚀 ¡Todos los prospectos master se han subido con éxito a Supabase!");
  } catch (supabaseErr) {
    console.error("❌ Error al interactuar con Supabase:", supabaseErr.message);
    console.log("⚠️ Los datos locales se actualizaron, pero falló la sincronización con Supabase.");
  }
}

run().catch(console.error);
