export const localCalendarService = {
  async getEvents() {
    const local = localStorage.getItem('asck_crm_agenda');
    return local ? JSON.parse(local) : [];
  },

  async createEvent(event) {
    const events = await this.getEvents();
    const updated = [...events, event];
    localStorage.setItem('asck_crm_agenda', JSON.stringify(updated));
    return event;
  }
};
