import { supabase } from './supabaseClient';
import { mappers } from './mappers';

export const supabaseNoteService = {
  async getNotes() {
    if (!supabase) return [];
    const { data, error } = await supabase
      .from('notas_clientes')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return (data || []).map(mappers.mapNoteFromDb);
  },

  async createNote(note) {
    if (!supabase) return note;
    const dbNote = mappers.mapNoteToDb(note);
    const { data, error } = await supabase
      .from('notas_clientes')
      .insert([dbNote])
      .select();

    if (error) throw error;
    return mappers.mapNoteFromDb(data[0]);
  }
};
