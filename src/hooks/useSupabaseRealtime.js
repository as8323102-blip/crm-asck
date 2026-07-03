import { useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured } from '../services/supabase/supabaseClient';
import { activeProvider } from '../services/config';
import { mappers } from '../services/supabase/mappers';

export function useSupabaseRealtime({
  setClients,
  setTasks,
  setSprints,
  setAgendaEvents,
  setNotes,
  setActivities
}) {
  const [onlineStatus, setOnlineStatus] = useState(() => {
    return activeProvider === 'supabase' ? 'Sincronizando...' : 'Modo local';
  });

  useEffect(() => {
    if (activeProvider !== 'supabase' || !isSupabaseConfigured || !supabase) {
      setOnlineStatus('Modo local');
      return;
    }

    setOnlineStatus('ASCK Hub Online');

    // Suscripción en Tiempo Real para todas las tablas
    const channel = supabase.channel('schema-db-changes')
      // 1. Clientes
      .on('postgres_changes', { event: '*', schema: 'public', table: 'clientes' }, (payload) => {
        const eventType = payload.eventType;
        if (eventType === 'INSERT') {
          const client = mappers.mapClientFromDb(payload.new);
          setClients(prev => {
            if (prev.some(c => c.id === client.id)) return prev;
            return [client, ...prev];
          });
        } else if (eventType === 'UPDATE') {
          const client = mappers.mapClientFromDb(payload.new);
          setClients(prev => prev.map(c => c.id === client.id ? client : c));
        } else if (eventType === 'DELETE') {
          setClients(prev => prev.filter(c => c.id !== payload.old.id));
        }
      })
      // 2. Tareas
      .on('postgres_changes', { event: '*', schema: 'public', table: 'tareas' }, (payload) => {
        const eventType = payload.eventType;
        if (eventType === 'INSERT') {
          const task = mappers.mapTaskFromDb(payload.new);
          setTasks(prev => {
            if (prev.some(t => t.id === task.id)) return prev;
            return [task, ...prev];
          });
        } else if (eventType === 'UPDATE') {
          const task = mappers.mapTaskFromDb(payload.new);
          setTasks(prev => prev.map(t => t.id === task.id ? task : t));
        } else if (eventType === 'DELETE') {
          setTasks(prev => prev.filter(t => t.id !== payload.old.id));
        }
      })
      // 3. Sprints
      .on('postgres_changes', { event: '*', schema: 'public', table: 'sprints' }, (payload) => {
        const eventType = payload.eventType;
        if (eventType === 'INSERT') {
          const sprint = mappers.mapSprintFromDb(payload.new);
          setSprints(prev => {
            if (prev.some(s => s.id === sprint.id)) return prev;
            return [sprint, ...prev];
          });
        } else if (eventType === 'UPDATE') {
          const sprint = mappers.mapSprintFromDb(payload.new);
          setSprints(prev => prev.map(s => s.id === sprint.id ? sprint : s));
        }
      })
      // 4. Agenda
      .on('postgres_changes', { event: '*', schema: 'public', table: 'agenda_eventos' }, (payload) => {
        const eventType = payload.eventType;
        if (eventType === 'INSERT') {
          const event = mappers.mapCalendarEventFromDb(payload.new);
          setAgendaEvents(prev => {
            if (prev.some(e => e.id === event.id)) return prev;
            return [...prev, event];
          });
        }
      })
      // 5. Notas
      .on('postgres_changes', { event: '*', schema: 'public', table: 'notas_clientes' }, (payload) => {
        const eventType = payload.eventType;
        if (eventType === 'INSERT') {
          const note = mappers.mapNoteFromDb(payload.new);
          setNotes(prev => {
            if (prev.some(n => n.id === note.id)) return prev;
            return [note, ...prev];
          });
        }
      })
      // 6. Actividades
      .on('postgres_changes', { event: '*', schema: 'public', table: 'actividades' }, (payload) => {
        const eventType = payload.eventType;
        if (eventType === 'INSERT') {
          const act = mappers.mapActivityFromDb(payload.new);
          setActivities(prev => {
            if (prev.some(a => a.id === act.id)) return prev;
            return [act, ...prev];
          });
        }
      })
      .subscribe((status) => {
        if (status === 'SUBSCRIBED') {
          setOnlineStatus('ASCK Hub Online');
        } else if (status === 'CLOSED') {
          setOnlineStatus('Error de conexión');
        } else {
          setOnlineStatus('Sincronizando...');
        }
      });

    return () => {
      if (channel) {
        supabase.removeChannel(channel);
      }
    };
  }, [setClients, setTasks, setSprints, setAgendaEvents, setNotes, setActivities]);

  return {
    onlineStatus,
    setOnlineStatus
  };
}
