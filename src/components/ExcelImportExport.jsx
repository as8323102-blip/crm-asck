import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import {
  Upload,
  Download,
  CheckCircle,
  FileSpreadsheet,
  Play,
  Info
} from 'lucide-react';
import { INTEGRANTES } from '../mockData';
import { clientService } from '../services/clientService';

export default function ExcelImportExport({ clients, setClients, logEvent }) {
  // Estados para Importación
  const [file, setFile] = useState(null);
  const [headers, setHeaders] = useState([]);
  const [sheetData, setSheetData] = useState([]);
  const [mappings, setMappings] = useState({
    nombre: '',
    empresa: '',
    prioridad: '',
    monto: '',
    seguimiento: '',
    redes: '',
    observaciones: ''
  });
  const [importSummary, setImportSummary] = useState(null);

  // Estados para Exportación
  const [filterEstado, setFilterEstado] = useState('Todos');
  const [filterResponsable, setFilterResponsable] = useState('Todos');
  const [filterPrioridad, setFilterPrioridad] = useState('Todos');

  // Procesar archivo Excel al subirlo
  const handleFileChange = (e) => {
    const f = e.target.files[0];
    if (!f) return;
    setFile(f);
    setImportSummary(null);

    const reader = new FileReader();
    reader.onload = (evt) => {
      const data = new Uint8Array(evt.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      
      // Auto-elegir hoja de prospectos si existe, o usar la primera
      let sheetName = workbook.SheetNames[0];
      if (workbook.SheetNames.includes('CRM_Cargar')) {
        sheetName = 'CRM_Cargar';
      }
      
      const worksheet = workbook.Sheets[sheetName];
      const jsonRows = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

      if (jsonRows.length === 0) return;

      // Buscar la primera fila que parezca cabeceras de tabla (skip title rows)
      let headerIdx = 0;
      for (let i = 0; i < jsonRows.length; i++) {
        if (jsonRows[i] && jsonRows[i].filter(c => c !== null && c !== '').length >= 3) {
          headerIdx = i;
          break;
        }
      }

      const rawHeaders = jsonRows[headerIdx].map(h => String(h || '').trim());
      setHeaders(rawHeaders);
      setSheetData(jsonRows.slice(headerIdx + 1));

      // Auto-mapeo inteligente por nombre de columna
      const newMappings = { ...mappings };
      rawHeaders.forEach(h => {
        const lower = h.toLowerCase();
        if (lower.includes('prospecto') || lower.includes('negocio') || lower.includes('nombre')) {
          newMappings.nombre = h;
        } else if (lower.includes('giro') || lower.includes('empresa') || lower.includes('nicho')) {
          newMappings.empresa = h;
        } else if (lower.includes('prioridad') || lower.includes('importancia')) {
          newMappings.prioridad = h;
        } else if (lower.includes('ticket') || lower.includes('monto') || lower.includes('precio medio') || lower.includes('estimado')) {
          newMappings.monto = h;
        } else if (lower.includes('seguimiento') || lower.includes('fecha')) {
          newMappings.seguimiento = h;
        } else if (lower.includes('redes') || lower.includes('fuente') || lower.includes('link')) {
          newMappings.redes = h;
        } else if (lower.includes('notas') || lower.includes('acción') || lower.includes('observaciones') || lower.includes('nota')) {
          newMappings.observaciones = h;
        }
      });
      setMappings(newMappings);
    };
    reader.readAsArrayBuffer(f);
  };

  const handleMappingChange = (field, value) => {
    setMappings(prev => ({ ...prev, [field]: value }));
  };

  // Ejecutar Importación
  const executeImport = async () => {
    if (!mappings.nombre) {
      alert("Debes mapear obligatoriamente la columna 'Nombre / Negocio'");
      return;
    }

    let nuevos = 0;
    let actualizados = 0;
    let duplicados = 0;
    let errores = 0;

    const currentClients = [...clients];
    const updatedClientList = [...clients];

    for (let i = 0; i < sheetData.length; i++) {
      const row = sheetData[i];
      if (!row || row.length === 0) continue;

      // Obtener valor de celda buscando el índice de cabecera
      const getVal = (headerName) => {
        if (!headerName) return '';
        const idx = headers.indexOf(headerName);
        return idx !== -1 ? String(row[idx] || '').trim() : '';
      };

      const nameVal = getVal(mappings.nombre);
      if (!nameVal) continue; // Skip filas sin nombre

      const empresaVal = getVal(mappings.empresa);
      const prioridadVal = getVal(mappings.prioridad) || 'Media';
      const montoRaw = getVal(mappings.monto);
      const montoVal = montoRaw ? parseInt(montoRaw.replace(/[^0-9]/g, '')) || 0 : 0;
      const seguimientoVal = getVal(mappings.seguimiento);
      const redesVal = getVal(mappings.redes);
      const obsVal = getVal(mappings.observaciones);

      // Buscar si ya existe
      const existingIdx = currentClients.findIndex(c => c.nombre.toLowerCase() === nameVal.toLowerCase());
      
      const customFields = [
        { clave: "Giro / Detalle", valor: empresaVal },
        { clave: "Redes / Fuentes", valor: redesVal },
        { clave: "Acción / Notas", valor: obsVal }
      ];

      try {
        if (existingIdx !== -1) {
          // Actualizar existente
          const existing = currentClients[existingIdx];
          const updates = {
            empresa: empresaVal || existing.empresa,
            prioridad: prioridadVal || existing.prioridad,
            valorEstimado: montoVal || existing.valorEstimado,
            fechaSeguimiento: seguimientoVal || existing.fechaSeguimiento,
            camposPersonalizados: customFields
          };
          
          await clientService.updateClient(existing.id, updates);
          updatedClientList[existingIdx] = { ...existing, ...updates };
          actualizados++;
          duplicados++;
        } else {
          // Crear nuevo cliente
          const newClient = {
            id: `P-xlsx-${Date.now()}-${i}`,
            nombre: nameVal,
            empresa: empresaVal || 'Giro sin definir',
            telefono: '',
            correo: '',
            estado: 'Prospecto',
            responsableId: INTEGRANTES[0].id,
            ultimoContacto: new Date().toISOString(),
            createdAt: new Date().toISOString(),
            valorEstimado: montoVal,
            prioridad: prioridadVal,
            fechaSeguimiento: seguimientoVal || new Date().toISOString().split('T')[0],
            proximaAccion: obsVal || 'Primer contacto pendiente',
            camposPersonalizados: customFields
          };

          await clientService.createClient(newClient);
          updatedClientList.push(newClient);
          nuevos++;
        }
      } catch (err) {
        console.error("Error al importar fila:", err);
        errores++;
      }
    }

    setClients(updatedClientList);
    setImportSummary({ nuevos, actualizados, duplicados, errores });
    logEvent(`importó prospectos desde archivo Excel: ${file.name}`);
    setFile(null);
  };

  // Exportar Prospectos a Excel
  const executeExport = () => {
    // 1. Filtrar Clientes
    const filtered = clients.filter(c => {
      const matchState = filterEstado === 'Todos' || c.estado === filterEstado;
      const matchOwner = filterResponsable === 'Todos' || c.responsableId === filterResponsable;
      const matchPriority = filterPrioridad === 'Todos' || c.prioridad === filterPrioridad;
      return matchState && matchOwner && matchPriority;
    });

    // 2. Mapear a columnas del Excel original
    const rows = filtered.map((c) => {
      const owner = INTEGRANTES.find(i => i.id === c.responsableId);
      const addressObj = c.camposPersonalizados?.find(f => f.clave === 'Dirección') || {};
      const redesObj = c.camposPersonalizados?.find(f => f.clave === 'Redes / Fuentes') || {};
      const linksObj = c.camposPersonalizados?.find(f => f.clave === 'Links') || {};

      return {
        'ID': c.id,
        'Negocio': c.nombre,
        'Giro': c.empresa,
        'Zona / Dirección para Google Maps': addressObj.valor || '',
        'Redes / fuentes a revisar': redesObj.valor || '',
        'Clasificación ASCK': 'Calificado',
        'Estado CRM': c.estado,
        'Prioridad': c.prioridad,
        'Ticket estimado': c.valorEstimado || 0,
        'Siguiente acción manual': c.proximaAccion || '',
        'Responsable sugerido': owner ? owner.nombre : 'Sin asignar',
        'Links / fuentes': linksObj.valor || ''
      };
    });

    // 3. Crear hoja y descargar
    const worksheet = XLSX.utils.json_to_sheet(rows);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Prospectos');
    
    XLSX.writeFile(workbook, 'ASCK_CRM_Export_Prospectos.xlsx');
    logEvent(`exportó prospectos filtrados a Excel`);
  };

  return (
    <div className="space-y-6 text-xs max-w-4xl mx-auto">
      
      {/* SECCIÓN 1: IMPORTAR EXCEL */}
      <div className="p-6 rounded-xl border border-notion-border-light dark:border-notion-border-dark bg-notion-card-light dark:bg-notion-card-dark notion-shadow space-y-4">
        <div className="flex items-center gap-2 border-b border-notion-border-light dark:border-notion-border-dark pb-3">
          <Upload size={16} className="text-indigo-500" />
          <h2 className="text-sm font-bold text-notion-text-light dark:text-notion-text-dark">Importar Prospectos desde Excel (.xlsx)</h2>
        </div>

        <p className="text-notion-text-muted-light dark:text-notion-text-muted-dark leading-relaxed">
          Carga una hoja de cálculo para añadir nuevos prospectos o actualizar los existentes de manera automática.
        </p>

        {/* Input file de Notion style */}
        <div className="flex items-center justify-center border border-dashed border-notion-border-light dark:border-notion-border-dark rounded-xl p-6 bg-[#fbfbfa]/40 dark:bg-[#1c1c1c]/40 hover:bg-[#fbfbfa]/75 dark:hover:bg-[#1c1c1c]/75 transition-all">
          <label className="flex flex-col items-center gap-2.5 cursor-pointer text-center">
            <FileSpreadsheet size={28} className="text-indigo-500 animate-pulse" />
            <span className="font-bold text-notion-text-light dark:text-notion-text-dark">
              {file ? file.name : 'Selecciona o arrastra tu archivo Excel'}
            </span>
            <span className="text-[10px] text-notion-text-muted-light dark:text-notion-text-muted-dark font-mono">Formatos admitidos: .xlsx, .xls</span>
            <input 
              type="file" 
              accept=".xlsx, .xls"
              onChange={handleFileChange}
              className="hidden" 
            />
          </label>
        </div>

        {/* Mapeador de Columnas */}
        {headers.length > 0 && (
          <div className="p-4 rounded-xl border border-notion-border-light/60 dark:border-notion-border-dark/60 bg-[#fbfbfa]/50 dark:bg-[#1c1c1c]/50 space-y-4">
            <div className="flex items-center gap-1.5 text-notion-text-light dark:text-notion-text-dark font-bold">
              <Info size={14} className="text-indigo-500" />
              <span>Mapeo de Campos del CRM</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-[11px]">
              {Object.keys(mappings).map((field) => (
                <div key={field} className="space-y-1">
                  <label htmlFor={`xlsx-map-${field}`} className="capitalize font-semibold text-notion-text-muted-light dark:text-notion-text-muted-dark">
                    {field === 'nombre' ? 'Nombre / Negocio *' : field}
                  </label>
                  <select
                    id={`xlsx-map-${field}`}
                    value={mappings[field]}
                    onChange={(e) => handleMappingChange(field, e.target.value)}
                    className="w-full px-2 py-1 rounded border border-notion-border-light dark:border-notion-border-dark bg-notion-card-light dark:bg-notion-card-dark text-notion-text-light dark:text-notion-text-dark"
                  >
                    <option value="">-- No mapear --</option>
                    {headers.map(h => (
                      <option key={h} value={h}>{h}</option>
                    ))}
                  </select>
                </div>
              ))}
            </div>

            <button
              onClick={executeImport}
              className="flex items-center gap-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg shadow-sm transition-all w-fit"
            >
              <Play size={12} />
              <span>Procesar Importación</span>
            </button>
          </div>
        )}

        {/* Resumen de Importación */}
        {importSummary && (
          <div className="p-4 rounded-xl border border-emerald-500/20 bg-emerald-500/5 text-emerald-500 space-y-2">
            <div className="flex items-center gap-2 font-bold">
              <CheckCircle size={16} />
              <span>¡Importación completada con éxito!</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center font-mono font-bold text-xs pt-1">
              <div className="p-2.5 rounded bg-emerald-500/5 border border-emerald-500/10">
                <div className="text-[10px] uppercase text-notion-text-muted-light dark:text-notion-text-muted-dark">Nuevos</div>
                <div className="text-sm mt-0.5">{importSummary.nuevos}</div>
              </div>
              <div className="p-2.5 rounded bg-emerald-500/5 border border-emerald-500/10">
                <div className="text-[10px] uppercase text-notion-text-muted-light dark:text-notion-text-muted-dark">Actualizados</div>
                <div className="text-sm mt-0.5">{importSummary.actualizados}</div>
              </div>
              <div className="p-2.5 rounded bg-emerald-500/5 border border-emerald-500/10">
                <div className="text-[10px] uppercase text-notion-text-muted-light dark:text-notion-text-muted-dark">Duplicados</div>
                <div className="text-sm mt-0.5">{importSummary.duplicados}</div>
              </div>
              <div className="p-2.5 rounded bg-rose-500/5 border border-rose-500/10 text-rose-500">
                <div className="text-[10px] uppercase text-notion-text-muted-light dark:text-notion-text-muted-dark">Errores</div>
                <div className="text-sm mt-0.5">{importSummary.errores}</div>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* SECCIÓN 2: EXPORTAR EXCEL */}
      <div className="p-6 rounded-xl border border-notion-border-light dark:border-notion-border-dark bg-notion-card-light dark:bg-notion-card-dark notion-shadow space-y-4">
        <div className="flex items-center gap-2 border-b border-notion-border-light dark:border-notion-border-dark pb-3">
          <Download size={16} className="text-indigo-500" />
          <h2 className="text-sm font-bold text-notion-text-light dark:text-notion-text-dark">Exportar Prospectos a Excel (.xlsx)</h2>
        </div>

        <p className="text-notion-text-muted-light dark:text-notion-text-muted-dark leading-relaxed">
          Configura los filtros de segmentación de la base de datos para exportar los prospectos deseados a un documento descargable.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-[11px] p-4 rounded-xl border border-notion-border-light/60 dark:border-notion-border-dark/60 bg-[#fbfbfa]/30 dark:bg-[#1c1c1c]/30">
          <div className="space-y-1">
            <label htmlFor="xlsx-filter-estado" className="font-semibold text-notion-text-muted-light dark:text-notion-text-muted-dark">Filtrar por Estado</label>
            <select
              id="xlsx-filter-estado"
              value={filterEstado}
              onChange={(e) => setFilterEstado(e.target.value)}
              className="w-full px-2.5 py-1.5 rounded border border-notion-border-light dark:border-notion-border-dark bg-notion-card-light dark:bg-notion-card-dark text-notion-text-light dark:text-notion-text-dark"
            >
              <option value="Todos">Todos los Estados</option>
              <option value="Prospecto">Prospecto</option>
              <option value="Contactado">Contactado</option>
              <option value="Negociación">Negociación</option>
              <option value="Cerrado">Cerrado / Ganado</option>
              <option value="Perdido / pausado">Perdidos / Pausados</option>
            </select>
          </div>

          <div className="space-y-1">
            <label htmlFor="xlsx-filter-responsable" className="font-semibold text-notion-text-muted-light dark:text-notion-text-muted-dark">Filtrar por Responsable</label>
            <select
              id="xlsx-filter-responsable"
              value={filterResponsable}
              onChange={(e) => setFilterResponsable(e.target.value)}
              className="w-full px-2.5 py-1.5 rounded border border-notion-border-light dark:border-notion-border-dark bg-notion-card-light dark:bg-notion-card-dark text-notion-text-light dark:text-notion-text-dark"
            >
              <option value="Todos">Todos los Responsables</option>
              {INTEGRANTES.map(user => (
                <option key={user.id} value={user.id}>{user.nombre}</option>
              ))}
            </select>
          </div>

          <div className="space-y-1">
            <label htmlFor="xlsx-filter-prioridad" className="font-semibold text-notion-text-muted-light dark:text-notion-text-muted-dark">Filtrar por Prioridad</label>
            <select
              id="xlsx-filter-prioridad"
              value={filterPrioridad}
              onChange={(e) => setFilterPrioridad(e.target.value)}
              className="w-full px-2.5 py-1.5 rounded border border-notion-border-light dark:border-notion-border-dark bg-notion-card-light dark:bg-notion-card-dark text-notion-text-light dark:text-notion-text-dark"
            >
              <option value="Todos">Todas las Prioridades</option>
              <option value="Baja">Baja</option>
              <option value="Media">Media</option>
              <option value="Alta">Alta</option>
            </select>
          </div>
        </div>

        <button
          onClick={executeExport}
          className="flex items-center gap-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg shadow-sm transition-all w-fit"
        >
          <Download size={14} />
          <span>Generar y Exportar Excel</span>
        </button>
      </div>

    </div>
  );
}
