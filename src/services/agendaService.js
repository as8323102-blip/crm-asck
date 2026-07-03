import { activeProvider } from './config';
import { localCalendarService } from './local/localCalendarService';
import { supabaseCalendarService } from './supabase/supabaseCalendarService';

export const agendaService = {
  async getEvents() {
    return activeProvider === 'supabase'
      ? supabaseCalendarService.getEvents()
      : localCalendarService.getEvents();
  },

  async createEvent(event) {
    return activeProvider === 'supabase'
      ? supabaseCalendarService.createEvent(event)
      : localCalendarService.createEvent(event);
  }
};
