import { supabase, isSupabaseConfigured } from '../supabase/supabaseClient';
import { localClientService } from '../local/localClientService';
import { localTaskService } from '../local/localTaskService';
import { localSprintService } from '../local/localSprintService';
import { localCalendarService } from '../local/localCalendarService';
import { localNoteService } from '../local/localNoteService';
import { localActivityService } from '../local/localActivityService';
import { mappers } from '../supabase/mappers';
import { INTEGRANTES } from '../../mockData';

export const localToSupabaseMigration = {
  async previewLocalData() {
    const clients = await localClientService.getClients();
    const tasks = await localTaskService.getTasks();
    const sprints = await localSprintService.getSprints();
    const events = await localCalendarService.getEvents();
    const notes = await localNoteService.getNotes();
    const activities = await localActivityService.getActivities();

    return {
      integrantes: INTEGRANTES.length,
      clientes: clients.length,
      sprints: sprints.length,
      tareas: tasks.length,
      agenda_eventos: events.length,
      notas_clientes: notes.length,
      actividades: activities.length
    };
  },

  async migrateAll() {
    if (!isSupabaseConfigured || !supabase) {
      throw new Error('Supabase no está configurado. No se puede iniciar la migración.');
    }

    const report = {
      integrantes: { success: 0, failed: 0 },
      clientes: { success: 0, failed: 0 },
      sprints: { success: 0, failed: 0 },
      tareas: { success: 0, failed: 0 },
      agenda_eventos: { success: 0, failed: 0 },
      notas_clientes: { success: 0, failed: 0 },
      actividades: { success: 0, failed: 0 }
    };

    // 1. Migrar Integrantes primero
    for (const member of INTEGRANTES) {
      try {
        const { error } = await supabase
          .from('integrantes')
          .upsert({
            id: member.id,
            nombre: member.nombre,
            email: member.email,
            rol: member.rol,
            cargo: member.cargo,
            responsabilidades: member.responsabilidades,
            especialidad: member.especialidad,
            horas_disponibles: member.horasDisponibles || 0,
            avatar_url: member.avatarUrl,
            activo: member.activo !== false
          });
        if (error) throw error;
        report.integrantes.success++;
      } catch (err) {
        console.error('Error migrando integrante:', member.id, err);
        report.integrantes.failed++;
      }
    }

    // 2. Migrar Clientes
    const clients = await localClientService.getClients();
    for (const c of clients) {
      try {
        const dbClient = mappers.mapClientToDb(c);
        const { error } = await supabase
          .from('clientes')
          .upsert(dbClient);
        if (error) throw error;
        report.clientes.success++;
      } catch (err) {
        console.error('Error migrando cliente:', c.id, err);
        report.clientes.failed++;
      }
    }

    // 3. Migrar Sprints
    const sprints = await localSprintService.getSprints();
    for (const s of sprints) {
      try {
        const dbSprint = mappers.mapSprintToDb(s);
        const { error } = await supabase
          .from('sprints')
          .upsert(dbSprint);
        if (error) throw error;
        report.sprints.success++;
      } catch (err) {
        console.error('Error migrando sprint:', s.id, err);
        report.sprints.failed++;
      }
    }

    // 4. Migrar Tareas
    const tasks = await localTaskService.getTasks();
    for (const t of tasks) {
      try {
        const dbTask = mappers.mapTaskToDb(t);
        const { error } = await supabase
          .from('tareas')
          .upsert(dbTask);
        if (error) throw error;
        report.tareas.success++;
      } catch (err) {
        console.error('Error migrando tarea:', t.id, err);
        report.tareas.failed++;
      }
    }

    // 5. Migrar Eventos de Agenda
    const events = await localCalendarService.getEvents();
    for (const e of events) {
      try {
        const dbEvent = mappers.mapCalendarEventToDb(e);
        const { error } = await supabase
          .from('agenda_eventos')
          .upsert(dbEvent);
        if (error) throw error;
        report.agenda_eventos.success++;
      } catch (err) {
        console.error('Error migrando evento:', e.id, err);
        report.agenda_eventos.failed++;
      }
    }

    // 6. Migrar Notas
    const notes = await localNoteService.getNotes();
    for (const n of notes) {
      try {
        const dbNote = mappers.mapNoteToDb(n);
        const { error } = await supabase
          .from('notas_clientes')
          .upsert(dbNote);
        if (error) throw error;
        report.notas_clientes.success++;
      } catch (err) {
        console.error('Error migrando nota:', n.id, err);
        report.notas_clientes.failed++;
      }
    }

    // 7. Migrar Actividades
    const activities = await localActivityService.getActivities();
    for (const a of activities) {
      try {
        const dbActivity = mappers.mapActivityToDb(a);
        const { error } = await supabase
          .from('actividades')
          .upsert(dbActivity);
        if (error) throw error;
        report.actividades.success++;
      } catch (err) {
        console.error('Error migrando actividad:', a.id, err);
        report.actividades.failed++;
      }
    }

    return report;
  }
};
