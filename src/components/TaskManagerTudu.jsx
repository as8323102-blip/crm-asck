import React, { useState } from 'react';
import {
  Clock,
  Trash2,
  FolderOpen,
  User,
  AlertCircle,
  Plus,
  LayoutDashboard,
  List,
  Lock,
  CheckCircle,
  ShieldAlert,
  X,
  PlusCircle,
  TrendingUp
} from 'lucide-react';
import { INTEGRANTES } from '../mockData';

export default function TaskManagerTudu({
  tasks = [],
  clients = [],
  sprints = [],
  currentUser,
  onAddTask,
  onUpdateTask,
  onDeleteTask,
  onAddSprint
}) {
  // Vista Activa
  const [activeView, setActiveView] = useState('mando'); // 'mando', 'todas', 'kevin', 'sebas', 'alberto', 'centeno', 'urgentes', 'bloqueadas', 'hechas'

  // Filtros de la Tabla General
  const [filterOwner, setFilterOwner] = useState('Todos');
  const [filterSupport, setFilterSupport] = useState('Todos');
  const [filterPriority, setFilterPriority] = useState('Todos');
  const [filterState, setFilterState] = useState('Todos');
  const [filterArea, setFilterArea] = useState('Todos');
  const [filterSpecial, setFilterSpecial] = useState('Todos'); // 'Todos', 'vencidos_bloqueados', 'completados'

  // Ciclo seleccionado en Kanban
  const [selectedSprintId, setSelectedSprintId] = useState('Todos');

  // Modal Nuevo Ciclo
  const [sprintModalOpen, setSprintModalOpen] = useState(false);
  const [sprName, setSprName] = useState('');
  const [sprStart, setSprStart] = useState('');
  const [sprEnd, setSprEnd] = useState('');
  const [sprGoal, setSprGoal] = useState('');
  const [sprOwner, setSprOwner] = useState(currentUser ? currentUser.id : '');
  const [sprStatus, setSprStatus] = useState('Planeado');

  // Formulario nueva tarea
  const [taskFormOpen, setTaskFormOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newSprintId, setNewSprintId] = useState('');
  const [newClientId, setNewClientId] = useState('');
  const [newAssignee, setNewAssignee] = useState(currentUser ? currentUser.id : '');
  const [newSupport, setNewSupport] = useState('');
  const [newPriority, setNewPriority] = useState('P2');
  const [newState, setNewState] = useState('Pendiente');
  const [newArea, setNewArea] = useState('General');
  const [newJustification, setNewJustification] = useState('');
  const [newRisk, setNewRisk] = useState('');
  const [newNextAction, setNewNextAction] = useState('');
  const [newDate, setNewDate] = useState('');
  const [newTime, setNewTime] = useState('');
  const [newDuration, setNewDuration] = useState('1 hora');
  const [newObservations, setNewObservations] = useState('');

  // Definición de las 9 Vistas
  const viewsList = [
    { id: 'mando', label: 'Centro de Mando', icon: LayoutDashboard, desc: 'Métricas clave y KPIs de avance del equipo' },
    { id: 'todas', label: 'Todas las Tareas', icon: List, desc: 'Tabla general con filtros avanzados' },
    { id: 'kevin', label: 'Kevin (Ventas/Cierre)', icon: User, desc: 'Mis tareas como responsable o apoyo' },
    { id: 'sebas', label: 'Sebas (Diseño/Visual)', icon: User, desc: 'Mis tareas como responsable o apoyo' },
    { id: 'alberto', label: 'Alberto (Backend/Bugs)', icon: User, desc: 'Mis tareas como responsable o apoyo' },
    { id: 'centeno', label: 'Centeno (Organización)', icon: User, desc: 'Mis tareas como responsable o apoyo' },
    { id: 'urgentes', label: 'P0 Urgentes', icon: ShieldAlert, desc: 'Prioridad crítica P0 sin completar' },
    { id: 'bloqueadas', label: 'Bloqueadas', icon: Lock, desc: 'Tareas detenidas por algún riesgo' },
    { id: 'hechas', label: 'Hechas', icon: CheckCircle, desc: 'Historial de pendientes completados' }
  ];

  // Helper para mapear IDs a nombres legibles
  const getAssigneeName = (id) => {
    if (!id) return 'Sin asignar';
    if (id === 'm-kevin-04') return 'Kevin';
    if (id === 'm-sebas-03') return 'Sebas';
    if (id === 'm-alberto-01') return 'Alberto';
    if (id === 'm-centeno-02') return 'Centeno';
    return 'Sin asignar';
  };

  // Swipes en móvil
  const [touchState, setTouchState] = useState({ taskId: null, startX: 0, currentX: 0 });

  const handleTouchStart = (e, taskId) => {
    if (e.touches.length === 1) {
      setTouchState({
        taskId,
        startX: e.touches[0].clientX,
        currentX: e.touches[0].clientX
      });
    }
  };

  const handleTouchMove = (e) => {
    if (!touchState.taskId) return;
    setTouchState(prev => ({ ...prev, currentX: e.touches[0].clientX }));
  };

  const handleTouchEnd = (task) => {
    if (!touchState.taskId) return;
    const deltaX = touchState.currentX - touchState.startX;
    const swipeThreshold = 80;

    const kanbanStates = ['Pendiente', 'En progreso', 'Hecho', 'Bloqueado', 'Pausado', 'Cancelado'];
    const idx = kanbanStates.indexOf(task.estado || 'Pendiente');

    if (deltaX > swipeThreshold && idx < kanbanStates.length - 1) {
      const nextCol = kanbanStates[idx + 1];
      onUpdateTask(task.id, {
        estado: nextCol,
        completada: nextCol === 'Hecho'
      });
      setActiveMobileTab(nextCol);
    } else if (deltaX < -swipeThreshold && idx > 0) {
      const prevCol = kanbanStates[idx - 1];
      onUpdateTask(task.id, {
        estado: prevCol,
        completada: prevCol === 'Hecho'
      });
      setActiveMobileTab(prevCol);
    }
    setTouchState({ taskId: null, startX: 0, currentX: 0 });
  };

  // Crear Ciclo (Sprint)
  const handleCreateSprint = (e) => {
    e.preventDefault();
    if (!sprName.trim()) return;

    onAddSprint({
      id: `spr-${Date.now()}`,
      nombre: sprName,
      fechaInicio: sprStart || new Date().toISOString().split('T')[0],
      fechaFin: sprEnd || new Date(Date.now() + 86400000 * 7).toISOString().split('T')[0],
      objetivo: sprGoal,
      responsableId: sprOwner || null,
      estado: sprStatus,
      createdAt: new Date().toISOString()
    });

    setSprName('');
    setSprStart('');
    setSprEnd('');
    setSprGoal('');
    setSprintModalOpen(false);
  };

  // Crear Tarea
  const handleCreateTask = (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    onAddTask({
      titulo: newTitle,
      sprintId: newSprintId || null,
      clienteId: newClientId || null,
      asignadoA: newAssignee || null,
      responsableNombre: getAssigneeName(newAssignee),
      apoyo: newSupport,
      prioridad: newPriority,
      estado: newState,
      completada: newState === 'Hecho',
      macroarea: newArea,
      justificacion: newJustification,
      bloqueo: newRisk,
      proximaAccion: newNextAction,
      fechaLimite: newDate || new Date().toISOString().split('T')[0],
      horaLimite: newTime || '12:00',
      duracionEstimada: newDuration,
      observaciones: newObservations
    });

    setNewTitle('');
    setNewClientId('');
    setNewSprintId('');
    setNewSupport('');
    setNewPriority('P2');
    setNewState('Pendiente');
    setNewArea('General');
    setNewJustification('');
    setNewRisk('');
    setNewNextAction('');
    setNewDate('');
    setNewTime('');
    setNewDuration('1 hora');
    setNewObservations('');
    setTaskFormOpen(false);
  };

  // ----------------------------------------------------
  // LOGICA DE FILTRADO Y FILAS DE LAS VISTAS
  // ----------------------------------------------------
  const todayStr = new Date().toISOString().split('T')[0];

  const getFilteredTasks = () => {
    let list = [...tasks];

    // Filtro por Ciclo general
    if (selectedSprintId !== 'Todos') {
      list = list.filter(t => t.sprintId === selectedSprintId);
    }

    // Filtrados según la pestaña/vista activa
    if (activeView === 'todas') {
      if (filterOwner !== 'Todos') {
        if (filterOwner === 'Sin asignar') {
          list = list.filter(t => !t.asignadoA);
        } else {
          list = list.filter(t => t.asignadoA === filterOwner || t.responsableNombre === getAssigneeName(filterOwner));
        }
      }
      if (filterSupport !== 'Todos') {
        list = list.filter(t => t.apoyo && t.apoyo.toLowerCase().includes(filterSupport.toLowerCase()));
      }
      if (filterPriority !== 'Todos') {
        list = list.filter(t => t.prioridad === filterPriority);
      }
      if (filterState !== 'Todos') {
        list = list.filter(t => t.estado === filterState);
      }
      if (filterArea !== 'Todos') {
        list = list.filter(t => t.macroarea === filterArea || t.area === filterArea);
      }
      if (filterSpecial !== 'Todos') {
        if (filterSpecial === 'vencidos_bloqueados') {
          list = list.filter(t => (t.estado === 'Bloqueado') || (t.estado !== 'Hecho' && t.fechaLimite && t.fechaLimite < todayStr));
        } else if (filterSpecial === 'completados') {
          list = list.filter(t => t.estado === 'Hecho' || t.completada);
        }
      }
    } 
    else if (activeView === 'kevin') {
      list = list.filter(t => t.asignadoA === 'm-kevin-04' || t.responsableNombre === 'Kevin' || (t.apoyo && t.apoyo.toLowerCase().includes('kevin')));
      list = sortTasks(list);
    } 
    else if (activeView === 'sebas') {
      list = list.filter(t => t.asignadoA === 'm-sebas-03' || t.responsableNombre === 'Sebas' || (t.apoyo && t.apoyo.toLowerCase().includes('sebas')));
      list = sortTasks(list);
    } 
    else if (activeView === 'alberto') {
      list = list.filter(t => t.asignadoA === 'm-alberto-01' || t.responsableNombre === 'Alberto' || (t.apoyo && t.apoyo.toLowerCase().includes('alberto')));
      list = sortTasks(list);
    } 
    else if (activeView === 'centeno') {
      list = list.filter(t => t.asignadoA === 'm-centeno-02' || t.responsableNombre === 'Centeno' || (t.apoyo && t.apoyo.toLowerCase().includes('centeno')));
      list = sortTasks(list);
    } 
    else if (activeView === 'urgentes') {
      list = list.filter(t => t.prioridad === 'P0' && t.estado !== 'Hecho' && !t.completada);
    } 
    else if (activeView === 'bloqueadas') {
      list = list.filter(t => t.estado === 'Bloqueado');
    } 
    else if (activeView === 'hechas') {
      list = list.filter(t => t.estado === 'Hecho' || t.completada);
    }

    return list;
  };

  const sortTasks = (list) => {
    return [...list].sort((a, b) => {
      const prioOrder = { 'P0': 0, 'P1': 1, 'P2': 2, 'Alta': 1, 'Media': 2, 'Baja': 3 };
      const aPrio = prioOrder[a.prioridad] !== undefined ? prioOrder[a.prioridad] : 9;
      const bPrio = prioOrder[b.prioridad] !== undefined ? prioOrder[b.prioridad] : 9;
      if (aPrio !== bPrio) return aPrio - bPrio;

      const stateOrder = { 'Pendiente': 0, 'En progreso': 1, 'Bloqueado': 2, 'Pausado': 3, 'Cancelado': 4, 'Hecho': 5, 'Completada': 5 };
      const aState = stateOrder[a.estado] !== undefined ? stateOrder[a.estado] : 9;
      const bState = stateOrder[b.estado] !== undefined ? stateOrder[b.estado] : 9;
      return aState - bState;
    });
  };

  const filteredTasks = getFilteredTasks();

  // Macroáreas únicas para filtro
  const uniqueAreas = Array.from(new Set(tasks.map(t => t.macroarea || t.area).filter(Boolean)));

  // ----------------------------------------------------
  // METRICAS DEL CENTRO DE MANDO
  // ----------------------------------------------------
  const totalCount = tasks.length;
  const pendingCount = tasks.filter(t => t.estado === 'Pendiente').length;
  const progressCount = tasks.filter(t => t.estado === 'En progreso').length;
  const doneCount = tasks.filter(t => t.estado === 'Hecho' || t.completada).length;
  const blockedCount = tasks.filter(t => t.estado === 'Bloqueado').length;
  
  const progressPercent = totalCount ? Math.round((doneCount / totalCount) * 100) : 0;

  // KPIs por persona
  const getKpisPerPerson = (name, id) => {
    const pTasks = tasks.filter(t => t.asignadoA === id || t.responsableNombre === name || (t.apoyo && t.apoyo.toLowerCase().includes(name.toLowerCase())));
    const pDone = pTasks.filter(t => t.estado === 'Hecho' || t.completada).length;
    const pTotal = pTasks.length;
    const pct = pTotal ? Math.round((pDone / pTotal) * 100) : 0;

    const p0 = pTasks.filter(t => t.prioridad === 'P0').length;
    const p1 = pTasks.filter(t => t.prioridad === 'P1').length;
    const p2 = pTasks.filter(t => t.prioridad === 'P2').length;

    return { total: pTotal, done: pDone, pct, p0, p1, p2 };
  };

  const kpis = {
    kevin: getKpisPerPerson('Kevin', 'm-kevin-04'),
    sebas: getKpisPerPerson('Sebas', 'm-sebas-03'),
    alberto: getKpisPerPerson('Alberto', 'm-alberto-01'),
    centeno: getKpisPerPerson('Centeno', 'm-centeno-02')
  };

  return (
    <div className="space-y-6 text-xs text-left">
      
      {/* 1. Selector Horizontal de las 9 Vistas */}
      <div className="flex overflow-x-auto gap-1 bg-[#F4F4F2] dark:bg-[#1A1A1A] p-1 rounded-xl border border-notion-border-light dark:border-notion-border-dark scrollbar-none">
        {viewsList.map(v => {
          const isActive = activeView === v.id;
          const Icon = v.icon;
          return (
            <button
              key={v.id}
              onClick={() => setActiveView(v.id)}
              className={`flex-shrink-0 flex items-center gap-1.5 px-3.5 py-2 rounded-lg font-bold text-[10px] uppercase tracking-wider transition-all ${
                isActive 
                  ? 'bg-indigo-600 text-white shadow-sm' 
                  : 'text-notion-text-muted-light dark:text-notion-text-muted-dark hover:bg-notion-border-light/20'
              }`}
              title={v.desc}
            >
              <Icon size={12} />
              <span>{v.label}</span>
            </button>
          );
        })}
      </div>

      {/* 2. Cabecera Dinámica de Filtros de Ciclo & Botón crear tarea */}
      <div className="flex flex-col sm:flex-row gap-3 justify-between items-start sm:items-center p-4 rounded-xl border border-notion-border-light dark:border-notion-border-dark bg-notion-card-light dark:bg-notion-card-dark notion-shadow">
        <div className="flex items-center gap-1.5 border border-notion-border-light dark:border-notion-border-dark bg-[#F4F4F2] dark:bg-[#1A1A1A] px-2.5 py-1.5 rounded-lg">
          <FolderOpen size={13} className="text-indigo-500" />
          <select
            value={selectedSprintId}
            onChange={(e) => setSelectedSprintId(e.target.value)}
            className="bg-transparent text-[11px] text-notion-text-light dark:text-notion-text-dark font-bold focus:outline-none cursor-pointer"
          >
            <option value="Todos">Filtrar Ciclo: Todos</option>
            {sprints.map(spr => (
              <option key={spr.id} value={spr.id}>
                {spr.nombre}
              </option>
            ))}
          </select>
        </div>

        <div className="flex gap-2 w-full sm:w-auto">
          <button
            onClick={() => setSprintModalOpen(true)}
            className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3 py-1.5 border border-notion-border-light dark:border-notion-border-dark hover:bg-notion-border-light/20 text-notion-text-light dark:text-notion-text-dark rounded-lg font-bold transition-all bg-transparent"
          >
            <span>+ Nuevo Ciclo</span>
          </button>
          
          <button
            onClick={() => setTaskFormOpen(true)}
            className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-bold shadow transition-all"
          >
            <Plus size={14} />
            <span>Crear Tarea</span>
          </button>
        </div>
      </div>

      {/* ----------------------------------------------------
          VISTA: CENTRO DE MANDO
          ---------------------------------------------------- */}
      {activeView === 'mando' && (
        <div className="space-y-6">
          {/* Fila de Tarjetas Kpis generales */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3.5">
            <div className="p-4 rounded-xl border border-notion-border-light dark:border-notion-border-dark bg-notion-card-light dark:bg-notion-card-dark text-center">
              <span className="block text-2xl font-bold text-gray-800 dark:text-gray-200">{totalCount}</span>
              <span className="text-[9px] uppercase tracking-wider font-extrabold text-notion-text-muted-light dark:text-notion-text-muted-dark">Total Tareas</span>
            </div>
            <div className="p-4 rounded-xl border border-notion-border-light dark:border-notion-border-dark bg-notion-card-light dark:bg-notion-card-dark text-center">
              <span className="block text-2xl font-bold text-amber-500">{pendingCount}</span>
              <span className="text-[9px] uppercase tracking-wider font-extrabold text-notion-text-muted-light dark:text-notion-text-muted-dark">Pendientes</span>
            </div>
            <div className="p-4 rounded-xl border border-notion-border-light dark:border-notion-border-dark bg-notion-card-light dark:bg-notion-card-dark text-center">
              <span className="block text-2xl font-bold text-indigo-500">{progressCount}</span>
              <span className="text-[9px] uppercase tracking-wider font-extrabold text-notion-text-muted-light dark:text-notion-text-muted-dark">En progreso</span>
            </div>
            <div className="p-4 rounded-xl border border-notion-border-light dark:border-notion-border-dark bg-notion-card-light dark:bg-notion-card-dark text-center">
              <span className="block text-2xl font-bold text-emerald-500">{doneCount}</span>
              <span className="text-[9px] uppercase tracking-wider font-extrabold text-notion-text-muted-light dark:text-notion-text-muted-dark">Hechas</span>
            </div>
            <div className="p-4 rounded-xl border border-notion-border-light dark:border-notion-border-dark bg-notion-card-light dark:bg-notion-card-dark text-center col-span-2 md:col-span-1">
              <span className="block text-2xl font-bold text-rose-500">{blockedCount}</span>
              <span className="text-[9px] uppercase tracking-wider font-extrabold text-notion-text-muted-light dark:text-notion-text-muted-dark">Bloqueadas</span>
            </div>
          </div>

          {/* Progreso General Card */}
          <div className="p-5 rounded-xl border border-notion-border-light dark:border-notion-border-dark bg-notion-card-light dark:bg-notion-card-dark notion-shadow flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="space-y-1 text-center md:text-left">
              <h3 className="font-bold text-sm text-notion-text-light dark:text-notion-text-dark flex items-center gap-1.5 justify-center md:justify-start">
                <TrendingUp size={16} className="text-indigo-500" /> Avance Global del Proyecto
              </h3>
              <p className="text-[10px] text-notion-text-muted-light dark:text-notion-text-muted-dark leading-relaxed">
                Porcentaje acumulado de tareas en etapa 'Hecho' o marcadas como completadas sobre el total del backlog.
              </p>
            </div>
            <div className="w-full md:w-80 space-y-2">
              <div className="flex justify-between items-center text-[10px] font-bold">
                <span>PORCENTAJE AVANCE</span>
                <span className="font-mono">{progressPercent}%</span>
              </div>
              <div className="w-full bg-[#EBEBE9] dark:bg-[#2E2E2E] h-2.5 rounded-full overflow-hidden">
                <div className="bg-emerald-500 h-full rounded-full transition-all duration-300" style={{ width: `${progressPercent}%` }} />
              </div>
            </div>
          </div>

          {/* KPIs Detallados por Responsable */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(kpis).map(([key, value]) => {
              const name = key.charAt(0).toUpperCase() + key.slice(1);
              return (
                <div key={key} className="p-5 rounded-xl border border-notion-border-light dark:border-notion-border-dark bg-notion-card-light dark:bg-notion-card-dark notion-shadow space-y-4">
                  <div className="flex justify-between items-center pb-2 border-b border-notion-border-light/40 dark:border-notion-border-dark/40">
                    <span className="font-bold text-sm text-notion-text-light dark:text-notion-text-dark">Colaborador: {name}</span>
                    <span className="font-mono font-bold text-indigo-500 bg-indigo-500/10 px-2 py-0.5 rounded text-[10px]">{value.pct}% Completado</span>
                  </div>

                  {/* Barra progreso personal */}
                  <div className="space-y-1.5">
                    <div className="w-full bg-[#EBEBE9] dark:bg-[#2E2E2E] h-2 rounded-full overflow-hidden">
                      <div className="bg-indigo-600 h-full rounded-full transition-all duration-300" style={{ width: `${value.pct}%` }} />
                    </div>
                    <div className="flex justify-between text-[9px] text-notion-text-muted-light dark:text-notion-text-muted-dark font-mono">
                      <span>{value.done} de {value.total} tareas en total</span>
                    </div>
                  </div>

                  {/* Detalle Prioridades */}
                  <div className="grid grid-cols-3 gap-2.5 pt-1 text-center font-mono">
                    <div className="p-2 rounded bg-rose-500/5 border border-rose-500/10 text-rose-500">
                      <div className="text-[8px] uppercase font-semibold text-gray-500 dark:text-gray-400">Criticas P0</div>
                      <div className="text-xs font-bold mt-0.5">{value.p0}</div>
                    </div>
                    <div className="p-2 rounded bg-amber-500/5 border border-amber-500/10 text-amber-500">
                      <div className="text-[8px] uppercase font-semibold text-gray-500 dark:text-gray-400">Conversion P1</div>
                      <div className="text-xs font-bold mt-0.5">{value.p1}</div>
                    </div>
                    <div className="p-2 rounded bg-blue-500/5 border border-blue-500/10 text-blue-500">
                      <div className="text-[8px] uppercase font-semibold text-gray-500 dark:text-gray-400">Soporte P2</div>
                      <div className="text-xs font-bold mt-0.5">{value.p2}</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ----------------------------------------------------
          VISTA: TABLA GENERAL (TODAS LAS TAREAS)
          ---------------------------------------------------- */}
      {activeView === 'todas' && (
        <div className="space-y-4">
          
          {/* Panel de Filtros Especiales para Tabla */}
          <div className="p-4 rounded-xl border border-notion-border-light dark:border-notion-border-dark bg-notion-card-light dark:bg-notion-card-dark notion-shadow grid grid-cols-2 md:grid-cols-6 gap-2.5">
            
            <div className="space-y-1">
              <label className="font-bold text-[9px] text-notion-text-muted-light dark:text-notion-text-muted-dark uppercase tracking-wider">Responsable</label>
              <select
                value={filterOwner}
                onChange={(e) => setFilterOwner(e.target.value)}
                className="w-full p-2.5 rounded border border-notion-border-light dark:border-notion-border-dark bg-[#F4F4F2] dark:bg-[#1A1A1A] focus:outline-none"
              >
                <option value="Todos">Todos</option>
                <option value="Sin asignar">Sin asignar</option>
                {INTEGRANTES.map(user => (
                  <option key={user.id} value={user.id}>{user.nombre}</option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label className="font-bold text-[9px] text-notion-text-muted-light dark:text-notion-text-muted-dark uppercase tracking-wider">Apoyo</label>
              <select
                value={filterSupport}
                onChange={(e) => setFilterSupport(e.target.value)}
                className="w-full p-2.5 rounded border border-notion-border-light dark:border-notion-border-dark bg-[#F4F4F2] dark:bg-[#1A1A1A] focus:outline-none"
              >
                <option value="Todos">Todos</option>
                <option value="Kevin">Kevin</option>
                <option value="Sebas">Sebas</option>
                <option value="Alberto">Alberto</option>
                <option value="Centeno">Centeno</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="font-bold text-[9px] text-notion-text-muted-light dark:text-notion-text-muted-dark uppercase tracking-wider">Prioridad</label>
              <select
                value={filterPriority}
                onChange={(e) => setFilterPriority(e.target.value)}
                className="w-full p-2.5 rounded border border-notion-border-light dark:border-notion-border-dark bg-[#F4F4F2] dark:bg-[#1A1A1A] focus:outline-none"
              >
                <option value="Todos">Todos</option>
                <option value="P0">P0 (Urgente)</option>
                <option value="P1">P1 (Importante)</option>
                <option value="P2">P2 (Soporte)</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="font-bold text-[9px] text-notion-text-muted-light dark:text-notion-text-muted-dark uppercase tracking-wider">Estado</label>
              <select
                value={filterState}
                onChange={(e) => setFilterState(e.target.value)}
                className="w-full p-2.5 rounded border border-notion-border-light dark:border-notion-border-dark bg-[#F4F4F2] dark:bg-[#1A1A1A] focus:outline-none"
              >
                <option value="Todos">Todos</option>
                <option value="Pendiente">Pendiente</option>
                <option value="En progreso">En progreso</option>
                <option value="Hecho">Hecho</option>
                <option value="Bloqueado">Bloqueado</option>
                <option value="Pausado">Pausado</option>
                <option value="Cancelado">Cancelado</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="font-bold text-[9px] text-notion-text-muted-light dark:text-notion-text-muted-dark uppercase tracking-wider">Área</label>
              <select
                value={filterArea}
                onChange={(e) => setFilterArea(e.target.value)}
                className="w-full p-2.5 rounded border border-notion-border-light dark:border-notion-border-dark bg-[#F4F4F2] dark:bg-[#1A1A1A] focus:outline-none"
              >
                <option value="Todos">Todos</option>
                {uniqueAreas.map(area => (
                  <option key={area} value={area}>{area}</option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label className="font-bold text-[9px] text-notion-text-muted-light dark:text-notion-text-muted-dark uppercase tracking-wider">Categoría Especial</label>
              <select
                value={filterSpecial}
                onChange={(e) => setFilterSpecial(e.target.value)}
                className="w-full p-2.5 rounded border border-notion-border-light dark:border-notion-border-dark bg-[#F4F4F2] dark:bg-[#1A1A1A] focus:outline-none"
              >
                <option value="Todos">Ninguno (Normal)</option>
                <option value="vencidos_bloqueados">🚨 Vencidos o Bloqueados</option>
                <option value="completados">✅ Completados</option>
              </select>
            </div>

          </div>

          {/* Tabla de Resultados */}
          <div className="rounded-xl border border-notion-border-light dark:border-notion-border-dark bg-notion-card-light dark:bg-notion-card-dark notion-shadow overflow-x-auto">
            <table className="w-full min-w-[700px] border-collapse text-[10px]">
              <thead>
                <tr className="bg-[#fbfbfa] dark:bg-[#1c1c1c] border-b border-notion-border-light dark:border-notion-border-dark text-notion-text-muted-light dark:text-notion-text-muted-dark font-extrabold uppercase text-[9px] text-left">
                  <th className="p-3 w-16 text-center">ID</th>
                  <th className="p-3">Tarea</th>
                  <th className="p-3 w-28">Responsable</th>
                  <th className="p-3 w-28">Apoyo</th>
                  <th className="p-3 w-16 text-center">Prio</th>
                  <th className="p-3 w-24">Estado</th>
                  <th className="p-3 w-24">Área</th>
                  <th className="p-3">Próxima acción</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-notion-border-light/50 dark:divide-notion-border-dark/50">
                {filteredTasks.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="p-6 text-center text-notion-text-muted-light dark:text-notion-text-muted-dark italic">
                      No se encontraron tareas con los filtros seleccionados.
                    </td>
                  </tr>
                ) : (
                  filteredTasks.map(t => (
                    <tr key={t.id} className="hover:bg-notion-border-light/10 dark:hover:bg-notion-border-dark/10 transition-colors">
                      <td className="p-3 font-mono font-bold text-center text-notion-text-muted-light dark:text-notion-text-muted-dark">
                        {t.id.replace('t-excel-', '')}
                      </td>
                      <td className="p-3 font-semibold text-notion-text-light dark:text-notion-text-dark">
                        {t.titulo}
                      </td>
                      <td className="p-3 font-bold text-indigo-500">
                        {t.responsableNombre || getAssigneeName(t.asignadoA)}
                      </td>
                      <td className="p-3 text-notion-text-muted-light dark:text-notion-text-muted-dark">
                        {t.apoyo || '-'}
                      </td>
                      <td className="p-3 text-center">
                        <span className={`text-[8px] font-extrabold px-1.5 py-0.5 rounded ${
                          t.prioridad === 'P0' ? 'bg-rose-500/10 text-rose-500 border border-rose-500/20' :
                          t.prioridad === 'P1' ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20' :
                          'bg-blue-500/10 text-blue-500 border border-blue-500/20'
                        }`}>
                          {t.prioridad || 'P2'}
                        </span>
                      </td>
                      <td className="p-3">
                        <select
                          value={t.estado || 'Pendiente'}
                          onChange={(e) => onUpdateTask(t.id, { estado: e.target.value, completada: e.target.value === 'Hecho' })}
                          className={`text-[9px] font-bold px-2 py-1 rounded border bg-transparent cursor-pointer focus:outline-none ${
                            t.estado === 'Hecho' ? 'text-emerald-500 border-emerald-500/20 bg-emerald-500/5' :
                            t.estado === 'En progreso' ? 'text-indigo-500 border-indigo-500/20 bg-indigo-500/5' :
                            t.estado === 'Bloqueado' ? 'text-rose-500 border-rose-500/20 bg-rose-500/5' :
                            t.estado === 'Pausado' ? 'text-amber-500 border-amber-500/20 bg-amber-500/5' :
                            'text-gray-500 border-gray-500/20 bg-gray-500/5'
                          }`}
                        >
                          <option value="Pendiente">Pendiente</option>
                          <option value="En progreso">En progreso</option>
                          <option value="Hecho">Hecho</option>
                          <option value="Bloqueado">Bloqueado</option>
                          <option value="Pausado">Pausado</option>
                          <option value="Cancelado">Cancelado</option>
                        </select>
                      </td>
                      <td className="p-3 text-notion-text-muted-light dark:text-notion-text-muted-dark font-semibold">
                        {t.macroarea || t.area || 'General'}
                      </td>
                      <td className="p-3 text-notion-text-muted-light dark:text-notion-text-muted-dark truncate max-w-[200px]" title={t.proximaAccion}>
                        {t.proximaAccion || '-'}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ----------------------------------------------------
          VISTAS FILTRADAS POR COLABORADOR O ESTADO (LISTAS EXPANSIBLES)
          ---------------------------------------------------- */}
      {activeView !== 'mando' && activeView !== 'todas' && (
        <div className="space-y-3.5">
          <div className="p-3 bg-indigo-500/5 border border-indigo-500/10 rounded-xl flex items-center justify-between">
            <span className="font-bold text-indigo-500">Pendientes encontrados en esta vista: {filteredTasks.length}</span>
            <span className="text-[10px] font-mono text-notion-text-muted-light dark:text-notion-text-muted-dark">Orden prioritario P0 ➜ P2</span>
          </div>

          {filteredTasks.length === 0 ? (
            <div className="text-center py-12 border border-dashed border-notion-border-light dark:border-notion-border-dark rounded-xl bg-notion-card-light dark:bg-notion-card-dark text-notion-text-muted-light dark:text-notion-text-muted-dark italic">
              No hay tareas en esta vista.
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-3.5">
              {filteredTasks.map(t => (
                <div 
                  key={t.id}
                  onTouchStart={(e) => handleTouchStart(e, t.id)}
                  onTouchMove={handleTouchMove}
                  onTouchEnd={() => handleTouchEnd(t)}
                  className={`p-4 rounded-xl border bg-notion-card-light dark:bg-notion-card-dark notion-shadow flex flex-col md:flex-row md:items-start justify-between gap-4 border-l-4 ${
                    t.prioridad === 'P0' ? 'border-l-rose-500 border-notion-border-light dark:border-notion-border-dark' :
                    t.prioridad === 'P1' ? 'border-l-amber-500 border-notion-border-light dark:border-notion-border-dark' :
                    'border-l-blue-500 border-notion-border-light dark:border-notion-border-dark'
                  }`}
                >
                  <div className="space-y-3 flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[8px] font-mono font-bold px-1.5 py-0.5 rounded bg-zinc-500/10 text-zinc-500 uppercase">
                        ID: {t.id.replace('t-excel-', '')}
                      </span>
                      <span className="text-[8px] font-bold px-1.5 py-0.5 rounded bg-indigo-500/10 text-indigo-500 uppercase">
                        📁 {t.macroarea || t.area || 'General'}
                      </span>
                      <span className={`text-[8px] font-extrabold px-1.5 py-0.5 rounded ${
                        t.prioridad === 'P0' ? 'bg-rose-500/10 text-rose-500 border border-rose-500/20' :
                        t.prioridad === 'P1' ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20' :
                        'bg-blue-500/10 text-blue-500 border border-blue-500/20'
                      }`}>
                        {t.prioridad}
                      </span>
                    </div>

                    <h4 className={`text-xs font-bold text-notion-text-light dark:text-notion-text-dark leading-snug break-words ${t.completada || t.estado === 'Hecho' ? 'line-through text-notion-text-muted-light dark:text-notion-text-muted-dark' : ''}`}>
                      {t.titulo}
                    </h4>

                    {t.justificacion && (
                      <p className="text-[10px] text-notion-text-muted-light dark:text-notion-text-muted-dark italic leading-relaxed border-l-2 border-indigo-500/20 pl-2">
                        🧠 <strong>Justificación:</strong> {t.justificacion}
                      </p>
                    )}

                    {t.bloqueo && (
                      <div className="p-2 rounded bg-rose-500/5 border border-rose-500/10 text-rose-600 dark:text-rose-400 font-mono text-[9px] leading-normal flex items-start gap-1">
                        <AlertCircle size={10} className="mt-0.5 flex-shrink-0" />
                        <span>⚠️ <strong>Detenido por:</strong> {t.bloqueo}</span>
                      </div>
                    )}

                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[9px] text-notion-text-muted-light dark:text-notion-text-muted-dark font-semibold">
                      <div className="flex items-center gap-1">
                        <User size={11} className="text-indigo-500" />
                        <span>Responsable: <strong className="text-notion-text-light dark:text-notion-text-dark">{t.responsableNombre || getAssigneeName(t.asignadoA)}</strong></span>
                      </div>
                      {t.apoyo && (
                        <div className="flex items-center gap-1">
                          <User size={11} className="text-zinc-400" />
                          <span>Apoyo: <strong className="text-notion-text-light dark:text-notion-text-dark">{t.apoyo}</strong></span>
                        </div>
                      )}
                      <div className="flex items-center gap-1 font-mono">
                        <Clock size={11} />
                        <span>Límite: {t.fechaLimite || '-'}</span>
                      </div>
                    </div>
                  </div>

                  {/* Acciones de actualización rápidas en la tarjeta */}
                  <div className="flex md:flex-col justify-end items-center gap-2 flex-shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-dashed border-notion-border-light/40 dark:border-notion-border-dark/40">
                    <select
                      value={t.estado || 'Pendiente'}
                      onChange={(e) => onUpdateTask(t.id, { estado: e.target.value, completada: e.target.value === 'Hecho' })}
                      className={`w-full md:w-28 text-[9px] font-bold p-2 rounded border bg-transparent cursor-pointer focus:outline-none ${
                        t.estado === 'Hecho' ? 'text-emerald-500 border-emerald-500/20 bg-emerald-500/5' :
                        t.estado === 'En progreso' ? 'text-indigo-500 border-indigo-500/20 bg-indigo-500/5' :
                        t.estado === 'Bloqueado' ? 'text-rose-500 border-rose-500/20 bg-rose-500/5' :
                        t.estado === 'Pausado' ? 'text-amber-500 border-amber-500/20 bg-amber-500/5' :
                        'text-gray-500 border-gray-500/20 bg-gray-500/5'
                      }`}
                    >
                      <option value="Pendiente">Pendiente</option>
                      <option value="En progreso">En progreso</option>
                      <option value="Hecho">Hecho</option>
                      <option value="Bloqueado">Bloqueado</option>
                      <option value="Pausado">Pausado</option>
                      <option value="Cancelado">Cancelado</option>
                    </select>

                    <div className="text-[9px] text-notion-text-muted-light dark:text-notion-text-muted-dark font-bold bg-[#F4F4F2] dark:bg-[#1A1A1A] px-2 py-1 rounded w-full md:w-28 text-center truncate">
                      👉 {t.proximaAccion || 'No tiene acción registrada'}
                    </div>

                    <button
                      onClick={() => onDeleteTask(t.id)}
                      className="p-2 rounded text-notion-text-muted-light dark:text-notion-text-muted-dark hover:text-rose-500 hover:bg-rose-500/5 transition-colors border border-notion-border-light dark:border-notion-border-dark flex items-center justify-center gap-1 text-[9px] font-bold"
                    >
                      <Trash2 size={10} />
                      <span>Borrar</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ----------------------------------------------------
          MODALES DE CREACIÓN DE SPRINT & TAREA
          ---------------------------------------------------- */}
      {sprintModalOpen && (
        <>
          <div className="fixed inset-0 bg-black/55 backdrop-blur-sm z-[100]" onClick={() => setSprintModalOpen(false)} />
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-md w-[92%] bg-notion-card-light dark:bg-notion-card-dark border border-notion-border-light dark:border-notion-border-dark rounded-xl shadow-2xl z-[101] p-5 space-y-4">
            <div className="flex justify-between items-center pb-2.5 border-b border-notion-border-light dark:border-notion-border-dark">
              <h3 className="font-bold text-sm text-notion-text-light dark:text-notion-text-dark">Crear Nuevo Ciclo (Sprint)</h3>
              <button onClick={() => setSprintModalOpen(false)} className="p-1 rounded text-notion-text-muted-light dark:text-notion-text-muted-dark hover:text-notion-text-light dark:hover:text-notion-text-dark">
                <X size={15} />
              </button>
            </div>

            <form onSubmit={handleCreateSprint} className="space-y-4">
              <div className="space-y-1">
                <label className="font-semibold text-notion-text-muted-light dark:text-notion-text-muted-dark">Nombre del Ciclo *</label>
                <input
                  type="text"
                  required
                  placeholder="Ej. Ciclo 4: Integración y Cierre de Ventas"
                  value={sprName}
                  onChange={(e) => setSprName(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-notion-border-light dark:border-notion-border-dark bg-[#F4F4F2] dark:bg-[#1A1A1A] text-notion-text-light dark:text-notion-text-dark focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-notion-text-muted-light dark:text-notion-text-muted-dark">Fecha Inicio *</label>
                  <input
                    type="date"
                    required
                    value={sprStart}
                    onChange={(e) => setSprStart(e.target.value)}
                    className="w-full px-2 py-1.5 rounded border border-notion-border-light dark:border-notion-border-dark bg-[#F4F4F2] dark:bg-[#1A1A1A] text-notion-text-light dark:text-notion-text-dark focus:outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-semibold text-notion-text-muted-light dark:text-notion-text-muted-dark">Fecha Final *</label>
                  <input
                    type="date"
                    required
                    value={sprEnd}
                    onChange={(e) => setSprEnd(e.target.value)}
                    className="w-full px-2 py-1.5 rounded border border-notion-border-light dark:border-notion-border-dark bg-[#F4F4F2] dark:bg-[#1A1A1A] text-notion-text-light dark:text-notion-text-dark focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-notion-text-muted-light dark:text-notion-text-muted-dark">Objetivo del Ciclo</label>
                <textarea
                  rows="2"
                  placeholder="Ej. Consolidar el despliegue del PWA y carga del Excel de tareas."
                  value={sprGoal}
                  onChange={(e) => setSprGoal(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-notion-border-light dark:border-notion-border-dark bg-[#F4F4F2] dark:bg-[#1A1A1A] text-notion-text-light dark:text-notion-text-dark focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-notion-text-muted-light dark:text-notion-text-muted-dark">Responsable general</label>
                  <select
                    value={sprOwner}
                    onChange={(e) => setSprOwner(e.target.value)}
                    className="w-full px-2 py-1.5 rounded border border-notion-border-light dark:border-notion-border-dark bg-[#F4F4F2] dark:bg-[#1A1A1A] text-notion-text-light dark:text-notion-text-dark focus:outline-none"
                  >
                    <option value="">Ninguno</option>
                    {INTEGRANTES.map(user => (
                      <option key={user.id} value={user.id}>{user.nombre}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-notion-text-muted-light dark:text-notion-text-muted-dark">Estado inicial</label>
                  <select
                    value={sprStatus}
                    onChange={(e) => setSprStatus(e.target.value)}
                    className="w-full px-2 py-1.5 rounded border border-notion-border-light dark:border-notion-border-dark bg-[#F4F4F2] dark:bg-[#1A1A1A] text-notion-text-light dark:text-notion-text-dark focus:outline-none"
                  >
                    <option value="Planeado">Planeado</option>
                    <option value="Activo">Activo</option>
                    <option value="Terminado">Terminado</option>
                    <option value="Pausado">Pausado</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-notion-border-light dark:border-notion-border-dark">
                <button
                  type="button"
                  onClick={() => setSprintModalOpen(false)}
                  className="px-3 py-1.5 border border-notion-border-light dark:border-notion-border-dark text-notion-text-muted-light dark:text-notion-text-muted-dark hover:bg-notion-border-light/20 rounded-lg font-semibold"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-bold shadow"
                >
                  Crear Ciclo
                </button>
              </div>
            </form>
          </div>
        </>
      )}

      {taskFormOpen && (
        <>
          <div className="fixed inset-0 bg-black/55 backdrop-blur-sm z-[100]" onClick={() => setTaskFormOpen(false)} />
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-lg w-[92%] bg-notion-card-light dark:bg-notion-card-dark border border-notion-border-light dark:border-notion-border-dark rounded-xl shadow-2xl z-[101] p-5 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center pb-2.5 border-b border-notion-border-light dark:border-notion-border-dark">
              <h3 className="font-bold text-sm text-notion-text-light dark:text-notion-text-dark flex items-center gap-1.5"><PlusCircle size={16} className="text-indigo-500" /> Crear Nueva Tarea</h3>
              <button onClick={() => setTaskFormOpen(false)} className="p-1 rounded text-notion-text-muted-light dark:text-notion-text-muted-dark hover:text-notion-text-light dark:hover:text-notion-text-dark">
                <X size={15} />
              </button>
            </div>

            <form onSubmit={handleCreateTask} className="space-y-3.5 text-xs">
              <div className="space-y-1">
                <label className="font-semibold text-notion-text-muted-light dark:text-notion-text-muted-dark font-bold">Título de la tarea *</label>
                <input
                  type="text"
                  required
                  placeholder="Ej. Rediseñar frontend de la landing page"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-notion-border-light dark:border-notion-border-dark bg-[#F4F4F2] dark:bg-[#1A1A1A] text-notion-text-light dark:text-notion-text-dark focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-notion-text-muted-light dark:text-notion-text-muted-dark">Ciclo de trabajo</label>
                  <select
                    value={newSprintId}
                    onChange={(e) => setNewSprintId(e.target.value)}
                    className="w-full px-2 py-1.5 rounded border border-notion-border-light dark:border-notion-border-dark bg-[#F4F4F2] dark:bg-[#1A1A1A] text-notion-text-light dark:text-notion-text-dark focus:outline-none"
                  >
                    <option value="">Ninguno (Sin ciclo)</option>
                    {sprints.map(s => (
                      <option key={s.id} value={s.id}>{s.nombre}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-notion-text-muted-light dark:text-notion-text-muted-dark">Cliente relacionado</label>
                  <select
                    value={newClientId}
                    onChange={(e) => setNewClientId(e.target.value)}
                    className="w-full px-2 py-1.5 rounded border border-notion-border-light dark:border-notion-border-dark bg-[#F4F4F2] dark:bg-[#1A1A1A] text-notion-text-light dark:text-notion-text-dark focus:outline-none"
                  >
                    <option value="">Ninguno (Tarea Interna)</option>
                    {clients.map(c => (
                      <option key={c.id} value={c.id}>{c.nombre} ({c.empresa})</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-notion-text-muted-light dark:text-notion-text-muted-dark font-bold">Responsable</label>
                  <select
                    value={newAssignee}
                    onChange={(e) => setNewAssignee(e.target.value)}
                    className="w-full px-2 py-1.5 rounded border border-notion-border-light dark:border-notion-border-dark bg-[#F4F4F2] dark:bg-[#1A1A1A] text-notion-text-light dark:text-notion-text-dark focus:outline-none"
                  >
                    <option value="">Sin asignar</option>
                    {INTEGRANTES.map(user => (
                      <option key={user.id} value={user.id}>{user.nombre}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-notion-text-muted-light dark:text-notion-text-muted-dark">Apoyo (Nombre/s)</label>
                  <input
                    type="text"
                    placeholder="Ej. Sebas / Centeno"
                    value={newSupport}
                    onChange={(e) => setNewSupport(e.target.value)}
                    className="w-full px-2.5 py-1.5 rounded border border-notion-border-light dark:border-notion-border-dark bg-[#F4F4F2] dark:bg-[#1A1A1A] text-notion-text-light dark:text-notion-text-dark focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-notion-text-muted-light dark:text-notion-text-muted-dark font-bold">Prioridad</label>
                  <select
                    value={newPriority}
                    onChange={(e) => setNewPriority(e.target.value)}
                    className="w-full px-2 py-1.5 rounded border border-notion-border-light dark:border-notion-border-dark bg-[#F4F4F2] dark:bg-[#1A1A1A] text-notion-text-light dark:text-notion-text-dark focus:outline-none"
                  >
                    <option value="P0">P0 (Urgente / Desbloquea Venta)</option>
                    <option value="P1">P1 (Importante / Conversión)</option>
                    <option value="P2">P2 (Soporte / Puede esperar)</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-notion-text-muted-light dark:text-notion-text-muted-dark font-bold">Estado</label>
                  <select
                    value={newState}
                    onChange={(e) => setNewState(e.target.value)}
                    className="w-full px-2 py-1.5 rounded border border-notion-border-light dark:border-notion-border-dark bg-[#F4F4F2] dark:bg-[#1A1A1A] text-notion-text-light dark:text-notion-text-dark focus:outline-none"
                  >
                    <option value="Pendiente">Pendiente</option>
                    <option value="En progreso">En progreso</option>
                    <option value="Hecho">Hecho</option>
                    <option value="Bloqueado">Bloqueado</option>
                    <option value="Pausado">Pausado</option>
                    <option value="Cancelado">Cancelado</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-notion-text-muted-light dark:text-notion-text-muted-dark">Área o Macroárea</label>
                  <input
                    type="text"
                    placeholder="Ej. Web/Landing, IA, Ventas"
                    value={newArea}
                    onChange={(e) => setNewArea(e.target.value)}
                    className="w-full px-2.5 py-1.5 rounded border border-notion-border-light dark:border-notion-border-dark bg-[#F4F4F2] dark:bg-[#1A1A1A] text-notion-text-light dark:text-notion-text-dark focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-notion-text-muted-light dark:text-notion-text-muted-dark">Fecha Límite</label>
                  <input
                    type="date"
                    value={newDate}
                    onChange={(e) => setNewDate(e.target.value)}
                    className="w-full px-2 py-1.5 rounded border border-notion-border-light dark:border-notion-border-dark bg-[#F4F4F2] dark:bg-[#1A1A1A] text-notion-text-light dark:text-notion-text-dark focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-notion-text-muted-light dark:text-notion-text-muted-dark">Justificación de Tarea (por Rol)</label>
                <textarea
                  rows="2"
                  placeholder="Explica por qué este integrante se hace cargo según su especialidad."
                  value={newJustification}
                  onChange={(e) => setNewJustification(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-notion-border-light dark:border-notion-border-dark bg-[#F4F4F2] dark:bg-[#1A1A1A] text-notion-text-light dark:text-notion-text-dark focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-notion-text-muted-light dark:text-notion-text-muted-dark">Bloqueo o Riesgo potencial</label>
                  <input
                    type="text"
                    placeholder="Ej. Falta de assets o credenciales de la API"
                    value={newRisk}
                    onChange={(e) => setNewRisk(e.target.value)}
                    className="w-full px-2.5 py-1.5 rounded border border-notion-border-light dark:border-notion-border-dark bg-[#F4F4F2] dark:bg-[#1A1A1A] text-notion-text-light dark:text-notion-text-dark focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-notion-text-muted-light dark:text-notion-text-muted-dark">Próxima acción manual</label>
                  <input
                    type="text"
                    placeholder="Ej. Agendar llamada técnica para validación"
                    value={newNextAction}
                    onChange={(e) => setNewNextAction(e.target.value)}
                    className="w-full px-2.5 py-1.5 rounded border border-notion-border-light dark:border-notion-border-dark bg-[#F4F4F2] dark:bg-[#1A1A1A] text-notion-text-light dark:text-notion-text-dark focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-notion-text-muted-light dark:text-notion-text-muted-dark">Observaciones o Entregable claro</label>
                <textarea
                  rows="2"
                  placeholder="Detalles sobre lo que se espera al completar esta tarea comercial u operativa."
                  value={newObservations}
                  onChange={(e) => setNewObservations(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-notion-border-light dark:border-notion-border-dark bg-[#F4F4F2] dark:bg-[#1A1A1A] text-notion-text-light dark:text-notion-text-dark focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-notion-border-light dark:border-notion-border-dark">
                <button
                  type="button"
                  onClick={() => setTaskFormOpen(false)}
                  className="px-3 py-1.5 border border-notion-border-light dark:border-notion-border-dark text-notion-text-muted-light dark:text-notion-text-muted-dark hover:bg-notion-border-light/20 rounded-lg font-semibold"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-bold shadow"
                >
                  Crear Tarea
                </button>
              </div>
            </form>
          </div>
        </>
      )}

    </div>
  );
}
