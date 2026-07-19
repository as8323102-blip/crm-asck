import { activeProvider } from './config';
import { localNoteService } from './local/localNoteService';
import { supabaseNoteService } from './supabase/supabaseNoteService';
import { offlineQueue } from './offlineQueue';

export const noteService = {
  async getNotes() {
    if (activeProvider === 'supabase') {
      if (navigator.onLine) {
        try {
          const notes = await supabaseNoteService.getNotes();
          localStorage.setItem('asck_crm_notes', JSON.stringify(notes));
          return notes;
        } catch (err) {
          console.warn("[Sync] Error al leer notas de Supabase, usando local:", err);
        }
      }
    }
    return localNoteService.getNotes();
  },

  async createNote(note) {
    const local = await localNoteService.createNote(note);
    if (activeProvider === 'supabase') {
      if (navigator.onLine) {
        try {
          return await supabaseNoteService.createNote(note);
        } catch (err) {
          console.warn("[Sync] Error guardando nota en Supabase, encolando offline:", err);
          offlineQueue.add('createNote', note);
        }
      } else {
        offlineQueue.add('createNote', note);
      }
    }
    return local;
  }
};
