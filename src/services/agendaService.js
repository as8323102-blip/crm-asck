import { activeProvider } from './config';
import { localCalendarService } from './local/localCalendarService';
import { supabaseCalendarService } from './supabase/supabaseCalendarService';
import { offlineQueue } from './offlineQueue';

export const agendaService = {
  async getEvents() {
    if (activeProvider === 'supabase') {
      if (navigator.onLine) {
        try {
          const events = await supabaseCalendarService.getEvents();
          localStorage.setItem('asck_crm_agenda', JSON.stringify(events));
          return events;
        } catch (err) {
          console.warn("[Sync] Error al leer eventos de Supabase, usando local:", err);
        }
      }
    }
    return localCalendarService.getEvents();
  },

  async createEvent(event) {
    const local = await localCalendarService.createEvent(event);
    if (activeProvider === 'supabase') {
      if (navigator.onLine) {
        try {
          return await supabaseCalendarService.createEvent(event);
        } catch (err) {
          console.warn("[Sync] Error guardando evento en Supabase, encolando offline:", err);
          offlineQueue.add('createEvent', event);
        }
      } else {
        offlineQueue.add('createEvent', event);
      }
    }
    return local;
  }
};
