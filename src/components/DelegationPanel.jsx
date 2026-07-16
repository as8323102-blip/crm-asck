import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import { 
  FileSpreadsheet, 
  Upload, 
  Search, 
  Filter, 
  Edit3, 
  CheckSquare, 
  Square,
  AlertTriangle,
  CheckCircle,
  Plus,
  Trash2,
  Calendar,
  User,
  ExternalLink,
  ChevronRight,
  Briefcase
} from 'lucide-react';
import { INTEGRANTES } from '../mockData';

// Constantes de Mapeo idénticas al plan de importación
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

export default function DelegationPanel({ 
  tasks, 
  setTasks, 
  onAddTask,
  onUpdateTask, 
  onDeleteTask, 
  logEvent 
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterState, setFilterState] = useState('Todos');
  const [filterOwner, setFilterOwner] = useState('Todos');
  const [importSummary, setImportSummary] = useState(null);
  const [editingTask, setEditingTask] = useState(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // Estados del Formulario de Creación/Edición
  const [formTitle, setFormTitle] = useState('');
  const [formArea, setFormArea] = useState('General');
  const [formOwner, setFormOwner] = useState('');
  const [formSupport, setFormSupport] = useState('');
  const [formPriority, setFormPriority] = useState('P2');
  const [formState, setFormState] = useState('Pendiente');
  const [formStartDate, setFormStartDate] = useState('');
  const [formEndDate, setFormEndDate] = useState('');
  const [formDeliverable, setFormDeliverable] = useState('');
  const [formJustification, setFormJustification] = useState('');
  const [formRisk, setFormRisk] = useState('');
  const [formNextAction, setFormNextAction] = useState('');

  // Filtrar tareas operativas (las que provienen del Excel o tienen macroárea/apoyo configurado)
  const operativeTasks = tasks.filter(t => t.id.startsWith('t-excel') || t.macroarea);

  const getFilteredTasks = () => {
    return operativeTasks.filter(t => {
      const matchSearch = (t.titulo || '').toLowerCase().includes(searchTerm.toLowerCase()) || 
                          (t.macroarea || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (t.responsableNombre || '').toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchState = filterState === 'Todos' || t.estado === filterState;
      const matchOwner = filterOwner === 'Todos' || t.asignadoA === filterOwner;
      
      return matchSearch && matchState && matchOwner;
    });
  };

  const filteredTasks = getFilteredTasks();

  // Procesar subida de Excel
  const handleExcelUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (evt) => {
      try {
        const data = new Uint8Array(evt.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = 'Tareas ASCK';
        
        if (!workbook.SheetNames.includes(sheetName)) {
          alert(`Error: La pestaña '${sheetName}' no existe en el archivo Excel.`);
          return;
        }

        const sheet = workbook.Sheets[sheetName];
        const jsonRows = XLSX.utils.sheet_to_json(sheet, { header: 1 });

        if (jsonRows.length === 0) {
          alert("Error: La hoja de tareas está vacía.");
          return;
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
          alert("Error: No se pudo identificar la fila de cabeceras en el Excel.");
          return;
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

        let readCount = 0;
        let createCount = 0;
        let updateCount = 0;
        let errores = 0;

        const currentTasks = [...tasks];
        const updatedTasks = [...tasks];

        for (let i = 0; i < dataRows.length; i++) {
          const row = dataRows[i];
          if (!row || row.length === 0) continue;

          const getRowVal = (colIndex) => {
            if (colIndex === -1 || colIndex >= row.length) return '';
            return String(row[colIndex] || '').trim();
          };

          const title = getRowVal(colIdx.pendiente);
          if (!title) continue;

          readCount++;

          try {
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

            const taskData = {
              id: idVal,
              titulo: title,
              macroarea: macroarea,
              asignadoA: mapNameToId(responsible) || null,
              responsableNombre: responsible || 'Sin asignar',
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

            // Validar responsable
            const validResponsibles = ['Kevin', 'Sebas', 'Alberto', 'Centeno'];
            if (responsible && !validResponsibles.includes(responsible)) {
              taskData.asignadoA = null;
              taskData.responsableNombre = 'Sin asignar';
            }

            // Buscar si ya existe
            let matchIdx = -1;
            if (rawId) {
              matchIdx = updatedTasks.findIndex(t => t.id === idVal);
            }
            if (matchIdx === -1) {
              matchIdx = updatedTasks.findIndex(t => (t.titulo || '').toLowerCase().replace(/[^a-z0-9]/g, '') === title.toLowerCase().replace(/[^a-z0-9]/g, ''));
            }

            if (matchIdx !== -1) {
              const existing = updatedTasks[matchIdx];
              const merged = { ...existing, ...taskData, id: existing.id };
              await onUpdateTask(existing.id, merged);
              updatedTasks[matchIdx] = merged;
              updateCount++;
            } else {
              const newT = { ...taskData, createdAt: new Date().toISOString() };
              await onAddTask(newT);
              updatedTasks.push(newT);
              createCount++;
            }

          } catch (err) {
            console.error(err);
            errores++;
          }
        }

        setTasks(updatedTasks);
        setImportSummary({ readCount, createCount, updateCount, errores });
        logEvent(`importó tareas operativas desde Excel: ${file.name}`);
        setTimeout(() => setImportSummary(null), 8000);

      } catch (err) {
        alert("Ocurrió un error al procesar el archivo Excel.");
        console.error(err);
      }
    };
    reader.readAsArrayBuffer(file);
  };

  // Abrir Modal de Edición
  const openEditModal = (task) => {
    setEditingTask(task);
    setFormTitle(task.titulo || '');
    setFormArea(task.macroarea || 'General');
    setFormOwner(task.asignadoA || '');
    setFormSupport(task.apoyo || '');
    setFormPriority(task.prioridad || 'P2');
    setFormState(task.estado || 'Pendiente');
    setFormStartDate(task.fechaInicio || '');
    setFormEndDate(task.fechaLimite || '');
    setFormDeliverable(task.entregable || '');
    setFormJustification(task.justificacion || '');
    setFormRisk(task.bloqueo || '');
    setFormNextAction(task.proximaAccion || '');
  };

  // Guardar Cambios de Edición/Creación
  const saveTaskForm = async (e) => {
    e.preventDefault();
    if (!formTitle.trim()) return;

    const ownerObj = INTEGRANTES.find(i => i.id === formOwner);
    const ownerName = ownerObj ? ownerObj.nombre : 'Sin asignar';

    const taskData = {
      titulo: formTitle,
      macroarea: formArea,
      asignadoA: formOwner || null,
      responsableNombre: ownerName,
      apoyo: formSupport,
      prioridad: formPriority,
      estado: formState,
      completada: formState === 'Hecho',
      fechaInicio: formStartDate,
      fechaLimite: formEndDate,
      entregable: formDeliverable,
      justificacion: formJustification,
      bloqueo: formRisk,
      proximaAccion: formNextAction,
      updatedAt: new Date().toISOString()
    };

    if (editingTask) {
      // Actualizar
      await onUpdateTask(editingTask.id, taskData);
      setTasks(prev => prev.map(t => t.id === editingTask.id ? { ...t, ...taskData } : t));
      logEvent(`actualizó la tarea operativa "${formTitle}"`);
    } else {
      // Crear nueva
      const newId = `t-excel-gen-${Date.now()}`;
      const newT = {
        id: newId,
        ...taskData,
        createdAt: new Date().toISOString()
      };
      await onAddTask(newT);
      setTasks(prev => [newT, ...prev]);
      logEvent(`creó la tarea operativa "${formTitle}"`);
    }

    setEditingTask(null);
    setIsCreateModalOpen(false);
    clearForm();
  };

  const clearForm = () => {
    setFormTitle('');
    setFormArea('General');
    setFormOwner('');
    setFormSupport('');
    setFormPriority('P2');
    setFormState('Pendiente');
    setFormStartDate('');
    setFormEndDate('');
    setFormDeliverable('');
    setFormJustification('');
    setFormRisk('');
    setFormNextAction('');
  };

  // Alternar completado rápido desde la tabla
  const handleToggleQuick = async (task) => {
    const newStatus = !task.completada;
    const newState = newStatus ? 'Hecho' : 'Pendiente';
    
    await onUpdateTask(task.id, {
      completada: newStatus,
      estado: newState,
      updatedAt: new Date().toISOString()
    });

    setTasks(prev => prev.map(t => t.id === task.id ? { ...t, completada: newStatus, estado: newState } : t));
    logEvent(`${newStatus ? 'completó' : 'reabrió'} la tarea operativa "${task.titulo}"`);
  };

  // Colores de los badges de estado
  const getStateColor = (state) => {
    switch (state) {
      case 'Hecho': return 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20';
      case 'En progreso': return 'bg-indigo-500/10 text-indigo-500 border border-indigo-500/20';
      case 'Bloqueado': return 'bg-rose-500/10 text-rose-500 border border-rose-500/20';
      case 'Pausado': return 'bg-amber-500/10 text-amber-500 border border-amber-500/20';
      case 'Cancelado': return 'bg-slate-500/10 text-slate-500 border border-slate-500/20';
      default: return 'bg-gray-500/10 text-gray-500 border border-gray-500/20';
    }
  };

  // Colores de prioridad
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'P0': return 'bg-rose-500/20 text-rose-500 font-bold';
      case 'P1': return 'bg-amber-500/20 text-amber-500 font-bold';
      default: return 'bg-slate-500/20 text-slate-400';
    }
  };

  return (
    <div className="space-y-6 text-xs max-w-7xl mx-auto">
      
      {/* Encabezado con estadísticas rápidas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl border border-notion-border-light dark:border-notion-border-dark bg-notion-card-light dark:bg-notion-card-dark notion-shadow">
          <div className="text-notion-text-muted-light dark:text-notion-text-muted-dark uppercase tracking-tight text-[10px] font-bold">Total Tareas Operativas</div>
          <div className="text-2xl font-black text-notion-text-light dark:text-notion-text-dark mt-1 font-mono">{operativeTasks.length}</div>
        </div>
        <div className="p-4 rounded-xl border border-notion-border-light dark:border-notion-border-dark bg-notion-card-light dark:bg-notion-card-dark notion-shadow">
          <div className="text-notion-text-muted-light dark:text-notion-text-muted-dark uppercase tracking-tight text-[10px] font-bold">Hechas</div>
          <div className="text-2xl font-black text-emerald-500 mt-1 font-mono">
            {operativeTasks.filter(t => t.completada).length}
          </div>
        </div>
        <div className="p-4 rounded-xl border border-notion-border-light dark:border-notion-border-dark bg-notion-card-light dark:bg-notion-card-dark notion-shadow">
          <div className="text-notion-text-muted-light dark:text-notion-text-muted-dark uppercase tracking-tight text-[10px] font-bold">En Progreso</div>
          <div className="text-2xl font-black text-indigo-500 mt-1 font-mono">
            {operativeTasks.filter(t => t.estado === 'En progreso').length}
          </div>
        </div>
        <div className="p-4 rounded-xl border border-notion-border-light dark:border-notion-border-dark bg-notion-card-light dark:bg-notion-card-dark notion-shadow">
          <div className="text-notion-text-muted-light dark:text-notion-text-muted-dark uppercase tracking-tight text-[10px] font-bold">Bloqueadas</div>
          <div className="text-2xl font-black text-rose-500 mt-1 font-mono">
            {operativeTasks.filter(t => t.estado === 'Bloqueado').length}
          </div>
        </div>
      </div>

      {/* Controles de Acción y Búsqueda */}
      <div className="p-5 rounded-xl border border-notion-border-light dark:border-notion-border-dark bg-notion-card-light dark:bg-notion-card-dark notion-shadow space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          {/* Barra de Búsqueda */}
          <div className="flex items-center gap-2 flex-1 max-w-md bg-[#fbfbfa]/50 dark:bg-[#1c1c1c]/50 border border-notion-border-light dark:border-notion-border-dark rounded-lg px-3 py-1.5 focus-within:border-indigo-500 transition-all">
            <Search size={14} className="text-notion-text-muted-light dark:text-notion-text-muted-dark" />
            <input
              type="text"
              placeholder="Buscar por tarea, área o responsable..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-transparent border-none outline-none text-notion-text-light dark:text-notion-text-dark w-full placeholder-notion-text-muted-light dark:placeholder-notion-text-muted-dark"
            />
          </div>

          {/* Filtros Rápidos */}
          <div className="flex items-center gap-2.5 flex-wrap">
            <div className="flex items-center gap-1.5">
              <Filter size={13} className="text-notion-text-muted-light dark:text-notion-text-muted-dark" />
              <span className="font-semibold text-notion-text-muted-light dark:text-notion-text-muted-dark">Estado:</span>
            </div>
            <select
              value={filterState}
              onChange={(e) => setFilterState(e.target.value)}
              className="px-2 py-1.5 rounded border border-notion-border-light dark:border-notion-border-dark bg-notion-card-light dark:bg-notion-card-dark text-notion-text-light dark:text-notion-text-dark"
            >
              <option value="Todos">Todos</option>
              <option value="Pendiente">Pendiente</option>
              <option value="En progreso">En progreso</option>
              <option value="Hecho">Hecho</option>
              <option value="Bloqueado">Bloqueado</option>
              <option value="Pausado">Pausado</option>
              <option value="Cancelado">Cancelado</option>
            </select>

            <select
              value={filterOwner}
              onChange={(e) => setFilterOwner(e.target.value)}
              className="px-2 py-1.5 rounded border border-notion-border-light dark:border-notion-border-dark bg-notion-card-light dark:bg-notion-card-dark text-notion-text-light dark:text-notion-text-dark"
            >
              <option value="Todos">Todos los integrantes</option>
              {INTEGRANTES.map(user => (
                <option key={user.id} value={user.id}>{user.nombre}</option>
              ))}
            </select>

            {/* Crear nueva tarea */}
            <button
              onClick={() => { setEditingTask(null); clearForm(); setIsCreateModalOpen(true); }}
              className="flex items-center gap-1 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-bold shadow-sm transition-all"
            >
              <Plus size={13} />
              <span>Crear Pendiente</span>
            </button>

            {/* Botón Subir Excel */}
            <label className="flex items-center gap-1.5 px-3 py-1.5 border border-emerald-500/25 bg-emerald-500/5 hover:bg-emerald-500/10 text-emerald-500 rounded-lg font-bold cursor-pointer transition-all">
              <Upload size={13} />
              <span>Actualizar con Excel</span>
              <input
                type="file"
                accept=".xlsx, .xls"
                onChange={handleExcelUpload}
                className="hidden"
              />
            </label>

          </div>
        </div>

        {/* Resumen de Importación */}
        {importSummary && (
          <div className="p-3 rounded-lg border border-emerald-500/20 bg-emerald-500/5 text-emerald-500 flex items-center justify-between">
            <div className="flex items-center gap-2 font-semibold">
              <CheckCircle size={15} />
              <span>Excel procesado: {importSummary.readCount} leídos | {importSummary.createCount} creados | {importSummary.updateCount} actualizados | {importSummary.errores} errores</span>
            </div>
          </div>
        )}

      </div>

      {/* Tabla estilo Hoja de Cálculo / Notion */}
      <div className="p-1 rounded-xl border border-notion-border-light dark:border-notion-border-dark bg-notion-card-light dark:bg-notion-card-dark notion-shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-[11px] text-left border-collapse min-w-[1200px]">
            <thead>
              <tr className="border-b border-notion-border-light dark:border-notion-border-dark bg-[#fbfbfa] dark:bg-slate-900/40 text-notion-text-muted-light dark:text-notion-text-muted-dark font-bold">
                <th className="p-3 w-12 text-center">Hecho</th>
                <th className="p-3 w-28">Macroárea</th>
                <th className="p-3 w-64">Tarea / Pendiente</th>
                <th className="p-3 w-32">Responsable</th>
                <th className="p-3 w-32">Apoyo</th>
                <th className="p-3 w-20 text-center">Prioridad</th>
                <th className="p-3 w-28 text-center">Estado</th>
                <th className="p-3 w-24">Límite</th>
                <th className="p-3 w-64">Entregable claro</th>
                <th className="p-3 w-24 text-center">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-notion-border-light/60 dark:divide-notion-border-dark/60">
              {filteredTasks.length === 0 ? (
                <tr>
                  <td colSpan="10" className="p-8 text-center text-notion-text-muted-light dark:text-notion-text-muted-dark">
                    No se encontraron tareas operativas coincidentes.
                  </td>
                </tr>
              ) : (
                filteredTasks.map(task => (
                  <tr 
                    key={task.id} 
                    className="hover:bg-[#fbfbfa]/50 dark:hover:bg-slate-900/20 group transition-all"
                  >
                    {/* Checkbox Rápido */}
                    <td className="p-2.5 text-center">
                      <button 
                        onClick={() => handleToggleQuick(task)}
                        className="text-notion-text-muted-light dark:text-notion-text-muted-dark hover:text-indigo-500 transition-all inline-block"
                      >
                        {task.completada ? (
                          <CheckSquare size={16} className="text-emerald-500" />
                        ) : (
                          <Square size={16} />
                        )}
                      </button>
                    </td>

                    {/* Macroárea */}
                    <td className="p-2.5 font-semibold text-notion-text-light dark:text-notion-text-dark">
                      <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-[10px]">
                        {task.macroarea}
                      </span>
                    </td>

                    {/* Título de Tarea */}
                    <td className={`p-2.5 font-medium max-w-xs truncate ${task.completada ? 'line-through text-notion-text-muted-light dark:text-notion-text-muted-dark' : 'text-notion-text-light dark:text-notion-text-dark'}`} title={task.titulo}>
                      {task.titulo}
                    </td>

                    {/* Responsable */}
                    <td className="p-2.5 text-notion-text-light dark:text-notion-text-dark">
                      <div className="flex items-center gap-1.5">
                        <div className="w-5 h-5 rounded-full bg-indigo-500/10 text-indigo-500 flex items-center justify-center font-bold text-[9px] uppercase">
                          {task.responsableNombre?.charAt(0) || '?'}
                        </div>
                        <span>{task.responsableNombre}</span>
                      </div>
                    </td>

                    {/* Apoyo */}
                    <td className="p-2.5 text-notion-text-muted-light dark:text-notion-text-muted-dark">
                      {task.apoyo || <span className="text-[9px] italic">Ninguno</span>}
                    </td>

                    {/* Prioridad */}
                    <td className="p-2.5 text-center">
                      <span className={`px-2 py-0.5 rounded-full text-[9px] uppercase ${getPriorityColor(task.prioridad)}`}>
                        {task.prioridad}
                      </span>
                    </td>

                    {/* Estado */}
                    <td className="p-2.5 text-center">
                      <span className={`px-2 py-0.5 rounded-md text-[9px] font-bold uppercase ${getStateColor(task.estado)}`}>
                        {task.estado}
                      </span>
                    </td>

                    {/* Fecha Límite */}
                    <td className="p-2.5 text-notion-text-muted-light dark:text-notion-text-muted-dark font-mono text-[10px]">
                      {task.fechaLimite || <span className="text-[9px] italic">-</span>}
                    </td>

                    {/* Entregable */}
                    <td className="p-2.5 text-notion-text-muted-light dark:text-notion-text-muted-dark max-w-xs truncate" title={task.entregable}>
                      {task.entregable || <span className="text-[9px] italic">Sin entregable claro</span>}
                    </td>

                    {/* Acciones */}
                    <td className="p-2.5 text-center">
                      <div className="flex items-center justify-center gap-1">
                        <button
                          onClick={() => openEditModal(task)}
                          className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded text-notion-text-muted-light dark:text-notion-text-muted-dark hover:text-indigo-500 transition-all"
                          title="Editar detalles completos"
                        >
                          <Edit3 size={13} />
                        </button>
                        <button
                          onClick={() => { if(confirm('¿Eliminar esta tarea operativa?')) onDeleteTask(task.id); }}
                          className="p-1 hover:bg-rose-500/10 rounded text-notion-text-muted-light dark:text-notion-text-muted-dark hover:text-rose-500 transition-all"
                          title="Eliminar"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </td>

                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL DE EDICIÓN Y CREACIÓN */}
      {(editingTask || isCreateModalOpen) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-notion-card-light dark:bg-[#0f172a] border border-notion-border-light dark:border-slate-800 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto notion-shadow text-xs">
            
            <div className="flex items-center justify-between p-5 border-b border-notion-border-light dark:border-slate-800">
              <div className="flex items-center gap-2">
                <Briefcase size={16} className="text-indigo-500" />
                <h3 className="text-sm font-bold text-notion-text-light dark:text-notion-text-dark">
                  {editingTask ? `Editar Tarea: ${formTitle}` : 'Crear Nueva Tarea Operativa'}
                </h3>
              </div>
              <button 
                onClick={() => { setEditingTask(null); setIsCreateModalOpen(false); }}
                className="text-notion-text-muted-light dark:text-notion-text-muted-dark hover:text-notion-text-light dark:hover:text-notion-text-dark"
              >
                Cerrar
              </button>
            </div>

            <form onSubmit={saveTaskForm} className="p-6 space-y-4">
              
              {/* Título y Macroárea */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2 space-y-1">
                  <label className="font-semibold text-notion-text-muted-light dark:text-notion-text-muted-dark">Título / Pendiente *</label>
                  <input
                    type="text"
                    required
                    value={formTitle}
                    onChange={(e) => setFormTitle(e.target.value)}
                    placeholder="Ej. Terminar WebParaTuNegocio.lat"
                    className="w-full px-3 py-1.5 rounded border border-notion-border-light dark:border-slate-800 bg-notion-bg-light dark:bg-slate-900/50 text-notion-text-light dark:text-notion-text-dark outline-none focus:border-indigo-500"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-semibold text-notion-text-muted-light dark:text-notion-text-muted-dark">Macroárea</label>
                  <input
                    type="text"
                    value={formArea}
                    onChange={(e) => setFormArea(e.target.value)}
                    placeholder="Ej. Web/Landing"
                    className="w-full px-3 py-1.5 rounded border border-notion-border-light dark:border-slate-800 bg-notion-bg-light dark:bg-slate-900/50 text-notion-text-light dark:text-notion-text-dark outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              {/* Responsable, Apoyo, Prioridad y Estado */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="space-y-1">
                  <label className="font-semibold text-notion-text-muted-light dark:text-notion-text-muted-dark">Responsable</label>
                  <select
                    value={formOwner}
                    onChange={(e) => setFormOwner(e.target.value)}
                    className="w-full px-2 py-1.5 rounded border border-notion-border-light dark:border-slate-800 bg-notion-bg-light dark:bg-slate-900/50 text-notion-text-light dark:text-notion-text-dark"
                  >
                    <option value="">Sin asignar</option>
                    {INTEGRANTES.map(user => (
                      <option key={user.id} value={user.id}>{user.nombre}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="font-semibold text-notion-text-muted-light dark:text-notion-text-muted-dark">Apoyo</label>
                  <input
                    type="text"
                    value={formSupport}
                    onChange={(e) => setFormSupport(e.target.value)}
                    placeholder="Ej. Kevin / Alberto"
                    className="w-full px-3 py-1.5 rounded border border-notion-border-light dark:border-slate-800 bg-notion-bg-light dark:bg-slate-900/50 text-notion-text-light dark:text-notion-text-dark"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-semibold text-notion-text-muted-light dark:text-notion-text-muted-dark">Prioridad</label>
                  <select
                    value={formPriority}
                    onChange={(e) => setFormPriority(e.target.value)}
                    className="w-full px-2 py-1.5 rounded border border-notion-border-light dark:border-slate-800 bg-notion-bg-light dark:bg-slate-900/50 text-notion-text-light dark:text-notion-text-dark"
                  >
                    <option value="P0">P0 (Alta)</option>
                    <option value="P1">P1 (Media)</option>
                    <option value="P2">P2 (Baja)</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="font-semibold text-notion-text-muted-light dark:text-notion-text-muted-dark">Estado</label>
                  <select
                    value={formState}
                    onChange={(e) => setFormState(e.target.value)}
                    className="w-full px-2 py-1.5 rounded border border-notion-border-light dark:border-slate-800 bg-notion-bg-light dark:bg-slate-900/50 text-notion-text-light dark:text-notion-text-dark"
                  >
                    <option value="Pendiente">Pendiente</option>
                    <option value="En progreso">En progreso</option>
                    <option value="Hecho">Hecho</option>
                    <option value="Bloqueado">Bloqueado</option>
                    <option value="Pausado">Pausado</option>
                    <option value="Cancelado">Cancelado</option>
                  </select>
                </div>
              </div>

              {/* Fechas de Inicio y Límite */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-semibold text-notion-text-muted-light dark:text-notion-text-muted-dark">Fecha de Inicio</label>
                  <input
                    type="date"
                    value={formStartDate}
                    onChange={(e) => setFormStartDate(e.target.value)}
                    className="w-full px-3 py-1.5 rounded border border-notion-border-light dark:border-slate-800 bg-notion-bg-light dark:bg-slate-900/50 text-notion-text-light dark:text-notion-text-dark"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-semibold text-notion-text-muted-light dark:text-notion-text-muted-dark">Fecha Límite</label>
                  <input
                    type="date"
                    value={formEndDate}
                    onChange={(e) => setFormEndDate(e.target.value)}
                    className="w-full px-3 py-1.5 rounded border border-notion-border-light dark:border-slate-800 bg-notion-bg-light dark:bg-slate-900/50 text-notion-text-light dark:text-notion-text-dark"
                  />
                </div>
              </div>

              {/* Entregable Claro */}
              <div className="space-y-1">
                <label className="font-semibold text-notion-text-muted-light dark:text-notion-text-muted-dark">Entregable Claro (¿Qué se entrega?)</label>
                <textarea
                  rows="2"
                  value={formDeliverable}
                  onChange={(e) => setFormDeliverable(e.target.value)}
                  placeholder="Ej. Landing final visual, responsive, estética cyber y CTA listo"
                  className="w-full px-3 py-1.5 rounded border border-notion-border-light dark:border-slate-800 bg-notion-bg-light dark:bg-slate-900/50 text-notion-text-light dark:text-notion-text-dark"
                />
              </div>

              {/* Justificación por Rol */}
              <div className="space-y-1">
                <label className="font-semibold text-notion-text-muted-light dark:text-notion-text-muted-dark">Justificación por Rol / Criterio</label>
                <textarea
                  rows="2"
                  value={formJustification}
                  onChange={(e) => setFormJustification(e.target.value)}
                  placeholder="Ej. Soporte técnico y desarrollo de backend/arquitectura del sistema por Alberto (Técnico)."
                  className="w-full px-3 py-1.5 rounded border border-notion-border-light dark:border-slate-800 bg-notion-bg-light dark:bg-slate-900/50 text-notion-text-light dark:text-notion-text-dark"
                />
              </div>

              {/* Bloqueo / Riesgo y Próxima Acción */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-semibold text-notion-text-muted-light dark:text-notion-text-muted-dark">Bloqueo / Riesgo actual</label>
                  <input
                    type="text"
                    value={formRisk}
                    onChange={(e) => setFormRisk(e.target.value)}
                    placeholder="Ej. Falta de assets gráficos del cliente"
                    className="w-full px-3 py-1.5 rounded border border-notion-border-light dark:border-slate-800 bg-notion-bg-light dark:bg-slate-900/50 text-notion-text-light dark:text-notion-text-dark"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-semibold text-notion-text-muted-light dark:text-notion-text-muted-dark">Próxima acción inmediata</label>
                  <input
                    type="text"
                    value={formNextAction}
                    onChange={(e) => setFormNextAction(e.target.value)}
                    placeholder="Ej. Enviar mensaje de WhatsApp para recordar"
                    className="w-full px-3 py-1.5 rounded border border-notion-border-light dark:border-slate-800 bg-notion-bg-light dark:bg-slate-900/50 text-notion-text-light dark:text-notion-text-dark"
                  />
                </div>
              </div>

              {/* Botones de acción */}
              <div className="flex items-center justify-end gap-2 pt-4 border-t border-notion-border-light dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => { setEditingTask(null); setIsCreateModalOpen(false); }}
                  className="px-4 py-2 border border-notion-border-light dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900 rounded-lg text-notion-text-muted-light dark:text-notion-text-muted-dark transition-all"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-bold shadow-sm transition-all"
                >
                  {editingTask ? 'Guardar Cambios' : 'Crear Tarea'}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}
