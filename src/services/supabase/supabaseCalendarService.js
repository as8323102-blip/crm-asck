import { supabase } from './supabaseClient';
import { mappers } from './mappers';

export const supabaseCalendarService = {
  async getEvents() {
    if (!supabase) return [];
    const { data, error } = await supabase
      .from('agenda_eventos')
      .select('*')
      .order('fecha', { ascending: true });

    if (error) throw error;
    return (data || []).map(mappers.mapCalendarEventFromDb);
  },

  async createEvent(event) {
    if (!supabase) return event;
    const dbEvent = mappers.mapCalendarEventToDb(event);
    const { data, error } = await supabase
      .from('agenda_eventos')
      .insert([dbEvent])
      .select();

    if (error) throw error;
    return mappers.mapCalendarEventFromDb(data[0]);
  }
};
