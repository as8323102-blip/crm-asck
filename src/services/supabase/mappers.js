// Mapeadores para traducir de snake_case (Base de Datos) a camelCase (Frontend) y viceversa

export const mappers = {
  // 1. Clientes
  mapClientFromDb(c) {
    if (!c) return null;
    return {
      id: c.id,
      nombre: c.nombre,
      empresa: c.empresa,
      telefono: c.telefono || '',
      correo: c.correo || '',
      estado: c.estado,
      responsableId: c.responsable_id,
      ultimoContacto: c.ultimo_contacto,
      createdAt: c.created_at,
      valorEstimado: Number(c.valor_estimado) || 0,
      prioridad: c.prioridad || 'Media',
      fechaSeguimiento: c.fecha_seguimiento || '',
      proximaAccion: c.proxima_accion || '',
      camposPersonalizados: typeof c.campos_personalizados === 'string'
        ? JSON.parse(c.campos_personalizados)
        : (c.campos_personalizados || [])
    };
  },

  mapClientToDb(c) {
    if (!c) return null;
    return {
      id: c.id,
      nombre: c.nombre,
      empresa: c.empresa,
      telefono: c.telefono || null,
      correo: c.correo || null,
      estado: c.estado,
      responsable_id: c.responsableId || null,
      ultimo_contacto: c.ultimoContacto || null,
      valor_estimado: c.valorEstimado || 0,
      prioridad: c.prioridad || 'Media',
      fecha_seguimiento: c.fechaSeguimiento || null,
      proxima_accion: c.proximaAccion || null,
      campos_personalizados: c.camposPersonalizados || []
    };
  },

  // 2. Tareas
  mapTaskFromDb(t) {
    if (!t) return null;
    return {
      id: t.id,
      sprintId: t.sprint_id,
      clienteId: t.cliente_id,
      asignadoA: t.asignado_a,
      titulo: t.titulo,
      completada: t.completada,
      estado: t.estado || 'Pendiente',
      prioridad: t.prioridad || 'Media',
      fechaLimite: t.fecha_limite || '',
      horaLimite: t.hora_limite || '12:00',
      duracionEstimada: t.duracion_estimada || '',
      createdAt: t.created_at,
      completedAt: t.completed_at,
      macroarea: t.macroarea || 'General',
      apoyo: t.apoyo || '',
      entregable: t.entregable || '',
      justificacion: t.justificacion || '',
      bloqueo: t.bloqueo || '',
      proximaAccion: t.proxima_accion || '',
      fechaInicio: t.fecha_inicio || '',
      responsableNombre: t.responsable_nombre || 'Sin asignar'
    };
  },

  mapTaskToDb(t) {
    if (!t) return null;
    return {
      id: t.id,
      sprint_id: t.sprintId || null,
      cliente_id: t.clienteId || null,
      asignado_a: t.asignadoA,
      titulo: t.titulo,
      completada: t.completada,
      estado: t.estado || 'Pendiente',
      prioridad: t.prioridad || 'Media',
      fecha_limite: t.fechaLimite || null,
      hora_limite: t.horaLimite || '12:00',
      duracion_estimada: t.duracionEstimada || null,
      completed_at: t.completedAt || null,
      macroarea: t.macroarea || null,
      apoyo: t.apoyo || null,
      entregable: t.entregable || null,
      justificacion: t.justificacion || null,
      bloqueo: t.bloqueo || null,
      proxima_accion: t.proximaAccion || null,
      fecha_inicio: t.fechaInicio || null,
      responsable_nombre: t.responsableNombre || null
    };
  },

  // 3. Sprints
  mapSprintFromDb(s) {
    if (!s) return null;
    return {
      id: s.id,
      nombre: s.nombre,
      fechaInicio: s.fecha_inicio,
      fechaFin: s.fecha_fin,
      objetivo: s.objetivo || '',
      responsableId: s.responsable_id,
      estado: s.estado || 'Planeado',
      createdAt: s.created_at
    };
  },

  mapSprintToDb(s) {
    if (!s) return null;
    return {
      id: s.id,
      nombre: s.nombre,
      fecha_inicio: s.fechaInicio,
      fecha_fin: s.fechaFin,
      objetivo: s.objetivo || null,
      responsable_id: s.responsableId || null,
      estado: s.estado || 'Planeado'
    };
  },

  // 4. Agenda
  mapCalendarEventFromDb(e) {
    if (!e) return null;
    return {
      id: e.id,
      titulo: e.titulo,
      tipo: e.tipo || 'Reunión',
      clienteId: e.cliente_id,
      responsableId: e.responsable_id,
      fecha: e.fecha,
      horaInicio: e.hora_inicio,
      horaFin: e.hora_fin,
      prioridad: e.prioridad || 'Media',
      estado: e.estado || 'Pendiente',
      notas: e.notas || '',
      createdAt: e.created_at
    };
  },

  mapCalendarEventToDb(e) {
    if (!e) return null;
    return {
      id: e.id,
      titulo: e.titulo,
      tipo: e.tipo || 'Reunión',
      cliente_id: e.clienteId || null,
      responsable_id: e.responsableId,
      fecha: e.fecha,
      hora_inicio: e.horaInicio,
      hora_fin: e.horaFin || null,
      prioridad: e.prioridad || 'Media',
      estado: e.estado || 'Pendiente',
      notas: e.notas || null
    };
  },

  // 5. Notas
  mapNoteFromDb(n) {
    if (!n) return null;
    return {
      id: n.id,
      clienteId: n.cliente_id,
      autorId: n.autor_id,
      contenido: n.contenido,
      createdAt: n.created_at
    };
  },

  mapNoteToDb(n) {
    if (!n) return null;
    return {
      id: n.id,
      cliente_id: n.clienteId,
      autor_id: n.autorId,
      contenido: n.contenido
    };
  },

  // 6. Actividades
  mapActivityFromDb(a) {
    if (!a) return null;
    return {
      id: a.id,
      autorId: a.autor_id,
      clienteId: a.cliente_id,
      accion: a.accion,
      createdAt: a.created_at
    };
  },

  mapActivityToDb(a) {
    if (!a) return null;
    return {
      id: a.id,
      autor_id: a.autorId || null,
      cliente_id: a.clienteId || null,
      accion: a.accion
    };
  }
};
