import { activeProvider } from './config';
import { localNoteService } from './local/localNoteService';
import { supabaseNoteService } from './supabase/supabaseNoteService';

export const noteService = {
  async getNotes() {
    return activeProvider === 'supabase'
      ? supabaseNoteService.getNotes()
      : localNoteService.getNotes();
  },

  async createNote(note) {
    return activeProvider === 'supabase'
      ? supabaseNoteService.createNote(note)
      : localNoteService.createNote(note);
  }
};
