import React, { useState, useEffect } from 'react';
import { INTEGRANTES } from '../mockData';
import {
  Clock,
  Users,
  Plus,
  ChevronRight,
  ChevronLeft,
  X,
  PlusCircle
} from 'lucide-react';

export default function CalendarAgenda({ 
  clients = [], 
  tasks = [], 
  agendaEvents = [],
  currentUser,
  onAddAgendaEvent,
  onClientClick 
}) {
  const [currentView, setCurrentView] = useState('week'); // 'month' | 'week' | 'day'
  const [anchorDate, setAnchorDate] = useState(new Date()); // Fecha de anclaje activa
  const [filterOwner, setFilterOwner] = useState(currentUser ? currentUser.id : 'Todos');

  // Mantener filterOwner en sincronía con el usuario activo
  useEffect(() => {
    if (currentUser) {
      setFilterOwner(currentUser.id);
      setEvtResponsableId(currentUser.id);
    }
  }, [currentUser]);

  // Control de Modales
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null); // Para ver/editar detalles

  // Campos del Formulario de Evento
  const [evtTitulo, setEvtTitulo] = useState('');
  const [evtTipo, setEvtTipo] = useState('Reunión'); // 'Tarea' | 'Seguimiento' | 'Cierre esperado' | 'Reunión'
  const [evtClienteId, setEvtClienteId] = useState('');
  const [evtResponsableId, setEvtResponsableId] = useState(currentUser ? currentUser.id : INTEGRANTES[0].id);
  const [evtFecha, setEvtFecha] = useState('');
  const [evtHoraInicio, setEvtHoraInicio] = useState('');
  const [evtHoraFin, setEvtHoraFin] = useState('');
  const [evtNotas, setEvtNotas] = useState('');

  // Unificar eventos de agenda, tareas y seguimientos comerciales
  const rawEvents = [];

  agendaEvents.forEach(ev => {
    rawEvents.push({
      id: ev.id,
      titulo: ev.titulo,
      tipo: ev.tipo, // 'Tarea' | 'Seguimiento' | 'Cierre esperado' | 'Reunión'
      clienteId: ev.clienteId,
      responsableId: ev.responsableId,
      fecha: ev.fecha,
      horaInicio: ev.horaInicio || '09:00',
      horaFin: ev.horaFin || '',
      prioridad: ev.prioridad || 'Media',
      estado: ev.estado || 'Pendiente',
      notas: ev.notas || '',
      source: 'agenda'
    });
  });

  tasks.forEach(task => {
    if (task.fechaLimite) {
      rawEvents.push({
        id: task.id,
        titulo: task.titulo,
        tipo: 'Tarea',
        clienteId: task.clienteId,
        responsableId: task.asignadoA,
        fecha: task.fechaLimite,
        horaInicio: task.horaLimite || '12:00',
        horaFin: '',
        prioridad: task.prioridad || 'Media',
        estado: task.completada ? 'Completada' : 'Pendiente',
        notas: 'Tarea importada del gestor TÚDU',
        source: 'task'
      });
    }
  });

  clients.forEach(client => {
    if (client.fechaSeguimiento) {
      rawEvents.push({
        id: `seg-${client.id}`,
        titulo: client.proximaAccion || `Seguimiento con ${client.nombre}`,
        tipo: 'Seguimiento',
        clienteId: client.id,
        responsableId: client.responsableId,
        fecha: client.fechaSeguimiento,
        horaInicio: '09:00',
        horaFin: '',
        prioridad: client.prioridad || 'Media',
        estado: client.estado === 'Cerrado' ? 'Completada' : 'Pendiente',
        notas: `Seguimiento automático comercial`,
        source: 'client_followup'
      });
    }
  });

  // Filtrar eventos por el responsable seleccionado
  const allEvents = rawEvents.filter(ev => {
    return filterOwner === 'Todos' || ev.responsableId === filterOwner;
  });

  // Utilidades de Fechas y Navegación
  const formatDateString = (d) => d.toISOString().split('T')[0];

  const shiftDate = (direction) => {
    const newDate = new Date(anchorDate);
    if (currentView === 'day') {
      newDate.setDate(anchorDate.getDate() + (direction === 'next' ? 1 : -1));
    } else if (currentView === 'week') {
      newDate.setDate(anchorDate.getDate() + (direction === 'next' ? 7 : -7));
    } else if (currentView === 'month') {
      newDate.setMonth(anchorDate.getMonth() + (direction === 'next' ? 1 : -1));
    }
    setAnchorDate(newDate);
  };

  const getWeekDays = () => {
    const startOfWeek = new Date(anchorDate);
    const day = startOfWeek.getDay();
    const diff = startOfWeek.getDate() - day + (day === 0 ? -6 : 1); // lunes inicio
    startOfWeek.setDate(diff);
    
    const days = [];
    for (let i = 0; i < 7; i++) {
      const nextD = new Date(startOfWeek);
      nextD.setDate(startOfWeek.getDate() + i);
      days.push(nextD);
    }
    return days;
  };

  const getMonthDays = () => {
    const year = anchorDate.getFullYear();
    const month = anchorDate.getMonth();
    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);

    const days = [];
    // Días de relleno antes de inicio de mes (Lunes = 1)
    let startOffset = firstDayOfMonth.getDay();
    startOffset = startOffset === 0 ? 6 : startOffset - 1; // ajustar lunes inicio
    
    for (let i = startOffset; i > 0; i--) {
      const prevD = new Date(year, month, 1 - i);
      days.push({ date: prevD, isCurrentMonth: false });
    }

    // Días del mes actual
    for (let i = 1; i <= lastDayOfMonth.getDate(); i++) {
      days.push({ date: new Date(year, month, i), isCurrentMonth: true });
    }

    return days;
  };

  // Horas del día para las vistas
  const hoursOfDay = [
    '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', 
    '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00'
  ];

  const getColorClass = (type) => {
    switch (type) {
      case 'Tarea': return 'bg-amber-500/10 text-amber-500 border border-amber-500/20';
      case 'Seguimiento': return 'bg-blue-500/10 text-blue-500 border border-blue-500/20';
      case 'Cierre esperado': return 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20';
      case 'Reunión': return 'bg-purple-500/10 text-purple-500 border border-purple-500/20';
      default: return 'bg-zinc-500/10 text-zinc-500 border border-zinc-500/20';
    }
  };

  // Abrir formulario prellenando celda
  const handleOpenTimeCell = (dateStr, hour) => {
    setEvtFecha(dateStr);
    setEvtHoraInicio(hour);
    setEvtHoraFin(hoursOfDay[hoursOfDay.indexOf(hour) + 1] || '');
    setEvtTitulo('');
    setEvtNotas('');
    setModalOpen(true);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!evtTitulo.trim() || !evtFecha || !evtHoraInicio) return;

    onAddAgendaEvent({
      id: `ag-${Date.now()}`,
      titulo: evtTitulo,
      tipo: evtTipo,
      clienteId: evtClienteId || null,
      responsableId: evtResponsableId,
      fecha: evtFecha,
      horaInicio: evtHoraInicio,
      horaFin: evtHoraFin || null,
      prioridad: 'Media',
      estado: 'Pendiente',
      notas: evtNotas
    });

    setModalOpen(false);
  };

  return (
    <div className="space-y-4 text-xs">
      <div className="flex flex-col md:flex-row gap-4 justify-between items-stretch md:items-center p-4 rounded-xl border border-notion-border-light dark:border-notion-border-dark bg-notion-card-light dark:bg-notion-card-dark notion-shadow">
        
        {/* Navegación de Fechas */}
        <div className="flex items-center justify-between md:justify-start gap-2.5 w-full md:w-auto">
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setAnchorDate(new Date())}
              className="px-3 py-1.5 border border-notion-border-light dark:border-notion-border-dark hover:bg-notion-border-light/20 text-notion-text-light dark:text-notion-text-dark font-bold rounded-lg transition-all"
            >
              Hoy
            </button>
            
            <div className="flex items-center border border-notion-border-light dark:border-notion-border-dark rounded-lg overflow-hidden bg-notion-bg-light dark:bg-notion-bg-dark">
              <button onClick={() => shiftDate('prev')} className="p-1.5 hover:bg-notion-border-light/45 dark:hover:bg-notion-border-dark/45 text-notion-text-light dark:text-notion-text-dark">
                <ChevronLeft size={14} />
              </button>
              <button onClick={() => shiftDate('next')} className="p-1.5 hover:bg-notion-border-light/45 dark:hover:bg-notion-border-dark/45 text-notion-text-light dark:text-notion-text-dark">
                <ChevronRight size={14} />
              </button>
            </div>
          </div>

          <h3 className="font-extrabold text-sm sm:text-base text-notion-text-light dark:text-notion-text-dark pl-1 capitalize truncate">
            {anchorDate.toLocaleDateString('es-MX', { month: 'long', year: 'numeric' })}
          </h3>
        </div>

        {/* selectores de vista */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full md:w-auto">
          {/* Selector de Integrante para Calendario */}
          <div className="flex items-center gap-1.5 border border-notion-border-light dark:border-notion-border-dark bg-notion-bg-light dark:bg-notion-bg-dark px-2.5 py-1.5 rounded-lg justify-between w-full sm:w-auto">
            <div className="flex items-center gap-1.5 w-full">
              <Users size={13} className="text-indigo-500 flex-shrink-0" />
              <select
                value={filterOwner}
                onChange={(e) => setFilterOwner(e.target.value)}
                className="bg-transparent text-[11px] text-notion-text-light dark:text-notion-text-dark font-bold focus:outline-none cursor-pointer w-full"
              >
                <option value="Todos">Calendario: Todos</option>
                {INTEGRANTES.map(user => (
                  <option key={user.id} value={user.id}>
                    {user.nombre}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex border border-notion-border-light dark:border-notion-border-dark rounded-lg overflow-hidden bg-notion-bg-light dark:bg-notion-bg-dark font-bold text-[10px] w-full sm:w-auto">
            <button 
              onClick={() => setCurrentView('day')} 
              className={`flex-1 sm:flex-none text-center px-3 py-1.5 ${currentView === 'day' ? 'bg-indigo-600 text-white' : 'text-notion-text-muted-light dark:text-notion-text-muted-dark hover:bg-notion-border-light/10'}`}
            >
              Día
            </button>
            <button 
              onClick={() => setCurrentView('week')} 
              className={`flex-1 sm:flex-none text-center px-3 py-1.5 border-x border-notion-border-light dark:border-notion-border-dark ${currentView === 'week' ? 'bg-indigo-600 text-white' : 'text-notion-text-muted-light dark:text-notion-text-muted-dark hover:bg-notion-border-light/10'}`}
            >
              Semana
            </button>
            <button 
              onClick={() => setCurrentView('month')} 
              className={`flex-1 sm:flex-none text-center px-3 py-1.5 ${currentView === 'month' ? 'bg-indigo-600 text-white' : 'text-notion-text-muted-light dark:text-notion-text-muted-dark hover:bg-notion-border-light/10'}`}
            >
              Mes
            </button>
          </div>

          <button
            onClick={() => setModalOpen(true)}
            className="flex items-center justify-center gap-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg shadow-sm transition-all w-full sm:w-auto"
          >
            <Plus size={14} className="flex-shrink-0" />
            <span>Agendar Evento</span>
          </button>
        </div>

      </div>

      {/* VISTA 1: MENSUAL */}
      {currentView === 'month' && (
        <div className="border border-notion-border-light dark:border-notion-border-dark bg-notion-card-light dark:bg-notion-card-dark rounded-xl overflow-hidden notion-shadow">
          {/* Días de la semana header */}
          <div className="grid grid-cols-7 border-b border-notion-border-light dark:border-notion-border-dark text-center font-bold text-[10px] text-notion-text-muted-light dark:text-notion-text-muted-dark bg-notion-bg-light/50 dark:bg-notion-bg-dark/50 py-2">
            <div>Lun</div><div>Mar</div><div>Mié</div><div>Jue</div><div>Vie</div><div>Sáb</div><div>Dom</div>
          </div>
          
          {/* Cuadrícula de días */}
          <div className="grid grid-cols-7 divide-x divide-y divide-notion-border-light dark:divide-notion-border-dark">
            {getMonthDays().map((dayCell, idx) => {
              const dateStr = formatDateString(dayCell.date);
              const dayEvents = allEvents.filter(ev => ev.fecha === dateStr);

              return (
                <div 
                  key={idx} 
                  onClick={() => {
                    setAnchorDate(dayCell.date);
                    setCurrentView('day');
                  }}
                  className={`min-h-[90px] p-2 hover:bg-notion-border-light/10 dark:hover:bg-notion-border-dark/10 cursor-pointer space-y-1.5 transition-colors ${
                    dayCell.isCurrentMonth ? '' : 'opacity-40 bg-notion-bg-light/10 dark:bg-notion-bg-dark/10'
                  }`}
                >
                  <span className="font-bold text-[10px] text-notion-text-light dark:text-notion-text-dark block">
                    {dayCell.date.getDate()}
                  </span>
                  
                  {/* Lista de mini-eventos */}
                  <div className="space-y-0.5 max-h-[60px] overflow-hidden">
                    {dayEvents.slice(0, 3).map(ev => (
                      <div 
                        key={ev.id}
                        className={`px-1.5 py-0.5 rounded-[3px] text-[8px] font-bold truncate leading-snug ${getColorClass(ev.tipo)}`}
                      >
                        {ev.horaInicio} {ev.titulo}
                      </div>
                    ))}
                    {dayEvents.length > 3 && (
                      <span className="text-[8px] text-indigo-500 font-bold block text-right">+{dayEvents.length - 3} más</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* VISTA 2: SEMANAL (Grid de Horarios) */}
      {currentView === 'week' && (
        <div className="border border-notion-border-light dark:border-notion-border-dark bg-notion-card-light dark:bg-notion-card-dark rounded-xl overflow-hidden notion-shadow">
          <div className="overflow-x-auto">
            <div className="min-w-[650px]">
              
              {/* Header de la semana */}
              <div className="grid grid-cols-8 border-b border-notion-border-light dark:border-notion-border-dark bg-notion-bg-light/50 dark:bg-notion-bg-dark/50 py-2 divide-x divide-notion-border-light dark:divide-notion-border-dark text-center font-bold">
                <div className="text-[10px] text-notion-text-muted-light dark:text-notion-text-muted-dark">Hora</div>
                {getWeekDays().map((day, i) => {
                  const isToday = formatDateString(day) === formatDateString(new Date());
                  return (
                    <div key={i} className={`text-[10px] ${isToday ? 'text-indigo-500 font-extrabold' : 'text-notion-text-light dark:text-notion-text-dark'}`}>
                      <div className="capitalize">{day.toLocaleDateString('es-MX', { weekday: 'short' })}</div>
                      <div className={`mt-0.5 inline-block px-1.5 py-0.2 rounded-full ${isToday ? 'bg-indigo-500 text-white font-bold' : ''}`}>
                        {day.getDate()}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Grid de horarios por Hora */}
              <div className="divide-y divide-notion-border-light dark:divide-notion-border-dark">
                {hoursOfDay.map((hour) => {
                  const weekDays = getWeekDays();

                  return (
                    <div key={hour} className="grid grid-cols-8 divide-x divide-notion-border-light dark:divide-notion-border-dark hover:bg-notion-border-light/5 dark:hover:bg-notion-border-dark/5 transition-colors">
                      
                      {/* Celda Hora */}
                      <div className="py-2.5 text-center text-[10px] font-mono text-notion-text-muted-light dark:text-notion-text-muted-dark font-semibold self-center">
                        {hour}
                      </div>

                      {/* Celdas de los Días */}
                      {weekDays.map((day) => {
                        const dateStr = formatDateString(day);
                        const cellEvents = allEvents.filter(ev => ev.fecha === dateStr && ev.horaInicio.startsWith(hour.split(':')[0]));

                        return (
                          <div 
                            key={dateStr}
                            onClick={() => handleOpenTimeCell(dateStr, hour)}
                            className="p-1 min-h-[44px] cursor-pointer space-y-1 relative"
                          >
                            {cellEvents.map(ev => (
                              <div
                                key={ev.id}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectedEvent(ev);
                                }}
                                className={`p-1.5 rounded-lg text-[9px] font-bold block leading-relaxed shadow-sm hover:shadow transition-shadow truncate ${getColorClass(ev.tipo)}`}
                              >
                                <span>{ev.titulo}</span>
                                {ev.horaFin && <span className="block text-[8px] opacity-75 font-mono">{ev.horaInicio} - {ev.horaFin}</span>}
                              </div>
                            ))}
                          </div>
                        );
                      })}

                    </div>
                  );
                })}
              </div>

            </div>
          </div>
        </div>
      )}

      {/* VISTA 3: DIARIA (Timeline de Horarios) */}
      {currentView === 'day' && (
        <div className="border border-notion-border-light dark:border-notion-border-dark bg-notion-card-light dark:bg-notion-card-dark rounded-xl overflow-hidden notion-shadow max-w-2xl mx-auto">
          {/* Header del día */}
          <div className="p-4 border-b border-notion-border-light dark:border-notion-border-dark bg-notion-bg-light/30 dark:bg-notion-bg-dark/30 flex justify-between items-center">
            <h3 className="font-extrabold text-sm text-notion-text-light dark:text-notion-text-dark capitalize">
              {anchorDate.toLocaleDateString('es-MX', { weekday: 'long', day: 'numeric', month: 'long' })}
            </h3>
            <span className="text-[10px] text-notion-text-muted-light dark:text-notion-text-muted-dark font-mono">{formatDateString(anchorDate)}</span>
          </div>

          {/* Grid Horario de un Día */}
          <div className="divide-y divide-notion-border-light dark:divide-notion-border-dark">
            {hoursOfDay.map((hour) => {
              const dateStr = formatDateString(anchorDate);
              const dayEvents = allEvents.filter(ev => ev.fecha === dateStr && ev.horaInicio.startsWith(hour.split(':')[0]));

              return (
                <div key={hour} className="flex divide-x divide-notion-border-light dark:divide-notion-border-dark hover:bg-notion-border-light/5 dark:hover:bg-notion-border-dark/5 transition-colors">
                  
                  {/* Celda Hora */}
                  <div className="w-16 py-3 text-center text-[10px] font-mono text-notion-text-muted-light dark:text-notion-text-muted-dark font-bold self-center">
                    {hour}
                  </div>

                  {/* Celda Evento/Click */}
                  <div 
                    onClick={() => handleOpenTimeCell(dateStr, hour)}
                    className="flex-1 p-1.5 min-h-[48px] cursor-pointer space-y-1 relative"
                  >
                    {dayEvents.length === 0 ? (
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 opacity-0 hover:opacity-100 text-[9px] font-bold text-indigo-500 flex items-center gap-1">
                        <PlusCircle size={12} /> + Reservar Slot
                      </span>
                    ) : (
                      dayEvents.map(ev => (
                        <div
                          key={ev.id}
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedEvent(ev);
                          }}
                          className={`p-2 rounded-xl text-[10px] font-bold leading-relaxed flex items-center justify-between shadow-sm hover:shadow transition-shadow ${getColorClass(ev.tipo)}`}
                        >
                          <div className="min-w-0">
                            <span className="block font-bold truncate">{ev.titulo}</span>
                            {ev.notas && <span className="block text-[8px] opacity-75 font-normal truncate">{ev.notas}</span>}
                          </div>
                          <span className="font-mono text-[9px] font-bold flex-shrink-0 bg-indigo-500/5 px-2 py-0.5 rounded">
                            {ev.horaInicio} {ev.horaFin ? `- ${ev.horaFin}` : ''}
                          </span>
                        </div>
                      ))
                    )}
                  </div>

                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* MODAL: REGISTRAR EVENTO / SLOTS */}
      {modalOpen && (
        <>
          <div className="fixed inset-0 bg-black/55 backdrop-blur-sm z-[100]" onClick={() => setModalOpen(false)} />
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-md w-[92%] bg-notion-card-light dark:bg-notion-card-dark border border-notion-border-light dark:border-notion-border-dark rounded-xl shadow-2xl z-[101] p-5 space-y-4">
            <div className="flex justify-between items-center pb-2.5 border-b border-notion-border-light dark:border-notion-border-dark">
              <h3 className="font-bold text-sm text-notion-text-light dark:text-notion-text-dark">Agendar Nuevo Evento</h3>
              <button onClick={() => setModalOpen(false)} className="p-1 rounded text-notion-text-muted-light dark:text-notion-text-muted-dark hover:text-notion-text-light dark:hover:text-notion-text-dark">
                <X size={15} />
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-semibold text-notion-text-muted-light dark:text-notion-text-muted-dark">Título del Evento *</label>
                <input
                  type="text"
                  required
                  placeholder="Ej. Reunión de presupuesto o Demo de software"
                  value={evtTitulo}
                  onChange={(e) => setEvtTitulo(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-notion-border-light dark:border-notion-border-dark bg-notion-bg-light dark:bg-notion-bg-dark text-notion-text-light dark:text-notion-text-dark focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-notion-text-muted-light dark:text-notion-text-muted-dark">Tipo de Evento</label>
                  <select
                    value={evtTipo}
                    onChange={(e) => setEvtTipo(e.target.value)}
                    className="w-full px-2 py-1.5 rounded border border-notion-border-light dark:border-notion-border-dark bg-notion-bg-light dark:bg-notion-bg-dark text-notion-text-light dark:text-notion-text-dark focus:outline-none"
                  >
                    <option value="Reunión">📹 Reunión / Llamada</option>
                    <option value="Seguimiento">📞 Seguimiento comercial</option>
                    <option value="Tarea">📝 Tarea técnica</option>
                    <option value="Cierre esperado">🤝 Cierre esperado</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-notion-text-muted-light dark:text-notion-text-muted-dark">Responsable</label>
                  <select
                    value={evtResponsableId}
                    onChange={(e) => setEvtResponsableId(e.target.value)}
                    className="w-full px-2 py-1.5 rounded border border-notion-border-light dark:border-notion-border-dark bg-notion-bg-light dark:bg-notion-bg-dark text-notion-text-light dark:text-notion-text-dark focus:outline-none"
                  >
                    {INTEGRANTES.map(user => (
                      <option key={user.id} value={user.id}>{user.nombre}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div className="space-y-1">
                  <label className="font-semibold text-notion-text-muted-light dark:text-notion-text-muted-dark">Fecha *</label>
                  <input
                    type="date"
                    required
                    value={evtFecha}
                    onChange={(e) => setEvtFecha(e.target.value)}
                    className="w-full px-2 py-1 rounded border border-notion-border-light dark:border-notion-border-dark bg-notion-bg-light dark:bg-notion-bg-dark text-notion-text-light dark:text-notion-text-dark focus:outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-semibold text-notion-text-muted-light dark:text-notion-text-muted-dark">Inicio *</label>
                  <input
                    type="time"
                    required
                    value={evtHoraInicio}
                    onChange={(e) => setEvtHoraInicio(e.target.value)}
                    className="w-full px-2 py-1 rounded border border-notion-border-light dark:border-notion-border-dark bg-notion-bg-light dark:bg-notion-bg-dark text-notion-text-light dark:text-notion-text-dark focus:outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-semibold text-notion-text-muted-light dark:text-notion-text-muted-dark">Fin</label>
                  <input
                    type="time"
                    value={evtHoraFin}
                    onChange={(e) => setEvtHoraFin(e.target.value)}
                    className="w-full px-2 py-1 rounded border border-notion-border-light dark:border-notion-border-dark bg-notion-bg-light dark:bg-notion-bg-dark text-notion-text-light dark:text-notion-text-dark focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-notion-text-muted-light dark:text-notion-text-muted-dark">Cliente relacionado</label>
                <select
                  value={evtClienteId}
                  onChange={(e) => setEvtClienteId(e.target.value)}
                  className="w-full px-2 py-1.5 rounded border border-notion-border-light dark:border-notion-border-dark bg-notion-bg-light dark:bg-notion-bg-dark text-notion-text-light dark:text-notion-text-dark focus:outline-none"
                >
                  <option value="">Ninguno</option>
                  {clients.map(c => (
                    <option key={c.id} value={c.id}>{c.nombre} ({c.empresa})</option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-notion-text-muted-light dark:text-notion-text-muted-dark">Notas / Agenda</label>
                <textarea
                  rows="2"
                  placeholder="Detalles complementarios del evento..."
                  value={evtNotas}
                  onChange={(e) => setEvtNotas(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-notion-border-light dark:border-notion-border-dark bg-notion-bg-light dark:bg-notion-bg-dark text-notion-text-light dark:text-notion-text-dark focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-notion-border-light dark:border-notion-border-dark">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-3 py-1.5 border border-notion-border-light dark:border-notion-border-dark text-notion-text-muted-light dark:text-notion-text-muted-dark hover:bg-notion-border-light/20 rounded-lg font-semibold"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-bold shadow"
                >
                  Agendar
                </button>
              </div>
            </form>
          </div>
        </>
      )}

      {/* MODAL: DETALLES DE UN EVENTO SELECCIONADO */}
      {selectedEvent && (
        <>
          <div className="fixed inset-0 bg-black/55 backdrop-blur-sm z-[100]" onClick={() => setSelectedEvent(null)} />
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-md w-[92%] bg-notion-card-light dark:bg-notion-card-dark border border-notion-border-light dark:border-notion-border-dark rounded-xl shadow-2xl z-[101] p-5 space-y-4 text-xs">
            
            <div className="flex justify-between items-center pb-2 border-b border-notion-border-light dark:border-notion-border-dark">
              <span className={`text-[8px] font-extrabold uppercase px-1.5 py-0.2 rounded border ${getColorClass(selectedEvent.tipo)}`}>
                {selectedEvent.tipo}
              </span>
              <button onClick={() => setSelectedEvent(null)} className="p-1 rounded text-notion-text-muted-light dark:text-notion-text-muted-dark hover:text-notion-text-light dark:hover:text-notion-text-dark">
                <X size={15} />
              </button>
            </div>

            <div className="space-y-3.5">
              <div>
                <h3 className="font-bold text-sm text-notion-text-light dark:text-notion-text-dark leading-snug">{selectedEvent.titulo}</h3>
                <span className="text-[10px] text-notion-text-muted-light dark:text-notion-text-muted-dark font-mono flex items-center gap-1 mt-1">
                  <Clock size={11} /> {selectedEvent.fecha} @ {selectedEvent.horaInicio} {selectedEvent.horaFin ? `- ${selectedEvent.horaFin}` : ''}
                </span>
              </div>

              {selectedEvent.notas && (
                <div className="p-3 rounded-lg border border-notion-border-light dark:border-notion-border-dark bg-notion-bg-light dark:bg-notion-bg-dark text-notion-text-light dark:text-notion-text-dark leading-relaxed font-mono">
                  {selectedEvent.notas}
                </div>
              )}

              {/* Cliente y Responsable */}
              <div className="grid grid-cols-2 gap-3 text-[10px]">
                {selectedEvent.clienteId && (
                  <div className="space-y-1">
                    <span className="font-semibold text-notion-text-muted-light dark:text-notion-text-muted-dark block">Cliente Relacionado</span>
                    {clients.find(c => c.id === selectedEvent.clienteId) && (
                      <button
                        onClick={() => {
                          setSelectedEvent(null);
                          onClientClick(clients.find(c => c.id === selectedEvent.clienteId));
                        }}
                        className="px-2.5 py-1 border border-notion-border-light dark:border-notion-border-dark rounded-lg font-bold text-indigo-500 text-left hover:border-indigo-500/20"
                      >
                        {clients.find(c => c.id === selectedEvent.clienteId).nombre}
                      </button>
                    )}
                  </div>
                )}

                <div className="space-y-1">
                  <span className="font-semibold text-notion-text-muted-light dark:text-notion-text-muted-dark block">Responsable Asignado</span>
                  {INTEGRANTES.find(i => i.id === selectedEvent.responsableId) && (
                    <div className="flex items-center gap-1.5 font-bold text-notion-text-light dark:text-notion-text-dark pt-1">
                      <img src={INTEGRANTES.find(i => i.id === selectedEvent.responsableId).avatarUrl} alt="avatar" className="w-5.5 h-5.5 rounded-full bg-indigo-50 dark:bg-indigo-950" />
                      <span>{INTEGRANTES.find(i => i.id === selectedEvent.responsableId).nombre}</span>
                    </div>
                  )}
                </div>
              </div>

            </div>

            <div className="flex justify-end pt-3 border-t border-notion-border-light dark:border-notion-border-dark">
              <button
                onClick={() => setSelectedEvent(null)}
                className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-bold shadow"
              >
                Entendido
              </button>
            </div>

          </div>
        </>
      )}

    </div>
  );
}
