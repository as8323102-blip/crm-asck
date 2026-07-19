export const localNoteService = {
  async getNotes() {
    const local = localStorage.getItem('asck_crm_notes');
    return local ? JSON.parse(local) : [];
  },

  async createNote(note) {
    const notes = await this.getNotes();
    const updated = [note, ...notes];
    localStorage.setItem('asck_crm_notes', JSON.stringify(updated));
    return note;
  }
};
