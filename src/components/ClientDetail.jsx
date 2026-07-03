import React, { useState } from 'react';
import { INTEGRANTES } from '../mockData';
import { 
  X, 
  Building2, 
  Mail, 
  Phone, 
  User, 
  Tag, 
  DollarSign, 
  Calendar,
  MessageSquare,
  Clock,
  Plus,
  Trash2,
  CheckSquare,
  AlertCircle,
  FolderPlus,
  Play,
  Edit3
} from 'lucide-react';
import { formatMXN } from '../utils/currency';

export default function ClientDetail({ 
  client, 
  notes, 
  tasks,
  activities = [],
  onClose, 
  onUpdateClient, 
  onAddNote, 
  onAddTask,
  onToggleTask,
  onDeleteClient,
  currentUser
}) {
  const [newNote, setNewNote] = useState('');
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [activeSubTab, setActiveSubTab] = useState('notes'); // 'notes' | 'tasks' | 'fields' | 'activity'
  const [isEditing, setIsEditing] = useState(false);

  // Estados locales temporales de edición
  const [tempNombre, setTempNombre] = useState(client?.nombre || '');
  const [tempEmpresa, setTempEmpresa] = useState(client?.empresa || '');
  const [tempCorreo, setTempCorreo] = useState(client?.correo || '');
  const [tempTelefono, setTempTelefono] = useState(client?.telefono || '');
  const [tempValorEstimado, setTempValorEstimado] = useState(client?.valorEstimado || 0);

  if (!client) return null;

  const clientNotes = notes.filter(n => n.clienteId === client.id);
  const clientTasks = tasks.filter(t => t.clienteId === client.id);
  const clientActivities = activities.filter(act => act.clienteId === client.id);

  const handleSaveEdits = () => {
    onUpdateClient(client.id, {
      nombre: tempNombre,
      empresa: tempEmpresa,
      correo: tempCorreo,
      telefono: tempTelefono,
      valorEstimado: Number(tempValorEstimado) || 0
    });
    setIsEditing(false);
  };

  const handleNoteSubmit = (e) => {
    e.preventDefault();
    if (!newNote.trim()) return;

    onAddNote({
      clienteId: client.id,
      autorId: currentUser.id,
      contenido: newNote
    });

    setNewNote('');
  };

  const handleTaskSubmit = (e) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    onAddTask({
      clienteId: client.id,
      asignadoA: client.responsableId || currentUser.id,
      titulo: newTaskTitle,
      completada: false,
      estado: "Pendiente",
      prioridad: "Media",
      fechaLimite: new Date(Date.now() + 86400000).toISOString().split('T')[0],
      horaLimite: "12:00"
    });

    setNewTaskTitle('');
  };

  // Campos Personalizados (Notion style)
  const handleCustomFieldChange = (index, fieldKey, fieldValue) => {
    const updated = [...(client.camposPersonalizados || [])];
    updated[index] = { clave: fieldKey, valor: fieldValue };
    onUpdateClient(client.id, { camposPersonalizados: updated });
  };

  const handleAddCustomField = () => {
    const updated = [...(client.camposPersonalizados || []), { clave: 'Nueva propiedad', valor: '' }];
    onUpdateClient(client.id, { camposPersonalizados: updated });
  };

  const handleRemoveCustomField = (index) => {
    const updated = (client.camposPersonalizados || []).filter((_, idx) => idx !== index);
    onUpdateClient(client.id, { camposPersonalizados: updated });
  };

  return (
    <>
      {/* Fondo opaco (Backdrop) */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-md z-40 transition-opacity"
        onClick={onClose}
      />

      {/* Modal Grande Centrado (Notion style) */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[92%] max-w-4xl h-[85vh] bg-notion-card-light dark:bg-notion-card-dark border border-notion-border-light dark:border-notion-border-dark shadow-2xl rounded-2xl z-50 flex flex-col md:flex-row overflow-hidden transition-all text-xs">
        
        {/* Panel Principal Izquierdo: Contenido y Propiedades */}
        <div className="flex-1 p-6 overflow-y-auto flex flex-col justify-between space-y-6">
          
          {/* Identificador Principal */}
          <div className="space-y-2">
            <div className="flex justify-between items-center md:hidden">
              <span className="text-[9px] uppercase font-bold tracking-widest text-indigo-500 bg-indigo-500/10 px-2 py-0.5 rounded">Página del Cliente</span>
              <button onClick={onClose} className="p-1 rounded hover:bg-notion-border-light dark:hover:bg-notion-border-dark text-notion-text-muted-light dark:text-notion-text-muted-dark">
                <X size={16} />
              </button>
            </div>

            {isEditing ? (
              <div className="space-y-2">
                <input 
                  type="text"
                  value={tempNombre}
                  onChange={(e) => setTempNombre(e.target.value)}
                  className="text-lg font-bold bg-notion-bg-light dark:bg-notion-bg-dark border border-notion-border-light dark:border-notion-border-dark rounded px-2.5 py-1 w-full text-notion-text-light dark:text-notion-text-dark focus:ring-1 focus:ring-indigo-500 focus:outline-none"
                  placeholder="Nombre del contacto"
                />
                <div className="flex items-center gap-2">
                  <Building2 size={13} className="text-notion-text-muted-light dark:text-notion-text-muted-dark" />
                  <input 
                    type="text"
                    value={tempEmpresa}
                    onChange={(e) => setTempEmpresa(e.target.value)}
                    className="bg-notion-bg-light dark:bg-notion-bg-dark border border-notion-border-light dark:border-notion-border-dark rounded px-2 py-0.5 text-xs text-notion-text-light dark:text-notion-text-dark focus:ring-1 focus:ring-indigo-500 focus:outline-none"
                    placeholder="Empresa"
                  />
                </div>
              </div>
            ) : (
              <div className="space-y-1">
                <h2 className="text-xl font-extrabold text-notion-text-light dark:text-notion-text-dark tracking-tight">
                  {client.nombre}
                </h2>
                <div className="flex items-center gap-1.5 text-notion-text-muted-light dark:text-notion-text-muted-dark font-medium">
                  <Building2 size={13} />
                  <span>{client.empresa}</span>
                </div>
              </div>
            )}
          </div>

          {/* Grilla de Propiedades Metadatos */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3.5 gap-x-4 py-4 border-y border-notion-border-light dark:border-notion-border-dark">
            
            {/* Estado */}
            <div className="flex items-center justify-between">
              <span className="text-notion-text-muted-light dark:text-notion-text-muted-dark flex items-center gap-1.5 font-semibold">
                <Tag size={13} /> Estado Pipeline
              </span>
              <select
                value={client.estado}
                onChange={(e) => onUpdateClient(client.id, { estado: e.target.value, ultimoContacto: new Date().toISOString() })}
                className="px-2 py-1 rounded border border-notion-border-light dark:border-notion-border-dark bg-notion-bg-light dark:bg-notion-bg-dark text-notion-text-light dark:text-notion-text-dark focus:outline-none focus:ring-1 focus:ring-indigo-500 w-44 cursor-pointer"
              >
                <option value="Prospecto">Prospecto</option>
                <option value="Contactado">Contactado</option>
                <option value="Negociación">Negociación</option>
                <option value="Cerrado">Cerrado (Ganado)</option>
                <option value="Perdido / pausado">Perdido / pausado</option>
              </select>
            </div>

            {/* Prioridad */}
            <div className="flex items-center justify-between">
              <span className="text-notion-text-muted-light dark:text-notion-text-muted-dark flex items-center gap-1.5 font-semibold">
                <AlertCircle size={13} /> Prioridad
              </span>
              <select
                value={client.prioridad || 'Baja'}
                onChange={(e) => onUpdateClient(client.id, { prioridad: e.target.value })}
                className="px-2 py-1 rounded border border-notion-border-light dark:border-notion-border-dark bg-notion-bg-light dark:bg-notion-bg-dark text-notion-text-light dark:text-notion-text-dark focus:outline-none focus:ring-1 focus:ring-indigo-500 w-44 cursor-pointer"
              >
                <option value="Baja">Baja</option>
                <option value="Media">Media</option>
                <option value="Alta">Alta</option>
              </select>
            </div>

            {/* Responsable */}
            <div className="flex items-center justify-between">
              <span className="text-notion-text-muted-light dark:text-notion-text-muted-dark flex items-center gap-1.5 font-semibold">
                <User size={13} /> Responsable
              </span>
              <select
                value={client.responsableId || ''}
                onChange={(e) => onUpdateClient(client.id, { responsableId: e.target.value })}
                className="px-2 py-1 rounded border border-notion-border-light dark:border-notion-border-dark bg-notion-bg-light dark:bg-notion-bg-dark text-notion-text-light dark:text-notion-text-dark focus:outline-none focus:ring-1 focus:ring-indigo-500 w-44 cursor-pointer"
              >
                <option value="">Sin Asignar</option>
                {INTEGRANTES.map(user => (
                  <option key={user.id} value={user.id}>{user.nombre}</option>
                ))}
              </select>
            </div>

            {/* Monto estimado (MXN) */}
            <div className="flex items-center justify-between">
              <span className="text-notion-text-muted-light dark:text-notion-text-muted-dark flex items-center gap-1.5 font-semibold">
                <DollarSign size={13} /> Monto Estimado
              </span>
              {isEditing ? (
                <div className="relative w-44">
                  <input
                    type="number"
                    value={tempValorEstimado}
                    onChange={(e) => setTempValorEstimado(Number(e.target.value))}
                    className="w-full pl-5 pr-2 py-1 rounded border border-notion-border-light dark:border-notion-border-dark bg-notion-bg-light dark:bg-notion-bg-dark text-notion-text-light dark:text-notion-text-dark focus:ring-1 focus:ring-indigo-500 focus:outline-none"
                  />
                  <span className="absolute left-2 top-1/2 -translate-y-1/2 font-bold text-notion-text-muted-light dark:text-notion-text-muted-dark">$</span>
                </div>
              ) : (
                <span className="w-44 text-right font-extrabold text-notion-text-light dark:text-notion-text-dark pl-2">
                  {formatMXN(client.valorEstimado)}
                </span>
              )}
            </div>

            {/* Correo y Teléfono */}
            <div className="flex items-center justify-between">
              <span className="text-notion-text-muted-light dark:text-notion-text-muted-dark flex items-center gap-1.5 font-semibold">
                <Mail size={13} /> Correo
              </span>
              {isEditing ? (
                <input
                  type="email"
                  value={tempCorreo}
                  onChange={(e) => setTempCorreo(e.target.value)}
                  className="px-2 py-1 w-44 rounded border border-notion-border-light dark:border-notion-border-dark bg-notion-bg-light dark:bg-notion-bg-dark text-notion-text-light dark:text-notion-text-dark focus:ring-1 focus:ring-indigo-500 focus:outline-none"
                />
              ) : (
                <span className="w-44 text-right truncate text-notion-text-light dark:text-notion-text-dark pl-2">
                  {client.correo || '—'}
                </span>
              )}
            </div>

            <div className="flex items-center justify-between">
              <span className="text-notion-text-muted-light dark:text-notion-text-muted-dark flex items-center gap-1.5 font-semibold">
                <Phone size={13} /> Teléfono
              </span>
              {isEditing ? (
                <input
                  type="text"
                  value={tempTelefono}
                  onChange={(e) => setTempTelefono(e.target.value)}
                  className="px-2 py-1 w-44 rounded border border-notion-border-light dark:border-notion-border-dark bg-notion-bg-light dark:bg-notion-bg-dark text-notion-text-light dark:text-notion-text-dark focus:ring-1 focus:ring-indigo-500 focus:outline-none"
                />
              ) : (
                <span className="w-44 text-right text-notion-text-light dark:text-notion-text-dark pl-2">
                  {client.telefono || '—'}
                </span>
              )}
            </div>

            {/* Fecha Seguimiento */}
            <div className="flex items-center justify-between">
              <span className="text-notion-text-muted-light dark:text-notion-text-muted-dark flex items-center gap-1.5 font-semibold">
                <Calendar size={13} /> Próx. Seguimiento
              </span>
              <input
                type="date"
                value={client.fechaSeguimiento || ''}
                onChange={(e) => onUpdateClient(client.id, { fechaSeguimiento: e.target.value })}
                className="px-2 py-1 rounded border border-notion-border-light dark:border-notion-border-dark bg-notion-bg-light dark:bg-notion-bg-dark text-notion-text-light dark:text-notion-text-dark focus:outline-none focus:ring-1 focus:ring-indigo-500 w-44"
              />
            </div>

            {/* Último contacto */}
            <div className="flex items-center justify-between">
              <span className="text-notion-text-muted-light dark:text-notion-text-muted-dark flex items-center gap-1.5 font-semibold">
                <Clock size={13} /> Último Contacto
              </span>
              <span className="w-44 text-right text-notion-text-muted-light dark:text-notion-text-muted-dark font-mono text-[10px]">
                {new Date(client.ultimoContacto).toLocaleString('es-MX')}
              </span>
            </div>

          </div>

          {/* Sub-Tabs: Notas, Tareas, Campos Custom, Historial */}
          <div className="space-y-4 flex-1 flex flex-col min-h-0">
            <div className="flex border-b border-notion-border-light dark:border-notion-border-dark font-bold overflow-x-auto text-[11px]">
              <button
                onClick={() => setActiveSubTab('notes')}
                className={`pb-2 px-3.5 border-b-2 transition-all ${activeSubTab === 'notes' ? 'border-indigo-500 text-indigo-500' : 'border-transparent text-notion-text-muted-light dark:text-notion-text-muted-dark hover:text-notion-text-light dark:hover:text-notion-text-dark'}`}
              >
                Notas ({clientNotes.length})
              </button>
              <button
                onClick={() => setActiveSubTab('tasks')}
                className={`pb-2 px-3.5 border-b-2 transition-all ${activeSubTab === 'tasks' ? 'border-indigo-500 text-indigo-500' : 'border-transparent text-notion-text-muted-light dark:text-notion-text-muted-dark hover:text-notion-text-light dark:hover:text-notion-text-dark'}`}
              >
                Tareas ({clientTasks.length})
              </button>
              <button
                onClick={() => setActiveSubTab('fields')}
                className={`pb-2 px-3.5 border-b-2 transition-all ${activeSubTab === 'fields' ? 'border-indigo-500 text-indigo-500' : 'border-transparent text-notion-text-muted-light dark:text-notion-text-muted-dark hover:text-notion-text-light dark:hover:text-notion-text-dark'}`}
              >
                Propiedades Custom ({(client.camposPersonalizados || []).length})
              </button>
              <button
                onClick={() => setActiveSubTab('activity')}
                className={`pb-2 px-3.5 border-b-2 transition-all ${activeSubTab === 'activity' ? 'border-indigo-500 text-indigo-500' : 'border-transparent text-notion-text-muted-light dark:text-notion-text-muted-dark hover:text-notion-text-light dark:hover:text-notion-text-dark'}`}
              >
                Actividad ({clientActivities.length})
              </button>
            </div>

            <div className="flex-1 overflow-y-auto max-h-[250px] pr-1.5">
              {/* TAB: NOTAS */}
              {activeSubTab === 'notes' && (
                <div className="space-y-4">
                  <div className="space-y-2.5">
                    {clientNotes.length === 0 ? (
                      <p className="text-xs text-notion-text-muted-light dark:text-notion-text-muted-dark text-center py-6">Sin anotaciones registradas.</p>
                    ) : (
                      clientNotes.map((note) => {
                        const author = INTEGRANTES.find(i => i.id === note.autorId);
                        return (
                          <div 
                            key={note.id} 
                            className="p-3 rounded-lg border border-notion-border-light dark:border-notion-border-dark bg-[#fbfbfa]/30 dark:bg-[#1e1e1e]/30 space-y-1"
                          >
                            <div className="flex justify-between items-center text-[10px]">
                              <div className="flex items-center gap-1.5">
                                {author && (
                                  <img src={author.avatarUrl} alt={author.nombre} className="w-4 h-4 rounded-full bg-indigo-50 dark:bg-indigo-950" />
                                )}
                                <span className="font-semibold text-notion-text-light dark:text-notion-text-dark">{author ? author.nombre : 'Sistema'}</span>
                              </div>
                              <span className="text-notion-text-muted-light dark:text-notion-text-muted-dark font-mono">
                                {new Date(note.createdAt).toLocaleString('es-MX')}
                              </span>
                            </div>
                            <p className="text-xs text-notion-text-light dark:text-notion-text-dark whitespace-pre-wrap leading-relaxed">
                              {note.contenido}
                            </p>
                          </div>
                        );
                      })
                    )}
                  </div>

                  <form onSubmit={handleNoteSubmit} className="space-y-2">
                    <textarea
                      rows="2"
                      placeholder={`Escribir nota de seguimiento como ${currentUser.nombre}...`}
                      value={newNote}
                      onChange={(e) => setNewNote(e.target.value)}
                      className="w-full text-xs p-2 rounded-lg border border-notion-border-light dark:border-notion-border-dark bg-notion-bg-light dark:bg-notion-bg-dark text-notion-text-light dark:text-notion-text-dark focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    />
                    <div className="flex justify-end">
                      <button
                        type="submit"
                        disabled={!newNote.trim()}
                        className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white text-xs font-semibold shadow-sm transition-all"
                      >
                        Añadir Nota Rápida
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* TAB: TAREAS */}
              {activeSubTab === 'tasks' && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    {clientTasks.length === 0 ? (
                      <p className="text-xs text-notion-text-muted-light dark:text-notion-text-muted-dark text-center py-6">Sin pendientes asociados.</p>
                    ) : (
                      clientTasks.map((task) => {
                        const assignee = INTEGRANTES.find(i => i.id === task.asignadoA);
                        return (
                          <div 
                            key={task.id} 
                            className="flex items-start gap-2.5 p-2.5 border border-notion-border-light dark:border-notion-border-dark rounded-lg bg-[#fbfbfa]/30 dark:bg-[#1e1e1e]/30 hover:bg-notion-border-light/30 dark:hover:bg-notion-border-dark/30 transition-all"
                          >
                            <input 
                              type="checkbox"
                              checked={task.completada}
                              onChange={() => onToggleTask(task.id)}
                              className="mt-0.5 rounded border-notion-border-light dark:border-notion-border-dark text-indigo-600 focus:ring-indigo-500 cursor-pointer h-4 w-4 bg-transparent" 
                            />
                            <div className="flex-1 min-w-0">
                              <p className={`text-xs font-semibold ${task.completada ? 'line-through text-notion-text-muted-light dark:text-notion-text-muted-dark' : 'text-notion-text-light dark:text-notion-text-dark'}`}>
                                {task.titulo}
                              </p>
                              <div className="flex items-center justify-between mt-1 text-[9px] text-notion-text-muted-light dark:text-notion-text-muted-dark">
                                <span>Asignado: {assignee ? assignee.nombre : 'Sin asignar'}</span>
                                {task.fechaLimite && <span>Vence: {task.fechaLimite} {task.horaLimite ? `@ ${task.horaLimite}` : ''}</span>}
                              </div>
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>

                  <form onSubmit={handleTaskSubmit} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Crear tarea relacionada..."
                      value={newTaskTitle}
                      onChange={(e) => setNewTaskTitle(e.target.value)}
                      className="flex-1 text-xs px-3 py-2 rounded-lg border border-notion-border-light dark:border-notion-border-dark bg-notion-bg-light dark:bg-notion-bg-dark text-notion-text-light dark:text-notion-text-dark focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    />
                    <button
                      type="submit"
                      disabled={!newTaskTitle.trim()}
                      className="px-3.5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white transition-all shadow-sm flex items-center justify-center font-bold text-xs"
                    >
                      <Plus size={14} />
                    </button>
                  </form>
                </div>
              )}

              {/* TAB: PROPIEDADES CUSTOM */}
              {activeSubTab === 'fields' && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    {(client.camposPersonalizados || []).length === 0 ? (
                      <p className="text-xs text-notion-text-muted-light dark:text-notion-text-muted-dark text-center py-6">Sin propiedades adicionales creadas.</p>
                    ) : (
                      (client.camposPersonalizados || []).map((field, idx) => (
                        <div key={idx} className="flex items-center gap-2 p-2 rounded-lg border border-notion-border-light dark:border-notion-border-dark bg-[#fbfbfa]/30 dark:bg-[#1e1e1e]/30">
                          <input
                            type="text"
                            value={field.clave}
                            onChange={(e) => handleCustomFieldChange(idx, e.target.value, field.valor)}
                            placeholder="Nombre campo"
                            className="w-1/3 bg-transparent text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-indigo-500/30 rounded px-1.5 py-0.5 border-none text-notion-text-light dark:text-notion-text-dark"
                          />
                          <span className="text-notion-text-muted-light dark:text-notion-text-muted-dark font-mono">:</span>
                          <input
                            type="text"
                            value={field.valor}
                            onChange={(e) => handleCustomFieldChange(idx, field.clave, e.target.value)}
                            placeholder="Valor"
                            className="flex-1 bg-transparent text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500/30 rounded px-1.5 py-0.5 border-none text-notion-text-light dark:text-notion-text-dark"
                          />
                          <button
                            type="button"
                            onClick={() => handleRemoveCustomField(idx)}
                            className="p-1 rounded text-notion-text-muted-light dark:text-notion-text-muted-dark hover:text-rose-500"
                          >
                            <Trash2 size={12} />
                          </button>
                        </div>
                      ))
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={handleAddCustomField}
                    className="w-full flex items-center justify-center gap-1.5 py-2 border border-dashed border-notion-border-light dark:border-notion-border-dark hover:border-indigo-500/50 rounded-lg text-[11px] font-bold text-notion-text-muted-light dark:text-notion-text-muted-dark hover:text-indigo-500 bg-transparent transition-all"
                  >
                    <FolderPlus size={14} />
                    <span>+ Agregar Propiedad Customizada</span>
                  </button>
                </div>
              )}

              {/* TAB: HISTORIAL ACTIVIDAD */}
              {activeSubTab === 'activity' && (
                <div className="space-y-3">
                  {clientActivities.length === 0 ? (
                    <p className="text-xs text-notion-text-muted-light dark:text-notion-text-muted-dark text-center py-6">Sin registros de actividad.</p>
                  ) : (
                    clientActivities.map((act) => {
                      const user = INTEGRANTES.find(i => i.id === act.autorId);
                      return (
                        <div key={act.id} className="flex items-start gap-2.5 p-2 border-b border-notion-border-light/40 dark:border-notion-border-dark/40 pb-2">
                          {user && (
                            <img src={user.avatarUrl} alt={user.nombre} className="w-5 h-5 rounded-full bg-indigo-50 dark:bg-indigo-950 mt-0.5" />
                          )}
                          <div className="flex-1 min-w-0">
                            <span className="font-semibold text-notion-text-light dark:text-notion-text-dark">{user ? user.nombre : 'Sistema'}</span>
                            <span className="text-notion-text-muted-light dark:text-notion-text-muted-dark mx-1.5">{act.accion}</span>
                            <div className="text-[9px] text-notion-text-muted-light dark:text-notion-text-muted-dark mt-0.5 font-mono">
                              {new Date(act.createdAt).toLocaleString('es-MX')}
                            </div>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              )}

            </div>
          </div>

        </div>

        {/* Barra Lateral Derecha de Acciones (Desktop) */}
        <div className="w-full md:w-56 bg-[#fbfbfa] dark:bg-[#1a1a1a] border-t md:border-t-0 md:border-l border-notion-border-light dark:border-notion-border-dark p-6 flex flex-col justify-between space-y-4">
          
          <div className="space-y-4">
            <div className="hidden md:flex justify-between items-center">
              <span className="text-[9px] uppercase font-bold tracking-widest text-indigo-500">Acciones del Lead</span>
              <button 
                onClick={onClose}
                className="p-1 rounded hover:bg-notion-border-light dark:hover:bg-notion-border-dark text-notion-text-muted-light dark:text-notion-text-muted-dark hover:text-notion-text-light dark:hover:text-notion-text-dark"
              >
                <X size={18} />
              </button>
            </div>

            <div className="space-y-2">
              {isEditing ? (
                <>
                  <button
                    onClick={handleSaveEdits}
                    className="w-full py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold transition-all shadow-sm"
                  >
                    Guardar Cambios
                  </button>
                  <button
                    onClick={() => {
                      setIsEditing(false);
                      setTempNombre(client.nombre);
                      setTempEmpresa(client.empresa);
                      setTempCorreo(client.correo);
                      setTempTelefono(client.telefono);
                      setTempValorEstimado(client.valorEstimado);
                    }}
                    className="w-full py-2.5 rounded-lg border border-notion-border-light dark:border-notion-border-dark hover:bg-notion-border-light/20 text-notion-text-light dark:text-notion-text-dark font-semibold transition-all"
                  >
                    Cancelar Edición
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="w-full py-2.5 rounded-lg border border-notion-border-light dark:border-notion-border-dark hover:bg-notion-border-light/20 text-notion-text-light dark:text-notion-text-dark font-bold transition-all flex items-center justify-center gap-2"
                >
                  <Edit3 size={13} />
                  <span>Editar Datos</span>
                </button>
              )}
            </div>

            <div className="space-y-1">
              <span className="text-[9px] uppercase font-bold text-notion-text-muted-light dark:text-notion-text-muted-dark tracking-wider">Accesos Rápidos</span>
              <div className="space-y-1 text-[11px]">
                <button
                  onClick={() => setActiveSubTab('notes')}
                  className="w-full py-2 px-2.5 rounded-lg hover:bg-notion-border-light/40 dark:hover:bg-notion-border-dark/40 text-left text-notion-text-light dark:text-notion-text-dark flex items-center gap-2"
                >
                  <Plus size={12} />
                  <span>Agregar Nota</span>
                </button>
                <button
                  onClick={() => setActiveSubTab('tasks')}
                  className="w-full py-2 px-2.5 rounded-lg hover:bg-notion-border-light/40 dark:hover:bg-notion-border-dark/40 text-left text-notion-text-light dark:text-notion-text-dark flex items-center gap-2"
                >
                  <Plus size={12} />
                  <span>Crear Tarea</span>
                </button>
                <button
                  onClick={() => setActiveSubTab('fields')}
                  className="w-full py-2 px-2.5 rounded-lg hover:bg-notion-border-light/40 dark:hover:bg-notion-border-dark/40 text-left text-notion-text-light dark:text-notion-text-dark flex items-center gap-2"
                >
                  <Plus size={12} />
                  <span>Agregar Campo</span>
                </button>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <button
              onClick={() => {
                if (window.confirm(`¿Estás seguro de eliminar permanentemente al cliente ${client.nombre}?`)) {
                  onDeleteClient(client.id);
                }
              }}
              className="w-full py-2 rounded-lg hover:bg-rose-500/10 text-rose-500 font-bold transition-all border border-transparent hover:border-rose-500/20 text-center"
            >
              Eliminar Cliente
            </button>
            
            <button
              onClick={onClose}
              className="w-full md:hidden py-2 rounded-lg border border-notion-border-light dark:border-notion-border-dark hover:bg-notion-border-light/20 text-notion-text-light dark:text-notion-text-dark font-bold text-center"
            >
              Cerrar
            </button>
          </div>

        </div>

      </div>
    </>
  );
}
