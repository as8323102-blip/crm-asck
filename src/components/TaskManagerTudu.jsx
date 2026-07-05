import React, { useState, useEffect } from 'react';
import { INTEGRANTES } from '../mockData';
import { 
  CheckSquare, 
  Square, 
  Calendar, 
  User, 
  Building2, 
  Plus, 
  Trash2, 
  Clock, 
  AlertCircle, 
  ChevronRight, 
  ChevronLeft,
  FolderOpen,
  PieChart,
  Settings,
  X
} from 'lucide-react';

export default function TaskManagerTudu({ 
  tasks = [], 
  clients = [], 
  sprints = [], // Recibimos sprints desde App.jsx
  currentUser, 
  onAddTask, 
  onToggleTask, 
  onUpdateTask, 
  onDeleteTask,
  onAddSprint, // Callback para registrar sprints
  onUpdateSprint, // Callback para actualizar sprints
  onClientClick 
}) {
  // Filtros
  const [filterOwner, setFilterOwner] = useState(currentUser ? currentUser.id : 'Todos');
  const [filterPriority, setFilterPriority] = useState('Todos');
  const [selectedSprintId, setSelectedSprintId] = useState('Todos');

  // Mantener filterOwner en sincronía con el usuario activo
  useEffect(() => {
    if (currentUser) {
      setFilterOwner(currentUser.id);
    }
  }, [currentUser]);

  // Drag and Drop States and Handlers
  const [draggedOverColumn, setDraggedOverColumn] = useState(null);

  const handleDragStart = (e, taskId) => {
    e.dataTransfer.setData('text/plain', taskId);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e, columnId) => {
    e.preventDefault();
    setDraggedOverColumn(columnId);
  };

  const handleDragLeave = () => {
    setDraggedOverColumn(null);
  };

  const handleDrop = (e, targetColumnId) => {
    e.preventDefault();
    setDraggedOverColumn(null);
    const taskId = e.dataTransfer.getData('text/plain');
    if (taskId) {
      onUpdateTask(taskId, {
        estado: targetColumnId,
        completada: targetColumnId === 'Completada'
      });
    }
  };

  // Modal Nuevo Sprint
  const [sprintModalOpen, setSprintModalOpen] = useState(false);
  const [sprName, setSprName] = useState('');
  const [sprStart, setSprStart] = useState('');
  const [sprEnd, setSprEnd] = useState('');
  const [sprGoal, setSprGoal] = useState('');
  const [sprOwner, setSprOwner] = useState(currentUser.id);
  const [sprStatus, setSprStatus] = useState('Planeado');

  // Formulario nueva tarea
  const [taskFormOpen, setTaskFormOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newSprintId, setNewSprintId] = useState('');
  const [newClientId, setNewClientId] = useState('');
  const [newAssignee, setNewAssignee] = useState(currentUser.id);
  const [newDate, setNewDate] = useState('');
  const [newTime, setNewTime] = useState('');
  const [newPriority, setNewPriority] = useState('Media');
  const [newDuration, setNewDuration] = useState('1 hora');
  const [newState, setNewState] = useState('Pendiente');

  // Columnas Kanban de Tareas
  const columns = [
    { id: 'Pendiente', label: 'Pendientes', color: 'border-t-amber-500 bg-amber-500/5 text-amber-500' },
    { id: 'En progreso', label: 'En progreso', color: 'border-t-indigo-500 bg-indigo-500/5 text-indigo-500' },
    { id: 'Completada', label: 'Completadas', color: 'border-t-emerald-500 bg-emerald-500/5 text-emerald-500' }
  ];

  // Manejar creación de sprint
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

  // Manejar creación de tarea
  const handleCreateTask = (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    onAddTask({
      titulo: newTitle,
      sprintId: newSprintId || null,
      clienteId: newClientId || null,
      asignadoA: newAssignee,
      fechaLimite: newDate || new Date().toISOString().split('T')[0],
      horaLimite: newTime || '12:00',
      prioridad: newPriority,
      duracionEstimada: newDuration,
      estado: newState,
      completada: newState === 'Completada'
    });

    setNewTitle('');
    setNewClientId('');
    setNewDate('');
    setNewTime('');
    setNewPriority('Media');
    setNewDuration('1 hora');
    setNewState('Pendiente');
    setTaskFormOpen(false);
  };

  // Desplazar estado de la tarea (Kanban)
  const shiftTaskState = (task, direction) => {
    const states = ['Pendiente', 'En progreso', 'Completada'];
    const currIdx = states.indexOf(task.estado);
    let nextIdx = direction === 'next' ? currIdx + 1 : currIdx - 1;
    
    if (nextIdx >= 0 && nextIdx < states.length) {
      const nextState = states[nextIdx];
      onUpdateTask(task.id, { 
        estado: nextState,
        completada: nextState === 'Completada'
      });
    }
  };

  // Filtrado de tareas
  const filteredTasks = tasks.filter(task => {
    const matchesOwner = filterOwner === 'Todos' || task.asignadoA === filterOwner;
    const matchesPriority = filterPriority === 'Todos' || task.prioridad === filterPriority;
    const matchesSprint = selectedSprintId === 'Todos' || task.sprintId === selectedSprintId;
    return matchesOwner && matchesPriority && matchesSprint;
  });

  // Sprint Seleccionado para mostrar KPI de Sprint
  const selectedSprint = sprints.find(s => s.id === selectedSprintId);
  const sprintTasks = tasks.filter(t => t.sprintId === selectedSprintId);
  const sprintCompletedTasks = sprintTasks.filter(t => t.completada).length;
  const sprintTotalTasks = sprintTasks.length;
  const sprintProgress = sprintTotalTasks ? Math.round((sprintCompletedTasks / sprintTotalTasks) * 100) : 0;

  return (
    <div className="space-y-6 text-xs">

      {/* Fila de Filtros y Configuración de Sprints */}
      <div className="flex flex-col md:flex-row gap-3 justify-between items-start md:items-center p-4 rounded-xl border border-notion-border-light dark:border-notion-border-dark bg-notion-card-light dark:bg-notion-card-dark notion-shadow">
        
        <div className="flex flex-wrap gap-2.5 items-center">
          
          {/* Selector de Sprint */}
          <div className="flex items-center gap-1.5 border border-notion-border-light dark:border-notion-border-dark bg-notion-bg-light dark:bg-notion-bg-dark px-2.5 py-1.5 rounded-lg">
            <FolderOpen size={13} className="text-indigo-500" />
            <select
              value={selectedSprintId}
              onChange={(e) => setSelectedSprintId(e.target.value)}
              className="bg-transparent text-[11px] text-notion-text-light dark:text-notion-text-dark font-bold focus:outline-none cursor-pointer"
            >
              <option value="Todos">Sprints: Todos</option>
              {sprints.map(spr => (
                <option key={spr.id} value={spr.id}>
                  {spr.nombre} ({spr.estado})
                </option>
              ))}
            </select>
          </div>

          {/* Filtro Responsable */}
          <div className="flex items-center gap-1.5 border border-notion-border-light dark:border-notion-border-dark bg-notion-bg-light dark:bg-notion-bg-dark px-2.5 py-1.5 rounded-lg">
            <User size={13} className="text-notion-text-muted-light dark:text-notion-text-muted-dark" />
            <select
              value={filterOwner}
              onChange={(e) => setFilterOwner(e.target.value)}
              className="bg-transparent text-[11px] text-notion-text-light dark:text-notion-text-dark font-medium focus:outline-none cursor-pointer"
            >
              <option value="Todos">Responsables: Todos</option>
              {INTEGRANTES.map(user => (
                <option key={user.id} value={user.id}>{user.nombre}</option>
              ))}
            </select>
          </div>

          {/* Filtro Prioridad */}
          <div className="flex items-center gap-1.5 border border-notion-border-light dark:border-notion-border-dark bg-notion-bg-light dark:bg-notion-bg-dark px-2.5 py-1.5 rounded-lg">
            <AlertCircle size={13} className="text-notion-text-muted-light dark:text-notion-text-muted-dark" />
            <select
              value={filterPriority}
              onChange={(e) => setFilterPriority(e.target.value)}
              className="bg-transparent text-[11px] text-notion-text-light dark:text-notion-text-dark font-medium focus:outline-none cursor-pointer"
            >
              <option value="Todos">Prioridades: Todas</option>
              <option value="Baja">Baja</option>
              <option value="Media">Media</option>
              <option value="Alta">Alta</option>
            </select>
          </div>

        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setSprintModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 border border-notion-border-light dark:border-notion-border-dark hover:bg-notion-border-light/20 text-notion-text-light dark:text-notion-text-dark rounded-lg font-bold transition-all bg-transparent"
          >
            <span>+ Nuevo Sprint</span>
          </button>
          
          <button
            onClick={() => setTaskFormOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-bold shadow transition-all"
          >
            <Plus size={14} />
            <span>Nueva Tarea</span>
          </button>
        </div>

      </div>

      {/* Panel de Resumen del Sprint Seleccionado (Notion style Sprint Card) */}
      {selectedSprint && (
        <div className="p-5 rounded-xl border border-notion-border-light dark:border-notion-border-dark bg-notion-card-light dark:bg-notion-card-dark notion-shadow grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2 md:col-span-2">
            <div className="flex items-center gap-2">
              <span className={`text-[9px] font-bold px-2 py-0.5 rounded border uppercase ${
                selectedSprint.estado === 'Activo' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' :
                selectedSprint.estado === 'Terminado' ? 'bg-blue-500/10 text-blue-500 border-blue-500/20' :
                selectedSprint.estado === 'Pausado' ? 'bg-rose-500/10 text-rose-500 border-rose-500/20' :
                'bg-zinc-500/10 text-zinc-500 border-zinc-500/20'
              }`}>
                Sprint {selectedSprint.estado}
              </span>
              <h2 className="text-sm font-bold text-notion-text-light dark:text-notion-text-dark">{selectedSprint.nombre}</h2>
            </div>
            <p className="text-xs text-notion-text-muted-light dark:text-notion-text-muted-dark leading-relaxed">
              <strong>Objetivo del Sprint:</strong> {selectedSprint.objetivo || 'Sin objetivo definido.'}
            </p>
            <div className="text-[10px] text-notion-text-muted-light dark:text-notion-text-muted-dark font-mono">
              📅 Rango: {selectedSprint.fechaInicio} al {selectedSprint.fechaFin}
            </div>
          </div>

          <div className="flex flex-col justify-center space-y-2.5 p-3 rounded-lg bg-[#fbfbfa]/50 dark:bg-[#1a1a1a]/50 border border-notion-border-light/40 dark:border-notion-border-dark/40">
            <div className="flex justify-between items-center text-[10px] font-bold text-notion-text-light dark:text-notion-text-dark">
              <span className="flex items-center gap-1.5"><PieChart size={13} className="text-indigo-500" /> Progreso del Sprint</span>
              <span>{sprintProgress}%</span>
            </div>
            
            <div className="w-full bg-[#EBEBE9] dark:bg-[#2A2A2A] h-2 rounded-full overflow-hidden">
              <div 
                className="h-full rounded-full bg-emerald-500 transition-all duration-300"
                style={{ width: `${sprintProgress}%` }}
              />
            </div>
            <span className="text-[9px] text-notion-text-muted-light dark:text-notion-text-muted-dark font-mono">
              Completadas: {sprintCompletedTasks} de {sprintTotalTasks} tareas asociadas.
            </span>
          </div>
        </div>
      )}

      {/* Tablero Kanban de Tareas (3 Columnas) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start pb-4">
        {columns.map((column) => {
          const columnTasks = filteredTasks.filter(t => t.estado === column.id);
          const isOver = draggedOverColumn === column.id;

          return (
            <div 
              key={column.id}
              onDragOver={(e) => handleDragOver(e, column.id)}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, column.id)}
              className={`
                flex flex-col rounded-xl border border-notion-border-light dark:border-notion-border-dark
                bg-notion-card-light dark:bg-notion-card-dark/20 min-h-[450px] max-h-[700px] overflow-hidden transition-all duration-150
                border-t-4 ${column.color}
                ${isOver ? 'ring-2 ring-indigo-500/50 bg-indigo-500/5' : ''}
              `}
            >
              <div className="p-3 border-b border-notion-border-light dark:border-notion-border-dark flex items-center justify-between bg-notion-card-light dark:bg-notion-card-dark">
                <div className="flex items-center gap-1.5">
                  <span className="font-semibold text-xs text-notion-text-light dark:text-notion-text-dark">{column.label}</span>
                  <span className="text-[10px] px-1.5 py-0.2 rounded bg-notion-border-light dark:border-notion-border-dark text-notion-text-muted-light dark:text-notion-text-muted-dark font-mono font-bold">
                    {columnTasks.length}
                  </span>
                </div>
              </div>

              <div className="p-2.5 space-y-2.5 overflow-y-auto flex-1 custom-scrollbar">
                {columnTasks.length === 0 ? (
                  <div className="text-center py-8 text-[10px] text-notion-text-muted-light dark:text-notion-text-muted-dark italic">
                    Sin tareas.
                  </div>
                ) : (
                  columnTasks.map((task) => {
                    const assignee = INTEGRANTES.find(i => i.id === task.asignadoA);
                    const client = clients.find(c => c.id === task.clienteId);
                    const sprint = sprints.find(s => s.id === task.sprintId);

                    return (
                      <div
                        key={task.id}
                        draggable
                        onDragStart={(e) => handleDragStart(e, task.id)}
                        className="
                          p-3 rounded-lg border border-notion-border-light dark:border-notion-border-dark
                          bg-notion-card-light dark:bg-notion-card-dark hover:border-indigo-500/30
                          cursor-grab active:cursor-grabbing transition-all duration-155 notion-shadow space-y-3 hover-glow
                        "
                      >
                        {/* Título y Delete */}
                        <div className="flex justify-between items-start gap-1">
                          <div className="flex items-start gap-2 min-w-0">
                            <button
                              onClick={() => onToggleTask(task.id)}
                              className="text-notion-text-muted-light dark:text-notion-text-muted-dark hover:text-indigo-500 transition-colors mt-0.5 flex-shrink-0"
                            >
                              {task.completada ? (
                                <CheckSquare size={14} className="text-emerald-500" />
                              ) : (
                                <Square size={14} />
                              )}
                            </button>
                            <span className={`font-semibold text-xs leading-snug break-words ${task.completada ? 'line-through text-notion-text-muted-light dark:text-notion-text-muted-dark' : 'text-notion-text-light dark:text-notion-text-dark'}`}>
                              {task.titulo}
                            </span>
                          </div>
                          <button
                            onClick={() => onDeleteTask(task.id)}
                            className="p-0.5 rounded text-notion-text-muted-light dark:text-notion-text-muted-dark hover:text-rose-500 flex-shrink-0"
                            title="Eliminar"
                          >
                            <Trash2 size={12} />
                          </button>
                        </div>

                        {/* Relación Cliente */}
                        {client && (
                          <button
                            onClick={() => onClientClick(client)}
                            className="w-full p-1.5 rounded bg-indigo-500/5 hover:bg-indigo-500/10 border border-indigo-500/10 text-indigo-500 font-semibold flex items-center gap-1.5 text-[9px] text-left transition-colors"
                          >
                            <Building2 size={10} />
                            <span className="truncate">{client.nombre} ({client.empresa})</span>
                          </button>
                        )}

                        {/* Relación Sprint (Notion Sprint Tag) */}
                        {sprint && (
                          <div className="flex items-center gap-1 text-[9px] text-notion-text-muted-light dark:text-notion-text-muted-dark font-mono bg-zinc-500/10 border border-notion-border-light dark:border-notion-border-dark px-1.5 py-0.5 rounded w-fit">
                            <span>🏃‍♂️ {sprint.nombre.split(':')[0]}</span>
                          </div>
                        )}

                        {/* Detalles: Asignado, Fecha, Prioridad y Cambio Rápido */}
                        <div className="flex items-center justify-between pt-2 border-t border-notion-border-light/40 dark:border-notion-border-dark/40 text-[9px] gap-2">
                          <div className="flex items-center gap-1 min-w-0">
                            {assignee ? (
                              <>
                                <img src={assignee.avatarUrl} alt={assignee.nombre} className="w-4 h-4 rounded-full bg-indigo-50 dark:bg-indigo-950 flex-shrink-0" />
                                <span className="text-notion-text-muted-light dark:text-notion-text-muted-dark truncate max-w-[45px]">{assignee.nombre}</span>
                              </>
                            ) : (
                              <span className="text-notion-text-muted-light dark:text-notion-text-muted-dark">Sin asignar</span>
                            )}
                          </div>

                          <div className="flex items-center gap-0.5 text-notion-text-muted-light dark:text-notion-text-muted-dark font-mono flex-shrink-0">
                            <Clock size={10} />
                            <span>{task.fechaLimite} {task.horaLimite ? `@${task.horaLimite}` : ''}</span>
                          </div>
                        </div>

                        {/* Fila inferior de estado y duración */}
                        <div className="pt-2 flex justify-between items-center text-[9px] border-t border-dashed border-notion-border-light/40 dark:border-notion-border-dark/40">
                          <div className="flex items-center gap-1">
                            <span className={`text-[8px] font-extrabold px-1 rounded ${
                              task.prioridad === 'Alta' ? 'bg-rose-500/10 text-rose-500' :
                              task.prioridad === 'Media' ? 'bg-amber-500/10 text-amber-500' :
                              'bg-blue-500/10 text-blue-500'
                            }`}>
                              {task.prioridad}
                            </span>
                            {task.duracionEstimada && (
                              <span className="text-[8px] text-notion-text-muted-light dark:text-notion-text-muted-dark bg-zinc-500/10 px-1 rounded">
                                {task.duracionEstimada}
                              </span>
                            )}
                          </div>

                          <div className="flex items-center gap-1">
                            <button
                              disabled={task.estado === 'Pendiente'}
                              onClick={() => shiftTaskState(task, 'prev')}
                              className="p-0.5 rounded bg-[#F4F4F2]/60 dark:bg-[#1A1A1A]/60 hover:bg-notion-border-light dark:hover:bg-notion-border-dark disabled:opacity-40"
                            >
                              <ChevronLeft size={10} />
                            </button>
                            <span className="font-bold uppercase tracking-wider text-[8px] text-notion-text-muted-light dark:text-notion-text-muted-dark">
                              {task.estado === 'Completada' ? 'Listo' : task.estado === 'En progreso' ? 'Prog' : 'Pend'}
                            </span>
                            <button
                              disabled={task.estado === 'Completada'}
                              onClick={() => shiftTaskState(task, 'next')}
                              className="p-0.5 rounded bg-[#F4F4F2]/60 dark:bg-[#1A1A1A]/60 hover:bg-notion-border-light dark:hover:bg-notion-border-dark disabled:opacity-40"
                            >
                              <ChevronRight size={10} />
                            </button>
                          </div>
                        </div>

                      </div>
                    );
                  })
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* MODAL: CREAR SPRINT */}
      {sprintModalOpen && (
        <>
          <div className="fixed inset-0 bg-black/55 backdrop-blur-sm z-[100]" onClick={() => setSprintModalOpen(false)} />
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-md w-[92%] bg-notion-card-light dark:bg-notion-card-dark border border-notion-border-light dark:border-notion-border-dark rounded-xl shadow-2xl z-[101] p-5 space-y-4">
            <div className="flex justify-between items-center pb-2.5 border-b border-notion-border-light dark:border-notion-border-dark">
              <h3 className="font-bold text-sm text-notion-text-light dark:text-notion-text-dark">Crear Nuevo Sprint</h3>
              <button onClick={() => setSprintModalOpen(false)} className="p-1 rounded text-notion-text-muted-light dark:text-notion-text-muted-dark hover:text-notion-text-light dark:hover:text-notion-text-dark">
                <X size={15} />
              </button>
            </div>

            <form onSubmit={handleCreateSprint} className="space-y-4">
              <div className="space-y-1">
                <label className="font-semibold text-notion-text-muted-light dark:text-notion-text-muted-dark">Nombre del Sprint *</label>
                <input
                  type="text"
                  required
                  placeholder="Ej. Sprint 3: Ajustes e Integraciones comerciales"
                  value={sprName}
                  onChange={(e) => setSprName(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-notion-border-light dark:border-notion-border-dark bg-notion-bg-light dark:bg-notion-bg-dark text-notion-text-light dark:text-notion-text-dark focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-notion-text-muted-light dark:text-notion-text-muted-dark">Fecha de Inicio *</label>
                  <input
                    type="date"
                    required
                    value={sprStart}
                    onChange={(e) => setSprStart(e.target.value)}
                    className="w-full px-2 py-1.5 rounded border border-notion-border-light dark:border-notion-border-dark bg-notion-bg-light dark:bg-notion-bg-dark text-notion-text-light dark:text-notion-text-dark focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-semibold text-notion-text-muted-light dark:text-notion-text-muted-dark">Fecha Final *</label>
                  <input
                    type="date"
                    required
                    value={sprEnd}
                    onChange={(e) => setSprEnd(e.target.value)}
                    className="w-full px-2 py-1.5 rounded border border-notion-border-light dark:border-notion-border-dark bg-notion-bg-light dark:bg-notion-bg-dark text-notion-text-light dark:text-notion-text-dark focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-notion-text-muted-light dark:text-notion-text-muted-dark">Objetivo del Sprint</label>
                <textarea
                  rows="2"
                  placeholder="Ej. Consolidar el alta de propuestas e integraciones de pagos."
                  value={sprGoal}
                  onChange={(e) => setSprGoal(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-notion-border-light dark:border-notion-border-dark bg-notion-bg-light dark:bg-notion-bg-dark text-notion-text-light dark:text-notion-text-dark focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-notion-text-muted-light dark:text-notion-text-muted-dark">Responsable general</label>
                  <select
                    value={sprOwner}
                    onChange={(e) => setSprOwner(e.target.value)}
                    className="w-full px-2 py-1.5 rounded border border-notion-border-light dark:border-notion-border-dark bg-notion-bg-light dark:bg-notion-bg-dark text-notion-text-light dark:text-notion-text-dark focus:outline-none"
                  >
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
                    className="w-full px-2 py-1.5 rounded border border-notion-border-light dark:border-notion-border-dark bg-notion-bg-light dark:bg-notion-bg-dark text-notion-text-light dark:text-notion-text-dark focus:outline-none"
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
                  Crear Sprint
                </button>
              </div>
            </form>
          </div>
        </>
      )}

      {/* MODAL: CREAR TAREA DENTRO DE SPRINT */}
      {taskFormOpen && (
        <>
          <div className="fixed inset-0 bg-black/55 backdrop-blur-sm z-[100]" onClick={() => setTaskFormOpen(false)} />
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-lg w-[92%] bg-notion-card-light dark:bg-notion-card-dark border border-notion-border-light dark:border-notion-border-dark rounded-xl shadow-2xl z-[101] p-5 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center pb-2.5 border-b border-notion-border-light dark:border-notion-border-dark">
              <h3 className="font-bold text-sm text-notion-text-light dark:text-notion-text-dark">Crear Nueva Tarea</h3>
              <button onClick={() => setTaskFormOpen(false)} className="p-1 rounded text-notion-text-muted-light dark:text-notion-text-muted-dark hover:text-notion-text-light dark:hover:text-notion-text-dark">
                <X size={15} />
              </button>
            </div>

            <form onSubmit={handleCreateTask} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-semibold text-notion-text-muted-light dark:text-notion-text-muted-dark">Título de la tarea *</label>
                <input
                  type="text"
                  required
                  placeholder="Ej. Implementar validación de correo"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-notion-border-light dark:border-notion-border-dark bg-notion-bg-light dark:bg-notion-bg-dark text-notion-text-light dark:text-notion-text-dark focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                
                <div className="space-y-1">
                  <label className="font-semibold text-notion-text-muted-light dark:text-notion-text-muted-dark">Sprint relacionado</label>
                  <select
                    value={newSprintId}
                    onChange={(e) => setNewSprintId(e.target.value)}
                    className="w-full px-2 py-1.5 rounded border border-notion-border-light dark:border-notion-border-dark bg-notion-bg-light dark:bg-notion-bg-dark text-notion-text-light dark:text-notion-text-dark focus:outline-none"
                  >
                    <option value="">Ninguno (Backlog general)</option>
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
                    className="w-full px-2 py-1.5 rounded border border-notion-border-light dark:border-notion-border-dark bg-notion-bg-light dark:bg-notion-bg-dark text-notion-text-light dark:text-notion-text-dark focus:outline-none"
                  >
                    <option value="">Ninguno (Tarea Interna)</option>
                    {clients.map(c => (
                      <option key={c.id} value={c.id}>{c.nombre} ({c.empresa})</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-notion-text-muted-light dark:text-notion-text-muted-dark">Responsable</label>
                  <select
                    value={newAssignee}
                    onChange={(e) => setNewAssignee(e.target.value)}
                    className="w-full px-2 py-1.5 rounded border border-notion-border-light dark:border-notion-border-dark bg-notion-bg-light dark:bg-notion-bg-dark text-notion-text-light dark:text-notion-text-dark focus:outline-none"
                  >
                    {INTEGRANTES.map(user => (
                      <option key={user.id} value={user.id}>{user.nombre}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-notion-text-muted-light dark:text-notion-text-muted-dark">Prioridad</label>
                  <select
                    value={newPriority}
                    onChange={(e) => setNewPriority(e.target.value)}
                    className="w-full px-2 py-1.5 rounded border border-notion-border-light dark:border-notion-border-dark bg-notion-bg-light dark:bg-notion-bg-dark text-notion-text-light dark:text-notion-text-dark focus:outline-none"
                  >
                    <option value="Baja">Baja</option>
                    <option value="Media">Media</option>
                    <option value="Alta">Alta</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-notion-text-muted-light dark:text-notion-text-muted-dark">Fecha Límite</label>
                  <input
                    type="date"
                    value={newDate}
                    onChange={(e) => setNewDate(e.target.value)}
                    className="w-full px-2 py-1.5 rounded border border-notion-border-light dark:border-notion-border-dark bg-notion-bg-light dark:bg-notion-bg-dark text-notion-text-light dark:text-notion-text-dark focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-notion-text-muted-light dark:text-notion-text-muted-dark">Hora estimada</label>
                  <input
                    type="time"
                    value={newTime}
                    onChange={(e) => setNewTime(e.target.value)}
                    className="w-full px-2 py-1.5 rounded border border-notion-border-light dark:border-notion-border-dark bg-notion-bg-light dark:bg-notion-bg-dark text-notion-text-light dark:text-notion-text-dark focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-notion-text-muted-light dark:text-notion-text-muted-dark">Duración estimada</label>
                  <input
                    type="text"
                    placeholder="Ej. 2 horas / 30 mins"
                    value={newDuration}
                    onChange={(e) => setNewDuration(e.target.value)}
                    className="w-full px-2.5 py-1.5 rounded border border-notion-border-light dark:border-notion-border-dark bg-notion-bg-light dark:bg-notion-bg-dark text-notion-text-light dark:text-notion-text-dark focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-notion-text-muted-light dark:text-notion-text-muted-dark">Estado inicial</label>
                  <select
                    value={newState}
                    onChange={(e) => setNewState(e.target.value)}
                    className="w-full px-2 py-1.5 rounded border border-notion-border-light dark:border-notion-border-dark bg-notion-bg-light dark:bg-notion-bg-dark text-notion-text-light dark:text-notion-text-dark focus:outline-none"
                  >
                    <option value="Pendiente">Pendiente</option>
                    <option value="En progreso">En progreso</option>
                    <option value="Completada">Completada</option>
                  </select>
                </div>

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
